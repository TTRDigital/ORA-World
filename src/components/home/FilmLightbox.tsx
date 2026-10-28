"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { track } from "@/lib/analytics";

/** "Watch the film" opens the full film with sound. Hidden until the film asset exists. */
export function FilmButton({ url, variant = "light" }: { url: string | null; variant?: "light" | "primary" }) {
  const t = useTranslations("common");
  const h = useTranslations("home");
  const [open, setOpen] = useState(false);
  if (!url) {
    return (
      <span className="eyebrow inline-flex items-center gap-3 px-2 py-4 text-white/55" title={h("watchFilmSoon")}>
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
        <video src={url} controls autoPlay playsInline className="max-h-[85vh] w-full max-w-6xl bg-black" />
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
