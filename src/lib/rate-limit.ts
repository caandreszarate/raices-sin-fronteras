/**
 * Rate limiter en memoria (ventana fija). Suficiente para una instancia o
 * para desarrollo. En producción multi-instancia, sustituir por Upstash Redis
 * (@upstash/ratelimit) o Vercel KV — la firma se mantiene igual.
 */

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

// Limpieza perezosa para no acumular claves indefinidamente.
function sweep(now: number) {
  if (buckets.size < 5000) return;
  for (const [key, b] of buckets) {
    if (b.resetAt <= now) buckets.delete(key);
  }
}

export interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetAt: number;
}

/**
 * @param key        Identificador (p. ej. `contact:<ip>`).
 * @param limit      Máximo de solicitudes por ventana.
 * @param windowMs   Tamaño de ventana en ms.
 */
export function rateLimit(key: string, limit = 5, windowMs = 60_000): RateLimitResult {
  const now = Date.now();
  sweep(now);

  const existing = buckets.get(key);
  if (!existing || existing.resetAt <= now) {
    const resetAt = now + windowMs;
    buckets.set(key, { count: 1, resetAt });
    return { success: true, remaining: limit - 1, resetAt };
  }

  if (existing.count >= limit) {
    return { success: false, remaining: 0, resetAt: existing.resetAt };
  }

  existing.count += 1;
  return { success: true, remaining: limit - existing.count, resetAt: existing.resetAt };
}

/** Extrae una IP aproximada de las cabeceras (detrás de proxy/Vercel). */
export function clientIpFromHeaders(headers: Headers): string {
  const fwd = headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]!.trim();
  return headers.get("x-real-ip")?.trim() ?? "unknown";
}
