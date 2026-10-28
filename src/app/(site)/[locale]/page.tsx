import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { HomePage } from "@/components/home/HomePage";

export default async function Page({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <HomePage locale={locale as Locale} />;
}
