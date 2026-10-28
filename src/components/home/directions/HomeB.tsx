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
import { Preloader } from "@/components/home/Preloader";
import { HeroB } from "./HeroB";
import { Manifesto } from "@/components/home/Manifesto";
import { StackedChapters } from "./StackedChapters";
import { ResidencesCinema } from "./ResidencesCinema";
import { ResilienceSignature } from "@/components/home/ResilienceSignature";
import { AmenitiesMosaic } from "@/components/home/AmenitiesMosaic";
import { FamilyPets } from "@/components/home/FamilyPets";
import { Prosperous } from "@/components/home/Prosperous";
import { LocationSection } from "@/components/home/LocationSection";
import { TourTeaser } from "@/components/home/TourTeaser";
import { Collaboratory } from "@/components/home/Collaboratory";
import { PressStrip } from "@/components/home/PressStrip";
import { PresentationCta } from "@/components/home/PresentationCta";

/** Direction B · Basalt Cinema: dark base, brass accents, full-screen pinned chapters, longer motion. */
export async function HomeB({ locale }: { locale: Locale }) {
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
      <HeroB hero={home.hero} site={site} />
      <Manifesto manifesto={home.manifesto} />
      <StackedChapters eyebrow={home.place.eyebrow} title={home.place.title} chapters={home.place.chapters} />
      <ResidencesCinema block={home.residences} collections={collections} />
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
