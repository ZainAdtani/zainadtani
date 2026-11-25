import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { PAY_LINKS, SPEED_SLUG, payCheckoutUrl } from "./payLinks.ts";

const root = new URL("../../", import.meta.url);
const read = (path: string) => readFileSync(new URL(path, root), "utf8");

test("every pay slug has one Stripe checkout and /speed uses speed-to-lead", () => {
  assert.equal(Object.keys(PAY_LINKS).length, 19);
  assert.equal(SPEED_SLUG, "speed-to-lead");
  for (const [slug, url] of Object.entries(PAY_LINKS)) {
    assert.match(url, /^https:\/\/buy\.stripe\.com\/[A-Za-z0-9]+$/);
    assert.equal(payCheckoutUrl(slug), url);
  }
  assert.equal(payCheckoutUrl("speed-to-lead"), PAY_LINKS["speed-to-lead"]);
  assert.equal(payCheckoutUrl("nope"), null);
  assert.equal(payCheckoutUrl(undefined), null);
});

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

test("public/_redirects matches the pay config, including /speed", () => {
  const redirects = read("public/_redirects");
  assert.match(redirects, new RegExp(`^/speed\\s+${escapeRegExp(PAY_LINKS[SPEED_SLUG])}\\s+302$`, "m"));
  for (const [slug, url] of Object.entries(PAY_LINKS)) {
    assert.match(redirects, new RegExp(`^/pay/${slug}\\s+${escapeRegExp(url)}\\s+302$`, "m"));
  }
});

test("pay routes stay out of the nav and the sitemap", () => {
  const header = read("src/components/Header.tsx");
  const footer = read("src/components/AppLayout.tsx");
  const sitemap = read("public/sitemap.xml");
  const app = read("src/App.tsx");
  assert.doesNotMatch(header, /\/pay\//);
  assert.doesNotMatch(footer, /\/pay\//);
  assert.doesNotMatch(sitemap, /\/pay\//);
  assert.match(app, /path="\/pay\/:slug"/);
  assert.match(app, /path="\/speed"/);
});
