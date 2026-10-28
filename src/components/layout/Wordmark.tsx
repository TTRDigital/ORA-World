import { cn } from "@/lib/utils";

/**
 * The ORA World wordmark, rendered through a CSS mask so it takes any color
 * (brass on dark, charcoal on bone) and can be animated by the preloader.
 */
export function Wordmark({ className, title = "ORA World" }: { className?: string; title?: string }) {
  return (
    <span
      role="img"
      aria-label={title}
      className={cn("inline-block aspect-[1426/779] bg-current", className)}
      style={{
        WebkitMaskImage: "url(/brand/wordmark.svg)",
        maskImage: "url(/brand/wordmark.svg)",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskSize: "contain",
        maskSize: "contain",
      }}
    />
  );
}
