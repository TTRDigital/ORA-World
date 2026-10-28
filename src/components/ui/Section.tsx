import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type Props = ComponentProps<"section"> & { tone?: "default" | "alt" | "surface" | "dark"; flush?: boolean };

export function Section({ tone = "default", flush, className, children, ...rest }: Props) {
  return (
    <section
      className={cn(
        !flush && "py-section",
        tone === "alt" && "bg-bg-alt",
        tone === "surface" && "bg-surface",
        tone === "dark" && "dark-section",
        className,
      )}
      {...rest}
    >
      {children}
    </section>
  );
}
