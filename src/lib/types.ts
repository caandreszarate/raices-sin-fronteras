/**
 * Modelos de datos del dominio. Diseñados para mapear 1:1 con tablas de
 * PostgreSQL/Supabase o colecciones de un CMS headless. Cada entidad usa
 * `slug` como identificador público estable.
 */

export type Region = "America Latina" | "Guinea Ecuatorial" | "Transatlantico";

export type ProgramSlug =
  | "cultura"
  | "juventud"
  | "educacion"
  | "medio-ambiente"
  | "cooperacion"
  | "turismo-de-raices";

export interface Program {
  slug: ProgramSlug;
  title: string;
  icon: string; // clave de icono (ver components/icons)
  summary: string;
  description: string;
  /** color de marca asociado (token CSS sin el prefijo --color-) */
  accent: string;
  goals: string[];
  highlights: { label: string; value: string }[];
}

export type ProjectStatus = "activo" | "en-curso" | "finalizado" | "proximamente";

export interface Project {
  slug: string;
  title: string;
  program: ProgramSlug;
  region: Region;
  country: string;
  status: ProjectStatus;
  year: number;
  startDate: string; // ISO
  summary: string;
  /** Cuerpo en párrafos planos (texto, no HTML) para evitar XSS. */
  body: string[];
  cover: string; // ruta de imagen o placeholder
  impact: { label: string; value: string }[];
  partners: string[];
  featured?: boolean;
}

export type NewsCategory =
  | "Cultura"
  | "Educación"
  | "Cooperación"
  | "Juventud"
  | "Medio Ambiente"
  | "Institucional";

export interface NewsArticle {
  slug: string;
  title: string;
  excerpt: string;
  category: NewsCategory;
  author: string;
  publishedAt: string; // ISO
  readingMinutes: number;
  cover: string;
  body: string[]; // párrafos planos
  tags: string[];
  featured?: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  event: string;
  country: string;
  program: ProgramSlug;
  year: number;
  /** Tono de marca para el placeholder visual accesible. */
  tone: string;
  alt: string;
}

export interface TeamMember {
  name: string;
  role: string;
  region: Region;
  bio: string;
  initials: string;
}

export interface Value {
  title: string;
  description: string;
  icon: string;
}
