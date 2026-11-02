import Image from "next/image";
import type { HomeContent } from "@/content/types";
import type { Localized } from "@/lib/localize";
import { Link } from "@/i18n/navigation";
import { Accent } from "@/components/ui/Accent";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ArrowIcon } from "@/components/ui/Icons";

/** Three-step path (discover, choose, arrive): numbered image cards that lead into the site. */
export function Journey({ block }: { block: Localized<HomeContent["journey"]> }) {
  return (
    <section className="py-section" aria-labelledby="journey-title">
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Eyebrow>{block.eyebrow}</Eyebrow>
            <h2 id="journey-title" className="mt-6 display-l" data-reveal>
              <Accent text={block.title} />
            </h2>
          </div>
          <ol className="flex items-center gap-2" aria-hidden>
            {block.steps.map((_, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="grid h-9 w-9 place-items-center rounded-full border border-rule eyebrow tnum">
                  0{i + 1}
                </span>
                {i < block.steps.length - 1 && <span className="h-px w-8 bg-rule md:w-14" />}
              </li>
            ))}
          </ol>
        </div>

        <ol className="mt-14 grid gap-6 md:mt-20 md:grid-cols-3 md:gap-8">
          {block.steps.map((s, i) => {
            const external = s.href.startsWith("#");
            const inner = (
              <>
                <span className="relative block aspect-[4/5] overflow-hidden bg-bg-alt">
                  <Image
                    src={s.image.src}
                    alt={s.image.alt}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    placeholder={s.image.blurDataURL ? "blur" : "empty"}
                    blurDataURL={s.image.blurDataURL}
                    className="object-cover transition-transform duration-[1400ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.05]"
                    style={{ objectPosition: s.image.position }}
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-basalt/70 via-basalt/0 to-basalt/0" />
                  <span className="absolute top-4 left-4 rounded-full bg-bone/95 px-3 py-1.5 eyebrow text-basalt tnum">
                    {`0${i + 1}`}
                  </span>
                  <span className="absolute right-5 bottom-5 left-5 flex items-end justify-between gap-4 text-white">
                    <span className="display-s">{s.title}</span>
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/60 transition-colors duration-500 group-hover:border-white group-hover:bg-white group-hover:text-basalt">
                      <ArrowIcon />
                    </span>
                  </span>
                </span>
                <span className="mt-5 block max-w-[38ch] text-fg-muted">{s.text}</span>
                <span className="mt-4 inline-block link-underline eyebrow text-accent-ink">{s.cta}</span>
              </>
            );
            return (
              <li
                key={i}
                className={i === 1 ? "md:mt-16" : i === 2 ? "md:mt-32" : ""}
                data-reveal
                data-delay={i * 0.12}
              >
                {external ? (
                  <a href={s.href} className="group block">
                    {inner}
                  </a>
                ) : (
                  <Link href={s.href} className="group block">
                    {inner}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
