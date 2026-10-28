import { getTranslations } from "next-intl/server";
import { localeOf, pageMetaFromMessages } from "@/lib/page";
import { getFaqs, getHome, getIncentives } from "@/lib/content";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";
import { JsonLd, breadcrumbLd } from "@/lib/seo";

export const generateMetadata = ({ params }: PageProps<"/[locale]/incentives">) => pageMetaFromMessages(params, "incentives", "/incentives");

export default async function IncentivesPage({ params }: PageProps<"/[locale]/incentives">) {
  const locale = await localeOf(params);
  const [t, c, n, incentives, faqs, home] = await Promise.all([getTranslations("pages.incentives"), getTranslations("common"), getTranslations("nav"), getIncentives(locale), getFaqs(locale), getHome(locale)]);
  const taxFaqs = faqs.filter((f) => /act|ley/i.test(f.topic));
  return (
    <main id="main">
      <JsonLd data={breadcrumbLd(locale, [{ name: n("home"), path: "" }, { name: n("incentives"), path: "/incentives" }])} />
      <PageHero eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} />
      <Section className="container-x">
        <div className="grid grid-cols-12 gap-x-6 gap-y-12">
          <div className="col-span-12 md:col-span-4">
            <p className="lead text-fg-muted">{home.prosperous.body[0]}</p>
            <p className="small mt-8 border-t border-rule pt-4 text-fg-muted">{c("taxDisclaimer")}</p>
            <Button as={Link} href="/contact" variant="text" className="mt-6">{t("consult")}</Button>
          </div>
          <div className="col-span-12 md:col-span-7 md:col-start-6">
            <ol className="space-y-14">
              {incentives.map((inc, i) => (
                <li key={inc.slug} id={inc.slug} className="border-t border-rule pt-6" data-reveal>
                  <span className="eyebrow tnum text-accent-ink">{String(i + 1).padStart(2, "0")}</span>
                  <h2 className="display-m mt-3">{inc.title}</h2>
                  <p className="lead mt-4 max-w-[56ch] text-fg-muted">{inc.summary}</p>
                  {inc.body.map((b, j) => (<p key={j} className="mt-4 max-w-[60ch] text-fg-muted">{b}</p>))}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>
      {taxFaqs.length > 0 && (
        <Section tone="alt">
          <div className="container-x grid grid-cols-12 gap-x-6">
            <div className="col-span-12 md:col-span-4"><Eyebrow>{n("faq")}</Eyebrow><h2 className="display-m mt-4">{t("whoBenefits")}</h2></div>
            <div className="col-span-12 md:col-span-7 md:col-start-6">
              <Accordion items={taxFaqs.map((f) => ({ id: f.slug, title: f.question, content: f.answer.map((p, i) => <p key={i}>{p}</p>) }))} />
            </div>
          </div>
        </Section>
      )}
    </main>
  );
}
