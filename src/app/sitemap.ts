import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { siteUrl } from "@/lib/utils";
import { collections, floorPlans } from "@/content/seed/collections";
import { press } from "@/content/seed/people-places";
import { pages, projects } from "@/content/seed/projects";

const STATIC = [
  "",
  "/residences",
  "/floor-plans",
  "/amenities",
  "/lifestyle",
  "/tesoro-del-mar",
  "/location",
  "/resilience",
  "/incentives",
  "/gallery",
  "/virtual-tour",
  "/the-team",
  "/investment",
  "/press",
  "/faq",
  "/brokers",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    ...STATIC,
    ...collections.map((c) => `/residences/${c.slug}`),
    ...floorPlans.map((p) => `/floor-plans/${p.slug}`),
    ...press.map((p) => `/press/${p.slug}`),
    ...pages.map((p) => `/${p.slug}`),
    ...projects.filter((p) => p.slug !== "tesoro-del-mar").map((p) => `/projects/${p.slug}`),
  ];
  return paths.map((p) => ({
    url: `${siteUrl}/en${p}`,
    lastModified: new Date(),
    changeFrequency: p === "" ? "weekly" : "monthly",
    priority: p === "" ? 1 : 0.7,
    alternates: { languages: Object.fromEntries(routing.locales.map((l) => [l, `${siteUrl}/${l}${p}`])) },
  }));
}
