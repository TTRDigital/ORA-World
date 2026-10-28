import type { Locale } from "@/content/types";
import {
  getAmenities,
  getCollections,
  getHome,
  getPointsOfInterest,
  getPress,
  getSiteSettings,
  getTeam,
} from "@/lib/content";
import { HeroC } from "./HeroC";
import { FamilyPets } from "@/components/home/FamilyPets";
import { PlaceChapters } from "@/components/home/PlaceChapters";
import { Manifesto } from "@/components/home/Manifesto";
import { AmenitiesMosaic } from "@/components/home/AmenitiesMosaic";
import { ResidencesPreview } from "@/components/home/ResidencesPreview";
import { LocationSection } from "@/components/home/LocationSection";
import { ResilienceSignature } from "@/components/home/ResilienceSignature";
import { Prosperous } from "@/components/home/Prosperous";
import { TourTeaser } from "@/components/home/TourTeaser";
import { Collaboratory } from "@/components/home/Collaboratory";
import { PressStrip } from "@/components/home/PressStrip";
import { PresentationCta } from "@/components/home/PresentationCta";

/** Direction C · Caribbean Light: lifestyle first (people, ocean, family), sea-glass accent, softer motion. */
export async function HomeC({ locale }: { locale: Locale }) {
  const [site, home, collections, amenities, pois, team, press] = await Promise.all([
    getSiteSettings(locale),
    getHome(locale),
    getCollections(locale),
    getAmenities(locale),
    getPointsOfInterest(locale),
    getTeam(locale),
    getPress(locale),
  ]);
  return (
    <main id="main">
      <HeroC hero={home.hero} site={site} locale={locale} />
      <FamilyPets family={home.family} pets={home.pets} />
      <PlaceChapters place={home.place} />
      <Manifesto manifesto={home.manifesto} />
      <AmenitiesMosaic block={home.amenities} amenities={amenities} />
      <ResidencesPreview block={home.residences} collections={collections} />
      <LocationSection block={home.location} pois={pois} site={site} />
      <ResilienceSignature block={home.resilience} />
      <Prosperous block={home.prosperous} />
      <TourTeaser block={home.tour} url={site.vrTourUrl} />
      <Collaboratory block={home.team} team={team} />
      <PressStrip eyebrow={home.press.eyebrow} press={press} />
      <PresentationCta block={home.cta} site={site} residenceOptions={collections.map((c) => c.name)} />
    </main>
  );
}
