import { getTranslations } from "next-intl/server";
import { localeOf, pageMetaFromMessages } from "@/lib/page";
import { getHome } from "@/lib/content";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { ResilienceSignature } from "@/components/home/ResilienceSignature";
import { renders } from "@/content/seed/images";
import { localize } from "@/lib/localize";
import { JsonLd, breadcrumbLd } from "@/lib/seo";

export const generateMetadata = ({ params }: PageProps<"/[locale]/resilience">) =>
  pageMetaFromMessages(params, "resilience", "/resilience");

export default async function ResiliencePage({ params }: PageProps<"/[locale]/resilience">) {
  const locale = await localeOf(params);
  const [t, n, home] = await Promise.all([
    getTranslations("pages.resilience"),
    getTranslations("nav"),
    getHome(locale),
  ]);
  return (
    <main id="main">
      <JsonLd
        data={breadcrumbLd(locale, [
          { name: n("home"), path: "" },
          { name: n("resilience"), path: "/resilience" },
        ])}
      />
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        intro={t("intro")}
        image={localize(renders.towerDetail, locale)}
        compact
      />
      <ResilienceSignature block={home.resilience} />
      <Section className="container-x">
        <ol className="grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {home.resilience.features.map((f, i) => (
            <li key={f.slug} className="border-t border-rule pt-6" data-reveal data-delay={i * 0.05}>
              <span className="eyebrow text-accent-ink tnum">{String(i + 1).padStart(2, "0")}</span>
              <h2 className="mt-3 display-s">{f.title}</h2>
              <ul className="mt-4 space-y-2 text-fg-muted">
                {f.points.map((p, j) => (
                  <li key={j}>{p}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </Section>
    </main>
  );
}
