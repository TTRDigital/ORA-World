import Image from "next/image";
import { useTranslations } from "next-intl";
import type { ImageRef } from "@/content/types";
import type { Localized } from "@/lib/localize";
import { cn } from "@/lib/utils";

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
export function Picture({ image, sizes, priority, fill = true, className, imgClassName, reveal = true, parallax, showCaption = true, aspect }: Props) {
  const t = useTranslations("common");
  const label = image.rendering ? t("rendering") : image.placeholder ? t("placeholderImage") : image.caption;
  return (
    <figure
      className={cn("relative overflow-hidden", className)}
      style={aspect ? { aspectRatio: aspect } : undefined}
      data-reveal={reveal ? "image" : undefined}
    >
      <div className={cn("absolute inset-0", parallax && "-inset-y-[8%]")} data-parallax={parallax || undefined}>
        <Image
          src={image.src}
          alt={image.alt}
          fill={fill}
          sizes={sizes}
          priority={priority}
          placeholder={image.blurDataURL ? "blur" : "empty"}
          blurDataURL={image.blurDataURL}
          className={cn("object-cover", imgClassName)}
          data-reveal-inner
        />
      </div>
      {showCaption && label && (
        <figcaption className="pointer-events-none absolute bottom-3 left-3 z-[1] max-w-[70%] text-[10px] tracking-[0.14em] text-white/85 uppercase mix-blend-difference">
          {label}
        </figcaption>
      )}
    </figure>
  );
}
