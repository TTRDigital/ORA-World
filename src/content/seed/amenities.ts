import type { Amenity, Activity } from "../types";
import { renders, lifestyle, more, book } from "./images";

export const amenities: Amenity[] = [
  // From the Tesoro Del Mar brochure: The Building, Clubhouse Amenities and Tower Amenities.
  {
    slug: "fitness",
    category: "wellness",
    featured: true,
    name: { en: "Fitness center and pilates studio", es: "Gimnasio y estudio de pilates" },
    description: {
      en: "A state-of-the-art fitness center and pilates studio.",
      es: "Un gimnasio de última generación y estudio de pilates.",
    },
    image: book.gym,
  },
  {
    slug: "spa",
    category: "wellness",
    name: { en: "Wellness spa", es: "Spa de bienestar" },
    description: {
      en: "A spa area equipped for massage, treatments and salon services.",
      es: "Un spa equipado para masajes, tratamientos y servicios de salón.",
    },
    image: book.spa,
  },
  {
    slug: "yoga",
    category: "wellness",
    name: { en: "Outdoor yoga terrace", es: "Terraza de yoga al aire libre" },
    description: {
      en: "Sun salutations on the outdoor yoga terrace.",
      es: "Saludos al sol en la terraza de yoga al aire libre.",
    },
  },
  {
    slug: "walking-path",
    category: "wellness",
    name: { en: "Two-mile walking path", es: "Sendero de dos millas" },
    description: {
      en: "A two-mile walking path through landscaped gardens.",
      es: "Un sendero de dos millas entre jardines paisajísticos.",
    },
  },
  {
    slug: "pool",
    category: "resort",
    featured: true,
    name: { en: "Resort-style pool", es: "Piscina estilo resort" },
    description: {
      en: "An outdoor resort-style pool with sundeck and poolside bar, plus a rooftop pool at the clubhouse.",
      es: "Una piscina exterior estilo resort con solárium y bar, y una piscina en la azotea del club.",
    },
    image: book.poolCabana,
  },
  {
    slug: "putting-course",
    category: "resort",
    featured: true,
    name: { en: "18-hole putting course", es: "Campo de putting de 18 hoyos" },
    description: {
      en: "Next-generation golf featuring an 18-hole putting course.",
      es: "Golf de nueva generación con un campo de putting de 18 hoyos.",
    },
    image: book.puttingGreen,
  },
  {
    slug: "beach-club",
    category: "resort",
    featured: true,
    name: { en: "Private beach club", es: "Club de playa privado" },
    description: {
      en: "Shaded lounges, food and drink service and effortless access to the sea, by walking path or golf cart.",
      es: "Tumbonas a la sombra, servicio de comida y bebida y acceso directo al mar, a pie o en carrito de golf.",
    },
    image: book.aerialCoast,
  },
  {
    slug: "slipway",
    category: "resort",
    name: { en: "Boat slipway", es: "Rampa para embarcaciones" },
    description: {
      en: "A slipway for easy boat launching: snorkeling, jet skiing or sunset cruising.",
      es: "Una rampa para botar embarcaciones con facilidad: snorkel, moto acuática o paseos al atardecer.",
    },
  },
  {
    slug: "sports-courts",
    category: "resort",
    name: { en: "Outdoor sports courts", es: "Canchas deportivas" },
    description: {
      en: "Tennis courts, a half basketball court and a beach volleyball court, also usable for beach tennis.",
      es: "Canchas de tenis, media cancha de baloncesto y cancha de vóley playa, también para tenis playa.",
    },
  },
  {
    slug: "golf-simulator",
    category: "resort",
    name: { en: "Multisport simulator and lounge", es: "Simulador multideporte y salón" },
    description: {
      en: "A programmable multisport (golf) simulator and lounge.",
      es: "Un simulador multideporte (golf) programable y salón.",
    },
  },
  {
    slug: "dining",
    category: "resort",
    name: { en: "Fine dining and café", es: "Restaurante y café" },
    description: {
      en: "A fine-dining restaurant, plus a café, bakery and corner store for daily necessities.",
      es: "Un restaurante de alta cocina, además de café, panadería y tienda para lo cotidiano.",
    },
  },
  {
    slug: "events",
    category: "resort",
    name: { en: "Spaces to gather", es: "Espacios para reunirse" },
    description: {
      en: "Elegant indoor and outdoor spaces for socializing and hosting events.",
      es: "Elegantes espacios interiores y exteriores para socializar y celebrar eventos.",
    },
  },
  {
    slug: "children",
    category: "family",
    name: { en: "Children's play area", es: "Área de juegos infantil" },
    description: {
      en: "A children's play area and outdoor playgrounds, with splash zones.",
      es: "Área de juegos infantil y parques al aire libre, con zonas de agua.",
    },
  },
  {
    slug: "teen-lounge",
    category: "family",
    name: { en: "Teen game lounge", es: "Salón juvenil" },
    description: {
      en: "A teen game lounge and entertainment room.",
      es: "Un salón de juegos juvenil y sala de entretenimiento.",
    },
  },
  {
    slug: "dog-parks",
    category: "pets",
    name: { en: "Dog parks", es: "Parques para perros" },
    description: { en: "Dog parks within the community.", es: "Parques para perros dentro de la comunidad." },
  },
  {
    slug: "lobby",
    category: "eco",
    featured: true,
    name: { en: "Private residential lobby", es: "Vestíbulo residencial privado" },
    description: {
      en: "A porte-cochère with a private residential lobby attended 24/7.",
      es: "Porte-cochère con vestíbulo residencial privado atendido 24/7.",
    },
    image: book.porteCochere,
  },
  {
    slug: "resident-lounge",
    category: "eco",
    featured: true,
    name: { en: "Resident lounge", es: "Salón de residentes" },
    description: {
      en: "A resident lounge with curated art and bar service.",
      es: "Un salón de residentes con arte seleccionado y servicio de bar.",
    },
    image: book.foyer,
  },
  {
    slug: "business-center",
    category: "eco",
    name: { en: "Business center", es: "Centro de negocios" },
    description: {
      en: "Conference rooms, reservable private offices, a coffee bar, high-speed Wi-Fi and IT services available 24/7.",
      es: "Salas de reuniones, oficinas privadas reservables, café, Wi-Fi de alta velocidad y servicio de TI 24/7.",
    },
  },
  {
    slug: "arrival",
    category: "eco",
    name: { en: "Valet, house car and golf carts", es: "Valet, auto de la casa y carritos" },
    description: {
      en: "On-site valet and self-parking, a luxury house car and golf cart service.",
      es: "Valet y estacionamiento propio, auto de lujo para residentes y servicio de carritos de golf.",
    },
  },
  {
    slug: "private-travel",
    category: "eco",
    name: { en: "Ora World Jet and Ora Lift", es: "Ora World Jet y Ora Lift" },
    description: {
      en: "Private jet charters by Ora World Jet and Ora Lift vertical take-off and landing vehicles.",
      es: "Vuelos chárter con Ora World Jet y vehículos de despegue vertical Ora Lift.",
    },
    image: book.jet,
  },
  {
    slug: "storage",
    category: "eco",
    name: { en: "Private storage", es: "Almacenamiento privado" },
    description: {
      en: "Private, secure, climate-controlled storage.",
      es: "Almacenamiento privado, seguro y climatizado.",
    },
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
  {
    slug: "medical",
    group: { en: "Medical Services", es: "Servicios médicos" },
    image: more.medical,
    items: [
      {
        name: { en: "Private health clinics", es: "Clínicas de salud privadas" },
        description: {
          en: "On-site or nearby luxury clinics offering personalized care and consultations.",
          es: "Clínicas de lujo en el lugar o cercanas con atención y consultas personalizadas.",
        },
      },
      {
        name: { en: "Telemedicine services", es: "Telemedicina" },
        description: {
          en: "24/7 access to virtual consultations with world-class doctors.",
          es: "Acceso 24/7 a consultas virtuales con médicos de primer nivel.",
        },
      },
      {
        name: { en: "Wellness and preventative care", es: "Bienestar y medicina preventiva" },
        description: {
          en: "Holistic health services, including nutrition counseling and physical therapy.",
          es: "Servicios de salud integrales, incluida asesoría nutricional y fisioterapia.",
        },
      },
      {
        name: { en: "Specialist access", es: "Acceso a especialistas" },
        description: {
          en: "Partnerships with top medical professionals in cardiology, dermatology, orthopedics, and more.",
          es: "Alianzas con destacados profesionales en cardiología, dermatología, ortopedia y más.",
        },
      },
      {
        name: { en: "Emergency care access", es: "Acceso a atención de emergencia" },
        description: {
          en: "Priority service agreements with nearby hospitals or private emergency services.",
          es: "Acuerdos de servicio prioritario con hospitales cercanos o servicios de emergencia privados.",
        },
      },
      {
        name: { en: "Concierge healthcare", es: "Conserjería médica" },
        description: {
          en: "Personal medical coordinators for check-ups, procedures, or specialist appointments.",
          es: "Coordinadores médicos personales para chequeos, procedimientos o citas con especialistas.",
        },
      },
    ],
  },
  {
    slug: "educational",
    group: { en: "Educational Services", es: "Servicios educativos" },
    image: lifestyle.graduation,
    items: [
      {
        name: { en: "Private schools", es: "Escuelas privadas" },
        description: {
          en: "Partnerships with top-tier international schools offering bilingual and global curriculums.",
          es: "Alianzas con escuelas internacionales de primer nivel con programas bilingües y globales.",
        },
      },
      {
        name: { en: "Tutoring services", es: "Tutorías" },
        description: {
          en: "On-demand private tutors for children and adults.",
          es: "Tutores privados a demanda para niños y adultos.",
        },
      },
      {
        name: { en: "Workshops and classes", es: "Talleres y clases" },
        description: {
          en: "Local language lessons, art courses, coding workshops, or business seminars.",
          es: "Clases de idioma, cursos de arte, talleres de programación o seminarios de negocios.",
        },
      },
      {
        name: { en: "Learning pods for kids", es: "Grupos de aprendizaje infantil" },
        description: {
          en: "Small, personalized learning groups for children of residents.",
          es: "Grupos pequeños y personalizados de aprendizaje para los hijos de los residentes.",
        },
      },
      {
        name: { en: "Scholarship opportunities", es: "Oportunidades de becas" },
        description: {
          en: "Support for continuing education in collaboration with local and global institutions.",
          es: "Apoyo a la formación continua en colaboración con instituciones locales y globales.",
        },
      },
    ],
  },
  {
    slug: "shopping",
    group: { en: "High-End Shopping", es: "Compras de lujo" },
    image: lifestyle.shopping,
    items: [
      {
        name: { en: "Luxury boutiques", es: "Boutiques de lujo" },
        description: {
          en: "On-site or nearby access to international luxury brands.",
          es: "Acceso en el lugar o cercano a marcas internacionales de lujo.",
        },
      },
      {
        name: { en: "Designer pop-up shops", es: "Tiendas pop-up de diseñadores" },
        description: {
          en: "Rotating exclusive pop-ups featuring limited-edition collections.",
          es: "Pop-ups exclusivos y rotativos con colecciones de edición limitada.",
        },
      },
      {
        name: { en: "Personal shopping", es: "Asesoría de compras" },
        description: {
          en: "Concierge assistance with finding and purchasing unique items.",
          es: "Asistencia de conserjería para encontrar y adquirir piezas únicas.",
        },
      },
      {
        name: { en: "Local artisans", es: "Artesanos locales" },
        description: {
          en: "Private shopping experiences featuring handcrafted jewelry, art, and textiles.",
          es: "Experiencias de compra privadas con joyería, arte y textiles artesanales.",
        },
      },
      {
        name: { en: "Private fashion shows", es: "Desfiles privados" },
        description: {
          en: "Invite-only showcases of the latest collections from top designers.",
          es: "Presentaciones por invitación de las últimas colecciones de grandes diseñadores.",
        },
      },
      {
        name: { en: "Curated home décor", es: "Decoración seleccionada" },
        description: {
          en: "Access to high-end furniture and interior design retailers.",
          es: "Acceso a tiendas de mobiliario y diseño interior de alta gama.",
        },
      },
    ],
  },
  {
    slug: "additional",
    group: { en: "Additional Services", es: "Servicios adicionales" },
    image: lifestyle.motherChild,
    items: [
      {
        name: { en: "Childcare and nanny services", es: "Cuidado infantil y niñeras" },
        description: {
          en: "Professional and vetted childcare providers available on request.",
          es: "Cuidadores profesionales y verificados disponibles a solicitud.",
        },
      },
      {
        name: { en: "Pet services", es: "Servicios para mascotas" },
        description: {
          en: "Grooming, daycare, and veterinary services for pets.",
          es: "Aseo, guardería y servicios veterinarios para mascotas.",
        },
      },
      {
        name: { en: "Event planning", es: "Organización de eventos" },
        description: {
          en: "Full-service support for private events, from birthdays to corporate gatherings.",
          es: "Apoyo integral para eventos privados, desde cumpleaños hasta reuniones corporativas.",
        },
      },
      {
        name: { en: "Private transportation", es: "Transporte privado" },
        description: {
          en: "Arranging yachts, jets, or luxury cars for seamless travel.",
          es: "Coordinación de yates, jets o autos de lujo para viajar sin contratiempos.",
        },
      },
      {
        name: { en: "Cultural club memberships", es: "Membresías culturales" },
        description: {
          en: "Access to private galleries, music venues, or exclusive events.",
          es: "Acceso a galerías privadas, salas de música o eventos exclusivos.",
        },
      },
      {
        name: { en: "Grocery and essentials delivery", es: "Entrega de víveres" },
        description: {
          en: "Premium delivery service for food, wine, and other essentials.",
          es: "Servicio premium de entrega de alimentos, vinos y otros esenciales.",
        },
      },
    ],
  },
];
