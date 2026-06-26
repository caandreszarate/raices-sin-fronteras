"use server";

import { headers } from "next/headers";
import { contactSchema } from "@/lib/validation";
import { rateLimit, clientIpFromHeaders } from "@/lib/rate-limit";

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

  // 3) Persistencia / notificación.
  //    Aquí se conectaría el envío de correo (Resend/SMTP), guardado en BD
  //    (Supabase/PostgreSQL) o ticket en CRM. Mantenemos la integración fuera
  //    del cliente: ninguna clave llega al navegador.
  try {
    // Ejemplo (deshabilitado): const resend = new Resend(process.env.RESEND_API_KEY)
    if (process.env.NODE_ENV !== "production") {
      // Log seguro en desarrollo (sin exponer datos sensibles en cliente).
      console.info("[contacto] mensaje válido recibido de", data.email, "·", data.asunto);
    }
    // await saveContactMessage(data)

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
