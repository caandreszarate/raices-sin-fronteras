/**
 * Configuración global del sitio. Centraliza navegación, datos de contacto,
 * redes sociales y metadatos para mantener una sola fuente de verdad.
 */

export const siteConfig = {
  name: "Raíces sin Fronteras",
  shortName: "Raíces sin Fronteras",
  tagline: "Conectamos orígenes, construimos futuros",
  description:
    "Plataforma de cooperación afro-hispana que conecta América Latina y Guinea Ecuatorial para fortalecer raíces culturales, educación, juventud, medio ambiente, cooperación y turismo de raíces.",
  // Cambia esto por tu dominio real en producción (usado para SEO y sitemap).
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://raicessinfronteras.org",
  locale: "es_ES",
  regions: "América Latina y Guinea Ecuatorial",
  contact: {
    email: "contacto@raicessinfronteras.org",
    pressEmail: "contacto@raicessinfronteras.org",
    phones: [
      { label: "Colombia", phone: "+57 315 057 0742", phoneHref: "+573150570742" },
      { label: "Guinea Ecuatorial", phone: "+240 222 268 283", phoneHref: "+240222268283" },
      { label: "Venezuela", phone: "+58 242 568 9212", phoneHref: "+582425689212" },
    ],
    // Número que recibe los mensajes del botón flotante de WhatsApp (formato wa.me: solo dígitos).
    whatsapp: "573105550703",
    addressLines: ["Malabo, Guinea Ecuatorial", "Bogotá, Colombia"],
    hours: "Lunes a viernes, 9:00–17:00 (WAT / COT)",
  },
  social: [
    { name: "Instagram", href: "https://instagram.com/raicessinfronteras", handle: "@raicessinfronteras" },
    { name: "Facebook", href: "https://facebook.com/raicessinfronteras", handle: "/raicessinfronteras" },
    { name: "YouTube", href: "https://youtube.com/@raicessinfronteras", handle: "@raicessinfronteras" },
    { name: "LinkedIn", href: "https://linkedin.com/company/raicessinfronteras", handle: "/raicessinfronteras" },
  ],
} as const;

/** Elementos de navegación: `key` resuelve la etiqueta vía i18n (namespace nav). */
export type NavItem = { key: string; href: string };

// "Proyectos", "Galería" y "Donar" quedan fuera de la navegación mientras la
// plataforma está en fase de presentación institucional; las rutas siguen
// activas para reactivarlas cuando haya material y proyectos reales.
export const mainNav: NavItem[] = [
  { key: "home", href: "/" },
  { key: "about", href: "/nosotros" },
  { key: "programs", href: "/programas" },
  { key: "news", href: "/noticias" },
  { key: "contact", href: "/contacto" },
];

export const footerNav: { titleKey: "colOrg" | "colParticipate"; items: NavItem[] }[] = [
  {
    titleKey: "colOrg",
    items: [
      { key: "about", href: "/nosotros" },
      { key: "programs", href: "/programas" },
      { key: "news", href: "/noticias" },
    ],
  },
  {
    titleKey: "colParticipate",
    items: [
      { key: "volunteer", href: "/contacto?asunto=voluntariado" },
      { key: "contact", href: "/contacto" },
    ],
  },
];
