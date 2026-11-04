import { getTranslations } from "next-intl/server";
import { localeOf, pageMetaFromMessages } from "@/lib/page";
import { getCollections, getFloorPlans, getSiteSettings } from "@/lib/content";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { PlanLibrary } from "@/components/plans/PlanLibrary";
import { PlanCard } from "@/components/plans/PlanCard";
import { ShortlistBar } from "@/components/plans/ShortlistBar";
import { JsonLd, breadcrumbLd } from "@/lib/seo";

export const generateMetadata = ({ params }: PageProps<"/[locale]/floor-plans">) =>
  pageMetaFromMessages(params, "floorPlans", "/floor-plans");

export default async function FloorPlansPage({ params }: PageProps<"/[locale]/floor-plans">) {
  const locale = await localeOf(params);
  const [t, n, c, plans, collections] = await Promise.all([
    getTranslations("pages.floorPlans"),
    getTranslations("nav"),
    getTranslations("common"),
    getFloorPlans(locale),
    getCollections(locale),
  ]);
  await getSiteSettings(locale);
  const colName = (slug: string) => collections.find((x) => x.slug === slug)?.name ?? slug;
  const cards = Object.fromEntries(
    await Promise.all(
      plans.map(async (p) => [p.slug, await PlanCard({ plan: p, collectionName: colName(p.collection) })]),
    ),
  );
  const rows = Object.fromEntries(
    await Promise.all(
      plans.map(async (p) => [p.slug, await PlanCard({ plan: p, collectionName: colName(p.collection), list: true })]),
    ),
  );
  return (
    <main id="main">
      <JsonLd
        data={breadcrumbLd(locale, [
          { name: n("home"), path: "" },
          { name: n("floorPlans"), path: "/floor-plans" },
        ])}
      />
      <PageHero eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} />
      <Section className="container-x">
        <PlanLibrary
          plans={plans}
          collections={collections.map((x) => ({ slug: x.slug, name: x.name }))}
          cards={cards}
          rows={rows}
        />
        <p className="mt-12 max-w-[70ch] small text-fg-muted">
          {t("illustrative")} {c("viewsVary")}
        </p>
      </Section>
      <ShortlistBar names={Object.fromEntries(plans.map((p) => [p.slug, p.name]))} />
    </main>
  );
}
