import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { localeOf, pageMetaFromMessages } from "@/lib/page";
import { getTeam } from "@/lib/content";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { JsonLd, breadcrumbLd } from "@/lib/seo";

export const generateMetadata = ({ params }: PageProps<"/[locale]/the-team">) => pageMetaFromMessages(params, "team", "/the-team");

export default async function TeamPage({ params }: PageProps<"/[locale]/the-team">) {
  const locale = await localeOf(params);
  const [t, c, n, team] = await Promise.all([getTranslations("pages.team"), getTranslations("common"), getTranslations("nav"), getTeam(locale)]);
  return (
    <main id="main">
      <JsonLd data={breadcrumbLd(locale, [{ name: n("home"), path: "" }, { name: n("team"), path: "/the-team" }])} />
      <PageHero eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} />
      <Section className="container-x">
        <ol className="space-y-24">
          {team.map((m, i) => (
            <li key={m.slug} id={m.slug} className="grid grid-cols-12 gap-x-6 gap-y-8 border-t border-rule pt-10">
              <div className={`col-span-12 md:col-span-4 ${i % 2 ? "md:order-2 md:col-start-9" : ""}`}>
                <figure className="relative aspect-[4/5] overflow-hidden bg-surface" data-reveal="image"><Image src={m.portrait.src} alt={m.portrait.alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" data-reveal-inner /></figure>
              </div>
              <div className={`col-span-12 md:col-span-7 ${i % 2 ? "md:order-1" : "md:col-start-6"}`}>
                <p className="eyebrow text-accent-ink">{m.discipline}</p>
                <h2 className="display-m mt-3">{m.name}</h2>
                <p className="mt-1 text-fg-muted">{m.role}</p>
                {m.quote && <blockquote className="mt-8 max-w-[30ch] font-display text-2xl italic md:text-3xl">“{m.quote}”</blockquote>}
                {m.bio.map((p, j) => (<p key={j} className="mt-5 max-w-[56ch] text-fg-muted">{p}</p>))}
                {m.website && <a href={m.website} target="_blank" rel="noopener" className="eyebrow link-underline mt-6 inline-block">{m.website.replace(/^https?:\/\//, "")}</a>}
                {m.placeholder && <p className="eyebrow mt-6 text-fg-muted">{c("placeholder")}</p>}
              </div>
            </li>
          ))}
        </ol>
      </Section>
    </main>
  );
}
