"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import type { FloorPlan } from "@/content/types";
import type { Localized } from "@/lib/localize";
import { Link } from "@/i18n/navigation";
import { useShortlist } from "@/lib/shortlist";
import { Button } from "@/components/ui/Button";

export function CompareTable({ plans, collections }: { plans: Localized<FloorPlan>[]; collections: Record<string, string> }) {
  const t = useTranslations("pages.floorPlans");
  const c = useTranslations("common");
  const { items, remove } = useShortlist();
  const chosen = items.map((s) => plans.find((p) => p.slug === s)).filter(Boolean) as Localized<FloorPlan>[];
  if (chosen.length === 0) {
    return (
      <div className="border border-rule p-10 text-center">
        <p className="text-fg-muted">{c("shortlistEmpty")}</p>
        <Button as={Link} href="/floor-plans" className="mt-6">{t("addMore")}</Button>
      </div>
    );
  }
  const rows: [string, (p: Localized<FloorPlan>) => string][] = [
    [c("bedrooms"), (p) => String(p.bedrooms)],
    [c("bathrooms"), (p) => String(p.bathrooms)],
    [c("interior"), (p) => (p.interiorSqFt ? `${p.interiorSqFt.toLocaleString()} ${c("sqft")}` : c("placeholder"))],
    [c("exterior"), (p) => (p.exteriorSqFt ? `${p.exteriorSqFt.toLocaleString()} ${c("sqft")}` : c("placeholder"))],
    [c("view"), (p) => p.view],
    [c("orientation"), (p) => p.orientation],
    [c("tower"), (p) => p.tower],
    [c("floor"), (p) => p.floors ?? c("placeholder")],
    [c("status"), (p) => ({ available: c("available"), reserved: c("reserved"), sold: c("sold") })[p.status]],
    [c("from"), (p) => (p.fromPrice ? `$${p.fromPrice.toLocaleString()}` : c("priceOnRequest"))],
  ];
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[40rem] border-collapse">
        <thead>
          <tr>
            <th className="w-40 py-4 text-left align-bottom"><span className="eyebrow text-fg-muted">{c("compare")}</span></th>
            {chosen.map((p) => (
              <th key={p.slug} className="py-4 pl-6 text-left align-bottom">
                <div className="relative aspect-[4/3] w-full overflow-hidden border border-rule bg-bone"><Image src={p.image.src} alt={p.image.alt} fill sizes="30vw" className="object-cover" /></div>
                <Link href={`/floor-plans/${p.slug}`} className="display-s mt-4 block hover:text-accent-ink">{p.name}</Link>
                <p className="eyebrow mt-1 text-fg-muted">{collections[p.collection]}</p>
                <button type="button" onClick={() => remove(p.slug)} className="eyebrow mt-2 cursor-pointer text-fg-muted hover:text-fg">{c("removeFromShortlist")}</button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(([label, fn]) => (
            <tr key={label} className="border-t border-rule">
              <th scope="row" className="eyebrow py-4 text-left text-fg-muted">{label}</th>
              {chosen.map((p) => (<td key={p.slug} className="tnum py-4 pl-6">{fn(p)}</td>))}
            </tr>
          ))}
        </tbody>
      </table>
      {chosen.length < 3 && (
        <Link href="/floor-plans" className="eyebrow link-underline mt-8 inline-block">{t("addMore")} →</Link>
      )}
    </div>
  );
}
