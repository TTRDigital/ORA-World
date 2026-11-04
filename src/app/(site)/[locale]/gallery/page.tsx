import { getTranslations } from "next-intl/server";
import { localeOf, pageMetaFromMessages } from "@/lib/page";
import { getGallery } from "@/lib/content";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { tdm } from "@/content/seed/images";
import { localize } from "@/lib/localize";
import { JsonLd, breadcrumbLd } from "@/lib/seo";
import { CompareSlider } from "@/components/home/CompareSlider";
import { getHome } from "@/lib/content";

export const generateMetadata = ({ params }: PageProps<"/[locale]/gallery">) =>
  pageMetaFromMessages(params, "gallery", "/gallery");

export default async function GalleryPage({ params }: PageProps<"/[locale]/gallery">) {
  const locale = await localeOf(params);
  const [t, n, items] = await Promise.all([
    getTranslations("pages.gallery"),
    getTranslations("nav"),
    getGallery(locale),
  ]);
  const home = await getHome(locale);
  return (
    <main id="main">
      <JsonLd
        data={breadcrumbLd(locale, [
          { name: n("home"), path: "" },
          { name: n("gallery"), path: "/gallery" },
        ])}
      />
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        intro={t("intro")}
        image={localize(tdm.aerialCoast, locale)}
      />
      <CompareSlider block={home.compare} />
      <Section className="container-x">
        <GalleryGrid items={items} />
      </Section>
    </main>
  );
}
