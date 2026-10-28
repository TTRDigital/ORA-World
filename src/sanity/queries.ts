import { groq } from "next-sanity";
import type { ImageRef, L, SiteSettings } from "@/content/types";

/* ---------- shared projections ---------- */
export const figureProjection = groq`{
  "src": asset->url, "width": asset->metadata.dimensions.width, "height": asset->metadata.dimensions.height,
  "blurDataURL": asset->metadata.lqip, alt, caption, rendering, placeholder, credit
}`;

export type SanityFigure = { src: string; width: number; height: number; blurDataURL?: string; alt: L; caption?: L; rendering?: boolean; placeholder?: boolean; credit?: string } | null;

export function mapFigure(f: SanityFigure): ImageRef | undefined {
  if (!f || !f.src) return undefined;
  return { src: f.src, width: f.width, height: f.height, blurDataURL: f.blurDataURL, alt: f.alt, caption: f.caption, rendering: f.rendering, placeholder: f.placeholder, credit: f.credit };
}

/* ---------- site settings ---------- */
export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]{
  phone, whatsapp, email, salesGalleryName, salesGalleryAddress, hours, social, siteLat, siteLng,
  portalUrl, bookingUrl, vrTourUrl, "filmUrl": film.asset->url, "brochureUrl": brochure.asset->url,
  "brokerKitUrl": brokerKit.asset->url, "mediaKitUrl": mediaKit.asset->url,
  legalNotice, renderingNotice, sponsor, consentText,
  "menuImages": menuImages[]{ key, "image": image ${figureProjection} }
}`;

export type SanitySiteSettings = Partial<Omit<SiteSettings, "menuImages">> & { menuImages?: { key: string; image: SanityFigure }[] | null };

export function mapSiteSettings(s: SanitySiteSettings): Partial<SiteSettings> {
  const out: Partial<SiteSettings> = {};
  for (const [k, v] of Object.entries(s)) if (v !== null && v !== undefined && k !== "menuImages") (out as Record<string, unknown>)[k] = v;
  if (s.menuImages?.length) {
    out.menuImages = Object.fromEntries(s.menuImages.flatMap((m) => (mapFigure(m.image) ? [[m.key, mapFigure(m.image)!]] : [])));
  }
  return out;
}
