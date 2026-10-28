/**
 * Seeds the ORA World dataset from the typed local content (src/content/seed).
 * Uploads local images as assets, converts seed shapes to document shapes, createOrReplace by stable _id.
 *   pnpm seed            (needs NEXT_PUBLIC_ORA_SANITY_PROJECT_ID, NEXT_PUBLIC_ORA_SANITY_DATASET, ORA_SANITY_WRITE_TOKEN)
 */
import { createClient } from "next-sanity";
import { createReadStream, existsSync } from "node:fs";
import path from "node:path";
import { siteSettings } from "../src/content/seed/site";
import { home } from "../src/content/seed/home";
import { collections, floorPlans } from "../src/content/seed/collections";
import { amenities } from "../src/content/seed/amenities";
import { team, pointsOfInterest, press, investmentSteps, incentives } from "../src/content/seed/people-places";
import { faqs } from "../src/content/seed/faq";
import { projects, galleryImages, pages } from "../src/content/seed/projects";
import type { ImageRef } from "../src/content/types";

const projectId = process.env.NEXT_PUBLIC_ORA_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_ORA_SANITY_DATASET || "ora-world";
if (!projectId) throw new Error("Set NEXT_PUBLIC_ORA_SANITY_PROJECT_ID (and ORA_SANITY_WRITE_TOKEN) before seeding.");
const client = createClient({ projectId, dataset, apiVersion: "2025-10-01", token: process.env.ORA_SANITY_WRITE_TOKEN, useCdn: false });

const assetCache = new Map<string, string>();
async function figure(img?: ImageRef | null) {
  if (!img) return undefined;
  let ref = assetCache.get(img.src);
  if (!ref) {
    const file = path.join("public", img.src);
    if (!existsSync(file)) {
      console.warn("missing image", file);
      return undefined;
    }
    const asset = await client.assets.upload("image", createReadStream(file), { filename: path.basename(file) });
    ref = asset._id as string;
    assetCache.set(img.src, ref);
  }
  return { _type: "figure", asset: { _type: "reference", _ref: ref }, alt: img.alt, caption: img.caption, rendering: img.rendering ?? false, placeholder: img.placeholder ?? false, credit: img.credit };
}
const key = <T extends object>(arr: T[] | undefined) => (arr ?? []).map((x, i) => ({ _key: `k${i}`, ...x }));
const slug = (s: string) => ({ _type: "slug", current: s });
const localeList = (arr: { en: string; es: string }[]) => key(arr.map((l) => ({ _type: "localeString", ...l })));

