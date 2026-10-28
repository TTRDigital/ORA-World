import { getTranslations } from "next-intl/server";
import { localeOf, pageMetaFromMessages } from "@/lib/page";
import { getPress, getSiteSettings } from "@/lib/content";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Picture } from "@/components/ui/Picture";
import { Button } from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";
import { JsonLd, breadcrumbLd } from "@/lib/seo";

export const generateMetadata = ({ params }: PageProps<"/[locale]/press">) =>
  pageMetaFromMessages(params, "press", "/press");

export default async function PressPage({ params }: PageProps<"/[locale]/press">) {
  const locale = await localeOf(params);
  const [t, c, n, press, site] = await Promise.all([
    getTranslations("pages.press"),
    getTranslations("common"),
    getTranslations("nav"),
    getPress(locale),
    getSiteSettings(locale),
  ]);
  const fmt = new Intl.DateTimeFormat(locale === "es" ? "es-PR" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <main id="main">
      <JsonLd
        data={breadcrumbLd(locale, [
          { name: n("home"), path: "" },
          { name: n("press"), path: "/press" },
        ])}
      />
      <PageHero eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")}>
        <div className="col-span-12 mt-10 flex flex-wrap items-center gap-6">
          {site.mediaKitUrl ? (
            <Button as="a" href={site.mediaKitUrl} download>
              {t("mediaKit")}
            </Button>
          ) : (
            <span className="eyebrow text-fg-muted">{t("mediaKitSoon")}</span>
          )}
          {site.email && (
            <a className="link-underline eyebrow" href={`mailto:${site.email}`}>
              {t("inquiries")}
            </a>
          )}
        </div>
      </PageHero>
      <Section className="container-x">
        <ul className="divide-y divide-rule border-y border-rule">
          {press.map((a) => (
            <li key={a.slug} className="grid grid-cols-12 items-center gap-x-6 gap-y-5 py-8">
              <div className="col-span-12 md:col-span-3">
                {a.image && <Picture image={a.image} sizes="25vw" aspect="4/3" showCaption={false} />}
              </div>
              <div className="col-span-12 md:col-span-6">
                <p className="eyebrow text-fg-muted">
                  {a.outlet} · {fmt.format(new Date(a.date))}
                </p>
                <h2 className="mt-2 display-s">
                  <Link href={`/press/${a.slug}`} className="hover:text-accent-ink">
                    {a.title}
                  </Link>
                </h2>
                <p className="mt-2 max-w-[52ch] text-fg-muted">{a.excerpt}</p>
                {a.placeholder && <p className="mt-2 eyebrow text-accent-ink">{c("placeholder")}</p>}
              </div>
              <div className="col-span-12 md:col-span-3 md:text-right">
                <Link href={`/press/${a.slug}`} className="link-underline eyebrow">
                  {c("readMore")} →
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </Section>
    </main>
  );
}
