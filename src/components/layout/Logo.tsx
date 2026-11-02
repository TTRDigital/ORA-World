import Image from "next/image";
import gold from "../../../public/brand/ora-world-logo-gold.png";
import white from "../../../public/brand/ora-world-logo-white.png";
import { cn } from "@/lib/utils";

type Props = {
  /** gold: the official logo for light grounds and dark sections; white: over imagery and video. */
  tone?: "gold" | "white";
  className?: string;
  priority?: boolean;
  sizes?: string;
};

/**
 * ORA World's official logo (tree-of-life emblem, ORA WORLD, PUERTO RICO), as published on oraworld.com in 2026.
 * Both tones share one aspect ratio (1.42:1), so they can swap without layout shift.
 */
export function Logo({ tone = "gold", className, priority, sizes = "120px" }: Props) {
  return (
    <Image
      src={tone === "white" ? white : gold}
      alt="ORA World · Puerto Rico"
      priority={priority}
      sizes={sizes}
      className={cn("h-auto w-auto select-none", className)}
      draggable={false}
    />
  );
}
