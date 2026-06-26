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
    email: "hola@raicessinfronteras.org",
    pressEmail: "prensa@raicessinfronteras.org",
    phone: "+240 333 000 000",
    phoneHref: "+240333000000",
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

export const mainNav: NavItem[] = [
  { key: "home", href: "/" },
  { key: "about", href: "/nosotros" },
  { key: "programs", href: "/programas" },
  { key: "projects", href: "/proyectos" },
  { key: "news", href: "/noticias" },
  { key: "gallery", href: "/galeria" },
  { key: "contact", href: "/contacto" },
];

export const footerNav: { titleKey: "colOrg" | "colParticipate"; items: NavItem[] }[] = [
  {
    titleKey: "colOrg",
    items: [
      { key: "about", href: "/nosotros" },
      { key: "programs", href: "/programas" },
      { key: "projects", href: "/proyectos" },
      { key: "news", href: "/noticias" },
    ],
  },
  {
    titleKey: "colParticipate",
    items: [
      { key: "donate", href: "/donar" },
      { key: "gallery", href: "/galeria" },
      { key: "contact", href: "/contacto" },
      { key: "volunteer", href: "/contacto?asunto=voluntariado" },
    ],
  },
];
