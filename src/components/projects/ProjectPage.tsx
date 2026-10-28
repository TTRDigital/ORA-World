import { getTranslations } from "next-intl/server";
import type { Locale, Project } from "@/content/types";
import type { Localized } from "@/lib/localize";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Picture } from "@/components/ui/Picture";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { LeadForm } from "@/components/forms/LeadForm";
import { getProjects, getSiteSettings } from "@/lib/content";
import { Link } from "@/i18n/navigation";
import { JsonLd, breadcrumbLd } from "@/lib/seo";

export async function ProjectPage({ project: p, locale, path }: { project: Localized<Project>; locale: Locale; path: string }) {
  const [t, c, n, site, projects] = await Promise.all([getTranslations("pages.tesoro"), getTranslations("common"), getTranslations("nav"), getSiteSettings(locale), getProjects(locale)]);
  const others = projects.filter((x) => x.slug !== p.slug);
  return (
    <main id="main">
      <JsonLd data={breadcrumbLd(locale, [{ name: n("home"), path: "" }, { name: p.name, path }])} />
      <PageHero eyebrow={p.location} title={p.name} intro={p.tagline} image={p.hero} />
      <Section className="container-x">
        <div className="grid grid-cols-12 gap-x-6 gap-y-12">
          <div className="col-span-12 md:col-span-4">
            <Eyebrow>{t("facts")}</Eyebrow>
            <dl className="mt-6 divide-y divide-rule border-y border-rule">
              {p.facts.map((f, i) => (
                <div key={i} className="flex justify-between gap-6 py-4">
                  <dt className="eyebrow text-fg-muted">{f.label}</dt>
                  <dd className="tnum text-right">{f.value}{f.placeholder && <span className="eyebrow ml-2 text-accent-ink">{c("placeholder")}</span>}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="col-span-12 md:col-span-7 md:col-start-6">
            {p.summary.map((s, i) => (<p key={i} className="lead mb-5 max-w-[56ch] text-fg-muted" data-reveal>{s}</p>))}
          </div>
        </div>
      </Section>
      {p.sections.map((s, i) => (
        <Section key={i} tone={i % 2 ? "default" : "alt"}>
          <div className="container-x grid grid-cols-12 items-center gap-x-6 gap-y-10">
            {s.image && (
              <div className={`col-span-12 md:col-span-6 ${i % 2 ? "md:order-2 md:col-start-7" : ""}`}>
                <Picture image={s.image} sizes="(min-width: 768px) 50vw, 100vw" aspect="4/3" parallax={0.04} />
              </div>
            )}
            <div className={`col-span-12 ${s.image ? "md:col-span-5" : "md:col-span-8 md:col-start-3"} ${i % 2 ? "md:order-1" : s.image ? "md:col-start-8" : ""}`}>
              <Eyebrow>{String(i + 1).padStart(2, "0")}</Eyebrow>
              <h2 className="display-m mt-5" data-reveal>{s.title}</h2>
              {s.body.map((b, j) => (<p key={j} className="mt-5 max-w-[52ch] text-fg-muted" data-reveal>{b}</p>))}
            </div>
          </div>
        </Section>
      ))}
      {p.gallery.length > 1 && (
        <Section className="container-x">
          <Eyebrow>{t("gallery")}</Eyebrow>
          <GalleryGrid className="mt-10" items={p.gallery.map((g, i) => ({ id: `${p.slug}-${i}`, category: "exteriors", image: g, caption: g.alt }))} showFilters={false} />
        </Section>
      )}
      <Section tone="dark">
        <div className="container-x grid grid-cols-12 gap-x-6 gap-y-10">
          <div className="col-span-12 lg:col-span-5">
            <Eyebrow className="text-dark-accent">{c("requestPresentation")}</Eyebrow>
            <h2 className="display-l mt-5">{p.name}</h2>
            <p className="lead mt-5 max-w-[40ch] text-dark-fg/80">{p.tagline}</p>
          </div>
          <div className="col-span-12 lg:col-span-6 lg:col-start-7">
            <LeadForm variant="full" tone="dark" source={`project:${p.slug}`} consentText={site.consentText} bookingUrl={site.bookingUrl} />
          </div>
        </div>
      </Section>
      {others.length > 0 && (
        <Section className="container-x">
          <Eyebrow>{t("otherProjects")}</Eyebrow>
          <ul className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2">
            {others.map((o) => (
              <li key={o.slug}>
                <Link href={o.slug === "tesoro-del-mar" ? "/tesoro-del-mar" : `/projects/${o.slug}`} className="group block">
                  <Picture image={o.hero} sizes="(min-width: 768px) 50vw, 100vw" aspect="16/10" />
                  <h3 className="display-s mt-5 transition-colors group-hover:text-accent-ink">{o.name}</h3>
                  <p className="mt-1 text-fg-muted">{o.tagline}</p>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      )}
    </main>
  );
}
