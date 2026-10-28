import { getTranslations } from "next-intl/server";
import type { HomeContent, SiteSettings } from "@/content/types";
import type { Localized } from "@/lib/localize";
import { Accent } from "@/components/ui/Accent";
import { SplitLines } from "@/components/ui/SplitLines";
import { HeroVideo } from "@/components/home/HeroVideo";
import { FilmButton } from "@/components/home/FilmLightbox";
import { ScrollToButton } from "@/components/ui/ScrollToButton";

/** Direction B hero: centered, cinematic, letterboxed stats, headline rises from the fold. */
export async function HeroB({ hero, site }: { hero: Localized<HomeContent["hero"]>; site: Localized<SiteSettings> }) {
  const t = await getTranslations("common");
  return (
    <section data-hero className="relative flex min-h-dvh flex-col justify-center text-white">
      <HeroVideo poster={hero.poster} mp4={hero.videoLoop} webm={hero.videoLoopWebm} mobileMp4={hero.videoMobile} />
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse at center, transparent 30%, rgb(18 17 16 / .75) 100%)" }}
      />
      <div className="relative container-x flex flex-col items-center py-32 text-center">
        <p className="mb-8 eyebrow text-brass-light" data-reveal>
          {hero.eyebrow}
        </p>
        <SplitLines as="h1" className="max-w-[14ch] display-xl text-white">
          <Accent text={hero.headline} className="text-brass-light" />
        </SplitLines>
        <p className="mt-8 max-w-[42ch] lead text-white/80" data-reveal data-delay="0.3">
          {hero.tagline}
        </p>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4" data-reveal data-delay="0.45">
          <ScrollToButton target="#inquire" variant="light">
            {t("requestPresentation")}
          </ScrollToButton>
          <FilmButton url={site.filmUrl} />
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 border-t border-white/15 bg-basalt/60 backdrop-blur-sm">
        <dl className="container-x grid grid-cols-2 divide-x divide-white/10 md:grid-cols-4">
          {hero.stats.map((s, i) => (
            <div key={i} className="px-4 py-5 first:pl-0 md:px-8">
              <dd className="stat text-white">
                <span data-counter={s.value ?? 0} data-prefix={s.prefix || ""} data-suffix={s.suffix || ""}>
                  {s.prefix}
                  {s.value?.toLocaleString("en-US")}
                  {s.suffix}
                </span>
              </dd>
              <dt className="mt-2 eyebrow text-white/60">{s.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
