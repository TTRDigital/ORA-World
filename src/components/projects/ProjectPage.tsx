import { getTranslations } from "next-intl/server";
import type { Locale, Project } from "@/content/types";
import type { Localized } from "@/lib/localize";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Picture } from "@/components/ui/Picture";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { LeadFormLazy as LeadForm } from "@/components/forms/LeadFormLazy";
import { getHome, getProjects, getSiteSettings } from "@/lib/content";
import { DotGrid } from "@/components/home/DotGrid";
import { Walkthrough } from "@/components/home/Walkthrough";
import { CompareSlider } from "@/components/home/CompareSlider";
import { Interlude } from "@/components/home/Interlude";
import { Link } from "@/i18n/navigation";
import { JsonLd, breadcrumbLd } from "@/lib/seo";

export async function ProjectPage({
  project: p,
  locale,
  path,
}: {
  project: Localized<Project>;
  locale: Locale;
  path: string;
}) {
  const [t, c, n, site, projects, home] = await Promise.all([
    getTranslations("pages.tesoro"),
    getTranslations("common"),
    getTranslations("nav"),
    getSiteSettings(locale),
    getProjects(locale),
    getHome(locale),
  ]);
  const tdm = p.slug === "tesoro-del-mar";
  const compare = {
    ...home.compare,
    items: home.compare.items.filter((it) =>
      tdm ? !/Dorado Waterfalls/.test(it.kicker) : /Dorado Waterfalls/.test(it.kicker),
    ),
  };
  const others = projects.filter((x) => x.slug !== p.slug);
  return (
    <main id="main">
      <JsonLd
        data={breadcrumbLd(locale, [
          { name: n("home"), path: "" },
          { name: p.name, path },
        ])}
      />
      <PageHero eyebrow={p.location} title={p.name} intro={p.tagline} image={p.hero} />
      <Section className="container-x">
        <div className="grid grid-cols-12 gap-x-6 gap-y-12">
          <div className="col-span-12 md:col-span-4">
            <Eyebrow>{t("facts")}</Eyebrow>
            <dl className="mt-6 divide-y divide-rule border-y border-rule">
              {p.facts.map((f, i) => (
                <div key={i} className="flex justify-between gap-6 py-4">
                  <dt className="eyebrow text-fg-muted">{f.label}</dt>
                  <dd className="text-right tnum">
                    {f.value}
                    {f.placeholder && <span className="ml-2 eyebrow text-accent-ink">{c("placeholder")}</span>}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="col-span-12 md:col-span-7 md:col-start-6">
            {p.summary.map((s, i) => (
              <p key={i} className="mb-5 max-w-[56ch] lead text-fg-muted" data-reveal>
                {s}
              </p>
            ))}
          </div>
        </div>
      </Section>
      {tdm ? (
        <>
          <DotGrid block={home.glance} />
          <Walkthrough block={home.walkthrough} />
          <CompareSlider block={compare} />
        </>
      ) : p.slug === "dorado-waterfalls" ? (
        <>
          <Walkthrough block={home.walkthroughDW} place={p.name} />
          <Interlude image={home.interludeDW.image} lines={home.interludeDW.lines} />
          {compare.items.length > 0 && <CompareSlider block={compare} />}
        </>
      ) : null}
      {p.sections.map((s, i) => (
        <Section key={i} tone={i % 2 ? "default" : "alt"}>
          <div className="container-x grid grid-cols-12 items-center gap-x-6 gap-y-10">
            {s.image && (
              <div className={`col-span-12 md:col-span-6 ${i % 2 ? "md:order-2 md:col-start-7" : ""}`}>
                <Picture image={s.image} sizes="(min-width: 768px) 50vw, 100vw" aspect="4/3" parallax={0.04} />
              </div>
            )}
            <div
              className={`col-span-12 ${s.image ? "md:col-span-5" : "md:col-span-8 md:col-start-3"} ${i % 2 ? "md:order-1" : s.image ? "md:col-start-8" : ""}`}
            >
              <Eyebrow>{String(i + 1).padStart(2, "0")}</Eyebrow>
              <h2 className="mt-5 display-m" data-reveal>
                {s.title}
              </h2>
              {s.body.map((b, j) => (
                <p key={j} className="mt-5 max-w-[52ch] text-fg-muted" data-reveal>
                  {b}
                </p>
              ))}
            </div>
          </div>
        </Section>
      ))}
      {p.gallery.length > 1 && (
        <Section className="container-x">
          <Eyebrow>{t("gallery")}</Eyebrow>
          <GalleryGrid
            className="mt-10"
            items={p.gallery.map((g, i) => ({ id: `${p.slug}-${i}`, category: "exteriors", image: g, caption: g.alt }))}
            showFilters={false}
          />
        </Section>
      )}
      <Section tone="dark">
        <div className="container-x grid grid-cols-12 gap-x-6 gap-y-10">
          <div className="col-span-12 lg:col-span-5">
            <Eyebrow className="text-dark-accent">{c("requestPresentation")}</Eyebrow>
            <h2 className="mt-5 display-l">{p.name}</h2>
            <p className="mt-5 max-w-[40ch] lead text-dark-fg/80">{p.tagline}</p>
          </div>
          <div className="col-span-12 lg:col-span-6 lg:col-start-7">
            <LeadForm
              variant="full"
              tone="dark"
              source={`project:${p.slug}`}
              consentText={site.consentText}
              bookingUrl={site.bookingUrl}
            />
          </div>
        </div>
      </Section>
      {others.length > 0 && (
        <Section className="container-x">
          <Eyebrow>{t("otherProjects")}</Eyebrow>
          <ul className="mt-8 space-y-6">
            {others.map((o) => (
              <li key={o.slug}>
                <Link
                  href={o.slug === "tesoro-del-mar" ? "/tesoro-del-mar" : `/projects/${o.slug}`}
                  className="group grid items-center gap-6 overflow-hidden rounded-[1.5rem] bg-surface/60 p-3 md:grid-cols-2 md:gap-10 md:p-4"
                >
                  <Picture image={o.hero} sizes="(min-width: 768px) 46vw, 92vw" aspect="16/10" />
                  <div className="px-3 pb-4 md:px-0 md:pr-8 md:pb-0">
                    <h3 className="display-m transition-colors group-hover:text-accent-ink">{o.name}</h3>
                    <p className="mt-3 lead text-fg-muted">{o.tagline}</p>
                    <span className="mt-6 inline-block link-underline eyebrow text-accent-ink">{o.location}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      )}
    </main>
  );
}
