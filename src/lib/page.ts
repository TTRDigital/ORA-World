import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/content/types";
import { pageMetadata } from "./seo";

export const plain = (s: string) => s.replace(/\*/g, "");

/** Resolve the locale param and mark the request for static rendering. */
export async function localeOf(params: Promise<{ locale: string }>): Promise<Locale> {
  const { locale } = await params;
  setRequestLocale(locale);
  return locale as Locale;
}

/** Metadata for pages whose eyebrow/title/intro live in messages.pages.<ns>. */
export async function pageMetaFromMessages(params: Promise<{ locale: string }>, ns: string, path: string, overrides: Partial<{ title: string; description: string; image: string }> = {}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: `pages.${ns}` });
  return pageMetadata({ locale: locale as Locale, title: overrides.title ?? plain(t("title")), description: overrides.description ?? t("intro"), path, eyebrow: t("eyebrow"), image: overrides.image });
}
