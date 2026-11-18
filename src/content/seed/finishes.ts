import type { ImageRef, L } from "../types";
import { book } from "./images";

/**
 * Specified finishes for the residences, as shown in the Tesoro del Mar presentation (brands, products
 * and finishes; carried over from ORA World v2). Selections and availability are subject to the
 * Offering Plan.
 */
export interface FinishGroup {
  id: string;
  kicker: L;
  title: L;
  brands: string;
  text: L;
  image?: ImageRef;
  items: { brand?: string; name: L; detail?: L }[];
  swatches?: string[];
}

const p = (en: string, es: string): L => ({ en, es });

export const SCAVOLINI_FINISHES = [
  "Noce Tussah", "Noce Ulster", "Noce Saxony", "Noce Royal", "Noce Sunset", "Rovere Caffè", "Rovere Carbone",
  "Rovere Grafite", "Rovere Grano", "Rovere Dune", "Piana", "Dogata", "Rovere Pecan", "Rovere Barley",
  "Rovere Pepper", "Rovere Berry", "Rovere Season", "Rovere Along", "Rovere Bright", "Rovere Fade",
  "Rovere Actual", "Rovere Voyage", "Rovere Landscape", "Noce Steady", "Noce Stage", "Noce Fair",
  "Rovere Laguna", "Rovere Lavagna", "Noce Garden", "Rovere Gessato", "Rovere Gessato Castano",
  "Rovere Gessato Bruno", "Rovere Gessato Biondo", "Rovere Cortina", "Noce Arabica", "Noce Bancha",
  "Rovere Gold", "Oriental", "Oriental Light", "Ephesus Grey", "Antrim Grey", "Opaca con bordo laser",
  "Malé White", "Kos White", "Comodoro Green", "Ottawa Beaver", "Orinoco Cocoa", "Ingo Black", "Raipur Red",
  "Fez Blue", "London Grey", "Bromine Grey", "Matt plain Lisse", "Glossy plain Lisse", "Vertical slat",
  "Horizontal slat", "Prestige White", "Porcelain Cream", "Powder Pink", "Mustard Yellow", "Light Grey",
  "Heron Grey", "Dove Grey", "Mink", "Perlage", "Pas Dosé", "Matera Grey", "Cuvée", "Titanium Grey",
  "Volcano Grey", "Iron Grey",
];

