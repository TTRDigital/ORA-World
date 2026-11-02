import manifest from "../images.json";
import type { ImageRef, L } from "../types";

type Key = keyof typeof manifest;
type Opts = { caption?: L; rendering?: boolean; placeholder?: boolean; credit?: string };

/** Build an ImageRef from the optimised-image manifest. */
export function img(key: Key, alt: L, opts: Opts = {}): ImageRef {
  const m = manifest[key];
  return { src: m.src, width: m.width, height: m.height, blurDataURL: m.blurDataURL, alt, ...opts };
}

/* ---- Client renders (artist's conceptual renderings) ---- */
export const renders = {
  tdmExterior: img(
    "client/tdm-exterior-from-pull-scaled",
    {
      en: "Tesoro Del Mar: curved residential towers above a resort pool, framed by palms",
      es: "Tesoro Del Mar: torres residenciales curvas sobre una piscina resort, enmarcadas por palmeras",
    },
    { rendering: true },
  ),
  tdmPenthouse: img(
    "client/tdm-penthouse-living-003-small-scaled",
    {
      en: "Penthouse living room with a grand piano and floor-to-ceiling glass",
      es: "Sala de un penthouse con piano de cola y ventanales de piso a techo",
    },
    { rendering: true },
  ),
  towerDetail: img(
    "client/r-006",
    {
      en: "Detail of the curved balconies against the Caribbean sky",
      es: "Detalle de los balcones curvos contra el cielo caribeño",
    },
    { rendering: true },
  ),
  poolTerrace: img(
    "client/049discover",
    {
      en: "Pool terrace beneath a cantilevered glass pavilion",
      es: "Terraza de piscina bajo un pabellón de cristal en voladizo",
    },
    { rendering: true },
  ),
  doradoWaterfalls: img(
    "client/doradowaterfalls1",
    {
      en: "Dorado Waterfalls: tiered towers along a palm-lined avenue",
      es: "Dorado Waterfalls: torres escalonadas a lo largo de una avenida de palmeras",
    },
    { rendering: true },
  ),
  naguabo: img(
    "client/naguabo-003",
    {
      en: "Naguabo: residential towers set into a green hillside bay",
      es: "Naguabo: torres residenciales en una bahía de laderas verdes",
    },
    { rendering: true },
  ),
  naguaboWide: img(
    "client/n03-scaled",
    { en: "Aerial view of a coastal ORA World community", es: "Vista aérea de una comunidad costera de ORA World" },
    { rendering: true },
  ),
};

/* ---- Client lifestyle photography (from oraworld.com; stock licenses to be confirmed, see CONTENT-TODO) ---- */
export const lifestyle = {
  beach: img("client/05theplace-1", {
    en: "Turquoise cove with a leaning palm on Puerto Rico's north coast",
    es: "Cala turquesa con una palmera inclinada en la costa norte de Puerto Rico",
  }),
  sailing: img("client/istock-2231329012", {
    en: "A sailboat on open Caribbean water",
    es: "Un velero en aguas abiertas del Caribe",
  }),
  rainforest: img("client/033sustainability", {
    en: "Hikers beneath the canopy of a tropical rainforest",
    es: "Senderistas bajo el dosel de un bosque tropical",
  }),
  adventure: img("client/059adventure", {
    en: "Hikers resting on a ridge above a green valley",
    es: "Senderistas descansando en una cresta sobre un valle verde",
  }),
  culinary: img("client/057culinary", {
    en: "Friends sharing a table of island dishes",
    es: "Amigos compartiendo una mesa de platos isleños",
  }),
  toast: img("client/015discover-scaled-02805dce", {
    en: "A toast with red wine at a candle-lit table",
    es: "Un brindis con vino tinto en una mesa a la luz de las velas",
  }),
  party: img("client/027entertaiment", {
    en: "Guests mingling at an evening reception",
    es: "Invitados conversando en una recepción nocturna",
  }),
  jet: img("client/030transportation", {
    en: "A private jet and car at golden hour",
    es: "Un jet privado y un automóvil al atardecer",
  }),
  atv: img("client/031cultural", {
    en: "Friends on an all-terrain excursion",
    es: "Amigos en una excursión todoterreno",
  }),
  familyPool: img("client/032family", {
    en: "A mother and children laughing in a family pool",
    es: "Una madre y sus hijos riendo en una piscina familiar",
  }),
  gym: img("client/035sport", {
    en: "Strength training in a fitness center",
    es: "Entrenamiento de fuerza en un gimnasio",
  }),
  spa: img("client/042spa", {
    en: "A spa treatment room with soft light",
    es: "Una sala de tratamientos de spa con luz suave",
  }),
  running: img("client/055fitness", {
    en: "A couple running a tree-lined trail",
    es: "Una pareja corriendo por un sendero arbolado",
  }),
  surf: img("client/056watersport", { en: "A surfer carving a turquoise wave", es: "Un surfista en una ola turquesa" }),
  waterpark: img("client/058entertainment", { en: "Children on a water slide", es: "Niños en un tobogán de agua" }),
  kite: img("client/060family", {
    en: "Children flying a kite in a field at sunset",
    es: "Niños volando una cometa en un campo al atardecer",
  }),
  graduation: img("client/062educational-scaled", {
    en: "Graduation caps thrown into a blue sky",
    es: "Birretes de graduación lanzados al cielo azul",
  }),
  shopping: img("client/063shopping", {
    en: "A woman with shopping bags in a glass arcade",
    es: "Una mujer con bolsas de compras en una galería acristalada",
  }),
  motherChild: img("client/064additional", {
    en: "A mother and toddler playing with blocks",
    es: "Una madre y su niño jugando con bloques",
  }),
  dog: img("client/010pet-1", {
    en: "A girl playing fetch with a golden retriever",
    es: "Una niña jugando a la pelota con un golden retriever",
  }),
};

