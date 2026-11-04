"use client";

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

const APTS = 129;
const SUITES = 42;
const COLS = 19; // 19 × 9 = 171 = 129 apartments + 42 hotel suites

/**
 * Tesoro Del Mar in one picture: a pinned board of 171 dots, one per apartment and hotel suite, that fills
 * in as the published facts tick off on the right. Apartments light in brass, suites in white; the big
 * counter under the board follows the active fact. Same choreography on phones, stacked.
 */
export function DotGrid({ block }: { block: Localized<HomeContent["glance"]> }) {
  const h = useTranslations("home");
  const root = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const [pinned, setPinned] = useState(true);
  const facts = block.board;
  const n = facts.length;

  useEffect(() => {
    if (document.documentElement.classList.contains("reduced-motion")) {
      const id = requestAnimationFrame(() => {
        setPinned(false);
        setStep(n - 1);
      });
      return () => cancelAnimationFrame(id);
    }
    let raf = 0;
    const measure = () => {
      raf = 0;
      const el = root.current;
      if (!el) return;
      const run = el.offsetHeight - window.innerHeight;
      const p = run > 0 ? Math.min(1, Math.max(0, -el.getBoundingClientRect().top / run)) : 0;
      setStep(Math.min(n - 1, Math.floor(p * n * 0.999)));
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

  const f = facts[step];
  const lit = (i: number) => (i < APTS ? step >= 1 : step >= 2);

  return (
    <section aria-labelledby="glance-title" className="relative dark-section">
      <div className="container-x pt-section pb-12 md:pb-16">
        <Eyebrow className="text-brass-light">{block.eyebrow}</Eyebrow>
        <div className="mt-6 grid grid-cols-12 gap-x-6 gap-y-6">
          <h2 id="glance-title" className="col-span-12 display-l text-white md:col-span-7" data-reveal>
            <Accent text={block.title} className="text-brass-light" />
          </h2>
          <p className="col-span-12 max-w-[44ch] lead text-white/80 md:col-span-5 md:mt-4">{block.body}</p>
        </div>
      </div>

      <div ref={root} className={cn("relative", pinned ? "h-[420vh]" : "")}>
        <div className={cn("flex items-center", pinned && "sticky top-0 h-dvh")}>
          <div className="container-x grid w-full grid-cols-12 items-center gap-x-6 gap-y-5 pt-[var(--header-h)] pb-6 md:gap-y-8">
            {/* Board */}
            <div className="col-span-12 rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-5 shadow-[0_40px_80px_-40px_rgba(0,0,0,.8)] md:p-8 lg:col-span-6">
              <div
                aria-hidden
                className="grid gap-[clamp(4px,0.9vw,10px)]"
                style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }}
              >
                {Array.from({ length: APTS + SUITES }, (_, i) => (
                  <span
                    key={i}
                    className={cn(
                      "aspect-square rounded-full transition-[background-color,transform,box-shadow] duration-500",
                      lit(i)
                        ? i < APTS
                          ? "scale-100 bg-brass-light shadow-[0_0_12px_rgba(212,185,135,.45)]"
                          : "scale-100 bg-white shadow-[0_0_12px_rgba(255,255,255,.35)]"
                        : "scale-75 bg-white/15",
                      step >= 3 && "animate-[dotwave_2.4s_ease-in-out_infinite]",
                    )}
                    style={{
                      transitionDelay: `${(i % COLS) * 18 + Math.floor(i / COLS) * 12}ms`,
                      animationDelay: `${((i % COLS) + Math.floor(i / COLS)) * 40}ms`,
                    }}
                  />
                ))}
              </div>
              <div className="mt-6 flex items-end justify-between gap-4 md:mt-8">
                <p aria-live="polite">
                  <span
                    key={step}
                    className="block animate-[numin_.7s_var(--ease-out-expo)_both] font-display text-[clamp(3rem,2rem+4vw,5.5rem)] leading-none font-semibold tracking-[-0.05em] text-white tnum"
                  >
                    {f.value}
                  </span>
                  <span className="mt-2 block eyebrow text-brass-light">{f.unit}</span>
                </p>
                <p className="flex flex-col items-end gap-1.5 text-[12px] text-white/70">
                  <span className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-brass-light" />
                    {APTS} {h("apartments")}
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-white" />
                    {SUITES} {h("hotelSuites")}
                  </span>
                </p>
              </div>
            </div>

            {/* Fact list */}
            <ol className="col-span-12 space-y-1.5 lg:col-span-5 lg:col-start-8 lg:space-y-2">
              {facts.map((it, i) => (
                <li
                  key={i}
                  className={cn(
                    "flex items-start gap-3 rounded-2xl px-4 py-3 transition-[background-color,opacity] duration-500 md:gap-4 md:px-5 md:py-4",
                    i === step ? "bg-white/[0.07]" : "",
                  )}
                >
                  <span
                    className={cn(
                      "mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border transition-[background-color,border-color,color] duration-500",
                      i <= step ? "border-brass-light bg-brass-light text-basalt" : "border-white/30 text-transparent",
                    )}
                  >
                    <CheckIcon className="h-3.5 w-3.5" />
                  </span>
                  <span>
                    <span
                      className={cn(
                        "block text-[15px] font-semibold md:text-base",
                        i > step ? "text-white/60" : "text-white",
                      )}
                    >
                      {it.title}
                    </span>
                    <span className={cn("block text-[13px] text-white/70 md:text-sm", i !== step && "max-md:hidden")}>
                      {it.text}
                    </span>
                  </span>
                </li>
              ))}
              <li className="pt-3 max-md:hidden">
                <Button as={Link} href="/tesoro-del-mar" variant="light">
                  {h("discoverTesoro")}
                </Button>
              </li>
            </ol>
          </div>
        </div>
      </div>
      <style>{`@keyframes dotwave{0%,100%{transform:scale(1)}50%{transform:scale(.72)}}@keyframes numin{from{opacity:0;transform:translateY(30%)}to{opacity:1;transform:none}}`}</style>
    </section>
  );
}
