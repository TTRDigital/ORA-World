import type { Metadata } from "next";
import type { Locale } from "@/content/types";
import { isProd, siteUrl } from "./utils";

type Args = {
  locale: Locale;
  title: string;
  description: string;
  path: string;
  image?: string;
  eyebrow?: string;
  noindex?: boolean;
};

/** Localized metadata: canonical, hreflang pair, OG/Twitter with a branded dynamic image. */
export function pageMetadata({ locale, title, description, path, image, eyebrow, noindex }: Args): Metadata {
  const clean = path.replace(/^\/(en|es)(?=\/|$)/, "");
  const og =
    image ??
    `/api/og?title=${encodeURIComponent(title)}&locale=${locale}${eyebrow ? `&eyebrow=${encodeURIComponent(eyebrow)}` : ""}`;
  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}${clean}`,
      languages: { en: `/en${clean}`, es: `/es${clean}`, "x-default": `/en${clean}` },
    },
    robots: isProd && !noindex ? { index: true, follow: true } : { index: false, follow: false },
    openGraph: {
      title,
      description,
      url: `${siteUrl}/${locale}${clean}`,
      images: [{ url: og, width: 1200, height: 630 }],
      locale: locale === "es" ? "es_PR" : "en_US",
      type: "website",
      siteName: "ORA World",
    },
    twitter: { card: "summary_large_image", title, description, images: [og] },
  };
}

export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export function breadcrumbLd(locale: Locale, items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${siteUrl}/${locale}${it.path}`,
    })),
  };
}

export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ORA World",
    url: siteUrl,
    logo: `${siteUrl}/brand/mark.svg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Tesoro Del Mar",
      addressLocality: "Dorado, Vega Alta",
      addressRegion: "PR",
      postalCode: "00692",
      addressCountry: "US",
    },
  };
}
