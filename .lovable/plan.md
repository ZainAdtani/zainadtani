## Plan: Two targeted changes

### 1. `src/pages/Resources.tsx` — Add "Train My AI Assistant" featured card

- Add a new top-level constant `TRAIN_MY_AI_PROMPT` (multiline template string with the full assistant-training prompt) above the existing `PROMPTS` array.
- Inside the Tab 1 ("For Business") render block, insert the featured card markup **above** the existing `grid grid-cols-1 md:grid-cols-2 gap-6` of 11 prompt cards.
- Card: gradient `from-[#0F2340] to-[#0A0F1A]`, teal border, `rounded-3xl`, with a "⭐ START HERE" pill, headline `"Train My AI Assistant"`, subhead, a `<CopyBlock text={TRAIN_MY_AI_PROMPT} label="Copy Full Prompt" />`, and a scrollable `max-h-64` mono prompt block.
- No changes to Tab 2 (Prompt Library), Tab 3 (Life Notes), tabs row, hero, or page footer.

### 2. `src/pages/Services.tsx` — Full redesign

Fully replace the file body, keeping `<Helmet><title>Services | Zain Adtani</title></Helmet>` (and a meta description).

Five sections, all on dark brand backgrounds (`#0A0F1A` / `#070C14` / `#0F2340`) with `border-[#1E3A5F]` dividers:

1. **Hero** — "REAL WORK. REAL RESULTS." pill, "Let's Build Something Real." headline (teal accent), subhead, teal Calendly CTA, "No pitch. No pressure." line.
2. **Service 01 — AI Websites** — 2-col grid: left text + 6-bullet checklist + "Get Started →" CTA; right column with 4 feature cards (Fast Delivery, Mobile First, Built with AI, You Own It).
3. **Service 02 — Publish Your Book** — 2-col grid with reversed order on desktop (cards left, text right): 4 feature cards (Writing Support, Professional Formatting, Amazon Launch, Audiobook Ready) and 6-bullet checklist + "Start Your Book →" CTA.
4. **Service 03 — AI Workflow Consulting** — 2-col grid: left text + 5-bullet checklist + "Book a Workflow Audit →" CTA; right 4 feature cards (Audit First, Built Around Claude, You Get the Playbook, Follow-Up Included).
5. **"Not sure" strip** — `#0F2340` band with headline + subhead + teal "Schedule a Free Call →" CTA.

All CTAs link to `https://calendly.com/zkadtani` (`target="_blank" rel="noopener noreferrer"`). Typography: `font-display` for headlines, `font-sans` for body. Remove the old `services` array, `Card` import, and the previous structure entirely.

### Files touched
- `src/pages/Resources.tsx`
- `src/pages/Services.tsx`

No other files, routes, or components are modified.
