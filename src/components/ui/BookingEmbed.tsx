"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { LeadForm } from "@/components/forms/LeadForm";
import { track } from "@/lib/analytics";

/** Calendly / Cal.com embed (URL from CMS) loaded on demand, with a request form as the fallback. */
export function BookingEmbed({ url, consentText }: { url: string | null; consentText?: string }) {
  const t = useTranslations("contact");
  const locale = useLocale();
  const host = useRef<HTMLDivElement>(null);
  const [load, setLoad] = useState(false);
  useEffect(() => {
    if (!url || !host.current) return;
    const io = new IntersectionObserver((e) => e.some((x) => x.isIntersecting) && (setLoad(true), io.disconnect()), { rootMargin: "300px" });
    io.observe(host.current);
    return () => io.disconnect();
  }, [url]);
  if (!url) {
    return (
      <div>
        <p className="mb-8 max-w-[52ch] text-fg-muted">{t("bookingFallback")}</p>
        <LeadForm variant="full" source="contact:booking" consentText={consentText} submitLabel={t("requestSlot")} />
      </div>
    );
  }
  const src = `${url}${url.includes("?") ? "&" : "?"}hide_gdpr_banner=1&background_color=f7f3ec&text_color=2a2825&primary_color=a8864f&locale=${locale}`;
  return (
    <div ref={host} className="border border-rule bg-bone" onClick={() => track("booking_click", { source: "contact:embed" })}>
      {load ? <iframe src={src} title={t("bookTitle")} className="h-[720px] w-full" loading="lazy" /> : <div className="h-[720px] animate-pulse bg-surface" />}
    </div>
  );
}
