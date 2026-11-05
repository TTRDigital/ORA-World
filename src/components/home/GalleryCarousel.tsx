"use client";

import { useEffect, useState } from "react";
import {
  PerspectiveCarousel,
  type PerspectiveCarouselItem,
} from "@/components/vendor/vengeance-ui/perspective-carousel";

/** Vengeance UI perspective carousel, sized for the viewport and set in the house palette. */
export function GalleryCarousel({ items, label }: { items: PerspectiveCarouselItem[]; label: string }) {
  const [w, setW] = useState(340);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const fit = () => setW(mq.matches ? 340 : 220);
    fit();
    mq.addEventListener("change", fit);
    return () => mq.removeEventListener("change", fit);
  }, []);
  return (
    <div className="h-[440px] md:h-[640px]">
      <PerspectiveCarousel
        items={items}
        loop
        defaultActiveIndex={Math.floor(items.length / 2)}
        slideWidth={w}
        rotationStep={42}
        inactiveScale={0.8}
        aria-label={label}
        className="rounded-[1.25rem] outline-none focus-visible:ring-2 focus-visible:ring-accent"
        imageClassName="rounded-[1.25rem] shadow-[0_30px_60px_-25px_rgba(28,27,25,.45)]"
        labelClassName="max-w-[90%] truncate text-sm text-fg-muted"
        controlsClassName="border-rule bg-bg/85 text-fg"
      />
    </div>
  );
}
