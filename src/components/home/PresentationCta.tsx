import type { HomeContent, SiteSettings } from "@/content/types";
import type { Localized } from "@/lib/localize";
import { Accent } from "@/components/ui/Accent";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { LeadFormLazy as LeadForm } from "@/components/forms/LeadFormLazy";
import { telHref, whatsappHref } from "@/lib/utils";

export function PresentationCta({
  block,
  site,
  residenceOptions,
}: {
  block: Localized<HomeContent["cta"]>;
  site: Localized<SiteSettings>;
  residenceOptions: string[];
}) {
  return (
    <section id="inquire" className="py-section dark-section" aria-labelledby="cta-title">
      <div className="container-x grid grid-cols-12 gap-x-6 gap-y-12">
        <div className="col-span-12 lg:col-span-5">
          <Eyebrow className="text-dark-accent">{block.eyebrow}</Eyebrow>
          <h2 id="cta-title" className="mt-6 display-l" data-reveal>
            <Accent text={block.title} className="text-dark-accent" />
          </h2>
          <p className="mt-6 max-w-[40ch] lead text-dark-fg/80" data-reveal>
            {block.text}
          </p>
          <dl className="mt-10 space-y-2 small text-dark-fg/70">
            {site.phone && (
              <div>
                <dt className="sr-only">Phone</dt>
                <dd>
                  <a className="link-underline" href={telHref(site.phone)}>
                    {site.phone}
                  </a>
                </dd>
              </div>
            )}
            {site.whatsapp && (
              <div>
                <dt className="sr-only">WhatsApp</dt>
                <dd>
                  <a className="link-underline" href={whatsappHref(site.whatsapp)} target="_blank" rel="noopener">
                    WhatsApp
                  </a>
                </dd>
              </div>
            )}
            {site.email && (
              <div>
                <dt className="sr-only">Email</dt>
                <dd>
                  <a className="link-underline" href={`mailto:${site.email}`}>
                    {site.email}
                  </a>
                </dd>
              </div>
            )}
            <div>
              <dt className="sr-only">Address</dt>
              <dd>{site.salesGalleryAddress}</dd>
            </div>
          </dl>
        </div>
        <div className="col-span-12 lg:col-span-6 lg:col-start-7">
          <LeadForm
            variant="full"
            tone="dark"
            consentText={site.consentText}
            bookingUrl={site.bookingUrl}
            residenceOptions={residenceOptions}
            source="home:cta"
          />
        </div>
      </div>
    </section>
  );
}
