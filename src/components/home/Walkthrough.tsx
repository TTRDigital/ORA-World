"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import type { HomeContent } from "@/content/types";
import type { Localized } from "@/lib/localize";
import { Accent } from "@/components/ui/Accent";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { cn } from "@/lib/utils";

/**
 * "The whole residence, in your pocket": a phone that stays pinned while the six rooms scroll past as
 * cards. The active card lifts, its progress line fills, and the phone screen swipes to that room's
 * rendering with a slim app-style frame (status bar, room label, progress dots). On phones the device
 * rides at the top of the screen and the cards pass underneath.
 */
export function Walkthrough({ block }: { block: Localized<HomeContent["walkthrough"]> }) {
  const t = useTranslations("common");
  const h = useTranslations("home");
  const [active, setActive] = useState(0);
  const [fill, setFill] = useState(0);
  const cards = useRef<(HTMLLIElement | null)[]>([]);
  const total = block.steps.length;

  useEffect(() => {
    let raf = 0;
    const measure = () => {
      raf = 0;
      const line = window.innerHeight * 0.6;
      let a = 0;
      let p = 0;
      cards.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        if (r.top < line) {
          a = i;
          p = Math.min(1, Math.max(0, (line - r.top) / r.height));
        }
      });
      setActive(a);
      setFill(p);
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    raf = requestAnimationFrame(measure);
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
    };
  }, []);

  const go = (i: number) => cards.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" });
  const pad = (v: number) => String(v).padStart(2, "0");

  return (
    <section className="bg-bg-alt py-section" aria-labelledby="walk-title">
      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow className="justify-center">{block.eyebrow}</Eyebrow>
          <h2 id="walk-title" className="mt-6 display-l" data-reveal>
            <Accent text={block.title} />
          </h2>
          <p className="mx-auto mt-5 max-w-[46ch] lead text-fg-muted">{block.intro}</p>
        </div>

        <div className="mt-12 grid grid-cols-12 gap-x-6 md:mt-20">
          {/* Phone */}
          <div className="max-lg:contents lg:col-span-5 lg:col-start-2">
            <div className="sticky top-[calc(var(--header-h)+0.5rem)] z-[2] col-span-12 -mx-[var(--gutter)] flex justify-center bg-bg-alt/90 px-[var(--gutter)] pt-2 pb-5 backdrop-blur lg:top-[calc(50vh-21rem)] lg:mx-0 lg:bg-transparent lg:p-0 lg:backdrop-blur-none">
              <div className="relative aspect-[9/19] h-[44vh] max-h-[680px] rounded-[2.6rem] bg-basalt p-[9px] shadow-[0_50px_90px_-40px_rgba(28,27,25,.75),inset_0_0_0_1.5px_rgba(255,255,255,.08)] lg:h-[42rem]">
                <div className="bg-basalt-soft relative h-full w-full overflow-hidden rounded-[2.05rem]">
                  {block.steps.map((s, i) => (
                    <Image
                      key={i}
                      src={s.image.src}
                      alt={i === active ? s.image.alt : ""}
                      aria-hidden={i !== active}
                      fill
                      sizes="(min-width: 1024px) 1200px, 760px"
                      className={cn(
                        "object-cover transition-[opacity,transform] duration-[900ms] ease-[var(--ease-out-expo)]",
                        i === active
                          ? "translate-x-0 scale-100 opacity-100"
                          : i < active
                            ? "-translate-x-6 scale-105 opacity-0"
                            : "translate-x-6 scale-105 opacity-0",
                      )}
                      style={{ objectPosition: s.image.position ?? "50% 50%" }}
                    />
                  ))}
                  {/* App frame */}
                  <div className="absolute inset-x-0 top-0 bg-gradient-to-b from-basalt/70 to-transparent px-5 pt-3 pb-10 text-white">
                    <div className="flex items-center justify-between text-[10px] font-semibold">
                      <span>9:41</span>
                      <span className="h-5 w-20 rounded-full bg-basalt" aria-hidden />
                      <span aria-hidden>●●●</span>
                    </div>
                    <p className="mt-3 text-[10px] tracking-[0.14em] text-white/80 uppercase">
                      ORA World · Tesoro Del Mar
                    </p>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-basalt/85 to-transparent px-5 pt-14 pb-5 text-white">
                    <p className="text-[10px] tracking-[0.14em] text-brass-light uppercase tnum">
                      {pad(active + 1)} / {pad(total)}
                    </p>
                    <p
                      key={active}
                      className="mt-1 animate-[phonein_.6s_var(--ease-out-expo)_both] font-display text-lg leading-tight font-semibold"
                    >
                      {block.steps[active].label}
                    </p>
                    <div className="mt-3 flex gap-1" aria-hidden>
                      {block.steps.map((_, i) => (
                        <span key={i} className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/25">
                          <span
                            className="block h-full origin-left rounded-full bg-white transition-transform duration-300"
                            style={{ transform: `scaleX(${i < active ? 1 : i === active ? Math.max(0.08, fill) : 0})` }}
                          />
                        </span>
                      ))}
                    </div>
                    <p className="mt-3 text-[8px] tracking-[0.14em] text-white/55 uppercase">{t("rendering")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step cards */}
          <ol className="col-span-12 space-y-4 pt-4 lg:col-span-5 lg:col-start-7 lg:space-y-6 lg:pt-[18vh] lg:pb-[24vh]">
            {block.steps.map((s, i) => (
              <li
                key={i}
                ref={(el) => {
                  cards.current[i] = el;
                }}
              >
                <button
                  type="button"
                  onClick={() => go(i)}
                  className={cn(
                    "relative w-full cursor-pointer overflow-hidden rounded-2xl border p-5 text-left transition-[background-color,box-shadow,border-color,transform] duration-500 md:p-7",
                    i === active
                      ? "-translate-y-0.5 border-transparent bg-white shadow-[0_24px_50px_-28px_rgba(28,27,25,.45)]"
                      : "border-rule bg-transparent",
                  )}
                  aria-current={i === active ? "step" : undefined}
                >
                  <span className="flex items-center gap-3 eyebrow text-accent-ink">
                    <span className="tnum">{pad(i + 1)}</span>
                    {s.label}
                  </span>
                  <span className="mt-3 block display-s">{s.title}</span>
                  <span className="mt-2 block text-fg-muted">{s.text}</span>
                  <span aria-hidden className="absolute inset-x-0 bottom-0 h-[3px] bg-transparent">
                    <span
                      className="block h-full origin-left bg-accent"
                      style={{ transform: `scaleX(${i < active ? 1 : i === active ? fill : 0})` }}
                    />
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </div>
        <p className="sr-only" aria-live="polite">
          {h("walkSteps")}: {block.steps[active].label}
        </p>
      </div>
      <style>{`@keyframes phonein{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}`}</style>
    </section>
  );
}
