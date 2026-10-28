"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import type { GalleryCategory, GalleryImage } from "@/content/types";
import type { Localized } from "@/lib/localize";
import { Lightbox } from "./Lightbox";
import { cn } from "@/lib/utils";

const CATS: GalleryCategory[] = ["exteriors", "interiors", "amenities", "lifestyle", "construction"];

/** Masonry (CSS columns) with category filters and a full-screen lightbox. */
export function GalleryGrid({ items, showFilters = true, className }: { items: Localized<GalleryImage>[]; showFilters?: boolean; className?: string }) {
  const t = useTranslations("pages.gallery.cats");
  const c = useTranslations("common");
  const [cat, setCat] = useState<GalleryCategory | "all">("all");
  const [open, setOpen] = useState<number | null>(null);
  const shown = useMemo(() => (cat === "all" ? items : items.filter((i) => i.category === cat)), [items, cat]);
  const present = CATS.filter((k) => items.some((i) => i.category === k));
  return (
    <div className={className}>
      {showFilters && present.length > 1 && (
        <div role="group" aria-label={c("filters")} className="flex flex-wrap gap-x-8 gap-y-3 border-b border-rule">
          {(["all", ...present] as const).map((k) => (
            <button key={k} type="button" onClick={() => setCat(k)} aria-pressed={cat === k} className={cn("eyebrow relative cursor-pointer py-4 transition-colors", cat === k ? "text-accent-ink" : "text-fg-muted hover:text-fg")}>
              {k === "all" ? c("all") : t(k)}
              <span aria-hidden className={cn("absolute inset-x-0 -bottom-px h-px bg-accent transition-transform duration-500 ease-[var(--ease-out-expo)]", cat === k ? "scale-x-100" : "scale-x-0")} />
            </button>
          ))}
        </div>
      )}
      <ul className="mt-8 columns-1 gap-5 sm:columns-2 lg:columns-3 [&>li]:mb-5 [&>li]:break-inside-avoid">
        {shown.map((g, i) => (
          <li key={g.id}>
            <button type="button" onClick={() => setOpen(i)} className="group relative block w-full cursor-zoom-in overflow-hidden bg-surface text-left" aria-label={`${g.caption} — ${c("view")}`}>
              <Image src={g.image.src} alt={g.image.alt} width={g.image.width} height={g.image.height} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="h-auto w-full transition-transform duration-[1400ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.03]" placeholder={g.image.blurDataURL ? "blur" : "empty"} blurDataURL={g.image.blurDataURL} />
              <span className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4 text-white opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100" style={{ background: "linear-gradient(to top, rgb(28 27 25 / .6), transparent)" }}>
                <span className="small">{g.caption}</span>
                {g.image.rendering && <span className="text-[10px] tracking-[0.14em] uppercase opacity-80">{c("rendering")}</span>}
              </span>
            </button>
          </li>
        ))}
      </ul>
      <Lightbox items={shown.map((g) => ({ ...g.image, caption: g.caption }))} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />
    </div>
  );
}
