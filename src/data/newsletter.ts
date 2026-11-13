/**
 * The newsletter's public name. Change this string to rename it everywhere.
 * Cadence stays "every morning" unless Zain says otherwise.
 */
export const NEWSLETTER_NAME = "The Z Letter";
export const NEWSLETTER_CADENCE = "every morning";

export const NEWSLETTER_HOST = "https://the-z-letter.beehiiv.com";
export const NEWSLETTER_SUBSCRIBE_URL = `${NEWSLETTER_HOST}/subscribe`;
export const NEWSLETTER_MAGIC_URL = "https://magic.beehiiv.com/v1/dd1643e2-f274-43e4-b193-62276e3e3b48";
export const NEWSLETTER_RSS_URL = "https://rss.beehiiv.com/feeds/jHsdvEe1Hm.xml";

/** "The Z Letter, every morning" */
export function newsletterWithCadence(): string {
  return `${NEWSLETTER_NAME}, ${NEWSLETTER_CADENCE}`;
}

export type NewsletterTag = {
  source?: string;
  medium?: string;
  campaign?: string;
};

function withTag(base: string, email: string | undefined, tag?: NewsletterTag): string {
  const url = new URL(base);
  if (email) url.searchParams.set("email", email);
  if (tag?.source) url.searchParams.set("utm_source", tag.source);
  if (tag?.medium) url.searchParams.set("utm_medium", tag.medium);
  if (tag?.campaign) url.searchParams.set("utm_campaign", tag.campaign);
  return url.toString();
}

/** Same signup the homepage uses: Beehiiv magic link, then the subscribe page if the new tab is blocked. */
export function openNewsletterSignup(email: string, tag?: NewsletterTag): "ok" | "fallback" {
  const magic = withTag(NEWSLETTER_MAGIC_URL, email, tag);
  const win = window.open(magic, "_blank", "noopener,noreferrer");
  if (!win) {
    window.location.href = withTag(NEWSLETTER_SUBSCRIBE_URL, email, tag);
    return "fallback";
  }
  return "ok";
}

export function newsletterSignupUrl(email: string | undefined, tag?: NewsletterTag): string {
  return withTag(NEWSLETTER_SUBSCRIBE_URL, email, tag);
}
