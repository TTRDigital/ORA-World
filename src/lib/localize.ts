import type { L, Locale } from "@/content/types";

type Localized<T> = T extends L
  ? string
  : T extends { en: string[]; es: string[] }
    ? string[]
    : T extends (infer U)[]
      ? Localized<U>[]
      : T extends object
        ? { [K in keyof T]: Localized<T[K]> }
        : T;

function isL(v: unknown): v is L | { en: string[]; es: string[] } {
  return (
    !!v &&
    typeof v === "object" &&
    !Array.isArray(v) &&
    "en" in (v as object) &&
    "es" in (v as object) &&
    Object.keys(v as object).length === 2
  );
}

/** Deep-resolve every { en, es } pair to the requested locale, falling back to English. */
export function localize<T>(value: T, locale: Locale): Localized<T> {
  if (isL(value)) {
    const picked = (value as Record<string, unknown>)[locale] ?? (value as Record<string, unknown>).en;
    return picked as Localized<T>;
  }
  if (Array.isArray(value)) return value.map((v) => localize(v, locale)) as Localized<T>;
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) out[k] = localize(v, locale);
    return out as Localized<T>;
  }
  return value as Localized<T>;
}

export type { Localized };
