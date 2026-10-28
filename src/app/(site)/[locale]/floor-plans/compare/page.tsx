import { getTranslations } from "next-intl/server";
import { localeOf, pageMetaFromMessages } from "@/lib/page";
import { getCollections, getFloorPlans } from "@/lib/content";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { CompareTable } from "@/components/plans/CompareTable";

export const generateMetadata = ({ params }: PageProps<"/[locale]/floor-plans/compare">) =>
  pageMetaFromMessages(params, "floorPlans", "/floor-plans/compare", { title: "Compare plans" });

export default async function ComparePage({ params }: PageProps<"/[locale]/floor-plans/compare">) {
  const locale = await localeOf(params);
  const [t, plans, collections] = await Promise.all([
    getTranslations("pages.floorPlans"),
    getFloorPlans(locale),
    getCollections(locale),
  ]);
  return (
    <main id="main">
      <PageHero eyebrow={t("eyebrow")} title={t("compareTitle")} intro={t("compareIntro")} />
      <Section className="container-x">
        <CompareTable plans={plans} collections={Object.fromEntries(collections.map((c) => [c.slug, c.name]))} />
      </Section>
    </main>
  );
}
