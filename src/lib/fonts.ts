import { Instrument_Serif, Manrope, Sora } from "next/font/google";

/** Headlines: Sora, a geometric sans set bold and tight, as on the Yard Vida reference. */
export const display = Sora({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600"],
  display: "swap",
  variable: "--font-display",
});

/** Accent words inside headlines (the *word* in a title) and big numerals: Instrument Serif italic. */
export const serif = Instrument_Serif({
  subsets: ["latin", "latin-ext"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-serif",
});

export const sans = Manrope({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-sans",
});
