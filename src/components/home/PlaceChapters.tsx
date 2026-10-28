"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import type { HomeContent } from "@/content/types";
import type { Localized } from "@/lib/localize";
import { Accent } from "@/components/ui/Accent";
import { Eyebrow } from "@/components/ui/Eyebrow";

/**
 * "The Place": a pinned horizontal rail on desktop (GSAP scrub), a snap-scroll rail on touch.
 * Each panel: image, number, one sentence.
 */
export function PlaceChapters({ place }: { place: Localized<HomeContent["place"]> }) {
  const t = useTranslations("common");
  const pin = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const p = pin.current;
    const tr = track.current;
    if (!p || !tr) return;
    if (document.documentElement.classList.contains("reduced-motion")) return;
    let kill: (() => void) | undefined;
    import("@/lib/gsap").then(({ gsap }) => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (pointer: fine)", () => {
        const distance = () => tr.scrollWidth - window.innerWidth;
        const tween = gsap.to(tr, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: p,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              if (progress.current) progress.current.style.transform = `scaleX(${self.progress})`;
            },
          },
        });
        return () => tween.kill();
      });
      kill = () => mm.revert();
    });
    return () => kill?.();
  }, []);

  return (
    <section className="bg-bg-alt py-section" aria-labelledby="place-title">
      <div className="container-x grid grid-cols-12 gap-x-6">
        <div className="col-span-12 md:col-span-5">
          <Eyebrow>{place.eyebrow}</Eyebrow>
          <h2 id="place-title" className="display-l mt-6" data-reveal>
            <Accent text={place.title} />
          </h2>
        </div>
        <p className="lead col-span-12 mt-6 max-w-[48ch] text-fg-muted md:col-span-6 md:col-start-7 md:mt-16" data-reveal>
          {place.intro}
        </p>
      </div>

      <div ref={pin} className="relative mt-16 lg:h-dvh lg:overflow-hidden">
        <div
          ref={track}
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-[var(--gutter)] pb-6 [scrollbar-width:none] lg:h-full lg:snap-none lg:items-center lg:overflow-visible lg:pb-0 [&::-webkit-scrollbar]:hidden"
        >
          {place.chapters.map((c, i) => (
            <article
              key={c.number}
              className={`relative w-[78vw] shrink-0 snap-start md:w-[52vw] lg:w-[44vw] ${i % 2 === 1 ? "lg:translate-y-10" : "lg:-translate-y-6"}`}
            >
              <figure className="relative aspect-[4/5] overflow-hidden md:aspect-[4/3]" data-reveal="image">
                <Image src={c.image.src} alt={c.image.alt} fill sizes="(min-width:1024px) 44vw, 78vw" className="object-cover" placeholder={c.image.blurDataURL ? "blur" : "empty"} blurDataURL={c.image.blurDataURL} data-reveal-inner />
                {c.image.placeholder && <figcaption className="absolute bottom-3 left-3 text-[10px] tracking-[0.14em] text-white/85 uppercase mix-blend-difference">{t("placeholderImage")}</figcaption>}
              </figure>
              <div className="mt-5 flex items-baseline gap-5">
                <span className="display-s tnum text-accent-ink">{c.number}</span>
                <div>
                  <h3 className="display-s">{c.title}</h3>
                  <p className="mt-2 max-w-[36ch] text-fg-muted">{c.text}</p>
                </div>
              </div>
            </article>
          ))}
          <div aria-hidden className="hidden w-[8vw] shrink-0 lg:block" />
        </div>
        <div className="container-x absolute inset-x-0 bottom-8 hidden lg:block" aria-hidden="true">
          <div className="h-px w-full bg-rule-strong">
            <div ref={progress} className="h-px origin-left bg-accent" style={{ transform: "scaleX(0)" }} />
          </div>
        </div>
      </div>
    </section>
  );
}
