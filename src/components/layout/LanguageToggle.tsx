"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export function LanguageToggle({ className, tone = "inherit" }: { className?: string; tone?: "inherit" | "light" }) {
  const locale = useLocale();
  const t = useTranslations("nav");
  const pathname = usePathname();
  const router = useRouter();

  function switchTo(next: (typeof routing.locales)[number]) {
    if (next === locale) return;
    router.replace(pathname, { locale: next });
  }

  return (
    <div
      role="group"
      aria-label={t("language")}
      className={cn("inline-flex items-center gap-3 eyebrow", tone === "light" && "text-white", className)}
    >
      {routing.locales.map((l, i) => (
        <span key={l} className="inline-flex items-center gap-3">
          {i > 0 && <span aria-hidden className="h-3 w-px bg-current opacity-40" />}
          <button
            type="button"
            onClick={() => switchTo(l)}
            aria-pressed={l === locale}
            lang={l}
            className={cn(
              "cursor-pointer link-underline py-1 transition-opacity",
              l === locale ? "opacity-100" : "opacity-55 hover:opacity-100",
            )}
          >
            {l.toUpperCase()}
            <span className="sr-only"> — {l === "en" ? t("english") : t("spanish")}</span>
          </button>
        </span>
      ))}
    </div>
  );
}
