import "./globals.css";

/**
 * Layout raíz mínimo (passthrough). El `<html>`/`<body>`, fuentes, proveedores
 * de i18n y la cabecera/pie viven en `app/[locale]/layout.tsx` para que el
 * idioma forme parte de la ruta.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
