"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

/** Shows a short note when the visitor arrived via "Get Pricing". */
export function IntentNote() {
  const t = useTranslations("contact");
  const [intent, setIntent] = useState<string | null>(null);
  useEffect(() => {
    const id = window.requestAnimationFrame(() => setIntent(new URLSearchParams(window.location.search).get("intent")));
    return () => window.cancelAnimationFrame(id);
  }, []);
  if (intent !== "pricing") return null;
  return (
    <p className="mt-4 border-l-2 border-accent pl-4 text-fg-muted" role="status">
      {t("intentPricing")}
    </p>
  );
}
