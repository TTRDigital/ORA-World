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
import { FamilyPets } from "@/components/home/FamilyPets";
import { getHome } from "@/lib/content";

export const generateMetadata = ({ params }: PageProps<"/[locale]/amenities">) =>
  pageMetaFromMessages(params, "amenities", "/amenities");

const ORDER: AmenityCategory[] = ["wellness", "family", "pets", "resort", "eco"];

export default async function AmenitiesPage({ params }: PageProps<"/[locale]/amenities">) {
  const locale = await localeOf(params);
  const [t, cat, n, amenities] = await Promise.all([
    getTranslations("pages.amenities"),
    getTranslations("amenityCat"),
    getTranslations("nav"),
    getAmenities(locale),
  ]);
  const home = await getHome(locale);
  await getSiteSettings(locale);
  return (
    <main id="main">
      <JsonLd
        data={breadcrumbLd(locale, [
          { name: n("home"), path: "" },
          { name: n("amenities"), path: "/amenities" },
        ])}
      />
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        intro={t("intro")}
        image={localize(renders.poolTerrace, locale)}
        compact
      />
      <nav
        aria-label="Amenity groups"
        className="sticky top-[var(--header-offset)] z-20 container-x flex [scrollbar-width:none] gap-x-8 overflow-x-auto border-b border-rule bg-bg/95 py-4 backdrop-blur-sm transition-[top] duration-500"
      >
        {ORDER.map((c) => (
          <a key={c} href={`#${c}`} className="shrink-0 link-underline py-1 eyebrow">
            {cat(c)}
          </a>
        ))}
      </nav>
      {ORDER.map((c, gi) => {
        const items = amenities.filter((a) => a.category === c);
        if (!items.length) return null;
        return (
          <Section key={c} id={c} tone={gi % 2 ? "alt" : "default"} className="scroll-mt-36">
            <div className="container-x">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <Eyebrow>{String(gi + 1).padStart(2, "0")}</Eyebrow>
                  <h2 className="mt-4 display-l" data-reveal>
                    {cat(c)}
                  </h2>
                </div>
                <p className="eyebrow text-fg-muted tnum">{items.length}</p>
              </div>
              <ul
                className={`mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 ${items.length === 2 ? "" : items.length % 4 === 0 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}
              >
                {items.map((a) => (
                  <li key={a.slug} id={a.slug} className="group scroll-mt-40">
                    <Picture
                      image={a.image}
                      sizes="(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 92vw"
                      aspect="4/3"
                      showCaption={false}
                    />
                    <h3 className="mt-5 display-s">{a.name}</h3>
                    <p className="mt-2 text-fg-muted">{a.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Section>
        );
      })}
      <FamilyPets
        family={home.family}
        pets={home.pets}
        related={{
          family: amenities.filter((a) => a.category === "family").map((a) => a.name),
          pets: amenities.filter((a) => a.category === "pets").map((a) => a.name),
        }}
      />
    </main>
  );
}
