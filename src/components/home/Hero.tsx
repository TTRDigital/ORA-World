import { getTranslations } from "next-intl/server";
import type { HomeContent, SiteSettings } from "@/content/types";
import type { Localized } from "@/lib/localize";
import { Accent } from "@/components/ui/Accent";
import { SplitLines } from "@/components/ui/SplitLines";
import { HeroVideo } from "./HeroVideo";
import { FilmButton } from "./FilmLightbox";
import { ScrollToButton } from "@/components/ui/ScrollToButton";
import { HeroFx } from "./HeroFx";

type Props = { hero: Localized<HomeContent["hero"]>; site: Localized<SiteSettings> };

export async function Hero({ hero, site }: Props) {
  const t = await getTranslations("common");
  const h = await getTranslations("home");
  return (
    <section data-hero className="relative flex min-h-dvh flex-col justify-end overflow-hidden text-white">
      <HeroFx />
      <div data-hero-media className="absolute inset-0 will-change-transform">
        <HeroVideo
          poster={hero.poster}
          mp4={hero.videoLoop}
          webm={hero.videoLoopWebm}
          mobileMp4={hero.videoMobile}
          youtubeId={site.filmYoutubeId}
        />
      </div>
      <div className="absolute inset-0 scrim-bottom" />
      <div className="absolute inset-x-0 top-0 h-48 scrim-top" />
      <div data-hero-shade className="pointer-events-none absolute inset-0 bg-basalt opacity-0" />

      <div data-hero-content className="relative container-x pt-[calc(var(--header-h)+4rem)] pb-20 md:pb-28">
        <SplitLines as="h1" className="max-w-[12ch] display-xl text-white">
          <Accent text={hero.headline} className="text-brass-light" />
        </SplitLines>
        <div className="mt-10 flex flex-wrap items-center gap-4" data-reveal data-delay="0.3">
          <ScrollToButton target="#inquire" variant="light">
            {t("requestPresentation")}
          </ScrollToButton>
          <FilmButton url={site.filmUrl} youtubeId={site.filmYoutubeId} />
        </div>
      </div>

      <div
        className="pointer-events-none absolute right-[var(--gutter)] bottom-[calc(2.5rem+var(--gutter))] hidden items-center gap-3 text-white/70 md:flex"
        aria-hidden="true"
      >
        <span className="eyebrow">{t("scroll")}</span>
        <span className="block h-12 w-px overflow-hidden bg-white/25">
          <span className="block h-full w-full origin-top animate-[scrollhint_2.4s_var(--ease-in-out-quart)_infinite] bg-brass-light" />
        </span>
      </div>
      <style>{`@keyframes scrollhint{0%{transform:scaleY(0);transform-origin:top}45%{transform:scaleY(1);transform-origin:top}55%{transform:scaleY(1);transform-origin:bottom}100%{transform:scaleY(0);transform-origin:bottom}}`}</style>
    </section>
  );
}
