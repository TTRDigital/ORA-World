import { getTranslations } from "next-intl/server";
import type { HomeContent } from "@/content/types";
import type { Localized } from "@/lib/localize";
import StatsCounter from "@/components/vendor/vengeance-ui/stats-counter";

/**
 * The Tesoro Del Mar figures, moved out of the hero banner (client feedback: the first screen was too
 * busy) into their own calm band directly beneath it. Numbers count up as they arrive.
 */
export async function HeroStats({ hero }: { hero: Localized<HomeContent["hero"]> }) {
  const h = await getTranslations("home");
  return (
    <section aria-label={h("statsOf")} className="border-t border-white/10 dark-section">
      <div className="container-x py-12 md:py-16">
        <p className="eyebrow text-brass-light">{h("statsOf")}</p>
        <dl className="mt-8 grid grid-cols-2 gap-y-10 md:grid-cols-4">
          {hero.stats.map((s, i) => (
            <div
              key={i}
              className={[
                "flex flex-col-reverse",
                i % 2 === 1 ? "border-l border-white/15 pl-5" : "",
                i > 0 ? "md:border-l md:border-white/15 md:pl-8" : "",
                i === 2 ? "md:pl-8" : "",
              ].join(" ")}
              data-reveal
              data-delay={i * 0.08}
            >
              <dt className="mt-3 eyebrow text-white/70">
                {s.label}
                {s.placeholder || s.value === null ? (
                  <span className="ml-2 text-brass-light">· {h("toBeConfirmed")}</span>
                ) : null}
              </dt>
              <dd className="stat text-white">
                {s.value === null ? (
                  <span className="text-white/60">—</span>
                ) : (
                  <StatsCounter value={s.value} prefix={s.prefix || ""} suffix={s.suffix || ""} duration={1.8} />
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
