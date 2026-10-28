"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";

/** Simple payment estimator. Not an offer of financing; defaults are generic and editable by the visitor. */
export function Estimator() {
  const t = useTranslations("investment");
  const c = useTranslations("common");
  const locale = useLocale();
  const [price, setPrice] = useState(1_500_000);
  const [down, setDown] = useState(30);
  const [rate, setRate] = useState(6.5);
  const [years, setYears] = useState(30);
  const monthly = useMemo(() => {
    const principal = price * (1 - down / 100);
    const r = rate / 100 / 12;
    const n = years * 12;
    return r === 0 ? principal / n : (principal * r) / (1 - Math.pow(1 + r, -n));
  }, [price, down, rate, years]);
  const fmt = (n: number, frac = 0) => n.toLocaleString(locale === "es" ? "es-PR" : "en-US", { style: "currency", currency: "USD", maximumFractionDigits: frac });
  const Field = ({ id, label, value, set, min, max, step, suffix }: { id: string; label: string; value: number; set: (v: number) => void; min: number; max: number; step: number; suffix?: string }) => (
    <div>
      <div className="flex items-baseline justify-between">
        <label htmlFor={id} className="eyebrow text-fg-muted">{label}</label>
        <output className="tnum font-display text-xl" htmlFor={id}>{suffix === "$" ? fmt(value) : `${value}${suffix ?? ""}`}</output>
      </div>
      <input id={id} type="range" min={min} max={max} step={step} value={value} onChange={(e) => set(Number(e.target.value))} className="mt-3 w-full accent-[var(--accent)]" />
    </div>
  );
  return (
    <div className="grid grid-cols-12 gap-x-6 gap-y-10">
      <div className="col-span-12 space-y-8 md:col-span-7">
        <Field id="est-price" label={t("price")} value={price} set={setPrice} min={500_000} max={10_000_000} step={50_000} suffix="$" />
        <Field id="est-down" label={t("down")} value={down} set={setDown} min={10} max={80} step={5} suffix="%" />
        <Field id="est-rate" label={t("rate")} value={rate} set={setRate} min={3} max={10} step={0.125} suffix="%" />
        <Field id="est-term" label={t("term")} value={years} set={setYears} min={10} max={30} step={5} suffix={` ${t("years")}`} />
      </div>
      <div className="col-span-12 border border-rule p-8 md:col-span-5">
        <p className="eyebrow text-accent-ink">{t("monthly")}</p>
        <p className="stat mt-4" aria-live="polite">{fmt(monthly)}</p>
        <dl className="small mt-6 space-y-2 text-fg-muted">
          <div className="flex justify-between"><dt>{t("loan")}</dt><dd className="tnum">{fmt(price * (1 - down / 100))}</dd></div>
          <div className="flex justify-between"><dt>{t("downAmount")}</dt><dd className="tnum">{fmt(price * (down / 100))}</dd></div>
        </dl>
        <p className="small mt-6 border-t border-rule pt-4 text-fg-muted">{c("estimateOnly")}</p>
      </div>
    </div>
  );
}
