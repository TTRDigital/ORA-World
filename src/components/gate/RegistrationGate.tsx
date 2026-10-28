"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { isRegistered, setRegistered } from "@/lib/registration";
import { LeadForm } from "@/components/forms/LeadForm";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type Props = { children: ReactNode; preview?: ReactNode; source?: string; consentText?: string; className?: string; inline?: boolean };

/**
 * Gated content. Unregistered visitors see a blurred preview and the one-step registration form;
 * registering once (cookie) unlocks every gated asset on the site.
 */
export function RegistrationGate({ children, preview, source = "gate", consentText, className, inline }: Props) {
  const t = useTranslations("forms");
  const [state, setState] = useState<"unknown" | "locked" | "open">("unknown");

  useEffect(() => {
    setState(isRegistered() ? "open" : "locked");
    const on = () => setState("open");
    window.addEventListener("ora:registered", on);
    return () => window.removeEventListener("ora:registered", on);
  }, []);

  if (state === "open") return <>{children}</>;
  if (state === "unknown") return <div className={cn("min-h-[20rem] animate-pulse bg-surface", className)} aria-busy="true" />;

  return (
    <div className={cn("relative", className)}>
      {preview && (
        <div aria-hidden="true" className="pointer-events-none select-none blur-md opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]">
          {preview}
        </div>
      )}
      <div className={cn("bg-bg", preview ? "absolute inset-x-0 top-10 mx-auto max-w-2xl border border-rule p-8 md:p-10" : inline ? "border border-rule p-8 md:p-10" : "border border-rule p-8 md:p-10")}>
        <p className="eyebrow flex items-center gap-3 text-accent-ink">
          <LockGlyph /> {t("gateTitle")}
        </p>
        <p className="mt-4 max-w-[52ch] text-fg-muted">{t("gateText")}</p>
        <LeadForm
          variant="gate"
          source={source}
          consentText={consentText}
          submitLabel={t("gateSubmit")}
          className="mt-8"
          onSuccess={() => {
            setRegistered();
            track("gate_unlock", { source });
          }}
        />
        <p className="small mt-4 text-fg-muted">{t("gateFooter")}</p>
      </div>
    </div>
  );
}

export function LockGlyph({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 14 14" className={className} fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
      <rect x="2.5" y="6" width="9" height="6.5" />
      <path d="M4.5 6V4.2a2.5 2.5 0 0 1 5 0V6" />
    </svg>
  );
}
