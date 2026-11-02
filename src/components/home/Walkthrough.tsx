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
      { rootMargin: "-45% 0px -45% 0px" },
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
          {/* Pinned visual (desktop) */}
          <div className="col-span-7 hidden lg:block">
            <div className="sticky top-[calc(var(--header-h)+1.5rem)]">
              <div className="relative aspect-[16/11] overflow-hidden bg-bg-alt">
                {block.steps.map((s, i) => (
                  <Image
                    key={i}
                    src={s.image.src}
                    alt={i === active ? s.image.alt : ""}
                    aria-hidden={i !== active}
                    fill
                    sizes="58vw"
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
                <div className="absolute right-5 bottom-4 left-5 flex items-end justify-between text-white">
                  <p className="eyebrow">
                    <span className="tnum">{String(active + 1).padStart(2, "0")}</span>
                    <span className="text-white/60"> / {String(total).padStart(2, "0")}</span>
                    <span className="ml-4">{block.steps[active].label}</span>
                  </p>
                  <p className="text-[10px] tracking-[0.14em] text-white/75 uppercase">{t("rendering")}</p>
                </div>
              </div>
              <div className="mt-5 flex gap-2" role="group" aria-label={h("walkSteps")}>
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
                className="group/step border-t border-rule py-10 lg:flex lg:min-h-[62vh] lg:flex-col lg:justify-center lg:py-0"
                data-active={i === active || undefined}
              >
                <div className="relative mb-6 aspect-[16/10] overflow-hidden lg:hidden">
                  <Image
                    src={s.image.src}
                    alt={s.image.alt}
                    fill
                    sizes="100vw"
                    placeholder={s.image.blurDataURL ? "blur" : "empty"}
                    blurDataURL={s.image.blurDataURL}
                    className="object-cover"
                    style={{ objectPosition: s.image.position }}
                  />
                </div>
                <p className="flex items-center gap-3 eyebrow text-accent-ink">
                  <span className="grid h-8 w-8 place-items-center rounded-full border border-current tnum">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {s.label}
                </p>
                <h3 className="mt-5 display-m transition-colors duration-700 lg:text-fg-muted lg:group-data-[active]/step:text-fg">
                  {s.title}
                </h3>
                <p className="mt-4 max-w-[40ch] text-fg-muted">{s.text}</p>
                <span
                  aria-hidden
                  className={cn(
                    "mt-8 hidden h-[2px] origin-left bg-accent transition-transform duration-[1200ms] ease-[var(--ease-out-expo)] lg:block",
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
