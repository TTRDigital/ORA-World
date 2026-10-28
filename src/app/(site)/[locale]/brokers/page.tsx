import { getTranslations } from "next-intl/server";
import { localeOf, pageMetaFromMessages } from "@/lib/page";
import { getSiteSettings } from "@/lib/content";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { LeadForm } from "@/components/forms/LeadForm";
import { Button } from "@/components/ui/Button";
import { renders } from "@/content/seed/images";
import { localize } from "@/lib/localize";
import { JsonLd, breadcrumbLd } from "@/lib/seo";

export const generateMetadata = ({ params }: PageProps<"/[locale]/brokers">) =>
  pageMetaFromMessages(params, "brokers", "/brokers");

export default async function BrokersPage({ params }: PageProps<"/[locale]/brokers">) {
  const locale = await localeOf(params);
  const [t, n, site] = await Promise.all([
    getTranslations("pages.brokers"),
    getTranslations("nav"),
    getSiteSettings(locale),
  ]);
  return (
    <main id="main">
      <JsonLd
        data={breadcrumbLd(locale, [
          { name: n("home"), path: "" },
          { name: n("brokers"), path: "/brokers" },
        ])}
      />
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        intro={t("intro")}
        image={localize(renders.naguaboWide, locale)}
        compact
      />
      <Section className="container-x">
        <div className="grid grid-cols-12 gap-x-6 gap-y-12">
          <div className="col-span-12 md:col-span-4">
            <Eyebrow>{t("coop")}</Eyebrow>
            <p className="mt-6 max-w-[40ch] lead text-fg-muted">{t("coopText")}</p>
            <div className="mt-8">
              {site.brokerKitUrl ? (
                <Button as="a" href={site.brokerKitUrl} download>
                  {t("kit")}
                </Button>
              ) : (
                <span className="eyebrow text-fg-muted">{t("kitSoon")}</span>
              )}
            </div>
          </div>
          <div className="col-span-12 md:col-span-7 md:col-start-6">
            <h2 className="mb-8 display-m">{t("register")}</h2>
            <LeadForm variant="broker" source="brokers" consentText={site.consentText} bookingUrl={site.bookingUrl} />
          </div>
        </div>
      </Section>
    </main>
  );
}