/* ---- Tesoro Del Mar render set (oraworld.com, July 2025) ---- */
const R = { rendering: true } as const;
export const tdm = {
  aerialTowers: img(
    "client/tdm-aerial-001-small-scaled",
    {
      en: "Aerial view of the Tesoro Del Mar towers set in tropical forest",
      es: "Vista aérea de las torres de Tesoro Del Mar entre el bosque tropical",
    },
    R,
  ),
  aerialCoast: img(
    "client/tdm-aerial-002-small-scaled",
    {
      en: "Aerial view of Tesoro Del Mar above a turquoise cove on the north coast",
      es: "Vista aérea de Tesoro Del Mar sobre una cala turquesa de la costa norte",
    },
    R,
  ),
  aerialVillas: img(
    "client/tdm-aerial-003-small-scaled",
    {
      en: "Aerial view of the towers and the villa neighbourhood at Tesoro Del Mar",
      es: "Vista aérea de las torres y el vecindario de villas de Tesoro Del Mar",
    },
    R,
  ),
  aerialForest: img(
    "client/tdm-aerial-004-small-scaled",
    {
      en: "Tesoro Del Mar towers rising from the forest canopy",
      es: "Las torres de Tesoro Del Mar emergiendo del dosel del bosque",
    },
    R,
  ),
  exteriorGolf: img(
    "client/tdm-exterior-from-golf-scaled",
    {
      en: "Tesoro Del Mar seen across the landscaped green",
      es: "Tesoro Del Mar visto desde las áreas verdes ajardinadas",
    },
    R,
  ),
  exteriorRoad: img(
    "client/tdm-exterior-from-road-scaled",
    {
      en: "Curved towers of Tesoro Del Mar seen from the palm-lined approach",
      es: "Las torres curvas de Tesoro Del Mar desde el acceso bordeado de palmeras",
    },
    R,
  ),
  foyerAtrium: img(
    "client/tdm-foyer-001-small-scaled",
    {
      en: "Double-height lobby with a stone column and gallery level",
      es: "Vestíbulo de doble altura con columna de piedra y nivel de galería",
    },
    R,
  ),
  foyerLounge: img(
    "client/tdm-foyer-002-small-scaled",
    { en: "Lobby lounge in travertine and warm wood", es: "Salón del vestíbulo en travertino y madera cálida" },
    R,
  ),
  foyerReception: img(
    "client/tdm-foyer-004-small-scaled",
    { en: "Reception desk beneath a living green wall", es: "Recepción bajo un muro verde vivo" },
    R,
  ),
  foyerSignage: img(
    "client/tdm-foyer-005-small-scaled",
    {
      en: "The Tesoro Del Mar foyer with its name on the stone wall",
      es: "El vestíbulo de Tesoro Del Mar con su nombre en el muro de piedra",
    },
    R,
  ),
  aptLiving: img(
    "client/tdm-apt-1403-living-room-003-small-scaled",
    { en: "Open living and dining room in apartment 1403", es: "Sala y comedor abiertos del apartamento 1403" },
    R,
  ),
  aptLiving2: img(
    "client/tdm-apt-1403-living-room-004-small-scaled",
    {
      en: "Living room with floor-to-ceiling glass in apartment 1403",
      es: "Sala con ventanales de piso a techo en el apartamento 1403",
    },
    R,
  ),
  aptBedroom: img(
    "client/tdm-apt-1403-master-bedroom-001-small-scaled",
    { en: "Primary bedroom in apartment 1403", es: "Dormitorio principal del apartamento 1403" },
    R,
  ),
  aptBedroom2: img(
    "client/tdm-apt-1403-bedroom-2-001-op2-small-scaled",
    {
      en: "Second bedroom with an ocean view in apartment 1403",
      es: "Segundo dormitorio con vista al mar en el apartamento 1403",
    },
    R,
  ),
  aptBath: img(
    "client/tdm-apt-1403-master-bathroom-001-small-scaled",
    { en: "Primary bathroom in onyx and marble", es: "Baño principal en ónix y mármol" },
    R,
  ),
  aptBath2: img(
    "client/tdm-apt-1403-master-bathroom-002-small-scaled",
    { en: "Freestanding bath before an onyx wall", es: "Bañera exenta frente a un muro de ónix" },
    R,
  ),
  aptStudy: img(
    "client/tdm-apt-1403-study-001-small-scaled",
    {
      en: "Study with built-in shelving in apartment 1403",
      es: "Estudio con estanterías integradas en el apartamento 1403",
    },
    R,
  ),
  hotelSuite: img(
    "client/tdm-hotel-210-bedroom-001-small-scaled",
    { en: "Hotel suite 210 bedroom", es: "Dormitorio de la suite de hotel 210" },
    R,
  ),
  penthouseDining: img(
    "client/tdm-penthouse-living-001-small-scaled",
    { en: "Penthouse dining and living room facing the sea", es: "Comedor y sala del penthouse frente al mar" },
    R,
  ),
  penthouseLiving: img(
    "client/tdm-penthouse-living-002-small-scaled",
    { en: "Penthouse living room with a floating staircase", es: "Sala del penthouse con escalera flotante" },
    R,
  ),
};

