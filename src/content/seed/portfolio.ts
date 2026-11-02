import type { L } from "../types";

export interface PortfolioItem {
  slug: string;
  name: string;
  tagline: L;
  /** Gold-ringed circular thumbnail from oraworld.com; null for the location still to be revealed. */
  thumb: string | null;
  /** Internal page when one exists. */
  href: string | null;
}

/** The ORA World portfolio exactly as listed on oraworld.com/our-residences/. */
export const portfolio: PortfolioItem[] = [
  {
    slug: "tesoro-del-mar",
    name: "Tesoro Del Mar",
    tagline: { en: "Harmony in modernity and nature", es: "Armonía entre modernidad y naturaleza" },
    thumb: "/images/portfolio/treasurepoint.webp",
    href: "/tesoro-del-mar",
  },
  {
    slug: "dorado-waterfalls",
    name: "Dorado Waterfalls",
    tagline: {
      en: "A sustainable community that harmonizes modern living with nature",
      es: "Una comunidad sostenible que armoniza la vida moderna con la naturaleza",
    },
    thumb: "/images/portfolio/doradowaterfalls.webp",
    href: "/projects/dorado-waterfalls",
  },
  {
    slug: "the-top",
    name: "The Top",
    tagline: { en: "Elevated elegance in harmony with nature", es: "Elegancia elevada en armonía con la naturaleza" },
    thumb: "/images/portfolio/thetop.webp",
    href: null,
  },
  {
    slug: "dorado-ocean-view-estates",
    name: "Dorado Ocean View Estates",
    tagline: {
      en: "Unparalleled comfort and style in a prestigious oceanfront location",
      es: "Confort y estilo sin igual en una prestigiosa ubicación frente al mar",
    },
    thumb: "/images/portfolio/doradooceanviewestates.webp",
    href: null,
  },
  {
    slug: "naguabo",
    name: "Naguabo",
    tagline: { en: "Futuristic living in a hidden bay", es: "Vida futurista en una bahía escondida" },
    thumb: "/images/portfolio/naguabo.webp",
    href: null,
  },
  {
    slug: "loiza-river-city",
    name: "Loíza River City",
    tagline: { en: "Cultural harmony in modern living", es: "Armonía cultural en la vida moderna" },
    thumb: "/images/portfolio/loizarivercity.webp",
    href: null,
  },
  {
    slug: "loiza-ocean",
    name: "Loíza Ocean",
    tagline: {
      en: "Where leisure meets luxury and entertainment",
      es: "Donde el ocio se une al lujo y al entretenimiento",
    },
    thumb: "/images/portfolio/loizaocean.webp",
    href: null,
  },
  {
    slug: "loiza-countryside-estates",
    name: "Loíza Countryside Estates",
    tagline: { en: "Sustainable living in harmony with nature", es: "Vida sostenible en armonía con la naturaleza" },
    thumb: "/images/portfolio/loizacountrysideestates.webp",
    href: null,
  },
  {
    slug: "guayama",
    name: "Guayama",
    tagline: { en: "Healthy living for optimal potential", es: "Vida saludable para un potencial óptimo" },
    thumb: "/images/portfolio/guayama.webp",
    href: null,
  },
  {
    slug: "costa-del-este-ceiba",
    name: "Costa del Este Ceiba",
    tagline: { en: "Anchored in coastal living", es: "Anclado en la vida costera" },
    thumb: "/images/portfolio/costadelesteceiba.webp",
    href: null,
  },
  {
    slug: "aquamaria",
    name: "Aquamaria",
    tagline: {
      en: "A premier oceanfront destination in San Juan",
      es: "Un destino frente al mar de primer nivel en San Juan",
    },
    thumb: "/images/portfolio/aquamaria.webp",
    href: null,
  },
  {
    slug: "to-be-revealed",
    name: "To be revealed",
    tagline: {
      en: "Another great oceanfront location is coming soon",
      es: "Otra gran ubicación frente al mar llegará pronto",
    },
    thumb: null,
    href: null,
  },
];
