"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import type { LightboxItem } from "@/components/gallery/Lightbox";
import { cn } from "@/lib/utils";

/**
 * Brochure viewer. Landscape presentations (the client's PDF is 16:9 slides) show one page at a time
 * at full width; portrait brochures show two-page spreads on desktop. Every page is reachable on every
 * screen size, by arrows, swipe, keyboard or the thumbnail strip.
 */
export function Flipbook({ pages, pdfUrl }: { pages: LightboxItem[]; pdfUrl?: string | null }) {
  const t = useTranslations("common");
  const landscape = (pages[0]?.width ?? 1) >= (pages[0]?.height ?? 1);
  const [wide, setWide] = useState(false);
  const [i, setI] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const strip = useRef<HTMLDivElement>(null);
  const touch = useRef<number | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const on = () => setWide(mq.matches);
    const id = requestAnimationFrame(on);
    mq.addEventListener("change", on);
    return () => {
      cancelAnimationFrame(id);
      mq.removeEventListener("change", on);
    };
  }, []);

  const spread = !landscape && wide ? 2 : 1;
  const count = Math.ceil(pages.length / spread);
  const at = Math.min(i, count - 1);
  const go = (d: 1 | -1) => {
    const next = Math.min(count - 1, Math.max(0, at + d));
    if (next === at) return;
    setDir(d);
    setI(next);
  };
  const jump = (n: number) => {
    setDir(n > at ? 1 : -1);
    setI(n);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = document.activeElement;
      if (el && ["INPUT", "TEXTAREA", "SELECT"].includes(el.tagName)) return;
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  // Keep the active thumbnail in view by scrolling the strip itself (never the page).
  useEffect(() => {
    const el = strip.current;
    const th = el?.querySelector<HTMLElement>(`[data-thumb="${at}"]`);
    if (!el || !th) return;
    el.scrollTo({ left: th.offsetLeft - (el.clientWidth - th.clientWidth) / 2, behavior: "smooth" });
  }, [at]);

  const shown = pages.slice(at * spread, at * spread + spread);
  const ratio = landscape ? `${pages[0].width} / ${pages[0].height}` : spread === 2 ? "2 / 1.3" : "1 / 1.3";

  return (
    <div>
      <div
        className="relative mx-auto flex max-w-6xl touch-pan-y overflow-hidden bg-surface"
        style={{ aspectRatio: ratio }}
        onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touch.current === null) return;
          const dx = e.changedTouches[0].clientX - touch.current;
          touch.current = null;
          if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        }}
        aria-roledescription="carousel"
        aria-label={t("brochure")}
      >
        {shown.map((p, k) => (
          <div
            key={`${at}-${k}`}
            className={cn(
              "relative h-full animate-[pagein_.6s_var(--ease-out-expo)_both] overflow-hidden bg-bone",
              spread === 2 ? "w-1/2" : "w-full",
              spread === 2 && k === 0 && "border-r border-rule",
            )}
            style={{ ["--from" as string]: dir === 1 ? "6%" : "-6%" }}
          >
            <Image
              src={p.src}
              alt={p.alt}
              fill
              sizes={spread === 2 ? "(min-width: 1200px) 600px, 50vw" : "(min-width: 1200px) 1152px, 100vw"}
              className="object-contain"
              priority={at === 0 && k === 0}
            />
          </div>
        ))}
        <style>{`@keyframes pagein{from{opacity:0;transform:translateX(var(--from))}to{opacity:1;transform:none}}`}</style>
      </div>

      <div className="mx-auto mt-5 flex max-w-6xl items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => go(-1)}
          disabled={at === 0}
          className="min-h-11 cursor-pointer py-2 eyebrow disabled:opacity-30"
        >
          ← {t("previous")}
        </button>
        <p className="eyebrow text-fg-muted tnum" aria-live="polite">
          {at + 1} / {count}
        </p>
        <div className="flex items-center gap-6">
          {pdfUrl && (
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener"
              className="link-underline py-2 eyebrow max-sm:hidden"
              data-track="brochure_download"
            >
              {t("downloadPdf")}
            </a>
          )}
          <button
            type="button"
            onClick={() => go(1)}
            disabled={at === count - 1}
            className="min-h-11 cursor-pointer py-2 eyebrow disabled:opacity-30"
          >
            {t("next")} →
          </button>
        </div>
      </div>

      {/* Thumbnail strip */}
      <div
        ref={strip}
        className="mx-auto mt-5 flex max-w-6xl [scrollbar-width:none] gap-2 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden"
      >
        {Array.from({ length: count }, (_, n) => {
          const p = pages[n * spread];
          return (
            <button
              key={n}
              type="button"
              data-thumb={n}
              onClick={() => jump(n)}
              aria-label={`${t("page")} ${n + 1}`}
              aria-current={n === at ? "page" : undefined}
              className={cn(
                "relative w-24 shrink-0 cursor-pointer overflow-hidden border transition-[border-color,opacity] md:w-32",
                n === at ? "border-accent opacity-100" : "border-transparent opacity-60 hover:opacity-100",
              )}
              style={{ aspectRatio: landscape ? `${p.width} / ${p.height}` : "3 / 4" }}
            >
              <Image src={p.src} alt="" fill sizes="128px" className="object-cover" />
            </button>
          );
        })}
      </div>
      {pdfUrl && (
        <a
          href={pdfUrl}
          target="_blank"
          rel="noopener"
          className="mt-4 inline-block link-underline py-2 eyebrow sm:hidden"
          data-track="brochure_download"
        >
          {t("downloadPdf")}
        </a>
      )}
    </div>
  );
}
