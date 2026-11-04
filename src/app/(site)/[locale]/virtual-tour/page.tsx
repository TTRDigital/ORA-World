import { getTranslations } from "next-intl/server";
import { localeOf, pageMetaFromMessages } from "@/lib/page";
import { getHome, getSiteSettings } from "@/lib/content";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { TourEmbed } from "@/components/tour/TourEmbed";
import { tdm } from "@/content/seed/images";
import { localize } from "@/lib/localize";
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
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        intro={t("intro")}
        image={localize(tdm.penthouseDining, locale)}
      />
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
          ) : site.filmYoutubeId ? (
            <div className="mt-8 aspect-video w-full overflow-hidden rounded-[1.5rem] bg-black">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${site.filmYoutubeId}?rel=0&modestbranding=1&cc_load_policy=0&iv_load_policy=3&playsinline=1`}
                title={t("film")}
                loading="lazy"
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
                className="h-full w-full border-0"
              />
            </div>
          ) : null}
        </div>
      </Section>
    </main>
  );
}
