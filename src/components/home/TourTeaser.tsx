"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import type { HomeContent } from "@/content/types";
import type { Localized } from "@/lib/localize";
import { Accent } from "@/components/ui/Accent";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Picture } from "@/components/ui/Picture";
import { Modal } from "@/components/ui/Modal";
import { PlayGlyph } from "./FilmLightbox";
import { track } from "@/lib/analytics";

/** An image with a play glyph that opens the 360/VR tour in a full-screen modal. */
export function TourTeaser({ block, url }: { block: Localized<HomeContent["tour"]>; url: string | null }) {
  const h = useTranslations("home");
  const [open, setOpen] = useState(false);
  return (
    <section className="dark-section py-section">
      <div className="container-x grid grid-cols-12 items-center gap-x-6 gap-y-10">
        <div className="col-span-12 md:col-span-4">
          <Eyebrow className="text-dark-accent">{block.eyebrow}</Eyebrow>
          <h2 className="display-l mt-6" data-reveal>
            <Accent text={block.title} className="text-dark-accent" />
          </h2>
          <p className="lead mt-6 max-w-[36ch] text-dark-fg/80" data-reveal>
            {block.text}
          </p>
        </div>
        <div className="col-span-12 md:col-span-8">
          <button
            type="button"
            disabled={!url}
            onClick={() => {
              setOpen(true);
              track("tour_open");
            }}
            className="group relative block w-full cursor-pointer text-left disabled:cursor-default"
            aria-label={h("openTour")}
          >
            <Picture image={block.image} sizes="(min-width: 768px) 66vw, 100vw" aspect="16/9" showCaption />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-20 w-20 items-center justify-center rounded-full border border-white/70 bg-basalt/30 text-white backdrop-blur-sm transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-110">
                <PlayGlyph className="ml-1 h-5 w-5" />
              </span>
            </span>
            <span className="eyebrow absolute top-4 left-4 text-white/90">360° · VR</span>
          </button>
        </div>
      </div>
      {url && (
        <Modal open={open} onClose={() => setOpen(false)} label={h("openTour")}>
          <iframe src={url} title={h("openTour")} className="h-[85vh] w-full max-w-7xl bg-black" allow="xr-spatial-tracking; gyroscope; accelerometer; fullscreen" allowFullScreen />
        </Modal>
      )}
    </section>
  );
}
