import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { localeOf, pageMetaFromMessages } from "@/lib/page";
import { getTeam } from "@/lib/content";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { JsonLd, breadcrumbLd } from "@/lib/seo";
import { scaleSizes } from "@/lib/sizes";

export const generateMetadata = ({ params }: PageProps<"/[locale]/the-team">) =>
  pageMetaFromMessages(params, "team", "/the-team");

export default async function TeamPage({ params }: PageProps<"/[locale]/the-team">) {
  const locale = await localeOf(params);
  const [t, h, n, team] = await Promise.all([
    getTranslations("pages.team"),
    getTranslations("home"),
    getTranslations("nav"),
    getTeam(locale),
  ]);
  return (
    <main id="main">
      <JsonLd
        data={breadcrumbLd(locale, [
          { name: n("home"), path: "" },
          { name: n("team"), path: "/the-team" },
        ])}
      />
      <PageHero eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} />
      <Section className="container-x">
        <ol className="space-y-24">
          {team
            .filter((m) => !m.placeholder)
            .map((m, i) => (
              <li key={m.slug} id={m.slug} className="grid grid-cols-12 gap-x-6 gap-y-8 border-t border-rule pt-10">
                <div className={`col-span-12 md:col-span-4 ${i % 2 ? "md:order-2 md:col-start-9" : ""}`}>
                  {m.portrait.width < 600 ? (
                    /* The supplied portrait is small, so it is shown at a size where it stays sharp. */
                    <figure className="flex aspect-[4/5] items-center justify-center bg-surface" data-reveal>
                      <Image
                        src={m.portrait.src}
                        alt={m.portrait.alt}
                        width={m.portrait.width}
                        height={m.portrait.height}
                        sizes={`${m.portrait.width}px`}
                        className="h-[150px] w-[150px] rounded-full object-cover ring-1 ring-accent ring-offset-8 ring-offset-surface"
                      />
                    </figure>
                  ) : (
                    <figure className="relative aspect-[4/5] overflow-hidden bg-surface" data-reveal="image">
                      <Image
                        src={m.portrait.src}
                        alt={m.portrait.alt}
                        fill
                        sizes={scaleSizes("(min-width: 768px) 33vw, 100vw", m.portrait, 4 / 5)}
                        className="object-cover"
                        style={{ objectPosition: m.portrait.position }}
                        data-reveal-inner
                      />
                    </figure>
                  )}
                </div>
                <div className={`col-span-12 md:col-span-7 ${i % 2 ? "md:order-1" : "md:col-start-6"}`}>
                  <p className="eyebrow text-accent-ink">{m.discipline}</p>
                  <h2 className="mt-3 display-m">{m.name}</h2>
                  <p className="mt-1 text-fg-muted">{m.role}</p>
                  {m.quote && (
                    <blockquote className="mt-8 max-w-[30ch] font-display text-2xl italic md:text-3xl">
                      “{m.quote}”
                    </blockquote>
                  )}
                  {m.bio.map((p, j) => (
                    <p key={j} className="mt-5 max-w-[56ch] text-fg-muted">
                      {p}
                    </p>
                  ))}
                  {m.website && (
                    <a
                      href={m.website}
                      target="_blank"
                      rel="noopener"
                      className="mt-6 inline-block link-underline eyebrow"
                    >
                      {m.website.replace(/^https?:\/\//, "")}
                    </a>
                  )}
                </div>
              </li>
            ))}
        </ol>
        {team.some((m) => m.placeholder) && (
          <div className="mt-24 border-t border-rule pt-10">
            <p className="eyebrow text-accent-ink">{h("toBeAnnounced")}</p>
            <ul className="mt-6 grid gap-px border border-rule bg-rule sm:grid-cols-3">
              {team
                .filter((m) => m.placeholder)
                .map((m) => (
                  <li key={m.slug} className="bg-bg p-6">
                    <p className="display-s">{m.discipline}</p>
                    <p className="mt-2 small text-fg-muted">{m.role}</p>
                  </li>
                ))}
            </ul>
          </div>
        )}
      </Section>
    </main>
  );
}
