import Image from "next/image";
import { getTranslations } from "next-intl/server";
import type { Collection, HomeContent } from "@/content/types";
import type { Localized } from "@/lib/localize";
import { Link } from "@/i18n/navigation";
import { Accent } from "@/components/ui/Accent";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";

/** Direction B residences: full-bleed sticky frames, one collection per screen, details pinned in a side column. */
export async function ResidencesCinema({ block, collections }: { block: Localized<HomeContent["residences"]>; collections: Localized<Collection>[] }) {
  const c = await getTranslations("common");
  const h = await getTranslations("home");
  return (
    <section id="residences" className="dark-section">
      <div className="container-x py-section">
        <Eyebrow className="text-dark-accent">{block.eyebrow}</Eyebrow>
        <h2 className="display-l mt-6 max-w-[16ch]" data-reveal><Accent text={block.title} className="text-dark-accent" /></h2>
        <p className="lead mt-6 max-w-[46ch] text-dark-fg/80" data-reveal>{block.intro}</p>
      </div>
      {collections.slice(0, 4).map((col, i) => (
        <article key={col.slug} className="sticky top-0 h-dvh overflow-hidden" style={{ zIndex: i + 1 }}>
          <Image src={col.image.src} alt={col.image.alt} fill sizes="100vw" className="object-cover" placeholder={col.image.blurDataURL ? "blur" : "empty"} blurDataURL={col.image.blurDataURL} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgb(18 17 16 / .85) 0%, rgb(18 17 16 / .3) 60%, transparent)" }} />
          <div className="container-x relative flex h-full items-end pb-16 md:items-center md:pb-0">
            <div className="max-w-xl text-white">
              <span className="eyebrow text-dark-accent">0{i + 1} · {c("rendering")}</span>
              <h3 className="display-l mt-4">{col.name}</h3>
              <p className="lead mt-4 text-white/80">{col.tagline}</p>
              <dl className="eyebrow mt-6 flex flex-wrap gap-x-8 gap-y-2 text-white/70">
                <dd>{col.bedrooms ? `${col.bedrooms} ${c("bedrooms")}` : h("detailsSoon")}</dd>
                {col.sizeRange && <dd>{col.sizeRange}</dd>}
                <dd className="text-dark-accent">{col.fromPrice ? `${c("from")} $${col.fromPrice.toLocaleString("en-US")}` : c("priceOnRequest")}</dd>
              </dl>
              <Button as={Link} href={`/residences/${col.slug}`} variant="light" className="mt-8">{c("learnMore")}</Button>
            </div>
          </div>
        </article>
      ))}
      <div className="container-x relative z-10 bg-dark-bg py-16">
        <Button as={Link} href="/floor-plans" variant="ghost" className="text-dark-fg">{h("allPlans")}</Button>
      </div>
    </section>
  );
}
