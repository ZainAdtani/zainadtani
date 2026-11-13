/** Shared limits for public edge functions. In-memory only: each isolate keeps its own counts. */

const WINDOW_MS = 10 * 60 * 1000;
const buckets = new Map<string, number[]>();

export function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for") ?? "";
  const ip = fwd.split(",")[0]?.trim() || req.headers.get("cf-connecting-ip") || "unknown";
  return ip.slice(0, 80);
}

export function allowRequest(ip: string, limit: number): boolean {
  const now = Date.now();
  const prev = (buckets.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (prev.length >= limit) {
    buckets.set(ip, prev);
    return false;
  }
  prev.push(now);
  buckets.set(ip, prev);
  if (buckets.size > 1000) {
    const oldest = buckets.keys().next().value;
    if (oldest) buckets.delete(oldest);
  }
  return true;
}

const ALLOWED_ORIGIN =
  /^https:\/\/([a-z0-9-]+\.)*(zainadtani\.com|lovable\.app|lovable\.dev|lovableproject\.com)$/i;

export function corsHeaders(req: Request): Record<string, string> {
  const origin = req.headers.get("origin") ?? "";
  const local = /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);
  const allow = ALLOWED_ORIGIN.test(origin) || local ? origin : "https://zainadtani.com";
  return {
    "Access-Control-Allow-Origin": allow,
    Vary: "Origin",
    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };
}

export function json(body: unknown, status: number, cors: Record<string, string>): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...cors, "Content-Type": "application/json" },
  });
}
