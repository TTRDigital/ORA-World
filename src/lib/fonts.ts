import { Bodoni_Moda, Manrope } from "next/font/google";

export const display = Bodoni_Moda({
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  display: "swap",
  variable: "--font-display",
  adjustFontFallback: false,
  fallback: ["Bodoni MT", "Didot", "Times New Roman", "serif"],
});

export const sans = Manrope({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-sans",
});
