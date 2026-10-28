import { getTranslations } from "next-intl/server";
import { localeOf, pageMetaFromMessages } from "@/lib/page";
import { getAmenities, getSiteSettings } from "@/lib/content";
import type { AmenityCategory } from "@/content/types";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Picture } from "@/components/ui/Picture";
import { renders } from "@/content/seed/images";
import { localize } from "@/lib/localize";
import { JsonLd, breadcrumbLd } from "@/lib/seo";

export const generateMetadata = ({ params }: PageProps<"/[locale]/amenities">) => pageMetaFromMessages(params, "amenities", "/amenities");

const ORDER: AmenityCategory[] = ["wellness", "family", "pets", "resort", "eco"];

export default async function AmenitiesPage({ params }: PageProps<"/[locale]/amenities">) {
  const locale = await localeOf(params);
  const [t, cat, n, amenities] = await Promise.all([getTranslations("pages.amenities"), getTranslations("amenityCat"), getTranslations("nav"), getAmenities(locale)]);
  await getSiteSettings(locale);
  return (
    <main id="main">
      <JsonLd data={breadcrumbLd(locale, [{ name: n("home"), path: "" }, { name: n("amenities"), path: "/amenities" }])} />
      <PageHero eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} image={localize(renders.poolTerrace, locale)} compact />
      <nav aria-label="Amenity groups" className="container-x sticky top-header z-20 flex gap-x-8 overflow-x-auto border-b border-rule bg-bg/95 py-4 backdrop-blur-sm [scrollbar-width:none]">
        {ORDER.map((c) => (<a key={c} href={`#${c}`} className="eyebrow link-underline shrink-0 py-1">{cat(c)}</a>))}
      </nav>
      {ORDER.map((c, gi) => {
        const items = amenities.filter((a) => a.category === c);
        if (!items.length) return null;
        return (
          <Section key={c} id={c} tone={gi % 2 ? "alt" : "default"} className="scroll-mt-28">
            <div className="container-x">
              <div className="grid grid-cols-12 gap-x-6">
                <div className="col-span-12 md:col-span-4">
                  <Eyebrow>{String(gi + 1).padStart(2, "0")}</Eyebrow>
                  <h2 className="display-l mt-4">{cat(c)}</h2>
                </div>
              </div>
              <ul className="mt-12 grid grid-cols-12 gap-x-6 gap-y-14">
                {items.map((a, i) => (
                  <li key={a.slug} id={a.slug} className={`col-span-12 scroll-mt-28 ${i % 3 === 0 ? "md:col-span-7" : "md:col-span-5"} ${i % 3 === 2 ? "md:col-start-2" : ""}`}>
                    <Picture image={a.image} sizes="(min-width: 768px) 55vw, 100vw" aspect={i % 3 === 0 ? "16/10" : "4/5"} showCaption={false} />
                    <div className="mt-5 grid grid-cols-12 gap-x-6">
                      <h3 className="display-s col-span-12 md:col-span-5">{a.name}</h3>
                      <p className="col-span-12 text-fg-muted md:col-span-7">{a.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Section>
        );
      })}
    </main>
  );
}
