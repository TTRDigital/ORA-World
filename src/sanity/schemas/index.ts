import type { SchemaTypeDefinition } from "sanity";
import { localeString, localeText, localeParagraphs, localeBlock } from "./objects/locale";
import { figure } from "./objects/figure";
import { stat, link, contentSection, fact, seo } from "./objects/misc";
import { siteSettings } from "./documents/siteSettings";
import { homePage } from "./documents/homePage";
import {
  project,
  collection,
  floorPlan,
  amenity,
  galleryImage,
  teamMember,
  pointOfInterest,
  faq,
  pressArticle,
  investmentStep,
  incentive,
  page,
  lead,
  redirect,
} from "./documents/content";

export const schemaTypes: SchemaTypeDefinition[] = [
  localeString,
  localeText,
  localeParagraphs,
  localeBlock,
  figure,
  stat,
  link,
  contentSection,
  fact,
  seo,
  siteSettings,
  homePage,
  project,
  collection,
  floorPlan,
  amenity,
  galleryImage,
  teamMember,
  pointOfInterest,
  faq,
  pressArticle,
  investmentStep,
  incentive,
  page,
  lead,
  redirect,
];
