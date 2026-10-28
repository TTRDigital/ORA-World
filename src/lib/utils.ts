import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export const isProd = process.env.NEXT_PUBLIC_SITE_ENV === "production";
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");

/** Pick an attribute for a tel: link: digits and leading + only. */
export function telHref(phone?: string | null) {
  if (!phone) return undefined;
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

export function whatsappHref(number?: string | null, text?: string) {
  if (!number) return undefined;
  const digits = number.replace(/\D/g, "");
  const q = text ? `?text=${encodeURIComponent(text)}` : "";
  return `https://wa.me/${digits}${q}`;
}
