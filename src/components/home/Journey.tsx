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
 * Discover. Choose. Arrive. — a pinned "shutter" of three full-height panels. Scrolling through the
 * section opens each step in turn: the active panel widens (desktop) or grows tall (mobile), its image
 * settles and its story rises in, while the other two fold into slim numbered strips. Tapping a strip
 * jumps to that step. With reduced motion the section is not pinned and panels open on tap.
 */
export function Journey({ block }: { block: Localized<HomeContent["journey"]> }) {
  const t = useTranslations("home");
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [pinned, setPinned] = useState(true);
  const n = block.steps.length;

  useEffect(() => {
    if (document.documentElement.classList.contains("reduced-motion")) {
      const id = requestAnimationFrame(() => setPinned(false));
      return () => cancelAnimationFrame(id);
    }
    let raf = 0;
    const measure = () => {
      raf = 0;
      const el = root.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const run = el.offsetHeight - window.innerHeight;
      const p = run > 0 ? Math.min(1, Math.max(0, -r.top / run)) : 0;
      setProgress(p);
      setActive(Math.min(n - 1, Math.floor(p * n * 0.999)));
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
  }, [n]);

  const open = (i: number) => {
    const el = root.current;
    if (!pinned || !el) return setActive(i);
    const run = el.offsetHeight - window.innerHeight;
    const top = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + run * ((i + 0.5) / n), behavior: "smooth" });
  };

  const pad = (v: number) => String(v).padStart(2, "0");

  return (
    <section
      ref={root}
      aria-labelledby="journey-title"
      className={cn("relative bg-basalt text-white", pinned ? "h-[340vh]" : "")}
    >
      <div className={cn("flex flex-col overflow-hidden", pinned && "sticky top-0 h-dvh")}>
        {/* Heading band */}
        <div className="container-x flex shrink-0 items-end justify-between gap-6 pt-[calc(var(--header-h)+1.25rem)] pb-5 md:pb-7">
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
                  "group bg-basalt-soft relative min-h-0 min-w-0 overflow-hidden transition-[flex-grow] duration-[1100ms] ease-[var(--ease-out-expo)]",
                  on ? "flex-[7]" : "flex-[1]",
                )}
                data-active={on || undefined}
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
                  <span
                    className="block h-full origin-left bg-brass-light"
                    style={{
                      transform: `scaleX(${pinned ? Math.min(1, Math.max(0, progress * n - i)) : on ? 1 : 0})`,
                    }}
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
