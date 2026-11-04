import { Instrument_Serif, Manrope } from "next/font/google";

/**
 * Display: Instrument Serif. A contemporary, moderately condensed serif with sturdy strokes, so large
 * headlines stay crisp and readable (the earlier Didone's hairlines broke up at screen sizes).
 */
export const display = Instrument_Serif({
  subsets: ["latin", "latin-ext"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-display",
  fallback: ["Georgia", "Times New Roman", "serif"],
});

export const sans = Manrope({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-sans",
});
