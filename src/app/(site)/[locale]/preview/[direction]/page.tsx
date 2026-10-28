import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { HomeB } from "@/components/home/directions/HomeB";
import { HomeC } from "@/components/home/directions/HomeC";

/** Internal targets for the staging direction switch: /en?direction=b rewrites here (see proxy.ts). */
export const dynamicParams = false;
export function generateStaticParams() {
  return routing.locales.flatMap((locale) => ["b", "c"].map((direction) => ({ locale, direction })));
}

export default async function DirectionHome({ params }: PageProps<"/[locale]/preview/[direction]">) {
  const { locale, direction } = await params;
  setRequestLocale(locale);
  if (direction === "b") return <HomeB locale={locale as Locale} />;
  if (direction === "c") return <HomeC locale={locale as Locale} />;
  notFound();
}
