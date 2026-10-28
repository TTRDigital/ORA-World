import type { ComponentProps, ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "light" | "dark" | "text";

type Props<T extends ElementType> = {
  as?: T;
  variant?: Variant;
  className?: string;
  children: ReactNode;
  icon?: ReactNode;
} & Omit<ComponentProps<T>, "as" | "className" | "children">;

const styles: Record<Variant, string> = {
  primary: "border border-accent text-accent-ink hover:bg-accent hover:text-white",
  ghost: "border border-current hover:bg-fg hover:text-bg",
  light: "border border-white/70 text-white hover:bg-white hover:text-basalt",
  dark: "border border-basalt bg-basalt text-white hover:bg-transparent hover:text-fg",
  text: "border-0 px-0 py-2 link-underline",
};

/** Hairline button. Square corners, tracked uppercase label, magnetic on desktop via data-magnetic. */
export function Button<T extends ElementType = "button">({ as, variant = "primary", className, children, icon, ...rest }: Props<T>) {
  const Tag = (as ?? "button") as ElementType;
  return (
    <Tag
      data-magnetic
      className={cn(
        "eyebrow inline-flex cursor-pointer items-center justify-center gap-3 px-7 py-4 text-center transition-[background-color,color,border-color] duration-500 ease-[var(--ease-out-expo)]",
        styles[variant],
        className,
      )}
      {...rest}
    >
      <span>{children}</span>
      {icon}
    </Tag>
  );
}
