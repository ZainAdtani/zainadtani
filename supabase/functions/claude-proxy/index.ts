import { allowRequest, clientIp, corsHeaders, json } from "../_shared/guard.ts";

/** The only model the KDP page calls. Anything else is rejected. */
const ALLOWED_MODEL = "claude-sonnet-4-5";
const MAX_TOKENS = 2000;
const MAX_MESSAGES = 4;
const MAX_CHARS = 20000;

type AnthropicMessage = { role: "user" | "assistant"; content: string };

function sanitizeMessages(input: unknown): AnthropicMessage[] | null {
  if (!Array.isArray(input) || input.length === 0 || input.length > MAX_MESSAGES) return null;
  const out: AnthropicMessage[] = [];
  for (const item of input) {
    if (!item || typeof item !== "object") return null;
    const role = (item as { role?: unknown }).role;
    const content = (item as { content?: unknown }).content;
    if (role !== "user" && role !== "assistant") return null;
    if (typeof content !== "string") return null;
    const trimmed = content.trim();
    if (!trimmed || trimmed.length > MAX_CHARS) return null;
    out.push({ role, content: trimmed });
  }
  return out;
}

Deno.serve(async (req: Request) => {
  const cors = corsHeaders(req);
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: cors });
  }
  if (req.method !== "POST") {
    return json({ error: "Method not allowed" }, 405, cors);
  }
  if (!allowRequest(clientIp(req), 12)) {
    return json({ error: "Too many requests. Please try again in a few minutes." }, 429, cors);
  }

  try {
    const apiKey = Deno.env.get("ANTHROPIC_API_KEY");
    if (!apiKey) {
      return json({ error: "Writing assistant is not configured yet." }, 500, cors);
    }

    const body = await req.json();
    const messages = sanitizeMessages(body?.messages);
    const model = body?.model;
    const maxTokens = body?.max_tokens;
    if (!messages || model !== ALLOWED_MODEL || typeof maxTokens !== "number" || !Number.isFinite(maxTokens)) {
      return json(
        { error: "Invalid body. Expected a short messages array, the site model, and max_tokens." },
        400,
        cors,
      );
    }

    const upstream = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: ALLOWED_MODEL,
        max_tokens: Math.min(MAX_TOKENS, Math.max(1, Math.floor(maxTokens))),
        messages,
      }),
    });

    if (!upstream.ok) {
      console.error("claude-proxy upstream status", upstream.status);
      return json({ error: "The writing assistant could not answer. Try again later." }, upstream.status, cors);
    }

    const text = await upstream.text();
    return new Response(text, {
      status: 200,
      headers: { ...cors, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("claude-proxy error:", e instanceof Error ? e.name : "unknown");
    return json({ error: "Something went wrong." }, 500, cors);
  }
});