async function run() {
  const docs: Record<string, unknown>[] = [];
  docs.push({
    _id: "siteSettings", _type: "siteSettings",
    ...siteSettings, phone: siteSettings.phone ?? undefined, whatsapp: siteSettings.whatsapp ?? undefined, email: siteSettings.email ?? undefined,
    social: key(siteSettings.social.map((s) => ({ _type: "link", ...s }))),
    brochurePages: key((await Promise.all(siteSettings.brochurePages.map(figure))).filter(Boolean) as object[]),
    menuImages: key(await Promise.all(Object.entries(siteSettings.menuImages).map(async ([k, v]) => ({ key: k, image: await figure(v) })))),
    bookingUrl: siteSettings.bookingUrl ?? undefined, vrTourUrl: siteSettings.vrTourUrl ?? undefined, filmUrl: undefined, brochureUrl: undefined, brokerKitUrl: undefined, mediaKitUrl: undefined,
  });
  docs.push({
    _id: "homePage", _type: "homePage",
    hero: { eyebrow: home.hero.eyebrow, headline: home.hero.headline, tagline: home.hero.tagline, poster: await figure(home.hero.poster), stats: key(home.hero.stats.map((s) => ({ _type: "stat", ...s }))) },
    manifesto: home.manifesto,
    context: { image: await figure(home.context.image), captions: localeList(home.context.captions) },
    place: { enabled: true, ...home.place, chapters: key(await Promise.all(home.place.chapters.map(async (c) => ({ title: c.title, text: c.text, image: await figure(c.image) })))) },
    residences: { enabled: true, ...home.residences },
    resilience: { enabled: true, eyebrow: home.resilience.eyebrow, title: home.resilience.title, intro: home.resilience.intro, counters: key(home.resilience.counters.map((s) => ({ _type: "stat", ...s }))), features: key(home.resilience.features.map((f) => ({ title: f.title, points: localeList(f.points) }))) },
    amenities: { enabled: true, ...home.amenities },
    family: { enabled: true, eyebrow: home.family.eyebrow, title: home.family.title, body: home.family.body, image: await figure(home.family.image) },
    pets: { enabled: true, eyebrow: home.pets.eyebrow, title: home.pets.title, body: home.pets.body, image: await figure(home.pets.image) },
    prosperous: { enabled: true, ...home.prosperous },
    location: { enabled: true, ...home.location },
    tour: { enabled: true, eyebrow: home.tour.eyebrow, title: home.tour.title, text: home.tour.text, image: await figure(home.tour.image) },
    team: { enabled: true, ...home.team },
    press: { enabled: true, ...home.press },
    cta: { enabled: true, ...home.cta },
  });
  for (const [i, c] of collections.entries()) docs.push({ _id: `collection-${c.slug}`, _type: "collection", name: c.name, slug: slug(c.slug), order: i, placeholder: !!c.placeholder, tagline: c.tagline, description: c.description, bedrooms: c.bedrooms ?? undefined, sizeRange: c.sizeRange ?? undefined, fromPrice: c.fromPrice ?? undefined, image: await figure(c.image), hoverImage: await figure(c.hoverImage), features: localeList(c.features), finishes: key(c.finishes.map((f) => ({ group: f.group, items: localeList(f.items) }))) });
  for (const p of floorPlans) docs.push({ _id: `floorPlan-${p.slug}`, _type: "floorPlan", name: p.name, slug: slug(p.slug), placeholder: !!p.placeholder, collection: { _type: "reference", _ref: `collection-${p.collection}` }, bedrooms: p.bedrooms, bathrooms: p.bathrooms, interiorSqFt: p.interiorSqFt ?? undefined, exteriorSqFt: p.exteriorSqFt ?? undefined, orientation: p.orientation, view: p.view, tower: p.tower, floors: p.floors ?? undefined, status: p.status, fromPrice: p.fromPrice ?? undefined, image: await figure(p.image), keyplan: await figure(p.keyplan), keyplanPosition: p.keyplanPosition ?? undefined, highlights: localeList(p.highlights) });
  for (const [i, a] of amenities.entries()) docs.push({ _id: `amenity-${a.slug}`, _type: "amenity", name: a.name, slug: slug(a.slug), category: a.category, description: a.description, image: await figure(a.image), featured: !!a.featured, order: i });
  for (const [i, g] of galleryImages.entries()) docs.push({ _id: `gallery-${g.id}`, _type: "galleryImage", image: await figure(g.image), category: g.category, caption: g.caption, order: i });
  for (const [i, m] of team.entries()) docs.push({ _id: `team-${m.slug}`, _type: "teamMember", name: m.name, slug: slug(m.slug), placeholder: !!m.placeholder, role: m.role, discipline: m.discipline, bio: m.bio, quote: m.quote ?? undefined, portrait: await figure(m.portrait), website: m.website ?? undefined, order: i });
  for (const p of pointsOfInterest) docs.push({ _id: `poi-${p.slug}`, _type: "pointOfInterest", name: p.name, slug: slug(p.slug), category: p.category, lat: p.lat, lng: p.lng, driveMinutes: p.driveMinutes ?? undefined, walkMinutes: p.walkMinutes ?? undefined, note: p.note ?? undefined, placeholder: !!p.placeholder });
  for (const [i, f] of faqs.entries()) docs.push({ _id: `faq-${f.slug}`, _type: "faq", question: f.question, slug: slug(f.slug), topic: f.topic, answer: f.answer, order: i });
  for (const a of press) docs.push({ _id: `press-${a.slug}`, _type: "pressArticle", title: a.title, slug: slug(a.slug), placeholder: !!a.placeholder, outlet: a.outlet, date: a.date, excerpt: a.excerpt, body: a.body, url: a.url ?? undefined, image: await figure(a.image) });
  for (const s of investmentSteps) docs.push({ _id: `step-${s.order}`, _type: "investmentStep", ...s, percent: s.percent ?? undefined });
  for (const [i, inc] of incentives.entries()) docs.push({ _id: `incentive-${inc.slug}`, _type: "incentive", title: inc.title, slug: slug(inc.slug), summary: inc.summary, body: inc.body, order: i });
  for (const p of projects) docs.push({ _id: `project-${p.slug}`, _type: "project", name: p.name, slug: slug(p.slug), flagship: !!p.flagship, tagline: p.tagline, location: p.location, summary: p.summary, facts: key(p.facts.map((f) => ({ _type: "fact", ...f }))), sections: key(await Promise.all(p.sections.map(async (s) => ({ _type: "contentSection", title: s.title, body: s.body, image: await figure(s.image) })))), hero: await figure(p.hero), gallery: key((await Promise.all(p.gallery.map(figure))).filter(Boolean) as object[]) });
  for (const p of pages) docs.push({ _id: `page-${p.slug}`, _type: "page", title: p.title, slug: slug(p.slug), intro: p.intro, hero: await figure(p.hero), sections: key(await Promise.all(p.sections.map(async (s) => ({ _type: "contentSection", title: s.title, body: s.body, image: await figure(s.image) })))), seo: { title: p.title, description: p.seoDescription } });

  const tx = docs.reduce((t, d) => t.createOrReplace(d as { _id: string; _type: string }), client.transaction());
  const res = await tx.commit();
  console.log(`Seeded ${docs.length} documents into ${projectId}/${dataset} (tx ${res.transactionId}).`);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
