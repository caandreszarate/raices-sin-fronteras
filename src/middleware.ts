import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

/** Detección y enrutado por idioma (es sin prefijo; en/fr/pt con prefijo). */
export default createMiddleware(routing);

export const config = {
  // Excluye API, estáticos de Next, archivos públicos y assets con extensión.
  matcher: ["/((?!api|_next|_vercel|branding|.*\\..*).*)"],
};
