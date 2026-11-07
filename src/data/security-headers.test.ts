import { describe, it as test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// Guards the CSP so the _headers file and the build-time <meta> tag stay in sync
// and the Supabase host the report form needs stays allowed.
const headers = readFileSync(new URL("../../public/_headers", import.meta.url), "utf8");
const vite = readFileSync(new URL("../../vite.config.ts", import.meta.url), "utf8");
const env = readFileSync(new URL("../../.env", import.meta.url), "utf8");

describe("security headers", () => {
  test("_headers sets CSP with frame-ancestors locked to self and the Lovable editor", () => {
    const csp = headers.split("\n").find((l) => l.trim().startsWith("Content-Security-Policy:")) ?? "";
    assert.match(csp, /frame-ancestors 'self' https:\/\/lovable\.dev https:\/\/\*\.lovable\.dev;/);
    assert.match(csp, /object-src 'none'/);
    assert.match(csp, /script-src 'self';/);
  });
  test("both CSPs allow the Supabase project the form posts to", () => {
    const url = /VITE_SUPABASE_URL="([^"]+)"/.exec(env)?.[1] ?? "";
    const host = new URL(url).host;
    assert.ok(headers.includes(`https://${host}`), "missing in _headers");
    assert.ok(vite.includes(`SUPABASE_HOST = "${host}"`), "missing in vite.config.ts");
  });
  test(".env holds only public values, never a service role key", () => {
    assert.doesNotMatch(env, /SERVICE_ROLE|SECRET/i);
    const key = /VITE_SUPABASE_PUBLISHABLE_KEY="([^"]+)"/.exec(env)?.[1] ?? "";
    const payload = JSON.parse(Buffer.from(key.split(".")[1], "base64url").toString());
    assert.equal(payload.role, "anon");
  });
});
