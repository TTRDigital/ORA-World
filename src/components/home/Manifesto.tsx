import { getTranslations } from "next-intl/server";
import type { HomeContent } from "@/content/types";
import type { Localized } from "@/lib/localize";
import { Accent } from "@/components/ui/Accent";
import { FanGallery } from "./FanGallery";
import { ScrollHighlight } from "@/components/ui/ScrollHighlight";

/**
 * Mission as a cinematic statement on basalt: the mission sentence set large in the reading face and
 * lighting up word by word as it scrolls, three renders that fan out from a stack into a
 * triptych as they scroll in, and four commitment cards whose rules draw in as they arrive.
 */
export async function Manifesto({ manifesto: m }: { manifesto: Localized<HomeContent["manifesto"]> }) {
  const t = await getTranslations("common");
  return (
    <section className="relative overflow-hidden py-section dark-section" aria-labelledby="mission-title">
      <div className="container-x">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
          <p className="eyebrow text-brass-light">{m.eyebrow}</p>
          <p className="eyebrow text-white/60">{m.signature}</p>
        </div>

        <div className="mt-12 grid grid-cols-12 gap-x-6 gap-y-10 md:mt-20">
          <h2 id="mission-title" className="col-span-12 display-l text-white lg:col-span-5" data-reveal>
            <Accent text={m.title} className="text-brass-light" />
          </h2>
          <ScrollHighlight
            text={m.text}
            className="col-span-12 font-sans text-[clamp(1.35rem,1.05rem+1.25vw,2.25rem)] leading-[1.35] font-medium tracking-[-0.01em] lg:col-span-7"
            dimClass="text-[#8f8677]"
            litClass="text-white"
          />
        </div>

        {/* Three renders that fan out from a stack into a triptych as they scroll in */}
        <div className="mt-16 md:mt-24">
          <FanGallery images={[m.image, m.third, m.inset]} />
        </div>
        <p className="mt-4 text-[11px] tracking-[0.14em] text-white/55 uppercase">{t("rendering")}</p>

        <ol className="mt-16 grid gap-4 sm:grid-cols-2 md:mt-24 md:gap-5 lg:grid-cols-4">
          {m.pillars.map((p, i) => (
            <li
              key={i}
              className="group rounded-[1.25rem] border border-white/10 p-6 transition-[transform,background-color,border-color] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1.5 hover:border-brass-light/40 hover:bg-white/[0.04] md:p-7"
              data-reveal
              data-delay={i * 0.1}
            >
              <span aria-hidden className="block h-px w-full origin-left bg-white/15">
                <span className="block h-px w-full origin-left scale-x-0 bg-brass-light transition-transform duration-[1400ms] ease-[var(--ease-out-expo)] group-[.is-revealed]:scale-x-100" />
              </span>
              <p className="mt-6 font-display text-4xl text-brass-light tnum">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-4 display-s text-white">{p.title}</h3>
              <p className="mt-3 max-w-[34ch] text-white/75">{p.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
