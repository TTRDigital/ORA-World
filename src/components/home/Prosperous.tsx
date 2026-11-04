"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import type { HomeContent, Incentive } from "@/content/types";
import type { Localized } from "@/lib/localize";
import { Link } from "@/i18n/navigation";
import { Accent } from "@/components/ui/Accent";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { CheckIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

type Props = { block: Localized<HomeContent["prosperous"]>; incentives: Localized<Incentive>[] };

const DWELL = 6000;

/**
 * Act 60 without the myths. Pill tabs advance on their own while the section is on screen (each pill
 * fills as a timer). A document card lists the common assumptions and flags the active one; beside it the
 * myth is struck through and the fact from ORA World's own guide arrives with a tick. Taps take over.
 */
export function Prosperous({ block }: Props) {
  const t = useTranslations("home");
  const c = useTranslations("common");
  const root = useRef<HTMLElement>(null);
  const [i, setI] = useState(0);
  const [visible, setVisible] = useState(false);
  const [manual, setManual] = useState(false);
  const [tick, setTick] = useState(0);
  const n = block.myths.length;

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || manual || document.documentElement.classList.contains("reduced-motion")) return;
    const id = window.setTimeout(() => {
      setI((v) => (v + 1) % n);
      setTick((v) => v + 1);
    }, DWELL);
    return () => window.clearTimeout(id);
  }, [visible, manual, i, n]);

  const pick = (k: number) => {
    setManual(true);
    setI(k);
    setTick((v) => v + 1);
  };
  const m = block.myths[i];

  return (
    <section ref={root} className="py-section dark-section" aria-labelledby="prosper-title">
      <div className="container-x">
        <div className="grid grid-cols-12 gap-x-6 gap-y-6">
          <div className="col-span-12 md:col-span-7">
            <Eyebrow className="text-brass-light">{block.eyebrow}</Eyebrow>
            <h2 id="prosper-title" className="mt-6 display-l text-white" data-reveal>
              <Accent text={block.title} className="text-brass-light" />
            </h2>
          </div>
          <p className="col-span-12 max-w-[46ch] lead text-white/80 md:col-span-5 md:mt-16">{block.body[0]}</p>
        </div>

        <div
          role="tablist"
          aria-label={block.eyebrow}
          className="-mx-[var(--gutter)] mt-12 flex [scrollbar-width:none] gap-2 overflow-x-auto px-[var(--gutter)] pb-2 md:mx-0 md:mt-16 md:px-0 [&::-webkit-scrollbar]:hidden"
        >
          {block.myths.map((it, k) => (
            <button
              key={k}
              role="tab"
              type="button"
              aria-selected={k === i}
              onClick={() => pick(k)}
              className={cn(
                "relative shrink-0 cursor-pointer overflow-hidden rounded-full px-5 py-3 text-[13px] font-semibold transition-colors duration-500",
                k === i ? "bg-white text-basalt" : "bg-white/[0.08] text-white/80 hover:bg-white/15",
              )}
            >
              {it.tab}
              {k === i && !manual && (
                <span
                  key={tick}
                  aria-hidden
                  className="absolute inset-x-3 bottom-1 h-[2px] origin-left animate-[pillfill_6s_linear_both] rounded-full bg-brass"
                />
              )}
            </button>
          ))}
        </div>

        <div role="tabpanel" className="mt-6 grid grid-cols-12 items-center gap-x-6 gap-y-8 md:mt-8">
          {/* Document card */}
          <div className="col-span-12 rounded-[1.5rem] bg-bone p-5 text-basalt shadow-[0_40px_80px_-40px_rgba(0,0,0,.9)] md:col-span-6 md:p-7">
            <div className="flex items-center justify-between border-b border-travertine-deep/60 pb-4">
              <p className="text-[12px] font-semibold">{t("assumptions")}</p>
              <span className="rounded-full bg-brass/15 px-3 py-1 text-[11px] font-semibold text-brass-ink">
                {t("checking")}
              </span>
            </div>
            <ul className="mt-2">
              {block.myths.map((it, k) => (
                <li
                  key={k}
                  className={cn(
                    "flex items-center justify-between gap-4 rounded-xl px-3 py-3.5 text-[14px] transition-colors duration-500",
                    k === i ? "bg-brass/15" : "",
                    k < i || (manual && k !== i) ? "text-charcoal-soft" : "",
                  )}
                >
                  <span className={cn(k < i && !manual && "line-through decoration-brass-ink/60")}>{it.myth}</span>
                  {k === i ? (
                    <span className="shrink-0 rounded-full bg-brass-ink px-2.5 py-1 text-[10px] font-semibold tracking-[0.08em] text-white uppercase">
                      {t("myth")}
                    </span>
                  ) : k < i && !manual ? (
                    <CheckIcon className="h-4 w-4 shrink-0 text-palm" />
                  ) : null}
                </li>
              ))}
            </ul>
            <div className="mt-4 border-t border-travertine-deep/60 pt-4">
              <div className="flex items-center justify-between text-[12px] text-charcoal-soft">
                <span>{t("factsChecked")}</span>
                <span className="tnum">
                  {i + 1} / {n}
                </span>
              </div>
              <span className="mt-2 block h-1.5 overflow-hidden rounded-full bg-travertine">
                <span
                  className="block h-full rounded-full bg-palm transition-[width] duration-700"
                  style={{ width: `${((i + 1) / n) * 100}%` }}
                />
              </span>
            </div>
          </div>

          {/* Myth → fact */}
          <div key={i} className="col-span-12 md:col-span-5 md:col-start-8" aria-live="polite">
            <p className="relative inline text-lg text-white/60 md:text-xl">
              <span className="relative">
                {m.myth}
                <span
                  aria-hidden
                  className="absolute top-1/2 left-0 h-[2px] w-full origin-left animate-[strike_.7s_.2s_var(--ease-out-expo)_both] bg-brass-light"
                />
              </span>
            </p>
            <p className="mt-6 flex animate-[factin_.8s_.65s_var(--ease-out-expo)_both] items-start gap-4">
              <span className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brass-light text-basalt">
                <CheckIcon />
              </span>
              <span className="font-display text-[clamp(1.4rem,1.1rem+1.2vw,2.1rem)] leading-[1.2] font-semibold tracking-[-0.02em] text-white">
                {m.fact}
              </span>
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button as={Link} href="/press/what-is-act-60" variant="light">
                {t("readGuide")}
              </Button>
              <Button as={Link} href="/incentives" variant="text" className="text-white">
                {c("learnMore")}
              </Button>
            </div>
          </div>
        </div>
        <p className="mt-12 max-w-[70ch] border-t border-white/10 pt-5 small text-white/60">{block.disclaimer}</p>
      </div>
      <style>{`@keyframes pillfill{from{transform:scaleX(0)}to{transform:scaleX(1)}}@keyframes strike{from{transform:scaleX(0)}to{transform:scaleX(1)}}@keyframes factin{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}`}</style>
    </section>
  );
}
