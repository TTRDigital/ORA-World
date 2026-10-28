"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import type { UseFormRegister } from "react-hook-form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { leadSchema, type LeadInput, type LeadVariant } from "@/lib/lead-schema";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

type Props = {
  variant?: LeadVariant;
  source?: string;
  consentText?: string;
  bookingUrl?: string | null;
  tone?: "light" | "dark";
  onSuccess?: () => void;
  submitLabel?: string;
  className?: string;
  residenceOptions?: string[];
};

const field = "w-full border-0 border-b bg-transparent py-3 text-[16px] placeholder:text-current/40 focus:outline-none";

function SelectField({
  id,
  name,
  label,
  options,
  register,
  className,
  placeholder,
  optional,
}: {
  id: string;
  name: keyof LeadInput;
  label: string;
  options: [string, string][];
  register: UseFormRegister<LeadInput>;
  className: string;
  placeholder: string;
  optional: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block eyebrow">
        {label} {optional}
      </label>
      <select id={id} {...register(name)} className={className} defaultValue="">
        <option value="">{placeholder}</option>
        {options.map(([v, lab]) => (
          <option key={v} value={v}>
            {lab}
          </option>
        ))}
      </select>
    </div>
  );
}

/**
 * One lead form, three variants: short (name, email, phone), full (buyer/broker, residence, budget,
 * timeline, source, message) and broker (plus brokerage, license). The gate variant is the short form
 * used to unlock floor plans. Validated with Zod on both sides; honeypot + optional Turnstile.
 */
