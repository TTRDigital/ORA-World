import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export function Breadcrumbs({ items, className, light }: { items: { name: string; href?: string }[]; className?: string; light?: boolean }) {
  return (
    <nav aria-label="Breadcrumb" className={cn("eyebrow flex flex-wrap items-center gap-3", light ? "text-white/70" : "text-fg-muted", className)}>
      {items.map((it, i) => (
        <span key={i} className="flex items-center gap-3">
          {i > 0 && <span aria-hidden className="h-px w-4 bg-current opacity-50" />}
          {it.href ? (
            <Link href={it.href} className="link-underline py-1">
              {it.name}
            </Link>
          ) : (
            <span aria-current="page" className={light ? "text-white" : "text-fg"}>
              {it.name}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
