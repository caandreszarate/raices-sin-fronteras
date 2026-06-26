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

export async function POST(request: NextRequest) {
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
