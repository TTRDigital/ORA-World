import type { Locale } from "@/content/types";
import {
  getAmenities,
  getCollections,
  getFaqs,
  getFloorPlans,
  getHome,
  getIncentives,
  getPointsOfInterest,
  getPress,
  getSiteSettings,
  getTeam,
} from "@/lib/content";
import { Preloader } from "./Preloader";
import { Hero } from "./Hero";
import { Journey } from "./Journey";
import { Manifesto } from "./Manifesto";
import { DotGrid } from "./DotGrid";
import { Walkthrough } from "./Walkthrough";
import { PlaceChapters } from "./PlaceChapters";
import { CollectionTabs } from "./CollectionTabs";
import { ResilienceChecklist } from "./ResilienceChecklist";
import { AmenitiesMosaic } from "./AmenitiesMosaic";
import { FamilyPets } from "./FamilyPets";
import { Prosperous } from "./Prosperous";
import { LocationSection } from "./LocationSection";
import { PortfolioGrid } from "./PortfolioGrid";
import { TourTeaser } from "./TourTeaser";
import { Collaboratory } from "./Collaboratory";
import { PressStrip } from "./PressStrip";
import { HomeFaq } from "./HomeFaq";
import { PresentationCta } from "./PresentationCta";
import { Interlude } from "./Interlude";
import { Marquee } from "./Marquee";
import { renders, lifestyle, tdm } from "@/content/seed/images";
import { localize } from "@/lib/localize";
import { CompareSlider } from "./CompareSlider";

/**
 * Direction A · Travertine Editorial. Every section is a small story: numbered journey cards,
 * a fact checklist, a pinned walkthrough, tabbed collections, a resilience board that completes
 * on scroll, a tabbed incentives reader, the portfolio grid and the FAQ.
 */
export async function HomePage({ locale }: { locale: Locale }) {
  const [site, home, collections, plans, amenities, pois, team, press, faqs, incentives] = await Promise.all([
    getSiteSettings(locale),
    getHome(locale),
    getCollections(locale),
    getFloorPlans(locale),
    getAmenities(locale),
    getPointsOfInterest(locale),
    getTeam(locale),
    getPress(locale),
    getFaqs(locale),
    getIncentives(locale),
  ]);
  const planCounts = Object.fromEntries(
    collections.map((c) => [c.slug, plans.filter((p) => p.collection === c.slug).length]),
  );

  return (
    <main id="main">
      <Preloader />
      <Hero hero={home.hero} site={site} />
      {/* The rest of the page is a sheet that slides over the pinned hero. */}
      <div className="relative z-[1] bg-bg">
        <Journey block={home.journey} />
        <Walkthrough block={home.walkthrough} />
        <Manifesto manifesto={home.manifesto} />
        <Interlude image={home.interludes[0].image} lines={home.interludes[0].lines} />
        <CompareSlider block={home.compare} />
        <DotGrid block={home.glance} />
        <Marquee
          words={home.marquee}
          images={[renders.poolTerrace, lifestyle.spa, tdm.aptLiving, lifestyle.beach, tdm.aerialCoast].map((im) => localize(im, locale))}
        />
        <CollectionTabs
          block={home.residences}
          collections={collections.map((c) => ({ ...c, finishes: [], description: c.description.slice(0, 1) }))}
          planCounts={planCounts}
        />
        <PlaceChapters place={home.place} />
        <ResilienceChecklist block={home.resilience} />
        <AmenitiesMosaic block={home.amenities} amenities={amenities} />
        <FamilyPets
          family={home.family}
          pets={home.pets}
          related={{
            family: amenities.filter((a) => a.category === "family").map((a) => a.name),
            pets: amenities.filter((a) => a.category === "pets").map((a) => a.name),
          }}
        />
        <Prosperous block={home.prosperous} incentives={incentives} />
        <LocationSection block={home.location} pois={pois} site={site} />
        <Interlude image={home.interludes[1].image} lines={home.interludes[1].lines} />
        <PortfolioGrid block={home.portfolio} locale={locale} />
        <TourTeaser block={home.tour} url={site.vrTourUrl} />
        <Collaboratory block={home.team} team={team} />
        <PressStrip eyebrow={home.press.eyebrow} press={press} />
        <HomeFaq
          block={home.faq}
          faqs={faqs}
          advisor={(() => {
            const r = team.find((m) => m.slug === "reza-sabaii");
            return r ? { name: r.name, role: r.role, portrait: r.portrait } : null;
          })()}
        />
        <PresentationCta block={home.cta} site={site} residenceOptions={collections.map((c) => c.name)} />
      </div>
    </main>
  );
}
