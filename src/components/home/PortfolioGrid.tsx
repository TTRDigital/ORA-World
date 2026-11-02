import Image from "next/image";
import { getTranslations } from "next-intl/server";
import type { HomeContent, Locale } from "@/content/types";
import type { Localized } from "@/lib/localize";
import { portfolio } from "@/content/seed/portfolio";
import { Link } from "@/i18n/navigation";
import { Accent } from "@/components/ui/Accent";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ArrowIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

/** The twelve locations as image cards: renderings where the client published one, the gold-ring mark otherwise. */
export async function PortfolioGrid({ block, locale }: { block: Localized<HomeContent["portfolio"]>; locale: Locale }) {
  const h = await getTranslations("home");
  const t = await getTranslations("common");
  return (
    <section className="bg-bg-alt py-section" aria-labelledby="portfolio-title">
      <div className="container-x">
        <div className="grid grid-cols-12 gap-x-6">
          <div className="col-span-12 md:col-span-7">
            <Eyebrow>{block.eyebrow}</Eyebrow>
            <h2 id="portfolio-title" className="mt-6 display-l" data-reveal>
              <Accent text={block.title} />
            </h2>
          </div>
          <p
            className="col-span-12 mt-6 max-w-[42ch] lead text-fg-muted md:col-span-4 md:col-start-9 md:mt-16"
            data-reveal
          >
            {block.intro}
          </p>
        </div>

        <ul className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mt-20 lg:grid-cols-4 lg:gap-5">
          {portfolio.map((p, i) => {
            const feature = i < 2;
            const image = p.image;
            const card = (
              <>
                <span
                  className={cn(
                    "relative block overflow-hidden bg-travertine",
                    feature ? "aspect-[16/10]" : "aspect-[4/3]",
                  )}
                >
                  {image ? (
                    <Image
                      src={image.src}
                      alt={image.alt[locale]}
                      fill
                      sizes={
                        feature
                          ? "(min-width: 1024px) 50vw, 100vw"
                          : "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      }
                      placeholder={image.blurDataURL ? "blur" : "empty"}
                      blurDataURL={image.blurDataURL}
                      className="object-cover transition-transform duration-[1400ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.05]"
                      style={{ objectPosition: image.position }}
                    />
                  ) : p.thumb ? (
                    <Image src={p.thumb} alt="" fill sizes="240px" className="object-contain p-8" />
                  ) : (
                    <span className="absolute inset-0 grid place-items-center bg-basalt">
                      <span className="grid h-28 w-28 place-items-center rounded-full border border-brass-light font-display text-4xl text-brass-light">
                        ?
                      </span>
                    </span>
                  )}
                  <span className="absolute inset-0 bg-gradient-to-t from-basalt/75 via-basalt/5 to-transparent" />
                  <span className="absolute top-3 left-3 rounded-full bg-bone/95 px-3 py-1 text-[11px] tracking-[0.12em] text-basalt uppercase tnum">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={cn(
                      "absolute top-3 right-3 rounded-full px-3 py-1 text-[11px] tracking-[0.12em] uppercase",
                      p.href ? "bg-accent text-white" : "bg-basalt/70 text-white/85",
                    )}
                  >
                    {p.href ? h("explore") : t("comingSoon")}
                  </span>
                  <span className="absolute right-4 bottom-4 left-4 flex items-end justify-between gap-3 text-white">
                    <span className={feature ? "display-m" : "display-s"}>{p.name}</span>
                    {p.href && (
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/60 transition-colors duration-500 group-hover:bg-white group-hover:text-basalt">
                        <ArrowIcon />
                      </span>
                    )}
                  </span>
                </span>
                <span className="mt-3 block small text-fg-muted">{p.tagline[locale]}</span>
              </>
            );
            return (
              <li key={p.slug} className={feature ? "sm:col-span-2" : ""} data-reveal data-delay={(i % 4) * 0.06}>
                {p.href ? (
                  <Link href={p.href} className="group block">
                    {card}
                  </Link>
                ) : (
                  <div className="group">{card}</div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
