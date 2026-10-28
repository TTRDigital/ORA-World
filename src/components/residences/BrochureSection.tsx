import { getTranslations } from "next-intl/server";
import type { SiteSettings } from "@/content/types";
import type { Localized } from "@/lib/localize";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Accent } from "@/components/ui/Accent";
import { RegistrationGate } from "@/components/gate/RegistrationGate";
import { Flipbook } from "@/components/ui/Flipbook";

/** Gated brochure: flipbook viewer plus PDF download. */
export async function BrochureSection({ site }: { site: Localized<SiteSettings> }) {
  const t = await getTranslations("brochure");
  const pages = site.brochurePages.map((p) => ({
    src: p.src,
    alt: p.alt,
    width: p.width,
    height: p.height,
    caption: p.caption,
    rendering: p.rendering,
    blurDataURL: p.blurDataURL,
  }));
  return (
    <Section id="brochure" className="container-x scroll-mt-24">
      <div className="grid grid-cols-12 gap-x-6">
        <div className="col-span-12 md:col-span-5">
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h2 className="mt-5 display-l">
            <Accent text={t("title")} />
          </h2>
        </div>
        <p className="col-span-12 mt-5 max-w-[40ch] lead text-fg-muted md:col-span-5 md:col-start-8 md:mt-14">
          {t("intro")}
        </p>
      </div>
      <div className="mt-12">
        <RegistrationGate source="brochure" consentText={site.consentText} inline>
          <Flipbook pages={pages} pdfUrl={site.brochureUrl} />
          <p className="mt-4 small text-fg-muted">
            {site.brochurePages.some((p) => p.placeholder) ? t("placeholder") : null}
            {!site.brochureUrl && ` · ${t("pdfSoon")}`}
          </p>
        </RegistrationGate>
      </div>
    </Section>
  );
}
