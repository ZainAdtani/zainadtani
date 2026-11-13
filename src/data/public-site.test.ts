import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const root = new URL("../../", import.meta.url);
const read = (path: string) => readFileSync(new URL(path, root), "utf8");

test("sitemap only lists real pages, including each life note", () => {
  const sitemap = read("public/sitemap.xml");
  const app = read("src/App.tsx");
  const routes = new Set([...app.matchAll(/path="([^"]+)"/g)].map((m) => m[1]));
  const locs = [...sitemap.matchAll(/<loc>https:\/\/zainadtani\.com([^<]*)<\/loc>/g)].map((m) => m[1] || "/");
  assert.ok(locs.includes("/lifenotes"));
  for (let n = 1; n <= 15; n++) assert.ok(locs.includes(`/lifenotes/${n}`), `missing note ${n}`);
  for (const loc of locs) {
    const path = loc === "/" ? "/" : loc;
    const ok = routes.has(path) || /^\/lifenotes\/\d+$/.test(path);
    assert.ok(ok, `sitemap URL is not a route: ${path}`);
  }
  assert.doesNotMatch(sitemap, /\/archive</);
  assert.doesNotMatch(sitemap, /\/projects\/pokedex</);
  assert.doesNotMatch(sitemap, /\/projects\/harry-potter-world</);
  assert.doesNotMatch(sitemap, /thezletter/);
});

test("chat prompt uses the real newsletter host", () => {
  const chat = read("supabase/functions/zain-chat/index.ts");
  assert.match(chat, /https:\/\/the-z-letter\.beehiiv\.com/);
  assert.doesNotMatch(chat, /thezletter\.beehiiv\.com/);
  assert.match(chat, /\$18\.99/);
  assert.match(chat, /\$250 per month/);
});

test("claude proxy does not accept an arbitrary model", () => {
  const proxy = read("supabase/functions/claude-proxy/index.ts");
  assert.match(proxy, /ALLOWED_MODEL = "claude-sonnet-4-5"/);
  assert.match(proxy, /model !== ALLOWED_MODEL/);
});
