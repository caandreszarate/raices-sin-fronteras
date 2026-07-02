import type { ProgramSlug, NewsCategory } from "@/lib/types";

/**
 * Mapeo de contenido → recortes reales del branding (carpeta public/branding/cuts).
 * Son viñetas extraídas del emblema ilustrado oficial: las dos orillas, la ceiba
 * y los dos rostros. Así el sitio usa la ilustración del archivo de marca.
 */

export const cut = {
  latam: "/branding/cuts/latam.jpg", // hombre + catedral + Andes
  guinea: "/branding/cuts/guinea.jpg", // mujer con turbante + palmeras + atardecer
  ceiba: "/branding/cuts/ceiba.jpg", // copa de la ceiba con hojas verde/rojo/oro
  duo: "/branding/cuts/duo.jpg", // ambos rostros + nudo dorado (centro del emblema)
} as const;

export const textile = {
  latam: "/branding/cuts/textile-latam.png",
  green: "/branding/cuts/textile-green.png",
  kente: "/branding/cuts/textile-kente.png",
  gold: "/branding/cuts/textile-gold.png",
} as const;

/**
 * Imagen propia de cada programa (public/programas, optimizadas ≤1400-1600px).
 * medio-ambiente es fotografía real del parque de Malabo; el resto es material
 * provisional aportado por la organización.
 */
export const programImage: Record<ProgramSlug, string> = {
  cultura: "/programas/cultura.jpg",
  juventud: "/programas/juventud.jpg",
  educacion: "/programas/educacion.jpg",
  "medio-ambiente": "/programas/medio-ambiente.jpg",
  cooperacion: "/programas/cooperacion.jpg",
  "turismo-de-raices": "/programas/turismo-de-raices.jpg",
};

/** Imagen asociada a cada categoría de noticias (reutiliza las de programas). */
export const categoryImage: Record<NewsCategory, string> = {
  Institucional: cut.duo,
  Cultura: programImage.cultura,
  Educación: programImage.educacion,
  Juventud: programImage.juventud,
  "Medio Ambiente": programImage["medio-ambiente"],
  Cooperación: programImage.cooperacion,
};