/* ---- Dorado Waterfalls (oraworld.com) ---- */
export const dw = {
  masterplan: img(
    "client/doradowaterfall2",
    {
      en: "Dorado Waterfalls master plan beside the river and mountains",
      es: "Plan maestro de Dorado Waterfalls junto al río y las montañas",
    },
    R,
  ),
  masterplan2: img(
    "client/doradowaterfalls3",
    { en: "Dorado Waterfalls towers along the valley", es: "Torres de Dorado Waterfalls a lo largo del valle" },
    R,
  ),
  lobby: img(
    "client/doradowaterfallsinterior1",
    { en: "Dorado Waterfalls lobby with a living wall", es: "Vestíbulo de Dorado Waterfalls con muro vivo" },
    R,
  ),
  lounge: img(
    "client/doradowaterfallsinterior4",
    { en: "Dorado Waterfalls residence lounge", es: "Salón de una residencia de Dorado Waterfalls" },
    R,
  ),
  waterWall: img(
    "client/doradowaterfallsinterior9",
    { en: "Cascading water wall inside Dorado Waterfalls", es: "Muro de agua en cascada en Dorado Waterfalls" },
    R,
  ),
  bar: img(
    "client/doradowaterfallsinterior12",
    { en: "Dorado Waterfalls lounge bar", es: "Bar lounge de Dorado Waterfalls" },
    R,
  ),
  living: img(
    "client/doradowaterfallsinterior15",
    { en: "Dorado Waterfalls open-plan living room", es: "Sala de concepto abierto en Dorado Waterfalls" },
    R,
  ),
};
