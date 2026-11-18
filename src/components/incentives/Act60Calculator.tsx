"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type L = {
  title: string;
  r0: string;
  r4: string;
  gains: string;
  federal: string;
  pr: string;
  diff: string;
  note: string;
};

const FEDERAL = 0.238; // top long-term capital gains rate 20% + 3.8% NIIT

/** Illustrative only (copy and method from ORA World v2): federal LTCG vs the selected PR regime. */
export function Act60Calculator({ l }: { l: L }) {
  const [rate, setRate] = useState<0 | 0.04>(0.04);
  const [gains, setGains] = useState(1_000_000);
  const usd = (n: number) => "$" + Math.round(n).toLocaleString("en-US");
  const fed = gains * FEDERAL;
  const pr = gains * rate;
  return (
    <div className="rounded-[1.25rem] border border-rule bg-white/60 p-6 md:p-8">
      <p className="eyebrow text-accent-ink">{l.title}</p>
      <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label={l.title}>
        {(
          [
            [0, l.r0],
            [0.04, l.r4],
          ] as const
        ).map(([r, label]) => (
          <button
            key={r}
            type="button"
            aria-pressed={rate === r}
            onClick={() => setRate(r)}
            className={cn(
              "h-10 cursor-pointer rounded-full border px-4 text-sm transition-colors",
              rate === r ? "border-accent-ink bg-accent-ink text-white" : "border-rule hover:border-accent",
            )}
          >
            {label}
          </button>
        ))}
      </div>
      <label className="mt-8 block">
        <span className="flex items-baseline justify-between gap-4">
          <span className="text-fg-muted">{l.gains}</span>
          <span className="display-s tnum">{usd(gains)}</span>
        </span>
        <input
          type="range"
          min={100_000}
          max={10_000_000}
          step={100_000}
          value={gains}
          onChange={(e) => setGains(Number(e.target.value))}
          className="mt-4 w-full accent-[var(--accent-ink)]"
        />
      </label>
      <dl className="mt-8 divide-y divide-rule border-y border-rule">
        <div className="flex justify-between gap-4 py-3">
          <dt className="text-fg-muted">{l.federal}</dt>
          <dd className="tnum">{usd(fed)}</dd>
        </div>
        <div className="flex justify-between gap-4 py-3">
          <dt className="text-fg-muted">
            {l.pr} ({rate * 100}%)
          </dt>
          <dd className="tnum">{usd(pr)}</dd>
        </div>
      </dl>
      <p className="mt-6 text-fg-muted">{l.diff}</p>
      <p className="mt-1 font-display text-[clamp(2.2rem,1.6rem+2vw,3.4rem)] text-accent-ink tnum" aria-live="polite">
        {usd(fed - pr)}
      </p>
      <p className="mt-6 small text-fg-muted">{l.note}</p>
    </div>
  );
}
