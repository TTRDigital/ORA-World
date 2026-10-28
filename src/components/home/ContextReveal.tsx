"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import type { HomeContent } from "@/content/types";
import type { Localized } from "@/lib/localize";

/** Full-bleed image that grows from a 7/12 inset to the full viewport width on scroll, captions pinned beside it. */
export function ContextReveal({ context }: { context: Localized<HomeContent["context"]> }) {
  const root = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    const f = frame.current;
    if (!el || !f) return;
    if (document.documentElement.classList.contains("reduced-motion")) return;
    let kill: (() => void) | undefined;
    import("@/lib/gsap").then(({ gsap }) => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        const tween = gsap.fromTo(
          f,
          { width: "58.333%", marginLeft: "8.333%" },
          {
            width: "100%",
            marginLeft: "0%",
            ease: "none",
            scrollTrigger: { trigger: el, start: "top 80%", end: "top 10%", scrub: 0.6 },
          },
        );
        return () => tween.kill();
      });
      kill = () => mm.revert();
    });
    return () => kill?.();
  }, []);

  return (
    <section ref={root} className="relative pb-section">
      <div ref={frame} className="relative aspect-[16/10] w-full overflow-hidden md:aspect-[21/9]">
        <div className="absolute inset-x-0 -inset-y-[8%]" data-parallax="0.05">
          <Image
            src={context.image.src}
            alt={context.image.alt}
            fill
            sizes="100vw"
            className="object-cover"
            placeholder={context.image.blurDataURL ? "blur" : "empty"}
            blurDataURL={context.image.blurDataURL}
          />
        </div>
        <div className="absolute inset-0 scrim-bottom" />
        <p className="pointer-events-none absolute bottom-3 left-3 text-[10px] tracking-[0.14em] text-white/80 uppercase">
          {context.image.rendering ? "Artist's conceptual rendering" : ""}
        </p>
      </div>
      <div className="container-x mt-8 grid grid-cols-12 gap-x-6 gap-y-6 md:mt-12">
        {context.captions.map((c, i) => (
          <p
            key={i}
            className={`col-span-12 max-w-[40ch] text-fg-muted md:col-span-5 ${i === 1 ? "md:col-start-8" : "md:col-start-2"}`}
            data-reveal
            data-delay={i * 0.15}
          >
            <span className="mr-4 eyebrow text-accent-ink tnum">0{i + 1}</span>
            {c}
          </p>
        ))}
      </div>
    </section>
  );
}
