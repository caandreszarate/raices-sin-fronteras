import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

/**
 * Wrappers de navegación conscientes del idioma. Usa estos `Link`, `redirect`,
 * `usePathname`, `useRouter` en lugar de los de `next/*` para que las rutas
 * lleven el prefijo de idioma automáticamente.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
