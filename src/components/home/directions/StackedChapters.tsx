import Image from "next/image";
import type { Chapter } from "@/content/types";
import type { Localized } from "@/lib/localize";
import { Accent } from "@/components/ui/Accent";
import { Eyebrow } from "@/components/ui/Eyebrow";

/**
 * Direction B: full-screen chapters that stack with sticky positioning, each new image
 * sliding over the previous one. Pure CSS, so it also works without JavaScript.
 */
export function StackedChapters({
  eyebrow,
  title,
  chapters,
}: {
  eyebrow: string;
  title: string;
  chapters: Localized<Chapter>[];
}) {
  return (
    <section className="dark-section">
      <div className="container-x py-section">
        <Eyebrow className="text-dark-accent">{eyebrow}</Eyebrow>
        <h2 className="mt-6 max-w-[16ch] display-l" data-reveal>
          <Accent text={title} className="text-dark-accent" />
        </h2>
      </div>
      <div className="relative">
        {chapters.map((c, i) => (
          <article key={c.number} className="sticky top-0 h-dvh overflow-hidden" style={{ zIndex: i + 1 }}>
            <div className="absolute inset-0">
              <Image
                src={c.image.src}
                alt={c.image.alt}
                fill
                sizes="100vw"
                className="object-cover"
                placeholder={c.image.blurDataURL ? "blur" : "empty"}
                blurDataURL={c.image.blurDataURL}
              />
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(to top, rgb(18 17 16 / .85), rgb(18 17 16 / .25) 50%, transparent)",
                }}
              />
            </div>
            <div className="relative container-x flex h-full flex-col justify-end pb-16 text-white md:pb-24">
              <span className="display-xl text-dark-accent/80 tnum">{c.number}</span>
              <h3 className="mt-2 display-l">{c.title}</h3>
              <p className="mt-4 max-w-[40ch] lead text-white/85">{c.text}</p>
              {c.image.placeholder && <p className="mt-4 eyebrow text-white/50">Placeholder image</p>}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
