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
  "brokerKitUrl": brokerKit.asset->url, "mediaKitUrl": mediaKit.asset->url, "brochurePages": brochurePages[] ${figureProjection},
  legalNotice, renderingNotice, sponsor, consentText,
  "menuImages": menuImages[]{ key, "image": image ${figureProjection} }
}`;

export type SanitySiteSettings = Partial<Omit<SiteSettings, "menuImages" | "brochurePages">> & { menuImages?: { key: string; image: SanityFigure }[] | null; brochurePages?: SanityFigure[] | null };

export function mapSiteSettings(s: SanitySiteSettings): Partial<SiteSettings> {
  const out: Partial<SiteSettings> = {};
  for (const [k, v] of Object.entries(s)) if (v !== null && v !== undefined && k !== "menuImages" && k !== "brochurePages") (out as Record<string, unknown>)[k] = v;
  if (s.brochurePages?.length) out.brochurePages = s.brochurePages.map(mapFigure).filter((f): f is NonNullable<typeof f> => !!f);
  if (s.menuImages?.length) {
    out.menuImages = Object.fromEntries(s.menuImages.flatMap((m) => (mapFigure(m.image) ? [[m.key, mapFigure(m.image)!]] : [])));
  }
  return out;
}

/* ---------- list documents ----------
 * Each query projects Sanity documents into the same shape as the local seed types,
 * so the data layer can swap sources without components noticing.
 */
const fig = figureProjection;
export const listQueries = {
  collection: groq`*[_type=="collection"]|order(order asc){ "slug": slug.current, name, tagline, description, bedrooms, sizeRange, fromPrice, "image": image ${fig}, "hoverImage": hoverImage ${fig}, features, finishes, placeholder }`,
  floorPlan: groq`*[_type=="floorPlan"]|order(name.en asc){ "slug": slug.current, name, "collection": collection->slug.current, bedrooms, bathrooms, interiorSqFt, exteriorSqFt, orientation, view, tower, floors, status, fromPrice, "image": image ${fig}, "keyplan": keyplan ${fig}, keyplanPosition, "pdf": pdf.asset->url, highlights, placeholder }`,
  amenity: groq`*[_type=="amenity"]|order(order asc){ "slug": slug.current, name, description, category, "image": image ${fig}, featured }`,
  teamMember: groq`*[_type=="teamMember"]|order(order asc){ "slug": slug.current, name, role, discipline, bio, quote, "portrait": portrait ${fig}, website, placeholder }`,
  pointOfInterest: groq`*[_type=="pointOfInterest"]{ "slug": slug.current, name, category, lat, lng, driveMinutes, walkMinutes, note, placeholder }`,
  pressArticle: groq`*[_type=="pressArticle"]|order(date desc){ "slug": slug.current, title, outlet, date, excerpt, body, url, "image": image ${fig}, placeholder }`,
  investmentStep: groq`*[_type=="investmentStep"]|order(order asc){ order, title, detail, percent, when, placeholder }`,
  incentive: groq`*[_type=="incentive"]|order(order asc){ "slug": slug.current, title, summary, body }`,
  faq: groq`*[_type=="faq"]|order(order asc){ "slug": slug.current, topic, question, answer }`,
  project: groq`*[_type=="project"]{ "slug": slug.current, name, tagline, location, summary, facts, "sections": sections[]{ title, body, "image": image ${fig} }, "hero": hero ${fig}, "gallery": gallery[] ${fig}, flagship }`,
  galleryImage: groq`*[_type=="galleryImage"]|order(order asc){ "id": _id, "image": image ${fig}, category, caption }`,
  page: groq`*[_type=="page"]{ "slug": slug.current, title, intro, "hero": hero ${fig}, "sections": sections[]{ title, body, "image": image ${fig} }, "seoDescription": seo.description }`,
} as const;

/** Drop null images / empty arrays so seed-shaped components get the optional fields they expect. */
export function mapList<T>(_type: keyof typeof listQueries, docs: unknown[]): T[] {
  const clean = (v: unknown): unknown => {
    if (Array.isArray(v)) return v.map(clean).filter((x) => x !== undefined);
    if (v && typeof v === "object") {
      const o = v as Record<string, unknown>;
      if ("src" in o && (o.src === null || o.src === undefined)) return undefined;
      const out: Record<string, unknown> = {};
      for (const [k, val] of Object.entries(o)) {
        const c = clean(val);
        if (c !== undefined) out[k] = c;
      }
      return out;
    }
    return v;
  };
  return docs.map((d) => clean(d) as T);
}
