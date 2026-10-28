import Image from "next/image";
import { getTranslations } from "next-intl/server";
import type { Collection } from "@/content/types";
import type { Localized } from "@/lib/localize";
import { Link } from "@/i18n/navigation";

export async function CollectionCard({
  collection: c,
  aspect = "aspect-[4/3]",
  priority,
  headingLevel = 3,
}: {
  collection: Localized<Collection>;
  aspect?: string;
  priority?: boolean;
  headingLevel?: 2 | 3;
}) {
  const H: "h2" | "h3" = headingLevel === 2 ? "h2" : "h3";
  const t = await getTranslations("common");
  const h = await getTranslations("home");
  const price = c.fromPrice ? `${t("from")} $${c.fromPrice.toLocaleString("en-US")}` : t("priceOnRequest");
  return (
    <Link href={`/residences/${c.slug}`} className="group block">
      <figure className={`relative ${aspect} overflow-hidden bg-surface`} data-reveal={priority ? undefined : "image"}>
        <Image
          src={c.image.src}
          alt={c.image.alt}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          priority={priority}
          fetchPriority={priority ? "high" : undefined}
          quality={65}
          placeholder={c.image.blurDataURL ? "blur" : "empty"}
          blurDataURL={c.image.blurDataURL}
          className="object-cover transition-transform duration-[1400ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
          data-reveal-inner
        />
        {c.hoverImage && (
          <Image
            src={c.hoverImage.src}
            alt=""
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover opacity-0 transition-opacity duration-[900ms] ease-[var(--ease-out-expo)] group-hover:opacity-100 group-focus-visible:opacity-100"
            aria-hidden="true"
          />
        )}
        <figcaption className="pointer-events-none absolute bottom-3 left-3 text-[10px] tracking-[0.14em] text-white/85 uppercase mix-blend-difference">
          {t("rendering")}
        </figcaption>
      </figure>
      <div className="mt-5 flex flex-col gap-4 border-t border-rule pt-5 md:flex-row md:items-start md:justify-between md:gap-6">
        <div>
          <H className="display-s transition-colors group-hover:text-accent-ink">{c.name}</H>
          <p className="mt-1 text-fg-muted">{c.tagline}</p>
        </div>
        <div className="shrink-0 eyebrow leading-loose text-fg-muted md:text-right">
          <p>{c.bedrooms ? `${c.bedrooms} ${t("bedrooms")}` : h("detailsSoon")}</p>
          {c.sizeRange && <p>{c.sizeRange}</p>}
          <p className="text-accent-ink tnum">{price}</p>
        </div>
      </div>
    </Link>
  );
}
