import type { Amenity, Activity } from "../types";
import { renders, lifestyle } from "./images";

export const amenities: Amenity[] = [
  {
    slug: "spa",
    category: "wellness",
    featured: true,
    name: { en: "World-class spa", es: "Spa de clase mundial" },
    description: {
      en: "Full-service facilities offering treatments inspired by local and global traditions.",
      es: "Instalaciones completas con tratamientos inspirados en tradiciones locales y globales.",
    },
    image: lifestyle.spa,
  },
  {
    slug: "infinity-pools",
    category: "wellness",
    featured: true,
    name: { en: "Private infinity pools", es: "Piscinas infinitas privadas" },
    description: { en: "Secluded pools with breathtaking views.", es: "Piscinas apartadas con vistas impresionantes." },
    image: renders.poolTerrace,
  },
  {
    slug: "fitness",
    category: "wellness",
    featured: true,
    name: { en: "Fitness center", es: "Centro de fitness" },
    description: {
      en: "State-of-the-art equipment, personal trainers and classes from yoga and Pilates to spin.",
      es: "Equipamiento de última generación, entrenadores personales y clases de yoga, pilates y spinning.",
    },
    image: lifestyle.gym,
  },
  {
    slug: "wellness-retreats",
    category: "wellness",
    name: { en: "Wellness retreats", es: "Retiros de bienestar" },
    description: {
      en: "Programs focused on mindfulness, nutrition and fitness, with hot tubs and hydrotherapy areas.",
      es: "Programas de atención plena, nutrición y ejercicio, con jacuzzis y áreas de hidroterapia.",
    },
    image: lifestyle.running,
  },
  {
    slug: "kids-club",
    category: "family",
    featured: true,
    name: { en: "Kids' clubs and adventure camps", es: "Clubes infantiles y campamentos de aventura" },
    description: {
      en: "Engaging, educational programs for younger members.",
      es: "Programas educativos y entretenidos para los más pequeños.",
    },
    image: lifestyle.waterpark,
  },
  {
    slug: "family-pools",
    category: "family",
    featured: true,
    name: { en: "Family pools", es: "Piscinas familiares" },
    description: {
      en: "Separate pools designed for families with children.",
      es: "Piscinas independientes diseñadas para familias con niños.",
    },
    image: lifestyle.familyPool,
  },
  {
    slug: "game-rooms",
    category: "family",
    name: { en: "Game rooms", es: "Salas de juego" },
    description: {
      en: "High-end gaming setups for teens and adults, movie screenings and craft workshops for kids.",
      es: "Equipos de juego de alta gama para jóvenes y adultos, proyecciones de cine y talleres creativos para niños.",
    },
    image: lifestyle.motherChild,
  },
  {
    slug: "education",
    category: "family",
    name: { en: "Education partnerships", es: "Alianzas educativas" },
    description: {
      en: "Private schools, tutoring services and creative workshops for every age.",
      es: "Escuelas privadas, tutorías y talleres creativos para todas las edades.",
    },
    image: lifestyle.graduation,
  },
  {
    slug: "dog-parks",
    category: "pets",
    featured: true,
    name: { en: "Secure dog parks", es: "Parques caninos seguros" },
    description: {
      en: "Expansive, secure outdoor play areas where companions can stretch their legs and mingle.",
      es: "Amplias áreas de juego al aire libre y seguras donde los compañeros pueden correr y socializar.",
    },
    image: lifestyle.dog,
  },
  {
    slug: "pet-concierge",
    category: "pets",
    name: { en: "Grooming and pet concierge", es: "Aseo y conserjería para mascotas" },
    description: {
      en: "Grooming stations, daycare, on-demand veterinary care, training sessions and pet-friendly events.",
      es: "Estaciones de aseo, guardería, atención veterinaria a demanda, adiestramiento y eventos pet-friendly.",
    },
    image: lifestyle.kite,
  },
  {
    slug: "beach-club",
    category: "resort",
    featured: true,
    name: { en: "Private beach club", es: "Club de playa privado" },
    description: {
      en: "Exclusive access to pristine beaches with cabanas and full service.",
      es: "Acceso exclusivo a playas vírgenes con cabañas y servicio completo.",
    },
    image: lifestyle.beach,
  },
  {
    slug: "dining",
    category: "resort",
    featured: true,
    name: { en: "Fine dining and private chefs", es: "Alta cocina y chefs privados" },
    description: {
      en: "Fine dining with renowned chefs, wine and cigar lounges, rooftop bars and members-only clubhouses.",
      es: "Alta cocina con chefs reconocidos, salones de vino y puros, bares en azotea y clubes exclusivos para miembros.",
    },
    image: lifestyle.culinary,
  },
  {
    slug: "cinema",
    category: "resort",
    name: { en: "Luxury cinemas", es: "Cines de lujo" },
    description: {
      en: "In-residence and community theaters with premium sound and comfort.",
      es: "Salas de cine privadas y comunitarias con sonido y confort premium.",
    },
    image: lifestyle.party,
  },
  {
    slug: "courts",
    category: "resort",
    name: { en: "Tennis and pickleball", es: "Tenis y pickleball" },
    description: {
      en: "Professionally maintained courts, with basketball courts and championship golf access nearby.",
      es: "Canchas mantenidas profesionalmente, con canchas de baloncesto y acceso a golf de campeonato cerca.",
    },
    image: lifestyle.surf,
  },
  {
    slug: "transportation",
    category: "resort",
    name: { en: "Helipad and private charters", es: "Helipuerto y vuelos privados" },
    description: {
      en: "Private helipads, luxury shuttles, valet parking and access to yachts, jets and chauffeur services.",
      es: "Helipuertos privados, traslados de lujo, valet parking y acceso a yates, jets y servicio de chofer.",
    },
    image: lifestyle.jet,
  },
  {
    slug: "eco-trails",
    category: "eco",
    featured: true,
    name: { en: "Eco-trails", es: "Senderos ecológicos" },
    description: {
      en: "Walking paths that integrate with the natural beauty of the surroundings and the adjacent national park.",
      es: "Senderos que se integran con la belleza natural del entorno y el parque nacional adyacente.",
    },
    image: lifestyle.rainforest,
  },
  {
    slug: "organic-gardens",
    category: "eco",
    name: { en: "Organic and sensory gardens", es: "Jardines orgánicos y sensoriales" },
    description: {
      en: "On-site gardens providing fresh produce for dining, and sensory gardens along scenic walking paths.",
      es: "Huertos en el lugar que abastecen los restaurantes, y jardines sensoriales a lo largo de paseos escénicos.",
    },
    image: lifestyle.adventure,
  },
  {
    slug: "solar",
    category: "eco",
    name: { en: "Solar and battery backup", es: "Energía solar y baterías" },
    description: {
      en: "Solar panels and battery storage for sustainable, reliable energy, with natural ventilation and daylight by design.",
      es: "Paneles solares y baterías para una energía sostenible y fiable, con ventilación natural y luz de día por diseño.",
    },
    image: renders.towerDetail,
  },
];

