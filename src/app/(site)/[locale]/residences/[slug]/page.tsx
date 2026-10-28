import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { localeOf, plain } from "@/lib/page";
import { getCollection, getCollections, getFloorPlans, getSiteSettings } from "@/lib/content";
import { routing } from "@/i18n/routing";
import { pageMetadata, JsonLd, breadcrumbLd } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Picture } from "@/components/ui/Picture";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PlanCard } from "@/components/plans/PlanCard";
import { LeadFormLazy as LeadForm } from "@/components/forms/LeadFormLazy";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { collections as seed } from "@/content/seed/collections";

export async function generateStaticParams() {
  return routing.locales.flatMap((locale) => seed.map((c) => ({ locale, slug: c.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/residences/[slug]">) {
  const { locale, slug } = await params;
  const col = await getCollection(locale as "en" | "es", slug);
  if (!col) return {};
  return pageMetadata({
    locale: locale as "en" | "es",
    title: plain(col.name),
    description: col.tagline,
    path: `/residences/${slug}`,
    eyebrow: "ORA World",
  });
}

export default async function CollectionPage({ params }: PageProps<"/[locale]/residences/[slug]">) {
  const locale = await localeOf(params);
  const { slug } = await params;
  const col = await getCollection(locale, slug);
  if (!col) notFound();
  const [t, c, n, plans, site, all] = await Promise.all([
    getTranslations("pages.floorPlans"),
    getTranslations("common"),
    getTranslations("nav"),
    getFloorPlans(locale),
    getSiteSettings(locale),
    getCollections(locale),
  ]);
  const mine = plans.filter((p) => p.collection === col.slug);
  const price = col.fromPrice ? `${c("from")} $${col.fromPrice.toLocaleString("en-US")}` : c("priceOnRequest");
  return (
    <main id="main">
      <JsonLd
        data={breadcrumbLd(locale, [
          { name: n("home"), path: "" },
          { name: n("residences"), path: "/residences" },
          { name: col.name, path: `/residences/${col.slug}` },
        ])}
      />
      <PageHero eyebrow={n("residences")} title={col.name} intro={col.tagline} image={col.image}>
        <Breadcrumbs
          light
          className="col-span-12 mt-10"
          items={[{ name: n("home"), href: "/" }, { name: n("residences"), href: "/residences" }, { name: col.name }]}
        />
      </PageHero>

      <Section className="container-x">
        <div className="grid grid-cols-12 gap-x-6 gap-y-12">
          <div className="col-span-12 md:col-span-4">
            <dl className="divide-y divide-rule border-y border-rule">
              {[
                [c("bedrooms"), col.bedrooms],
                [c("interior"), col.sizeRange],
                [c("from"), price],
              ].map(([k, v], i) => (
                <div key={i} className="flex justify-between gap-6 py-4">
                  <dt className="eyebrow text-fg-muted">{k}</dt>
                  <dd className="text-right tnum">
                    {v ?? <span className="eyebrow text-accent-ink">{c("placeholder")}</span>}
                  </dd>
                </div>
              ))}
            </dl>
            {col.placeholder && <p className="mt-4 small text-fg-muted">{c("placeholder")}</p>}
          </div>
          <div className="col-span-12 md:col-span-7 md:col-start-6">
            {col.description.map((p, i) => (
              <p key={i} className="mb-5 max-w-[56ch] lead text-fg-muted" data-reveal>
                {p}
              </p>
            ))}
            {col.features.length > 0 && (
              <ul className="mt-10 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
                {col.features.map((f, i) => (
                  <li key={i} className="flex gap-3 border-t border-rule pt-3 text-fg-muted" data-reveal>
                    <span className="eyebrow text-accent-ink tnum">0{i + 1}</span>
                    {f}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </Section>

      {col.hoverImage && (
        <div className="container-x">
          <Picture image={col.hoverImage} sizes="100vw" aspect="21/9" parallax={0.05} />
        </div>
      )}

      {col.finishes.length > 0 && (
        <Section className="container-x">
          <Eyebrow>Finishes &amp; materials</Eyebrow>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2">
            {col.finishes.map((g, i) => (
              <div key={i}>
                <h2 className="display-s">{g.group}</h2>
                <ul className="mt-4 divide-y divide-rule border-y border-rule">
                  {g.items.map((it, j) => (
                    <li key={j} className="py-3 text-fg-muted">
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>
      )}

      <Section tone="alt">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Eyebrow>{n("floorPlans")}</Eyebrow>
              <h2 className="mt-4 display-m">{col.name}</h2>
            </div>
            <Button as={Link} href="/floor-plans" variant="text">
              {c("viewAll")}
            </Button>
          </div>
          {mine.length ? (
            <ul className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {mine.map((p) => (
                <li key={p.slug}>
                  <PlanCard plan={p} collectionName={col.name} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-8 text-fg-muted">{t("illustrative")}</p>
          )}
        </div>
      </Section>

      <Section className="container-x">
        <div className="grid grid-cols-12 gap-x-6 gap-y-10">
          <div className="col-span-12 md:col-span-4">
            <Eyebrow>{c("requestPricing")}</Eyebrow>
            <h2 className="mt-4 display-m">{col.name}</h2>
            <p className="mt-4 text-fg-muted">{c("viewsVary")}</p>
          </div>
          <div className="col-span-12 md:col-span-7 md:col-start-6">
            <LeadForm
              variant="short"
              source={`collection:${col.slug}`}
              consentText={site.consentText}
              bookingUrl={site.bookingUrl}
              submitLabel={c("requestPricing")}
            />
          </div>
        </div>
        <nav aria-label="Collections" className="mt-16 flex flex-wrap gap-x-8 gap-y-3 border-t border-rule pt-6">
          {all
            .filter((x) => x.slug !== col.slug)
            .map((x) => (
              <Link key={x.slug} href={`/residences/${x.slug}`} className="link-underline py-1 eyebrow">
                {x.name} →
              </Link>
            ))}
        </nav>
      </Section>
    </main>
  );
}
