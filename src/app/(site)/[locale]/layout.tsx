import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { display, sans } from "@/lib/fonts";
import { getSiteSettings } from "@/lib/content";
import { siteUrl, isProd } from "@/lib/utils";
import { MotionInit } from "@/components/providers/MotionInit";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { PageTransition } from "@/components/providers/PageTransition";
import { SkipLink } from "@/components/layout/SkipLink";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingBar } from "@/components/layout/FloatingBar";
import { DirectionSwitcher } from "@/components/layout/DirectionSwitcher";
import "@/styles/globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    metadataBase: new URL(siteUrl),
    title: { default: t("defaultTitle"), template: "%s · ORA World" },
    description: t("defaultDescription"),
    applicationName: "ORA World",
    robots: isProd ? { index: true, follow: true } : { index: false, follow: false },
    alternates: {
      canonical: `/${locale}`,
      languages: { en: "/en", es: "/es", "x-default": "/en" },
    },
    openGraph: {
      type: "website",
      siteName: "ORA World",
      locale: locale === "es" ? "es_PR" : "en_US",
      alternateLocale: locale === "es" ? ["en_US"] : ["es_PR"],
      images: [{ url: `/api/og?locale=${locale}`, width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image" },
    icons: { icon: "/icon.svg" },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const site = await getSiteSettings(locale as Locale);

  return (
    <html lang={locale} data-direction="a" className={`${display.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        {!isProd && (
          <script
            // Staging only: apply the chosen design direction before first paint, keeping pages static.
            dangerouslySetInnerHTML={{
              __html: `try{var m=document.cookie.match(/(?:^|; )ora_direction=([abc])/);if(m)document.documentElement.dataset.direction=m[1];}catch(e){}`,
            }}
          />
        )}
      </head>
      <body className="flex min-h-dvh flex-col bg-bg text-fg">
        <NextIntlClientProvider>
          <MotionInit />
          <SmoothScroll />
          <PageTransition />
          <SkipLink />
          <Header site={site} />
          <div id="page" className="flex-1">
            {children}
          </div>
          <Footer site={site} />
          <FloatingBar site={site} />
          {!isProd && <DirectionSwitcher />}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
