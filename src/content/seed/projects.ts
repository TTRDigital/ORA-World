import type { Project, GalleryImage, GenericPage } from "../types";
import { renders, lifestyle, tdm, dw, dwx, cards, more, book } from "./images";

export const projects: Project[] = [
  {
    slug: "tesoro-del-mar",
    flagship: true,
    name: { en: "Tesoro Del Mar", es: "Tesoro Del Mar" },
    tagline: { en: "A life to treasure", es: "Una vida para atesorar" },
    location: { en: "Dorado, Vega Alta, Puerto Rico 00692", es: "Dorado, Vega Alta, Puerto Rico 00692" },
    // Summary and facts from the Tesoro Del Mar brochure (TeseloDelmar.pdf, client-supplied, Nov 2026).
    summary: {
      en: [
        "At Tesoro del Mar, every detail is designed to elevate the everyday. Perched along Puerto Rico's golden shoreline, where mangroves meet the Atlantic and the horizon stretches endlessly, this 17-acre coastal community is the first expression of Ora World: a new vision for living rooted in freedom, connection, and purpose.",
        "Phase One introduces a limited collection of 60 residences, each with panoramic ocean views, refined interiors, and access to over 65,000 square feet of amenities, from a private beach and boat slipway to resort-style wellness, social spaces, and inspiring environments to work and create.",
      ],
      es: [
        "En Tesoro del Mar, cada detalle está pensado para elevar lo cotidiano. En la costa dorada de Puerto Rico, donde los manglares se encuentran con el Atlántico y el horizonte no termina, esta comunidad costera de 17 acres es la primera expresión de Ora World: una nueva visión de vida basada en la libertad, la conexión y el propósito.",
        "La Fase Uno presenta una colección limitada de 60 residencias, todas con vistas panorámicas al mar, interiores refinados y acceso a más de 65,000 pies cuadrados de amenidades, desde playa privada y rampa para embarcaciones hasta bienestar de resort, espacios sociales y entornos inspiradores para trabajar y crear.",
      ],
    },
    facts: [
      { label: { en: "Community", es: "Comunidad" }, value: "17 acres · coastal" },
      { label: { en: "Residences, Phase One", es: "Residencias, Fase Uno" }, value: "60 · 2–6 bedrooms" },
      { label: { en: "Penthouse", es: "Penthouse" }, value: "1" },
      { label: { en: "Amenities", es: "Amenidades" }, value: "65,000+ sq ft" },
      { label: { en: "Members-only clubhouse", es: "Club privado" }, value: "14,000 sq ft" },
      { label: { en: "To the beach", es: "A la playa" }, value: "Steps away" },
      { label: { en: "To San Juan and the airport", es: "A San Juan y al aeropuerto" }, value: "≈ 35 min" },
    ],
    sections: [
      {
        title: { en: "Architectural concept", es: "Concepto arquitectónico" },
        body: {
          en: [
            "The architectural concept draws inspiration from the graceful flight of birds, creating structures that evoke a sense of freedom and movement. The buildings feature sleek, aerodynamic forms with curved facades, expansive glass surfaces and light, airy elements that appear to soar above the landscape.",
            "Cantilevered terraces and balconies extend outward like wings, offering panoramic views while being thoughtfully landscaped with native plants and flowers. The open design promotes natural ventilation and daylight, contributing to both beauty and sustainability.",
          ],
          es: [
            "El concepto arquitectónico se inspira en el vuelo elegante de las aves, creando estructuras que evocan libertad y movimiento. Los edificios presentan formas aerodinámicas con fachadas curvas, amplias superficies de cristal y elementos ligeros que parecen elevarse sobre el paisaje.",
            "Terrazas y balcones en voladizo se extienden como alas, ofreciendo vistas panorámicas y ajardinados con plantas y flores nativas. El diseño abierto favorece la ventilación natural y la luz de día, aportando belleza y sostenibilidad.",
          ],
        },
        image: book.exteriorRoad,
      },
      {
        title: { en: "Community highlights", es: "Lo mejor de la comunidad" },
        body: {
          en: [
            "Contemporary apartments and luxurious villas ensure a variety of high-quality living options, with easy access to Balneario Cerro Gordo Beach. The community hub includes a state-of-the-art clubhouse and a boutique hotel.",
            "Emphasizing active and healthy living, Tesoro Del Mar features tennis courts, basketball courts and a fitness center. Scenic jogging and walking paths wind through the adjacent national park, and playgrounds provide a stimulating environment for children.",
          ],
          es: [
            "Apartamentos contemporáneos y villas de lujo ofrecen opciones de vida de alta calidad, con fácil acceso al Balneario Cerro Gordo. El centro de la comunidad incluye un clubhouse de última generación y un hotel boutique.",
            "Con énfasis en una vida activa y saludable, Tesoro Del Mar cuenta con canchas de tenis y baloncesto y un gimnasio. Senderos para correr y caminar recorren el parque nacional adyacente, y los parques infantiles ofrecen un entorno estimulante para los niños.",
          ],
        },
        image: book.puttingGreen,
      },
      {
        title: { en: "Interiors", es: "Interiores" },
        body: {
          en: [
            "Inside each residence, cutting-edge design meets timeless quality. High-end finishes, custom detailing and a palette inspired by the natural surroundings create a living experience that is both sophisticated and serene.",
            "Open-concept layouts encourage flow and connection, while expansive windows frame sweeping views and bathe the interiors in natural light. Premium materials, stone, wood and brushed metals, contribute to an atmosphere of modern elegance.",
          ],
          es: [
            "En cada residencia, el diseño de vanguardia se une a la calidad atemporal. Acabados de alta gama, detalles a medida y una paleta inspirada en el entorno natural crean una experiencia sofisticada y serena.",
            "Las distribuciones abiertas favorecen el flujo y la conexión, mientras amplios ventanales enmarcan vistas panorámicas y bañan los interiores de luz natural. Materiales premium, piedra, madera y metales cepillados, aportan una atmósfera de elegancia moderna.",
          ],
        },
        image: book.livingDining,
      },
    ],
    hero: book.aerialCoast,
    gallery: [
      book.aerialCoast,
      book.aerialTowers,
      book.exteriorRoad,
      book.poolCabana,
      book.puttingGreen,
      book.porteCochere,
      book.foyer,
      book.gym,
      book.livingDining,
      book.kitchenDining,
      book.primaryBedroom,
      book.bedroomOcean,
      book.bathTub,
      book.study,
      book.penthouseLiving,
      book.penthousePiano,
    ],
  },
  {
    slug: "dorado-waterfalls",
    name: { en: "Dorado Waterfalls", es: "Dorado Waterfalls" },
    tagline: {
      en: "A sustainable community that harmonizes modern living with nature",
      es: "Una comunidad sostenible que armoniza la vida moderna con la naturaleza",
    },
    location: {
      en: "Dorado, Puerto Rico · 25–30 minutes to San Juan",
      es: "Dorado, Puerto Rico · 25–30 minutos de San Juan",
    },
    summary: {
      en: [
        "Dorado Waterfalls is a visionary project designed to harmonize living spaces with the natural environment. Nestled amidst majestic mountains and diverse topography, the project is centered around a vibrant river that weaves through the terrain.",
      ],
      es: [
        "Dorado Waterfalls es un proyecto visionario diseñado para armonizar los espacios de vida con el entorno natural. Enclavado entre montañas majestuosas y una topografía diversa, el proyecto gira en torno a un río vibrante que serpentea por el terreno.",
      ],
    },
    facts: [
      { label: { en: "Location", es: "Ubicación" }, value: "Dorado, Puerto Rico" },
      { label: { en: "Distance to San Juan", es: "Distancia a San Juan" }, value: "25–30 min" },
      { label: { en: "Development type", es: "Tipo de desarrollo" }, value: "Private eco-luxury residences" },
      { label: { en: "Tax incentive", es: "Incentivo fiscal" }, value: "Act 60 eligible" },
    ],
    sections: [
      {
        title: { en: "Architectural concept", es: "Concepto arquitectónico" },
        body: {
          en: [
            "Buildings resemble cascading waterfalls: fluid, multi-tiered designs with glass facades, green terraces and flowing water elements. Native plants, flowers and trees on every terrace extend the natural landscape and give residents private outdoor space.",
            "Cascading water walls, reflective pools and small streams wind through the terraces and common areas, creating a soothing ambiance.",
          ],
          es: [
            "Los edificios evocan cascadas: diseños fluidos y escalonados con fachadas de cristal, terrazas verdes y elementos de agua. Plantas, flores y árboles nativos en cada terraza prolongan el paisaje natural y ofrecen espacio exterior privado.",
            "Muros de agua, espejos reflectantes y pequeños arroyos recorren terrazas y áreas comunes, creando un ambiente sereno.",
          ],
        },
        image: dw.waterWall,
      },
      {
        title: { en: "Community highlights", es: "Lo mejor de la comunidad" },
        body: {
          en: [
            "A mix of residential towers, luxurious villas and retail spaces. The community hub includes a clubhouse and a hotel, with sports facilities, playgrounds and walking trails that meander through the lush landscape. A helipad ensures convenient accessibility.",
          ],
          es: [
            "Una mezcla de torres residenciales, villas de lujo y espacios comerciales. El centro de la comunidad incluye un clubhouse y un hotel, con instalaciones deportivas, parques infantiles y senderos que serpentean por el paisaje exuberante. Un helipuerto garantiza una accesibilidad cómoda.",
          ],
        },
      },
    ],
    hero: renders.doradoWaterfalls,
    gallery: [
      renders.doradoWaterfalls,
      dwx.towers,
      dwx.arrival,
      dwx.lagoonPool,
      dwx.poolUmbrellas,
      dwx.poolPalms,
      dwx.poolLoungers,
      dwx.rooftop,
      dw.masterplan,
      dwx.masterplanAerial,
      dwx.valleyAerial,
      dw.masterplan2,
      dw.lobby,
      dwx.lobbyStair,
      dwx.lobbyTrees,
      dwx.lobbyLounge,
      dw.waterWall,
      dwx.restaurant,
      dwx.diningAquarium,
      dwx.diningCurved,
      dwx.diningGardens,
      dwx.diningTerrace,
      dw.bar,
      dw.lounge,
      dw.living,
      dwx.livingView,
      dwx.residenceLiving,
      dwx.residenceWine,
      dwx.residenceBedroom,
      dwx.residenceCloset,
      dwx.residenceBath,
    ],
  },
];

