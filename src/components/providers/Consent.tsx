"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const KEY = "ora_consent"; // "granted" | "denied"
type Choice = "granted" | "denied";

declare global {
  interface Window {
    __oraConsent?: Choice;
  }
}

function gtag(...args: unknown[]) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(args);
}

/**
 * Consent Mode v2: defaults to denied, loads GTM/GA4 only after consent is granted,
 * and updates consent state without a reload. EN/ES copy from messages.
 */
export function Consent() {
  const t = useTranslations("consent");
  const [choice, setChoice] = useState<Choice | null | "unknown">("unknown");
  const gtm = process.env.NEXT_PUBLIC_GTM_ID;
  const ga = process.env.NEXT_PUBLIC_GA4_ID;

  useEffect(() => {
    gtag("consent", "default", { ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied", analytics_storage: "denied", functionality_storage: "granted", security_storage: "granted", wait_for_update: 500 });
    let stored: Choice | null = null;
    try {
      stored = localStorage.getItem(KEY) as Choice | null;
    } catch {}
    setChoice(stored);
    if (stored === "granted") grant();
  }, []);

  function loadTags() {
    if (!gtm && !ga) return;
    if (document.getElementById("ora-tags")) return;
    const s = document.createElement("script");
    s.id = "ora-tags";
    s.async = true;
    if (gtm) {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
      s.src = `https://www.googletagmanager.com/gtm.js?id=${gtm}`;
    } else if (ga) {
      s.src = `https://www.googletagmanager.com/gtag/js?id=${ga}`;
      s.onload = () => {
        gtag("js", new Date());
        gtag("config", ga, { anonymize_ip: true });
      };
    }
    document.head.appendChild(s);
  }

  function grant() {
    gtag("consent", "update", { ad_storage: "granted", ad_user_data: "granted", ad_personalization: "granted", analytics_storage: "granted" });
    window.__oraConsent = "granted";
    loadTags();
  }

  function decide(c: Choice) {
    try {
      localStorage.setItem(KEY, c);
    } catch {}
    setChoice(c);
    if (c === "granted") grant();
    else gtag("consent", "update", { ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied", analytics_storage: "denied" });
  }

  if (choice !== null) return null;

  return (
    <div role="dialog" aria-label={t("title")} aria-live="polite" className={cn("fixed inset-x-4 bottom-4 z-40 border border-rule bg-bg p-5 text-fg md:inset-x-auto md:left-6 md:bottom-6 md:max-w-sm")}>
      <p className="eyebrow text-accent-ink">{t("title")}</p>
      <p className="small mt-3 text-fg-muted">
        {t("text")} <Link href="/privacy" className="underline">Privacy</Link>
      </p>
      <div className="mt-5 flex flex-wrap gap-3">
        <button type="button" onClick={() => decide("granted")} className="eyebrow cursor-pointer border border-accent px-4 py-3 text-accent-ink hover:bg-accent hover:text-white">
          {t("accept")}
        </button>
        <button type="button" onClick={() => decide("denied")} className="eyebrow cursor-pointer px-4 py-3 text-fg-muted hover:text-fg">
          {t("reject")}
        </button>
      </div>
    </div>
  );
}
