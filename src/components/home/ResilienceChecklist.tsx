"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import type { HomeContent } from "@/content/types";
import type { Localized } from "@/lib/localize";
import { Link } from "@/i18n/navigation";
import { Accent } from "@/components/ui/Accent";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { CheckIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

/**
 * Resilience as a checklist that completes as you scroll. A pinned rendering carries a 3×3 board of
 * systems that light up one by one as each feature card passes the reading line.
 */
export function ResilienceChecklist({ block }: { block: Localized<HomeContent["resilience"]> }) {
  const t = useTranslations("common");
  const h = useTranslations("home");
  const cards = useRef<(HTMLLIElement | null)[]>([]);
  const [done, setDone] = useState(0);
  const total = block.features.length;

  useEffect(() => {
    let raf = 0;
    const measure = () => {
      raf = 0;
      const line = window.innerHeight * 0.62;
      let n = 0;
      cards.current.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top < line) n = i + 1;
      });
      setDone(n);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    raf = requestAnimationFrame(measure);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const pad = (v: number) => String(v).padStart(2, "0");

  return (
    <section className="py-section dark-section" aria-labelledby="resilience-title">
      <div className="container-x">
        <div className="grid grid-cols-12 gap-x-6">
          <div className="col-span-12 lg:col-span-7">
            <Eyebrow className="text-dark-accent">{block.eyebrow}</Eyebrow>
            <h2 id="resilience-title" className="mt-6 display-l" data-reveal>
              <Accent text={block.title} className="text-dark-accent" />
            </h2>
            <p className="mt-6 max-w-[52ch] lead text-dark-fg/75" data-reveal>
              {block.intro}
            </p>
          </div>
          <dl className="col-span-12 mt-10 grid grid-cols-3 gap-4 self-end border-t border-dark-rule pt-6 lg:col-span-5 lg:mt-0">
            {block.counters.map((c, i) => (
              <div key={i} className="flex flex-col-reverse">
                <dt className="mt-2 text-[11px] tracking-[0.12em] text-dark-fg/65 uppercase">
                  {c.label}
                  {c.placeholder && <span className="block text-dark-accent/80">{h("toBeConfirmed")}</span>}
                </dt>
                <dd className="stat whitespace-nowrap text-dark-fg">
                  <span data-counter={c.value ?? 0} data-prefix={c.prefix || ""} data-suffix={c.suffix || ""}>
                    {c.prefix}
                    {c.value}
                    {c.suffix}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-16 grid grid-cols-12 gap-x-6 md:mt-24">
          {/* Pinned board */}
          <div className="col-span-12 hidden lg:col-span-6 lg:block">
            <div className="sticky top-[calc(var(--header-h)+1.5rem)]">
              <div className="relative aspect-[5/6] max-h-[calc(100vh-var(--header-h)-3rem)] w-full overflow-hidden">
                <Image
                  src={block.image.src}
                  alt={block.image.alt}
                  fill
                  sizes="50vw"
                  className="object-cover"
                  style={{ objectPosition: block.image.position }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-basalt/30 via-basalt/40 to-basalt/90" />
                <div className="absolute inset-x-6 top-6 flex items-center justify-between">
                  <p className="eyebrow text-white">
                    <span className="font-display text-4xl tracking-normal tnum">{pad(done)}</span>
                    <span className="text-white/60"> / {pad(total)}</span>
                  </p>
                  <p className="text-[10px] tracking-[0.14em] text-white/70 uppercase">{t("rendering")}</p>
                </div>
                <ol className="absolute inset-x-6 bottom-6 grid grid-cols-3 gap-2" aria-hidden>
                  {block.features.map((f, i) => (
                    <li
                      key={f.slug}
                      className={cn(
                        "flex min-h-[5.5rem] flex-col justify-between border p-3 backdrop-blur-sm transition-[background-color,border-color,color] duration-700",
                        i < done
                          ? "border-brass-light bg-brass/85 text-white"
                          : "border-white/25 bg-basalt/30 text-white/70",
                      )}
                    >
                      <span className="flex items-center justify-between text-[11px] tnum">
                        {pad(i + 1)}
                        <span
                          className={cn(
                            "grid h-5 w-5 place-items-center rounded-full border transition-transform duration-500",
                            i < done ? "scale-100 border-white bg-white text-brass-ink" : "scale-75 border-white/40",
                          )}
                        >
                          {i < done && <CheckIcon className="h-3 w-3" />}
                        </span>
                      </span>
                      <span className="text-[12px] leading-tight">{f.title}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>

          {/* Feature cards */}
          <div className="col-span-12 lg:col-span-5 lg:col-start-8">
            <div className="sticky top-[var(--header-h)] z-[1] -mx-[var(--gutter)] mb-6 bg-dark-bg/95 px-[var(--gutter)] py-3 backdrop-blur lg:hidden">
              <div className="flex items-center justify-between eyebrow text-dark-fg/80">
                <span>{h("systemsInPlace")}</span>
                <span className="tnum">
                  {pad(done)} / {pad(total)}
                </span>
              </div>
              <span className="mt-2 block h-[2px] bg-dark-rule">
                <span
                  className="block h-full bg-dark-accent transition-[width] duration-500"
                  style={{ width: `${(done / total) * 100}%` }}
                />
              </span>
            </div>
            <ol className="space-y-4">
              {block.features.map((f, i) => (
                <li
                  key={f.slug}
                  ref={(el) => {
                    cards.current[i] = el;
                  }}
                  className={cn(
                    "border p-6 transition-[border-color,background-color] duration-700 md:p-8",
                    i < done ? "border-dark-accent/60 bg-white/[0.04]" : "border-dark-rule",
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="eyebrow text-dark-accent tnum">{pad(i + 1)}</span>
                    <span
                      className={cn(
                        "grid h-8 w-8 place-items-center rounded-full border transition-[background-color,border-color,color] duration-500",
                        i < done
                          ? "border-dark-accent bg-dark-accent text-basalt"
                          : "border-dark-rule text-transparent",
                      )}
                    >
                      <CheckIcon />
                    </span>
                  </div>
                  <h3 className="mt-4 display-s">{f.title}</h3>
                  <ul className="mt-4 space-y-2 small text-dark-fg/75">
                    {f.points.map((p, j) => (
                      <li key={j} className="flex gap-3">
                        <span aria-hidden className="mt-[0.6em] h-px w-3 shrink-0 bg-dark-accent" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
            <div className="mt-10">
              <Button as={Link} href="/resilience" variant="light">
                {h("howWeBuild")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
