"use client";

import { useMemo, useState, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import type { FloorPlan, Orientation } from "@/content/types";
import type { Localized } from "@/lib/localize";
import { cn } from "@/lib/utils";

type Plan = Localized<FloorPlan>;
type Props = { plans: Plan[]; collections: { slug: string; name: string }[]; cards: Record<string, ReactNode>; rows: Record<string, ReactNode> };

const SIZES = [
  { id: "any", test: () => true },
  { id: "s1", max: 1500, test: (n: number | null) => n !== null && n < 1500 },
  { id: "s2", min: 1500, max: 2500, test: (n: number | null) => n !== null && n >= 1500 && n < 2500 },
  { id: "s3", min: 2500, test: (n: number | null) => n !== null && n >= 2500 },
];

/** Filterable plan library: collection, bedrooms, size, orientation, building; grid or list. Cards are server-rendered and keyed by slug. */
export function PlanLibrary({ plans, collections, cards, rows }: Props) {
  const t = useTranslations("pages.floorPlans");
  const c = useTranslations("common");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [collection, setCollection] = useState("all");
  const [beds, setBeds] = useState<number | "all">("all");
  const [size, setSize] = useState("any");
  const [orient, setOrient] = useState<Orientation | "all">("all");
  const [tower, setTower] = useState("all");

  const towers = useMemo(() => Array.from(new Set(plans.map((p) => p.tower))), [plans]);
  const orients = useMemo(() => Array.from(new Set(plans.map((p) => p.orientation))), [plans]);
  const bedOptions = useMemo(() => Array.from(new Set(plans.map((p) => p.bedrooms))).sort((a, b) => a - b), [plans]);
  const sizeDef = SIZES.find((s) => s.id === size)!;
  const shown = plans.filter((p) => (collection === "all" || p.collection === collection) && (beds === "all" || p.bedrooms === beds) && sizeDef.test(p.interiorSqFt) && (orient === "all" || p.orientation === orient) && (tower === "all" || p.tower === tower));
  const sizeLabel = (s: (typeof SIZES)[number]) => (s.id === "any" ? t("sizeAny") : s.min && s.max ? t("sizeBetween", { a: s.min.toLocaleString(), b: s.max.toLocaleString() }) : s.min ? t("sizeOver", { n: s.min.toLocaleString() }) : t("sizeUnder", { n: s.max!.toLocaleString() }));

  const Group = ({ label, children }: { label: string; children: ReactNode }) => (
    <div role="group" aria-label={label} className="flex flex-wrap items-center gap-x-4 gap-y-2">
      <span className="eyebrow mr-2 text-fg-muted">{label}</span>
      {children}
    </div>
  );
  const Chip = ({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) => (
    <button type="button" onClick={onClick} aria-pressed={active} className={cn("eyebrow cursor-pointer border-b py-1 transition-colors", active ? "border-accent text-accent-ink" : "border-transparent text-fg-muted hover:text-fg")}>
      {children}
    </button>
  );

  return (
    <div>
      <div className="flex flex-col gap-4 border-b border-rule pb-6">
        <Group label={c("filters")}>
          <Chip active={collection === "all"} onClick={() => setCollection("all")}>{c("all")}</Chip>
          {collections.map((col) => (<Chip key={col.slug} active={collection === col.slug} onClick={() => setCollection(col.slug)}>{col.name}</Chip>))}
        </Group>
        <Group label={c("bedrooms")}>
          <Chip active={beds === "all"} onClick={() => setBeds("all")}>{c("all")}</Chip>
          {bedOptions.map((b) => (<Chip key={b} active={beds === b} onClick={() => setBeds(b)}>{b}</Chip>))}
        </Group>
        <Group label={c("interior")}>
          {SIZES.map((s) => (<Chip key={s.id} active={size === s.id} onClick={() => setSize(s.id)}>{sizeLabel(s)}</Chip>))}
        </Group>
        <Group label={c("orientation")}>
          <Chip active={orient === "all"} onClick={() => setOrient("all")}>{c("all")}</Chip>
          {orients.map((o) => (<Chip key={o} active={orient === o} onClick={() => setOrient(o)}>{o}</Chip>))}
        </Group>
        <Group label={c("tower")}>
          <Chip active={tower === "all"} onClick={() => setTower("all")}>{c("all")}</Chip>
          {towers.map((tw) => (<Chip key={tw} active={tower === tw} onClick={() => setTower(tw)}>{tw}</Chip>))}
        </Group>
      </div>
      <div className="mt-6 flex items-center justify-between">
        <p className="eyebrow text-fg-muted" aria-live="polite">{shown.length === 1 ? t("plan", { n: 1 }) : t("plans", { n: shown.length })}</p>
        <div role="group" aria-label="View" className="flex gap-4">
          <Chip active={view === "grid"} onClick={() => setView("grid")}>{t("gridView")}</Chip>
          <Chip active={view === "list"} onClick={() => setView("list")}>{t("listView")}</Chip>
        </div>
      </div>
      {shown.length === 0 ? (
        <p className="mt-10 text-fg-muted">{c("noResults")}</p>
      ) : view === "grid" ? (
        <ul className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((p) => (<li key={p.slug}>{cards[p.slug]}</li>))}
        </ul>
      ) : (
        <ul className="mt-6 divide-y divide-rule border-y border-rule">
          {shown.map((p) => (<li key={p.slug}>{rows[p.slug]}</li>))}
        </ul>
      )}
    </div>
  );
}
