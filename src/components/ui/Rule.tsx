import { cn } from "@/lib/utils";
export function Rule({ className }: { className?: string }) {
  return <hr aria-hidden className={cn("border-0 border-t border-rule", className)} />;
}
