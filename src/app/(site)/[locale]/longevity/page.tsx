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

export const generateMetadata = ({ params }: PageProps<"/[locale]/longevity">) =>
  pageMetaFromMessages(params, "longevity", "/longevity");

/** The ORA longevity program (carried over from ORA World v2): promise, program, and the places it happens. */
export default async function LongevityPage({ params }: PageProps<"/[locale]/longevity">) {
  const locale = await localeOf(params);
  const [t, n] = await Promise.all([getTranslations("pages.longevity"), getTranslations("nav")]);
  const promise = [0, 1, 2, 3].map((i) => ({ title: t(`promise.${i}.title`), text: t(`promise.${i}.text`) }));
  const program = [0, 1, 2, 3, 4, 5, 6].map((i) => ({ title: t(`program.${i}.title`), text: t(`program.${i}.text`) }));
  const places = [
    { image: book.gym, kicker: t("places.0.kicker"), title: t("places.0.title"), text: t("places.0.text") },
    { image: book.spa, kicker: t("places.1.kicker"), title: t("places.1.title"), text: t("places.1.text") },
    { image: book.aerialTowers, kicker: t("places.2.kicker"), title: t("places.2.title"), text: t("places.2.text") },
    { image: book.puttingGreen, kicker: t("places.3.kicker"), title: t("places.3.title"), text: t("places.3.text") },
  ];
  return (
    <main id="main">
      <JsonLd
        data={breadcrumbLd(locale, [
          { name: n("home"), path: "" },
          { name: n("longevity"), path: "/longevity" },
        ])}
      />
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        intro={t("intro")}
        image={localize(book.gym, locale)}
        compact
      />

      <Section>
        <div className="container-x">
          <Eyebrow>{t("promiseEyebrow")}</Eyebrow>
          <h2 className="mt-5 display-l" data-reveal>
            <Accent text={t("promiseTitle")} />
          </h2>
          <ol className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {promise.map((p, i) => (
              <li key={i} className="border-t border-rule pt-6" data-reveal data-delay={i * 0.08}>
                <p className="font-display text-4xl text-accent-ink tnum">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-4 display-s">{p.title}</h3>
                <p className="mt-2 text-fg-muted">{p.text}</p>
              </li>
            ))}
          </ol>
          <blockquote className="mt-16 max-w-3xl font-serif text-[clamp(1.6rem,1.2rem+1.6vw,2.6rem)] leading-tight italic">
            “{t("quote")}”
          </blockquote>
        </div>
      </Section>

      {/* Dr. Yan: preventive maintenance and the self-made body */}
      <Section tone="alt">
        <div className="container-x grid grid-cols-12 gap-x-6 gap-y-10">
          <div className="col-span-12 lg:col-span-6">
            <Eyebrow>{t("planesEyebrow")}</Eyebrow>
            <h2 className="mt-5 display-m" data-reveal>
              <Accent text={t("planesTitle")} />
            </h2>
            <p className="mt-5 lead text-fg-muted">{t("planesText")}</p>
          </div>
          <div className="col-span-12 lg:col-span-5 lg:col-start-8">
            <Eyebrow>{t("selfEyebrow")}</Eyebrow>
            <h2 className="mt-5 display-m" data-reveal>
              <Accent text={t("selfTitle")} />
            </h2>
            <p className="mt-5 lead text-fg-muted">{t("selfText")}</p>
            <ul className="mt-6 divide-y divide-rule border-y border-rule">
              {[0, 1, 2].map((i) => (
                <li key={i} className="py-3">
                  {t(`selfItems.${i}`)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section tone="dark">
        <div className="container-x grid grid-cols-12 gap-x-6 gap-y-10">
          <div className="col-span-12 lg:col-span-5">
            <Eyebrow className="text-dark-accent">{t("programEyebrow")}</Eyebrow>
            <h2 className="mt-5 display-l" data-reveal>
              <Accent text={t("programTitle")} className="text-dark-accent" />
            </h2>
            <p className="mt-5 lead text-dark-fg/80">{t("programIntro")}</p>
          </div>
          <ol className="col-span-12 divide-y divide-white/10 border-y border-white/10 lg:col-span-6 lg:col-start-7">
            {program.map((p, i) => (
              <li key={i} className="grid grid-cols-[3rem_1fr] gap-4 py-5" data-reveal data-delay={i * 0.05}>
                <span className="font-display text-2xl text-dark-accent tnum">{String(i + 1).padStart(2, "0")}</span>
                <span>
                  <span className="block display-s">{p.title}</span>
                  <span className="mt-1 block text-dark-fg/75">{p.text}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section>
        <div className="container-x">
          <Eyebrow>{t("placesEyebrow")}</Eyebrow>
          <h2 className="mt-5 display-l" data-reveal>
            <Accent text={t("placesTitle")} />
          </h2>
          <ul className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2">
            {places.map((p, i) => (
              <li key={i} data-reveal data-delay={(i % 2) * 0.08}>
                <Picture image={localize(p.image, locale)} sizes="(min-width: 640px) 46vw, 92vw" aspect="16/10" />
                <p className="mt-5 eyebrow text-accent-ink">{p.kicker}</p>
                <h3 className="mt-2 display-s">{p.title}</h3>
                <p className="mt-2 text-fg-muted">{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section tone="surface">
        <div className="container-x max-w-3xl text-center">
          <p className="font-serif text-[clamp(1.6rem,1.2rem+1.6vw,2.6rem)] leading-tight italic">“{t("question")}”</p>
          <p className="mt-5 lead text-fg-muted">{t("questionText")}</p>
          <div className="mt-8 flex justify-center">
            <Button as={Link} href="/contact">
              {t("cta")}
            </Button>
          </div>
        </div>
      </Section>
    </main>
  );
}
