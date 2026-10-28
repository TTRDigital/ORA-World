"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import type { HomeContent } from "@/content/types";
import type { Localized } from "@/lib/localize";
import { Link } from "@/i18n/navigation";
import { Accent } from "@/components/ui/Accent";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";

/**
 * Signature moment: split screen. Left, an SVG line drawing of the tower draws itself as you scroll,
 * with callouts for glazing, seismic base, backup power and security. Right, counters and the feature list.
 */
export function ResilienceSignature({ block }: { block: Localized<HomeContent["resilience"]> }) {
  const t = useTranslations("common");
  const h = useTranslations("home");
  const svg = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const el = svg.current;
    if (!el) return;
    const paths = Array.from(el.querySelectorAll<SVGPathElement | SVGLineElement | SVGRectElement | SVGCircleElement>("[data-draw]"));
    if (document.documentElement.classList.contains("reduced-motion")) return;
    paths.forEach((p) => {
      const len = (p as SVGGeometryElement).getTotalLength?.() ?? 400;
      p.style.strokeDasharray = `${len}`;
      p.style.strokeDashoffset = `${len}`;
    });
    let kill: (() => void) | undefined;
    import("@/lib/gsap").then(({ gsap }) => {
      const tween = gsap.to(paths, {
        strokeDashoffset: 0,
        ease: "none",
        stagger: 0.04,
        scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 45%", scrub: 0.6 },
      });
      kill = () => tween.kill();
    });
    return () => kill?.();
  }, []);

  const callouts = block.features.slice(0, 4);

  return (
    <section className="dark-section py-section" aria-labelledby="resilience-title">
      <div className="container-x grid grid-cols-12 gap-x-6 gap-y-16">
        <div className="col-span-12 lg:col-span-6">
          <div className="lg:sticky lg:top-28">
            <svg ref={svg} viewBox="0 0 800 720" className="w-full max-w-[640px] text-dark-accent" role="img" aria-label="Line drawing of the tower showing hurricane-rated glazing, seismic base isolation, backup power and secured perimeter">
              <g fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
                {/* ground and seismic base */}
                <line data-draw x1="40" y1="640" x2="560" y2="640" />
                <path data-draw d="M150 640 q15 -28 30 0 q15 -28 30 0 q15 -28 30 0 q15 -28 30 0 q15 -28 30 0 q15 -28 30 0 q15 -28 30 0 q15 -28 30 0 q15 -28 30 0" />
                <rect data-draw x="150" y="596" width="300" height="16" />
                {/* tower body: curved slabs */}
                {Array.from({ length: 16 }).map((_, i) => {
                  const y = 580 - i * 32;
                  const w = 300 + Math.sin(i * 0.8) * 26;
                  const x = 300 - w / 2;
                  return <path key={i} data-draw d={`M${x} ${y} C ${x + w * 0.25} ${y - 10}, ${x + w * 0.75} ${y - 10}, ${x + w} ${y}`} />;
                })}
                <path data-draw d="M160 584 C 150 400, 150 240, 190 68" />
                <path data-draw d="M440 584 C 450 400, 450 240, 410 68" />
                <path data-draw d="M190 68 C 240 56, 360 56, 410 68" />
                {/* glazing fins */}
                {Array.from({ length: 9 }).map((_, i) => (
                  <line key={`f${i}`} data-draw x1={200 + i * 25} y1="90" x2={200 + i * 25} y2="580" strokeOpacity="0.45" />
                ))}
                {/* rooftop solar */}
                <path data-draw d="M230 56 l20 -18 h110 l20 18" />
                <line data-draw x1="262" y1="44" x2="262" y2="56" />
                <line data-draw x1="300" y1="42" x2="300" y2="56" />
                <line data-draw x1="338" y1="44" x2="338" y2="56" />
                {/* generator + battery */}
                <rect data-draw x="470" y="560" width="70" height="36" />
                <line data-draw x1="480" y1="578" x2="530" y2="578" />
                <line data-draw x1="505" y1="568" x2="505" y2="588" />
                {/* perimeter */}
                <path data-draw d="M60 660 h480" strokeDasharray="4 6" />
                <circle data-draw cx="60" cy="660" r="4" />
                <circle data-draw cx="540" cy="660" r="4" />
                {/* callout leaders */}
                <line data-draw x1="410" y1="150" x2="560" y2="150" strokeOpacity="0.6" />
                <line data-draw x1="540" y1="578" x2="560" y2="520" strokeOpacity="0.6" />
                <line data-draw x1="338" y1="44" x2="560" y2="30" strokeOpacity="0.6" />
                <line data-draw x1="540" y1="660" x2="560" y2="700" strokeOpacity="0.6" />
              </g>
              <g className="fill-current text-dark-fg" fontSize="11" letterSpacing="2" fontFamily="var(--font-sans)">
                <text x="568" y="34">{block.features.find((f) => f.slug === "power")?.title?.toUpperCase().slice(0, 30)}</text>
                <text x="568" y="154">{callouts[0]?.title?.toUpperCase().slice(0, 30)}</text>
                <text x="568" y="516">{callouts[1]?.title?.toUpperCase().slice(0, 30)}</text>
                <text x="568" y="704">{callouts[2]?.title?.toUpperCase().slice(0, 30)}</text>
              </g>
            </svg>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-5 lg:col-start-8">
          <Eyebrow className="text-dark-accent">{block.eyebrow}</Eyebrow>
          <h2 id="resilience-title" className="display-l mt-6" data-reveal>
            <Accent text={block.title} className="text-dark-accent" />
          </h2>
          <p className="lead mt-6 max-w-[44ch] text-dark-fg/80" data-reveal>
            {block.intro}
          </p>

          <dl className="mt-12 grid grid-cols-3 gap-6 border-y border-dark-rule py-8">
            {block.counters.map((c, i) => (
              <div key={i}>
                <dd className="stat text-dark-fg">
                  <span data-counter={c.value ?? 0} data-prefix={c.prefix || ""} data-suffix={c.suffix || ""}>
                    {c.prefix}
                    {c.value}
                    {c.suffix}
                  </span>
                </dd>
                <dt className="eyebrow mt-3 text-dark-fg/65">
                  {c.label}
                  {c.placeholder && <span className="ml-1 text-dark-accent/70">· {h("toBeConfirmed")}</span>}
                </dt>
              </div>
            ))}
          </dl>

          <ul className="mt-10 divide-y divide-dark-rule">
            {block.features.slice(0, 6).map((f, i) => (
              <li key={f.slug} className="grid grid-cols-[2.5rem_1fr] gap-4 py-5" data-reveal data-delay={i * 0.06}>
                <span className="eyebrow tnum pt-1 text-dark-accent">0{i + 1}</span>
                <div>
                  <h3 className="display-s">{f.title}</h3>
                  <p className="small mt-2 text-dark-fg/70">{f.points[0]}</p>
                </div>
              </li>
            ))}
          </ul>
          <Button as={Link} href="/resilience" variant="ghost" className="mt-10 text-dark-fg">
            {t("learnMore")}
          </Button>
        </div>
      </div>
    </section>
  );
}
