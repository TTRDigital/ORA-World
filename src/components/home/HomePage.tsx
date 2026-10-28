import type { Locale } from "@/content/types";
import { getAmenities, getCollections, getHome, getPointsOfInterest, getPress, getSiteSettings, getTeam } from "@/lib/content";
import { Preloader } from "./Preloader";
import { Hero } from "./Hero";
import { Manifesto } from "./Manifesto";
import { ContextReveal } from "./ContextReveal";
import { PlaceChapters } from "./PlaceChapters";
import { ResidencesPreview } from "./ResidencesPreview";
import { ResilienceSignature } from "./ResilienceSignature";
import { AmenitiesMosaic } from "./AmenitiesMosaic";
import { FamilyPets } from "./FamilyPets";
import { Prosperous } from "./Prosperous";
import { LocationSection } from "./LocationSection";
import { TourTeaser } from "./TourTeaser";
import { Collaboratory } from "./Collaboratory";
import { PressStrip } from "./PressStrip";
import { PresentationCta } from "./PresentationCta";

/** Direction A · Travertine Editorial. Sections in the order the brief specifies. */
export async function HomePage({ locale }: { locale: Locale }) {
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
      <Preloader />
      <Hero hero={home.hero} site={site} />
      <Manifesto manifesto={home.manifesto} />
      <ContextReveal context={home.context} />
      <PlaceChapters place={home.place} />
      <ResidencesPreview block={home.residences} collections={collections} />
      <ResilienceSignature block={home.resilience} />
      <AmenitiesMosaic block={home.amenities} amenities={amenities} />
      <FamilyPets family={home.family} pets={home.pets} />
      <Prosperous block={home.prosperous} />
      <LocationSection block={home.location} pois={pois} site={site} />
      <TourTeaser block={home.tour} url={site.vrTourUrl} />
      <Collaboratory block={home.team} team={team} />
      <PressStrip eyebrow={home.press.eyebrow} press={press} />
      <PresentationCta block={home.cta} site={site} residenceOptions={collections.map((c) => c.name)} />
    </main>
  );
}
