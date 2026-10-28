import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Localized } from "@/lib/localize";
import type { SiteSettings } from "@/content/types";
import { telHref, whatsappHref } from "@/lib/utils";
import { Wordmark } from "./Wordmark";
import { primaryNav, secondaryNav, legalNav } from "./nav";
import { LanguageToggle } from "./LanguageToggle";
import { NewsletterForm } from "@/components/forms/NewsletterForm";

export async function Footer({ site }: { site: Localized<SiteSettings> }) {
  const t = await getTranslations("nav");
  const f = await getTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="dark-section" role="contentinfo">
      <div className="container-x pt-20 pb-10 md:pt-28">
        <div className="grid grid-cols-12 gap-x-6 gap-y-12">
          <div className="col-span-12 md:col-span-5 lg:col-span-4">
            <Wordmark className="h-10 w-auto text-dark-fg" />
            <address className="mt-10 flex flex-col gap-1 small text-dark-fg/80 not-italic">
              <span className="mb-2 eyebrow text-dark-accent">{f("salesGallery")}</span>
              <span>{site.salesGalleryName}</span>
              {site.salesGalleryAddress && <span>{site.salesGalleryAddress}</span>}
              {site.phone && (
                <a className="mt-3 w-fit link-underline" href={telHref(site.phone)} data-track="call_click">
                  {site.phone}
                </a>
              )}
              {site.whatsapp && (
                <a
                  className="w-fit link-underline"
                  href={whatsappHref(site.whatsapp)}
                  target="_blank"
                  rel="noopener"
                  data-track="whatsapp_click"
                >
                  WhatsApp
                </a>
              )}
              {site.email && (
                <a className="w-fit link-underline" href={`mailto:${site.email}`}>
                  {site.email}
                </a>
              )}
            </address>
            {site.social.length > 0 && (
              <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2" aria-label={f("follow")}>
                {site.social.map((s) => (
                  <li key={s.label}>
                    <a className="link-underline py-1 eyebrow" href={s.href} target="_blank" rel="noopener">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <nav className="col-span-6 md:col-span-3 lg:col-span-2" aria-label={t("explore")}>
            <h2 className="mb-5 eyebrow text-dark-accent">{t("explore")}</h2>
            <ul className="flex flex-col gap-2">
              {primaryNav.map((i) => (
                <li key={i.key}>
                  <Link href={i.href} className="link-underline small text-dark-fg/85">
                    {t(i.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="col-span-6 md:col-span-4 lg:col-span-3" aria-label={t("company")}>
            <h2 className="mb-5 eyebrow text-dark-accent">{t("company")}</h2>
            <ul className="grid grid-cols-1 gap-2 lg:grid-cols-2">
              {secondaryNav.map((i) => (
                <li key={i.key}>
                  <Link href={i.href} className="link-underline small text-dark-fg/85">
                    {t(i.key)}
                  </Link>
                </li>
              ))}
              <li>
                <a href={site.portalUrl} className="link-underline small text-dark-fg/85" rel="noopener">
                  {t("login")}
                </a>
              </li>
            </ul>
          </nav>

          <div className="col-span-12 lg:col-span-3">
            <h2 className="mb-5 eyebrow text-dark-accent">{f("newsletter")}</h2>
            <p className="small text-dark-fg/75">{f("newsletterText")}</p>
            <NewsletterForm />
            <div className="mt-8">
              <LanguageToggle tone="light" />
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-dark-rule pt-8">
          <p className="text-[11px] leading-relaxed text-dark-fg/65">{site.legalNotice}</p>
          <p className="mt-3 text-[11px] leading-relaxed text-dark-fg/65">{site.renderingNotice}</p>
          <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="flex items-center gap-4 text-dark-fg/70">
              <Image src="/brand/equal-housing.svg" alt="" width={28} height={28} className="opacity-80" unoptimized />
              <span className="text-[11px] tracking-[0.14em] uppercase">{f("equalHousing")}</span>
            </div>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {legalNav.map((i) => (
                <li key={i.key}>
                  <Link
                    href={i.href}
                    className="link-underline text-[11px] tracking-[0.14em] text-dark-fg/70 uppercase"
                  >
                    {t(i.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-6 text-[11px] text-dark-fg/50">
            © {year} ORA World · {site.sponsor} · {f("rights")} · {f("site")}
          </p>
        </div>
      </div>
    </footer>
  );
}
