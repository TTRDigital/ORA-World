"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { ImageRef } from "@/content/types";
import type { Localized } from "@/lib/localize";
import { ArrowIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";
import { LiveVideo } from "@/components/ui/LiveVideo";

/**
 * Room-by-room slideshow (client: "larger images, not cards"). Each render is shown wide and flat
 * at its own 16:9 shape, so nothing is cropped; the next one peeks in from the right. Swipe or
 * scroll sideways, or use the arrows; the counter and caption follow the slide in view.
 */
export function GalleryCarousel({
  items,
  label,
  prev,
  next,
}: {
  items: Localized<ImageRef>[];
  label: string;
  prev: string;
  next: string;
}) {
  const track = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const total = items.length;

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i));
        }),
      { root: el, threshold: 0.6 },
    );
    el.querySelectorAll("li").forEach((li) => io.observe(li));
    return () => io.disconnect();
  }, []);

  const go = (i: number) => {
    const el = track.current;
    const li = el?.children[(i + total) % total] as HTMLElement | undefined;
    if (el && li) el.scrollTo({ left: li.offsetLeft - el.offsetLeft, behavior: "smooth" });
  };
  const pad = (v: number) => String(v).padStart(2, "0");

  return (
    <div role="region" aria-roledescription="carousel" aria-label={label}>
      <ul
        ref={track}
        tabIndex={0}
        aria-label={label}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
            e.preventDefault();
            go(active + (e.key === "ArrowRight" ? 1 : -1));
          }
        }}
        className="-mx-[var(--gutter)] flex snap-x snap-mandatory scroll-px-[var(--gutter)] [scrollbar-width:none] gap-3 overflow-x-auto px-[var(--gutter)] md:gap-5 [&::-webkit-scrollbar]:hidden focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
      >
        {items.map((im, i) => (
          <li
            key={i}
            data-i={i}
            aria-roledescription="slide"
            aria-label={`${i + 1} / ${total}`}
            className="w-[88vw] shrink-0 snap-start md:w-[min(82vw,1240px)]"
          >
            <figure className="relative aspect-[16/9] overflow-hidden rounded-[1.25rem] bg-travertine/50">
              <Image
                src={im.src}
                alt={im.alt}
                fill
                quality={85}
                sizes="(min-width: 1512px) 1240px, (min-width: 768px) 82vw, 88vw"
                className="object-cover"
                style={{ objectPosition: im.position }}
              />
              {im.video && <LiveVideo src={im.video} position={im.position} />}
            </figure>
          </li>
        ))}
      </ul>
      <div className="mt-5 flex items-center justify-between gap-6">
        <p className="min-w-0 truncate text-fg-muted" aria-live="polite">
          <span className="mr-3 text-accent-ink tnum">
            {pad(active + 1)} / {pad(total)}
          </span>
          {items[active]?.alt}
        </p>
        <div className="flex shrink-0 gap-2">
          {[
            { d: -1, l: prev, r: "rotate-180" },
            { d: 1, l: next, r: "" },
          ].map(({ d, l, r }) => (
            <button
              key={d}
              type="button"
              aria-label={l}
              onClick={() => go(active + d)}
              className="grid h-12 w-12 cursor-pointer place-items-center rounded-full border border-rule transition-colors hover:border-accent hover:bg-accent hover:text-white"
            >
              <ArrowIcon className={cn(r)} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
