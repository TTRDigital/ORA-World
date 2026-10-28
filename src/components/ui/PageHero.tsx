import Image from "next/image";
import type { ImageRef } from "@/content/types";
import type { Localized } from "@/lib/localize";
import { Accent } from "./Accent";
import { SplitLines } from "./SplitLines";
import { Eyebrow } from "./Eyebrow";
import { cn } from "@/lib/utils";

type Props = { eyebrow?: string; title: string; intro?: string; image?: Localized<ImageRef> | null; compact?: boolean; children?: React.ReactNode };

/**
 * Inner-page opener. With an image: full-bleed, dark scrim, light header. Without: typographic on bone,
 * headline left, intro right, hairline underneath.
 */
export function PageHero({ eyebrow, title, intro, image, compact, children }: Props) {
  if (image) {
    return (
      <section data-hero className={cn("relative flex flex-col justify-end text-white", compact ? "min-h-[60vh]" : "min-h-[82vh]")}>
        <div className="absolute inset-0 overflow-hidden bg-basalt">
          <div className="absolute -inset-y-[6%] inset-x-0" data-parallax="0.05">
            <Image src={image.src} alt={image.alt} fill priority sizes="100vw" className="object-cover" placeholder={image.blurDataURL ? "blur" : "empty"} blurDataURL={image.blurDataURL} />
          </div>
          <div className="scrim-bottom absolute inset-0" />
          <div className="scrim-top absolute inset-x-0 top-0 h-40" />
        </div>
        <div className="container-x relative grid grid-cols-12 gap-x-6 pt-[calc(var(--header-h)+4rem)] pb-14 md:pb-20">
          <div className="col-span-12 md:col-span-8">
            {eyebrow && <p className="eyebrow mb-6 text-brass-light" data-reveal>{eyebrow}</p>}
            <SplitLines as="h1" className="display-xl text-white">
              <Accent text={title} className="text-brass-light" />
            </SplitLines>
          </div>
          {intro && (
            <p className="lead col-span-12 mt-8 max-w-[44ch] text-white/85 md:col-span-5 md:col-start-8 md:self-end md:mt-0" data-reveal data-delay="0.2">
              {intro}
            </p>
          )}
          {children}
        </div>
        {image.rendering && <p className="absolute right-[var(--gutter)] bottom-4 text-[10px] tracking-[0.14em] text-white/70 uppercase">Artist&apos;s conceptual rendering</p>}
      </section>
    );
  }
  return (
    <section className="container-x border-b border-rule pt-[calc(var(--header-h)+4rem)] pb-14 md:pt-[calc(var(--header-h)+7rem)] md:pb-20">
      <div className="grid grid-cols-12 gap-x-6">
        <div className="col-span-12 md:col-span-7">
          {eyebrow && <Eyebrow className="mb-6">{eyebrow}</Eyebrow>}
          <SplitLines as="h1" className="display-xl">
            <Accent text={title} />
          </SplitLines>
        </div>
        {intro && (
          <p className="lead col-span-12 mt-8 max-w-[44ch] text-fg-muted md:col-span-4 md:col-start-9 md:self-end md:mt-0" data-reveal>
            {intro}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
