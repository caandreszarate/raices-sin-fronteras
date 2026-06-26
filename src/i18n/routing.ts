import { defineRouting } from "next-intl/routing";

/** Idiomas del sitio. `es` es el predeterminado (contenido original). */
export const routing = defineRouting({
  locales: ["es", "en", "fr", "pt"],
  defaultLocale: "es",
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];

export const localeNames: Record<Locale, { label: string; native: string; flag: string }> = {
  es: { label: "Español", native: "Español", flag: "🇪🇸" },
  en: { label: "Inglés", native: "English", flag: "🇬🇧" },
  fr: { label: "Francés", native: "Français", flag: "🇫🇷" },
  pt: { label: "Portugués", native: "Português", flag: "🇵🇹" },
};