export const galleryImages: GalleryImage[] = [
  // Tesoro Del Mar brochure renders (client-supplied), shown first.
  {
    id: "book-aerial-coast",
    category: "exteriors",
    image: book.aerialCoast,
    caption: { en: "Tesoro Del Mar above the north coast", es: "Tesoro Del Mar sobre la costa norte" },
  },
  {
    id: "book-aerial-towers",
    category: "exteriors",
    image: book.aerialTowers,
    caption: { en: "The three towers from above", es: "Las tres torres desde lo alto" },
  },
  {
    id: "book-exterior-road",
    category: "exteriors",
    image: book.exteriorRoad,
    caption: { en: "The towers from the approach road", es: "Las torres desde el camino de acceso" },
  },
  {
    id: "book-pool-cabana",
    category: "amenities",
    image: book.poolCabana,
    caption: { en: "Poolside cabana", es: "Cabaña junto a la piscina" },
  },
  {
    id: "book-putting-green",
    category: "amenities",
    image: book.puttingGreen,
    caption: { en: "The 18-hole putting course", es: "El campo de putting de 18 hoyos" },
  },
  {
    id: "book-porte-cochere",
    category: "exteriors",
    image: book.porteCochere,
    caption: { en: "The porte-cochère", es: "El porte-cochère" },
  },
  {
    id: "book-foyer",
    category: "interiors",
    image: book.foyer,
    caption: { en: "The residential lobby", es: "El vestíbulo residencial" },
  },
  {
    id: "book-gym",
    category: "amenities",
    image: book.gym,
    caption: { en: "The fitness center", es: "El gimnasio" },
  },
  {
    id: "book-living-dining",
    category: "interiors",
    image: book.livingDining,
    caption: { en: "Apartment living and dining", es: "Sala y comedor del apartamento" },
  },
  {
    id: "book-kitchen-dining",
    category: "interiors",
    image: book.kitchenDining,
    caption: { en: "Apartment kitchen and dining", es: "Cocina y comedor del apartamento" },
  },
  {
    id: "book-primary-bedroom",
    category: "interiors",
    image: book.primaryBedroom,
    caption: { en: "Primary bedroom", es: "Dormitorio principal" },
  },
  {
    id: "book-bedroom",
    category: "interiors",
    image: book.bedroom,
    caption: { en: "Bedroom", es: "Dormitorio" },
  },
  {
    id: "book-bedroom-ocean",
    category: "interiors",
    image: book.bedroomOcean,
    caption: { en: "Bedroom with an ocean view", es: "Dormitorio con vista al mar" },
  },
  {
    id: "book-bath-vanity",
    category: "interiors",
    image: book.bathVanity,
    caption: { en: "Marble vanity", es: "Tocador en mármol" },
  },
  {
    id: "book-bath-tub",
    category: "interiors",
    image: book.bathTub,
    caption: { en: "Freestanding bath", es: "Bañera exenta" },
  },
  {
    id: "book-powder-room",
    category: "interiors",
    image: book.powderRoom,
    caption: { en: "Powder room", es: "Medio baño" },
  },
  {
    id: "book-study",
    category: "interiors",
    image: book.study,
    caption: { en: "Study", es: "Estudio" },
  },
  {
    id: "book-penthouse-living",
    category: "interiors",
    image: book.penthouseLiving,
    caption: { en: "Penthouse living room", es: "Sala del penthouse" },
  },
  {
    id: "book-penthouse-staircase",
    category: "interiors",
    image: book.penthouseStaircase,
    caption: { en: "Penthouse, double height", es: "Penthouse, doble altura" },
  },
  {
    id: "book-penthouse-piano",
    category: "interiors",
    image: book.penthousePiano,
    caption: { en: "Penthouse lounge", es: "Salón del penthouse" },
  },
  {
    id: "tdm-aerial-towers",
    category: "exteriors",
    image: tdm.aerialTowers,
    caption: { en: "The towers in the forest", es: "Las torres en el bosque" },
  },
  {
    id: "tdm-aerial-villas",
    category: "exteriors",
    image: tdm.aerialVillas,
    caption: { en: "Towers and villas", es: "Torres y villas" },
  },
  {
    id: "tdm-foyer-sign",
    category: "interiors",
    image: tdm.foyerSignage,
    caption: { en: "The Tesoro Del Mar foyer", es: "El vestíbulo de Tesoro Del Mar" },
  },
  {
    id: "tdm-foyer-lounge",
    category: "interiors",
    image: tdm.foyerLounge,
    caption: { en: "Lobby lounge", es: "Salón del vestíbulo" },
  },
  {
    id: "tdm-reception",
    category: "interiors",
    image: tdm.foyerReception,
    caption: { en: "Reception", es: "Recepción" },
  },
  {
    id: "tdm-apt-living-2",
    category: "interiors",
    image: tdm.aptLiving2,
    caption: { en: "Apartment 1403, living room", es: "Apartamento 1403, sala" },
  },
  {
    id: "tdm-penthouse-dining",
    category: "interiors",
    image: tdm.penthouseDining,
    caption: { en: "Penthouse dining room", es: "Comedor del penthouse" },
  },
  {
    id: "tdm-hotel-suite",
    category: "interiors",
    image: tdm.hotelSuite,
    caption: { en: "Hotel suite 210", es: "Suite de hotel 210" },
  },
  {
    id: "pool-terrace",
    category: "amenities",
    image: renders.poolTerrace,
    caption: { en: "Pool terrace", es: "Terraza de la piscina" },
  },
  {
    id: "dw-masterplan",
    category: "exteriors",
    image: dw.masterplan,
    caption: { en: "Dorado Waterfalls master plan", es: "Plan maestro de Dorado Waterfalls" },
  },
  {
    id: "dw-avenue",
    category: "exteriors",
    image: renders.doradoWaterfalls,
    caption: { en: "Dorado Waterfalls", es: "Dorado Waterfalls" },
  },
  {
    id: "dw-water-wall",
    category: "interiors",
    image: dw.waterWall,
    caption: { en: "Dorado Waterfalls water wall", es: "Muro de agua de Dorado Waterfalls" },
  },
  {
    id: "dw-lobby",
    category: "interiors",
    image: dw.lobby,
    caption: { en: "Dorado Waterfalls lobby", es: "Vestíbulo de Dorado Waterfalls" },
  },
  {
    id: "dw-living",
    category: "interiors",
    image: dw.living,
    caption: { en: "Dorado Waterfalls living room", es: "Sala de Dorado Waterfalls" },
  },
  {
    id: "dw-bar",
    category: "amenities",
    image: dw.bar,
    caption: { en: "Dorado Waterfalls lounge bar", es: "Bar lounge de Dorado Waterfalls" },
  },
  { id: "naguabo", category: "exteriors", image: renders.naguabo, caption: { en: "Naguabo", es: "Naguabo" } },
  {
    id: "beach",
    category: "lifestyle",
    image: lifestyle.beach,
    caption: { en: "The north coast", es: "La costa norte" },
  },
  {
    id: "family-pool",
    category: "lifestyle",
    image: lifestyle.familyPool,
    caption: { en: "Family pool", es: "Piscina familiar" },
  },
  {
    id: "pets",
    category: "lifestyle",
    image: lifestyle.dog,
    caption: { en: "Happy homes for all", es: "Hogares felices para todos" },
  },
  { id: "spa", category: "amenities", image: lifestyle.spa, caption: { en: "Spa", es: "Spa" } },
  { id: "sailing", category: "lifestyle", image: lifestyle.sailing, caption: { en: "Sailing", es: "Navegación" } },
  {
    id: "dw-towers",
    category: "exteriors",
    image: dwx.towers,
    caption: { en: "Dorado Waterfalls towers", es: "Torres de Dorado Waterfalls" },
  },
  {
    id: "dw-arrival",
    category: "exteriors",
    image: dwx.arrival,
    caption: { en: "Dorado Waterfalls arrival court", es: "Llegada de Dorado Waterfalls" },
  },
  {
    id: "dw-lagoonpool",
    category: "amenities",
    image: dwx.lagoonPool,
    caption: { en: "Dorado Waterfalls lagoon pool", es: "Piscina laguna de Dorado Waterfalls" },
  },
  {
    id: "dw-poolumbrellas",
    category: "amenities",
    image: dwx.poolUmbrellas,
    caption: { en: "Dorado Waterfalls pool deck", es: "Terraza de piscina de Dorado Waterfalls" },
  },
  {
    id: "dw-rooftop",
    category: "amenities",
    image: dwx.rooftop,
    caption: { en: "Dorado Waterfalls rooftop pool", es: "Piscina en azotea de Dorado Waterfalls" },
  },
  {
    id: "dw-masterplanaerial",
    category: "exteriors",
    image: dwx.masterplanAerial,
    caption: { en: "Dorado Waterfalls masterplan", es: "Plan maestro de Dorado Waterfalls" },
  },
  {
    id: "dw-lobbystair",
    category: "interiors",
    image: dwx.lobbyStair,
    caption: { en: "Dorado Waterfalls lobby", es: "Vestíbulo de Dorado Waterfalls" },
  },
  {
    id: "dw-lobbytrees",
    category: "interiors",
    image: dwx.lobbyTrees,
    caption: { en: "Dorado Waterfalls lobby lounge", es: "Salón del vestíbulo de Dorado Waterfalls" },
  },
  {
    id: "dw-restaurant",
    category: "amenities",
    image: dwx.restaurant,
    caption: { en: "Dorado Waterfalls restaurant", es: "Restaurante de Dorado Waterfalls" },
  },
  {
    id: "dw-diningaquarium",
    category: "amenities",
    image: dwx.diningAquarium,
    caption: { en: "Dorado Waterfalls dining room", es: "Comedor de Dorado Waterfalls" },
  },
  {
    id: "dw-diningterrace",
    category: "amenities",
    image: dwx.diningTerrace,
    caption: { en: "Dorado Waterfalls dining with a view", es: "Comedor con vista en Dorado Waterfalls" },
  },
  {
    id: "dw-residenceliving",
    category: "interiors",
    image: dwx.residenceLiving,
    caption: { en: "Dorado Waterfalls residence living room", es: "Sala de una residencia de Dorado Waterfalls" },
  },
  {
    id: "dw-residencewine",
    category: "interiors",
    image: dwx.residenceWine,
    caption: { en: "Dorado Waterfalls living room and wine wall", es: "Sala y cava de Dorado Waterfalls" },
  },
  {
    id: "dw-residencebedroom",
    category: "interiors",
    image: dwx.residenceBedroom,
    caption: { en: "Dorado Waterfalls principal bedroom", es: "Dormitorio principal de Dorado Waterfalls" },
  },
  {
    id: "dw-residencecloset",
    category: "interiors",
    image: dwx.residenceCloset,
    caption: { en: "Dorado Waterfalls dressing room", es: "Vestidor de Dorado Waterfalls" },
  },
  {
    id: "dw-residencebath",
    category: "interiors",
    image: dwx.residenceBath,
    caption: { en: "Dorado Waterfalls bathroom", es: "Baño de Dorado Waterfalls" },
  },
  { id: "card-thetop", category: "exteriors", image: cards.theTop, caption: { en: "The Top", es: "The Top" } },
  {
    id: "card-oceanview",
    category: "exteriors",
    image: cards.oceanView,
    caption: { en: "Dorado Ocean View Estates", es: "Dorado Ocean View Estates" },
  },
  {
    id: "card-loizaocean",
    category: "exteriors",
    image: cards.loizaOcean,
    caption: { en: "Loíza Ocean", es: "Loíza Ocean" },
  },
  {
    id: "card-loizacountryside",
    category: "exteriors",
    image: cards.loizaCountryside,
    caption: { en: "Loíza Countryside Estates", es: "Loíza Countryside Estates" },
  },
  {
    id: "card-foresttowers",
    category: "exteriors",
    image: cards.forestTowers,
    caption: { en: "ORA World residences above the forest", es: "Residencias ORA World sobre el bosque" },
  },
  {
    id: "card-thetoptowers",
    category: "exteriors",
    image: cards.theTopTowers,
    caption: { en: "ORA World curved towers", es: "Torres curvas de ORA World" },
  },
  {
    id: "tdm-dining",
    category: "interiors",
    image: more.tdmDining,
    caption: { en: "Tesoro Del Mar dining room", es: "Comedor de Tesoro Del Mar" },
  },
  {
    id: "ocean-towers",
    category: "exteriors",
    image: more.oceanTowers,
    caption: { en: "ORA World towers on the coast", es: "Torres de ORA World en la costa" },
  },
  {
    id: "g2-1",
    category: "amenities",
    image: more.gallery[0],
    caption: { en: "Pool terrace", es: "Terraza de piscina" },
  },
  {
    id: "g2-2",
    category: "interiors",
    image: more.gallery[1],
    caption: { en: "Lobby lounge", es: "Salón del vestíbulo" },
  },
  {
    id: "g2-3",
    category: "amenities",
    image: more.gallery[2],
    caption: { en: "Pool loungers", es: "Tumbonas en la piscina" },
  },
  { id: "g2-4", category: "interiors", image: more.gallery[3], caption: { en: "Entrance", es: "Entrada" } },
  {
    id: "g2-5",
    category: "interiors",
    image: more.gallery[4],
    caption: { en: "Dining with a view", es: "Comedor con vista" },
  },
  {
    id: "g2-6",
    category: "amenities",
    image: more.gallery[5],
    caption: { en: "Infinity pool terrace", es: "Terraza con piscina infinita" },
  },
  {
    id: "yacht",
    category: "lifestyle",
    image: more.yacht,
    caption: { en: "Yachting in turquoise water", es: "Navegando en agua turquesa" },
  },
  {
    id: "sunset",
    category: "lifestyle",
    image: more.sunsetChairs,
    caption: { en: "Caribbean sunset", es: "Atardecer caribeño" },
  },
  { id: "golf-cart", category: "lifestyle", image: more.golfCart, caption: { en: "Golf", es: "Golf" } },
  {
    id: "pool-relax",
    category: "lifestyle",
    image: more.poolRelax,
    caption: { en: "Poolside", es: "Junto a la piscina" },
  },
  {
    id: "construction",
    category: "construction",
    image: tdm.aerialForest,
    caption: { en: "Construction updates coming soon", es: "Actualizaciones de obra próximamente" },
  },
];

