import { describe, it, expect } from "vitest";
import { formatDate, escapeHtml } from "@/lib/format";

describe("formatDate", () => {
  it("formatea en español por defecto", () => {
    expect(formatDate("2026-05-28")).toMatch(/2026/);
    expect(formatDate("2026-05-28").toLowerCase()).toContain("mayo");
  });

  it("respeta el locale (inglés)", () => {
    expect(formatDate("2026-05-28", "en").toLowerCase()).toContain("may");
  });

  it("respeta el locale (francés)", () => {
    expect(formatDate("2026-05-28", "fr").toLowerCase()).toContain("mai");
  });

  it("devuelve la cadena original ante una fecha inválida", () => {
    expect(formatDate("no-es-fecha")).toBe("no-es-fecha");
  });
});

describe("escapeHtml", () => {
  it("escapa caracteres peligrosos (XSS)", () => {
    expect(escapeHtml('<script>alert("x")</script>')).toBe(
      "&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;",
    );
  });
  it("escapa ampersand y comillas simples", () => {
    expect(escapeHtml("Tom & Jerry's")).toBe("Tom &amp; Jerry&#39;s");
  });
});
