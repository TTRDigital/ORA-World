import { getTranslations } from "next-intl/server";
import { localeOf, pageMetaFromMessages } from "@/lib/page";
import { getFaqs } from "@/lib/content";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Accordion } from "@/components/ui/Accordion";
import { Accent } from "@/components/ui/Accent";
import { Button } from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";
import { Act60Calculator } from "@/components/incentives/Act60Calculator";
import { book } from "@/content/seed/images";
import { localize } from "@/lib/localize";
import { JsonLd, breadcrumbLd } from "@/lib/seo";

export const generateMetadata = ({ params }: PageProps<"/[locale]/incentives">) =>
  pageMetaFromMessages(params, "incentives", "/incentives");

const SOURCES = [
  { k: "act38", href: "https://bvirtualogp.pr.gov/ogp/Bvirtual/leyesreferencia/PDF/2020/0038-2026.pdf" },
  {
    k: "bulletin",
    href: "https://docs.pr.gov/files/DDEC/Aviso%20Pu%CC%81blico/Informative%20Bulletin%20DDEC%20NO.%202026-004%20Final.pdf",
  },
  { k: "irs", href: "https://www.irs.gov/publications/p570" },
  { k: "portal", href: "https://incentives.ddec.pr.gov/" },
] as const;

/** Act 60, as amended by Act 38-2026 (content from ORA World v2). General information, not advice. */
export default async function IncentivesPage({ params }: PageProps<"/[locale]/incentives">) {
  const locale = await localeOf(params);
  const [t, n, faqs] = await Promise.all([
    getTranslations("pages.incentives"),
    getTranslations("nav"),
    getFaqs(locale),
  ]);
  const taxFaqs = faqs.filter((f) => /act|ley/i.test(f.topic));
  const rates = [0, 1, 2].map((i) => ({ v: t(`rates.${i}.v`), text: t(`rates.${i}.text`) }));
  const residency = [0, 1, 2].map((i) => ({ title: t(`residency.${i}.title`), text: t(`residency.${i}.text`) }));
  const steps = [0, 1, 2, 3].map((i) => t(`steps.${i}`));
  const blocks = [0, 1, 2].map((i) => ({
    kicker: t(`blocks.${i}.kicker`),
    title: t(`blocks.${i}.title`),
    text: t(`blocks.${i}.text`),
  }));
  return (
    <main id="main">
      <JsonLd
        data={breadcrumbLd(locale, [
          { name: n("home"), path: "" },
          { name: n("incentives"), path: "/incentives" },
        ])}
      />
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        intro={t("intro")}
        image={localize(book.aerialCoast, locale)}
        compact
      />

      {/* The program and the rates */}
      <Section>
        <div className="container-x grid grid-cols-12 gap-x-6 gap-y-10">
          <div className="col-span-12 lg:col-span-6">
            <Eyebrow>{t("programEyebrow")}</Eyebrow>
            <p className="mt-6 lead">{t("program")}</p>
            <p className="mt-6 small text-fg-muted">{t("ratesNote")}</p>
          </div>
          <ul className="col-span-12 grid gap-4 sm:grid-cols-3 lg:col-span-5 lg:col-start-8 lg:grid-cols-1">
            {rates.map((r, i) => (
              <li key={i} className="rounded-[1.25rem] border border-rule p-5" data-reveal data-delay={i * 0.08}>
                <p className="font-display text-5xl text-accent-ink tnum">{r.v}</p>
                <p className="mt-3 text-fg-muted">{r.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Calculator */}
      <Section tone="alt">
        <div className="container-x grid grid-cols-12 gap-x-6 gap-y-10">
          <div className="col-span-12 lg:col-span-5">
            <h2 className="display-m" data-reveal>
              <Accent text={t("calcTitle")} />
            </h2>
            <p className="mt-5 lead text-fg-muted">{t("calcIntro")}</p>
          </div>
          <div className="col-span-12 lg:col-span-6 lg:col-start-7">
            <Act60Calculator
              l={{
                title: t("calc.title"),
                r0: t("calc.r0"),
                r4: t("calc.r4"),
                gains: t("calc.gains"),
                federal: t("calc.federal"),
                pr: t("calc.pr"),
                diff: t("calc.diff"),
                note: t("calc.note"),
              }}
            />
          </div>
        </div>
      </Section>

      {/* Residency and steps */}
      <Section>
        <div className="container-x">
          <Eyebrow>{t("residencyEyebrow")}</Eyebrow>
          <h2 className="mt-5 max-w-[24ch] display-m" data-reveal>
            <Accent text={t("residencyTitle")} />
          </h2>
          <p className="mt-4 max-w-[60ch] text-fg-muted">{t("residencyIntro")}</p>
          <ol className="mt-10 grid gap-x-6 gap-y-8 md:grid-cols-3">
            {residency.map((r, i) => (
              <li key={i} className="border-t border-rule pt-5">
                <p className="eyebrow text-accent-ink tnum">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-3 display-s">{r.title}</h3>
                <p className="mt-2 text-fg-muted">{r.text}</p>
              </li>
            ))}
          </ol>

          <h2 className="mt-20 display-m" data-reveal>
            <Accent text={t("stepsTitle")} />
          </h2>
          <ol className="mt-8 divide-y divide-rule border-y border-rule">
            {steps.map((s, i) => (
              <li key={i} className="grid grid-cols-[3rem_1fr] gap-4 py-5">
                <span className="font-display text-2xl text-accent-ink tnum">{String(i + 1).padStart(2, "0")}</span>
                <span className="lead">{s}</span>
              </li>
            ))}
          </ol>
          <p className="mt-5 max-w-[70ch] small text-fg-muted">{t("stepsNote")}</p>
        </div>
      </Section>

      {/* Deadline, decree, advice */}
      <Section tone="dark">
        <div className="container-x grid gap-x-6 gap-y-10 md:grid-cols-3">
          {blocks.map((b, i) => (
            <div key={i} className="border-t border-white/15 pt-5" data-reveal data-delay={i * 0.08}>
              <p className="eyebrow text-dark-accent">{b.kicker}</p>
              <h3 className="mt-3 display-s">{b.title}</h3>
              <p className="mt-3 text-dark-fg/80">{b.text}</p>
            </div>
          ))}
        </div>
        <div className="container-x mt-14">
          <p className="eyebrow text-dark-accent">{t("sourcesTitle")}</p>
          <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
            {SOURCES.map((s) => (
              <li key={s.k}>
                <a href={s.href} target="_blank" rel="noopener" className="link-underline">
                  {t(`sources.${s.k}`)}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Questions */}
      <Section tone="alt">
        <div className="container-x grid grid-cols-12 gap-x-6 gap-y-8">
          <div className="col-span-12 md:col-span-4">
            <Eyebrow>{n("faq")}</Eyebrow>
            <h2 className="mt-4 display-m">
              <Accent text={t("faqTitle")} />
            </h2>
            <Button as={Link} href="/contact" className="mt-8">
              {t("consult")}
            </Button>
          </div>
          <div className="col-span-12 md:col-span-7 md:col-start-6">
            <Accordion
              items={taxFaqs.map((f) => ({
                id: f.slug,
                title: f.question,
                content: f.answer.map((p, i) => <p key={i}>{p}</p>),
              }))}
            />
          </div>
        </div>
        <p className="container-x mt-12 max-w-[90ch] small text-fg-muted">{t("disclaimer")}</p>
      </Section>
    </main>
  );
}
