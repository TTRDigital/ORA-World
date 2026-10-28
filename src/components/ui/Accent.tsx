import { Fragment } from "react";

/**
 * Renders "Beyond *expectations*" with the starred word in italic.
 * Use for every headline that carries the one-accent-word device.
 */
export function Accent({ text, className }: { text: string; className?: string }) {
  const parts = text.split(/(\*[^*]+\*)/g).filter(Boolean);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith("*") && p.endsWith("*") ? (
          <em key={i} className={className ?? "text-accent-ink"}>
            {p.slice(1, -1)}
          </em>
        ) : (
          <Fragment key={i}>{p}</Fragment>
        ),
      )}
    </>
  );
}
