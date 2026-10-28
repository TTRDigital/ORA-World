import { getTranslations } from "next-intl/server";
import { localeOf, pageMetaFromMessages } from "@/lib/page";
import { getCollections, getFloorPlans, getProjects } from "@/lib/content";
import { PageHero } from "@/components/ui/PageHero";
import { CollectionCard } from "@/components/residences/CollectionCard";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { JsonLd, breadcrumbLd } from "@/lib/seo";
import { Picture } from "@/components/ui/Picture";
import { BrochureSection } from "@/components/residences/BrochureSection";
import { getSiteSettings } from "@/lib/content";

export const generateMetadata = ({ params }: PageProps<"/[locale]/residences">) => pageMetaFromMessages(params, "residences", "/residences");

export default async function ResidencesPage({ params }: PageProps<"/[locale]/residences">) {
  const locale = await localeOf(params);
  const [t, c, n, collections, plans, projects, site] = await Promise.all([getTranslations("pages.residences"), getTranslations("common"), getTranslations("nav"), getCollections(locale), getFloorPlans(locale), getProjects(locale), getSiteSettings(locale)]);
  const spans = ["md:col-span-7", "md:col-span-5 md:mt-24", "md:col-span-5 md:col-start-2", "md:col-span-6 md:mt-16"];
  const aspects = ["aspect-[4/3]", "aspect-[4/5]", "aspect-[4/5]", "aspect-[16/10]"];
  return (
    <main id="main">
      <JsonLd data={breadcrumbLd(locale, [{ name: n("home"), path: "" }, { name: n("residences"), path: "/residences" }])} />
      <PageHero eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} />
      <Section className="container-x">
        <div className="grid grid-cols-12 gap-x-6 gap-y-14">
          {collections.map((col, i) => (
            <div key={col.slug} className={`col-span-12 ${spans[i % spans.length]}`}>
              <CollectionCard collection={col} aspect={aspects[i % aspects.length]} priority={i === 0} />
              <p className="small mt-3 text-fg-muted">{plans.filter((p) => p.collection === col.slug).length} · {n("floorPlans")}</p>
            </div>
          ))}
        </div>
        <p className="small mt-12 max-w-[70ch] text-fg-muted">{c("viewsVary")}</p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Button as={Link} href="/floor-plans">{n("floorPlans")}</Button>
          <Button as={Link} href="/gallery" variant="text">{n("gallery")}</Button>
        </div>
      </Section>
      <BrochureSection site={site} />
      <Section tone="alt">
        <div className="container-x">
          <Eyebrow>{(await getTranslations("pages.tesoro"))("portfolio")}</Eyebrow>
          <ul className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2">
            {projects.map((p) => (
              <li key={p.slug}>
                <Link href={p.slug === "tesoro-del-mar" ? "/tesoro-del-mar" : `/projects/${p.slug}`} className="group block">
                  <Picture image={p.hero} sizes="(min-width: 768px) 50vw, 100vw" aspect="16/10" />
                  <div className="mt-5 flex items-baseline justify-between gap-6 border-t border-rule pt-5">
                    <div>
                      <h2 className="display-s transition-colors group-hover:text-accent-ink">{p.name}</h2>
                      <p className="mt-1 text-fg-muted">{p.tagline}</p>
                    </div>
                    <span className="eyebrow shrink-0 text-fg-muted">{p.location}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </main>
  );
}
