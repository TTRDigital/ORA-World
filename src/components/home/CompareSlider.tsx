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

type Item = Localized<HomeContent["compare"]>["items"][number];

/** One drawing/rendering pair with a draggable divider. A native range input gives drag, touch and keys. */
function Pair({ item, active, label }: { item: Item; active: boolean; label: string }) {
  const [pos, setPos] = useState(50);
  const swept = useRef(false);
  const t = useTranslations("home");

  // The first time a slide becomes active, sweep the divider so people see it moves.
  useEffect(() => {
    if (!active || swept.current || document.documentElement.classList.contains("reduced-motion")) return;
    swept.current = true;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const k = Math.min(1, (now - start) / 1800);
      // One gentle swing left and right that settles back in the middle.
      setPos(50 + 30 * Math.sin(k * Math.PI * 2) * (1 - k));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active]);

  return (
    <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-travertine sm:aspect-[16/10]">
      <Image
        src={item.render.src}
        alt={item.render.alt}
        fill
        sizes="(min-width: 1024px) 80vw, 180vw"
        className="object-cover"
        style={{ objectPosition: item.render.position }}
      />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Image
          src={item.drawing.src}
          alt={item.drawing.alt}
          fill
          sizes="(min-width: 1024px) 80vw, 180vw"
          className="object-cover"
          style={{ objectPosition: item.render.position }}
        />
      </div>
      <span className="pointer-events-none absolute top-4 left-4 rounded-full bg-bone/95 px-3 py-1.5 text-[11px] font-semibold tracking-[0.12em] text-basalt uppercase">
        {t("drawing")}
      </span>
      <span className="pointer-events-none absolute top-4 right-4 rounded-full bg-basalt/80 px-3 py-1.5 text-[11px] font-semibold tracking-[0.12em] text-white uppercase backdrop-blur">
        {t("rendering")}
      </span>
      <div className="pointer-events-none absolute inset-y-0" style={{ left: `${pos}%` }} aria-hidden>
        <span className="absolute inset-y-0 -left-px w-[2px] bg-white shadow-[0_0_12px_rgba(0,0,0,.35)]" />
        <span className="absolute top-1/2 -left-6 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white text-basalt shadow-[0_10px_30px_-8px_rgba(0,0,0,.5)]">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M9 6l-5 6 5 6M15 6l5 6-5 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label={label}
        tabIndex={active ? 0 : -1}
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}

/**
 * Drawing to rendering: a carousel of six views, each with a before/after divider between the
 * architectural line drawing (derived from the rendering) and the rendering itself. Arrows, swipe and
 * keyboard move between views; the active caption card sits under each slide.
 */
export function CompareSlider({ block }: { block: Localized<HomeContent["compare"]> }) {
  const h = useTranslations("home");
  const c = useTranslations("common");
  const [i, setI] = useState(0);
  const n = block.items.length;
  const track = useRef<HTMLDivElement>(null);

  const go = (d: number) => setI((v) => Math.min(n - 1, Math.max(0, v + d)));

  useEffect(() => {
    const el = track.current;
    const slide = el?.children[i] as HTMLElement | undefined;
    if (!el || !slide) return;
    el.scrollTo({
      left: slide.offsetLeft - el.offsetLeft - (el.clientWidth - slide.clientWidth) / 2,
      behavior: "smooth",
    });
  }, [i]);

  return (
    <section className="overflow-hidden py-section" aria-labelledby="compare-title">
      <div className="container-x flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-2xl">
          <Eyebrow>{block.eyebrow}</Eyebrow>
          <h2 id="compare-title" className="mt-6 display-l" data-reveal>
            <Accent text={block.title} />
          </h2>
          <p className="mt-5 max-w-[48ch] lead text-fg-muted">{block.intro}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="eyebrow text-fg-muted tnum" aria-live="polite">
            {i + 1} / {n}
          </span>
          <button
            type="button"
            onClick={() => go(-1)}
            disabled={i === 0}
            aria-label={c("previous")}
            className="grid h-12 w-12 cursor-pointer place-items-center rounded-full border border-rule transition-colors hover:bg-fg hover:text-bg disabled:opacity-30"
          >
            <ArrowIcon className="rotate-180" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            disabled={i === n - 1}
            aria-label={c("next")}
            className="grid h-12 w-12 cursor-pointer place-items-center rounded-full bg-basalt text-white transition-colors hover:bg-brass-ink disabled:opacity-30"
          >
            <ArrowIcon />
          </button>
        </div>
      </div>

      <div
        ref={track}
        className="mt-10 flex snap-x snap-mandatory [scrollbar-width:none] gap-4 overflow-x-auto px-[var(--gutter)] pb-4 md:mt-14 md:gap-6 [&::-webkit-scrollbar]:hidden"
        onScroll={(e) => {
          const el = e.currentTarget;
          const w = (el.children[0] as HTMLElement | undefined)?.clientWidth ?? 1;
          const idx = Math.round(el.scrollLeft / (w + 24));
          if (idx !== i && idx >= 0 && idx < n) setI(idx);
        }}
      >
        {block.items.map((it, k) => (
          <article
            key={k}
            className={cn(
              "w-[86vw] shrink-0 snap-center md:w-[78vw] lg:w-[72vw] [&_img]:transition-[filter] [&_img]:duration-700",
              k === i ? "" : "[&_img]:brightness-[.7] [&_img]:saturate-[.8]",
            )}
          >
            <Pair item={it} active={k === i} label={`${h("compareLabel")} · ${it.title}`} />
            <div className="mt-4 rounded-2xl border border-rule bg-surface/60 px-5 py-4 md:px-6">
              <p className="text-[11px] font-semibold tracking-[0.14em] text-accent-ink uppercase">{it.kicker}</p>
              <p className="mt-1 display-s">{it.title}</p>
            </div>
          </article>
        ))}
      </div>
      <div className="container-x mt-4 flex items-center justify-between gap-6">
        <div className="flex gap-1.5" aria-hidden>
          {block.items.map((_, k) => (
            <span
              key={k}
              className={cn(
                "h-1.5 rounded-full transition-all duration-500",
                k === i ? "w-8 bg-accent" : "w-1.5 bg-rule-strong",
              )}
            />
          ))}
        </div>
        <p className="text-[11px] tracking-[0.12em] text-fg-muted uppercase">{h("drawingNote")}</p>
      </div>
    </section>
  );
}
