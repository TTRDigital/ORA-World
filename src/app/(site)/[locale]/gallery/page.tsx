import { getTranslations } from "next-intl/server";
import { localeOf, pageMetaFromMessages } from "@/lib/page";
import { getGallery } from "@/lib/content";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { GalleryCoverflow } from "@/components/gallery/GalleryCoverflow";
import { getImageProps } from "next/image";
import { JsonLd, breadcrumbLd } from "@/lib/seo";

export const generateMetadata = ({ params }: PageProps<"/[locale]/gallery">) =>
  pageMetaFromMessages(params, "gallery", "/gallery");

export default async function GalleryPage({ params }: PageProps<"/[locale]/gallery">) {
  const locale = await localeOf(params);
  const [t, n, items] = await Promise.all([
    getTranslations("pages.gallery"),
    getTranslations("nav"),
    getGallery(locale),
  ]);
  return (
    <main id="main">
      <JsonLd
        data={breadcrumbLd(locale, [
          { name: n("home"), path: "" },
          { name: n("gallery"), path: "/gallery" },
        ])}
      />
      <PageHero eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} compact>
        <div className="col-span-12 mt-10 md:mt-12">
          <GalleryCoverflow
            images={items.slice(0, 10).map((g) => ({
              src: getImageProps({ src: g.image.src, alt: g.image.alt, width: 1100, height: 700, quality: 75 }).props.src,
              alt: g.image.alt,
            }))}
          />
        </div>
      </PageHero>
      <Section className="container-x">
        <GalleryGrid items={items} />
      </Section>
    </main>
  );
}
