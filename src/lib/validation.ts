import { z } from "zod";

/**
 * Esquemas Zod compartidos. Toda entrada de usuario se valida en el servidor
 * con estos esquemas (las server actions nunca confían en el cliente).
 */

// Rechaza caracteres de control (mitiga inyección de cabeceras / payloads raros).
const CONTROL_CHARS = /[\x00-\x1F\x7F]/;

// Limita longitudes y bloquea control chars para mitigar abuso.
const safeText = (min: number, max: number) =>
  z
    .string()
    .trim()
    .min(min, { message: `Debe tener al menos ${min} caracteres.` })
    .max(max, { message: `No debe superar los ${max} caracteres.` })
    .refine((v) => !CONTROL_CHARS.test(v), {
      message: "Contiene caracteres no permitidos.",
    });

export const contactSchema = z.object({
  // Honeypot: debe llegar vacío. Si tiene contenido, es un bot.
  website: z.string().max(0, { message: "Envío rechazado." }).optional().default(""),
  nombre: safeText(2, 80),
  email: z.string().trim().toLowerCase().email({ message: "Introduce un correo válido." }).max(120),
  asunto: z.enum(["general", "voluntariado", "alianzas", "prensa"], {
    message: "Selecciona un asunto válido.",
  }),
  mensaje: safeText(10, 2000),
  // Consentimiento explícito (RGPD-friendly).
  consentimiento: z
    .union([z.literal("on"), z.literal("true"), z.boolean()])
    .refine((v) => v === "on" || v === "true" || v === true, {
      message: "Debes aceptar la política de privacidad.",
    }),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const newsletterSchema = z.object({
  website: z.string().max(0, { message: "Envío rechazado." }).optional().default(""),
  email: z.string().trim().toLowerCase().email({ message: "Introduce un correo válido." }).max(120),
});

export type NewsletterInput = z.infer<typeof newsletterSchema>;

export const asuntoLabels: Record<ContactInput["asunto"], string> = {
  general: "Consulta general",
  voluntariado: "Voluntariado",
  alianzas: "Alianzas y cooperación",
  prensa: "Prensa y medios",
};