export const finishGroups: FinishGroup[] = [
  {
    id: "cabinetry",
    kicker: p("Kitchen · Cabinetry", "Cocina · Gabinetes"),
    title: p("Italian cabinetry, your palette", "Gabinetes italianos, su paleta"),
    brands: "Scavolini",
    text: p(
      "Custom Scavolini cabinetry in 71 finishes: walnuts and oaks, fluted slats, lacquers and soft greys.",
      "Gabinetes Scavolini a medida en 71 acabados: nogales y robles, listones, lacas y grises suaves.",
    ),
    image: book.kitchenFinish,
    items: [
      { name: p("Walnut and oak veneers", "Chapas de nogal y roble") },
      { name: p("Vertical and horizontal slats", "Listones verticales y horizontales") },
      { name: p("Matt and glossy lacquers", "Lacas mate y brillantes") },
      { name: p("Glass-front display cabinets", "Vitrinas con frente de cristal") },
    ],
    swatches: SCAVOLINI_FINISHES,
  },
  {
    id: "countertops",
    kicker: p("Kitchen · Countertops", "Cocina · Encimeras"),
    title: p("Sintered stone counters", "Encimeras de piedra sinterizada"),
    brands: "Neolith",
    text: p(
      "Neolith surfaces for counters, islands and backsplashes, in four stones.",
      "Superficies Neolith para encimeras, islas y salpicaderos, en cuatro piedras.",
    ),
    image: book.kitchenFinishSlats,
    items: [
      { name: p("Sofia Cuprum", "Sofia Cuprum") },
      { name: p("Calacatta", "Calacatta") },
      { name: p("Zaha Stone", "Zaha Stone") },
      { name: p("Mont Blanc", "Mont Blanc") },
    ],
  },
  {
    id: "appliances",
    kicker: p("Kitchen · Appliances", "Cocina · Electrodomésticos"),
    title: p("A fully integrated suite", "Una línea totalmente integrada"),
    brands: "Gaggenau · Thermador · Bosch",
    text: p(
      "Gaggenau in the kitchen, a Thermador hood, and a Bosch washer and dryer pair.",
      "Gaggenau en la cocina, campana Thermador y lavadora y secadora Bosch.",
    ),
    image: book.kitchenDining,
    items: [
      { brand: "Gaggenau", name: p("Refrigerator column", "Columna de refrigeración"), detail: p("Vario 400 · RC 472 · fully integrated, 30 in", "Vario 400 · RC 472 · integrada, 30 in") },
      { brand: "Gaggenau", name: p("Freezer column", "Columna de congelación"), detail: p("Vario 400 · RF 471 · fully integrated, 30 in", "Vario 400 · RF 471 · integrada, 30 in") },
      { brand: "Gaggenau", name: p("Oven", "Horno"), detail: p("Expressive · GO 480/481 · 30 in", "Expressive · GO 480/481 · 30 in") },
      { brand: "Gaggenau", name: p("Combi-microwave oven", "Horno combinado con microondas"), detail: p("Expressive · GM 480/481 · 30 in", "Expressive · GM 480/481 · 30 in") },
      { brand: "Gaggenau", name: p("Induction cooktop", "Placa de inducción"), detail: p("Vario 400 full surface · CX 492 · 36 in", "Vario 400 superficie total · CX 492 · 36 in") },
      { brand: "Gaggenau", name: p("Espresso machine", "Cafetera espresso"), detail: p("Expressive · GC 461 · fully automatic, plumbed", "Expressive · GC 461 · automática, con toma de agua") },
      { brand: "Gaggenau", name: p("Dishwasher", "Lavavajillas"), detail: p("400 series · 24 in · 42 dB", "Serie 400 · 24 in · 42 dB") },
      { brand: "Gaggenau", name: p("Wine storage", "Vinoteca"), detail: p("200 series · RW 404 · under-counter, 24 in", "Serie 200 · RW 404 · bajo encimera, 24 in") },
      { brand: "Thermador", name: p("Insert hood", "Campana empotrada"), detail: p("Masterpiece · VCI6B30ZS · 30 in", "Masterpiece · VCI6B30ZS · 30 in") },
      { brand: "Bosch", name: p("Compact washer", "Lavadora compacta"), detail: p("500 Series · WGB24600UC · 24 in", "Serie 500 · WGB24600UC · 24 in") },
      { brand: "Bosch", name: p("Heat pump dryer", "Secadora con bomba de calor"), detail: p("500 Series · WQB245B0UC · 24 in", "Serie 500 · WQB245B0UC · 24 in") },
    ],
  },
  {
    id: "kitchen-fixtures",
    kicker: p("Kitchen · Fixtures", "Cocina · Grifería"),
    title: p("The faucet and the sink", "El grifo y el fregadero"),
    brands: "Dornbracht",
    text: p("A Dornbracht pull-down faucet over an undermount sink.", "Un grifo extraíble Dornbracht sobre un fregadero bajo encimera."),
    image: book.kitchenFaucet,
    items: [
      { brand: "Dornbracht", name: p("Pull-down faucet", "Grifo extraíble"), detail: p("Single lever with spray, in four finishes", "Monomando con ducha, en cuatro acabados") },
      { name: p("Undermount sink", "Fregadero bajo encimera"), detail: p("Single bowl, 32 in, with accessories", "Una cubeta, 32 in, con accesorios") },
    ],
  },
  {
    id: "bath",
    kicker: p("Bath", "Baño"),
    title: p("Brushed champagne, throughout the bath", "Champán cepillado en todo el baño"),
    brands: "Dornbracht · Geberit",
    text: p(
      "Dornbracht fixtures in brushed champagne, a freestanding tub and a wall-hung toilet.",
      "Grifería Dornbracht en champán cepillado, bañera exenta e inodoro suspendido.",
    ),
    image: book.bathTub,
    items: [
      { brand: "Dornbracht", name: p("Lavatory mixer", "Mezclador de lavabo"), detail: p("Meta · three-hole", "Meta · tres orificios") },
      { brand: "Dornbracht", name: p("Tub mixer with hand shower", "Mezclador de bañera con ducha de mano"), detail: p("Meta · wall-mounted", "Meta · de pared") },
      { brand: "Dornbracht", name: p("Rain shower, slide bar and hand shower", "Ducha de lluvia, barra y ducha de mano") },
      { brand: "Dornbracht", name: p("Concealed thermostat", "Termostato empotrado") },
      { name: p("Freestanding tub", "Bañera exenta"), detail: p("Marquis 7034 Metro · white", "Marquis 7034 Metro · blanca") },
      { brand: "Geberit", name: p("Wall-hung toilet and flush plate", "Inodoro suspendido y placa de descarga") },
    ],
  },
  {
    id: "closets",
    kicker: p("Closets", "Vestidores"),
    title: p("Walk-in closets, built in", "Vestidores integrados"),
    brands: "Rimadesio",
    text: p(
      "Rimadesio wardrobes and walk-in systems: glass doors, lit shelving and warm wood.",
      "Armarios y vestidores Rimadesio: puertas de cristal, estantes iluminados y madera cálida.",
    ),
    image: book.closetOpen,
    items: [
      { name: p("Built-in wardrobes", "Armarios empotrados") },
      { name: p("Glass-fronted walk-in closets", "Vestidores con frente de cristal") },
      { name: p("Integrated lighting", "Iluminación integrada") },
    ],
  },
  {
    id: "lighting",
    kicker: p("Lighting", "Iluminación"),
    title: p("Light, by designers", "Luz de diseño"),
    brands: "Baxter · Flos · Lamptron · ClassiCon · Formagenda · Moooi · Sans Souci · Carlyle Collective",
    text: p(
      "Statement pendants and wall lights from Italian and European houses.",
      "Lámparas colgantes y apliques de casas italianas y europeas.",
    ),
    image: book.primaryBedroom,
    items: [
      { brand: "Baxter", name: p("Q3 ceiling lamp", "Lámpara de techo Q3") },
      { brand: "Flos", name: p("Coordinates suspension", "Suspensión Coordinates") },
      { brand: "ClassiCon", name: p("Selene", "Selene") },
      { brand: "Lamptron", name: p("Laird More, Wand and Larseric", "Laird More, Wand y Larseric") },
      { brand: "Moooi", name: p("Ring suspension", "Suspensión Ring") },
      { brand: "Carlyle Collective", name: p("Torsade wall lamp", "Aplique Torsade") },
    ],
  },
  {
    id: "smart-home",
    kicker: p("Smart home", "Hogar inteligente"),
    title: p("Shades and a home that respond", "Cortinas y un hogar que responden"),
    brands: "Lutron · Crestron Home",
    text: p(
      "Lutron motorized shades in every room, and Crestron Home for climate, security, locks, lighting, shades and audio, from one app or a keypad.",
      "Cortinas motorizadas Lutron en cada habitación y Crestron Home para clima, seguridad, cerraduras, luz, cortinas y audio, desde una app o un teclado.",
    ),
    image: book.bedroomOcean,
    items: [
      { brand: "Lutron", name: p("Motorized roller shades and sheers", "Cortinas enrollables y visillos motorizados") },
      { brand: "Crestron Home", name: p("Thermostat, security, door locks and alarms", "Termostato, seguridad, cerraduras y alarmas") },
      { brand: "Crestron Home", name: p("Lighting, shading and audio", "Iluminación, cortinas y audio") },
      { brand: "Crestron Home", name: p("Keypads in brushed brass, dark nickel, dark bronze or brushed black", "Teclados en latón cepillado, níquel oscuro, bronce oscuro o negro cepillado") },
    ],
  },
];
