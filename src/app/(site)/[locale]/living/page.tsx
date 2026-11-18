import { getTranslations } from "next-intl/server";
import { localeOf, pageMetaFromMessages } from "@/lib/page";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Picture } from "@/components/ui/Picture";
import { Accent } from "@/components/ui/Accent";
import { Button } from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";
import { book } from "@/content/seed/images";
import { localize } from "@/lib/localize";
import { JsonLd, breadcrumbLd } from "@/lib/seo";

export const generateMetadata = ({ params }: PageProps<"/[locale]/living">) =>
  pageMetaFromMessages(params, "living", "/living");

const list = (t: (k: string) => string, key: string, n: number) =>
  Array.from({ length: n }, (_, i) => t(`${key}.${i}`));

/** Living at Tesoro del Mar (content from ORA World v2): a day here, the clubhouse, family and pets. */
export default async function LivingPage({ params }: PageProps<"/[locale]/living">) {
  const locale = await localeOf(params);
  const [t, n] = await Promise.all([getTranslations("pages.living"), getTranslations("nav")]);
  const day = [book.poolCabana, book.puttingGreen, book.gym, book.spa, book.foyer].map((image, i) => ({
    image,
    kicker: t(`day.${i}.kicker`),
    title: t(`day.${i}.title`),
    text: t(`day.${i}.text`),
  }));
  return (
    <main id="main">
      <JsonLd
        data={breadcrumbLd(locale, [
          { name: n("home"), path: "" },
          { name: n("living"), path: "/living" },
        ])}
      />
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        intro={t("intro")}
        image={localize(book.aerialCoast, locale)}
        compact
      />

      <Section>
        <div className="container-x grid grid-cols-12 gap-x-6 gap-y-10">
          <div className="col-span-12 lg:col-span-5">
            <Eyebrow>{t("easeEyebrow")}</Eyebrow>
            <h2 className="mt-5 display-l" data-reveal>
              <Accent text={t("easeTitle")} />
            </h2>
            <p className="mt-5 lead text-fg-muted">{t("easeText")}</p>
          </div>
          {(["water", "gardens"] as const).map((k, i) => (
            <div
              key={k}
              className={
                i === 0
                  ? "col-span-12 sm:col-span-6 lg:col-span-3 lg:col-start-7"
                  : "col-span-12 sm:col-span-6 lg:col-span-3"
              }
            >
              <p className="eyebrow text-accent-ink">{t(`${k}.title`)}</p>
              <ul className="mt-4 divide-y divide-rule border-y border-rule">
                {list(t, `${k}.items`, 3).map((x) => (
                  <li key={x} className="py-3">
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {/* A day here */}
        <ol className="container-x mt-16 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
          {day.map((d, i) => (
            <li key={i} data-reveal data-delay={i * 0.06}>
              <Picture
                image={localize(d.image, locale)}
                sizes="(min-width: 1024px) 19vw, (min-width: 640px) 46vw, 92vw"
                aspect="3/4"
                showCaption={false}
              />
              <p className="mt-4 eyebrow text-accent-ink">{d.kicker}</p>
              <h3 className="mt-1 display-s">{d.title}</h3>
              <p className="mt-1 text-fg-muted">{d.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="dark">
        <div className="container-x grid grid-cols-12 gap-x-6 gap-y-10">
          <div className="col-span-12 lg:col-span-5">
            <Eyebrow className="text-dark-accent">{t("clubEyebrow")}</Eyebrow>
            <h2 className="mt-5 display-l" data-reveal>
              <Accent text={t("clubTitle")} className="text-dark-accent" />
            </h2>
            <p className="mt-5 lead text-dark-fg/80">{t("clubText")}</p>
          </div>
          {(["inside", "everyone"] as const).map((k, i) => (
            <div
              key={k}
              className={
                i === 0
                  ? "col-span-12 sm:col-span-6 lg:col-span-3 lg:col-start-7"
                  : "col-span-12 sm:col-span-6 lg:col-span-3"
              }
            >
              <p className="eyebrow text-dark-accent">{t(`${k}.title`)}</p>
              <ul className="mt-4 divide-y divide-white/10 border-y border-white/10">
                {list(t, `${k}.items`, 3).map((x) => (
                  <li key={x} className="py-3">
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="container-x">
          <Eyebrow>{t("familyEyebrow")}</Eyebrow>
          <h2 className="mt-5 display-l" data-reveal>
            <Accent text={t("familyTitle")} />
          </h2>
          <p className="mt-5 max-w-[56ch] lead text-fg-muted">{t("familyText")}</p>
          <div className="mt-10 grid gap-x-6 gap-y-10 md:grid-cols-2">
            {(["family", "pets"] as const).map((k) => (
              <div key={k}>
                <p className="eyebrow text-accent-ink">{t(`${k}.title`)}</p>
                <ul className="mt-4 divide-y divide-rule border-y border-rule">
                  {list(t, `${k}.items`, 6).map((x) => (
                    <li key={x} className="py-3">
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap gap-4">
            <Button as={Link} href="/contact">
              {t("cta")}
            </Button>
            <Button as={Link} href="/virtual-tour" variant="text">
              {t("tour")}
            </Button>
          </div>
        </div>
      </Section>
    </main>
  );
}
