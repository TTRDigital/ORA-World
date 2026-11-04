"use client";

import Image from "next/image";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import { useTranslations } from "next-intl";
import type { Collection, HomeContent } from "@/content/types";
import type { Localized } from "@/lib/localize";
import { Link } from "@/i18n/navigation";
import { Accent } from "@/components/ui/Accent";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { CheckIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

type Props = {
  block: Localized<HomeContent["residences"]>;
  collections: Localized<Collection>[];
  planCounts: Record<string, number>;
};

/**
 * The collections as an interactive panel: a tab per collection, each with an interior/alternate view
 * toggle, its features as a checklist and a spec card. Unconfirmed figures read "to be confirmed".
 */
export function CollectionTabs({ block, collections, planCounts }: Props) {
  const t = useTranslations("common");
  const h = useTranslations("home");
  const n = useTranslations("nav");
  const base = useId();
  const [active, setActive] = useState(0);
  const [alt, setAlt] = useState(false);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const c = collections[active];

  const select = (i: number) => {
    setActive(i);
    setAlt(false);
    tabs.current[i]?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };
  // Swipe the image left or right to move between collections (touch).
  const touch = useRef<{ x: number; y: number } | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touch.current;
    touch.current = null;
    if (!start) return;
    const dx = e.changedTouches[0].clientX - start.x;
    const dy = e.changedTouches[0].clientY - start.y;
    if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy)) return;
    const last = collections.length - 1;
    select(dx < 0 ? (active === last ? 0 : active + 1) : active === 0 ? last : active - 1);
  };
  const onKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    const last = collections.length - 1;
    let next = -1;
    if (e.key === "ArrowRight") next = active === last ? 0 : active + 1;
    if (e.key === "ArrowLeft") next = active === 0 ? last : active - 1;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = last;
    if (next < 0) return;
    e.preventDefault();
    select(next);
    tabs.current[next]?.focus();
  };

  const tbc = h("toBeConfirmed");
  const specs = [
    { label: t("bedrooms"), value: c.bedrooms },
    { label: h("size"), value: c.sizeRange },
    { label: t("from"), value: c.fromPrice ? `$${c.fromPrice.toLocaleString("en-US")}` : null },
    { label: n("floorPlans"), value: planCounts[c.slug] ? String(planCounts[c.slug]) : null },
  ];
  const shown = alt && c.hoverImage ? c.hoverImage : c.image;

  return (
    <section id="residences" className="py-section" aria-labelledby="res-title">
      <div className="container-x">
        <div className="grid grid-cols-12 gap-x-6">
          <div className="col-span-12 md:col-span-7">
            <Eyebrow>{block.eyebrow}</Eyebrow>
            <h2 id="res-title" className="mt-6 display-l" data-reveal>
              <Accent text={block.title} />
            </h2>
          </div>
          <p
            className="col-span-12 mt-6 max-w-[46ch] lead text-fg-muted md:col-span-4 md:col-start-9 md:mt-16"
            data-reveal
          >
            {block.intro}
          </p>
        </div>

        <div
          role="tablist"
          aria-label={block.eyebrow}
          className="-mx-[var(--gutter)] mt-14 flex snap-x gap-2 overflow-x-auto px-[var(--gutter)] pb-2 md:mx-0 md:mt-20 md:px-0"
        >
          {collections.map((col, i) => (
            <button
              key={col.slug}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              id={`${base}-tab-${i}`}
              role="tab"
              type="button"
              aria-selected={i === active}
              aria-controls={`${base}-panel`}
              tabIndex={i === active ? 0 : -1}
              onClick={() => select(i)}
              onKeyDown={onKey}
              className={cn(
                "flex shrink-0 cursor-pointer snap-start items-center gap-3 rounded-full border px-5 py-3 eyebrow transition-colors duration-500",
                i === active ? "border-basalt bg-basalt text-white" : "border-rule hover:border-fg",
              )}
            >
              <span className="tnum">0{i + 1}</span>
              {col.name}
            </button>
          ))}
        </div>

        <div
          id={`${base}-panel`}
          role="tabpanel"
          aria-labelledby={`${base}-tab-${active}`}
          className="mt-8 grid grid-cols-12 gap-x-6 gap-y-10 border-t border-rule pt-8"
        >
          <div className="col-span-12 lg:col-span-7">
            <div
              className="relative aspect-[16/10] touch-pan-y overflow-hidden rounded-[1.5rem] bg-bg-alt"
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              {/* Only the active collection's two views are mounted: less DOM and decoding on load. */}
              {[c.image, c.hoverImage].map((im, j) =>
                im ? (
                  <Image
                    key={`${c.slug}-${j}`}
                    src={im.src}
                    alt={im === shown ? im.alt : ""}
                    aria-hidden={im !== shown}
                    fill
                    sizes="(min-width: 1024px) 58vw, 100vw"
                    placeholder={im.blurDataURL ? "blur" : "empty"}
                    blurDataURL={im.blurDataURL}
                    className={cn(
                      "animate-[tabfade_.9s_var(--ease-out-expo)] object-cover transition-[opacity,transform] duration-[900ms] ease-[var(--ease-out-expo)]",
                      im === shown ? "scale-100 opacity-100" : "scale-[1.03] opacity-0",
                    )}
                    style={{ objectPosition: im.position }}
                  />
                ) : null,
              )}
              <style>{`@keyframes tabfade{from{opacity:0}}`}</style>
              {c.hoverImage && (
                <div className="absolute top-4 left-4 flex rounded-full bg-bone/95 p-1 text-basalt shadow-sm">
                  {[h("viewMain"), h("viewAlt")].map((label, j) => (
                    <button
                      key={j}
                      type="button"
                      aria-pressed={alt === (j === 1)}
                      onClick={() => setAlt(j === 1)}
                      className={cn(
                        "min-h-9 cursor-pointer rounded-full px-4 text-[11px] tracking-[0.12em] uppercase transition-colors",
                        alt === (j === 1) ? "bg-basalt text-white" : "hover:bg-travertine",
                      )}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              )}
              <p className="absolute right-3 bottom-3 text-[10px] tracking-[0.14em] text-white/85 uppercase">
                {t("rendering")}
              </p>
            </div>
            <div aria-hidden className="mt-4 flex items-center justify-center gap-2 lg:hidden">
              {collections.map((col, i) => (
                <span
                  key={col.slug}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-500",
                    i === active ? "w-6 bg-accent" : "w-1.5 bg-rule-strong",
                  )}
                />
              ))}
            </div>
          </div>

          <div className="col-span-12 flex flex-col lg:col-span-5">
            <h3 className="display-m">{c.name}</h3>
            <p className="mt-3 eyebrow text-accent-ink">{c.tagline}</p>
            <p className="mt-6 text-fg-muted">{c.description[0]}</p>
            <ul className="mt-6 space-y-3">
              {c.features.map((f, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent text-white">
                    <CheckIcon className="h-3 w-3" />
                  </span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <dl className="mt-8 grid grid-cols-2 border-t border-l border-rule">
              {specs.map((s) => (
                <div key={s.label} className="border-r border-b border-rule p-4">
                  <dt className="eyebrow text-fg-muted">{s.label}</dt>
                  <dd className={cn("mt-2", s.value ? "display-s" : "small text-fg-muted italic")}>{s.value ?? tbc}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button as={Link} href={`/residences/${c.slug}`} variant="dark">
                {h("viewCollection")}
                <span className="sr-only"> · {c.name}</span>
              </Button>
              <Button as={Link} href="/floor-plans" variant="text">
                {h("allPlans")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
