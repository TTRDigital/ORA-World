import type { Locale } from "@/content/types";
import { getAmenities, getCollections, getFloorPlans, getHome, getPointsOfInterest, getSiteSettings } from "@/lib/content";
import { Preloader } from "./Preloader";
import { Hero } from "./Hero";
import { HeroStats } from "./HeroStats";
import { Journey } from "./Journey";
import { Walkthrough } from "./Walkthrough";
import { FloorPlanSection } from "./FloorPlanSection";
import { AmenitiesMosaic } from "./AmenitiesMosaic";
import { WhyOra } from "./WhyOra";
import { TourTeaser } from "./TourTeaser";
import { LocationSection } from "./LocationSection";
import { PresentationCta } from "./PresentationCta";

/**
 * Homepage, Tesoro Del Mar only, kept short (client: "cleaner and shorter"): the film, the figures,
 * the three chapters, a walk through the rooms, the tower floor by floor, the amenities, why ORA World,
 * the 360° tour, the location and the inquiry.
 */
export async function HomePage({ locale }: { locale: Locale }) {
  const [site, home, collections, plans, amenities, pois] = await Promise.all([
    getSiteSettings(locale),
    getHome(locale),
    getCollections(locale),
    getFloorPlans(locale),
    getAmenities(locale),
    getPointsOfInterest(locale),
  ]);

  return (
    <main id="main">
      <Preloader />
      <Hero hero={home.hero} site={site} />
      <div className="relative z-[1] bg-bg">
        <HeroStats hero={home.hero} />
        <Journey block={home.journey} />
        <Walkthrough block={home.walkthrough} />
        <FloorPlanSection plans={plans} />
        <AmenitiesMosaic block={home.amenities} amenities={amenities} />
        <WhyOra locale={locale} />
        <TourTeaser block={home.tour} url={site.vrTourUrl} />
        <LocationSection block={home.location} pois={pois} site={site} />
        <PresentationCta block={home.cta} site={site} residenceOptions={collections.map((c) => c.name)} />
      </div>
    </main>
  );
}
