import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { localeOf, plain } from "@/lib/page";
import { getPressArticle } from "@/lib/content";
import { routing } from "@/i18n/routing";
import { pageMetadata, JsonLd, breadcrumbLd } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { press as seed } from "@/content/seed/people-places";
import { siteUrl } from "@/lib/utils";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => seed.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/press/[slug]">) {
  const { locale, slug } = await params;
  const a = await getPressArticle(locale as "en" | "es", slug);
  if (!a) return {};
  return pageMetadata({
    locale: locale as "en" | "es",
    title: plain(a.title),
    description: a.excerpt,
    path: `/press/${slug}`,
    image: a.image?.src,
    eyebrow: a.outlet,
  });
}

export default async function ArticlePage({ params }: PageProps<"/[locale]/press/[slug]">) {
  const locale = await localeOf(params);
  const { slug } = await params;
  const a = await getPressArticle(locale, slug);
  if (!a) notFound();
  const [t, n] = await Promise.all([getTranslations("pages.press"), getTranslations("nav")]);
  const fmt = new Intl.DateTimeFormat(locale === "es" ? "es-PR" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <main id="main">
      <JsonLd
        data={[
          breadcrumbLd(locale, [
            { name: n("home"), path: "" },
            { name: n("press"), path: "/press" },
            { name: a.title, path: `/press/${a.slug}` },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            headline: a.title,
            datePublished: a.date,
            publisher: { "@type": "Organization", name: a.outlet },
            image: a.image ? [`${siteUrl}${a.image.src}`] : undefined,
            url: `${siteUrl}/${locale}/press/${a.slug}`,
          },
        ]}
      />
      <PageHero
        eyebrow={`${a.outlet} · ${fmt.format(new Date(a.date))}`}
        title={a.title}
        intro={a.excerpt}
        image={a.image}
        compact
      >
        <Breadcrumbs
          light
          className="col-span-12 mt-10"
          items={[{ name: n("home"), href: "/" }, { name: n("press"), href: "/press" }, { name: a.outlet }]}
        />
      </PageHero>
      <Section className="container-x">
        <div className="grid grid-cols-12 gap-x-6">
          <article className="col-span-12 md:col-span-7 md:col-start-4">
            {renderBody(a.body)}
            {a.url && (
              <Button as="a" href={a.url} target="_blank" rel="noopener" className="mt-6">
                {t("readFull")}
              </Button>
            )}
          </article>
        </div>
      </Section>
    </main>
  );
}

/**
 * Article text is stored as plain blocks: "## " starts a heading, "• " a bullet (consecutive bullets
 * form one list), "— " the author line; anything else is a paragraph.
 */
function renderBody(blocks: string[]) {
  const out: React.ReactNode[] = [];
  let list: string[] = [];
  const flush = (key: number) => {
    if (!list.length) return;
    out.push(
      <ul key={`ul-${key}`} className="mb-8 space-y-3 border-l border-rule pl-6">
        {list.map((li, j) => (
          <li
            key={j}
            className="relative text-fg-muted before:absolute before:top-[0.7em] before:-left-6 before:h-px before:w-3 before:bg-accent"
          >
            {li}
          </li>
        ))}
      </ul>,
    );
    list = [];
  };
  blocks.forEach((b, i) => {
    if (b.startsWith("• ")) {
      list.push(b.slice(2));
      return;
    }
    flush(i);
    if (b.startsWith("## "))
      out.push(
        <h2 key={i} className="mt-12 mb-5 display-s">
          {b.slice(3)}
        </h2>,
      );
    else if (b.startsWith("— "))
      out.push(
        <p key={i} className="mt-10 eyebrow text-accent-ink">
          {b}
        </p>,
      );
    else
      out.push(
        <p key={i} className="mb-6 lead text-fg-muted">
          {b}
        </p>,
      );
  });
  flush(blocks.length);
  return out;
}
