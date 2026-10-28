"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Modal } from "@/components/ui/Modal";

export type LightboxItem = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  rendering?: boolean;
  blurDataURL?: string;
};

/** Full-screen lightbox: swipe, keyboard arrows, captions, rendering labels. */
export function Lightbox({
  items,
  index,
  onClose,
  onIndex,
}: {
  items: LightboxItem[];
  index: number | null;
  onClose: () => void;
  onIndex: (i: number) => void;
}) {
  const t = useTranslations("common");
  const start = useRef<number | null>(null);
  const [dir, setDir] = useState(0);
  const open = index !== null;
  const go = useCallback(
    (d: number) => {
      if (index === null) return;
      setDir(d);
      onIndex((index + d + items.length) % items.length);
    },
    [index, items.length, onIndex],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, go]);

  if (index === null) return null;
  const it = items[index];
  return (
    <Modal open={open} onClose={onClose} label={it.caption || it.alt}>
      <div
        className="relative flex h-full w-full max-w-7xl flex-col items-center justify-center"
        onPointerDown={(e) => (start.current = e.clientX)}
        onPointerUp={(e) => {
          if (start.current === null) return;
          const dx = e.clientX - start.current;
          if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
          start.current = null;
        }}
      >
        <figure
          key={it.src}
          className="relative flex max-h-[78vh] w-full items-center justify-center"
          style={{ animation: `lbin 700ms var(--ease-out-expo)` }}
        >
          <Image
            src={it.src}
            alt={it.alt}
            width={it.width}
            height={it.height}
            sizes="100vw"
            className="max-h-[78vh] w-auto object-contain"
            placeholder={it.blurDataURL ? "blur" : "empty"}
            blurDataURL={it.blurDataURL}
            priority
          />
        </figure>
        <div className="mt-5 flex w-full items-center justify-between gap-6 text-white/80">
          <button
            type="button"
            onClick={() => go(-1)}
            className="cursor-pointer py-2 eyebrow"
            aria-label={t("previous")}
          >
            ← {t("previous")}
          </button>
          <p className="text-center small">
            {it.caption}
            {it.rendering && <span className="ml-3 eyebrow text-white/50">{t("rendering")}</span>}
            <span className="ml-3 eyebrow text-white/50 tnum">
              {index + 1} / {items.length}
            </span>
          </p>
          <button type="button" onClick={() => go(1)} className="cursor-pointer py-2 eyebrow" aria-label={t("next")}>
            {t("next")} →
          </button>
        </div>
        <style>{`@keyframes lbin{from{opacity:0;transform:translateX(${dir * 24}px)}to{opacity:1;transform:none}}`}</style>
      </div>
    </Modal>
  );
}
