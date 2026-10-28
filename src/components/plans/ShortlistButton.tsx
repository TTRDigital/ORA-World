"use client";

import { useTranslations } from "next-intl";
import { useShortlist } from "@/lib/shortlist";
import { cn } from "@/lib/utils";

export function ShortlistButton({ slug, className, label }: { slug: string; className?: string; label?: boolean }) {
  const t = useTranslations("common");
  const { has, toggle, full } = useShortlist();
  const active = has(slug);
  const disabled = !active && full;
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(slug);
      }}
      disabled={disabled}
      aria-pressed={active}
      aria-label={active ? t("removeFromShortlist") : t("addToShortlist")}
      title={disabled ? t("shortlistFull") : undefined}
      className={cn(
        "inline-flex cursor-pointer items-center gap-2 py-1 eyebrow transition-colors disabled:cursor-not-allowed disabled:opacity-40",
        active ? "text-accent-ink" : "text-fg-muted hover:text-fg",
        className,
      )}
    >
      <svg
        viewBox="0 0 16 16"
        className="h-4 w-4"
        fill={active ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.2"
        aria-hidden="true"
      >
        <path d="M8 13.5 2.6 8.3a3.1 3.1 0 0 1 4.4-4.4L8 4.9l1-1a3.1 3.1 0 0 1 4.4 4.4z" />
      </svg>
      {label && <span>{active ? t("removeFromShortlist") : t("addToShortlist")}</span>}
    </button>
  );
}
