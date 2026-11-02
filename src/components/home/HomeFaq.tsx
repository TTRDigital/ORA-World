import { getTranslations } from "next-intl/server";
import type { Faq, HomeContent, SiteSettings } from "@/content/types";
import type { Localized } from "@/lib/localize";
import { Link } from "@/i18n/navigation";
import { Accent } from "@/components/ui/Accent";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { ScrollToButton } from "@/components/ui/ScrollToButton";

type Props = { block: Localized<HomeContent["faq"]>; faqs: Localized<Faq>[]; site: Localized<SiteSettings> };

/** The questions buyers ask first, answered on the homepage; the full list lives on /faq. */
export async function HomeFaq({ block, faqs, site }: Props) {
  const h = await getTranslations("home");
  const c = await getTranslations("common");
  const picked = block.slugs.map((s) => faqs.find((f) => f.slug === s)).filter(Boolean) as Localized<Faq>[];
  return (
    <section className="py-section" aria-labelledby="faq-title">
      <div className="container-x grid grid-cols-12 gap-x-6 gap-y-12">
        <div className="col-span-12 lg:col-span-4">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
            <Eyebrow>{block.eyebrow}</Eyebrow>
            <h2 id="faq-title" className="mt-6 display-l" data-reveal>
              <Accent text={block.title} />
            </h2>
            <div className="mt-10 border border-rule bg-surface p-6">
              <p className="display-s">{h("stillQuestions")}</p>
              <p className="mt-3 small text-fg-muted">{site.salesGalleryName}</p>
              <div className="mt-6 flex flex-col items-start gap-3">
                <ScrollToButton target="#inquire">{c("requestPresentation")}</ScrollToButton>
                <Button as={Link} href="/faq" variant="text">
                  {h("allQuestions")}
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-7 lg:col-start-6">
          <Accordion
            defaultOpen={picked[0] ? `home-faq-${picked[0].slug}` : undefined}
            items={picked.map((f) => ({
              id: `home-faq-${f.slug}`,
              title: f.question,
              meta: <span className="hidden eyebrow text-fg-muted sm:inline">{f.topic}</span>,
              content: f.answer.map((p, i) => <p key={i}>{p}</p>),
            }))}
          />
        </div>
      </div>
    </section>
  );
}
