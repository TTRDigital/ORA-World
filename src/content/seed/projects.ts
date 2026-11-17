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
];

export const galleryImages: GalleryImage[] = [
  // Only the Tesoro Del Mar brochure images (client direction, Nov 2026).
  {
    id: "aerial-coast",
    category: "exteriors",
    image: book.aerialCoast,
    caption: { en: "Tesoro Del Mar above the north coast", es: "Tesoro Del Mar sobre la costa norte" },
  },
  {
    id: "aerial-towers",
    category: "exteriors",
    image: book.aerialTowers,
    caption: { en: "The three towers from above", es: "Las tres torres desde lo alto" },
  },
  {
    id: "exterior-road",
    category: "exteriors",
    image: book.exteriorRoad,
    caption: { en: "The towers from the approach road", es: "Las torres desde el camino de acceso" },
  },
  {
    id: "porte-cochere",
    category: "exteriors",
    image: book.porteCochere,
    caption: { en: "The porte-cochère", es: "El porte-cochère" },
  },
  {
    id: "pool-cabana",
    category: "amenities",
    image: book.poolCabana,
    caption: { en: "Poolside cabana", es: "Cabaña junto a la piscina" },
  },
  {
    id: "putting-green",
    category: "amenities",
    image: book.puttingGreen,
    caption: { en: "The 18-hole putting course", es: "El campo de putting de 18 hoyos" },
  },
  {
    id: "gym",
    category: "amenities",
    image: book.gym,
    caption: { en: "The fitness center", es: "El gimnasio" },
  },
  {
    id: "foyer",
    category: "interiors",
    image: book.foyer,
    caption: { en: "The residential lobby", es: "El vestíbulo residencial" },
  },
  {
    id: "living-dining",
    category: "interiors",
    image: book.livingDining,
    caption: { en: "Apartment living and dining", es: "Sala y comedor del apartamento" },
  },
  {
    id: "kitchen-dining",
    category: "interiors",
    image: book.kitchenDining,
    caption: { en: "Apartment kitchen and dining", es: "Cocina y comedor del apartamento" },
  },
  {
    id: "primary-bedroom",
    category: "interiors",
    image: book.primaryBedroom,
    caption: { en: "Primary bedroom", es: "Dormitorio principal" },
  },
  {
    id: "bedroom",
    category: "interiors",
    image: book.bedroom,
    caption: { en: "Bedroom", es: "Dormitorio" },
  },
  {
    id: "bedroom-ocean",
    category: "interiors",
    image: book.bedroomOcean,
    caption: { en: "Bedroom with an ocean view", es: "Dormitorio con vista al mar" },
  },
  {
    id: "bath-vanity",
    category: "interiors",
    image: book.bathVanity,
    caption: { en: "Marble vanity", es: "Tocador en mármol" },
  },
  {
    id: "bath-tub",
    category: "interiors",
    image: book.bathTub,
    caption: { en: "Freestanding bath", es: "Bañera exenta" },
  },
  {
    id: "powder-room",
    category: "interiors",
    image: book.powderRoom,
    caption: { en: "Powder room", es: "Medio baño" },
  },
  {
    id: "study",
    category: "interiors",
    image: book.study,
    caption: { en: "Study", es: "Estudio" },
  },
  {
    id: "penthouse-living",
    category: "interiors",
    image: book.penthouseLiving,
    caption: { en: "Penthouse living room", es: "Sala del penthouse" },
  },
  {
    id: "penthouse-staircase",
    category: "interiors",
    image: book.penthouseStaircase,
    caption: { en: "Penthouse, double height", es: "Penthouse, doble altura" },
  },
  {
    id: "penthouse-piano",
    category: "interiors",
    image: book.penthousePiano,
    caption: { en: "Penthouse lounge", es: "Salón del penthouse" },
  },
  {
    id: "kitchen-finish",
    category: "finishes",
    image: book.kitchenFinish,
    caption: { en: "Kitchen finishes (Scavolini)", es: "Acabados de cocina (Scavolini)" },
  },
  {
    id: "kitchen-finish-slats",
    category: "finishes",
    image: book.kitchenFinishSlats,
    caption: { en: "Kitchen cabinetry panels", es: "Paneles de gabinetes de cocina" },
  },
  {
    id: "kitchen-finish-detail",
    category: "finishes",
    image: book.kitchenFinishDetail,
    caption: { en: "Kitchen cabinetry detail", es: "Detalle de gabinetes de cocina" },
  },
  {
    id: "kitchen-faucet",
    category: "finishes",
    image: book.kitchenFaucet,
    caption: { en: "Kitchen faucet (Dornbracht)", es: "Grifo de cocina (Dornbracht)" },
  },
  {
    id: "closet-open",
    category: "finishes",
    image: book.closetOpen,
    caption: { en: "Closets (Rimadesio)", es: "Vestidores (Rimadesio)" },
  },
  {
    id: "closet-lounge",
    category: "finishes",
    image: book.closetLounge,
    caption: { en: "Dressing room (Rimadesio)", es: "Vestidor (Rimadesio)" },
  },
  {
    id: "running",
    category: "lifestyle",
    image: book.running,
    caption: { en: "Morning run in the gardens", es: "Carrera matinal en los jardines" },
  },
];

export const pages: GenericPage[] = [
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
