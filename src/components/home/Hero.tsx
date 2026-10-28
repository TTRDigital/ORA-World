import { getTranslations } from "next-intl/server";
import type { HomeContent, SiteSettings } from "@/content/types";
import type { Localized } from "@/lib/localize";
import { Accent } from "@/components/ui/Accent";
import { SplitLines } from "@/components/ui/SplitLines";
import { Button } from "@/components/ui/Button";
import { HeroVideo } from "./HeroVideo";
import { FilmButton } from "./FilmLightbox";
import { ScrollToButton } from "@/components/ui/ScrollToButton";

type Props = { hero: Localized<HomeContent["hero"]>; site: Localized<SiteSettings> };

export async function Hero({ hero, site }: Props) {
  const t = await getTranslations("common");
  const h = await getTranslations("home");
  return (
    <section data-hero className="relative flex min-h-dvh flex-col justify-end text-white">
      <HeroVideo poster={hero.poster} mp4={hero.videoLoop} webm={hero.videoLoopWebm} mobileMp4={hero.videoMobile} />
      <div className="scrim-bottom absolute inset-0" />
      <div className="scrim-top absolute inset-x-0 top-0 h-48" />

      <div className="container-x relative pt-[calc(var(--header-h)+4rem)] pb-14 md:pb-20">
        <p className="eyebrow mb-6 text-brass-light" data-reveal>
          {hero.eyebrow}
        </p>
        <SplitLines as="h1" className="display-xl max-w-[12ch] text-white">
          <Accent text={hero.headline} className="text-brass-light" />
        </SplitLines>
        <p className="lead mt-8 max-w-[44ch] text-white/85" data-reveal data-delay="0.3">
          {hero.tagline}
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4" data-reveal data-delay="0.45">
          <ScrollToButton target="#inquire" variant="light">
            {t("requestPresentation")}
          </ScrollToButton>
          <FilmButton url={site.filmUrl} />
        </div>
      </div>

      <div className="relative border-t border-white/20">
        <div className="container-x">
          <dl className="grid grid-cols-2 md:grid-cols-4">
            {hero.stats.map((s, i) => (
              <div key={i} className={`py-6 md:py-7 ${i > 0 ? "border-l border-white/15 pl-5 md:pl-8" : ""} ${i === 2 ? "border-l-0 md:border-l" : ""} ${i >= 2 ? "border-t border-white/15 md:border-t-0" : ""}`}>
                <dd className="stat text-white">
                  {s.value === null ? (
                    <span className="text-white/40">—</span>
                  ) : (
                    <span data-counter={s.value} data-prefix={s.prefix || ""} data-suffix={s.suffix || ""}>
                      {s.prefix}
                      {s.value.toLocaleString("en-US")}
                      {s.suffix}
                    </span>
                  )}
                </dd>
                <dt className="eyebrow mt-3 text-white/70">
                  {s.label}
                  {s.placeholder || s.value === null ? <span className="ml-2 text-brass-light/70">· {h("toBeConfirmed")}</span> : null}
                </dt>
              </div>
            ))}
          </dl>
        </div>
        <p className="eyebrow pointer-events-none absolute right-[var(--gutter)] -top-8 hidden text-white/45 md:block">{h("statsOf")}</p>
      </div>

      <div className="pointer-events-none absolute right-[var(--gutter)] bottom-[calc(7.5rem+var(--gutter))] hidden items-center gap-3 text-white/70 md:flex" aria-hidden="true">
        <span className="eyebrow">{t("scroll")}</span>
        <span className="block h-12 w-px overflow-hidden bg-white/25">
          <span className="block h-full w-full origin-top animate-[scrollhint_2.4s_var(--ease-in-out-quart)_infinite] bg-brass-light" />
        </span>
      </div>
      <style>{`@keyframes scrollhint{0%{transform:scaleY(0);transform-origin:top}45%{transform:scaleY(1);transform-origin:top}55%{transform:scaleY(1);transform-origin:bottom}100%{transform:scaleY(0);transform-origin:bottom}}`}</style>
    </section>
  );
}
