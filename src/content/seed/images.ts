import manifest from "../images.json";
import type { ImageRef, L } from "../types";

type Key = keyof typeof manifest;
type Opts = { caption?: L; rendering?: boolean; placeholder?: boolean; credit?: string; position?: string };

/**
 * Build an ImageRef from the optimised-image manifest. Blur placeholders are deliberately left out:
 * the client does not want blurry previews, so images appear only once they are sharp, over a
 * travertine ground.
 */
export function img(key: Key, alt: L, opts: Opts = {}): ImageRef {
  const m = manifest[key];
  return { src: m.src, width: m.width, height: m.height, alt, ...opts };
}

/* ---- Client renders (artist's conceptual renderings) ---- */
export const renders = {
  tdmExterior: img(
    "client/tdm-exterior-from-pull-scaled",
    {
      en: "Tesoro Del Mar: curved residential towers above a resort pool, framed by palms",
      es: "Tesoro Del Mar: torres residenciales curvas sobre una piscina resort, enmarcadas por palmeras",
    },
    { rendering: true, position: "50% 12%" },
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
    { rendering: true, position: "30% 35%" },
  ),
  poolTerrace: img(
    "client/049discover",
    {
      en: "Pool terrace beneath a cantilevered glass pavilion",
      es: "Terraza de piscina bajo un pabellón de cristal en voladizo",
    },
    { rendering: true, position: "50% 25%" },
  ),
  doradoWaterfalls: img(
    "client/doradowaterfalls1",
    {
      en: "Dorado Waterfalls: tiered towers along a palm-lined avenue",
      es: "Dorado Waterfalls: torres escalonadas a lo largo de una avenida de palmeras",
    },
    { rendering: true, position: "50% 20%" },
  ),
  naguabo: img(
    "client/naguabo-003",
    {
      en: "Naguabo: residential towers set into a green hillside bay",
      es: "Naguabo: torres residenciales en una bahía de laderas verdes",
    },
    { rendering: true, position: "50% 40%" },
  ),
  naguaboWide: img(
    "client/n03-scaled",
    {
      en: "Curved residential towers rising above a lagoon at dusk",
      es: "Torres residenciales curvas sobre una laguna al atardecer",
    },
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
    { ...R, position: "50% 45%" },
  ),
  aerialCoast: img(
    "client/tdm-aerial-002-small-scaled",
    {
      en: "Aerial view of Tesoro Del Mar above a turquoise cove on the north coast",
      es: "Vista aérea de Tesoro Del Mar sobre una cala turquesa de la costa norte",
    },
    { ...R, position: "50% 40%" },
  ),
  aerialVillas: img(
    "client/tdm-aerial-003-small-scaled",
    {
      en: "Aerial view of the towers and the villa neighbourhood at Tesoro Del Mar",
      es: "Vista aérea de las torres y el vecindario de villas de Tesoro Del Mar",
    },
    { ...R, position: "50% 40%" },
  ),
  aerialForest: img(
    "client/tdm-aerial-004-small-scaled",
    {
      en: "Tesoro Del Mar towers rising from the forest canopy",
      es: "Las torres de Tesoro Del Mar emergiendo del dosel del bosque",
    },
    { ...R, position: "60% 40%" },
  ),
  exteriorGolf: img(
    "client/tdm-exterior-from-golf-scaled",
    {
      en: "Tesoro Del Mar seen across the landscaped green",
      es: "Tesoro Del Mar visto desde las áreas verdes ajardinadas",
    },
    { ...R, position: "50% 25%" },
  ),
  exteriorRoad: img(
    "client/tdm-exterior-from-road-scaled",
    {
      en: "Curved towers of Tesoro Del Mar seen from the palm-lined approach",
      es: "Las torres curvas de Tesoro Del Mar desde el acceso bordeado de palmeras",
    },
    { ...R, position: "50% 15%" },
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

/* ---- Portfolio renders, one per location (oraworld.com/our-residences, artist's conceptual renderings) ---- */
export const places = {
  theTop: img(
    "client/thetop1",
    {
      en: "The Top: curved towers and terraced villas above the treeline",
      es: "The Top: torres curvas y villas escalonadas sobre la arboleda",
    },
    { rendering: true, position: "50% 20%" },
  ),
  naguabo: img(
    "client/naguabo2",
    {
      en: "Naguabo: towers and a marina around a hidden bay",
      es: "Naguabo: torres y una marina alrededor de una bahía escondida",
    },
    { rendering: true, position: "50% 40%" },
  ),
  loizaOcean: img(
    "client/loizaocean1",
    { en: "Loíza Ocean: glass towers on the shoreline", es: "Loíza Ocean: torres de cristal frente al mar" },
    { rendering: true, position: "50% 35%" },
  ),
  loizaRiverCity: img(
    "client/loizarivercity1",
    {
      en: "Loíza River City: towers above a palm-lined beach",
      es: "Loíza River City: torres sobre una playa bordeada de palmeras",
    },
    { rendering: true, position: "50% 35%" },
  ),
  loizaCountryside: img(
    "client/loizacountryside2",
    {
      en: "Loíza Countryside Estates: aerial view of the lagoon community",
      es: "Loíza Countryside Estates: vista aérea de la comunidad de la laguna",
    },
    { rendering: true },
  ),
  ceiba: img(
    "client/ceiba-001",
    {
      en: "Costa del Este, Ceiba: architectural massing study of the towers",
      es: "Costa del Este, Ceiba: estudio volumétrico de las torres",
    },
    { rendering: true },
  ),
  guayama: img(
    "client/guayama-50",
    { en: "Guayama: site plan along the coast", es: "Guayama: plano del sitio a lo largo de la costa" },
    { rendering: true },
  ),
};

/* ---- Full Dorado Waterfalls set (oraworld.com/dorado-waterfalls, artist's conceptual renderings) ---- */
export const dwx = {
  towers: img(
    "client/doradowaterfalls8",
    {
      en: "Dorado Waterfalls: glass towers on a green hillside",
      es: "Dorado Waterfalls: torres de cristal en una ladera verde",
    },
    { ...R, position: "50% 30%" },
  ),
  arrival: img(
    "client/doradowaterfalls10",
    {
      en: "Dorado Waterfalls: covered arrival court beside a cascading water wall",
      es: "Dorado Waterfalls: llegada cubierta junto a un muro de agua en cascada",
    },
    R,
  ),
  poolUmbrellas: img(
    "client/doradowaterfalls11",
    {
      en: "Dorado Waterfalls: pool deck with umbrellas below the towers",
      es: "Dorado Waterfalls: terraza de piscina con sombrillas bajo las torres",
    },
    { ...R, position: "50% 35%" },
  ),
  masterplanAerial: img(
    "client/doradowaterfalls12-1",
    {
      en: "Dorado Waterfalls: aerial of the masterplan and its circular gardens",
      es: "Dorado Waterfalls: vista aérea del plan maestro y sus jardines circulares",
    },
    R,
  ),
  valleyAerial: img(
    "client/doradowaterfalls14-1",
    {
      en: "Dorado Waterfalls: towers along the green valley from above",
      es: "Dorado Waterfalls: torres a lo largo del valle verde desde el aire",
    },
    R,
  ),
  rooftop: img(
    "client/doradowaterfalls15",
    {
      en: "Dorado Waterfalls: rooftop pool and terrace crowning a tower",
      es: "Dorado Waterfalls: piscina y terraza en la azotea de una torre",
    },
    { ...R, position: "50% 40%" },
  ),
  poolPalms: img(
    "client/doradowaterfalls5",
    {
      en: "Dorado Waterfalls: palm-lined pool beneath terraced towers",
      es: "Dorado Waterfalls: piscina con palmeras bajo torres escalonadas",
    },
    { ...R, position: "50% 25%" },
  ),
  lagoonPool: img(
    "client/026",
    {
      en: "Dorado Waterfalls: lagoon pool framed by palms and towers",
      es: "Dorado Waterfalls: piscina laguna entre palmeras y torres",
    },
    { ...R, position: "50% 30%" },
  ),
  poolLoungers: img(
    "client/028",
    {
      en: "Dorado Waterfalls: pool deck with loungers facing the hills",
      es: "Dorado Waterfalls: terraza de piscina con tumbonas frente a las colinas",
    },
    R,
  ),
  restaurant: img(
    "client/doradowaterfallsinterior2",
    {
      en: "Dorado Waterfalls: restaurant with a wood bar and hanging gardens",
      es: "Dorado Waterfalls: restaurante con barra de madera y jardines colgantes",
    },
    R,
  ),
  livingView: img(
    "client/doradowaterfallsinterior3",
    {
      en: "Dorado Waterfalls: open living and dining room with valley views",
      es: "Dorado Waterfalls: sala y comedor abiertos con vista al valle",
    },
    R,
  ),
  lobbyStair: img(
    "client/doradowaterfallsinterior5",
    {
      en: "Dorado Waterfalls: double-height lobby with a glass staircase",
      es: "Dorado Waterfalls: vestíbulo a doble altura con escalera de cristal",
    },
    R,
  ),
  lobbyTrees: img(
    "client/doradowaterfallsinterior6",
    {
      en: "Dorado Waterfalls: lobby lounge planted with indoor trees",
      es: "Dorado Waterfalls: salón del vestíbulo con árboles interiores",
    },
    R,
  ),
  lobbyLounge: img(
    "client/doradowaterfallsinterior7",
    {
      en: "Dorado Waterfalls: lobby lounge with sculpted blue seating",
      es: "Dorado Waterfalls: salón del vestíbulo con asientos azules esculpidos",
    },
    R,
  ),
  diningAquarium: img(
    "client/doradowaterfallsinterior10",
    {
      en: "Dorado Waterfalls: dining room beside an aquarium wall",
      es: "Dorado Waterfalls: comedor junto a un muro acuario",
    },
    R,
  ),
  diningCurved: img(
    "client/doradowaterfallsinterior11",
    {
      en: "Dorado Waterfalls: dining hall under a curved ceiling",
      es: "Dorado Waterfalls: comedor bajo un techo curvo",
    },
    R,
  ),
  diningGardens: img(
    "client/doradowaterfallsinterior13",
    {
      en: "Dorado Waterfalls: restaurant with suspended planters",
      es: "Dorado Waterfalls: restaurante con jardineras suspendidas",
    },
    R,
  ),
  diningTerrace: img(
    "client/doradowaterfallsinterior14",
    {
      en: "Dorado Waterfalls: dining room opening to palms and sea",
      es: "Dorado Waterfalls: comedor abierto a las palmeras y el mar",
    },
    R,
  ),
  residenceLiving: img(
    "client/doradowaterfallsinterior16",
    {
      en: "Dorado Waterfalls: residence living room with mountain views",
      es: "Dorado Waterfalls: sala de una residencia con vista a la montaña",
    },
    R,
  ),
  residenceWine: img(
    "client/doradowaterfallsinterior17",
    { en: "Dorado Waterfalls: living room with a lit wine wall", es: "Dorado Waterfalls: sala con cava iluminada" },
    R,
  ),
  residenceBedroom: img(
    "client/doradowaterfallsinterior18",
    {
      en: "Dorado Waterfalls: principal bedroom with a crystal chandelier",
      es: "Dorado Waterfalls: dormitorio principal con candelabro de cristal",
    },
    R,
  ),
  residenceCloset: img(
    "client/doradowaterfallsinterior19",
    { en: "Dorado Waterfalls: glass-fronted dressing room", es: "Dorado Waterfalls: vestidor con frentes de cristal" },
    R,
  ),
  residenceBath: img(
    "client/doradowaterfallsinterior20",
    {
      en: "Dorado Waterfalls: bathroom vanity with a sculpted mirror",
      es: "Dorado Waterfalls: tocador del baño con espejo esculpido",
    },
    R,
  ),
};

/* ---- Portfolio cards exactly as oraworld.com/our-residences pairs them ---- */
export const cards = {
  theTop: img(
    "client/home5",
    {
      en: "The Top: curved towers and terraced villas above the trees",
      es: "The Top: torres curvas y villas escalonadas sobre los árboles",
    },
    { ...R, position: "50% 25%" },
  ),
  theTopTowers: img(
    "client/tp-0082",
    { en: "Curved residential towers rising above a garden", es: "Torres residenciales curvas sobre un jardín" },
    { ...R, position: "50% 30%" },
  ),
  oceanView: img(
    "client/vegaalta1",
    {
      en: "Dorado Ocean View Estates: towers set in the forest",
      es: "Dorado Ocean View Estates: torres en medio del bosque",
    },
    { ...R, position: "50% 30%" },
  ),
  loizaOcean: img(
    "client/loiza-57-003",
    { en: "Loíza Ocean: glass towers on the shoreline", es: "Loíza Ocean: torres de cristal frente al mar" },
    { ...R, position: "50% 40%" },
  ),
  loizaCountryside: img(
    "client/loizacountryside1cropped",
    {
      en: "Loíza Countryside Estates: a villa among open fields",
      es: "Loíza Countryside Estates: una villa entre campos abiertos",
    },
    R,
  ),
  guayama: img(
    "client/guayama-cropped-for-home",
    { en: "Guayama: site plan along the coast", es: "Guayama: plano del sitio a lo largo de la costa" },
    R,
  ),
  ceiba: img(
    "client/screenshot-136-scaled",
    {
      en: "Costa del Este, Ceiba: massing study of the towers",
      es: "Costa del Este, Ceiba: estudio volumétrico de las torres",
    },
    R,
  ),
  aquamaria: img(
    "client/pl-screenshot-140-scaled",
    { en: "AquaMaria: architectural drawing of the tower", es: "AquaMaria: dibujo arquitectónico de la torre" },
    R,
  ),
  forestTowers: img(
    "client/mwc-0122",
    { en: "Curved towers and villas above the forest canopy", es: "Torres curvas y villas sobre el dosel del bosque" },
    { ...R, position: "50% 30%" },
  ),
  islandMap: img("client/pr-island-picture-narrow", {
    en: "Map of Puerto Rico showing the ORA World locations",
    es: "Mapa de Puerto Rico con las ubicaciones de ORA World",
  }),
};

/* ---- More of the client's own photography and renders ---- */
export const more = {
  tdmDining: img(
    "client/vertical-placeholder-image-2",
    {
      en: "Tesoro Del Mar: dining room under a skylight, facing the ocean",
      es: "Tesoro Del Mar: comedor bajo un tragaluz frente al océano",
    },
    R,
  ),
  oceanTowers: img(
    "client/image-scaled-1-1",
    { en: "Curved residential towers along the coast", es: "Torres residenciales curvas a lo largo de la costa" },
    { ...R, position: "50% 30%" },
  ),
  coastResort: img("client/tmpixodp5l9", {
    en: "A resort above a white-sand Caribbean beach",
    es: "Un resort sobre una playa caribeña de arena blanca",
  }),
  poolTower: img("client/024discover-b2731a25", {
    en: "Pool terrace beneath a glass pavilion",
    es: "Terraza de piscina bajo un pabellón de cristal",
  }),
  yacht: img("client/03activities-0c501fcf", {
    en: "A yacht at anchor in turquoise water, from above",
    es: "Un yate anclado en agua turquesa, desde el aire",
  }),
  sunsetChairs: img(
    "client/06tax-1",
    {
      en: "Two beach chairs facing a Caribbean sunset",
      es: "Dos sillas de playa frente a un atardecer caribeño",
    },
    { position: "50% 60%" },
  ),
  medical: img("client/061medical", {
    en: "Physician using a digital health interface",
    es: "Médico usando una interfaz de salud digital",
  }),
  business: img("client/029technology", {
    en: "Colleagues meeting in a bright business lounge",
    es: "Colegas reunidos en un salón de negocios luminoso",
  }),
  sport: img("client/048sport", {
    en: "Training session in the fitness center",
    es: "Sesión de entrenamiento en el gimnasio",
  }),
  atv: img("client/00-030cultural-d07afa80", {
    en: "Riders on ATVs on a mountain trail",
    es: "Recorrido en ATV por un sendero de montaña",
  }),
  toast: img("client/01-030cultural-d07afa80", {
    en: "Friends raising a toast at dinner",
    es: "Amigos brindando durante la cena",
  }),
  meeting: img("client/02-030cultural-d07afa80", {
    en: "A business meeting by the window",
    es: "Una reunión de negocios junto a la ventana",
  }),
  spaCandle: img("client/03-030cultural-d07afa80", {
    en: "Spa treatment by candlelight",
    es: "Tratamiento de spa a la luz de las velas",
  }),
  golfCart: img("client/istock-1070690724-1", {
    en: "Smiling senior man driving his golf cart on a fairway",
    es: "Hombre mayor sonriente conduciendo su carrito de golf",
  }),
  poolRelax: img("client/istock-1168908596-1", {
    en: "Women relaxing by a swimming pool",
    es: "Mujeres descansando junto a una piscina",
  }),
  gallery: [
    img(
      "client/g2-01",
      { en: "Pool terrace beneath a glass pavilion", es: "Terraza de piscina bajo un pabellón de cristal" },
      R,
    ),
    img("client/g2-02", { en: "Lobby lounge with a living wall", es: "Salón del vestíbulo con muro verde" }, R),
    img(
      "client/g2-03",
      { en: "Sculpted loungers in a shallow pool", es: "Tumbonas esculpidas en una piscina de poca profundidad" },
      R,
    ),
    img(
      "client/g2-04",
      { en: "Wood-clad entrance with a living wall", es: "Entrada revestida de madera con muro verde" },
      R,
    ),
    img(
      "client/g2-05",
      { en: "Dining room under a skylight, facing the ocean", es: "Comedor bajo un tragaluz frente al océano" },
      R,
    ),
    img(
      "client/g2-06",
      { en: "Infinity pool terrace overlooking the sea", es: "Terraza con piscina infinita sobre el mar" },
      R,
    ),
  ],
};

/* ---- People ---- */
export const people = {
  rezaSabaii: img("people/reza-sabaii", { en: "Portrait of Reza Sabaii, ESQ.", es: "Retrato de Reza Sabaii, ESQ." }),
};

/* ---- Line drawings derived from the renderings (scripts/drawings-build.mjs) for the compare slider ---- */
const drawing = (key: string, of: string) =>
  img(`drawings/${key}-drawing` as Key, {
    en: `Line drawing derived from the rendering of ${of}`,
    es: `Dibujo lineal derivado del rendering de ${of}`,
  });
export const drawings = {
  road: drawing("tdm-exterior-from-road-scaled", "the Tesoro Del Mar arrival"),
  pool: drawing("tdm-exterior-from-pull-scaled", "the Tesoro Del Mar pool terrace"),
  aerial: drawing("tdm-aerial-002-small-scaled", "Tesoro Del Mar from the air"),
  foyer: drawing("tdm-foyer-001-small-scaled", "the Tesoro Del Mar foyer"),
  penthouse: drawing("tdm-penthouse-living-002-small-scaled", "the Tesoro Del Mar penthouse"),
  dw: drawing("doradowaterfalls1", "Dorado Waterfalls"),
};
