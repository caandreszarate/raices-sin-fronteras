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

/** Imagen asociada a cada programa (temática coherente con la viñeta). */
export const programImage: Record<ProgramSlug, string> = {
  cultura: cut.duo,
  juventud: cut.guinea,
  educacion: cut.latam,
  "medio-ambiente": cut.ceiba,
  cooperacion: cut.duo,
  "turismo-de-raices": cut.guinea,
};

/** Imagen asociada a cada categoría de noticias. */
export const categoryImage: Record<NewsCategory, string> = {
  Institucional: cut.duo,
  Cultura: cut.duo,
  Educación: cut.latam,
  Juventud: cut.guinea,
  "Medio Ambiente": cut.ceiba,
  Cooperación: cut.duo,
};
