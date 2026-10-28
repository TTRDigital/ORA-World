"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { track } from "@/lib/analytics";

export function NewsletterForm() {
  const t = useTranslations("footer");
  const c = useTranslations("common");
  const locale = useLocale();
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const hp = (form.elements.namedItem("company") as HTMLInputElement).value;
    setState("sending");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, company: hp, locale }),
      });
      if (!res.ok) throw new Error("failed");
      setState("done");
      track("newsletter_subscribe", { locale });
    } catch {
      setState("error");
    }
  }

  if (state === "done")
    return (
      <p className="mt-5 small text-dark-accent" role="status">
        {t("subscribed")}
      </p>
    );

  return (
    <form
      onSubmit={onSubmit}
      className="mt-5 flex border-b border-dark-rule focus-within:border-dark-accent"
      noValidate
    >
      <label className="sr-only" htmlFor="newsletter-email">
        {t("newsletterPlaceholder")}
      </label>
      <input
        id="newsletter-email"
        name="email"
        type="email"
        required
        autoComplete="email"
        placeholder={t("newsletterPlaceholder")}
        className="min-w-0 flex-1 bg-transparent py-3 small text-dark-fg placeholder:text-dark-fg/45 focus:outline-none"
      />
      <input name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      <button
        type="submit"
        disabled={state === "sending"}
        className="cursor-pointer py-3 pl-4 eyebrow text-dark-accent disabled:opacity-50"
      >
        {state === "sending" ? c("loading") : t("subscribe")}
      </button>
      {state === "error" && (
        <p className="sr-only small" role="alert">
          {c("error")}
        </p>
      )}
    </form>
  );
}
