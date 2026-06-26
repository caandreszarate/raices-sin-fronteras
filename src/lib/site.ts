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

export type NavItem = {
  label: string;
  href: string;
  description?: string;
};

export const mainNav: NavItem[] = [
  { label: "Inicio", href: "/" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Programas", href: "/programas" },
  { label: "Proyectos", href: "/proyectos" },
  { label: "Noticias", href: "/noticias" },
  { label: "Galería", href: "/galeria" },
  { label: "Contacto", href: "/contacto" },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Organización",
    items: [
      { label: "Quiénes somos", href: "/nosotros" },
      { label: "Programas", href: "/programas" },
      { label: "Proyectos", href: "/proyectos" },
      { label: "Noticias", href: "/noticias" },
    ],
  },
  {
    title: "Participa",
    items: [
      { label: "Dona ahora", href: "/donar" },
      { label: "Galería", href: "/galeria" },
      { label: "Contacto", href: "/contacto" },
      { label: "Voluntariado", href: "/contacto?asunto=voluntariado" },
    ],
  },
];
