import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Eyebrow({ children, className, as: Tag = "p", rule = true }: { children: ReactNode; className?: string; as?: "p" | "span" | "h2" | "div"; rule?: boolean }) {
  return (
    <Tag className={cn("eyebrow flex items-center gap-4 text-accent-ink", className)}>
      {rule && <span aria-hidden className="h-px w-8 bg-current" />}
      <span>{children}</span>
    </Tag>
  );
}
