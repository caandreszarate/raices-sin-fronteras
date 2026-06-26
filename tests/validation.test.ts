import { describe, it, expect } from "vitest";
import { contactSchema, newsletterSchema } from "@/lib/validation";

describe("contactSchema", () => {
  const valid = {
    website: "",
    nombre: "Ada Lovelace",
    email: "ada@example.com",
    asunto: "general",
    mensaje: "Hola, me gustaría colaborar con el programa de educación.",
    consentimiento: "on",
  };

  it("acepta una entrada válida", () => {
    const r = contactSchema.safeParse(valid);
    expect(r.success).toBe(true);
  });

  it("normaliza el email a minúsculas", () => {
    const r = contactSchema.safeParse({ ...valid, email: "ADA@Example.COM" });
    expect(r.success && r.data.email).toBe("ada@example.com");
  });

  it("rechaza un email inválido", () => {
    const r = contactSchema.safeParse({ ...valid, email: "no-es-email" });
    expect(r.success).toBe(false);
  });

  it("rechaza un nombre demasiado corto", () => {
    const r = contactSchema.safeParse({ ...valid, nombre: "A" });
    expect(r.success).toBe(false);
  });

  it("rechaza un mensaje con caracteres de control (anti inyección)", () => {
    const r = contactSchema.safeParse({ ...valid, mensaje: "linea1\nlinea2 con relleno mas que suficiente para pasar el minimo" });
    expect(r.success).toBe(false);
  });

  it("rechaza un asunto fuera del enum", () => {
    const r = contactSchema.safeParse({ ...valid, asunto: "spam" });
    expect(r.success).toBe(false);
  });

  it("exige el consentimiento", () => {
    const r = contactSchema.safeParse({ ...valid, consentimiento: false });
    expect(r.success).toBe(false);
  });

  it("detecta el honeypot (website con contenido)", () => {
    const r = contactSchema.safeParse({ ...valid, website: "http://bot.example" });
    const errors = r.success ? {} : r.error.flatten().fieldErrors;
    expect(r.success).toBe(false);
    expect(errors.website?.length).toBeGreaterThan(0);
  });

  it("trunca/rechaza un mensaje excesivamente largo", () => {
    const r = contactSchema.safeParse({ ...valid, mensaje: "a".repeat(2001) });
    expect(r.success).toBe(false);
  });
});

describe("newsletterSchema", () => {
  it("acepta un email válido", () => {
    expect(newsletterSchema.safeParse({ website: "", email: "a@b.com" }).success).toBe(true);
  });
  it("rechaza email inválido", () => {
    expect(newsletterSchema.safeParse({ website: "", email: "x" }).success).toBe(false);
  });
  it("detecta el honeypot", () => {
    expect(newsletterSchema.safeParse({ website: "bot", email: "a@b.com" }).success).toBe(false);
  });
});
