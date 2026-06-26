"use server";

import { headers } from "next/headers";
import { newsletterSchema } from "@/lib/validation";
import { rateLimit, clientIpFromHeaders } from "@/lib/rate-limit";

export interface NewsletterState {
  status: "idle" | "success" | "error";
  message?: string;
}

export async function subscribeNewsletter(
  _prev: NewsletterState,
  formData: FormData,
): Promise<NewsletterState> {
  const h = await headers();
  const ip = clientIpFromHeaders(h);
  const limit = rateLimit(`newsletter:${ip}`, 4, 60_000);
  if (!limit.success) {
    return { status: "error", message: "Demasiados intentos. Espera un momento." };
  }

  const parsed = newsletterSchema.safeParse({
    website: formData.get("website") ?? "",
    email: formData.get("email") ?? "",
  });

  if (!parsed.success) {
    const flat = parsed.error.flatten().fieldErrors;
    // Honeypot → éxito silencioso.
    if (flat.website?.length) {
      return { status: "success", message: "¡Gracias por suscribirte!" };
    }
    return { status: "error", message: flat.email?.[0] ?? "Introduce un correo válido." };
  }

  try {
    // Integración real (deshabilitada): añadir a lista de correo / tabla `subscribers`.
    if (process.env.NODE_ENV !== "production") {
      console.info("[newsletter] alta válida:", parsed.data.email);
    }
    return { status: "success", message: "¡Listo! Te avisaremos de cada novedad." };
  } catch {
    return { status: "error", message: "No pudimos completar la suscripción. Inténtalo más tarde." };
  }
}
