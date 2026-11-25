/**
 * Short checkout links. Add a slug here and the router plus public/_redirects
 * both pick it up. /speed is the only alias, and it uses the same Stripe page
 * as speed-to-lead.
 */
export const PAY_LINKS = {
  "speed-to-lead": "https://buy.stripe.com/aFa14n1yObDmaj1aVna3u0l",
  "visibility-annual": "https://buy.stripe.com/5kQcN5cdsdLu62L0gJa3u0k",
  "permit-alerts": "https://buy.stripe.com/28E4gz5P4bDmcr92oRa3u0j",
  "staging-rush": "https://buy.stripe.com/00w3cv1yO9ve8aT9Rja3u0i",
  "visibility-setup": "https://buy.stripe.com/bJe5kDfpE0YI62L2oRa3u0h",
  "staging-listing": "https://buy.stripe.com/cNi5kDgtIfTC76PaVna3u0g",
  "staging-photo": "https://buy.stripe.com/fZueVddhw22M4YH0gJa3u0f",
  "contractor-presence": "https://buy.stripe.com/28EcN53GWePy4YH0gJa3u0e",
  "visibility-trial": "https://buy.stripe.com/aFa6oH1yOdLu3UD9Rja3u0d",
  "missed-call": "https://buy.stripe.com/00w4gzelA8raaj10gJa3u0c",
  "agent-pin": "https://buy.stripe.com/5kQ14nb9o7n6aj10gJa3u0a",
  "agent-job": "https://buy.stripe.com/bJe4gzb9o5eY0Ir2oRa3u09",
  "trades-pin": "https://buy.stripe.com/aFa28rcds22Mezh5B3a3u08",
  "trades-job": "https://buy.stripe.com/6oU28r91g9vefDlaVna3u07",
  "ai-assessment": "https://buy.stripe.com/14AdR9fpEbDm4YHe7za3u05",
  "voice-care": "https://buy.stripe.com/3cIaEXelA22Mcr9bZra3u04",
  "voice-build": "https://buy.stripe.com/4gMaEX91g0YI3UD7Jba3u03",
  "visibility-partner": "https://buy.stripe.com/00wdR91yOazicr9aVna3u02",
  jumpstart: "https://buy.stripe.com/8x27sLelAcHq76PfbDa3u01",
} as const;

export type PaySlug = keyof typeof PAY_LINKS;

/** /speed skips the longer /pay/speed-to-lead path and opens the same checkout. */
export const SPEED_SLUG: PaySlug = "speed-to-lead";

export function payCheckoutUrl(slug: string | undefined): string | null {
  if (!slug || !(slug in PAY_LINKS)) return null;
  return PAY_LINKS[slug as PaySlug];
}
