import { cache } from "react";
import type { Locale, SiteSettings } from "@/content/types";
import { localize, type Localized } from "./localize";
import { siteSettings as seedSite } from "@/content/seed/site";
import { sanityFetch } from "@/sanity/client";
import { siteSettingsQuery, mapSiteSettings, type SanitySiteSettings } from "@/sanity/queries";

/**
 * Data layer. Every getter tries Sanity first (when configured) and falls back to the
 * typed local seed, so staging renders fully before the CMS is populated.
 */
export const getSiteSettings = cache(async (locale: Locale): Promise<Localized<SiteSettings>> => {
  const remote = await sanityFetch<SanitySiteSettings>(siteSettingsQuery, {}, ["siteSettings"]);
  const merged: SiteSettings = remote ? { ...seedSite, ...mapSiteSettings(remote) } : seedSite;
  return localize(merged, locale);
});
