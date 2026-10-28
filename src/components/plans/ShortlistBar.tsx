"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useShortlist, SHORTLIST_MAX } from "@/lib/shortlist";
import { cn } from "@/lib/utils";

/** Floating compare bar: appears once a plan is shortlisted. */
export function ShortlistBar({ names }: { names: Record<string, string> }) {
  const t = useTranslations("common");
  const { items, remove, clear } = useShortlist();
  const visible = items.length > 0;
  return (
    <div
      aria-live="polite"
      className={cn(
        "fixed inset-x-0 bottom-16 z-[45] border-t border-rule bg-bg/95 text-fg backdrop-blur-sm transition-transform duration-700 ease-[var(--ease-out-expo)] md:inset-x-auto md:bottom-6 md:left-1/2 md:w-[min(42rem,calc(100%-3rem))] md:-translate-x-1/2 md:border",
        visible ? "translate-y-0 md:translate-y-0" : "invisible translate-y-full md:translate-y-[150%]",
      )}
    >
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 px-5 py-4">
        <p className="eyebrow text-accent-ink">
          {t("shortlist")} {items.length}/{SHORTLIST_MAX}
        </p>
        <ul className="flex flex-wrap gap-2">
          {items.map((s) => (
            <li key={s} className="flex items-center gap-2 border border-rule px-3 py-1 small">
              {names[s] ?? s}
              <button
                type="button"
                onClick={() => remove(s)}
                aria-label={`${t("removeFromShortlist")} ${names[s] ?? s}`}
                className="cursor-pointer opacity-60 hover:opacity-100"
              >
                ×
              </button>
            </li>
          ))}
        </ul>
        <div className="ml-auto flex items-center gap-5">
          <button type="button" onClick={clear} className="cursor-pointer eyebrow text-fg-muted hover:text-fg">
            {t("clear")}
          </button>
          <Link
            href="/floor-plans/compare"
            className={cn(
              "border px-4 py-2 eyebrow",
              items.length >= 2
                ? "border-accent text-accent-ink hover:bg-accent hover:text-white"
                : "pointer-events-none border-rule text-fg-muted",
            )}
            aria-disabled={items.length < 2}
          >
            {t("compare")}
          </Link>
        </div>
      </div>
    </div>
  );
}
