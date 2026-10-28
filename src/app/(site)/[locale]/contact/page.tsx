import { getTranslations } from "next-intl/server";
import { localeOf, pageMetaFromMessages } from "@/lib/page";
import { getCollections, getSiteSettings } from "@/lib/content";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { LeadForm } from "@/components/forms/LeadForm";
import { BookingEmbed } from "@/components/ui/BookingEmbed";
import { LocationMap } from "@/components/map/LocationMap";
import { telHref, whatsappHref } from "@/lib/utils";
import { JsonLd, breadcrumbLd, organizationLd } from "@/lib/seo";
import { IntentNote } from "@/components/forms/IntentNote";

export const generateMetadata = ({ params }: PageProps<"/[locale]/contact">) =>
  pageMetaFromMessages(params, "contact", "/contact");

export default async function ContactPage({ params }: PageProps<"/[locale]/contact">) {
  const locale = await localeOf(params);
  const [t, h, n, site, collections] = await Promise.all([
    getTranslations("pages.contact"),
    getTranslations("home"),
    getTranslations("nav"),
    getSiteSettings(locale),
    getCollections(locale),
  ]);
  const ct = await getTranslations("contact");
  return (
    <main id="main">
      <JsonLd
        data={[
          breadcrumbLd(locale, [
            { name: n("home"), path: "" },
            { name: n("contact"), path: "/contact" },
          ]),
          organizationLd(),
        ]}
      />
      <PageHero eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} />
      <Section className="container-x">
        <div className="grid grid-cols-12 gap-x-6 gap-y-12">
          <aside className="col-span-12 md:col-span-4">
            <Eyebrow>{t("visit")}</Eyebrow>
            <address className="mt-6 not-italic">
              <p className="display-s">{site.salesGalleryName}</p>
              <p className="mt-2 text-fg-muted">{site.salesGalleryAddress}</p>
              {site.hours && <p className="mt-2 small text-fg-muted">{site.hours}</p>}
              <ul className="mt-6 space-y-2 small">
                {site.phone && (
                  <li>
                    <a className="link-underline" href={telHref(site.phone)} data-track="call_click">
                      {site.phone}
                    </a>
                  </li>
                )}
                {site.whatsapp && (
                  <li>
                    <a
                      className="link-underline"
                      href={whatsappHref(site.whatsapp)}
                      target="_blank"
                      rel="noopener"
                      data-track="whatsapp_click"
                    >
                      WhatsApp
                    </a>
                  </li>
                )}
                {site.email && (
                  <li>
                    <a className="link-underline" href={`mailto:${site.email}`}>
                      {site.email}
                    </a>
                  </li>
                )}
                <li>
                  <a
                    className="link-underline"
                    href={`https://www.google.com/maps/search/?api=1&query=${site.siteLat},${site.siteLng}`}
                    target="_blank"
                    rel="noopener"
                  >
                    {ct("directions")}
                  </a>
                </li>
              </ul>
            </address>
          </aside>
          <div className="col-span-12 md:col-span-7 md:col-start-6">
            <Eyebrow>{t("form")}</Eyebrow>
            <IntentNote />
            <LeadForm
              className="mt-8"
              variant="full"
              source="contact"
              consentText={site.consentText}
              bookingUrl={site.bookingUrl}
              residenceOptions={collections.map((c) => c.name)}
            />
          </div>
        </div>
      </Section>
      <Section tone="alt" id="book" className="scroll-mt-24">
        <div className="container-x grid grid-cols-12 gap-x-6 gap-y-10">
          <div className="col-span-12 md:col-span-4">
            <Eyebrow>{t("book")}</Eyebrow>
            <h2 className="mt-4 display-m">{ct("bookTitle")}</h2>
          </div>
          <div className="col-span-12 md:col-span-7 md:col-start-6">
            <BookingEmbed url={site.bookingUrl} consentText={site.consentText} />
          </div>
        </div>
      </Section>
      <Section className="container-x">
        <LocationMap pois={[]} site={{ lat: site.siteLat, lng: site.siteLng, label: h("theSite") }} compact />
      </Section>
    </main>
  );
}
