import { NextRequest, NextResponse } from "next/server";

/**
 * Content-Security-Policy por petición con nonce.
 *
 * Next.js detecta automáticamente el nonce presente en la cabecera CSP y lo
 * inyecta en sus propios <script>, de modo que evitamos `unsafe-inline` para
 * scripts. Los estilos requieren `unsafe-inline` por la naturaleza de las
 * variables CSS inyectadas en runtime; está acotado solo a `style-src`.
 */
export function proxy(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");

  const csp = [
    `default-src 'self'`,
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic' ${
      process.env.NODE_ENV === "development" ? "'unsafe-eval'" : ""
    }`,
    `style-src 'self' 'unsafe-inline'`,
    `img-src 'self' blob: data: https:`,
    `font-src 'self' data:`,
    `connect-src 'self'`,
    `frame-src 'self' https://www.openstreetmap.org`,
    `object-src 'none'`,
    `base-uri 'self'`,
    `form-action 'self'`,
    `frame-ancestors 'none'`,
    `upgrade-insecure-requests`,
  ]
    .join("; ")
    .replace(/\s{2,}/g, " ")
    .trim();

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", csp);

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set("Content-Security-Policy", csp);
  return response;
}

export const config = {
  matcher: [
    // Aplica a todas las rutas excepto estáticos de Next y archivos públicos comunes.
    {
      source: "/((?!_next/static|_next/image|favicon.ico|branding|.*\\.(?:png|jpg|jpeg|svg|webp|avif|ico)$).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
