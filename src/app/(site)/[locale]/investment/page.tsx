import { getTranslations } from "next-intl/server";
import { localeOf, pageMetaFromMessages } from "@/lib/page";
import { getCollections, getInvestmentSteps, getSiteSettings } from "@/lib/content";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RegistrationGate } from "@/components/gate/RegistrationGate";
import { Estimator } from "@/components/ui/Estimator";
import { Link } from "@/i18n/navigation";
import { JsonLd, breadcrumbLd } from "@/lib/seo";

export const generateMetadata = ({ params }: PageProps<"/[locale]/investment">) =>
  pageMetaFromMessages(params, "investment", "/investment");

export default async function InvestmentPage({ params }: PageProps<"/[locale]/investment">) {
  const locale = await localeOf(params);
  const [t, c, n, steps, collections, site] = await Promise.all([
    getTranslations("pages.investment"),
    getTranslations("common"),
    getTranslations("nav"),
    getInvestmentSteps(locale),
    getCollections(locale),
    getSiteSettings(locale),
  ]);
  return (
    <main id="main">
      <JsonLd
        data={breadcrumbLd(locale, [
          { name: n("home"), path: "" },
          { name: n("investment"), path: "/investment" },
        ])}
      />
      <PageHero eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} />

      <Section className="container-x">
        <div className="grid grid-cols-12 gap-x-6 gap-y-10">
          <div className="col-span-12 md:col-span-4">
            <Eyebrow>{t("timeline")}</Eyebrow>
            <p className="mt-6 max-w-[40ch] small text-fg-muted">{t("notice")}</p>
          </div>
          <ol className="col-span-12 md:col-span-7 md:col-start-6">
            {steps.map((s, i) => (
              <li
                key={s.order}
                className="relative grid grid-cols-[3rem_1fr] gap-x-6 pb-12"
                data-reveal
                data-delay={i * 0.08}
              >
                <div className="flex flex-col items-center">
                  <span className="flex h-12 w-12 items-center justify-center border border-accent font-display text-lg text-accent-ink tnum">
                    {s.percent !== null ? `${s.percent}%` : String(s.order).padStart(2, "0")}
                  </span>
                  {i < steps.length - 1 && <span aria-hidden className="mt-2 w-px flex-1 bg-rule" />}
                </div>
                <div>
                  <p className="eyebrow text-fg-muted">{s.when}</p>
                  <h2 className="mt-1 display-s">{s.title}</h2>
                  <p className="mt-2 max-w-[52ch] text-fg-muted">{s.detail}</p>
                  {s.placeholder && <p className="mt-2 eyebrow text-accent-ink">{c("placeholder")}</p>}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section tone="alt">
        <div className="container-x grid grid-cols-12 gap-x-6 gap-y-10">
          <div className="col-span-12 md:col-span-4">
            <Eyebrow>{t("pricing")}</Eyebrow>
            <p className="mt-6 max-w-[40ch] small text-fg-muted">{t("pricingGated")}</p>
          </div>
          <div className="col-span-12 md:col-span-7 md:col-start-6">
            <RegistrationGate source="investment:pricing" consentText={site.consentText} inline>
              <dl className="divide-y divide-rule border-y border-rule">
                {collections.map((col) => (
                  <div key={col.slug} className="flex items-baseline justify-between gap-6 py-4">
                    <dt>
                      <Link href={`/residences/${col.slug}`} className="link-underline display-s">
                        {col.name}
                      </Link>
                      <span className="ml-3 eyebrow text-fg-muted">{col.bedrooms ?? ""}</span>
                    </dt>
                    <dd className="text-right tnum">
                      {col.fromPrice ? (
                        `${c("from")} $${col.fromPrice.toLocaleString("en-US")}`
                      ) : (
                        <span className="eyebrow text-accent-ink">{c("priceOnRequest")}</span>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 small text-fg-muted">{t("notice")}</p>
            </RegistrationGate>
          </div>
        </div>
      </Section>

      <Section className="container-x">
        <Eyebrow>{t("estimator")}</Eyebrow>
        <div className="mt-10">
          <Estimator />
        </div>
      </Section>
    </main>
  );
}
