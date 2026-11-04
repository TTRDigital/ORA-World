import { getTranslations } from "next-intl/server";
import { localeOf, pageMetaFromMessages } from "@/lib/page";
import { getCollections, getFloorPlans } from "@/lib/content";
import { PageHero } from "@/components/ui/PageHero";
import { CollectionCard } from "@/components/residences/CollectionCard";
import { CollectionLane } from "@/components/residences/CollectionLane";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { JsonLd, breadcrumbLd } from "@/lib/seo";
import { BrochureSection } from "@/components/residences/BrochureSection";
import { Portfolio } from "@/components/residences/Portfolio";
import { getSiteSettings } from "@/lib/content";

export const generateMetadata = ({ params }: PageProps<"/[locale]/residences">) =>
  pageMetaFromMessages(params, "residences", "/residences");

export default async function ResidencesPage({ params }: PageProps<"/[locale]/residences">) {
  const locale = await localeOf(params);
  const [t, c, n, collections, plans, site] = await Promise.all([
    getTranslations("pages.residences"),
    getTranslations("common"),
    getTranslations("nav"),
    getCollections(locale),
    getFloorPlans(locale),
    getSiteSettings(locale),
  ]);
  return (
    <main id="main">
      <JsonLd
        data={breadcrumbLd(locale, [
          { name: n("home"), path: "" },
          { name: n("residences"), path: "/residences" },
        ])}
      />
      <PageHero eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} compact>
        <div className="col-span-12 mt-10 md:mt-12">
          <CollectionLane
            collections={collections}
            planCounts={Object.fromEntries(
              collections.map((col) => [col.slug, plans.filter((p) => p.collection === col.slug).length]),
            )}
            plansLabel={n("floorPlans")}
          />
        </div>
      </PageHero>
      <Section className="container-x">
        <div className="grid gap-x-6 gap-y-12 md:grid-cols-2">
          {collections.map((col, i) => (
            <div key={col.slug} data-reveal data-delay={(i % 2) * 0.1}>
              <CollectionCard collection={col} aspect="aspect-[16/11]" priority={i === 0} headingLevel={2} />
              <p className="mt-3 small text-fg-muted">
                {plans.filter((p) => p.collection === col.slug).length} · {n("floorPlans")}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-12 max-w-[70ch] small text-fg-muted">{c("viewsVary")}</p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Button as={Link} href="/floor-plans">
            {n("floorPlans")}
          </Button>
          <Button as={Link} href="/gallery" variant="text">
            {n("gallery")}
          </Button>
        </div>
      </Section>
      <BrochureSection site={site} />
      <Section tone="alt">
        <div className="container-x">
          <Eyebrow>{(await getTranslations("pages.tesoro"))("portfolio")}</Eyebrow>
          <Portfolio locale={locale} />
        </div>
      </Section>
    </main>
  );
}
