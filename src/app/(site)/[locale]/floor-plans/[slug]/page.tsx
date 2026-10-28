import { notFound } from "next/navigation";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { localeOf, plain } from "@/lib/page";
import { getCollection, getFloorPlan, getFloorPlans, getSiteSettings } from "@/lib/content";
import { routing } from "@/i18n/routing";
import { pageMetadata, JsonLd, breadcrumbLd } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { RegistrationGate } from "@/components/gate/RegistrationGate";
import { ZoomImage } from "@/components/plans/ZoomImage";
import { ShortlistButton } from "@/components/plans/ShortlistButton";
import { ShortlistBar } from "@/components/plans/ShortlistBar";
import { PlanCard } from "@/components/plans/PlanCard";
import { LeadForm } from "@/components/forms/LeadForm";
import { Button } from "@/components/ui/Button";
import { PlanViewTracker } from "@/components/plans/PlanViewTracker";
import { floorPlans as seed } from "@/content/seed/collections";

export async function generateStaticParams() {
  return routing.locales.flatMap((locale) => seed.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/floor-plans/[slug]">) {
  const { locale, slug } = await params;
  const p = await getFloorPlan(locale as "en" | "es", slug);
  if (!p) return {};
  return pageMetadata({ locale: locale as "en" | "es", title: plain(p.name), description: `${p.bedrooms} BR · ${p.bathrooms} BA · ${p.tower}`, path: `/floor-plans/${slug}`, eyebrow: "Floor plan" });
}

export default async function PlanPage({ params }: PageProps<"/[locale]/floor-plans/[slug]">) {
  const locale = await localeOf(params);
  const { slug } = await params;
  const p = await getFloorPlan(locale, slug);
  if (!p) notFound();
  const [t, c, n, pl, col, all, site] = await Promise.all([getTranslations("pages.floorPlans"), getTranslations("common"), getTranslations("nav"), getTranslations("plan"), getCollection(locale, p.collection), getFloorPlans(locale), getSiteSettings(locale)]);
  const status = { available: c("available"), reserved: c("reserved"), sold: c("sold") }[p.status];
  const specs: [string, string][] = [
    [c("bedrooms"), String(p.bedrooms)],
    [c("bathrooms"), String(p.bathrooms)],
    [c("interior"), p.interiorSqFt ? `${p.interiorSqFt.toLocaleString("en-US")} ${c("sqft")}` : c("placeholder")],
    [c("exterior"), p.exteriorSqFt ? `${p.exteriorSqFt.toLocaleString("en-US")} ${c("sqft")}` : c("placeholder")],
    [c("view"), p.view],
    [c("orientation"), p.orientation],
    [c("tower"), p.tower],
    [c("floor"), p.floors ?? c("placeholder")],
    [c("status"), status],
    [c("from"), p.fromPrice ? `$${p.fromPrice.toLocaleString("en-US")}` : c("priceOnRequest")],
  ];
  const similar = all.filter((x) => x.collection === p.collection && x.slug !== p.slug).slice(0, 3);
  return (
    <main id="main">
      <PlanViewTracker slug={p.slug} />
      <JsonLd data={breadcrumbLd(locale, [{ name: n("home"), path: "" }, { name: n("floorPlans"), path: "/floor-plans" }, { name: p.name, path: `/floor-plans/${p.slug}` }])} />
      <PageHero eyebrow={`${col?.name ?? ""} · ${p.tower}`} title={p.name} intro={`${pl("bed", { n: p.bedrooms })} · ${pl("bath", { n: p.bathrooms })} · ${p.view}`} compact>
        <Breadcrumbs className="col-span-12 mt-10" items={[{ name: n("home"), href: "/" }, { name: n("floorPlans"), href: "/floor-plans" }, { name: p.name }]} />
      </PageHero>

      <Section className="container-x">
        <div className="grid grid-cols-12 gap-x-6 gap-y-12">
          <div className="col-span-12 lg:col-span-7">
            <RegistrationGate source={`plan:${p.slug}`} consentText={site.consentText} preview={<div className="relative aspect-[4/3] border border-rule"><Image src={p.image.src} alt="" fill sizes="60vw" className="object-cover" /></div>}>
              <ZoomImage src={p.image.src} alt={p.image.alt} width={p.image.width} height={p.image.height} />
              {p.placeholder && <p className="small mt-3 text-fg-muted">{t("illustrative")}</p>}
              <div className="mt-8 flex flex-wrap items-center gap-6">
                {p.pdf ? (
                  <Button as="a" href={p.pdf} download data-track="brochure_download">{c("downloadPdf")}</Button>
                ) : (
                  <span className="eyebrow text-fg-muted">{c("downloadPdf")} · {c("placeholder")}</span>
                )}
                <ShortlistButton slug={p.slug} label />
              </div>
              {p.keyplan && (
                <div className="mt-12 grid grid-cols-12 gap-x-6">
                  <div className="col-span-12 sm:col-span-5">
                    <Eyebrow>{t("keyplan")}</Eyebrow>
                    <p className="small mt-3 text-fg-muted">{p.tower} · {p.orientation}</p>
                  </div>
                  <div className="relative col-span-12 mt-4 aspect-square overflow-hidden border border-rule bg-bone sm:col-span-7 sm:mt-0">
                    <Image src={p.keyplan.src} alt={p.keyplan.alt} fill sizes="40vw" className="object-contain" />
                    {p.keyplanPosition && (
                      <span aria-hidden className="absolute border-2 border-accent bg-accent/15" style={{ left: `${p.keyplanPosition.x}%`, top: `${p.keyplanPosition.y}%`, width: `${p.keyplanPosition.w}%`, height: `${p.keyplanPosition.h}%` }} />
                    )}
                  </div>
                </div>
              )}
            </RegistrationGate>
          </div>
          <div className="col-span-12 lg:col-span-4 lg:col-start-9">
            <Eyebrow>{t("specs")}</Eyebrow>
            <dl className="mt-6 divide-y divide-rule border-y border-rule">
              {specs.map(([k, v]) => (
                <div key={k} className="flex justify-between gap-6 py-3">
                  <dt className="eyebrow text-fg-muted">{k}</dt>
                  <dd className="tnum text-right">{v}</dd>
                </div>
              ))}
            </dl>
            {p.highlights.length > 0 && (
              <>
                <Eyebrow className="mt-10">{t("highlights")}</Eyebrow>
                <ul className="mt-4 space-y-2 text-fg-muted">{p.highlights.map((h, i) => (<li key={i} className="flex gap-3"><span className="text-accent-ink">—</span>{h}</li>))}</ul>
              </>
            )}
            <p className="small mt-8 text-fg-muted">{c("viewsVary")}</p>
          </div>
        </div>
      </Section>

      <Section tone="alt" id="request">
        <div className="container-x grid grid-cols-12 gap-x-6 gap-y-10">
          <div className="col-span-12 md:col-span-4">
            <Eyebrow>{c("requestPricing")}</Eyebrow>
            <h2 className="display-m mt-4">{t("requestPlan")}</h2>
            <p className="mt-3 text-fg-muted">{p.name} · {col?.name}</p>
          </div>
          <div className="col-span-12 md:col-span-7 md:col-start-6">
            <LeadForm variant="short" source={`plan:${p.slug}`} consentText={site.consentText} bookingUrl={site.bookingUrl} submitLabel={c("requestPricing")} />
          </div>
        </div>
      </Section>

      {similar.length > 0 && (
        <Section className="container-x">
          <Eyebrow>{t("similar")}</Eyebrow>
          <ul className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {similar.map((s) => (<li key={s.slug}><PlanCard plan={s} collectionName={col?.name} /></li>))}
          </ul>
        </Section>
      )}
      <ShortlistBar names={Object.fromEntries(all.map((x) => [x.slug, x.name]))} />
    </main>
  );
}
