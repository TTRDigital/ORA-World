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
 * Scroll-driven walkthrough. On desktop the rendering stays pinned while the step list scrolls past;
 * the step crossing the middle of the viewport becomes active and swaps the image. On mobile each
 * step carries its own image, so nothing depends on the pin.
 */
export function Walkthrough({ block }: { block: Localized<HomeContent["walkthrough"]> }) {
  const t = useTranslations("common");
  const h = useTranslations("home");
  const [active, setActive] = useState(0);
  const steps = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const els = steps.current.filter(Boolean) as HTMLLIElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
        });
      },
      { rootMargin: "-62% 0px -36% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const go = (i: number) => steps.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" });
  const total = block.steps.length;

  return (
    <section className="py-section" aria-labelledby="walk-title">
      <div className="container-x">
        <div className="grid grid-cols-12 gap-x-6">
          <div className="col-span-12 md:col-span-7">
            <Eyebrow>{block.eyebrow}</Eyebrow>
            <h2 id="walk-title" className="mt-6 display-l" data-reveal>
              <Accent text={block.title} />
            </h2>
          </div>
          <p
            className="col-span-12 mt-6 max-w-[40ch] lead text-fg-muted md:col-span-4 md:col-start-9 md:mt-16"
            data-reveal
          >
            {block.intro}
          </p>
        </div>

        <div className="mt-14 grid grid-cols-12 gap-x-6 md:mt-20">
          {/* Pinned visual: beside the steps on desktop, a sticky stage above them on mobile */}
          <div className="max-lg:contents lg:col-span-7">
            <div className="sticky top-[var(--header-h)] z-[2] col-span-12 -mx-[var(--gutter)] bg-bg px-[var(--gutter)] pt-2 pb-4 lg:top-[calc(var(--header-h)+1.5rem)] lg:mx-0 lg:px-0 lg:pt-0 lg:pb-0">
              <div className="relative aspect-[4/3] overflow-hidden bg-bg-alt lg:aspect-[16/11]">
                {block.steps.map((s, i) => (
                  <Image
                    key={i}
                    src={s.image.src}
                    alt={i === active ? s.image.alt : ""}
                    aria-hidden={i !== active}
                    fill
                    sizes="(min-width: 1024px) 58vw, 100vw"
                    placeholder={s.image.blurDataURL ? "blur" : "empty"}
                    blurDataURL={s.image.blurDataURL}
                    className={cn(
                      "object-cover transition-[opacity,transform] duration-[1100ms] ease-[var(--ease-out-expo)]",
                      i === active ? "scale-100 opacity-100" : "scale-[1.04] opacity-0",
                    )}
                    style={{ objectPosition: s.image.position }}
                  />
                ))}
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-basalt/60 to-transparent" />
                <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-basalt/40 to-transparent lg:hidden" />
                {/* Story bars (mobile) */}
                <div aria-hidden className="absolute inset-x-3 top-3 flex gap-1 lg:hidden">
                  {block.steps.map((_, i) => (
                    <span key={i} className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/35">
                      <span
                        className={cn(
                          "block h-full origin-left bg-white transition-transform duration-700 ease-[var(--ease-out-expo)]",
                          i <= active ? "scale-x-100" : "scale-x-0",
                        )}
                      />
                    </span>
                  ))}
                </div>
                <div className="absolute right-4 bottom-3 left-4 flex items-end justify-between gap-3 text-white lg:right-5 lg:bottom-4 lg:left-5">
                  <p className="eyebrow whitespace-nowrap">
                    <span className="tnum">{String(active + 1).padStart(2, "0")}</span>
                    <span className="text-white/60"> / {String(total).padStart(2, "0")}</span>
                    <span className="ml-4">{block.steps[active].label}</span>
                  </p>
                  <p className="truncate text-[9px] tracking-[0.12em] text-white/75 uppercase lg:text-[10px] lg:tracking-[0.14em]">
                    {t("rendering")}
                  </p>
                </div>
              </div>
              <div className="mt-5 hidden gap-2 lg:flex" role="group" aria-label={h("walkSteps")}>
                {block.steps.map((s, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => go(i)}
                    aria-current={i === active ? "step" : undefined}
                    aria-label={`${String(i + 1).padStart(2, "0")} · ${s.label}`}
                    className="group relative h-11 flex-1 cursor-pointer"
                  >
                    <span className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 bg-rule" />
                    <span
                      className={cn(
                        "absolute top-1/2 left-0 h-[2px] -translate-y-1/2 bg-accent transition-[width] duration-700 ease-[var(--ease-out-expo)]",
                        i <= active ? "w-full" : "w-0",
                      )}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Steps */}
          <ol className="col-span-12 lg:col-span-5 lg:col-start-8 lg:pl-8">
            {block.steps.map((s, i) => (
              <li
                key={i}
                ref={(el) => {
                  steps.current[i] = el;
                }}
                data-index={i}
                className="group/step flex min-h-[46vh] flex-col justify-center border-t border-rule py-10 lg:min-h-[62vh] lg:py-0"
                data-active={i === active || undefined}
              >
                <p className="flex items-center gap-3 eyebrow text-accent-ink">
                  <span className="grid h-8 w-8 place-items-center rounded-full border border-current tnum">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {s.label}
                </p>
                <h3 className="mt-5 display-m text-fg-muted transition-colors duration-700 group-data-[active]/step:text-fg">
                  {s.title}
                </h3>
                <p className="mt-4 max-w-[40ch] text-fg-muted">{s.text}</p>
                <span
                  aria-hidden
                  className={cn(
                    "mt-8 block h-[2px] origin-left bg-accent transition-transform duration-[1200ms] ease-[var(--ease-out-expo)]",
                    i === active ? "scale-x-100" : "scale-x-0",
                  )}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
