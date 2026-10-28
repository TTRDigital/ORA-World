import Image from "next/image";
import { getTranslations } from "next-intl/server";
import type { FloorPlan } from "@/content/types";
import type { Localized } from "@/lib/localize";
import { Link } from "@/i18n/navigation";
import { ShortlistButton } from "./ShortlistButton";

export async function PlanCard({ plan: p, collectionName, list }: { plan: Localized<FloorPlan>; collectionName?: string; list?: boolean }) {
  const t = await getTranslations("common");
  const pl = await getTranslations("plan");
  const status = { available: t("available"), reserved: t("reserved"), sold: t("sold") }[p.status];
  const size = p.interiorSqFt ? `${p.interiorSqFt.toLocaleString("en-US")} ${t("sqft")}` : t("placeholder");
  if (list) {
    return (
      <div className="grid grid-cols-12 items-center gap-x-4 py-4">
        <Link href={`/floor-plans/${p.slug}`} className="col-span-7 flex items-center gap-4 md:col-span-4">
          <span className="relative hidden h-14 w-20 shrink-0 overflow-hidden border border-rule bg-bone sm:block"><Image src={p.image.src} alt="" fill sizes="80px" className="object-cover" /></span>
          <span><span className="display-s block">{p.name}</span><span className="eyebrow text-fg-muted">{collectionName} · {p.tower}</span></span>
        </Link>
        <span className="col-span-3 hidden tnum md:block">{pl("bed", { n: p.bedrooms })} · {pl("bath", { n: p.bathrooms })}</span>
        <span className="col-span-2 hidden tnum text-fg-muted md:block">{size}</span>
        <span className="col-span-1 hidden eyebrow text-fg-muted md:block">{p.orientation}</span>
        <span className="col-span-5 flex items-center justify-end gap-4 md:col-span-2"><span className="eyebrow text-fg-muted">{status}</span><ShortlistButton slug={p.slug} /></span>
      </div>
    );
  }
  return (
    <article className="group">
      <Link href={`/floor-plans/${p.slug}`} className="block">
        <figure className="relative aspect-[4/3] overflow-hidden border border-rule bg-bone">
          <Image src={p.image.src} alt={p.image.alt} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-[1200ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.03]" />
          <span className="eyebrow absolute top-3 left-3 bg-bg/90 px-2 py-1 text-fg-muted">{status}</span>
        </figure>
      </Link>
      <div className="mt-4 flex items-start justify-between gap-4 border-t border-rule pt-4">
        <div>
          <Link href={`/floor-plans/${p.slug}`} className="display-s block transition-colors group-hover:text-accent-ink">{p.name}</Link>
          <p className="eyebrow mt-1 text-fg-muted">{collectionName} · {p.tower}</p>
          <p className="tnum mt-2 text-sm text-fg-muted">{pl("bed", { n: p.bedrooms })} · {pl("bath", { n: p.bathrooms })} · {size} · {p.orientation}</p>
        </div>
        <ShortlistButton slug={p.slug} className="mt-1" />
      </div>
    </article>
  );
}
