import type { HomeContent, SiteSettings } from "@/content/types";
import type { Localized } from "@/lib/localize";
import { Accent } from "@/components/ui/Accent";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { LeadForm } from "@/components/forms/LeadForm";
import { telHref, whatsappHref } from "@/lib/utils";

export function PresentationCta({ block, site, residenceOptions }: { block: Localized<HomeContent["cta"]>; site: Localized<SiteSettings>; residenceOptions: string[] }) {
  return (
    <section id="inquire" className="dark-section py-section" aria-labelledby="cta-title">
      <div className="container-x grid grid-cols-12 gap-x-6 gap-y-12">
        <div className="col-span-12 lg:col-span-5">
          <Eyebrow className="text-dark-accent">{block.eyebrow}</Eyebrow>
          <h2 id="cta-title" className="display-l mt-6" data-reveal>
            <Accent text={block.title} className="text-dark-accent" />
          </h2>
          <p className="lead mt-6 max-w-[40ch] text-dark-fg/80" data-reveal>
            {block.text}
          </p>
          <dl className="small mt-10 space-y-2 text-dark-fg/70">
            {site.phone && <div><dt className="sr-only">Phone</dt><dd><a className="link-underline" href={telHref(site.phone)}>{site.phone}</a></dd></div>}
            {site.whatsapp && <div><dt className="sr-only">WhatsApp</dt><dd><a className="link-underline" href={whatsappHref(site.whatsapp)} target="_blank" rel="noopener">WhatsApp</a></dd></div>}
            {site.email && <div><dt className="sr-only">Email</dt><dd><a className="link-underline" href={`mailto:${site.email}`}>{site.email}</a></dd></div>}
            <div><dt className="sr-only">Address</dt><dd>{site.salesGalleryAddress}</dd></div>
          </dl>
        </div>
        <div className="col-span-12 lg:col-span-6 lg:col-start-7">
          <LeadForm variant="full" tone="dark" consentText={site.consentText} bookingUrl={site.bookingUrl} residenceOptions={residenceOptions} source="home:cta" />
        </div>
      </div>
    </section>
  );
}
