import type { Collection, FloorPlan } from "../types";
import { renders, tdm, book } from "./images";

/**
 * Residence collections, per the Tesoro Del Mar brochure: Phase One has 60 residences (2 to 6
 * bedrooms) and one penthouse; sizes and prices are not public.
 * Every numeric field stays null (shown as a placeholder) until the client confirms.
 */
export const collections: Collection[] = [
  {
    slug: "residences",
    name: { en: "The Residences", es: "Las Residencias" },
    tagline: {
      en: "60 residences, 2 to 6 bedrooms, each with panoramic ocean views",
      es: "60 residencias de 2 a 6 dormitorios, todas con vistas panorámicas al mar",
    },
    // Brochure: "Inspired by Flight", "The Building", "Inspired Living Spaces", "Elevated Kitchens".
    description: {
      en: [
        "Curved towers arc like wings, spacious balconies stretch outward toward the expanse of endless blue, and glass facades dissolve the boundary between home and horizon. The residences at Tesoro del Mar are designed for indoor / outdoor living, welcoming the salt air and breathing with the ocean's breeze.",
        "Elegant finishes from custom Italian cabinetry and porcelain tiles to fully integrated smart home technology and premium Gaggenau appliances elevate the every day, making space for what matters most.",
      ],
      es: [
        "Las torres curvas se arquean como alas, los amplios balcones se extienden hacia el azul infinito y las fachadas de cristal borran el límite entre el hogar y el horizonte. Las residencias de Tesoro del Mar están pensadas para vivir dentro y fuera, recibiendo el aire salino y la brisa del océano.",
        "Acabados elegantes, desde gabinetes italianos a medida y pisos de porcelanato hasta tecnología de hogar inteligente integrada y electrodomésticos Gaggenau, elevan lo cotidiano y dejan espacio para lo que más importa.",
      ],
    },
    bedrooms: "2–6",
    sizeRange: null,
    fromPrice: null,
    image: book.livingDining,
    hoverImage: book.bedroomOcean,
    features: [
      {
        en: "Balconies and wraparound terraces for indoor / outdoor living",
        es: "Balcones y terrazas envolventes para vivir dentro y fuera",
      },
      {
        en: "Panoramic ocean views through an expansive glass façade",
        es: "Vistas panorámicas al mar a través de una amplia fachada de cristal",
      },
      {
        en: "Thoughtfully designed layouts ideal for luxury living and entertaining",
        es: "Distribuciones pensadas para vivir con lujo y recibir",
      },
    ],
    finishes: [
      {
        group: { en: "Inspired living spaces", es: "Espacios de vida" },
        items: [
          { en: "Large-format porcelain tile flooring throughout", es: "Pisos de porcelanato de gran formato" },
          { en: "Motorized window shades in every room", es: "Cortinas motorizadas en cada habitación" },
          { en: "Mitsubishi Electric multi-split air", es: "Aire acondicionado multi-split Mitsubishi Electric" },
          { en: "Walk-in closets with custom built-ins", es: "Vestidores con muebles a medida" },
          {
            en: "Integrated smart home technology, pre-wired for high-speed Wi-Fi",
            es: "Tecnología de hogar inteligente integrada, precableado para Wi-Fi de alta velocidad",
          },
        ],
      },
      {
        group: { en: "Elevated kitchens", es: "Cocinas" },
        items: [
          { en: "Gourmet kitchen with custom Italian cabinetry", es: "Cocina gourmet con gabinetes italianos a medida" },
          { en: "Quartzite countertops and backsplashes", es: "Encimeras y salpicaderos de cuarcita" },
          {
            en: "Gaggenau refrigerator and freezer, convection oven, dishwasher and built-in coffee machine",
            es: "Refrigerador y congelador, horno de convección, lavavajillas y cafetera integrada Gaggenau",
          },
          { en: "Optional Fisher & Paykel wine refrigerator", es: "Vinoteca Fisher & Paykel opcional" },
        ],
      },
    ],
    placeholder: true,
  },
  {
    slug: "penthouses",
    name: { en: "The Penthouses", es: "Los Penthouses" },
    tagline: { en: "Panoramic living above the Atlantic", es: "Vida panorámica sobre el Atlántico" },
    description: {
      en: [
        "Expansive windows frame sweeping views and bathe the interiors in natural light. Generous living spaces for entertaining, intimate alcoves for retreat, and a private suite with ocean or garden views.",
      ],
      es: [
        "Amplios ventanales enmarcan vistas panorámicas y bañan los interiores de luz natural. Generosos espacios para recibir, rincones íntimos para el retiro y una suite privada con vistas al mar o al jardín.",
      ],
    },
    bedrooms: null,
    sizeRange: null,
    fromPrice: null,
    image: book.penthouseLiving,
    hoverImage: book.penthousePiano,
    features: [
      {
        en: "Full-floor and half-floor layouts, to be confirmed",
        es: "Distribuciones de planta completa y media planta, por confirmar",
      },
      { en: "Wrap-around terraces", es: "Terrazas envolventes" },
    ],
    finishes: [],
    placeholder: true,
  },
];

