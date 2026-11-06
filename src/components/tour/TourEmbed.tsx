"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import type { ImageRef } from "@/content/types";
import type { Localized } from "@/lib/localize";
import { Picture } from "@/components/ui/Picture";
import { PlayGlyph } from "@/components/home/FilmLightbox";
import { track } from "@/lib/analytics";

/** 360/VR embed loaded on click (click-to-load keeps the page light and respects data use). */
export function TourEmbed({ url, poster }: { url: string | null; poster: Localized<ImageRef> }) {
  const t = useTranslations("pages.tour");
  const c = useTranslations("common");
  const [on, setOn] = useState(false);
  if (!url) return <Picture image={poster} sizes="100vw" aspect="16/9" />;
  if (on)
    return (
      <iframe
        src={url}
        title={t("launch")}
        className="aspect-video w-full bg-black"
        allow="xr-spatial-tracking; gyroscope; accelerometer; fullscreen"
        allowFullScreen
      />
    );
  return (
    <button
      type="button"
      onClick={() => {
        setOn(true);
        track("tour_open", { source: "virtual-tour" });
      }}
      className="group relative block w-full cursor-pointer text-left"
    >
      <Picture image={poster} sizes="100vw" aspect="16/9" reveal={false} showCaption={false} />
      <span className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-white">
        <span className="flex h-20 w-20 items-center justify-center rounded-full border border-white/70 bg-basalt/30 backdrop-blur-sm transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-110">
          <PlayGlyph className="ml-1 h-5 w-5" />
        </span>
        <span className="eyebrow">{t("launch")}</span>
      </span>
      {/* Rendering note sits outside the button's name (it is decorative to the action) */}
      {poster.rendering && (
        <span
          aria-hidden
          className="pointer-events-none absolute bottom-3 left-3 rounded-full bg-basalt/55 px-2.5 py-1 text-[10px] tracking-[0.14em] text-white uppercase backdrop-blur-sm"
        >
          {c("rendering")}
        </span>
      )}
    </button>
  );
}
