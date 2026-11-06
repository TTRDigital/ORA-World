"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import type { HomeContent } from "@/content/types";
import type { Localized } from "@/lib/localize";
import { Accent } from "@/components/ui/Accent";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ArrowIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

/**
 * A walk through Tesoro Del Mar, shown on a large landscape tablet (client feedback: the renders
 * were too small inside a phone; show the full image, more pictures and less text). The screen is
 * 16:9 like the renders themselves, so every image is seen whole. A strip of room thumbnails sits
 * below; the tour advances on its own while on screen and stops once the visitor picks a room.
 * No pinning: the section scrolls like any other.
 */
export function Walkthrough({ block }: { block: Localized<HomeContent["walkthrough"]> }) {
  const t = useTranslations("common");
  const h = useTranslations("home");
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const [manual, setManual] = useState(false);
  const total = block.steps.length;
  const pad = (v: number) => String(v).padStart(2, "0");

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || manual || document.documentElement.classList.contains("reduced-motion")) return;
    const id = window.setTimeout(() => setActive((a) => (a + 1) % total), 4500);
    return () => window.clearTimeout(id);
  }, [visible, manual, active, total]);

  const pick = (i: number) => {
    setManual(true);
    setActive((i + total) % total);
  };
  const step = block.steps[active];

  return (
    <section ref={root} className="bg-bg-alt py-section" aria-labelledby="walk-title">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>{block.eyebrow}</Eyebrow>
            <h2 id="walk-title" className="mt-6 display-l" data-reveal>
              <Accent text={block.title} />
            </h2>
          </div>
          <p className="hidden font-display text-5xl text-accent-ink tnum md:block" aria-hidden>
            {pad(active + 1)}
            <span className="text-xl text-fg-muted"> / {pad(total)}</span>
          </p>
        </div>

        {/* Tablet + thumbnails, sized so both fit on one screen */}
        <div className="mx-auto max-w-[min(100%,calc((100svh-24rem)*16/9))]">
          <div className="mt-10 rounded-[1.6rem] bg-basalt p-2 shadow-[0_60px_100px_-50px_rgba(28,27,25,.7),inset_0_0_0_1.5px_rgba(255,255,255,.08)] md:mt-14 md:rounded-[2.4rem] md:p-4">
            <div className="group bg-basalt-soft relative aspect-[16/9] overflow-hidden rounded-[1.1rem] md:rounded-[1.6rem]">
              {block.steps.map((s, i) => (
                <Image
                  key={i}
                  src={s.image.src}
                  alt={i === active ? s.image.alt : ""}
                  aria-hidden={i !== active}
                  fill
                  sizes="(min-width: 1440px) 1340px, 94vw"
                  priority={false}
                  className={cn(
                    "object-cover transition-[opacity,transform] duration-[1100ms] ease-[var(--ease-out-expo)]",
                    i === active ? "scale-100 opacity-100" : "scale-[1.03] opacity-0",
                  )}
                  style={{ objectPosition: s.image.position ?? "50% 50%" }}
                />
              ))}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden bg-gradient-to-t from-basalt/75 via-basalt/25 to-transparent px-8 pt-24 pb-7 text-white md:block">
                <p className="eyebrow text-brass-light">{step.label}</p>
                <p key={active} className="mt-2 animate-[walkin_.7s_var(--ease-out-expo)_both] display-s text-white">
                  {step.title}
                </p>
              </div>
              <p className="pointer-events-none absolute top-3 right-3 rounded-full bg-basalt/55 px-2.5 py-1 text-[9px] tracking-[0.14em] text-white uppercase backdrop-blur-sm md:top-5 md:right-5 md:text-[10px]">
                {t("rendering")}
              </p>
              <button
                type="button"
                onClick={() => pick(active - 1)}
                aria-label={h("walkPrev")}
                className="absolute top-1/2 left-3 grid h-11 w-11 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-white/85 text-basalt backdrop-blur transition-[opacity,transform] hover:scale-105 md:left-5 md:h-12 md:w-12 md:opacity-0 md:group-hover:opacity-100 md:focus-visible:opacity-100"
              >
                <ArrowIcon className="rotate-180" />
              </button>
              <button
                type="button"
                onClick={() => pick(active + 1)}
                aria-label={h("walkNext")}
                className="absolute top-1/2 right-3 grid h-11 w-11 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-white/85 text-basalt backdrop-blur transition-[opacity,transform] hover:scale-105 md:right-5 md:h-12 md:w-12 md:opacity-0 md:group-hover:opacity-100 md:focus-visible:opacity-100"
              >
                <ArrowIcon />
              </button>
            </div>
          </div>

          {/* Mobile caption under the tablet, so the image stays clear */}
          <div className="mt-4 md:hidden">
            <p className="eyebrow text-accent-ink">{step.label}</p>
            <p key={active} className="mt-1 animate-[walkin_.7s_var(--ease-out-expo)_both] display-s">
              {step.title}
            </p>
          </div>

          {/* Room thumbnails */}
          <ol
            className="-mx-[var(--gutter)] mt-5 flex snap-x scroll-px-[var(--gutter)] [scrollbar-width:none] gap-3 overflow-x-auto px-[var(--gutter)] pb-2 md:mx-0 md:mt-6 md:grid md:grid-cols-6 md:overflow-visible md:px-0"
            aria-label={h("walkSteps")}
          >
            {block.steps.map((s, i) => (
              <li key={i} className="w-[40vw] shrink-0 snap-start md:w-auto">
                <button
                  type="button"
                  onClick={() => pick(i)}
                  aria-current={i === active ? "step" : undefined}
                  className="group/t block w-full cursor-pointer text-left"
                >
                  <span
                    className={cn(
                      "relative block aspect-[16/9] overflow-hidden rounded-xl ring-2 transition-[box-shadow,opacity] duration-500",
                      i === active ? "ring-accent" : "opacity-70 ring-transparent group-hover/t:opacity-100",
                    )}
                  >
                    <Image
                      src={s.image.src}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 16vw, 40vw"
                      className="object-cover transition-transform duration-700 group-hover/t:scale-105"
                      style={{ objectPosition: s.image.position ?? "50% 50%" }}
                    />
                  </span>
                  <span className="mt-2 flex items-baseline gap-2 text-sm">
                    <span className="text-accent-ink tnum">{pad(i + 1)}</span>
                    <span className={i === active ? "text-fg" : "text-fg-muted"}>{s.label}</span>
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </div>
        <p className="sr-only" aria-live="polite">
          {h("walkSteps")}: {step.label}. {step.title}
        </p>
      </div>
      <style>{`@keyframes walkin{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}`}</style>
    </section>
  );
}
