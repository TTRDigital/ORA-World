import type { HomeContent } from "../types";
import { renders, lifestyle, tdm, more, drawings, dwx } from "./images";

export const home: HomeContent = {
  hero: {
    eyebrow: { en: "Dorado · Puerto Rico", es: "Dorado · Puerto Rico" },
    headline: { en: "*Beyond* expectations", es: "Más allá de lo *esperado*" },
    tagline: {
      en: "Thoughtfully crafted communities where longevity, luxury, and nature exist in perfect harmony.",
      es: "Comunidades concebidas con esmero donde la longevidad, el lujo y la naturaleza conviven en perfecta armonía.",
    },
    // Published Tesoro Del Mar figures (oraworld.com/tesoro-del-mar). Confirm these are the hero project's numbers.
    stats: [
      { value: 10, label: { en: "Acres in Dorado", es: "Acres en Dorado" } },
      { value: 129, label: { en: "Contemporary residences", es: "Residencias contemporáneas" } },
      { value: 42, label: { en: "Hotel suites", es: "Suites de hotel" } },
      { value: 65500, label: { en: "Sq ft of amenities", es: "Pies² de amenidades" } },
    ],
    poster: renders.tdmExterior,
    videoLoop: null,
    videoLoopWebm: null,
    videoMobile: null,
  },
  manifesto: {
    eyebrow: { en: "Our mission", es: "Nuestra misión" },
    title: {
      en: "Luxury living with timeless *elegance* and comfort",
      es: "Vida de lujo con *elegancia* y confort atemporales",
    },
    text: {
      en: "Our mission is to revolutionize Puerto Rico's real estate landscape by creating luxurious, eco-friendly developments that seamlessly blend modern elegance with the island's natural beauty. We aim to enhance the lives of our residents and contribute positively to the island's vibrant culture and economy.",
      es: "Nuestra misión es revolucionar el panorama inmobiliario de Puerto Rico creando desarrollos de lujo y ecológicos que integran la elegancia moderna con la belleza natural de la isla. Buscamos mejorar la vida de nuestros residentes y contribuir positivamente a la cultura y la economía de la isla.",
    },
    signature: { en: "ORA World · Dorado, Puerto Rico", es: "ORA World · Dorado, Puerto Rico" },
    pillars: [
      {
        title: { en: "Exceptional quality", es: "Calidad excepcional" },
        text: {
          en: "High-quality materials, eco-friendly finishes and carefully selected furnishings.",
          es: "Materiales de alta calidad, acabados ecológicos y mobiliario cuidadosamente seleccionado.",
        },
      },
      {
        title: { en: "Innovative design", es: "Diseño innovador" },
        text: {
          en: "Curved, aerodynamic architecture inspired by the graceful flight of birds.",
          es: "Arquitectura curva y aerodinámica inspirada en el vuelo de las aves.",
        },
      },
      {
        title: { en: "Unparalleled comfort", es: "Confort incomparable" },
        text: {
          en: "Open-concept layouts that promote a sense of calm and flow.",
          es: "Espacios abiertos que transmiten calma y fluidez.",
        },
      },
      {
        title: { en: "Rooted in the island", es: "Arraigado en la isla" },
        text: {
          en: "Contributing positively to Puerto Rico's vibrant culture and economy.",
          es: "Una contribución positiva a la cultura y la economía de Puerto Rico.",
        },
      },
    ],
    image: tdm.foyerLounge,
    inset: renders.towerDetail,
    third: more.tdmDining,
  },
  context: {
    image: tdm.aerialCoast,
    captions: [
      {
        en: "Curved facades inspired by the flight of birds, cantilevered terraces extending like wings.",
        es: "Fachadas curvas inspiradas en el vuelo de las aves; terrazas en voladizo que se extienden como alas.",
      },
      {
        en: "Walking distance to Balneario Cerro Gordo. Thirty minutes from the airport.",
        es: "A pasos del Balneario Cerro Gordo. A treinta minutos del aeropuerto.",
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
    image: tdm.aerialTowers,
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
      en: "Minutes from the beach, a short drive from San Juan, and thirty minutes from the international airport.",
      es: "A minutos de la playa, a un corto trayecto de San Juan y a treinta minutos del aeropuerto internacional.",
    },
  },
  tour: {
    eyebrow: { en: "ORA World in VR", es: "ORA World en RV" },
    title: { en: "Step *inside*", es: "Entre y *recorra*" },
    text: {
      en: "Walk the residences and amenities in an immersive 360° tour.",
      es: "Recorra las residencias y amenidades en un tour inmersivo de 360°.",
    },
    image: tdm.penthouseDining,
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
    image: tdm.exteriorGolf,
  },
  journey: {
    eyebrow: { en: "Your path to ORA", es: "Su camino a ORA" },
    title: { en: "Discover. Choose. *Arrive.*", es: "Descubra. Elija. *Llegue.*" },
    steps: [
      {
        title: { en: "Discover the island", es: "Descubra la isla" },
        text: {
          en: "From turquoise shores to the trails of El Yunque, explore the Puerto Rico that frames every ORA World community.",
          es: "De las costas turquesa a los senderos de El Yunque, explore el Puerto Rico que enmarca cada comunidad de ORA World.",
        },
        image: lifestyle.beach,
        href: "/lifestyle",
        cta: { en: "The lifestyle", es: "El estilo de vida" },
      },
      {
        title: { en: "Choose your residence", es: "Elija su residencia" },
        text: {
          en: "Contemporary apartments, villas, penthouses and hotel suites, each positioned to take full advantage of the views.",
          es: "Apartamentos contemporáneos, villas, penthouses y suites de hotel, cada uno ubicado para aprovechar al máximo las vistas.",
        },
        image: tdm.aptLiving,
        href: "/residences",
        cta: { en: "The residences", es: "Las residencias" },
      },
      {
        title: { en: "Arrive in Dorado", es: "Llegue a Dorado" },
        text: {
          en: "Book a private presentation at the sales gallery or by video call, and the sales team will walk you through every detail.",
          es: "Reserve una presentación privada en la galería de ventas o por videollamada, y el equipo de ventas le mostrará cada detalle.",
        },
        image: tdm.foyerReception,
        href: "#inquire",
        cta: { en: "Request a presentation", es: "Solicitar presentación" },
      },
    ],
  },
  glance: {
    eyebrow: { en: "Tesoro Del Mar", es: "Tesoro Del Mar" },
    title: { en: "Harmony in modernity *and nature*", es: "Armonía entre modernidad *y naturaleza*" },
    body: {
      en: "An ambitious 10-acre development near a national park with panoramic ocean views, designed around the themes of rejuvenation and community.",
      es: "Un ambicioso desarrollo de 10 acres junto a un parque nacional con vistas panorámicas al océano, concebido en torno a la renovación y la comunidad.",
    },
    checklist: [
      {
        en: "335,995 sq ft of land and 498,150 sq ft of floor area across 10 acres",
        es: "335,995 pies² de terreno y 498,150 pies² de construcción en 10 acres",
      },
      {
        en: "129 contemporary apartments and 42 hotel suites",
        es: "129 apartamentos contemporáneos y 42 suites de hotel",
      },
      {
        en: "65,500 sq ft of amenities: sports courts, fitness center, jogging paths",
        es: "65,500 pies² de amenidades: canchas, gimnasio y senderos para correr",
      },
      { en: "Walking distance to Balneario Cerro Gordo beach", es: "A pasos de la playa Balneario Cerro Gordo" },
      {
        en: "Thirty minutes from the airport, beside a national park",
        es: "A treinta minutos del aeropuerto, junto a un parque nacional",
      },
      {
        en: "A clubhouse and boutique hotel at the heart of the community",
        es: "Un club social y un hotel boutique en el corazón de la comunidad",
      },
    ],
    image: tdm.aerialCoast,
    inset: renders.tdmExterior,
    board: [
      {
        value: "10",
        unit: { en: "Acres in Dorado", es: "Acres en Dorado" },
        title: { en: "Ten acres on the north coast", es: "Diez acres en la costa norte" },
        text: {
          en: "335,995 sq ft of land beside a national park.",
          es: "335,995 pies² de terreno junto a un parque nacional.",
        },
      },
      {
        value: "129",
        unit: { en: "Contemporary apartments", es: "Apartamentos contemporáneos" },
        title: { en: "129 contemporary apartments", es: "129 apartamentos contemporáneos" },
        text: {
          en: "Open-concept homes with floor-to-ceiling glass.",
          es: "Hogares de concepto abierto con ventanales de piso a techo.",
        },
      },
      {
        value: "171",
        unit: { en: "Homes and hotel suites", es: "Hogares y suites de hotel" },
        title: { en: "42 boutique hotel suites", es: "42 suites de hotel boutique" },
        text: {
          en: "A boutique hotel and clubhouse at the heart of the community.",
          es: "Un hotel boutique y un club social en el corazón de la comunidad.",
        },
      },
      {
        value: "65,500",
        unit: { en: "Sq ft of amenities", es: "Pies² de amenidades" },
        title: { en: "65,500 sq ft of amenities", es: "65,500 pies² de amenidades" },
        text: {
          en: "Sports courts, a fitness center and scenic jogging paths.",
          es: "Canchas, gimnasio y senderos para correr.",
        },
      },
      {
        value: "30",
        unit: { en: "Minutes to the airport", es: "Minutos al aeropuerto" },
        title: { en: "A walk from Balneario Cerro Gordo", es: "A pasos del Balneario Cerro Gordo" },
        text: {
          en: "And thirty minutes from the international airport.",
          es: "Y a treinta minutos del aeropuerto internacional.",
        },
      },
    ],
  },
  walkthrough: {
    eyebrow: { en: "Step inside", es: "Pase adelante" },
    title: { en: "A walk *through* Tesoro Del Mar", es: "Un recorrido *por* Tesoro Del Mar" },
    intro: {
      en: "From the palm-lined approach to the penthouse, follow the renderings room by room.",
      es: "Desde la llegada entre palmeras hasta el penthouse, recorra los renderings espacio por espacio.",
    },
    steps: [
      {
        label: { en: "Arrival", es: "Llegada" },
        title: { en: "Shaped by the flight of birds", es: "Inspirado en el vuelo de las aves" },
        text: {
          en: "Sleek, aerodynamic forms with curved facades and expansive glass appear to soar above the landscape.",
          es: "Formas aerodinámicas con fachadas curvas y amplias superficies de cristal que parecen elevarse sobre el paisaje.",
        },
        image: tdm.exteriorRoad,
      },
      {
        label: { en: "The foyer", es: "El vestíbulo" },
        title: { en: "Stone, wood and brushed metal", es: "Piedra, madera y metal cepillado" },
        text: {
          en: "Premium materials and a palette inspired by the natural surroundings set the tone from the first step inside.",
          es: "Materiales de primera y una paleta inspirada en el entorno natural marcan el tono desde el primer paso.",
        },
        image: tdm.foyerAtrium,
      },
      {
        label: { en: "The residence", es: "La residencia" },
        title: { en: "Open plans, framed by the view", es: "Planos abiertos, enmarcados por la vista" },
        text: {
          en: "Open-concept layouts encourage flow and connection, while floor-to-ceiling windows fill each space with light.",
          es: "Los planos abiertos favorecen la fluidez y la conexión, y los ventanales de piso a techo llenan cada espacio de luz.",
        },
        image: tdm.aptLiving2,
      },
      {
        label: { en: "The private suite", es: "La suite privada" },
        title: { en: "A personal sanctuary", es: "Un santuario personal" },
        text: {
          en: "Retreat to a private suite with ocean or garden views, designed to nurture both luxury and ease.",
          es: "Retírese a una suite privada con vista al mar o al jardín, pensada para el lujo y la serenidad.",
        },
        image: tdm.aptBedroom,
      },
      {
        label: { en: "The terraces", es: "Las terrazas" },
        title: { en: "Terraces that extend like wings", es: "Terrazas que se extienden como alas" },
        text: {
          en: "Cantilevered balconies, reflecting pools and gentle cascades foster tranquility and social connection.",
          es: "Balcones en voladizo, espejos de agua y cascadas suaves fomentan la tranquilidad y la vida en comunidad.",
        },
        image: renders.tdmExterior,
      },
      {
        label: { en: "The penthouse", es: "El penthouse" },
        title: { en: "Generous rooms for entertaining", es: "Espacios amplios para recibir" },
        text: {
          en: "A floating staircase, sweeping views and curated finishes for life's finest moments.",
          es: "Una escalera flotante, vistas amplias y acabados selectos para los mejores momentos.",
        },
        image: tdm.penthouseLiving,
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
      image: tdm.aerialForest,
      lines: [
        { en: "Ten acres on the north coast", es: "Diez acres en la costa norte" },
        { en: "Beside a national park", es: "Junto a un parque nacional" },
        { en: "A walk from Balneario Cerro Gordo", es: "A pasos del Balneario Cerro Gordo" },
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
        title: { en: "Ten acres beside a national park", es: "Diez acres junto a un parque nacional" },
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
  // Dorado Waterfalls: copy quoted or paraphrased from oraworld.com/dorado-waterfalls; captions describe the renders.
  walkthroughDW: {
    eyebrow: { en: "Step inside", es: "Pase adelante" },
    title: { en: "A walk through *Dorado Waterfalls*", es: "Un recorrido por *Dorado Waterfalls*" },
    intro: {
      en: "From the water wall at the door to the pool above the treetops, follow the renderings.",
      es: "Desde el muro de agua en la entrada hasta la piscina sobre los árboles, recorra los renderings.",
    },
    steps: [
      {
        label: { en: "Arrival", es: "Llegada" },
        title: { en: "Water at the threshold", es: "Agua en el umbral" },
        text: {
          en: "Cascading water walls, reflective pools and small streams wind through the terraces and common areas.",
          es: "Muros de agua, espejos reflectantes y pequeños arroyos recorren terrazas y áreas comunes.",
        },
        image: dwx.arrival,
      },
      {
        label: { en: "The lobby", es: "El vestíbulo" },
        title: { en: "Glass, light and green", es: "Cristal, luz y verde" },
        text: {
          en: "Fluid, multi-tiered designs with glass facades, green terraces and flowing water elements.",
          es: "Diseños fluidos y escalonados con fachadas de cristal, terrazas verdes y elementos de agua.",
        },
        image: dwx.lobbyStair,
      },
      {
        label: { en: "Dining", es: "Comedor" },
        title: { en: "Gardens overhead", es: "Jardines suspendidos" },
        text: {
          en: "Native plants, flowers and trees extend the natural landscape into every space.",
          es: "Plantas, flores y árboles nativos prolongan el paisaje natural en cada espacio.",
        },
        image: dwx.restaurant,
      },
      {
        label: { en: "The residence", es: "La residencia" },
        title: { en: "Living rooms open to the hills", es: "Salas abiertas a las colinas" },
        text: {
          en: "Terraces give every residence its own private outdoor space.",
          es: "Las terrazas ofrecen a cada residencia su propio espacio exterior privado.",
        },
        image: dwx.residenceLiving,
      },
      {
        label: { en: "The private suite", es: "La suite privada" },
        title: { en: "A quiet principal suite", es: "Una suite principal serena" },
        text: {
          en: "A calm principal bedroom beneath a crystal chandelier.",
          es: "Un dormitorio principal sereno bajo un candelabro de cristal.",
        },
        image: dwx.residenceBedroom,
      },
      {
        label: { en: "The rooftop", es: "La azotea" },
        title: { en: "A pool above the treetops", es: "Una piscina sobre los árboles" },
        text: {
          en: "A rooftop pool and terrace crown the tower.",
          es: "Una piscina y terraza en la azotea coronan la torre.",
        },
        image: dwx.rooftop,
      },
    ],
  },
  interludeDW: {
    image: dwx.towers,
    lines: [
      { en: "Dorado Waterfalls", es: "Dorado Waterfalls" },
      { en: "25–30 minutes from San Juan", es: "A 25–30 minutos de San Juan" },
      { en: "Act 60 eligible", es: "Elegible para la Ley 60" },
    ],
  },
};
