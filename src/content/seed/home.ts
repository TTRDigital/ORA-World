import type { HomeContent } from "../types";
import { renders, lifestyle, free } from "./images";

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
    text: {
      en: "Our mission is to revolutionize Puerto Rico's real estate landscape by creating luxurious, eco-friendly developments that seamlessly blend modern elegance with the island's *natural* beauty.",
      es: "Nuestra misión es revolucionar el panorama inmobiliario de Puerto Rico creando desarrollos de lujo y ecológicos que integran la elegancia moderna con la belleza *natural* de la isla.",
    },
    signature: { en: "ORA World · Dorado, Puerto Rico", es: "ORA World · Dorado, Puerto Rico" },
  },
  context: {
    image: renders.naguaboWide,
    captions: [
      { en: "Curved facades inspired by the flight of birds, cantilevered terraces extending like wings.", es: "Fachadas curvas inspiradas en el vuelo de las aves; terrazas en voladizo que se extienden como alas." },
      { en: "Walking distance to Balneario Cerro Gordo. Thirty minutes from the airport.", es: "A pasos del Balneario Cerro Gordo. A treinta minutos del aeropuerto." },
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
      { number: "01", title: { en: "The shore", es: "La costa" }, text: { en: "Sparkling turquoise waters lap against soft sandy shores.", es: "Aguas turquesa resplandecientes acarician suaves orillas de arena." }, image: lifestyle.beach },
      { number: "02", title: { en: "The rainforest", es: "El bosque" }, text: { en: "Hike the trails of El Yunque National Forest beneath a serene canopy.", es: "Recorra los senderos del Bosque Nacional El Yunque bajo un dosel sereno." }, image: lifestyle.rainforest },
      { number: "03", title: { en: "The sea", es: "El mar" }, text: { en: "Paddle through bioluminescent bays or sail into the sunset.", es: "Reme por bahías bioluminiscentes o navegue hacia el atardecer." }, image: free.bioBay },
      { number: "04", title: { en: "The table", es: "La mesa" }, text: { en: "The aromas of mofongo and lechón, the rhythms of salsa and bomba.", es: "Los aromas del mofongo y el lechón, los ritmos de la salsa y la bomba." }, image: lifestyle.culinary },
      { number: "05", title: { en: "The horizon", es: "El horizonte" }, text: { en: "Each sunrise casts a golden glow from coastal plains to rugged peaks.", es: "Cada amanecer tiñe de dorado desde las llanuras costeras hasta los picos escarpados." }, image: lifestyle.adventure },
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
      { value: 100, suffix: "%", label: { en: "Backup power coverage", es: "Cobertura de energía de respaldo" }, placeholder: true },
    ],
    features: [
      { slug: "hurricane", title: { en: "Hurricane-resilient design", es: "Diseño resistente a huracanes" }, points: [{ en: "Structures engineered to withstand Category 5 hurricanes.", es: "Estructuras diseñadas para resistir huracanes de categoría 5." }, { en: "Impact-resistant windows, reinforced walls, and advanced drainage systems.", es: "Ventanas resistentes a impactos, muros reforzados y sistemas avanzados de drenaje." }] },
      { slug: "seismic", title: { en: "Seismic resilience", es: "Resiliencia sísmica" }, points: [{ en: "Advanced seismic engineering to ensure safety during earthquakes.", es: "Ingeniería sísmica avanzada para garantizar la seguridad durante terremotos." }, { en: "Materials and techniques that exceed local codes for seismic zones.", es: "Materiales y técnicas que superan los códigos locales para zonas sísmicas." }] },
      { slug: "security", title: { en: "24/7 security", es: "Seguridad 24/7" }, points: [{ en: "Professionally trained security teams on site.", es: "Equipos de seguridad profesionales en el lugar." }, { en: "Patrols, secure perimeters and monitored access points.", es: "Patrullas, perímetros seguros y accesos monitoreados." }] },
      { slug: "smart", title: { en: "Smart security systems", es: "Sistemas inteligentes de seguridad" }, points: [{ en: "State-of-the-art surveillance with AI-enhanced monitoring.", es: "Vigilancia de última generación con monitoreo asistido por IA." }, { en: "Smart locks, motion detectors and remote-access controls for residents.", es: "Cerraduras inteligentes, detectores de movimiento y control de acceso remoto para residentes." }] },
      { slug: "power", title: { en: "Backup power", es: "Energía de respaldo" }, points: [{ en: "High-capacity generators for uninterrupted power during outages.", es: "Generadores de alta capacidad para energía ininterrumpida durante apagones." }, { en: "Solar panels and battery storage for sustainable, reliable backup.", es: "Paneles solares y almacenamiento en baterías para un respaldo sostenible y fiable." }] },
      { slug: "flood", title: { en: "Flood and stormwater management", es: "Gestión de inundaciones y aguas pluviales" }, points: [{ en: "Elevated foundations and landscape grading to prevent flooding.", es: "Cimientos elevados y nivelación del terreno para prevenir inundaciones." }, { en: "Stormwater systems that reduce runoff and protect the property.", es: "Sistemas pluviales que reducen la escorrentía y protegen la propiedad." }] },
      { slug: "safe-rooms", title: { en: "Private safe rooms", es: "Cuartos seguros privados" }, points: [{ en: "Reinforced safe rooms in residences for additional peace of mind.", es: "Cuartos seguros reforzados en las residencias para mayor tranquilidad." }] },
      { slug: "preparedness", title: { en: "Emergency preparedness", es: "Preparación para emergencias" }, points: [{ en: "On-site emergency shelters equipped with supplies.", es: "Refugios de emergencia en el lugar, equipados con suministros." }, { en: "Clear evacuation routes and resident communication systems.", es: "Rutas de evacuación claras y sistemas de comunicación para residentes." }] },
      { slug: "training", title: { en: "Community resilience training", es: "Formación comunitaria en resiliencia" }, points: [{ en: "Workshops and resources on emergency protocols and resilience planning.", es: "Talleres y recursos sobre protocolos de emergencia y planificación de resiliencia." }] },
    ],
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
    title: { en: "A community for *every* member of the family", es: "Una comunidad para *cada* miembro de la familia" },
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
    text: { en: "Walk the residences and amenities in an immersive 360° tour.", es: "Recorra las residencias y amenidades en un tour inmersivo de 360°." },
    image: renders.tdmPenthouse,
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
  },
};
