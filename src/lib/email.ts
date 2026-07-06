import { Resend } from "resend";
import { siteConfig } from "@/lib/site";
import { asuntoLabels, type ContactInput } from "@/lib/validation";

/**
 * Envío de correo transaccional vía Resend. Toda la configuración vive en
 * variables de entorno del servidor (nunca llegan al navegador):
 *
 * - RESEND_API_KEY      clave de la cuenta de Resend (obligatoria para enviar).
 * - CONTACT_INBOX       buzón que recibe los mensajes del formulario
 *                       (por defecto, el correo público de contacto).
 * - EMAIL_FROM          remitente; debe pertenecer al dominio verificado.
 * - RESEND_AUDIENCE_ID  audiencia de Resend para altas de newsletter (opcional;
 *                       sin ella, cada alta llega como aviso al buzón).
 */

const FROM = process.env.EMAIL_FROM ?? `Raíces sin Fronteras <web@raicessinfronteras.org>`;
const INBOX = process.env.CONTACT_INBOX ?? siteConfig.contact.email;

function getClient(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  return key ? new Resend(key) : null;
}

/** Aviso interno con el mensaje del formulario de contacto. Texto plano:
 *  sin HTML no hay riesgo de inyección con el contenido del usuario. */
export async function sendContactEmail(data: ContactInput): Promise<boolean> {
  const resend = getClient();
  if (!resend) {
    console.error("[email] RESEND_API_KEY no configurada: mensaje de contacto NO entregado.");
    return false;
  }

  const { error } = await resend.emails.send({
    from: FROM,
    to: [INBOX],
    replyTo: data.email,
    subject: `[Web] ${asuntoLabels[data.asunto]} — ${data.nombre}`,
    text: [
      `Nuevo mensaje desde ${siteConfig.url}/contacto`,
      "",
      `Nombre:  ${data.nombre}`,
      `Correo:  ${data.email}`,
      `Asunto:  ${asuntoLabels[data.asunto]}`,
      "",
      "Mensaje:",
      data.mensaje,
    ].join("\n"),
  });

  if (error) {
    console.error("[email] fallo al enviar contacto:", error.message);
    return false;
  }
  return true;
}

/** Alta de newsletter: contacto en la audiencia de Resend si está configurada;
 *  si no, aviso al buzón para gestionarla a mano. */
export async function subscribeNewsletterEmail(email: string): Promise<boolean> {
  const resend = getClient();
  if (!resend) {
    console.error("[email] RESEND_API_KEY no configurada: alta de newsletter NO registrada.");
    return false;
  }

  const audienceId = process.env.RESEND_AUDIENCE_ID;
  if (audienceId) {
    const { error } = await resend.contacts.create({ audienceId, email });
    // Un correo ya suscrito no debe contarse como fallo.
    if (error && !/already exists/i.test(error.message)) {
      console.error("[email] fallo al crear contacto de newsletter:", error.message);
      return false;
    }
    return true;
  }

  const { error } = await resend.emails.send({
    from: FROM,
    to: [INBOX],
    subject: "[Web] Nueva suscripción a la newsletter",
    text: `Alta desde ${siteConfig.url}: ${email}`,
  });
  if (error) {
    console.error("[email] fallo al avisar alta de newsletter:", error.message);
    return false;
  }
  return true;
}
