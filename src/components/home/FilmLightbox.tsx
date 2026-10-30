"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { track } from "@/lib/analytics";

type Props = { url: string | null; youtubeId?: string | null; variant?: "light" | "primary" };

/** "Watch the film" opens the full film with sound: self-hosted MP4 when present, otherwise the YouTube film. */
export function FilmButton({ url, youtubeId, variant = "light" }: Props) {
  const t = useTranslations("common");
  const h = useTranslations("home");
  const [open, setOpen] = useState(false);
  if (!url && !youtubeId) {
    return (
      <span className="inline-flex items-center gap-3 px-2 py-4 eyebrow text-white/55" title={h("watchFilmSoon")}>
        <PlayGlyph />
        {t("watchFilm")} · {h("watchFilmSoon")}
      </span>
    );
  }
  return (
    <>
      <Button
        variant={variant}
        onClick={() => {
          setOpen(true);
          track("film_play");
        }}
        icon={<PlayGlyph />}
      >
        {t("watchFilm")}
      </Button>
      <Modal open={open} onClose={() => setOpen(false)} label={t("watchFilm")}>
        {url ? (
          <video src={url} controls autoPlay playsInline className="max-h-[85vh] w-full max-w-6xl bg-black" />
        ) : (
          <div className="aspect-video w-full max-w-6xl bg-black">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
              title={t("watchFilm")}
              className="h-full w-full border-0"
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
            />
          </div>
        )}
      </Modal>
    </>
  );
}

export function PlayGlyph({ className = "h-3 w-3" }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 12" className={className} aria-hidden="true">
      <path d="M2 1.5v9l8-4.5z" fill="currentColor" />
    </svg>
  );
}
