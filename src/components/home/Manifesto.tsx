import Image from "next/image";
import { getTranslations } from "next-intl/server";
import type { HomeContent } from "@/content/types";
import type { Localized } from "@/lib/localize";
import { Accent } from "@/components/ui/Accent";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ScrollHighlight } from "@/components/ui/ScrollHighlight";

/**
 * Mission: a layered render collage with a rotating seal on one side; on the other the headline,
 * the mission statement brightening word by word as it scrolls, and four numbered commitments.
 */
export async function Manifesto({ manifesto: m }: { manifesto: Localized<HomeContent["manifesto"]> }) {
  const t = await getTranslations("common");
  const seal = `${m.signature} · `;
  return (
    <section className="overflow-hidden py-section" aria-labelledby="mission-title">
      <div className="container-x grid grid-cols-12 gap-x-6 gap-y-14">
        {/* Collage */}
        <div className="relative col-span-12 lg:col-span-5">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
            <figure
              className="relative aspect-[4/3] overflow-hidden sm:aspect-[5/4] lg:aspect-[4/5]"
              data-reveal="image"
            >
              <Image
                src={m.image.src}
                alt={m.image.alt}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                placeholder={m.image.blurDataURL ? "blur" : "empty"}
                blurDataURL={m.image.blurDataURL}
                className="object-cover"
                style={{ objectPosition: m.image.position }}
                data-reveal-inner
              />
              <figcaption className="absolute top-3 right-3 text-[10px] tracking-[0.14em] text-white/85 uppercase">
                {t("rendering")}
              </figcaption>
            </figure>
            <div
              className="absolute right-0 -bottom-10 w-[42%] border-[6px] border-bg shadow-[0_30px_60px_-30px_rgba(0,0,0,.45)] lg:-right-10"
              data-reveal
              data-delay="0.2"
            >
              <span className="relative block aspect-[3/4]">
                <Image
                  src={m.inset.src}
                  alt={m.inset.alt}
                  fill
                  sizes="220px"
                  className="object-cover"
                  style={{ objectPosition: m.inset.position }}
                />
              </span>
            </div>
            <div
              aria-hidden
              className="absolute -top-8 -left-4 grid h-32 w-32 place-items-center rounded-full bg-bg text-accent-ink shadow-sm md:h-36 md:w-36"
            >
              <svg
                viewBox="0 0 100 100"
                className="absolute inset-0 h-full w-full motion-safe:animate-[spin_28s_linear_infinite]"
              >
                <defs>
                  <path id="mission-seal" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
                </defs>
                <text className="fill-current text-[7px] uppercase">
                  <textPath href="#mission-seal" textLength="236" lengthAdjust="spacing">
                    {seal}
                  </textPath>
                </text>
              </svg>
              <span className="font-display text-2xl tracking-[0.08em]">ORA</span>
            </div>
          </div>
        </div>

        {/* Statement */}
        <div className="col-span-12 lg:col-span-6 lg:col-start-7 lg:pt-6">
          <Eyebrow>{m.eyebrow}</Eyebrow>
          <h2 id="mission-title" className="mt-6 display-l" data-reveal>
            <Accent text={m.title} />
          </h2>
          <ScrollHighlight
            text={m.text}
            className="mt-10 max-w-[38ch] font-display text-[clamp(1.35rem,1.1rem+0.9vw,1.9rem)] leading-[1.35]"
          />
          <ol className="mt-14 grid gap-px border border-rule bg-rule sm:grid-cols-2">
            {m.pillars.map((p, i) => (
              <li
                key={i}
                className="group bg-bg p-6 transition-colors duration-500 hover:bg-bg-alt md:p-8"
                data-reveal
                data-delay={i * 0.08}
              >
                <span className="grid h-9 w-9 place-items-center rounded-full border border-accent eyebrow text-accent-ink tnum transition-colors duration-500 group-hover:bg-accent group-hover:text-white">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-6 display-s">{p.title}</h3>
                <p className="mt-3 small text-fg-muted">{p.text}</p>
              </li>
            ))}
          </ol>
          <p className="mt-10 flex items-center gap-4 eyebrow text-accent-ink" data-reveal>
            <span aria-hidden className="h-px w-10 bg-current" />
            {m.signature}
          </p>
        </div>
      </div>
    </section>
  );
}
