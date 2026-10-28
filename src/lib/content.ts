import { cache } from "react";
import type { Locale, SiteSettings } from "@/content/types";
import { localize, type Localized } from "./localize";
import { siteSettings as seedSite } from "@/content/seed/site";
import { home as seedHome } from "@/content/seed/home";
import { collections as seedCollections, floorPlans as seedPlans } from "@/content/seed/collections";
import { amenities as seedAmenities, activities as seedActivities } from "@/content/seed/amenities";
import { team as seedTeam, pointsOfInterest as seedPois, press as seedPress, investmentSteps as seedSteps, incentives as seedIncentives } from "@/content/seed/people-places";
import { faqs as seedFaqs } from "@/content/seed/faq";
import { projects as seedProjects, galleryImages as seedGallery, pages as seedPages } from "@/content/seed/projects";
import { sanityFetch } from "@/sanity/client";
import { siteSettingsQuery, mapSiteSettings, type SanitySiteSettings, listQueries, mapList } from "@/sanity/queries";

/**
 * Data layer. Every getter tries Sanity first (when configured) and falls back to the
 * typed local seed, so staging renders fully before the CMS is populated.
 */
export const getSiteSettings = cache(async (locale: Locale): Promise<Localized<SiteSettings>> => {
  const remote = await sanityFetch<SanitySiteSettings>(siteSettingsQuery, {}, ["siteSettings"]);
  const merged: SiteSettings = remote ? { ...seedSite, ...mapSiteSettings(remote) } : seedSite;
  return localize(merged, locale);
});

async function list<T>(type: keyof typeof listQueries, seed: T[]): Promise<T[]> {
  const remote = await sanityFetch<unknown[]>(listQueries[type], {}, [type]);
  if (remote && remote.length) return mapList<T>(type, remote);
  return seed;
}

export const getHome = cache(async (locale: Locale) => localize(seedHome, locale));
export const getCollections = cache(async (locale: Locale) => localize(await list("collection", seedCollections), locale));
export const getFloorPlans = cache(async (locale: Locale) => localize(await list("floorPlan", seedPlans), locale));
export const getAmenities = cache(async (locale: Locale) => localize(await list("amenity", seedAmenities), locale));
export const getActivities = cache(async (locale: Locale) => localize(seedActivities, locale));
export const getTeam = cache(async (locale: Locale) => localize(await list("teamMember", seedTeam), locale));
export const getPointsOfInterest = cache(async (locale: Locale) => localize(await list("pointOfInterest", seedPois), locale));
export const getPress = cache(async (locale: Locale) => localize(await list("pressArticle", seedPress), locale));
export const getInvestmentSteps = cache(async (locale: Locale) => localize(await list("investmentStep", seedSteps), locale));
export const getIncentives = cache(async (locale: Locale) => localize(await list("incentive", seedIncentives), locale));
export const getFaqs = cache(async (locale: Locale) => localize(await list("faq", seedFaqs), locale));
export const getProjects = cache(async (locale: Locale) => localize(await list("project", seedProjects), locale));
export const getGallery = cache(async (locale: Locale) => localize(await list("galleryImage", seedGallery), locale));
export const getPages = cache(async (locale: Locale) => localize(await list("page", seedPages), locale));

export async function getPage(locale: Locale, slug: string) {
  return (await getPages(locale)).find((p) => p.slug === slug) ?? null;
}
export async function getProject(locale: Locale, slug: string) {
  return (await getProjects(locale)).find((p) => p.slug === slug) ?? null;
}
export async function getCollection(locale: Locale, slug: string) {
  return (await getCollections(locale)).find((c) => c.slug === slug) ?? null;
}
export async function getFloorPlan(locale: Locale, slug: string) {
  return (await getFloorPlans(locale)).find((p) => p.slug === slug) ?? null;
}
export async function getPressArticle(locale: Locale, slug: string) {
  return (await getPress(locale)).find((p) => p.slug === slug) ?? null;
}
