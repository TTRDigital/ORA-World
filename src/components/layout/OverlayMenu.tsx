"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Localized } from "@/lib/localize";
import type { SiteSettings } from "@/content/types";
import { cn, telHref, whatsappHref } from "@/lib/utils";
import { primaryNav, secondaryNav } from "./nav";
import { LanguageToggle } from "./LanguageToggle";
import { lockScroll } from "@/lib/scroll-lock";

type Props = { open: boolean; onClose: () => void; site: Localized<SiteSettings> };

/** Full-screen overlay menu: large serif links, image that changes on hover, focus trapped. */
export function OverlayMenu({ open, onClose, site }: Props) {
  const t = useTranslations("nav");
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string>(primaryNav[0].image);
  const [mounted, setMounted] = useState(open);

  useEffect(() => {
    if (open) setMounted(true);
    const unlock = lockScroll(open);
    return unlock;
  }, [open]);

  const onKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && ref.current) {
        const f = ref.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])');
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (!open) return;
    document.addEventListener("keydown", onKey);
    const first = ref.current?.querySelector<HTMLElement>("a[href]");
    const id = window.setTimeout(() => first?.focus(), 350);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.clearTimeout(id);
    };
  }, [open, onKey]);

  const image = site.menuImages[active] ?? Object.values(site.menuImages)[0];

  return (
    <div
      id="overlay-menu"
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label={t("menu")}
      aria-hidden={!open}
      onTransitionEnd={() => !open && setMounted(false)}
      className={cn(
        "dark-section fixed inset-0 z-40 flex flex-col transition-[clip-path,visibility] duration-[900ms] ease-[var(--ease-in-out-quart)]",
        open ? "visible [clip-path:inset(0_0_0_0)]" : "invisible [clip-path:inset(0_0_100%_0)]",
      )}
      inert={!open ? true : undefined}
    >
      {mounted && (
        <div className="container-x grid flex-1 grid-cols-12 gap-x-6 pt-[calc(var(--header-h)+2rem)] pb-10 md:pb-16">
          <nav aria-label="Menu" className="col-span-12 flex flex-col md:col-span-6 lg:col-span-5">
            <ul className="flex flex-col">
              {primaryNav.map((item, i) => (
                <li key={item.key} className="overflow-hidden border-b border-dark-rule">
                  <Link
                    href={item.href}
                    onClick={onClose}
                    onMouseEnter={() => setActive(item.image)}
                    onFocus={() => setActive(item.image)}
                    className={cn(
                      "group flex items-baseline gap-5 py-3 transition-transform duration-[900ms] ease-[var(--ease-out-expo)] md:py-4",
                      open ? "translate-y-0" : "translate-y-full",
                    )}
                    style={{ transitionDelay: open ? `${120 + i * 60}ms` : "0ms" }}
                  >
                    <span className="eyebrow tnum w-8 text-dark-accent opacity-70">0{i + 1}</span>
                    <span className="display-m transition-colors group-hover:text-dark-accent">{t(item.key)}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3 md:mt-10">
              {secondaryNav.map((item) => (
                <li key={item.key}>
                  <Link href={item.href} onClick={onClose} className="small link-underline text-dark-fg/80 hover:text-dark-fg">
                    {t(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="relative col-span-6 hidden md:col-start-7 md:block lg:col-start-7">
            <div className="relative aspect-[4/5] w-full overflow-hidden md:absolute md:inset-x-0 md:top-0 md:h-[calc(100%-5rem)]">
              {image ? (
                <Image
                  key={image.src}
                  src={image.src}
                  alt=""
                  fill
                  sizes="50vw"
                  className="animate-[menufade_1.2s_var(--ease-out-expo)] object-cover"
                  priority={false}
                />
              ) : (
                <div className="h-full w-full bg-surface" />
              )}
              <div className="scrim-bottom absolute inset-0" />
              {image?.caption && <p className="small absolute bottom-4 left-4 text-white/80">{image.caption}</p>}
            </div>
          </div>

          <div className="col-span-12 mt-8 flex flex-wrap items-end justify-between gap-6 border-t border-dark-rule pt-6 md:col-span-6 md:col-start-7 md:self-end md:border-0 md:pt-0">
            <div className="small flex flex-col gap-1 text-dark-fg/80">
              {site.phone && (
                <a className="link-underline" href={telHref(site.phone)}>
                  {site.phone}
                </a>
              )}
              {site.whatsapp && (
                <a className="link-underline" href={whatsappHref(site.whatsapp)} target="_blank" rel="noopener">
                  WhatsApp
                </a>
              )}
              {site.email && (
                <a className="link-underline" href={`mailto:${site.email}`}>
                  {site.email}
                </a>
              )}
              <span className="text-dark-muted">{site.salesGalleryAddress}</span>
            </div>
            <div className="flex items-center gap-6">
              <a href={site.portalUrl} className="eyebrow link-underline" rel="noopener">
                {t("login")}
              </a>
              <LanguageToggle tone="light" />
            </div>
          </div>
        </div>
      )}
      <style>{`@keyframes menufade{from{opacity:0;transform:scale(1.04)}to{opacity:1;transform:scale(1)}}`}</style>
    </div>
  );
}
