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
 * section (no pinning). The active panel widens (desktop) or grows tall (mobile), its image settles and
 * its story rises in, while the other two fold into slim numbered strips. Hover or tap a strip to open
 * it; while the section is on screen the panels also advance on their own, with a timer line.
 */
export function Journey({ block }: { block: Localized<HomeContent["journey"]> }) {
  const t = useTranslations("home");
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const [cycle, setCycle] = useState(0);
  const n = block.steps.length;
  const DWELL = 5200;

  // No scroll pinning: the section scrolls normally. Panels open on hover or tap, and advance on
  // their own while the section is on screen; hovering or tapping a panel opens it and restarts the timer.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || document.documentElement.classList.contains("reduced-motion")) return;
    const id = window.setTimeout(() => {
      setActive((v) => (v + 1) % n);
      setCycle((c) => c + 1);
    }, DWELL);
    return () => window.clearTimeout(id);
  }, [visible, active, cycle, n]);

  const open = (i: number) => {
    setActive(i);
    setCycle((c) => c + 1);
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
                  "group bg-basalt-soft relative min-h-0 min-w-0 overflow-hidden rounded-2xl transition-[flex-grow] duration-[1100ms] ease-[var(--ease-out-expo)]",
                  on ? "flex-[7]" : "flex-[1]",
                )}
                data-active={on || undefined}
                onPointerEnter={(e) => {
                  if (e.pointerType === "mouse") open(i);
                }}
              >
                <Image
                  src={s.image.src}
                  alt={s.image.alt}
                  fill
                  sizes={fullBleedSizes(s.image, 1.1)}
                  className={cn(
                    "object-cover transition-[transform,filter] duration-[1600ms] ease-[var(--ease-out-expo)]",
                    on ? "scale-100 brightness-100" : "scale-110 brightness-[.55] saturate-[.7]",
                  )}
                  style={{ objectPosition: s.image.position }}
                />
                <div
                  className={cn(
                    "absolute inset-0 transition-opacity duration-700",
                    on ? "bg-gradient-to-t from-basalt/90 via-basalt/45 to-basalt/5" : "bg-basalt/30",
                  )}
                />

                {/* Collapsed strip: number + title, rotated on desktop */}
                <button
                  type="button"
                  onClick={() => open(i)}
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
                    "absolute inset-x-0 bottom-0 z-[2] p-6 transition-[opacity,transform] duration-[900ms] ease-[var(--ease-out-expo)] md:p-10 lg:p-14",
                    on ? "translate-y-0 opacity-100 delay-300" : "pointer-events-none translate-y-8 opacity-0",
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

                {/* Per-panel progress line */}
                <span aria-hidden className="absolute inset-x-0 top-0 z-[2] h-[2px] bg-white/15">
                  {on && (
                    <span
                      key={cycle}
                      className={cn(
                        "block h-full origin-left bg-brass-light",
                        visible ? "animate-[journeybar_5.2s_linear_both]" : "scale-x-100",
                      )}
                    />
                  )}
                </span>
              </li>
            );
          })}
        </ol>
      </div>
      <style>{`@keyframes journeybar{from{transform:scaleX(0)}to{transform:scaleX(1)}}`}</style>
    </section>
  );
}
