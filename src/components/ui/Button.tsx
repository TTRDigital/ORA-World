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
  primary: "rounded-full bg-brass-ink text-white shadow-[0_10px_30px_-12px_rgba(104,77,37,.6)] hover:bg-basalt",
  ghost: "rounded-full border border-current hover:bg-fg hover:text-bg",
  light: "rounded-full bg-white text-basalt hover:bg-brass-light",
  dark: "rounded-full bg-basalt text-white shadow-[0_10px_30px_-14px_rgba(0,0,0,.6)] hover:bg-accent-ink",
  text: "border-0 px-0 py-2 link-underline",
};

/** Pill button with a soft shadow, tracked uppercase label, magnetic on desktop via data-magnetic. */
export function Button<T extends ElementType = "button">({
  as,
  variant = "primary",
  className,
  children,
  icon,
  ...rest
}: Props<T>) {
  const Tag = (as ?? "button") as ElementType;
  return (
    <Tag
      data-magnetic
      className={cn(
        "inline-flex min-h-12 cursor-pointer items-center justify-center gap-3 px-7 py-3.5 text-center eyebrow transition-[background-color,color,border-color,transform] duration-500 ease-[var(--ease-out-expo)] active:scale-[.98]",
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