/**
 * Illustrative floor plans. No plans are public, so these are schematic placeholders
 * (SVG line drawings in /images/plans) that exercise the filters, gate, comparison and keyplan.
 */
const plan = (
  p: Omit<FloorPlan, "image" | "keyplan" | "keyplanPosition" | "pdf" | "placeholder"> & {
    kp: [number, number, number, number];
  },
): FloorPlan => ({
  ...p,
  image: {
    src: `/images/plans/${p.slug}.svg`,
    width: 1200,
    height: 900,
    alt: { en: `Illustrative floor plan ${p.name.en}`, es: `Plano ilustrativo ${p.name.es}` },
    placeholder: true,
  },
  keyplan: {
    src: `/images/plans/keyplan.svg`,
    width: 800,
    height: 800,
    alt: { en: "Keyplan of the building level", es: "Plano clave del nivel" },
    placeholder: true,
  },
  keyplanPosition: { x: p.kp[0], y: p.kp[1], w: p.kp[2], h: p.kp[3] },
  pdf: null,
  placeholder: true,
});

export const floorPlans: FloorPlan[] = [
  plan({
    slug: "residence-a1",
    name: { en: "Residence A1", es: "Residencia A1" },
    collection: "residences",
    bedrooms: 1,
    bathrooms: 1.5,
    interiorSqFt: null,
    exteriorSqFt: null,
    orientation: "N",
    view: { en: "Ocean", es: "Mar" },
    tower: "Tower I",
    floors: null,
    status: "available",
    fromPrice: null,
    highlights: [
      { en: "Corner exposure", es: "Esquina" },
      { en: "Terrace off the living room", es: "Terraza desde la sala" },
    ],
    kp: [8, 10, 28, 32],
  }),
  plan({
    slug: "residence-b1",
    name: { en: "Residence B1", es: "Residencia B1" },
    collection: "residences",
    bedrooms: 2,
    bathrooms: 2,
    interiorSqFt: null,
    exteriorSqFt: null,
    orientation: "NE",
    view: { en: "Ocean and garden", es: "Mar y jardín" },
    tower: "Tower I",
    floors: null,
    status: "available",
    fromPrice: null,
    highlights: [{ en: "Split-bedroom layout", es: "Habitaciones separadas" }],
    kp: [38, 10, 30, 32],
  }),
  plan({
    slug: "residence-b2",
    name: { en: "Residence B2", es: "Residencia B2" },
    collection: "residences",
    bedrooms: 2,
    bathrooms: 2.5,
    interiorSqFt: null,
    exteriorSqFt: null,
    orientation: "S",
    view: { en: "Garden and mountains", es: "Jardín y montañas" },
    tower: "Tower II",
    floors: null,
    status: "reserved",
    fromPrice: null,
    highlights: [{ en: "Den convertible to study", es: "Estudio convertible" }],
    kp: [70, 10, 22, 32],
  }),
  plan({
    slug: "residence-c1",
    name: { en: "Residence C1", es: "Residencia C1" },
    collection: "residences",
    bedrooms: 3,
    bathrooms: 3.5,
    interiorSqFt: null,
    exteriorSqFt: null,
    orientation: "NW",
    view: { en: "Ocean", es: "Mar" },
    tower: "Tower II",
    floors: null,
    status: "available",
    fromPrice: null,
    highlights: [
      { en: "Two terraces", es: "Dos terrazas" },
      { en: "Private elevator landing, to be confirmed", es: "Vestíbulo privado de ascensor, por confirmar" },
    ],
    kp: [8, 56, 40, 34],
  }),
  plan({
    slug: "penthouse-ph1",
    name: { en: "Penthouse PH1", es: "Penthouse PH1" },
    collection: "penthouses",
    bedrooms: 4,
    bathrooms: 5.5,
    interiorSqFt: null,
    exteriorSqFt: null,
    orientation: "N",
    view: { en: "Panoramic ocean", es: "Mar panorámico" },
    tower: "Tower I",
    floors: null,
    status: "available",
    fromPrice: null,
    highlights: [
      { en: "Wrap-around terrace", es: "Terraza envolvente" },
      { en: "Full floor", es: "Planta completa" },
    ],
    kp: [8, 10, 84, 80],
  }),
];
