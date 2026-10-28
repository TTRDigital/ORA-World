import { getTranslations } from "next-intl/server";
import { localeOf, pageMetaFromMessages } from "@/lib/page";
import { getHome, getPointsOfInterest, getSiteSettings } from "@/lib/content";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Picture } from "@/components/ui/Picture";
import { LocationMap } from "@/components/map/LocationMap";
import { lifestyle } from "@/content/seed/images";
import { localize } from "@/lib/localize";
import { JsonLd, breadcrumbLd } from "@/lib/seo";

export const generateMetadata = ({ params }: PageProps<"/[locale]/location">) => pageMetaFromMessages(params, "location", "/location");

export default async function LocationPage({ params }: PageProps<"/[locale]/location">) {
  const locale = await localeOf(params);
  const [t, h, n, pois, site, home] = await Promise.all([getTranslations("pages.location"), getTranslations("home"), getTranslations("nav"), getPointsOfInterest(locale), getSiteSettings(locale), getHome(locale)]);
  return (
    <main id="main">
      <JsonLd data={breadcrumbLd(locale, [{ name: n("home"), path: "" }, { name: n("location"), path: "/location" }])} />
      <PageHero eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} image={localize(lifestyle.beach, locale)} />
      <Section className="container-x">
        <Eyebrow>{t("proximity")}</Eyebrow>
        <LocationMap className="mt-8" pois={pois} site={{ lat: site.siteLat, lng: site.siteLng, label: h("theSite") }} />
      </Section>
      <Section tone="alt">
        <div className="container-x">
          <Eyebrow>{t("island")}</Eyebrow>
          <h2 className="display-l mt-5 max-w-[16ch]">{home.place.title.replace(/\*/g, "")}</h2>
          <ol className="mt-14 grid grid-cols-1 gap-x-6 gap-y-14 md:grid-cols-2">
            {home.place.chapters.map((ch, i) => (
              <li key={ch.number} className={i % 2 ? "md:mt-20" : ""}>
                <Picture image={ch.image} sizes="(min-width: 768px) 50vw, 100vw" aspect="4/3" />
                <div className="mt-5 flex items-baseline gap-5">
                  <span className="display-s tnum text-accent-ink">{ch.number}</span>
                  <div><h3 className="display-s">{ch.title}</h3><p className="mt-2 max-w-[40ch] text-fg-muted">{ch.text}</p></div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Section>
    </main>
  );
}