export const activities: Activity[] = [
  {
    slug: "sport-fitness",
    group: { en: "Sport & Fitness", es: "Deporte y fitness" },
    image: lifestyle.running,
    items: [
      {
        name: { en: "Golf", es: "Golf" },
        description: {
          en: "Access to championship golf courses with lessons from PGA professionals.",
          es: "Acceso a campos de golf de campeonato con clases de profesionales de la PGA.",
        },
      },
      {
        name: { en: "Tennis and pickleball", es: "Tenis y pickleball" },
        description: {
          en: "Professionally maintained courts with coaching sessions.",
          es: "Canchas mantenidas profesionalmente con sesiones de entrenamiento.",
        },
      },
      {
        name: { en: "Personal training", es: "Entrenamiento personal" },
        description: {
          en: "One-on-one sessions with elite personal trainers.",
          es: "Sesiones individuales con entrenadores de élite.",
        },
      },
      {
        name: { en: "Yoga and meditation", es: "Yoga y meditación" },
        description: {
          en: "Outdoor yoga on the beach or in wellness centers.",
          es: "Yoga al aire libre en la playa o en los centros de bienestar.",
        },
      },
      {
        name: { en: "Cycling and running trails", es: "Senderos para ciclismo y running" },
        description: { en: "Scenic paths through lush landscapes.", es: "Rutas escénicas entre paisajes exuberantes." },
      },
      {
        name: { en: "Beach volleyball", es: "Voleibol de playa" },
        description: {
          en: "Private courts with organized matches or casual play.",
          es: "Canchas privadas con partidos organizados o juego casual.",
        },
      },
    ],
  },
  {
    slug: "water",
    group: { en: "Water Sport & Adventures", es: "Deportes acuáticos y aventuras" },
    image: lifestyle.surf,
    items: [
      {
        name: { en: "Scuba diving and snorkeling", es: "Buceo y esnórquel" },
        description: {
          en: "Explore coral reefs with certified guides.",
          es: "Explore arrecifes de coral con guías certificados.",
        },
      },
      {
        name: { en: "Sailing and yacht charters", es: "Vela y alquiler de yates" },
        description: {
          en: "Private yacht rentals for day trips or sunset cruises.",
          es: "Yates privados para excursiones de día o cruceros al atardecer.",
        },
      },
      {
        name: { en: "Kayaking and paddleboarding", es: "Kayak y paddleboard" },
        description: {
          en: "Calm waters perfect for exploring lagoons and coastlines.",
          es: "Aguas tranquilas ideales para explorar lagunas y costas.",
        },
      },
      {
        name: { en: "Surfing and kiteboarding", es: "Surf y kiteboarding" },
        description: {
          en: "Lessons for beginners or prime spots for experienced riders.",
          es: "Clases para principiantes o spots de primera para expertos.",
        },
      },
      {
        name: { en: "Eco-friendly boat tours", es: "Paseos en barco ecológicos" },
        description: {
          en: "Solar-powered cruises through mangroves and marine reserves.",
          es: "Cruceros solares por manglares y reservas marinas.",
        },
      },
    ],
  },
  {
    slug: "culinary",
    group: { en: "Culinary & Cultural Experiences", es: "Experiencias culinarias y culturales" },
    image: lifestyle.culinary,
    items: [
      {
        name: { en: "Cooking classes", es: "Clases de cocina" },
        description: {
          en: "Learn to prepare local Caribbean dishes with renowned chefs.",
          es: "Aprenda a preparar platos caribeños con chefs reconocidos.",
        },
      },
      {
        name: { en: "Wine and rum tastings", es: "Catas de vino y ron" },
        description: {
          en: "Guided tastings of local and international selections.",
          es: "Catas guiadas de selecciones locales e internacionales.",
        },
      },
      {
        name: { en: "Farm-to-table dinners", es: "Cenas de la huerta a la mesa" },
        description: {
          en: "Exclusive dining featuring local organic produce.",
          es: "Cenas exclusivas con productos orgánicos locales.",
        },
      },
      {
        name: { en: "Caribbean cultural nights", es: "Noches culturales caribeñas" },
        description: {
          en: "Live music, dance and food celebrating local traditions.",
          es: "Música en vivo, baile y gastronomía que celebran las tradiciones locales.",
        },
      },
      {
        name: { en: "Salsa and bachata", es: "Salsa y bachata" },
        description: {
          en: "Learn or refine your skills with professional instructors.",
          es: "Aprenda o perfeccione su baile con instructores profesionales.",
        },
      },
    ],
  },
  {
    slug: "entertainment",
    group: { en: "Entertainment & Leisure", es: "Entretenimiento y ocio" },
    image: lifestyle.party,
    items: [
      {
        name: { en: "Outdoor movie nights", es: "Noches de cine al aire libre" },
        description: {
          en: "Under-the-stars screenings with luxury seating.",
          es: "Proyecciones bajo las estrellas con asientos de lujo.",
        },
      },
      {
        name: { en: "Live music and performances", es: "Música y espectáculos en vivo" },
        description: {
          en: "Concerts, jazz nights and cultural shows.",
          es: "Conciertos, noches de jazz y espectáculos culturales.",
        },
      },
      {
        name: { en: "Stargazing nights", es: "Noches de observación de estrellas" },
        description: {
          en: "Guided experiences with telescopes and astronomy experts.",
          es: "Experiencias guiadas con telescopios y expertos en astronomía.",
        },
      },
      {
        name: { en: "Art galleries and exhibits", es: "Galerías y exposiciones de arte" },
        description: {
          en: "Curated collections of local and international art.",
          es: "Colecciones de arte local e internacional.",
        },
      },
    ],
  },
  {
    slug: "adventure",
    group: { en: "Adventure & Exploration", es: "Aventura y exploración" },
    image: lifestyle.atv,
    items: [
      {
        name: { en: "Hiking tours", es: "Senderismo guiado" },
        description: {
          en: "Guided treks through rainforests or mountainous terrain.",
          es: "Caminatas guiadas por bosques tropicales o terreno montañoso.",
        },
      },
      {
        name: { en: "Ziplining", es: "Tirolesa" },
        description: {
          en: "Thrilling rides through tropical canopies.",
          es: "Recorridos emocionantes entre el dosel tropical.",
        },
      },
      {
        name: { en: "ATV and jeep safaris", es: "Safaris en ATV y jeep" },
        description: { en: "Explore rugged terrains in style.", es: "Explore terrenos escarpados con estilo." },
      },
      {
        name: { en: "Island hopping", es: "Salto entre islas" },
        description: { en: "Private tours to nearby islands.", es: "Excursiones privadas a islas cercanas." },
      },
    ],
  },
  {
    slug: "family",
    group: { en: "Family-Friendly Activities", es: "Actividades familiares" },
    image: lifestyle.kite,
    items: [
      {
        name: { en: "Kids' adventure camps", es: "Campamentos de aventura infantiles" },
        description: {
          en: "Fun and educational programs for children.",
          es: "Programas divertidos y educativos para niños.",
        },
      },
      {
        name: { en: "Family movie screenings", es: "Cine en familia" },
        description: {
          en: "Outdoor or indoor showings for all ages.",
          es: "Proyecciones al aire libre o en sala para todas las edades.",
        },
      },
      {
        name: { en: "Interactive marine encounters", es: "Encuentros marinos interactivos" },
        description: {
          en: "Safe and exciting activities for kids to learn about marine life.",
          es: "Actividades seguras y emocionantes para que los niños conozcan la vida marina.",
        },
      },
      {
        name: { en: "Treasure hunts", es: "Búsquedas del tesoro" },
        description: { en: "Family-friendly exploration games.", es: "Juegos de exploración para toda la familia." },
      },
    ],
  },
];