/** Generic pages: hotel development, careers, legal. */
export const pages: GenericPage[] = [
  {
    slug: "hotel-development",
    title: { en: "Hotel Development", es: "Desarrollo hotelero" },
    intro: {
      en: "Boutique hospitality at the heart of every ORA World community.",
      es: "Hospitalidad boutique en el corazón de cada comunidad ORA World.",
    },
    hero: tdm.foyerAtrium,
    seoDescription: {
      en: "Hotel development opportunities with ORA World in Puerto Rico.",
      es: "Oportunidades de desarrollo hotelero con ORA World en Puerto Rico.",
    },
    sections: [
      {
        title: { en: "Hospitality at the hub", es: "Hospitalidad en el centro" },
        body: {
          en: [
            "Tesoro Del Mar's community hub includes a state-of-the-art clubhouse and a boutique hotel with 42 suites, ensuring exceptional hospitality and recreational facilities. Dorado Waterfalls likewise pairs its clubhouse with a hotel.",
            "Hotel operator, brand partnership and investment structure to be supplied by ORA World.",
          ],
          es: [
            "El centro de Tesoro Del Mar incluye un clubhouse de última generación y un hotel boutique con 42 suites, garantizando hospitalidad y espacios recreativos excepcionales. Dorado Waterfalls también combina su clubhouse con un hotel.",
            "Operador hotelero, alianza de marca y estructura de inversión por suministrar por ORA World.",
          ],
        },
        image: tdm.hotelSuite,
      },
    ],
  },
  {
    slug: "careers",
    title: { en: "Careers", es: "Carreras" },
    intro: {
      en: "Help shape Puerto Rico's most resilient, nature-led communities.",
      es: "Ayude a dar forma a las comunidades más resilientes y naturales de Puerto Rico.",
    },
    hero: lifestyle.adventure,
    seoDescription: { en: "Careers at ORA World.", es: "Carreras en ORA World." },
    sections: [
      {
        title: { en: "Open positions", es: "Posiciones abiertas" },
        body: {
          en: [
            "No open positions have been published yet. Send your résumé through the contact form and we will keep it on file.",
          ],
          es: [
            "Aún no se han publicado posiciones abiertas. Envíe su currículum a través del formulario de contacto y lo mantendremos en archivo.",
          ],
        },
      },
    ],
  },
  {
    slug: "privacy",
    title: { en: "Privacy Policy", es: "Política de privacidad" },
    intro: {
      en: "How ORA World collects, uses and protects your information.",
      es: "Cómo ORA World recopila, usa y protege su información.",
    },
    seoDescription: { en: "ORA World privacy policy.", es: "Política de privacidad de ORA World." },
    sections: [
      {
        title: { en: "Information we collect", es: "Información que recopilamos" },
        body: {
          en: [
            "When you submit an inquiry, register to view floor plans or subscribe to updates, we collect the details you provide (name, email, phone, whether you are a buyer or broker, and your message) together with the page you were on and the campaign that brought you to the site.",
            "With your consent, we use analytics cookies to understand how the site is used. Essential cookies that remember your language and registration are always on.",
          ],
          es: [
            "Cuando envía una consulta, se registra para ver planos o se suscribe a novedades, recopilamos los datos que proporciona (nombre, correo, teléfono, si es comprador o corredor y su mensaje) junto con la página en la que estaba y la campaña que le trajo al sitio.",
            "Con su consentimiento, usamos cookies analíticas para entender cómo se usa el sitio. Las cookies esenciales que recuerdan su idioma y registro siempre están activas.",
          ],
        },
      },
      {
        title: { en: "How we use it", es: "Cómo la usamos" },
        body: {
          en: [
            "To respond to your inquiry, arrange presentations and send the updates you asked for. Your details are shared with ORA World's sales team and its CRM provider, and never sold.",
            "Full policy to be reviewed by ORA World counsel before launch.",
          ],
          es: [
            "Para responder a su consulta, organizar presentaciones y enviarle las novedades que solicitó. Sus datos se comparten con el equipo de ventas de ORA World y su proveedor de CRM, y nunca se venden.",
            "Política completa por revisar por los abogados de ORA World antes del lanzamiento.",
          ],
        },
      },
      {
        title: { en: "Your rights", es: "Sus derechos" },
        body: {
          en: [
            "You may ask us to access, correct or delete your information, or to stop contacting you, at any time by writing to the address in the footer or replying STOP to any text message.",
          ],
          es: [
            "Puede solicitar acceso, corrección o eliminación de su información, o pedir que dejemos de contactarle, en cualquier momento escribiendo a la dirección del pie de página o respondiendo STOP a cualquier mensaje de texto.",
          ],
        },
      },
    ],
  },
  {
    slug: "terms",
    title: { en: "Terms of Use", es: "Términos de uso" },
    intro: { en: "Terms governing the use of this website.", es: "Términos que rigen el uso de este sitio web." },
    seoDescription: { en: "ORA World terms of use.", es: "Términos de uso de ORA World." },
    sections: [
      {
        title: { en: "Not an offering", es: "No es una oferta" },
        body: {
          en: [
            "This website is an advertisement and a solicitation of interest only. No offering of the advertised units can be made and no deposits can be accepted, or reservations, binding or non-binding, can be made until an offering plan is filed with the New York State Department of Law. All images are artist's conceptual renderings. Plans, dimensions, views, finishes, pricing and availability are preliminary and subject to change without notice.",
          ],
          es: [
            "Este sitio web es un anuncio y una solicitud de interés únicamente. No se puede realizar ninguna oferta de las unidades anunciadas ni aceptar depósitos o reservas, vinculantes o no, hasta que se presente un plan de oferta ante el Departamento de Justicia del Estado de Nueva York. Todas las imágenes son representaciones conceptuales del artista. Los planos, dimensiones, vistas, acabados, precios y disponibilidad son preliminares y están sujetos a cambios sin previo aviso.",
          ],
        },
      },
      {
        title: { en: "Use of content", es: "Uso del contenido" },
        body: {
          en: [
            "All content is the property of ORA World and its licensors and may not be reproduced without permission. Full terms to be reviewed by counsel.",
          ],
          es: [
            "Todo el contenido es propiedad de ORA World y sus licenciantes y no puede reproducirse sin permiso. Términos completos por revisar por los abogados.",
          ],
        },
      },
    ],
  },
  {
    slug: "accessibility",
    title: { en: "Accessibility Statement", es: "Declaración de accesibilidad" },
    intro: {
      en: "ORA World is committed to a website that everyone can use.",
      es: "ORA World se compromete a ofrecer un sitio web que todos puedan usar.",
    },
    seoDescription: { en: "ORA World accessibility statement.", es: "Declaración de accesibilidad de ORA World." },
    sections: [
      {
        title: { en: "Our standard", es: "Nuestro estándar" },
        body: {
          en: [
            "This site is built to conform to the Web Content Accessibility Guidelines (WCAG) 2.2 at level AA: semantic structure, full keyboard navigation (including the menu, lightbox, carousels, accordions and map), visible focus states, descriptive alternative text, sufficient color contrast, captions for video and respect for reduced-motion preferences.",
          ],
          es: [
            "Este sitio está construido para cumplir las Pautas de Accesibilidad para el Contenido Web (WCAG) 2.2 en el nivel AA: estructura semántica, navegación completa por teclado (incluidos el menú, la galería, los carruseles, los acordeones y el mapa), estados de foco visibles, textos alternativos descriptivos, contraste suficiente, subtítulos para el video y respeto por la preferencia de movimiento reducido.",
          ],
        },
      },
      {
        title: { en: "Feedback", es: "Comentarios" },
        body: {
          en: [
            "If you encounter a barrier, please tell us through the contact page or the email in the footer. We aim to respond within five business days.",
          ],
          es: [
            "Si encuentra una barrera, indíquenoslo a través de la página de contacto o del correo del pie de página. Procuramos responder en un plazo de cinco días hábiles.",
          ],
        },
      },
    ],
  },
  {
    slug: "legal-disclaimer",
    title: { en: "Legal Disclaimer", es: "Aviso legal" },
    intro: { en: "Required notices for this advertisement.", es: "Avisos requeridos para este anuncio." },
    seoDescription: { en: "ORA World legal disclaimer.", es: "Aviso legal de ORA World." },
    sections: [
      {
        title: { en: "Offering plan", es: "Plan de oferta" },
        body: {
          en: [
            "This advertisement is not an offering. It is a solicitation of interest in the advertised property. No offering of the advertised units can be made and no deposits can be accepted, or reservations, binding or non - binding, can be made until an offering plan is filed with the New York State Department of Law. This advertisement is made pursuant to Cooperative Policy Statement No. 1, issued by the New York State Department of Law. Attorney General File No.: CP25-0047. Sponsor: TRPbuildco LLC Sponsor’s Address: Tesoro Del Mar Dorado, Vega Alta, Puerto Rico 00692",
            "All images on this website are artist renderings.",
          ],
          es: [
            "This advertisement is not an offering. It is a solicitation of interest in the advertised property. No offering of the advertised units can be made and no deposits can be accepted, or reservations, binding or non - binding, can be made until an offering plan is filed with the New York State Department of Law. This advertisement is made pursuant to Cooperative Policy Statement No. 1, issued by the New York State Department of Law. Attorney General File No.: CP25-0047. Sponsor: TRPbuildco LLC Sponsor’s Address: Tesoro Del Mar Dorado, Vega Alta, Puerto Rico 00692",
            "Todas las imágenes de este sitio web son representaciones artísticas.",
          ],
        },
      },
      {
        title: { en: "Equal Housing Opportunity", es: "Igualdad de oportunidades de vivienda" },
        body: {
          en: ["ORA World supports the Fair Housing Act and the Equal Housing Opportunity principles."],
          es: ["ORA World apoya la Ley de Vivienda Justa y los principios de igualdad de oportunidades de vivienda."],
        },
      },
    ],
  },
];
