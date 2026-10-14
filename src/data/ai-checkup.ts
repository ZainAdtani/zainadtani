export const CHECKUP_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSd1K38E2erraV2c1j3rDqifAhbeVaVdANp4XKvt3l_bNWivdA/viewform";
export const PARTNER_CHECKOUT_URL = "https://buy.stripe.com/00wdR91yOazicr9aVna3u02";
export const PARTNER_PLAN = {
  monthlyPrice: 250,
  websitePages: 1,
  socialPosts: 4,
  reels: 1,
  graphics: 1,
  websiteUpdates: 2,
  googleProfileUpdates: 1,
  checkInMinutes: 30,
};
export const CHECKUP_DELIVERY_BUSINESS_DAYS = 1;

export const SAMPLE_REPORTS = [
  {
    grade: "B",
    business: "Epic Electrical",
    meta: "Electrician · North Richland Hills, TX",
    summary: "A perfect 5.0 Google reputation and a real, content-rich website, held back by a phone-only path to booking and no visible social presence.",
    scores: [
      { label: "Website & booking", value: 70, description: "Strong service content and a clear phone number, but no online booking or verified quote form. Every lead must make a call." },
      { label: "Google reviews", value: 92, description: "Perfect 5.0 stars across 113 Google reviews, shown live on their own site." },
      { label: "Social media", value: 25, description: "No Facebook or Instagram page could be verified. Only syndicated video and article content found." },
      { label: "AI search visibility", value: 80, description: "Complete Google profile with hours, services, photos, and an appointment action, plus directory and best electricians list presence." },
    ],
    gaps: [
      "There is no way to book or request a quote online. The phone is the only door in.",
      "No visible Facebook or Instagram, so happy customers have nowhere to tag, share, or follow them.",
      "At 113 reviews the count is still small next to big DFW shops. A steady review routine would widen the lead their 5.0 rating deserves.",
    ],
  },
  {
    grade: "B",
    business: "S.W.A.T. Plumbing LLC",
    meta: "Plumber · Aledo + Fort Worth, TX",
    summary: "The strongest visibility machine of the three, with online scheduling, 49 city pages, and 1,700+ reviews, held back by a 4.2-star rating that trails its size.",
    scores: [
      { label: "Website & booking", value: 90, description: "Polished site with online scheduling buttons, click-to-call everywhere, and a page for every town they serve." },
      { label: "Google reviews", value: 68, description: "Huge volume at 1,721+ reviews, but 4.2 stars sits below the 4.5+ range homeowners usually shortlist." },
      { label: "Social media", value: 45, description: "Facebook presence indicated. Instagram and posting activity not verified, quiet for a company this size." },
      { label: "AI search visibility", value: 85, description: "Two complete, recently updated Google profiles with 24-hour status and deep service and city coverage for AI answers to quote." },
    ],
    gaps: [
      "The 4.2-star rating is the weak spot. With this much volume, review replies and a rating recovery routine move the number fastest.",
      "Social media is a whisper for a company this loud everywhere else. No verified Instagram and no visible posting rhythm.",
      "Hours send mixed signals: office hours on the site, 24 hours on Google, 24/7 in the ads. One clear story everywhere would help people and AI search trust the listing.",
    ],
  },
  {
    grade: "B−",
    business: "Legacy Cakes",
    meta: "Bakery · Grapevine, TX",
    summary: "Loved and followed, with 4.8 stars and 11k+ Instagram followers, and a pretty website. But there is no way to order online, and the hours on the website and Google do not match.",
    scores: [
      { label: "Website & booking", value: 45, description: "Lovely photo gallery, but every order still starts with a phone call or an email. No ordering, preorder, or quote form." },
      { label: "Google reviews", value: 75, description: "A strong 4.8 stars, though 82 reviews is a modest count for a Main Street shop with this much social reach." },
      { label: "Social media", value: 80, description: "The biggest audience of the three: 11,471 on Instagram and 6,572 on Facebook, both linked from the website. Posting rhythm not verified." },
      { label: "AI search visibility", value: 60, description: "Google profile exists with photos, categories, and hours, but the hours disagree with the website, which weakens trust in the listing." },
    ],
    gaps: [
      "No online ordering or quote form. Every cake starts as a phone call, so after-hours shoppers bounce.",
      "The hours do not match: the website says open until 6 PM, Google says 5 PM. An easy fix that protects walk-ins.",
      "A big social audience with no bridge to buying. Posts cannot turn into orders because there is no preorder or inquiry link to send people to.",
    ],
  },
];