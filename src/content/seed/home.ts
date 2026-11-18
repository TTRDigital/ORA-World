import type { HomeContent } from "../types";
import { renders, lifestyle, tdm, more, drawings, book } from "./images";

export const home: HomeContent = {
  hero: {
    eyebrow: { en: "Tesoro Del Mar · Puerto Rico", es: "Tesoro Del Mar · Puerto Rico" },
    headline: { en: "*Beyond* expectations", es: "Más allá de lo *esperado*" },
    tagline: {
      en: "Thoughtfully crafted communities where longevity, luxury, and nature exist in perfect harmony.",
      es: "Comunidades concebidas con esmero donde la longevidad, el lujo y la naturaleza conviven en perfecta armonía.",
    },
    // Figures from the Tesoro Del Mar brochure (TeseloDelmar.pdf, client-supplied, Nov 2026).
    stats: [
      { value: 17, label: { en: "Acre coastal community", es: "Acres de comunidad costera" } },
      { value: 60, label: { en: "Residences in Phase One", es: "Residencias en la Fase Uno" } },
      { value: 65000, suffix: "+", label: { en: "Sq ft of amenities", es: "Pies² de amenidades" } },
      { value: 14000, label: { en: "Sq ft members-only clubhouse", es: "Pies² de club privado" } },
    ],
    // Client's layout film (Tesoro-Layout-Film-v5). Poster is its opening aerial, so the start is seamless.
    poster: book.aerialCoast,
    videoLoop: "/videos/hero/tesoro-film.mp4",
    videoLoopWebm: null,
    videoMobile: "/videos/hero/tesoro-film-mobile.mp4",
  },
  manifesto: {
    eyebrow: { en: "Oceanfront location", es: "Ubicación frente al mar" },
    title: { en: "A rare *vantage*", es: "Una perspectiva *única*" },
    // Brochure, "A Rare Vantage" (opening of the paragraph).
    text: {
      en: "Perched along Puerto Rico's enchanting northern shores, Tesoro del Mar unfolds like a well-kept secret, one whispered by the sea itself. Here, gentle waves lap golden, soft-sand shores. Crystal-clear waters beckon families and snorkelers alike, promising playful encounters with sea turtles and tropical fish.",
      es: "En la encantadora costa norte de Puerto Rico, Tesoro del Mar se descubre como un secreto bien guardado, uno que susurra el propio mar. Aquí, las olas suaves acarician playas de arena dorada. Sus aguas cristalinas invitan a familias y a quienes practican snorkel, con encuentros con tortugas marinas y peces tropicales.",
    },
    signature: { en: "Tesoro Del Mar · An Ora World residence", es: "Tesoro Del Mar · Una residencia Ora World" },
    // Brochure, "The Building".
    pillars: [
      {
        title: { en: "Steps from the beach", es: "A pasos de la playa" },
        text: { en: "Steps from the beach and the national park.", es: "A pasos de la playa y del parque nacional." },
      },
      {
        title: { en: "An all-glass façade", es: "Fachada de cristal" },
        text: {
          en: "Designed to maximize light and views of the Puerto Rico coastline and the Atlantic Ocean.",
          es: "Diseñada para aprovechar la luz y las vistas de la costa de Puerto Rico y del océano Atlántico.",
        },
      },
      {
        title: { en: "Attended 24/7", es: "Atención 24/7" },
        text: {
          en: "A porte-cochère with a private residential lobby, valet parking and a luxury house car.",
          es: "Porte-cochère con vestíbulo residencial privado, servicio de valet y auto de lujo para residentes.",
        },
      },
      {
        title: { en: "Private travel", es: "Viajes privados" },
        text: {
          en: "Private jet charters by Ora World Jet and Ora Lift vertical take-off and landing vehicles.",
          es: "Vuelos chárter privados con Ora World Jet y vehículos de despegue vertical Ora Lift.",
        },
      },
    ],
    image: book.aerialTowers,
    inset: book.puttingGreen,
    third: book.aerialCoast,
  },
  context: {
    image: book.aerialCoast,
    captions: [
      {
        en: "Curved facades inspired by the flight of birds, cantilevered terraces extending like wings.",
        es: "Fachadas curvas inspiradas en el vuelo de las aves; terrazas en voladizo que se extienden como alas.",
      },
      {
        en: "Steps from the beach and national park. About 35 minutes from San Juan.",
        es: "A pasos de la playa y del parque nacional. A unos 35 minutos de San Juan.",
      },
    ],
  },
  place: {
    eyebrow: { en: "The Place", es: "El lugar" },
    title: { en: "An island like *no other*", es: "Una isla como *ninguna otra*" },
    intro: {
      en: "Discover the luminous beauty of Puerto Rico, from its turquoise shores to its lush mountain landscapes. The island's vibrant culture is woven into every experience.",
      es: "Descubra la belleza luminosa de Puerto Rico, desde sus costas turquesa hasta sus paisajes de montaña. La cultura vibrante de la isla está entretejida en cada experiencia.",
    },
    chapters: [
      {
        number: "01",
        title: { en: "The shore", es: "La costa" },
        text: {
          en: "Sparkling turquoise waters lap against soft sandy shores.",
          es: "Aguas turquesa resplandecientes acarician suaves orillas de arena.",
        },
        image: lifestyle.beach,
      },
      {
        number: "02",
        title: { en: "The rainforest", es: "El bosque" },
        text: {
          en: "Hike the trails of El Yunque National Forest beneath a serene canopy.",
          es: "Recorra los senderos del Bosque Nacional El Yunque bajo un dosel sereno.",
        },
        image: lifestyle.rainforest,
      },
      {
        number: "03",
        title: { en: "The sea", es: "El mar" },
        text: {
          en: "Paddle through bioluminescent bays or sail into the sunset.",
          es: "Reme por bahías bioluminiscentes o navegue hacia el atardecer.",
        },
        image: lifestyle.sailing,
      },
      {
        number: "04",
        title: { en: "The table", es: "La mesa" },
        text: {
          en: "The aromas of mofongo and lechón, the rhythms of salsa and bomba.",
          es: "Los aromas del mofongo y el lechón, los ritmos de la salsa y la bomba.",
        },
        image: lifestyle.culinary,
      },
      {
        number: "05",
        title: { en: "The horizon", es: "El horizonte" },
        text: {
          en: "Each sunrise casts a golden glow from coastal plains to rugged peaks.",
          es: "Cada amanecer tiñe de dorado desde las llanuras costeras hasta los picos escarpados.",
        },
        image: lifestyle.adventure,
      },
    ],
  },
  residences: {
    eyebrow: { en: "Access the Extraordinary", es: "Acceda a lo extraordinario" },
    title: { en: "A new standard of modern *eco-luxury*", es: "Un nuevo estándar de *ecolujo* moderno" },
    intro: {
      en: "Each residence is thoughtfully positioned to take full advantage of the island's natural beauty. Expansive windows frame turquoise coastlines, verdant mountains and tropical gardens.",
      es: "Cada residencia está pensada para aprovechar al máximo la belleza natural de la isla. Amplios ventanales enmarcan costas turquesa, montañas verdes y jardines tropicales.",
    },
  },
  resilience: {
    eyebrow: { en: "Resilient by Design", es: "Resiliente por diseño" },
    title: { en: "Built to *endure*", es: "Construido para *perdurar*" },
    intro: {
      en: "Every ORA World development is built with resilience in mind, anticipating environmental challenges with future-forward structures that endure.",
      es: "Cada desarrollo de ORA World se construye pensando en la resiliencia: anticipa los retos del entorno con estructuras preparadas para el futuro.",
    },
    counters: [
      { value: 5, prefix: "Cat. ", label: { en: "Hurricane-rated engineering", es: "Ingeniería para huracanes" } },
      { value: 24, suffix: "/7", label: { en: "On-site security", es: "Seguridad en el lugar" } },
      {
        value: 100,
        suffix: "%",
        label: { en: "Backup power coverage", es: "Cobertura de energía de respaldo" },
        placeholder: true,
      },
    ],
    features: [
      {
        slug: "hurricane",
        title: { en: "Hurricane-resilient design", es: "Diseño resistente a huracanes" },
        points: [
          {
            en: "Structures engineered to withstand Category 5 hurricanes.",
            es: "Estructuras diseñadas para resistir huracanes de categoría 5.",
          },
          {
            en: "Impact-resistant windows, reinforced walls, and advanced drainage systems.",
            es: "Ventanas resistentes a impactos, muros reforzados y sistemas avanzados de drenaje.",
          },
        ],
      },
      {
        slug: "seismic",
        title: { en: "Seismic resilience", es: "Resiliencia sísmica" },
        points: [
          {
            en: "Advanced seismic engineering to ensure safety during earthquakes.",
            es: "Ingeniería sísmica avanzada para garantizar la seguridad durante terremotos.",
          },
          {
            en: "Materials and techniques that exceed local codes for seismic zones.",
            es: "Materiales y técnicas que superan los códigos locales para zonas sísmicas.",
          },
        ],
      },
      {
        slug: "security",
        title: { en: "24/7 security", es: "Seguridad 24/7" },
        points: [
          {
            en: "Professionally trained security teams on site.",
            es: "Equipos de seguridad profesionales en el lugar.",
          },
          {
            en: "Patrols, secure perimeters and monitored access points.",
            es: "Patrullas, perímetros seguros y accesos monitoreados.",
          },
        ],
      },
      {
        slug: "smart",
        title: { en: "Smart security systems", es: "Sistemas inteligentes de seguridad" },
        points: [
          {
            en: "State-of-the-art surveillance with AI-enhanced monitoring.",
            es: "Vigilancia de última generación con monitoreo asistido por IA.",
          },
          {
            en: "Smart locks, motion detectors and remote-access controls for residents.",
            es: "Cerraduras inteligentes, detectores de movimiento y control de acceso remoto para residentes.",
          },
        ],
      },
      {
        slug: "power",
        title: { en: "Backup power", es: "Energía de respaldo" },
        points: [
          {
            en: "High-capacity generators for uninterrupted power during outages.",
            es: "Generadores de alta capacidad para energía ininterrumpida durante apagones.",
          },
          {
            en: "Solar panels and battery storage for sustainable, reliable backup.",
            es: "Paneles solares y almacenamiento en baterías para un respaldo sostenible y fiable.",
          },
        ],
      },
      {
        slug: "flood",
        title: { en: "Flood and stormwater management", es: "Gestión de inundaciones y aguas pluviales" },
        points: [
          {
            en: "Elevated foundations and landscape grading to prevent flooding.",
            es: "Cimientos elevados y nivelación del terreno para prevenir inundaciones.",
          },
          {
            en: "Stormwater systems that reduce runoff and protect the property.",
            es: "Sistemas pluviales que reducen la escorrentía y protegen la propiedad.",
          },
        ],
      },
      {
        slug: "safe-rooms",
        title: { en: "Private safe rooms", es: "Cuartos seguros privados" },
        points: [
          {
            en: "Reinforced safe rooms in residences for additional peace of mind.",
            es: "Cuartos seguros reforzados en las residencias para mayor tranquilidad.",
          },
        ],
      },
      {
        slug: "preparedness",
        title: { en: "Emergency preparedness", es: "Preparación para emergencias" },
        points: [
          {
            en: "On-site emergency shelters equipped with supplies.",
            es: "Refugios de emergencia en el lugar, equipados con suministros.",
          },
          {
            en: "Clear evacuation routes and resident communication systems.",
            es: "Rutas de evacuación claras y sistemas de comunicación para residentes.",
          },
        ],
      },
      {
        slug: "training",
        title: { en: "Community resilience training", es: "Formación comunitaria en resiliencia" },
        points: [
          {
            en: "Workshops and resources on emergency protocols and resilience planning.",
            es: "Talleres y recursos sobre protocolos de emergencia y planificación de resiliencia.",
          },
        ],
      },
    ],
    image: book.aerialTowers,
  },
  amenities: {
    eyebrow: { en: "Amenities", es: "Amenidades" },
    title: { en: "Spaces that inspire *well-being*", es: "Espacios que inspiran *bienestar*" },
    intro: {
      en: "Thoughtfully curated amenities redefine modern luxury, offering spaces for relaxation, connection and well-being.",
      es: "Amenidades cuidadosamente seleccionadas redefinen el lujo moderno con espacios para el descanso, la conexión y el bienestar.",
    },
  },
  family: {
    eyebrow: { en: "Family-Centered Living", es: "Vida centrada en la familia" },
    title: {
      en: "A community for *every* member of the family",
      es: "Una comunidad para *cada* miembro de la familia",
    },
    body: {
      en: [
        "ORA World is designed to be much more than a luxurious escape. Kids' adventure camps, family pools and interactive game rooms give children safe, engaging spaces to learn, play and grow.",
        "Partnerships with private schools, tutoring services and creative workshops encourage development at every age, while personalized healthcare clinics and concierge services keep daily life seamless.",
      ],
      es: [
        "ORA World está concebido para ser mucho más que un refugio de lujo. Campamentos de aventura, piscinas familiares y salas de juego interactivas ofrecen a los niños espacios seguros para aprender, jugar y crecer.",
        "Alianzas con escuelas privadas, tutorías y talleres creativos fomentan el desarrollo a cualquier edad, mientras clínicas de salud personalizadas y servicios de conserjería hacen que la vida diaria fluya.",
      ],
    },
    image: lifestyle.familyPool,
  },
  pets: {
    eyebrow: { en: "Happy Homes For All", es: "Hogares felices para todos" },
    title: { en: "Pets are *family*", es: "Las mascotas son *familia*" },
    body: {
      en: [
        "At ORA World, the warm embrace of community extends to every member of the family, even those with four paws. Secure dog parks, grooming stations and open play areas let companions stretch their legs and mingle.",
        "Concierge-level pet services, from on-demand veterinary care to training sessions and pet-friendly events, keep every pet healthy and every owner at ease.",
      ],
      es: [
        "En ORA World, el abrazo de la comunidad alcanza a cada miembro de la familia, incluso a los de cuatro patas. Parques caninos seguros, estaciones de aseo y áreas de juego abiertas permiten a los compañeros estirar las patas y socializar.",
        "Servicios de conserjería para mascotas, desde atención veterinaria a demanda hasta sesiones de adiestramiento y eventos pet-friendly, mantienen a cada mascota sana y a cada dueño tranquilo.",
      ],
    },
    image: lifestyle.dog,
  },
  prosperous: {
    eyebrow: { en: "A Prosperous Environment", es: "Un entorno próspero" },
    title: { en: "Where life and *prosperity* meet", es: "Donde la vida y la *prosperidad* se encuentran" },
    body: {
      en: [
        "Puerto Rico offers a range of exclusive tax benefits, including generous incentives designed to support both business growth and personal prosperity.",
        "By establishing residency or investing in the island, individuals and companies can meaningfully reduce their tax burdens. Beyond these fiscal advantages, Puerto Rico's vibrant culture and natural beauty provide an unparalleled quality of life.",
      ],
      es: [
        "Puerto Rico ofrece una gama de beneficios fiscales exclusivos, con incentivos generosos diseñados para impulsar tanto el crecimiento empresarial como la prosperidad personal.",
        "Al establecer residencia o invertir en la isla, personas y empresas pueden reducir significativamente su carga fiscal. Más allá de estas ventajas, la cultura vibrante y la belleza natural de Puerto Rico ofrecen una calidad de vida incomparable.",
      ],
    },
    image: more.sunsetChairs,
    // From "What Is Act 60? A Practical Guide for U.S. Investors" (oraworld.com/what-is-act-60).
    myths: [
      {
        tab: { en: "A loophole?", es: "¿Un vacío legal?" },
        myth: { en: "Act 60 is an offshore loophole.", es: "La Ley 60 es un vacío legal offshore." },
        fact: {
          en: "It is a rules-based system that works only when its requirements are followed precisely.",
          es: "Es un sistema de reglas que funciona solo cuando sus requisitos se cumplen con precisión.",
        },
      },
      {
        tab: { en: "0% on every gain?", es: "¿0% en todo?" },
        myth: { en: "Every capital gain becomes tax-free.", es: "Toda ganancia de capital queda exenta." },
        fact: {
          en: "Only post-residency gains qualify for full exemption. Gains accrued before residency are not fully exempt.",
          es: "Solo las ganancias posteriores a la residencia califican para la exención total. Las acumuladas antes no están totalmente exentas.",
        },
      },
      {
        tab: { en: "Part-time living?", es: "¿Vivir a medias?" },
        myth: { en: "A few weeks a year on the island is enough.", es: "Basta con unas semanas al año en la isla." },
        fact: {
          en: "Bona fide residency means physical presence (generally 183 days a year), a Puerto Rico tax home and a closer connection.",
          es: "La residencia bona fide exige presencia física (en general 183 días al año), domicilio fiscal en Puerto Rico y una conexión más cercana.",
        },
      },
      {
        tab: { en: "No federal law?", es: "¿Sin ley federal?" },
        myth: { en: "Act 60 replaces federal law.", es: "La Ley 60 sustituye la ley federal." },
        fact: {
          en: "Act 60 does not eliminate federal law, and it does not replace professional tax planning.",
          es: "La Ley 60 no elimina la ley federal ni sustituye la planificación fiscal profesional.",
        },
      },
    ],
    disclaimer: {
      en: "General information, not tax or legal advice. Incentives depend on individual circumstances and are subject to change. Consult your tax advisor.",
      es: "Información general, no asesoría fiscal ni legal. Los incentivos dependen de cada caso y están sujetos a cambios. Consulte a su asesor fiscal.",
    },
  },
  location: {
    eyebrow: { en: "Location", es: "Ubicación" },
    title: { en: "Dorado, on the *north* coast", es: "Dorado, en la costa *norte*" },
    intro: {
      en: "Steps from the beach and a national park, about 35 minutes from San Juan and its international airport.",
      es: "A pasos de la playa y de un parque nacional, a unos 35 minutos de San Juan y su aeropuerto internacional.",
    },
  },
  tour: {
    eyebrow: { en: "ORA World in VR", es: "ORA World en RV" },
    title: { en: "Step *inside*", es: "Entre y *recorra*" },
    text: {
      en: "Walk the residences and amenities in an immersive 360° tour.",
      es: "Recorra las residencias y amenidades en un tour inmersivo de 360°.",
    },
    image: book.penthouseLiving,
  },
  team: {
    eyebrow: { en: "The Collaboratory", es: "El Collaboratory" },
    title: { en: "The minds behind *ORA*", es: "Las mentes detrás de *ORA*" },
    intro: {
      en: "Developer, architects, interior and landscape designers working as one studio.",
      es: "Desarrollador, arquitectos y diseñadores de interiores y paisaje trabajando como un solo estudio.",
    },
  },
  press: { eyebrow: { en: "Press Center", es: "Centro de prensa" } },
  cta: {
    eyebrow: { en: "Private presentation", es: "Presentación privada" },
    title: { en: "Your residence in Dorado *awaits*", es: "Su residencia en Dorado le *espera*" },
    text: {
      en: "Share a few details and a member of the sales team will arrange a private presentation at the sales gallery or by video call.",
      es: "Comparta algunos datos y un miembro del equipo de ventas organizará una presentación privada en la galería de ventas o por videollamada.",
    },
    image: book.poolCabana,
  },
  journey: {
    eyebrow: { en: "Tesoro Del Mar", es: "Tesoro Del Mar" },
    title: { en: "A life to *treasure*", es: "Una vida para *atesorar*" },
    // The brochure's three chapters.
    steps: [
      {
        title: { en: "A rare vantage", es: "Una perspectiva única" },
        text: {
          en: "Golden, soft-sand shores, a boat slip and a coastal park, just 35 minutes from San Juan and its international airport.",
          es: "Playas de arena dorada, un embarcadero y un parque costero, a solo 35 minutos de San Juan y su aeropuerto internacional.",
        },
        image: book.aerialCoast,
        href: "/location",
        cta: { en: "Oceanfront location", es: "Ubicación frente al mar" },
      },
      {
        title: { en: "Inspired by flight", es: "Inspirado en el vuelo" },
        text: {
          en: "Curved towers arc like wings, spacious balconies stretch outward toward the expanse of endless blue, and glass facades dissolve the boundary between home and horizon.",
          es: "Las torres curvas se arquean como alas, los amplios balcones se extienden hacia el azul infinito y las fachadas de cristal borran el límite entre el hogar y el horizonte.",
        },
        image: book.exteriorRoad,
        href: "/residences",
        cta: { en: "Architecture & design", es: "Arquitectura y diseño" },
      },
      {
        title: { en: "Ease, elevated", es: "Bienestar, elevado" },
        text: {
          en: "Over 65,000 square feet of bespoke indoor and outdoor amenities, designed to let life unfold with fluidity and grace.",
          es: "Más de 65,000 pies cuadrados de amenidades interiores y exteriores, pensadas para que la vida fluya con naturalidad y elegancia.",
        },
        image: book.puttingGreen,
        href: "/amenities",
        cta: { en: "The amenities", es: "Las amenidades" },
      },
    ],
  },
  glance: {
    eyebrow: { en: "Tesoro Del Mar", es: "Tesoro Del Mar" },
    title: { en: "Exceptional *amenities*", es: "Amenidades *excepcionales*" },
    body: {
      en: "Tesoro Del Mar will focus on longevity and quality of life with access to modern amenities, healthcare, education and entertainment.",
      es: "Tesoro Del Mar se centrará en la longevidad y la calidad de vida, con acceso a amenidades modernas, salud, educación y entretenimiento.",
    },
    // Brochure, "Exceptional Amenities" and "The Building".
    checklist: [
      { en: "A 17-acre coastal community on the north shore", es: "Una comunidad costera de 17 acres en la costa norte" },
      {
        en: "Phase One: 60 residences, 2 to 6 bedrooms, and one penthouse",
        es: "Fase Uno: 60 residencias de 2 a 6 dormitorios y un penthouse",
      },
      {
        en: "Over 65,000 sq ft of indoor and outdoor amenities",
        es: "Más de 65,000 pies² de amenidades interiores y exteriores",
      },
      {
        en: "A 14,000 sq ft members-only clubhouse",
        es: "Un club privado para miembros de 14,000 pies²",
      },
      { en: "Private beach club and a slipway for boats", es: "Club de playa privado y rampa para embarcaciones" },
      {
        en: "Approximately 35 minutes from an international airport",
        es: "A unos 35 minutos de un aeropuerto internacional",
      },
    ],
    image: book.aerialCoast,
    inset: book.exteriorRoad,
    board: [
      {
        value: "17",
        unit: { en: "Acres", es: "Acres" },
        title: { en: "A 17-acre coastal community", es: "Una comunidad costera de 17 acres" },
        text: {
          en: "Where mangroves meet the Atlantic, the first expression of Ora World.",
          es: "Donde los manglares se encuentran con el Atlántico, la primera expresión de Ora World.",
        },
      },
      {
        value: "60",
        unit: { en: "Residences", es: "Residencias" },
        title: { en: "60 residences in Phase One", es: "60 residencias en la Fase Uno" },
        text: {
          en: "Two to six bedrooms, each with panoramic ocean views, plus one penthouse.",
          es: "De dos a seis dormitorios, todas con vistas panorámicas al mar, y un penthouse.",
        },
      },
      {
        value: "65,000+",
        unit: { en: "Sq ft of amenities", es: "Pies² de amenidades" },
        title: { en: "Over 65,000 sq ft of amenities", es: "Más de 65,000 pies² de amenidades" },
        text: {
          en: "From a private beach and boat slipway to resort-style wellness.",
          es: "Desde playa privada y rampa para embarcaciones hasta bienestar de resort.",
        },
      },
      {
        value: "14,000",
        unit: { en: "Sq ft clubhouse", es: "Pies² de club" },
        title: { en: "A members-only clubhouse", es: "Un club privado para miembros" },
        text: {
          en: "Café, fine dining, a business center, sports courts and a rooftop pool.",
          es: "Café, restaurante, centro de negocios, canchas y piscina en la azotea.",
        },
      },
      {
        value: "35",
        unit: { en: "Minutes from San Juan", es: "Minutos de San Juan" },
        title: { en: "Close to San Juan", es: "Cerca de San Juan" },
        text: {
          en: "About 35 minutes from San Juan and its international airport.",
          es: "A unos 35 minutos de San Juan y su aeropuerto internacional.",
        },
      },
    ],
  },
  walkthrough: {
    eyebrow: { en: "Step inside", es: "Pase adelante" },
    title: { en: "A walk *through* Tesoro Del Mar", es: "Un recorrido *por* Tesoro Del Mar" },
    intro: {
      en: "Renderings from the Tesoro Del Mar brochure, room by room.",
      es: "Renderings del folleto de Tesoro Del Mar, espacio por espacio.",
    },
    // Titles are items from the brochure's specification lists.
    steps: [
      {
        label: { en: "The lobby", es: "El vestíbulo" },
        title: { en: "A private residential lobby, attended 24/7", es: "Vestíbulo residencial privado, atendido 24/7" },
        text: { en: "Porte-cochère with a private residential lobby attended 24/7.", es: "Porte-cochère con vestíbulo residencial privado atendido 24/7." },
        image: book.foyer,
        video: "/videos/tdm/lobby.mp4",
      },
      {
        label: { en: "Living", es: "La sala" },
        title: { en: "Panoramic ocean views through a glass façade", es: "Vistas panorámicas al mar tras una fachada de cristal" },
        text: { en: "Panoramic ocean views through an expansive glass façade.", es: "Vistas panorámicas al mar a través de una amplia fachada de cristal." },
        image: book.livingDining,
        video: "/videos/tdm/living.mp4",
      },
      {
        label: { en: "The kitchen", es: "La cocina" },
        title: { en: "Custom Italian cabinetry and Gaggenau appliances", es: "Gabinetes italianos a medida y electrodomésticos Gaggenau" },
        text: { en: "Gourmet kitchen with custom Italian cabinetry and a fully integrated Gaggenau appliance suite.", es: "Cocina gourmet con gabinetes italianos a medida y electrodomésticos Gaggenau integrados." },
        image: book.kitchenDining,
        video: "/videos/tdm/kitchen.mp4",
      },
      {
        label: { en: "The primary suite", es: "La suite principal" },
        title: { en: "Walk-in closets and motorized shades", es: "Vestidores y cortinas motorizadas" },
        text: { en: "Walk-in closets with custom built-ins and motorized window shades in every room.", es: "Vestidores con muebles a medida y cortinas motorizadas en cada habitación." },
        image: book.primaryBedroom,
        video: "/videos/tdm/primary-suite.mp4",
      },
      {
        label: { en: "The bath", es: "El baño" },
        title: { en: "Onyx, marble and Dornbracht fittings", es: "Ónix, mármol y grifería Dornbracht" },
        text: { en: "Spa-like baths finished in stone with Dornbracht fixtures.", es: "Baños tipo spa en piedra con grifería Dornbracht." },
        image: book.bathTub,
      },
      {
        label: { en: "Fitness", es: "Gimnasio" },
        title: { en: "A state-of-the-art fitness center", es: "Un gimnasio de última generación" },
        text: { en: "State-of-the-art fitness center and pilates studio.", es: "Gimnasio de última generación y estudio de pilates." },
        image: book.gym,
        video: "/videos/tdm/gym.mp4",
      },
      {
        label: { en: "The penthouse", es: "El penthouse" },
        title: { en: "One penthouse, crowning the tower", es: "Un penthouse en la cima de la torre" },
        text: { en: "60 luxury residences and one penthouse.", es: "60 residencias de lujo y un penthouse." },
        image: book.penthouseLiving,
      },
    ],
  },
  portfolio: {
    eyebrow: { en: "The portfolio", es: "El portafolio" },
    title: { en: "Twelve places, *one* philosophy", es: "Doce lugares, *una* filosofía" },
    intro: {
      en: "From Dorado to Guayama, every ORA World community blends modern living with the nature around it.",
      es: "De Dorado a Guayama, cada comunidad de ORA World integra la vida moderna con la naturaleza que la rodea.",
    },
  },
  faq: {
    eyebrow: { en: "Common questions", es: "Preguntas frecuentes" },
    title: { en: "Before you *visit*", es: "Antes de su *visita*" },
    slugs: [
      "what-is-ora-world",
      "where-is-tesoro",
      "what-is-tesoro",
      "pricing",
      "hurricanes",
      "act-60",
      "pets",
      "brokers",
    ],
  },
  interludes: [
    {
      image: book.aerialCoast,
      lines: [
        { en: "Seventeen acres on the north shore", es: "Diecisiete acres en la costa norte" },
        { en: "Steps from the beach and national park", es: "A pasos de la playa y del parque nacional" },
        { en: "35 minutes from San Juan", es: "A 35 minutos de San Juan" },
      ],
    },
    {
      image: renders.naguaboWide,
      lines: [
        { en: "Tesoro Del Mar", es: "Tesoro Del Mar" },
        { en: "Dorado Waterfalls", es: "Dorado Waterfalls" },
        { en: "Ten more places across the island", es: "Diez lugares más en toda la isla" },
      ],
    },
  ],
  marquee: [
    { en: "Beyond expectations", es: "Más allá de lo esperado" },
    { en: "Longevity", es: "Longevidad" },
    { en: "Luxury", es: "Lujo" },
    { en: "Nature", es: "Naturaleza" },
    { en: "Dorado, Puerto Rico", es: "Dorado, Puerto Rico" },
  ],
  compare: {
    eyebrow: { en: "Drawing to rendering", es: "Del dibujo al rendering" },
    title: { en: "See the design, *line by line*", es: "Vea el diseño, *trazo a trazo*" },
    intro: {
      en: "Drag across each view to move between the architectural line drawing and the finished rendering.",
      es: "Deslice sobre cada vista para pasar del dibujo arquitectónico al rendering terminado.",
    },
    items: [
      {
        render: tdm.exteriorRoad,
        drawing: drawings.road,
        kicker: { en: "Tesoro Del Mar · Arrival", es: "Tesoro Del Mar · Llegada" },
        title: {
          en: "Curved facades shaped by the flight of birds",
          es: "Fachadas curvas inspiradas en el vuelo de las aves",
        },
      },
      {
        render: renders.tdmExterior,
        drawing: drawings.pool,
        kicker: { en: "Tesoro Del Mar · Pool terrace", es: "Tesoro Del Mar · Terraza de piscina" },
        title: {
          en: "Cantilevered terraces that extend like wings",
          es: "Terrazas en voladizo que se extienden como alas",
        },
      },
      {
        render: tdm.aerialCoast,
        drawing: drawings.aerial,
        kicker: { en: "Tesoro Del Mar · From the air", es: "Tesoro Del Mar · Desde el aire" },
        title: { en: "Seventeen acres beside a national park", es: "Diecisiete acres junto a un parque nacional" },
      },
      {
        render: tdm.foyerAtrium,
        drawing: drawings.foyer,
        kicker: { en: "Tesoro Del Mar · Foyer", es: "Tesoro Del Mar · Vestíbulo" },
        title: { en: "Stone, wood and brushed metal", es: "Piedra, madera y metal cepillado" },
      },
      {
        render: tdm.penthouseLiving,
        drawing: drawings.penthouse,
        kicker: { en: "Tesoro Del Mar · Penthouse", es: "Tesoro Del Mar · Penthouse" },
        title: { en: "A floating staircase above the living room", es: "Una escalera flotante sobre la sala" },
      },
      {
        render: renders.doradoWaterfalls,
        drawing: drawings.dw,
        kicker: { en: "Dorado Waterfalls", es: "Dorado Waterfalls" },
        title: {
          en: "Tiered towers along a palm-lined avenue",
          es: "Torres escalonadas a lo largo de una avenida de palmeras",
        },
      },
    ],
  },
};
