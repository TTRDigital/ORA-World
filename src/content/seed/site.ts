import type { SiteSettings } from "../types";
import { renders, lifestyle, tdm, img } from "./images";

export const siteSettings: SiteSettings = {
  // [[PLACEHOLDER: not published anywhere public. Pulled from env on the server when provided.]]
  phone: process.env.NEXT_PUBLIC_PHONE || null,
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || null,
  email: process.env.NEXT_PUBLIC_EMAIL || null,
  salesGalleryName: { en: "ORA World Sales Gallery", es: "Galería de ventas ORA World" },
  salesGalleryAddress: {
    en: "Tesoro Del Mar, Dorado, Vega Alta, Puerto Rico 00692",
    es: "Tesoro Del Mar, Dorado, Vega Alta, Puerto Rico 00692",
  },
  hours: null,
  social: [
    { label: "Instagram", href: "https://instagram.com" }, // [[PLACEHOLDER: handle]]
    { label: "Facebook", href: "https://facebook.com" },
    { label: "X", href: "https://twitter.com" },
    { label: "YouTube", href: "https://www.youtube.com" },
  ],
  legalNotice: {
    en: "This advertisement is not an offering. It is a solicitation of interest in the advertised property. No offering of the advertised units can be made and no deposits can be accepted, or reservations, binding or non - binding, can be made until an offering plan is filed with the New York State Department of Law. This advertisement is made pursuant to Cooperative Policy Statement No. 1, issued by the New York State Department of Law. Attorney General File No.: CP25-0047. Sponsor: TRPbuildco LLC Sponsor’s Address: Tesoro Del Mar Dorado, Vega Alta, Puerto Rico 00692",
    es: "This advertisement is not an offering. It is a solicitation of interest in the advertised property. No offering of the advertised units can be made and no deposits can be accepted, or reservations, binding or non - binding, can be made until an offering plan is filed with the New York State Department of Law. This advertisement is made pursuant to Cooperative Policy Statement No. 1, issued by the New York State Department of Law. Attorney General File No.: CP25-0047. Sponsor: TRPbuildco LLC Sponsor’s Address: Tesoro Del Mar Dorado, Vega Alta, Puerto Rico 00692",
  },
  renderingNotice: {
    en: "All images on this page are artist renderings.",
    es: "Todas las imágenes de esta página son representaciones artísticas.",
  },
  sponsor: { en: "Sponsor: TRPbuildco LLC", es: "Patrocinador: TRPbuildco LLC" },
  portalUrl: process.env.NEXT_PUBLIC_PORTAL_URL || "https://www.oraworld.com/login/",
  bookingUrl: null, // [[PLACEHOLDER: Calendly / Cal.com URL]]
  vrTourUrl: "https://kuula.co/share/collection/7Zt7D?logo=1&info=0&fs=1&vr=1&thumbs=2&margin=10&alpha=0.60",
  filmUrl: null, // set by the video pipeline or a Sanity file asset
  filmYoutubeId: "HkIPZ9pGezA", // "Live Beyond Limits | ORA World Puerto Rico" on the ORA World channel
  // The client's own presentation (published at oraworld.com/tesoro-del-mar-pdf): "Treasure Point / PR2030",
  // Tesoro Del Mar's working name. The PDF stays on the client's server; its nine pages power the flipbook.
  brochureUrl: "https://www.oraworld.com/wp-content/uploads/2023/09/004-PR2030-TREASURE-POINT.pdf",
  brochurePages: Array.from({ length: 9 }, (_, i) =>
    img(`brochure/tdm-brochure-0${i + 1}` as Parameters<typeof img>[0], {
      en: `Tesoro Del Mar presentation, page ${i + 1} of 9`,
      es: `Presentación de Tesoro Del Mar, página ${i + 1} de 9`,
    }),
  ),
  brokerKitUrl: null, // [[PLACEHOLDER: broker kit PDF]]
  mediaKitUrl: null, // [[PLACEHOLDER: media kit]]
  consentText: {
    en: "By submitting this form you agree that ORA World and its sales representatives may contact you by phone, email and text message (including by automated means) about your inquiry. Consent is not a condition of purchase. Message and data rates may apply. Reply STOP to opt out at any time.",
    es: "Al enviar este formulario acepta que ORA World y sus representantes de ventas puedan contactarle por teléfono, correo electrónico y mensaje de texto (incluso por medios automatizados) sobre su consulta. El consentimiento no es condición de compra. Pueden aplicar tarifas de mensajes y datos. Responda STOP para cancelar en cualquier momento.",
  },
  siteLat: Number(process.env.NEXT_PUBLIC_SITE_LAT || 18.4542),
  siteLng: Number(process.env.NEXT_PUBLIC_SITE_LNG || -66.3178),
  menuImages: {
    residences: tdm.aptLiving,
    floorPlans: tdm.aptStudy,
    amenities: renders.poolTerrace,
    lifestyle: lifestyle.familyPool,
    location: tdm.aerialCoast,
    gallery: tdm.foyerAtrium,
    contact: tdm.foyerSignage,
  },
};
