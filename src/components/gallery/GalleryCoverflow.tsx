"use client";

import { Carousel_001 } from "@/components/vendor/skiper-ui/skiper47";

/**
 * Skiper UI coverflow (Swiper) for the gallery opener: drag or swipe through the renders, the
 * centred one in front. Slides are restyled to the house frame (rounded, no border, taller).
 */
export function GalleryCoverflow({ images }: { images: { src: string; alt: string }[] }) {
  return (
    <div className="[&_.swiper-pagination-bullet-active]:!bg-accent [&_.swiper-slide]:!h-[300px] [&_.swiper-slide]:overflow-hidden [&_.swiper-slide]:rounded-[1.25rem] [&_.swiper-slide]:!border-0 md:[&_.swiper-slide]:!h-[440px]">
      <Carousel_001 images={images} showPagination loop autoplay className="!w-full" spaceBetween={24} />
    </div>
  );
}
