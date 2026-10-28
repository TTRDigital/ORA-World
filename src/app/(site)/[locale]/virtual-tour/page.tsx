import { getTranslations } from "next-intl/server";
import { localeOf, pageMetaFromMessages } from "@/lib/page";
import { getHome, getSiteSettings } from "@/lib/content";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { TourEmbed } from "@/components/tour/TourEmbed";
import { JsonLd, breadcrumbLd } from "@/lib/seo";

export const generateMetadata = ({ params }: PageProps<"/[locale]/virtual-tour">) =>
  pageMetaFromMessages(params, "tour", "/virtual-tour");

export default async function TourPage({ params }: PageProps<"/[locale]/virtual-tour">) {
  const locale = await localeOf(params);
  const [t, n, site, home] = await Promise.all([
    getTranslations("pages.tour"),
    getTranslations("nav"),
    getSiteSettings(locale),
    getHome(locale),
  ]);
  return (
    <main id="main">
      <JsonLd
        data={breadcrumbLd(locale, [
          { name: n("home"), path: "" },
          { name: n("virtualTour"), path: "/virtual-tour" },
        ])}
      />
      <PageHero eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} />
      <Section className="container-x">
        <TourEmbed url={site.vrTourUrl} poster={home.tour.image} />
      </Section>
      <Section tone="dark">
        <div className="container-x">
          <Eyebrow className="text-dark-accent">{t("film")}</Eyebrow>
          {site.filmUrl ? (
            <video
              src={site.filmUrl}
              controls
              playsInline
              preload="metadata"
              poster={home.hero.poster.src}
              className="mt-8 aspect-video w-full bg-black"
            />
          ) : (
            <div className="mt-8 flex aspect-video w-full items-center justify-center border border-dark-rule">
              <p className="eyebrow text-dark-fg/60">{t("noFilm")}</p>
            </div>
          )}
        </div>
      </Section>
    </main>
  );
}
