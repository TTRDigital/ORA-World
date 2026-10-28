import type { Collection, FloorPlan } from "../types";
import { renders, lifestyle } from "./images";

/**
 * Residence collections. Tesoro Del Mar publishes "contemporary apartments and luxurious villas"
 * plus 42 hotel suites and a penthouse render; bedroom counts, sizes and prices are not public.
 * Every numeric field stays null (shown as a placeholder) until the client confirms.
 */
export const collections: Collection[] = [
  {
    slug: "residences",
    name: { en: "The Residences", es: "Las Residencias" },
    tagline: {
      en: "Contemporary apartments with ocean and garden views",
      es: "Apartamentos contemporáneos con vistas al mar y a los jardines",
    },
    description: {
      en: [
        "Open-concept layouts that encourage flow and connection. Floor-to-ceiling windows invite the outdoors in, filling each space with light, views and serenity.",
        "Organic materials, clean lines and curated finishes echo the natural surroundings while delivering effortless luxury and comfort.",
      ],
      es: [
        "Distribuciones abiertas que invitan al flujo y la conexión. Ventanales de piso a techo traen el exterior adentro y llenan cada espacio de luz, vistas y serenidad.",
        "Materiales orgánicos, líneas limpias y acabados seleccionados hacen eco del entorno natural con un lujo y una comodidad sin esfuerzo.",
      ],
    },
    bedrooms: null,
    sizeRange: null,
    fromPrice: null,
    image: renders.tdmExterior,
    hoverImage: renders.towerDetail,
    features: [
      {
        en: "Private terraces that become daily sanctuaries",
        es: "Terrazas privadas que se convierten en santuarios diarios",
      },
      {
        en: "Ocean or garden views from every principal room",
        es: "Vistas al mar o al jardín desde cada estancia principal",
      },
      { en: "Open-concept living and dining", es: "Sala y comedor de concepto abierto" },
    ],
    finishes: [
      {
        group: { en: "Living spaces", es: "Espacios de estar" },
        items: [
          { en: "Floor-to-ceiling glazing", es: "Acristalamiento de piso a techo" },
          { en: "Stone, wood and brushed metals", es: "Piedra, madera y metales cepillados" },
          { en: "Eco-friendly finishes", es: "Acabados ecológicos" },
        ],
      },
      {
        group: { en: "Kitchens and baths", es: "Cocinas y baños" },
        items: [
          { en: "Custom cabinetry [[PLACEHOLDER: brand]]", es: "Gabinetes a medida [[PROVISIONAL: marca]]" },
          { en: "Premium appliances [[PLACEHOLDER: brand]]", es: "Electrodomésticos premium [[PROVISIONAL: marca]]" },
          { en: "Natural stone surfaces", es: "Superficies de piedra natural" },
        ],
      },
    ],
    placeholder: true,
  },
  {
    slug: "villas",
    name: { en: "The Villas", es: "Las Villas" },
    tagline: { en: "Luxurious villas within the landscape", es: "Villas de lujo integradas en el paisaje" },
    description: {
      en: [
        "Private villas landscaped with native plants and flowers, with cantilevered terraces that extend outward like wings and reflecting pools that foster tranquility.",
      ],
      es: [
        "Villas privadas ajardinadas con plantas y flores nativas, con terrazas en voladizo que se extienden como alas y espejos de agua que invitan a la calma.",
      ],
    },
    bedrooms: null,
    sizeRange: null,
    fromPrice: null,
    image: renders.poolTerrace,
    hoverImage: renders.naguabo,
    features: [
      { en: "Private pool and garden", es: "Piscina y jardín privados" },
      { en: "Natural ventilation and daylight by design", es: "Ventilación natural y luz de día por diseño" },
    ],
    finishes: [],
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
    image: renders.tdmPenthouse,
    hoverImage: renders.towerDetail,
    features: [
      {
        en: "Full-floor and half-floor layouts [[PLACEHOLDER]]",
        es: "Distribuciones de planta completa y media planta [[PROVISIONAL]]",
      },
      { en: "Wrap-around terraces", es: "Terrazas envolventes" },
    ],
    finishes: [],
    placeholder: true,
  },
  {
    slug: "hotel-suites",
    name: { en: "Hotel Suites", es: "Suites de hotel" },
    tagline: {
      en: "42 suites in the boutique hotel at the community hub",
      es: "42 suites en el hotel boutique del centro de la comunidad",
    },
    description: {
      en: [
        "The community hub includes a state-of-the-art clubhouse and a boutique hotel, ensuring exceptional hospitality and recreational facilities for residents and their guests.",
      ],
      es: [
        "El centro de la comunidad incluye un clubhouse de última generación y un hotel boutique, garantizando hospitalidad y espacios recreativos excepcionales para residentes e invitados.",
      ],
    },
    bedrooms: null,
    sizeRange: null,
    fromPrice: null,
    image: lifestyle.toast,
    hoverImage: renders.poolTerrace,
    features: [
      {
        en: "Ownership model to be confirmed [[PLACEHOLDER]]",
        es: "Modelo de propiedad por confirmar [[PROVISIONAL]]",
      },
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
      { en: "Private elevator landing [[PLACEHOLDER]]", es: "Vestíbulo privado de ascensor [[PROVISIONAL]]" },
    ],
    kp: [8, 56, 40, 34],
  }),
  plan({
    slug: "villa-v1",
    name: { en: "Villa V1", es: "Villa V1" },
    collection: "villas",
    bedrooms: 4,
    bathrooms: 4.5,
    interiorSqFt: null,
    exteriorSqFt: null,
    orientation: "E",
    view: { en: "Garden", es: "Jardín" },
    tower: "Villas",
    floors: "2",
    status: "available",
    fromPrice: null,
    highlights: [{ en: "Private pool", es: "Piscina privada" }],
    kp: [52, 56, 40, 34],
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
