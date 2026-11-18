import { getTranslations } from "next-intl/server";
import { localeOf, pageMetaFromMessages } from "@/lib/page";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Picture } from "@/components/ui/Picture";
import { Accent } from "@/components/ui/Accent";
import { Button } from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";
import { finishGroups } from "@/content/seed/finishes";
import { book } from "@/content/seed/images";
import { localize } from "@/lib/localize";
import { JsonLd, breadcrumbLd } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const generateMetadata = ({ params }: PageProps<"/[locale]/finishes">) =>
  pageMetaFromMessages(params, "finishes", "/finishes");

/** The specified finishes, category by category: picture, words, then the products by brand. */
export default async function FinishesPage({ params }: PageProps<"/[locale]/finishes">) {
  const locale = await localeOf(params);
  const [t, n] = await Promise.all([getTranslations("pages.finishes"), getTranslations("nav")]);
  const groups = localize(finishGroups, locale);
  return (
    <main id="main">
      <JsonLd
        data={breadcrumbLd(locale, [
          { name: n("home"), path: "" },
          { name: n("finishes"), path: "/finishes" },
        ])}
      />
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        intro={t("intro")}
        image={localize(book.kitchenDining, locale)}
        compact
      />
      <nav
        aria-label={t("eyebrow")}
        className="sticky top-[var(--header-offset)] z-20 container-x flex [scrollbar-width:none] gap-x-8 overflow-x-auto border-b border-rule bg-bg/95 py-4 backdrop-blur-sm transition-[top] duration-500"
      >
        {groups.map((g) => (
          <a key={g.id} href={`#${g.id}`} className="shrink-0 link-underline py-1 eyebrow">
            {g.kicker.split(" · ").pop()}
          </a>
        ))}
      </nav>
      {groups.map((g, i) => (
        <Section key={g.id} id={g.id} tone={i % 2 ? "alt" : "default"} className="scroll-mt-36">
          <div className="container-x grid grid-cols-12 items-start gap-x-6 gap-y-10">
            {g.image && (
              <div className={cn("col-span-12 lg:col-span-6", i % 2 && "lg:order-2 lg:col-start-7")} data-reveal>
                <Picture image={g.image} sizes="(min-width: 1024px) 46vw, 92vw" aspect="4/3" />
              </div>
            )}
            <div className={cn("col-span-12 lg:col-span-5", i % 2 ? "lg:order-1" : "lg:col-start-8")}>
              <Eyebrow>{g.kicker}</Eyebrow>
              <h2 className="mt-5 display-m" data-reveal>
                {g.title}
              </h2>
              <p className="mt-3 eyebrow text-accent-ink">{g.brands}</p>
              <p className="mt-5 lead text-fg-muted">{g.text}</p>
              <ul className="mt-8 divide-y divide-rule border-y border-rule">
                {g.items.map((it, k) => (
                  <li key={k} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-3">
                    <span>
                      {it.brand && <span className="mr-2 eyebrow text-fg-muted">{it.brand}</span>}
                      {it.name}
                    </span>
                    {it.detail && <span className="small text-fg-muted">{it.detail}</span>}
                  </li>
                ))}
              </ul>
            </div>
            {g.swatches && (
              <div className="col-span-12">
                <p className="eyebrow text-fg-muted">{t("swatches", { n: g.swatches.length })}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {g.swatches.map((s) => (
                    <li key={s} className="rounded-full border border-rule px-3 py-1.5 text-sm">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Section>
      ))}
      <Section tone="surface">
        <div className="container-x max-w-3xl text-center">
          <h2 className="display-m" data-reveal>
            <Accent text={t("ctaTitle")} />
          </h2>
          <p className="mt-5 lead text-fg-muted">{t("ctaText")}</p>
          <div className="mt-8 flex justify-center">
            <Button as={Link} href="/contact">
              {t("cta")}
            </Button>
          </div>
          <p className="mt-10 small text-fg-muted">{t("note")}</p>
        </div>
      </Section>
    </main>
  );
}
