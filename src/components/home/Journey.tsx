"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import type { HomeContent } from "@/content/types";
import type { Localized } from "@/lib/localize";
import { Link } from "@/i18n/navigation";
import { Accent } from "@/components/ui/Accent";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ArrowIcon } from "@/components/ui/Icons";
import { fullBleedSizes } from "@/lib/sizes";
import { cn } from "@/lib/utils";

/**
 * Discover. Choose. Arrive. — a "shutter" of three full-height panels that scrolls like any other
 * section (no pinning). As the section travels up the screen the panels open one after another,
 * scroll-linked, so the visitor reads 01, 02 and 03 on the way past and simply carries on; a brass
 * line on each panel tracks that progress. Hovering (mouse) or tapping a strip opens it at once.
 * Only transforms, opacity and the panels' flex-grow animate: the images keep a fixed size inside
 * each panel and are revealed by its edge rather than being resized.
 */
export function Journey({ block }: { block: Localized<HomeContent["journey"]> }) {
  const t = useTranslations("home");
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [step, setStep] = useState(0);
  const stepRef = useRef(-1);
  const scrolledAt = useRef(0);
  const n = block.steps.length;

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      if (r.bottom < 0 || r.top > vh) return;
      // 0 when the section's top reaches 75% of the viewport, 1 once it has risen a full section
      // height from there: panel 01 is open as it arrives, 03 while it is fully on screen.
      const p = Math.min(Math.max((vh * 0.75 - r.top) / r.height, 0), 0.9999);
      const f = p * n;
      const idx = Math.floor(f);
      el.style.setProperty("--seg", (f - idx).toFixed(3));
      if (idx !== stepRef.current) {
        stepRef.current = idx;
        setStep(idx);
        setActive(idx);
      }
    };
    const onScroll = () => {
      scrolledAt.current = performance.now();
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [n]);

  // A real mouse move opens the panel under the pointer. The browser's synthetic hover update
  // after a scroll (no movement) is ignored so scrolling and hover never fight each other.
  const hover = (i: number) => (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || (e.movementX === 0 && e.movementY === 0)) return;
    if (performance.now() - scrolledAt.current < 200) return;
    setActive(i);
  };
  const pad = (v: number) => String(v).padStart(2, "0");

  return (
    <section
      ref={root}
      aria-labelledby="journey-title"
      className="relative bg-basalt text-white"
    >
      <div className="flex h-[92vh] max-h-[900px] min-h-[620px] flex-col overflow-hidden">
        {/* Heading band */}
        <div className="container-x flex shrink-0 items-end justify-between gap-6 pt-16 pb-5 md:pt-20 md:pb-7">
          <div>
            <Eyebrow className="text-brass-light">{block.eyebrow}</Eyebrow>
            <h2 id="journey-title" className="mt-4 display-l text-white">
              <Accent text={block.title} className="text-brass-light" />
            </h2>
          </div>
          <p className="hidden shrink-0 font-display text-5xl text-brass-light tnum md:block" aria-hidden>
            {pad(active + 1)}
            <span className="text-2xl text-white/40"> / {pad(n)}</span>
          </p>
        </div>

        {/* Shutter */}
        <ol className="flex min-h-0 flex-1 flex-col gap-1.5 px-1.5 pb-[calc(3.25rem+env(safe-area-inset-bottom))] md:flex-row md:gap-2 md:px-2 md:pb-2">
          {block.steps.map((s, i) => {
            const on = i === active;
            const href = s.href;
            const cta = (
              <span className="inline-flex items-center gap-3 border-b border-white/60 pb-1 eyebrow text-white transition-colors hover:border-brass-light hover:text-brass-light">
                {s.cta}
                <ArrowIcon />
              </span>
            );
            return (
              <li
                key={i}
                className={cn(
                  "group bg-basalt-soft relative min-h-0 min-w-0 overflow-hidden rounded-2xl transition-[flex-grow] duration-[1000ms] ease-[cubic-bezier(0.65,0.05,0.36,1)]",
                  on ? "flex-[7]" : "flex-[1]",
                )}
                data-active={on || undefined}
                onPointerMove={hover(i)}
              >
                {/* Fixed-size image, centred in the panel: the panel's edge reveals it, it is never resized */}
                <div className="pointer-events-none absolute top-1/2 left-1/2 h-[64vh] w-full -translate-x-1/2 -translate-y-1/2 md:h-full md:w-[78vw] md:max-w-[1400px]">
                  <Image
                    src={s.image.src}
                    alt={s.image.alt}
                    fill
                    sizes={fullBleedSizes(s.image, 0.85)}
                    className={cn(
                      "object-cover will-change-transform transition-transform duration-[1400ms] ease-[var(--ease-out-expo)]",
                      on ? "scale-100" : "scale-[1.08]",
                    )}
                    style={{ objectPosition: s.image.position }}
                  />
                </div>
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-t from-basalt/90 via-basalt/45 to-basalt/5 transition-opacity duration-700",
                    on ? "opacity-100" : "opacity-0",
                  )}
                />
                <div
                  className={cn(
                    "absolute inset-0 bg-basalt/50 transition-opacity duration-700",
                    on ? "opacity-0" : "opacity-100",
                  )}
                />

                {/* Collapsed strip: number + title, rotated on desktop */}
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  aria-expanded={on}
                  className={cn(
                    "absolute inset-0 z-[1] flex cursor-pointer items-center gap-4 px-5 text-left transition-opacity duration-500 md:flex-col md:justify-start md:gap-6 md:px-0 md:pt-8",
                    on ? "pointer-events-none opacity-0" : "opacity-100",
                  )}
                  tabIndex={on ? -1 : 0}
                >
                  <span className="font-display text-2xl text-brass-light tnum md:text-3xl">{pad(i + 1)}</span>
                  <span className="display-s whitespace-nowrap text-white md:[writing-mode:vertical-rl]">
                    {s.title}
                  </span>
                </button>

                {/* Open panel: the story */}
                <div
                  className={cn(
                    "absolute inset-x-0 bottom-0 z-[2] p-6 transition-[opacity,transform] duration-[800ms] ease-[var(--ease-out-expo)] md:p-10 lg:p-14",
                    on ? "translate-y-0 opacity-100 delay-200" : "pointer-events-none translate-y-6 opacity-0 duration-300",
                  )}
                >
                  <p className="flex items-center gap-4 eyebrow text-brass-light">
                    <span className="grid h-9 w-9 place-items-center rounded-full border border-brass-light tnum">
                      {pad(i + 1)}
                    </span>
                    {t("stepOf", { n: i + 1, total: n })}
                  </p>
                  <h3 className="mt-5 max-w-[16ch] font-display text-[clamp(2rem,1.4rem+2.6vw,4.25rem)] leading-[1.02] text-white">
                    {s.title}
                  </h3>
                  <p className="mt-4 max-w-[46ch] text-white/85 md:text-lg">{s.text}</p>
                  <div className="mt-6 md:mt-8">
                    {href.startsWith("#") ? (
                      <a href={href} tabIndex={on ? 0 : -1}>
                        {cta}
                      </a>
                    ) : (
                      <Link href={href} tabIndex={on ? 0 : -1}>
                        {cta}
                      </Link>
                    )}
                  </div>
                </div>

                {/* Scroll progress line: full on panels already passed, filling on the current one */}
                <span aria-hidden className="absolute inset-x-0 top-0 z-[2] h-[2px] bg-white/15">
                  <span
                    className="block h-full origin-left bg-brass-light"
                    style={{ transform: i < step ? "scaleX(1)" : i === step ? "scaleX(var(--seg, 0))" : "scaleX(0)" }}
                  />
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
