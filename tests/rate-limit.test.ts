import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { rateLimit, clientIpFromHeaders } from "@/lib/rate-limit";

describe("rateLimit", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("permite hasta el límite y luego bloquea", () => {
    const key = `test:${Math.random()}`;
    for (let i = 0; i < 3; i++) {
      expect(rateLimit(key, 3, 60_000).success).toBe(true);
    }
    expect(rateLimit(key, 3, 60_000).success).toBe(false);
  });

  it("decrementa el contador `remaining`", () => {
    const key = `test:${Math.random()}`;
    expect(rateLimit(key, 5, 60_000).remaining).toBe(4);
    expect(rateLimit(key, 5, 60_000).remaining).toBe(3);
  });

  it("se reinicia tras la ventana de tiempo", () => {
    const key = `test:${Math.random()}`;
    expect(rateLimit(key, 1, 1_000).success).toBe(true);
    expect(rateLimit(key, 1, 1_000).success).toBe(false);
    vi.advanceTimersByTime(1_001);
    expect(rateLimit(key, 1, 1_000).success).toBe(true);
  });
});

describe("clientIpFromHeaders", () => {
  it("toma la primera IP de x-forwarded-for", () => {
    const h = new Headers({ "x-forwarded-for": "203.0.113.7, 70.41.3.18" });
    expect(clientIpFromHeaders(h)).toBe("203.0.113.7");
  });
  it("usa x-real-ip como respaldo", () => {
    const h = new Headers({ "x-real-ip": "198.51.100.2" });
    expect(clientIpFromHeaders(h)).toBe("198.51.100.2");
  });
  it("devuelve 'unknown' sin cabeceras", () => {
    expect(clientIpFromHeaders(new Headers())).toBe("unknown");
  });
});
