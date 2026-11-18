"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import type { FloorPlan } from "@/content/types";
import type { Localized } from "@/lib/localize";
import { Link } from "@/i18n/navigation";
import { ArrowIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

type Labels = {
  bedrooms: string;
  any: string;
  level: string;
  residences: string;
  penthouse: string;
  beds: string;
  baths: string;
  interior: string;
  exterior: string;
  viewPlan: string;
  allPlans: string;
  note: string;
};

/**
 * "Find your residence": Tower 1 as a stack of floors (5 to 18). Pick a floor, then a residence, and
 * its real plan drawing and specifications appear beside the tower. A bedroom filter dims floors with
 * no match. On phones the floors become a swipeable row above the plan.
 */
export function TowerExplorer({ plans, l }: { plans: Localized<FloorPlan>[]; l: Labels }) {
  const floors = useMemo(() => {
    const by = new Map<number, Localized<FloorPlan>[]>();
    plans.forEach((p) => {
      const f = parseInt(p.floors ?? "0", 10);
      if (!f) return;
      by.set(f, [...(by.get(f) ?? []), p]);
    });
    return [...by.entries()].sort((a, b) => b[0] - a[0]);
  }, [plans]);
  const bedOptions = useMemo(() => [...new Set(plans.map((p) => p.bedrooms))].sort((a, b) => a - b), [plans]);

  const [beds, setBeds] = useState<number | null>(null);
  const [floor, setFloor] = useState<number>(10);
  const units = floors.find(([f]) => f === floor)?.[1] ?? [];
  const [unitSlug, setUnitSlug] = useState<string>(units[1]?.slug ?? units[0]?.slug ?? "");
  const unit = units.find((u) => u.slug === unitSlug) ?? units[0];

  const pickFloor = (f: number) => {
    setFloor(f);
    const list = floors.find(([x]) => x === f)?.[1] ?? [];
    const match = list.find((u) => beds === null || u.bedrooms === beds) ?? list[0];
    if (match) setUnitSlug(match.slug);
  };
  // Phones: the floors are a sideways row; keep the chosen floor in view.
  const row = useRef<HTMLOListElement>(null);
  useEffect(() => {
    const el = row.current;
    const on = el?.querySelector<HTMLElement>('[aria-pressed="true"]');
    if (el && on && el.scrollWidth > el.clientWidth)
      el.scrollTo({
        left:
          el.scrollLeft +
          on.getBoundingClientRect().left -
          el.getBoundingClientRect().left -
          el.clientWidth / 2 +
          on.offsetWidth / 2,
        behavior: "smooth",
      });
  }, [floor]);
  const fmt = (n: number | null) => (n ? n.toLocaleString("en-US") : "—");

  return (
    <div className="grid grid-cols-12 gap-x-6 gap-y-8">
      {/* Filter */}
      <div className="col-span-12 flex flex-wrap items-center gap-2" role="group" aria-label={l.bedrooms}>
        <span className="mr-2 eyebrow text-fg-muted">{l.bedrooms}</span>
        {[null, ...bedOptions].map((b) => (
          <button
            key={b ?? "any"}
            type="button"
            aria-pressed={beds === b}
            onClick={() => setBeds(b)}
            className={cn(
              "h-10 min-w-10 cursor-pointer rounded-full border px-4 text-sm transition-colors",
              beds === b ? "border-accent-ink bg-accent-ink text-white" : "border-rule hover:border-accent",
            )}
          >
            {b ?? l.any}
          </button>
        ))}
      </div>

      {/* Tower */}
      <ol
        ref={row}
        aria-label="Tower 1"
        className="col-span-12 -mx-[var(--gutter)] flex [scrollbar-width:none] gap-1.5 overflow-x-auto px-[var(--gutter)] pb-1 lg:col-span-4 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0"
      >
        {floors.map(([f, list]) => {
          const ph = list.some((u) => u.collection === "penthouses");
          const hit = beds === null || list.some((u) => u.bedrooms === beds);
          const on = f === floor;
          return (
            <li key={f} className="shrink-0">
              <button
                type="button"
                aria-pressed={on}
                onClick={() => pickFloor(f)}
                className={cn(
                  "group flex w-full cursor-pointer items-center gap-4 rounded-xl border px-4 text-left transition-[background-color,border-color,opacity] duration-300 max-lg:h-12 max-lg:w-auto lg:h-10",
                  on ? "border-accent-ink bg-accent-ink text-white" : "border-rule bg-bg hover:border-accent",
                  !hit && !on && "opacity-35",
                )}
              >
                <span className="w-9 font-display text-lg tnum">{ph ? "PH" : f}</span>
                <span className={cn("hidden flex-1 text-sm lg:block", on ? "text-white/85" : "text-fg-muted")}>
                  {ph ? l.penthouse : `${list.length} ${l.residences}`}
                </span>
                {/* one tick per residence on the floor */}
                <span aria-hidden className="hidden gap-1 lg:flex">
                  {list.map((u) => (
                    <span
                      key={u.slug}
                      className={cn(
                        "h-2.5 w-2.5 rounded-full",
                        on ? "bg-white/80" : beds === null || u.bedrooms === beds ? "bg-accent" : "bg-rule",
                      )}
                    />
                  ))}
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      {/* Floor detail */}
      <div className="col-span-12 lg:col-span-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <p className="display-s">
            {l.level} {floor === 18 ? "18 · PH" : floor}
          </p>
          <div className="flex flex-wrap gap-2">
            {units.map((u) => (
              <button
                key={u.slug}
                type="button"
                aria-pressed={u.slug === unit?.slug}
                onClick={() => setUnitSlug(u.slug)}
                className={cn(
                  "cursor-pointer rounded-full border px-4 py-2 text-sm transition-colors",
                  u.slug === unit?.slug ? "border-basalt bg-basalt text-white" : "border-rule hover:border-accent",
                  beds !== null && u.bedrooms !== beds && u.slug !== unit?.slug && "opacity-40",
                )}
              >
                {u.collection === "penthouses" ? "PH" : u.slug.replace("residence-", "")} · {u.bedrooms} {l.beds}
              </button>
            ))}
          </div>
        </div>

        {unit && (
          <div className="mt-6 grid gap-6 rounded-[1.25rem] border border-rule bg-white/60 p-4 md:grid-cols-[1fr_15rem] md:p-6">
            <div className="relative aspect-[4/3] w-full">
              <Image
                key={unit.slug}
                src={unit.image.src}
                alt={unit.image.alt}
                fill
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="animate-[planin_.5s_ease-out_both] object-contain"
              />
            </div>
            <div className="flex flex-col">
              <p className="eyebrow text-accent-ink">{unit.tower}</p>
              <p className="mt-2 display-s">{unit.name}</p>
              <dl className="mt-5 divide-y divide-rule border-y border-rule text-sm">
                {[
                  [l.beds, String(unit.bedrooms)],
                  [l.baths, String(unit.bathrooms)],
                  [l.interior, `${fmt(unit.interiorSqFt)} sq ft`],
                  [l.exterior, `${fmt(unit.exteriorSqFt)} sq ft`],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between py-2.5">
                    <dt className="text-fg-muted">{k}</dt>
                    <dd className="tnum">{v}</dd>
                  </div>
                ))}
              </dl>
              <ul className="mt-4 space-y-1 text-sm text-fg-muted">
                {unit.highlights.map((h) => (
                  <li key={h}>· {h}</li>
                ))}
              </ul>
              <Link
                href={`/floor-plans/${unit.slug}`}
                className="mt-6 inline-flex items-center gap-3 self-start rounded-full bg-accent-ink px-5 py-3 eyebrow text-white transition-colors hover:bg-basalt"
              >
                {l.viewPlan}
                <ArrowIcon />
              </Link>
            </div>
          </div>
        )}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
          <p className="small text-fg-muted">{l.note}</p>
          <Link href="/floor-plans" className="link-underline eyebrow">
            {l.allPlans}
          </Link>
        </div>
      </div>
      <style>{`@keyframes planin{from{opacity:0;transform:scale(.98)}to{opacity:1;transform:none}}`}</style>
    </div>
  );
}
