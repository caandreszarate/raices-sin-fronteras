import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { rateLimit, clientIpFromHeaders } from "@/lib/rate-limit";

/**
 * Punto de integración de la pasarela de pago (Stripe, Redsys, etc.).
 *
 * Aquí NO hay claves en el cliente: este endpoint corre en el servidor y leería
 * `process.env.STRIPE_SECRET_KEY` para crear una sesión de checkout y redirigir.
 * Mientras no esté configurada, devolvemos una redirección informativa para no
 * romper el flujo. Sustituir el bloque marcado por la creación real de la sesión.
 */

const schema = z.object({
  amount: z.coerce.number().int().min(1).max(100000),
  frequency: z.enum(["unica", "mensual"]),
});

/**
 * Verifica que la petición provenga del propio sitio (defensa CSRF para un
 * endpoint POST disparado por formulario). Compara el host de Origin/Referer
 * con el host de la petición. Las server actions de Next ya hacen esto de
 * forma nativa; aquí lo replicamos para la API route.
 */
function isSameOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer");
  const host = request.headers.get("host");
  if (!host) return false;
  const source = origin ?? referer;
  if (!source) return false; // exige Origin o Referer en peticiones que mutan estado
  try {
    return new URL(source).host === host;
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  // 1) Defensa CSRF: rechaza peticiones cross-origin.
  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: "Origen no permitido." }, { status: 403 });
  }

  // 2) Rate limiting por IP (anti-abuso / fuerza bruta).
  const ip = clientIpFromHeaders(request.headers);
  if (!rateLimit(`donar:${ip}`, 10, 60_000).success) {
    return NextResponse.json({ error: "Demasiadas solicitudes." }, { status: 429 });
  }

  const form = await request.formData();
  const parsed = schema.safeParse({
    amount: form.get("amount"),
    frequency: form.get("frequency"),
  });

  if (!parsed.success) {
    return NextResponse.redirect(new URL("/donar?error=datos", request.url), 303);
  }

  // === Integración real (ejemplo, deshabilitada) ===
  // if (process.env.STRIPE_SECRET_KEY) {
  //   const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  //   const session = await stripe.checkout.sessions.create({ ... });
  //   return NextResponse.redirect(session.url!, 303);
  // }

  // Fallback sin pasarela configurada: deriva a contacto con el contexto.
  const url = new URL("/contacto", request.url);
  url.searchParams.set("asunto", "donaciones");
  return NextResponse.redirect(url, 303);
}
