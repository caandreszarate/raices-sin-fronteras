"use server";

import { headers } from "next/headers";
import { contactSchema } from "@/lib/validation";
import { rateLimit, clientIpFromHeaders } from "@/lib/rate-limit";
import { sendContactEmail } from "@/lib/email";

export interface ContactState {
  status: "idle" | "success" | "error";
  message?: string;
  /** Errores por campo para mostrarlos junto a cada input. */
  fieldErrors?: Partial<Record<"nombre" | "email" | "asunto" | "mensaje" | "consentimiento", string>>;
}

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // 1) Rate limiting por IP (defensa anti-spam/abuso).
  const h = await headers();
  const ip = clientIpFromHeaders(h);
  const limit = rateLimit(`contact:${ip}`, 5, 60_000);
  if (!limit.success) {
    return {
      status: "error",
      message: "Has enviado varios mensajes muy seguidos. Inténtalo de nuevo en un minuto.",
    };
  }

  // 2) Validación estricta en servidor con Zod (incluye honeypot `website`).
  const parsed = contactSchema.safeParse({
    website: formData.get("website") ?? "",
    nombre: formData.get("nombre") ?? "",
    email: formData.get("email") ?? "",
    asunto: formData.get("asunto") ?? "",
    mensaje: formData.get("mensaje") ?? "",
    consentimiento: formData.get("consentimiento") ?? false,
  });

  if (!parsed.success) {
    const flat = parsed.error.flatten().fieldErrors;
    // El honeypot se trata como éxito silencioso para no informar al bot.
    if (flat.website?.length) {
      return { status: "success", message: "¡Gracias! Hemos recibido tu mensaje." };
    }
    return {
      status: "error",
      message: "Revisa los campos marcados e inténtalo de nuevo.",
      fieldErrors: {
        nombre: flat.nombre?.[0],
        email: flat.email?.[0],
        asunto: flat.asunto?.[0],
        mensaje: flat.mensaje?.[0],
        consentimiento: flat.consentimiento?.[0],
      },
    };
  }

  const data = parsed.data;

  // 3) Notificación por correo (Resend). La integración vive en el servidor:
  //    ninguna clave llega al navegador.
  try {
    const sent = await sendContactEmail(data);
    if (!sent) {
      return {
        status: "error",
        message: "No pudimos procesar tu mensaje en este momento. Inténtalo más tarde.",
      };
    }
    return {
      status: "success",
      message: "¡Gracias por escribirnos! Te responderemos lo antes posible.",
    };
  } catch {
    return {
      status: "error",
      message: "No pudimos procesar tu mensaje en este momento. Inténtalo más tarde.",
    };
  }
}
