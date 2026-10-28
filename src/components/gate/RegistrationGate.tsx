"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { isRegistered, setRegistered } from "@/lib/registration";
import { LeadFormLazy as LeadForm } from "@/components/forms/LeadFormLazy";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  preview?: ReactNode;
  source?: string;
  consentText?: string;
  className?: string;
  inline?: boolean;
};

/**
 * Gated content. Unregistered visitors see a blurred preview and the one-step registration form;
 * registering once (cookie) unlocks every gated asset on the site.
 */
export function RegistrationGate({ children, preview, source = "gate", consentText, className }: Props) {
  const t = useTranslations("forms");
  const [state, setState] = useState<"unknown" | "locked" | "open">("unknown");

  useEffect(() => {
    const id = window.requestAnimationFrame(() => setState(isRegistered() ? "open" : "locked"));
    const on = () => setState("open");
    window.addEventListener("ora:registered", on);
    return () => {
      window.cancelAnimationFrame(id);
      window.removeEventListener("ora:registered", on);
    };
  }, []);

  if (state === "open") return <>{children}</>;

  const locked = state === "locked";
  return (
    <div className={cn("relative", className)} aria-busy={!locked || undefined}>
      {preview ? (
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none opacity-60 blur-md select-none",
            locked && "[mask-image:linear-gradient(to_bottom,black,transparent_85%)]",
          )}
        >
          {preview}
        </div>
      ) : (
        !locked && <div className="min-h-[20rem] animate-pulse bg-surface" />
      )}
      {locked && (
        <div
          className={cn(
            "bg-bg",
            preview
              ? "absolute inset-x-0 top-10 mx-auto max-w-2xl border border-rule p-8 md:p-10"
              : "border border-rule p-8 md:p-10",
          )}
        >
          <p className="flex items-center gap-3 eyebrow text-accent-ink">
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
          <p className="mt-4 small text-fg-muted">{t("gateFooter")}</p>
        </div>
      )}
    </div>
  );
}

export function LockGlyph({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 14 14"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      aria-hidden="true"
    >
      <rect x="2.5" y="6" width="9" height="6.5" />
      <path d="M4.5 6V4.2a2.5 2.5 0 0 1 5 0V6" />
    </svg>
  );
}
