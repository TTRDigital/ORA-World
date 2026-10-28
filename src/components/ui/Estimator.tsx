"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";

/** Simple payment estimator. Not an offer of financing; defaults are generic and editable by the visitor. */
type FieldProps = {
  id: string;
  label: string;
  value: number;
  set: (v: number) => void;
  min: number;
  max: number;
  step: number;
  suffix?: string;
  fmt: (n: number) => string;
};
function Field({ id, label, value, set, min, max, step, suffix, fmt }: FieldProps) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <label htmlFor={id} className="eyebrow text-fg-muted">
          {label}
        </label>
        <output className="font-display text-xl tnum" htmlFor={id}>
          {suffix === "$" ? fmt(value) : `${value}${suffix ?? ""}`}
        </output>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => set(Number(e.target.value))}
        className="mt-3 w-full accent-[var(--accent)]"
      />
    </div>
  );
}

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
  const fmt = (n: number, frac = 0) =>
    n.toLocaleString(locale === "es" ? "es-PR" : "en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: frac,
    });
  return (
    <div className="grid grid-cols-12 gap-x-6 gap-y-10">
      <div className="col-span-12 space-y-8 md:col-span-7">
        <Field
          id="est-price"
          fmt={fmt}
          label={t("price")}
          value={price}
          set={setPrice}
          min={500_000}
          max={10_000_000}
          step={50_000}
          suffix="$"
        />
        <Field
          id="est-down"
          fmt={fmt}
          label={t("down")}
          value={down}
          set={setDown}
          min={10}
          max={80}
          step={5}
          suffix="%"
        />
        <Field
          id="est-rate"
          fmt={fmt}
          label={t("rate")}
          value={rate}
          set={setRate}
          min={3}
          max={10}
          step={0.125}
          suffix="%"
        />
        <Field
          id="est-term"
          fmt={fmt}
          label={t("term")}
          value={years}
          set={setYears}
          min={10}
          max={30}
          step={5}
          suffix={` ${t("years")}`}
        />
      </div>
      <div className="col-span-12 border border-rule p-8 md:col-span-5">
        <p className="eyebrow text-accent-ink">{t("monthly")}</p>
        <p className="mt-4 stat" aria-live="polite">
          {fmt(monthly)}
        </p>
        <dl className="mt-6 space-y-2 small text-fg-muted">
          <div className="flex justify-between">
            <dt>{t("loan")}</dt>
            <dd className="tnum">{fmt(price * (1 - down / 100))}</dd>
          </div>
          <div className="flex justify-between">
            <dt>{t("downAmount")}</dt>
            <dd className="tnum">{fmt(price * (down / 100))}</dd>
          </div>
        </dl>
        <p className="mt-6 border-t border-rule pt-4 small text-fg-muted">{c("estimateOnly")}</p>
      </div>
    </div>
  );
}
