import Image from "next/image";
import { useTranslations } from "next-intl";
import type { ImageRef } from "@/content/types";
import type { Localized } from "@/lib/localize";
import { cn } from "@/lib/utils";
import { parseAspect, scaleSizes } from "@/lib/sizes";

type Props = {
  image: Localized<ImageRef>;
  sizes: string;
  priority?: boolean;
  fill?: boolean;
  className?: string;
  imgClassName?: string;
  reveal?: boolean;
  parallax?: number;
  showCaption?: boolean;
  aspect?: string;
};

/**
 * next/image with the house rules: blur placeholder, "Artist's conceptual rendering" label,
 * placeholder badge for images awaiting client photography, optional reveal and parallax.
 */
export function Picture({
  image,
  sizes,
  priority,
  fill = true,
  className,
  imgClassName,
  reveal = true,
  parallax,
  showCaption = true,
  aspect,
}: Props) {
  const t = useTranslations("common");
  const label = image.rendering ? t("rendering") : image.placeholder ? t("placeholderImage") : image.caption;
  return (
    <figure
      className={cn("relative overflow-hidden rounded-[1.25rem] bg-travertine/50", className)}
      style={aspect ? { aspectRatio: aspect } : undefined}
      data-reveal={reveal ? "image" : undefined}
    >
      <div className={cn("absolute inset-0", parallax && "-inset-y-[4%]")} data-parallax={parallax || undefined}>
        <Image
          src={image.src}
          alt={image.alt}
          fill={fill}
          sizes={scaleSizes(sizes, image, parseAspect(aspect))}
          priority={priority}
          placeholder={image.blurDataURL ? "blur" : "empty"}
          blurDataURL={image.blurDataURL}
          className={cn(
            "object-cover transition-transform duration-[1400ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]",
            imgClassName,
          )}
          style={{ objectPosition: image.position }}
          data-reveal-inner
        />
      </div>
      {showCaption && label && (
        <figcaption className="pointer-events-none absolute bottom-3 left-3 z-[1] max-w-[70%] rounded-full bg-basalt/55 px-2.5 py-1 text-[10px] tracking-[0.14em] text-white uppercase backdrop-blur-sm">
          {label}
        </figcaption>
      )}
    </figure>
  );
}
