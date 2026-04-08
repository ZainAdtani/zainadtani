

## Plan: Integrate "The Z Letter" Newsletter (Beehiiv) into the Homepage

### Overview

Three additions to `src/pages/Index.tsx` plus one new helper component, all following the native-first design philosophy — no pop-ups, no overlays.

---

### 1. Subtle Hero Pill (below subheadline, line ~238)

Insert a small pill link between the subheadline and the CTA buttons:

```
Read the latest issue of The Z Letter →
```

- Styled as a small inline link with `text-sm text-muted-foreground hover:text-primary` and a subtle arrow
- Links to `#z-letter` (the RSS section further down the page) using smooth scroll

**Edit location:** `src/pages/Index.tsx`, insert after line 238, before the CTA buttons div.

---

### 2. "Latest from The Z Letter" RSS Feed Section

A new section placed after the "About Zain" block and before the "How I Help" / tabs section.

- **Title:** "Latest from The Z Letter"
- **Function:** Fetches `https://rss.beehiiv.com/feeds/jHsdvEe1Hm.xml` client-side, parses XML, displays the 3 most recent post titles and dates
- **Layout:** 3-column grid (`grid-cols-1 md:grid-cols-3`), minimalist cards
- **Accent:** Signal Blue (`hsl(217 91% 60%)` — the existing `secondary` color in dark mode) as left border on each card
- **Each card:** Post title (bold, `font-display`), date (muted, small), and "Read →" link opening the Beehiiv post in a new tab
- **Fallback:** If fetch fails or loading, show skeleton placeholders
- **ID:** `id="z-letter"` so the hero pill can scroll to it

**New file:** `src/components/ZLetterFeed.tsx` — handles fetch, XML parse, and render. Uses `useEffect` + `useState`, parses RSS XML with `DOMParser` (built-in browser API, no dependencies needed).

**Edit:** `src/pages/Index.tsx` — import and place `<ZLetterFeed />` wrapped in `<ScrollReveal>`.

---

### 3. High-Value Opt-in Footer Cap

A full-width section inserted just above the "Resources I Use" section (before line 615).

- **Background:** `bg-card` with subtle border-top, low contrast
- **Copy:** "I send one email every Sunday morning. It's designed to help you master AI, build smarter products, and think more clearly. Join Zain and other builders."
- **Input:** Single email field + "Join" button, inline on desktop, stacked on mobile
- **Action:** The form submits to Beehiiv's public subscription endpoint (`https://embeds.beehiiv.com/...`) or opens the Beehiiv subscribe page. Since Beehiiv doesn't offer a simple POST API without embedding their form, the "Join" button will open `https://thezletter.beehiiv.com/subscribe` in a new tab with the email pre-filled as a query param, OR we embed a hidden Beehiiv form. I'll use the direct link approach for cleanest integration.
- **Typography:** Headline in `font-display font-bold`, body in default `font-sans`, generous padding (`py-16`)

**Edit:** `src/pages/Index.tsx` — insert section before "Resources I Use."

---

### 4. Design Constraints

- **No new colors** — uses existing `primary` (Electric Teal) and `secondary` (Signal Blue) tokens
- **No pop-ups or overlays** — everything inline
- **Typography:** `font-display` for headings, `font-sans` for body (already Plus Jakarta Sans / DM Sans)
- **White space:** Generous padding on all new sections

### Files Changed

1. **New:** `src/components/ZLetterFeed.tsx` — RSS fetch + card grid component (~60 lines)
2. **Edit:** `src/pages/Index.tsx` — 3 insertions (hero pill, RSS section, footer opt-in)

