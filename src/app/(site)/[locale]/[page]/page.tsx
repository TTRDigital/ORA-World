import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { localeOf, plain } from "@/lib/page";
import { getPage } from "@/lib/content";
import { routing } from "@/i18n/routing";
import { pageMetadata, JsonLd, breadcrumbLd } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Picture } from "@/components/ui/Picture";
import { pages as seed } from "@/content/seed/projects";

/** Generic CMS pages: hotel-development, careers, privacy, terms, accessibility, legal-disclaimer. */
export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => seed.map((p) => ({ locale, page: p.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/[page]">) {
  const { locale, page } = await params;
  const p = await getPage(locale as "en" | "es", page);
  if (!p) return {};
  return pageMetadata({ locale: locale as "en" | "es", title: plain(p.title), description: p.seoDescription, path: `/${page}`, image: p.hero?.src });
}

export default async function GenericPage({ params }: PageProps<"/[locale]/[page]">) {
  const locale = await localeOf(params);
  const { page } = await params;
  const p = await getPage(locale, page);
  if (!p) notFound();
  const n = await getTranslations("nav");
  const legal = ["privacy", "terms", "accessibility", "legal-disclaimer"].includes(page);
  return (
    <main id="main">
      <JsonLd data={breadcrumbLd(locale, [{ name: n("home"), path: "" }, { name: p.title, path: `/${page}` }])} />
      <PageHero eyebrow={legal ? n("legal") : "ORA World"} title={p.title} intro={p.intro} image={p.hero ?? null} compact />
      <Section className="container-x">
        <div className={legal ? "mx-auto max-w-[72ch]" : ""}>
          {p.sections.map((s, i) => (
            <section key={i} className={legal ? "mb-14 border-t border-rule pt-8" : "mb-20 grid grid-cols-12 gap-x-6 gap-y-8"}>
              {legal ? (
                <>
                  <h2 className="display-s">{s.title}</h2>
                  {s.body.map((b, j) => (<p key={j} className="mt-4 text-fg-muted">{b}</p>))}
                </>
              ) : (
                <>
                  {s.image && <div className={`col-span-12 md:col-span-6 ${i % 2 ? "md:order-2 md:col-start-7" : ""}`}><Picture image={s.image} sizes="(min-width: 768px) 50vw, 100vw" aspect="4/3" /></div>}
                  <div className={`col-span-12 ${s.image ? "md:col-span-5" : "md:col-span-8"} ${i % 2 ? "md:order-1" : s.image ? "md:col-start-8" : ""}`}>
                    <Eyebrow>{String(i + 1).padStart(2, "0")}</Eyebrow>
                    <h2 className="display-m mt-5">{s.title}</h2>
                    {s.body.map((b, j) => (<p key={j} className="mt-5 max-w-[52ch] text-fg-muted">{b}</p>))}
                  </div>
                </>
              )}
            </section>
          ))}
        </div>
      </Section>
    </main>
  );
}
