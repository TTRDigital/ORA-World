/**
 * Content model shared by the Sanity schemas, the local seed and the data layer.
 * Every user-visible string is localized ({ en, es }); the data layer resolves it
 * to the active locale before components see it.
 */
export type Locale = "en" | "es";
export type L = { en: string; es: string };
/** Paragraph array, localized. */
export type LP = { en: string[]; es: string[] };

export interface ImageRef {
  src: string;
  alt: L;
  width: number;
  height: number;
  caption?: L;
  /** Artist's conceptual rendering label. */
  rendering?: boolean;
  /** Clearly marked placeholder (listed in CONTENT-TODO.md). */
  placeholder?: boolean;
  credit?: string;
  blurDataURL?: string;
}

export interface Social { label: string; href: string }

export interface SiteSettings {
  phone: string | null;
  whatsapp: string | null;
  email: string | null;
  salesGalleryName: L;
  salesGalleryAddress: L | null;
  hours: L | null;
  social: Social[];
  legalNotice: L;
  renderingNotice: L;
  sponsor: L;
  portalUrl: string;
  bookingUrl: string | null;
  vrTourUrl: string | null;
  filmUrl: string | null;
  brochureUrl: string | null;
  /** Page images for the in-browser flipbook (placeholders until the brochure is supplied). */
  brochurePages: ImageRef[];
  brokerKitUrl: string | null;
  mediaKitUrl: string | null;
  consentText: L;
  siteLat: number;
  siteLng: number;
  menuImages: Partial<Record<string, ImageRef>>;
}

export interface Stat {
  value: number | null;
  prefix?: string;
  suffix?: string;
  label: L;
  placeholder?: boolean;
}

export interface Collection {
  slug: string;
  name: L;
  tagline: L;
  description: LP;
  bedrooms: string | null;
  sizeRange: string | null;
  fromPrice: number | null;
  image: ImageRef;
  hoverImage?: ImageRef;
  features: L[];
  finishes: { group: L; items: L[] }[];
  placeholder?: boolean;
}

export type Orientation = "N" | "NE" | "E" | "SE" | "S" | "SW" | "W" | "NW";
export type PlanStatus = "available" | "reserved" | "sold";

export interface FloorPlan {
  slug: string;
  name: L;
  collection: string;
  bedrooms: number;
  bathrooms: number;
  interiorSqFt: number | null;
  exteriorSqFt: number | null;
  orientation: Orientation;
  view: L;
  tower: string;
  floors: string | null;
  status: PlanStatus;
  fromPrice: number | null;
  image: ImageRef;
  keyplan: ImageRef | null;
  /** Unit position on the keyplan, percent of width/height. */
  keyplanPosition: { x: number; y: number; w: number; h: number } | null;
  pdf: string | null;
  highlights: L[];
  placeholder?: boolean;
}

export type AmenityCategory = "wellness" | "family" | "pets" | "resort" | "eco";

export interface Amenity {
  slug: string;
  name: L;
  description: L;
  category: AmenityCategory;
  image: ImageRef;
  featured?: boolean;
}

export type GalleryCategory = "exteriors" | "interiors" | "amenities" | "lifestyle" | "construction";

export interface GalleryImage {
  id: string;
  image: ImageRef;
  category: GalleryCategory;
  caption: L;
}

export interface TeamMember {
  slug: string;
  name: string;
  role: L;
  discipline: L;
  bio: LP;
  quote: L | null;
  portrait: ImageRef;
  website: string | null;
  placeholder?: boolean;
}

export type PoiCategory = "beach" | "golf" | "school" | "healthcare" | "airport" | "dining" | "culture" | "nature";

export interface PointOfInterest {
  slug: string;
  name: L;
  category: PoiCategory;
  lat: number;
  lng: number;
  driveMinutes: number | null;
  walkMinutes: number | null;
  note: L | null;
  placeholder?: boolean;
}

export interface Faq {
  slug: string;
  topic: L;
  question: L;
  answer: LP;
}

export interface PressArticle {
  slug: string;
  title: L;
  outlet: string;
  date: string;
  excerpt: L;
  body: LP;
  url: string | null;
  image: ImageRef | null;
  placeholder?: boolean;
}

export interface InvestmentStep {
  order: number;
  title: L;
  detail: L;
  percent: number | null;
  when: L;
  placeholder?: boolean;
}

export interface Incentive {
  slug: string;
  title: L;
  summary: L;
  body: LP;
}

export interface Project {
  slug: string;
  name: L;
  tagline: L;
  location: L;
  summary: LP;
  facts: { label: L; value: string; placeholder?: boolean }[];
  sections: { title: L; body: LP; image?: ImageRef }[];
  hero: ImageRef;
  gallery: ImageRef[];
  flagship?: boolean;
}

export interface Activity {
  slug: string;
  group: L;
  items: { name: L; description: L }[];
  image: ImageRef;
}

export interface Chapter {
  number: string;
  title: L;
  text: L;
  image: ImageRef;
}

export interface ResilienceFeature {
  slug: string;
  title: L;
  points: L[];
}

export interface HomeContent {
  hero: {
    eyebrow: L;
    headline: L; // use *word* for the italic accent
    tagline: L;
    stats: Stat[];
    poster: ImageRef;
    videoLoop: string | null; // /video/hero-loop-1080.mp4 when transcoded
    videoLoopWebm: string | null;
    videoMobile: string | null;
  };
  manifesto: { text: L; signature: L };
  context: { image: ImageRef; captions: L[] };
  place: { eyebrow: L; title: L; intro: L; chapters: Chapter[] };
  residences: { eyebrow: L; title: L; intro: L };
  resilience: { eyebrow: L; title: L; intro: L; counters: Stat[]; features: ResilienceFeature[] };
  amenities: { eyebrow: L; title: L; intro: L };
  family: { eyebrow: L; title: L; body: LP; image: ImageRef };
  pets: { eyebrow: L; title: L; body: LP; image: ImageRef };
  prosperous: { eyebrow: L; title: L; body: LP; disclaimer: L };
  location: { eyebrow: L; title: L; intro: L };
  tour: { eyebrow: L; title: L; text: L; image: ImageRef };
  team: { eyebrow: L; title: L; intro: L };
  press: { eyebrow: L };
  cta: { eyebrow: L; title: L; text: L };
}

export interface GenericPage {
  slug: string;
  title: L;
  intro: L;
  hero?: ImageRef;
  sections: { title: L; body: LP; image?: ImageRef }[];
  seoDescription: L;
}
