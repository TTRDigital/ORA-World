import type { Faq } from "../types";

/**
 * FAQ, carried over from ORA World v2 (including the Act 60 answers based on Act 38-2026, DDEC
 * Bulletin 2026-004 and IRS Publication 570). Tesoro Del Mar facts follow the client's brochure where
 * v2 still had older figures. Health wording avoids promising outcomes.
 */
const T = {
  general: { en: "ORA World", es: "ORA World" },
  health: { en: "Longevity", es: "Longevidad" },
  residences: { en: "Tesoro Del Mar", es: "Tesoro Del Mar" },
  resilience: { en: "Resilience & security", es: "Resiliencia y seguridad" },
  tax: { en: "Act 60", es: "Ley 60" },
  buying: { en: "Buying", es: "Compra" },
};

const TAX_NOTE = {
  en: "General information, not tax or legal advice; a Puerto Rico tax professional should review your situation.",
  es: "Información general, no asesoría fiscal ni legal; un profesional fiscal de Puerto Rico debe revisar su caso.",
};

export const faqs: Faq[] = [
  {
    slug: "what-is-ora-world",
    topic: T.general,
    question: { en: "What is ORA World?", es: "¿Qué es ORA World?" },
    answer: {
      en: [
        "ORA World is about two things: a longer life and a better life. Longevity is the foundation of our world: if you are going to live longer, you will want to live better, and to live better you will want to be stronger and fitter. ORA World makes all of this easy.",
        "ORA World creates luxurious, eco-friendly communities in Puerto Rico where longevity, luxury and nature exist in harmony. Tesoro Del Mar is the first.",
      ],
      es: [
        "ORA World se trata de dos cosas: una vida más larga y una vida mejor. La longevidad es la base de nuestro mundo: si va a vivir más, querrá vivir mejor, y para vivir mejor querrá estar más fuerte y en forma. ORA World lo hace todo fácil.",
        "ORA World crea comunidades de lujo y ecológicas en Puerto Rico donde la longevidad, el lujo y la naturaleza conviven en armonía. Tesoro Del Mar es la primera.",
      ],
    },
  },
  {
    slug: "health",
    topic: T.health,
    question: { en: "What does ORA World do for my health?", es: "¿Qué hace ORA World por mi salud?" },
    answer: {
      en: [
        "Planes don't fall from the sky because of redundancy and preventive maintenance. Your body has redundancy, two lungs and two kidneys, but most people have no preventive maintenance: they see a doctor only when something hurts. ORA checks you before something breaks, so that what can be caught early, like heart issues, is caught early.",
        "Members get a total body scan, a personal interview about their goals, nutritionists on staff who set specifics like daily protein targets, many meal options from a ghost kitchen that cooks for them, a fitness program designed to make getting fit easy, and a connection to a list of cardiologists.",
      ],
      es: [
        "Los aviones no se caen del cielo gracias a la redundancia y al mantenimiento preventivo. Su cuerpo tiene redundancia, dos pulmones y dos riñones, pero la mayoría no tiene mantenimiento preventivo: va al médico solo cuando algo duele. ORA le revisa antes de que algo falle, para detectar a tiempo lo que se puede detectar, como problemas del corazón.",
        "Los miembros reciben un escáner corporal completo, una entrevista personal sobre sus metas, nutricionistas que fijan detalles como la proteína diaria, muchas opciones de comida de una cocina que cocina para ellos, un programa de ejercicio sencillo y conexión con una lista de cardiólogos.",
      ],
    },
  },
  {
    slug: "ghost-kitchen",
    topic: T.health,
    question: { en: "What is the ghost kitchen?", es: "¿Qué es la cocina fantasma?" },
    answer: {
      en: [
        "A kitchen on the premises that cooks for members, with many meal options built around what each person likes and the nutrition targets their nutritionist sets. It makes eating well easy.",
      ],
      es: [
        "Una cocina en el lugar que cocina para los miembros, con muchas opciones según los gustos de cada persona y las metas de nutrición que fija su nutricionista. Hace fácil comer bien.",
      ],
    },
  },
  {
    slug: "founder",
    topic: T.general,
    question: { en: "Who founded ORA World?", es: "¿Quién fundó ORA World?" },
    answer: {
      en: [
        "ORA World was founded by a Harvard-trained heart surgeon whose clinics are within driving distance of about 65% of the US population. One of his focus areas is longevity.",
      ],
      es: [
        "ORA World fue fundada por un cirujano cardiovascular formado en Harvard, cuyas clínicas están a distancia en auto de cerca del 65% de la población de EE. UU. Uno de sus focos es la longevidad.",
      ],
    },
  },
  {
    slug: "where-is-tesoro",
    topic: T.residences,
    question: { en: "Where is Tesoro Del Mar?", es: "¿Dónde está Tesoro Del Mar?" },
    answer: {
      en: [
        "Tesoro Del Mar is in Dorado, Vega Alta, Puerto Rico 00692, on the north shore, steps from the beach and a national park, about 35 minutes from San Juan and its international airport.",
      ],
      es: [
        "Tesoro Del Mar está en Dorado, Vega Alta, Puerto Rico 00692, en la costa norte, a pasos de la playa y de un parque nacional, a unos 35 minutos de San Juan y su aeropuerto internacional.",
      ],
    },
  },
  {
    slug: "what-is-tesoro",
    topic: T.residences,
    question: { en: "What does Tesoro Del Mar include?", es: "¿Qué incluye Tesoro Del Mar?" },
    answer: {
      en: [
        "Tesoro Del Mar is a 17-acre coastal community and the first expression of Ora World. Phase One, in Tower 1, has residences on floors 5 to 17 and a two-level penthouse on floor 18, each with ocean views and 10′ ceilings.",
        "Residents have over 65,000 square feet of amenities: a 14,000-square-foot members-only clubhouse, a private beach club and boat slipway, a resort-style pool, a fitness center and spa, an 18-hole putting course and a two-mile walking path.",
      ],
      es: [
        "Tesoro Del Mar es una comunidad costera de 17 acres y la primera expresión de Ora World. La Fase Uno, en la Torre 1, tiene residencias en los pisos 5 a 17 y un penthouse de dos niveles en el piso 18, todas con vista al mar y techos de 10′.",
        "Los residentes disponen de más de 65,000 pies cuadrados de amenidades: un club privado de 14,000 pies cuadrados, club de playa privado y rampa para botes, piscina estilo resort, gimnasio y spa, un campo de putting de 18 hoyos y un sendero de dos millas.",
      ],
    },
  },
  {
    slug: "pricing",
    topic: T.buying,
    question: { en: "What are the prices?", es: "¿Cuáles son los precios?" },
    answer: {
      en: [
        "Early pre-construction pricing for Phase 1 averages $2,250 per sq ft: about $2,000 per sq ft for the lower units and $2,500 per sq ft for the higher units. Later units will likely be sold at higher rates.",
        "This website is a solicitation of interest only: no offering can be made and no deposits or reservations can be accepted until an offering plan is filed with the New York State Department of Law. The Phase 1 floor plans are on the Floor plans page.",
      ],
      es: [
        "El precio inicial de preconstrucción de la Fase 1 promedia $2,250 por pie²: unos $2,000 por pie² en los pisos bajos y $2,500 por pie² en los altos. Las unidades posteriores probablemente se venderán a precios mayores.",
        "Este sitio es solo una solicitud de interés: no se puede hacer ninguna oferta ni aceptar depósitos o reservas hasta que se presente un offering plan ante el Departamento de Justicia del Estado de Nueva York. Los planos de la Fase 1 están en la página de Planos.",
      ],
    },
  },
  {
    slug: "brokers",
    topic: T.buying,
    question: { en: "Do you work with brokers?", es: "¿Trabajan con corredores?" },
    answer: {
      en: ["Yes. Brokers can register their clients through the brokers page. Co-op terms will be published once the offering plan is filed."],
      es: ["Sí. Los corredores pueden registrar a sus clientes en la página de corredores. Las condiciones de cooperación se publicarán cuando se presente el offering plan."],
    },
  },
  {
    slug: "pets",
    topic: T.residences,
    question: { en: "Is Tesoro Del Mar pet friendly?", es: "¿Tesoro Del Mar admite mascotas?" },
    answer: {
      en: ["Yes. The community is designed around \"Happy Homes for All\": secure dog parks, grooming stations, daycare facilities, open play areas, on-demand veterinary care and pet-friendly events."],
      es: ["Sí. La comunidad está pensada en torno a \"Hogares felices para todos\": parques para perros, estaciones de aseo, guardería, áreas de juego, atención veterinaria a demanda y eventos para mascotas."],
    },
  },
  {
    slug: "hurricanes",
    topic: T.resilience,
    question: {
      en: "How are the buildings protected against hurricanes and earthquakes?",
      es: "¿Cómo se protegen los edificios ante huracanes y terremotos?",
    },
    answer: {
      en: [
        "Structures are engineered to withstand Category 5 hurricanes, with impact-resistant windows, reinforced walls and advanced drainage. Seismic engineering exceeds local building codes for seismic zones. Developments include backup generators with solar and battery storage, elevated foundations, stormwater management and private safe rooms.",
      ],
      es: [
        "Las estructuras están diseñadas para resistir huracanes de categoría 5, con ventanas resistentes a impactos, muros reforzados y drenaje avanzado. La ingeniería sísmica supera los códigos locales. Los desarrollos incluyen generadores de respaldo con energía solar y baterías, cimientos elevados, manejo de aguas pluviales y cuartos seguros privados.",
      ],
    },
  },
  {
    slug: "security",
    topic: T.resilience,
    question: { en: "What security is on site?", es: "¿Qué seguridad hay en el lugar?" },
    answer: {
      en: ["Professionally trained security teams on site 24/7, regular patrols, secure perimeters, monitored access points, AI-enhanced surveillance, smart locks and gated, monitored parking."],
      es: ["Equipos de seguridad profesionales 24/7, patrullajes regulares, perímetros seguros, accesos vigilados, vigilancia con IA, cerraduras inteligentes y estacionamiento cerrado y vigilado."],
    },
  },
  {
    slug: "act-60",
    topic: T.tax,
    question: { en: "What is Puerto Rico Act 60?", es: "¿Qué es la Ley 60 de Puerto Rico?" },
    answer: {
      en: [
        "Act 60, the Puerto Rico Incentives Code, consolidates the tax incentive programs that previously existed under different statutes, most famously Acts 20 and 22, into a single code designed to stimulate economic growth and attract businesses and individuals to Puerto Rico.",
        TAX_NOTE.en,
      ],
      es: [
        "La Ley 60, el Código de Incentivos de Puerto Rico, reúne en un solo código los programas de incentivos que antes existían en leyes distintas, sobre todo las Leyes 20 y 22, para estimular la economía y atraer empresas y personas a Puerto Rico.",
        TAX_NOTE.es,
      ],
    },
  },
  {
    slug: "act-60-relocate",
    topic: T.tax,
    question: { en: "Do I need to relocate before applying?", es: "¿Debo mudarme antes de solicitar?" },
    answer: {
      en: [
        "Not necessarily. DDEC guidance preserves the applicable 2026 application cohort for timely applications even if approval occurs later. However, eligibility requires an approved decree, bona fide Puerto Rico residency, and compliance with applicable conditions.",
        TAX_NOTE.en,
      ],
      es: [
        "No necesariamente. La guía del DDEC conserva el grupo de solicitudes de 2026 para las solicitudes a tiempo, aunque la aprobación llegue después. Aun así, se requiere un decreto aprobado, residencia bona fide en Puerto Rico y cumplir las condiciones aplicables.",
        TAX_NOTE.es,
      ],
    },
  },
  {
    slug: "act-60-duration",
    topic: T.tax,
    question: { en: "How long do benefits last?", es: "¿Cuánto duran los beneficios?" },
    answer: {
      en: [
        "Applications filed by December 31, 2026 generally retain the 0% regime through December 31, 2035. New applications from January 1, 2027 generally use a 4% regime through December 31, 2055. Existing decree holders may seek a modification; it is not automatic and switching can trigger the 4% rate from the year of the request.",
        TAX_NOTE.en,
      ],
      es: [
        "Las solicitudes presentadas hasta el 31 de diciembre de 2026 suelen conservar el régimen de 0% hasta el 31 de diciembre de 2035. Las nuevas solicitudes desde el 1 de enero de 2027 suelen usar un régimen de 4% hasta el 31 de diciembre de 2055. Los titulares de decretos pueden pedir una modificación; no es automática y cambiar puede aplicar el 4% desde el año de la solicitud.",
        TAX_NOTE.es,
      ],
    },
  },
  {
    slug: "act-60-gains",
    topic: T.tax,
    question: { en: "Are all capital gains tax-free?", es: "¿Todas las ganancias de capital están exentas?" },
    answer: {
      en: [
        "No. The treatment depends on whether appreciation accrued before or after Puerto Rico residency, when gains are recognized, income sourcing, and federal law. Under Act 38, qualifying pre-residency long-term appreciation recognized after at least ten years can have a distinct 5% Puerto Rico rate, subject to the statute.",
        TAX_NOTE.en,
      ],
      es: [
        "No. Depende de si la plusvalía se generó antes o después de la residencia en Puerto Rico, de cuándo se reconoce, del origen del ingreso y de la ley federal. Bajo la Ley 38, la plusvalía de largo plazo previa a la residencia y reconocida tras al menos diez años puede tener una tasa distinta de 5% en Puerto Rico, según la ley.",
        TAX_NOTE.es,
      ],
    },
  },
  {
    slug: "act-60-residency",
    topic: T.tax,
    question: { en: "What is required for residency?", es: "¿Qué se requiere para la residencia?" },
    answer: {
      en: [
        "Qualifying presence under IRS rules, a Puerto Rico tax home, and the required closer-connection test. The common 183-day route is not the only possible test and does not by itself establish bona fide residency.",
        TAX_NOTE.en,
      ],
      es: [
        "Presencia que califique según las reglas del IRS, domicilio fiscal en Puerto Rico y la prueba de conexión más cercana. La vía habitual de 183 días no es la única prueba y por sí sola no establece residencia bona fide.",
        TAX_NOTE.es,
      ],
    },
  },
  {
    slug: "act-60-home",
    topic: T.tax,
    question: { en: "Do I have to buy a home?", es: "¿Debo comprar una vivienda?" },
    answer: {
      en: [
        "Resident investor decrees include a primary-residence acquisition commitment, generally within two years after the decree. For 2027 applications, DDEC specifies ownership/registration evidence and permitted title-holding arrangements. A residence at Tesoro Del Mar does not automatically satisfy the rule.",
        TAX_NOTE.en,
      ],
      es: [
        "Los decretos de inversionista residente incluyen el compromiso de adquirir una residencia principal, por lo general en los dos años siguientes al decreto. Para las solicitudes de 2027, el DDEC especifica la prueba de titularidad o registro y las formas de titularidad permitidas. Una residencia en Tesoro Del Mar no cumple la regla automáticamente.",
        TAX_NOTE.es,
      ],
    },
  },
  {
    slug: "act-60-who",
    topic: T.tax,
    question: { en: "Who can qualify?", es: "¿Quién puede calificar?" },
    answer: {
      en: [
        "The individual resident investor incentive is subject to prior-residency and other eligibility tests. Applicants filing in 2027 or later generally must not have been Puerto Rico residents during the six years before relocation; earlier applicants are subject to a different historical test.",
        TAX_NOTE.en,
      ],
      es: [
        "El incentivo de inversionista residente individual está sujeto a pruebas de residencia previa y otras condiciones. Quienes soliciten en 2027 o después, en general, no deben haber sido residentes de Puerto Rico en los seis años previos a mudarse; las solicitudes anteriores siguen otra prueba histórica.",
        TAX_NOTE.es,
      ],
    },
  },
  {
    slug: "act-60-revoked",
    topic: T.tax,
    question: { en: "Can a decree be revoked?", es: "¿Se puede revocar un decreto?" },
    answer: {
      en: [
        "Yes. A decree is a government-issued legal benefit subject to its conditions, reporting and compliance requirements; failure to comply may result in penalties or revocation.",
        TAX_NOTE.en,
      ],
      es: [
        "Sí. Un decreto es un beneficio legal emitido por el gobierno y sujeto a sus condiciones, informes y requisitos de cumplimiento; no cumplir puede conllevar sanciones o la revocación.",
        TAX_NOTE.es,
      ],
    },
  },
  {
    slug: "act-60-federal",
    topic: T.tax,
    question: { en: "Does Act 60 eliminate federal income tax?", es: "¿La Ley 60 elimina el impuesto federal?" },
    answer: {
      en: [
        "No. Puerto Rico tax incentives do not automatically eliminate US federal tax. Bona fide residence and income-sourcing rules determine how income is treated for federal purposes.",
        TAX_NOTE.en,
      ],
      es: [
        "No. Los incentivos de Puerto Rico no eliminan automáticamente el impuesto federal de EE. UU. La residencia bona fide y las reglas de origen del ingreso determinan el trato federal.",
        TAX_NOTE.es,
      ],
    },
  },
  {
    slug: "offering-plan",
    topic: T.buying,
    question: { en: "Is this an offering?", es: "¿Es esto una oferta?" },
    answer: {
      en: [
        "No. This advertisement is not an offering. It is a solicitation of interest in the advertised property. No offering of the advertised units can be made and no deposits can be accepted, or reservations, binding or non-binding, can be made until an offering plan is filed with the New York State Department of Law. Attorney General File No. CP25-0047.",
      ],
      es: [
        "No. Este anuncio no es una oferta. Es una solicitud de interés en la propiedad anunciada. No se puede ofrecer ninguna unidad ni aceptar depósitos o reservas, vinculantes o no, hasta que se presente un offering plan ante el Departamento de Justicia del Estado de Nueva York. Expediente del Fiscal General n.º CP25-0047.",
      ],
    },
  },
  {
    slug: "tour-online",
    topic: T.buying,
    question: { en: "Can I tour the residences online?", es: "¿Puedo recorrer las residencias en línea?" },
    answer: {
      en: ["Yes. The 360° virtual tour covers the residences and amenities, and you can arrange a video call with the sales team from the contact page."],
      es: ["Sí. El tour virtual de 360° recorre las residencias y amenidades, y puede coordinar una videollamada con el equipo de ventas desde la página de contacto."],
    },
  },
];
