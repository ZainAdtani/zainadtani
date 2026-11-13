import { test } from "node:test";
import assert from "node:assert/strict";
import { NEWSLETTER_NAME, newsletterSignupUrl, newsletterWithCadence } from "./newsletter.ts";

test("the newsletter name is The Z Letter", () => {
  assert.equal(NEWSLETTER_NAME, "The Z Letter");
  assert.equal(newsletterWithCadence(), "The Z Letter, every morning");
});

test("waitlist signup keeps the app name in the Beehiiv campaign tag", () => {
  const url = new URL(newsletterSignupUrl("a@b.com", { source: "zainadtani.com", medium: "app-waitlist", campaign: "zigest" }));
  assert.equal(url.searchParams.get("email"), "a@b.com");
  assert.equal(url.searchParams.get("utm_source"), "zainadtani.com");
  assert.equal(url.searchParams.get("utm_medium"), "app-waitlist");
  assert.equal(url.searchParams.get("utm_campaign"), "zigest");
  assert.equal(url.origin + url.pathname, "https://the-z-letter.beehiiv.com/subscribe");
});
