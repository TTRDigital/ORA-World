"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import type { Localized } from "@/lib/localize";
import type { SiteSettings } from "@/content/types";
import { cn, telHref, whatsappHref } from "@/lib/utils";
import { track } from "@/lib/analytics";

/**
 * Call · Get Pricing · WhatsApp. Full-width bar on mobile after the first viewport,
 * compact pill bottom-right on desktop. Hidden on the contact page and inside the Studio.
 */
export function FloatingBar({ site }: { site: Localized<SiteSettings> }) {
  const t = useTranslations("bar");
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  if (pathname.startsWith("/contact")) return null;
  const call = telHref(site.phone);
  const wa = whatsappHref(site.whatsapp, "Hello ORA World, I would like to learn more about the residences.");

  const item = "eyebrow flex flex-1 items-center justify-center gap-2 px-4 py-4 transition-colors md:flex-none md:px-5 md:py-3";

  return (
    <div
      aria-label="Quick actions"
      className={cn(
        "fixed inset-x-0 bottom-0 z-30 flex border-t border-rule bg-bg/95 text-fg backdrop-blur-sm transition-[transform,opacity] duration-700 ease-[var(--ease-out-expo)] md:inset-x-auto md:right-6 md:bottom-6 md:rounded-full md:border md:shadow-none",
        visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 md:translate-y-4",
      )}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      {call ? (
        <a href={call} className={cn(item, "hover:text-accent-ink")} onClick={() => track("call_click", { source: "floating_bar" })}>
          {t("call")}
        </a>
      ) : null}
      <Link
        href={{ pathname: "/contact", query: { intent: "pricing" } }}
        className={cn(item, "bg-accent text-white hover:bg-accent-ink md:mx-0 md:rounded-full")}
      >
        {t("pricing")}
      </Link>
      {wa ? (
        <a href={wa} target="_blank" rel="noopener" className={cn(item, "hover:text-accent-ink")} onClick={() => track("whatsapp_click", { source: "floating_bar" })}>
          {t("whatsapp")}
        </a>
      ) : null}
    </div>
  );
}
