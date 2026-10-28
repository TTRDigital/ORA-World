"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import type { LightboxItem } from "@/components/gallery/Lightbox";
import { cn } from "@/lib/utils";

/** Brochure viewer: spreads with a page-turn animation; keyboard arrows; falls back to a single page on mobile. */
export function Flipbook({ pages, pdfUrl }: { pages: LightboxItem[]; pdfUrl?: string | null }) {
  const t = useTranslations("common");
  const [i, setI] = useState(0);
  const [turning, setTurning] = useState<1 | -1 | 0>(0);
  const spread = 2;
  const max = Math.max(0, Math.ceil(pages.length / spread) - 1);
  const go = (d: 1 | -1) => {
    const next = Math.min(max, Math.max(0, i + d));
    if (next === i) return;
    setTurning(d);
    window.setTimeout(() => {
      setI(next);
      setTurning(0);
    }, 450);
  };
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });
  const left = pages[i * spread];
  const right = pages[i * spread + 1];
  return (
    <div className="[perspective:2000px]">
      <div className="relative mx-auto flex aspect-[2/1.35] max-w-5xl bg-surface shadow-none md:aspect-[2/1.3]">
        {[left, right].map((p, k) => (
          <div
            key={k}
            className={cn(
              "relative h-full w-1/2 overflow-hidden border-rule bg-bone transition-transform duration-500 ease-[var(--ease-in-out-quart)] [transform-style:preserve-3d]",
              k === 0 ? "origin-right border-r" : "origin-left",
              turning === 1 && k === 1 && "[transform:rotateY(-90deg)]",
              turning === -1 && k === 0 && "[transform:rotateY(90deg)]",
              k === 1 && "max-md:hidden",
            )}
          >
            {p ? (
              <Image src={p.src} alt={p.alt} fill sizes="(min-width: 768px) 45vw, 90vw" className="object-contain" />
            ) : null}
          </div>
        ))}
      </div>
      <div className="mt-5 flex items-center justify-between">
        <button
          type="button"
          onClick={() => go(-1)}
          disabled={i === 0}
          className="cursor-pointer py-2 eyebrow disabled:opacity-30"
        >
          ← {t("previous")}
        </button>
        <p className="eyebrow text-fg-muted tnum">
          {i + 1} / {max + 1}
        </p>
        <div className="flex items-center gap-6">
          {pdfUrl && (
            <a href={pdfUrl} download className="link-underline py-2 eyebrow" data-track="brochure_download">
              {t("downloadPdf")}
            </a>
          )}
          <button
            type="button"
            onClick={() => go(1)}
            disabled={i === max}
            className="cursor-pointer py-2 eyebrow disabled:opacity-30"
          >
            {t("next")} →
          </button>
        </div>
      </div>
    </div>
  );
}
