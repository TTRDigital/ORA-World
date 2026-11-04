import { getTranslations } from "next-intl/server";
import { localeOf, pageMetaFromMessages } from "@/lib/page";
import { getActivities, getHome } from "@/lib/content";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Picture } from "@/components/ui/Picture";
import { Accent } from "@/components/ui/Accent";
import { Accordion } from "@/components/ui/Accordion";
import { lifestyle } from "@/content/seed/images";
import { localize } from "@/lib/localize";
import { JsonLd, breadcrumbLd } from "@/lib/seo";

export const generateMetadata = ({ params }: PageProps<"/[locale]/lifestyle">) =>
  pageMetaFromMessages(params, "lifestyle", "/lifestyle");

export default async function LifestylePage({ params }: PageProps<"/[locale]/lifestyle">) {
  const locale = await localeOf(params);
  const [t, n, activities, home] = await Promise.all([
    getTranslations("pages.lifestyle"),
    getTranslations("nav"),
    getActivities(locale),
    getHome(locale),
  ]);
  const blocks = [home.family, home.pets];
  return (
    <main id="main">
      <JsonLd
        data={breadcrumbLd(locale, [
          { name: n("home"), path: "" },
          { name: n("lifestyle"), path: "/lifestyle" },
        ])}
      />
      <PageHero eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} image={localize(lifestyle.kite, locale)} />
      {blocks.map((b, i) => (
        <Section key={i} tone={i ? "alt" : "default"}>
          <div className="container-x grid grid-cols-12 items-center gap-x-6 gap-y-10">
            <div className={`col-span-12 md:col-span-6 ${i ? "md:order-2 md:col-start-7" : ""}`}>
              <Picture
                image={b.image}
                sizes="(min-width: 768px) 50vw, 100vw"
                aspect="4/5"
                showCaption={false}
                parallax={0.04}
              />
            </div>
            <div className={`col-span-12 md:col-span-5 ${i ? "md:order-1" : "md:col-start-8"}`}>
              <Eyebrow>{b.eyebrow}</Eyebrow>
              <h2 className="mt-5 display-m" data-reveal>
                <Accent text={b.title} />
              </h2>
              {b.body.map((p, j) => (
                <p key={j} className="mt-5 max-w-[48ch] text-fg-muted" data-reveal>
                  {p}
                </p>
              ))}
            </div>
          </div>
        </Section>
      ))}
      <Section className="container-x">
        <Eyebrow>{t("activities")}</Eyebrow>
        <div className="mt-12 space-y-20">
          {activities.map((g, i) => (
            <div key={g.slug} className="grid grid-cols-12 gap-x-6 gap-y-8">
              <div className={`col-span-12 md:col-span-5 ${i % 2 ? "md:order-2 md:col-start-8" : ""}`}>
                <Picture image={g.image} sizes="(min-width: 768px) 40vw, 100vw" aspect="4/5" showCaption={false} />
              </div>
              <div className={`col-span-12 md:col-span-6 ${i % 2 ? "md:order-1" : "md:col-start-7"}`}>
                <h2 className="display-m">{g.group}</h2>
                <Accordion
                  className="mt-6"
                  items={g.items.map((it, k) => ({
                    id: `${g.slug}-${k}`,
                    title: it.name,
                    content: <p>{it.description}</p>,
                  }))}
                />
              </div>
            </div>
          ))}
        </div>
      </Section>
    </main>
  );
}
