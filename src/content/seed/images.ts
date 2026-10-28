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

/* ---- Free-license placeholders (credits in CONTENT-TODO.md) ---- */
export const free = {
  bioBay: img(
    "free/bio-bay-vieques",
    { en: "Mosquito Bay, Vieques, at dusk", es: "Bahía Mosquito, Vieques, al anochecer" },
    { placeholder: true, credit: "Panoramio contributor, CC BY 3.0, via Wikimedia Commons" },
  ),
};