export function LeadForm({
  variant = "full",
  source,
  consentText,
  bookingUrl,
  tone = "light",
  onSuccess,
  submitLabel,
  className,
  residenceOptions = [],
}: Props) {
  const t = useTranslations("forms");
  const c = useTranslations("common");
  const locale = useLocale() as "en" | "es";
  const pathname = usePathname();
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [role, setRole] = useState<"buyer" | "broker">(variant === "broker" ? "broker" : "buyer");
  const started = useRef(false);
  const turnstileKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const [token, setToken] = useState("");
  const uid = useId();
  const fid = (k: string) => `lf${uid}${k}`;

  const form = useForm<LeadInput>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      variant,
      role,
      locale,
      source: source || pathname,
      company: "",
      consent: undefined as unknown as true,
    },
    mode: "onBlur",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = form;

  // Append ?intent= (e.g. pricing) to the source after mount, without forcing a client-side bailout.
  useEffect(() => {
    const intent = new URLSearchParams(window.location.search).get("intent");
    if (!source && intent) setValue("source", `${pathname}?intent=${intent.slice(0, 40)}`);
  }, [source, pathname, setValue]);

  useEffect(() => {
    setValue("role", role);
    setValue("variant", role === "broker" && variant !== "gate" ? "broker" : variant);
  }, [role, variant, setValue]);

  // Cloudflare Turnstile (invisible/managed). Rendered only when a site key is configured.
  const tsRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!turnstileKey || !tsRef.current) return;
    const w = window as unknown as { turnstile?: { render: (el: HTMLElement, o: Record<string, unknown>) => string } };
    const render = () =>
      w.turnstile?.render(tsRef.current!, {
        sitekey: turnstileKey,
        size: "flexible",
        theme: tone === "dark" ? "dark" : "light",
        callback: (tk: string) => setToken(tk),
        "expired-callback": () => setToken(""),
      });
    if (w.turnstile) render();
    else {
      const s = document.createElement("script");
      s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      s.async = true;
      s.onload = render;
      document.head.appendChild(s);
    }
  }, [turnstileKey, tone]);

  async function onSubmit(values: LeadInput) {
    setState("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, turnstileToken: token }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setState("done");
      track("form_submit", { variant: values.variant, role: values.role, locale, source: values.source });
      onSuccess?.();
    } catch {
      setState("error");
    }
  }

  const dark = tone === "dark";
  const ring = dark ? "border-dark-rule focus:border-dark-accent" : "border-rule-strong focus:border-accent";
  const label = cn("eyebrow mb-1 block", dark ? "text-dark-fg/80" : "text-fg-muted");
  const opt = <span className={dark ? "text-dark-muted" : "text-fg-muted"}>({t("optional")})</span>;
  const err = (k: keyof LeadInput) =>
    errors[k] && (
      <p className="mt-1 small text-[#b9442f]" role="alert">
        {errors[k]?.message?.toString().startsWith("Invalid") || errors[k]?.type === "invalid_type"
          ? k === "email"
            ? t("invalidEmail")
            : k === "phone"
              ? t("invalidPhone")
              : k === "consent"
                ? t("consentRequired")
                : t("required")
          : errors[k]?.message?.toString() || t("required")}
      </p>
    );
  if (state === "done") {
    return (
      <div
        className={cn("border p-8 md:p-10", dark ? "border-dark-rule" : "border-rule", className)}
        role="status"
        aria-live="polite"
      >
        <p className={cn("eyebrow", dark ? "text-dark-accent" : "text-accent-ink")}>{t("successTitle")}</p>
        <h3 className="mt-4 display-m">{t("successTitle")}.</h3>
        <p className={cn("mt-4 max-w-[48ch]", dark ? "text-dark-fg/80" : "text-fg-muted")}>{t("successText")}</p>
        <div className="mt-8 flex flex-wrap gap-4">
          {bookingUrl ? (
            <Button
              as="a"
              href={bookingUrl}
              target="_blank"
              rel="noopener"
              variant={dark ? "light" : "primary"}
              onClick={() => track("booking_click", { source: "lead_success" })}
            >
              {t("successBook")}
            </Button>
          ) : (
            <Button as={Link} href={{ pathname: "/contact", hash: "book" }} variant={dark ? "light" : "primary"}>
              {t("successBook")}
            </Button>
          )}
          <Button
            variant="text"
            onClick={() => {
              reset();
              setState("idle");
            }}
          >
            {t("successAnother")}
          </Button>
        </div>
      </div>
    );
  }

  const showFull = variant === "full" || variant === "broker";
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className={cn("grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2", className)}
      onFocus={() => {
        if (!started.current) {
          started.current = true;
          track("form_start", { variant, locale });
        }
      }}
    >
      <input type="hidden" {...register("variant")} />
      <input type="hidden" {...register("locale")} />
      <input type="hidden" {...register("source")} />
      <input type="hidden" {...register("role")} />
      <div className="hidden" aria-hidden="true">
        <label>
          Company <input tabIndex={-1} autoComplete="off" {...register("company")} />
        </label>
      </div>

      {variant !== "gate" && (
        <fieldset className="md:col-span-2">
          <legend className={label}>{t("iAm")}</legend>
          <div className="mt-2 flex gap-6">
            {(["buyer", "broker"] as const).map((r) => (
              <label key={r} className="flex cursor-pointer items-center gap-3">
                <input
                  type="radio"
                  name="role-toggle"
                  checked={role === r}
                  onChange={() => setRole(r)}
                  className="sr-only"
                />
                <span
                  aria-hidden
                  className={cn(
                    "flex h-4 w-4 items-center justify-center border",
                    role === r
                      ? dark
                        ? "border-dark-accent"
                        : "border-accent"
                      : dark
                        ? "border-dark-rule"
                        : "border-rule-strong",
                  )}
                >
                  {role === r && <span className={cn("h-2 w-2", dark ? "bg-dark-accent" : "bg-accent")} />}
                </span>
                <span className="eyebrow">{t(r)}</span>
              </label>
            ))}
          </div>
        </fieldset>
      )}

      <div>
        <label htmlFor={fid("name")} className={label}>
          {t("name")}
        </label>
        <input
          id={fid("name")}
          autoComplete="name"
          {...register("name")}
          className={cn(field, ring)}
          aria-invalid={!!errors.name}
        />
        {err("name")}
      </div>
      <div>
        <label htmlFor={fid("email")} className={label}>
          {t("email")}
        </label>
        <input
          id={fid("email")}
          type="email"
          inputMode="email"
          autoComplete="email"
          {...register("email")}
          className={cn(field, ring)}
          aria-invalid={!!errors.email}
        />
        {err("email")}
      </div>
      <div>
        <label htmlFor={fid("phone")} className={label}>
          {t("phone")}
        </label>
        <input
          id={fid("phone")}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          {...register("phone")}
          className={cn(field, ring)}
          aria-invalid={!!errors.phone}
        />
        {err("phone")}
      </div>
      {showFull && (
        <div>
          <label htmlFor={fid("country")} className={label}>
            {t("country")} {opt}
          </label>
          <input id={fid("country")} autoComplete="country-name" {...register("country")} className={cn(field, ring)} />
        </div>
      )}
      {showFull && role === "broker" && (
        <>
          <div>
            <label htmlFor={fid("brokerage")} className={label}>
              {t("brokerage")}
            </label>
            <input
              id={fid("brokerage")}
              autoComplete="organization"
              {...register("brokerage")}
              className={cn(field, ring)}
            />
          </div>
          <div>
            <label htmlFor={fid("license")} className={label}>
              {t("license")}
            </label>
            <input id={fid("license")} {...register("license")} className={cn(field, ring)} />
          </div>
        </>
      )}
      {showFull && (
        <>
          {residenceOptions.length > 0 && (
            <SelectField
              id={fid("residenceType")}
              name="residenceType"
              label={t("residenceType")}
              options={residenceOptions.map((o) => [o, o])}
              register={register}
              className={cn(field, ring, "cursor-pointer appearance-none")}
              placeholder={t("selectOne")}
              optional={opt}
            />
          )}
          <SelectField
            id={fid("budget")}
            name="budget"
            register={register}
            className={cn(field, ring, "cursor-pointer appearance-none")}
            placeholder={t("selectOne")}
            optional={opt}
            label={t("budget")}
            options={[
              ["b1", t("budgetOptions.b1")],
              ["b2", t("budgetOptions.b2")],
              ["b3", t("budgetOptions.b3")],
              ["b4", t("budgetOptions.b4")],
              ["undisclosed", t("budgetOptions.undisclosed")],
            ]}
          />
          <SelectField
            id={fid("timeline")}
            name="timeline"
            register={register}
            className={cn(field, ring, "cursor-pointer appearance-none")}
            placeholder={t("selectOne")}
            optional={opt}
            label={t("timeline")}
            options={[
              ["now", t("timelineOptions.now")],
              ["soon", t("timelineOptions.soon")],
              ["later", t("timelineOptions.later")],
              ["exploring", t("timelineOptions.exploring")],
            ]}
          />
          <SelectField
            id={fid("heardAbout")}
            name="heardAbout"
            register={register}
            className={cn(field, ring, "cursor-pointer appearance-none")}
            placeholder={t("selectOne")}
            optional={opt}
            label={t("heardAbout")}
            options={[
              ["search", t("heardOptions.search")],
              ["magazine", t("heardOptions.magazine")],
              ["advertisement", t("heardOptions.advertisement")],
              ["ambassador", t("heardOptions.ambassador")],
              ["broker", t("heardOptions.broker")],
              ["social", t("heardOptions.social")],
              ["referral", t("heardOptions.referral")],
              ["other", t("heardOptions.other")],
            ]}
          />
          <div className="md:col-span-2">
            <label htmlFor={fid("message")} className={label}>
              {t("message")} {opt}
            </label>
            <textarea id={fid("message")} rows={3} {...register("message")} className={cn(field, ring, "resize-y")} />
          </div>
        </>
      )}

      <div className="md:col-span-2">
        <label className="flex cursor-pointer items-start gap-3">
          <input type="checkbox" {...register("consent")} className="peer sr-only" aria-invalid={!!errors.consent} />
          <span
            aria-hidden
            className={cn(
              "mt-1 flex h-4 w-4 shrink-0 items-center justify-center border transition-colors",
              dark
                ? "border-dark-rule peer-checked:border-dark-accent peer-checked:bg-dark-accent"
                : "border-rule-strong peer-checked:border-accent peer-checked:bg-accent",
            )}
          />
          <span className={cn("small", dark ? "text-dark-fg/80" : "text-fg-muted")}>
            {consentText ??
              t.rich("consent", {
                privacy: () => (
                  <Link href="/privacy" className="underline">
                    {t("privacyPolicy")}
                  </Link>
                ),
              })}
          </span>
        </label>
        {err("consent")}
      </div>
      {turnstileKey && <div ref={tsRef} className="md:col-span-2" />}
      <div className="flex flex-wrap items-center gap-6 md:col-span-2">
        <Button
          type="submit"
          variant={dark ? "light" : "primary"}
          disabled={state === "sending"}
          className="disabled:opacity-60"
        >
          {state === "sending" ? t("sending") : (submitLabel ?? t("submit"))}
        </Button>
        {state === "error" && (
          <p className="small text-[#e0785f]" role="alert">
            {t("errorTitle")}. {t("errorText")}
          </p>
        )}
      </div>
      <p className={cn("small md:col-span-2", dark ? "text-dark-fg/50" : "text-fg-muted")}>{c("viewsVary")}</p>
    </form>
  );
}
