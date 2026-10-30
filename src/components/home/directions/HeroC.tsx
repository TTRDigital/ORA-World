import Image from "next/image";
import { getTranslations } from "next-intl/server";
import type { HomeContent, SiteSettings } from "@/content/types";
import type { Localized } from "@/lib/localize";
import { Accent } from "@/components/ui/Accent";
import { SplitLines } from "@/components/ui/SplitLines";
import { FilmButton } from "@/components/home/FilmLightbox";
import { ScrollToButton } from "@/components/ui/ScrollToButton";
import { lifestyle } from "@/content/seed/images";
import { localize } from "@/lib/localize";

/** Direction C hero: lifestyle-led (a person, the sea), split layout, bright paper, sea-glass accent. */
export async function HeroC({
  hero,
  site,
  locale,
}: {
  hero: Localized<HomeContent["hero"]>;
  site: Localized<SiteSettings>;
  locale: "en" | "es";
}) {
  const t = await getTranslations("common");
  const img = localize(lifestyle.familyPool, locale);
  const second = localize(lifestyle.beach, locale);
  return (
    <section className="relative overflow-hidden bg-bg pt-[calc(var(--header-h)+3rem)]">
      <div className="container-x grid grid-cols-12 gap-x-6 gap-y-10 pb-16 md:pb-24">
        <div className="col-span-12 flex flex-col justify-center md:col-span-6">
          <p className="mb-6 eyebrow text-accent-ink" data-reveal>
            {hero.eyebrow}
          </p>
          <SplitLines as="h1" className="max-w-[12ch] display-l xl:display-xl">
            <Accent text={hero.headline} />
          </SplitLines>
          <p className="mt-8 max-w-[40ch] lead text-fg-muted" data-reveal data-delay="0.25">
            {hero.tagline}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4" data-reveal data-delay="0.4">
            <ScrollToButton target="#inquire">{t("requestPresentation")}</ScrollToButton>
            <FilmButton url={site.filmUrl} youtubeId={site.filmYoutubeId} variant="primary" />
          </div>
        </div>
        <div className="relative col-span-12 md:col-span-6">
          <figure className="relative aspect-[4/5] overflow-hidden md:ml-12" data-reveal="image">
            <Image
              src={img.src}
              alt={img.alt}
              fill
              priority
              sizes="(min-width: 768px) 45vw, 100vw"
              className="object-cover"
              placeholder={img.blurDataURL ? "blur" : "empty"}
              blurDataURL={img.blurDataURL}
              data-reveal-inner
            />
          </figure>
          <figure
            className="absolute -bottom-10 left-0 hidden aspect-[4/3] w-1/2 overflow-hidden border-8 border-bg md:block"
            data-reveal="image"
            data-delay="0.3"
          >
            <Image src={second.src} alt={second.alt} fill sizes="25vw" className="object-cover" data-reveal-inner />
          </figure>
        </div>
      </div>
      <div className="border-t border-rule bg-bg-alt">
        <dl className="container-x grid grid-cols-2 md:grid-cols-4">
          {hero.stats.map((s, i) => (
            <div key={i} className={`py-6 ${i ? "md:border-l md:border-rule md:pl-8" : ""}`}>
              <dd className="stat text-accent-ink">
                <span data-counter={s.value ?? 0} data-prefix={s.prefix || ""} data-suffix={s.suffix || ""}>
                  {s.prefix}
                  {s.value?.toLocaleString("en-US")}
                  {s.suffix}
                </span>
              </dd>
              <dt className="mt-2 eyebrow text-fg-muted">{s.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
