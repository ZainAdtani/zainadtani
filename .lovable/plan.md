## Plan: Phased Site Update — Nav, Z Hub, Polish, AI Chat

Implementing all 5 phases. Using Lovable AI (no Anthropic key needed), public Z Hub, client-side chat cap.

---

### Phase 1: Navigation Restructure

**`src/components/Header.tsx`** — Trim `TOP_NAV` to: Home, Services, Books, Products (path `/digital-products`). About and Investing stay in the project but leave the desktop top nav. Mobile sheet still surfaces all sidebar items.

**`src/components/AppLayout.tsx`** — Replace the current minimal footer with a 3-column responsive grid (stacks on mobile):
- Col 1 "Navigate": Home, Services, Books, Products
- Col 2 "Connect": LinkedIn, YouTube, The Z Letter (Beehiiv subscribe), Email (mailto)
- Col 3 "More": About, Book a Call (Calendly)

Below columns: copyright "© 2026 Zain Adtani. All rights reserved." with a 24px circular teal button at the far right (white "Z", links to `/z-hub`). Keep the existing "Buy me a coffee" line as a small note above the copyright.

All external links open in new tab with `rel="noopener noreferrer"`.

---

### Phase 2: `/z-hub` Page

**New file `src/pages/ZHub.tsx`** + route in `src/App.tsx` (above catch-all). Not added to nav data.

Layout: dark bg, max-w-[900px] centered, `py-20`.
- Title "Z Hub" with teal gradient underline; subtitle line.
- **Section 1 "Quick Links"** — 3-col grid (1 on mobile) of cards: Fidelity, Robinhood, Marcus Savings (placeholder `#` URLs with comment to fill in), Notion, Google Drive, Beehiiv Dashboard. Each card uses a relevant lucide icon (TrendingUp, LineChart, PiggyBank, FileText, HardDrive, Mail), label below, teal-glow hover border.
- **Section 2 "Projects & Fun"** — Same card grid linking to `/ai-prompts`, `/life-notes`, `/tools`, `/projects` (the existing Fun Projects route — note: code calls it `/projects`, not `/fun-projects`).

Reuses existing Card component hover styling.

---

### Phase 3: Home Page Polish (`src/pages/Index.tsx` + `src/index.css`)

1. Hero entrance: add `animate-fade-in` to headline, second line with 200ms delay (inline style or new utility class).
2. CTA buttons: wrap in a div with animated teal→blue gradient border (CSS `@keyframes gradient-shift` on `background-position`), hover scale 1.02 + teal glow shadow. Existing button content untouched.
3. Service cards already have hover lift via `Card` component — verify and tighten to `-translate-y-1` with teal shadow on hover.
4. Below CTAs add muted line: "Helping businesses and creators across DFW and beyond."
5. Z Letter section: prepend a small pulsing teal dot (`animate-pulse`) next to "One email every Sunday".
6. Add `scroll-behavior: smooth` to `html` in `src/index.css` (if not already set).

---

### Phase 4: AI Chat Widget

**New `src/components/AIChatWidget.tsx`** mounted in `AppLayout` (renders on every route).
- 56px teal floating button bottom-right (above BackToTop's bottom-left, no conflict).
- Click → expands to 400×500 panel (full-screen on mobile).
- Header "Ask me anything about Zain's work" + close X.
- Message list with right-aligned teal user bubbles, left-aligned dark gray assistant bubbles, typing indicator (3 bouncing dots).
- Input + send button. Disabled after 20 messages with friendly note.
- Session counter in `sessionStorage` key `zain_chat_count`.
- On API error: show "Sorry, I am having trouble connecting. Please email zkadtani@gmail.com instead."

**New edge function `supabase/functions/zain-chat/index.ts`**:
- POST with `{ messages: [...] }`.
- Calls Lovable AI Gateway (`https://ai.gateway.lovable.dev/v1/chat/completions`) with model `google/gemini-3-flash-preview`, streams SSE back.
- System prompt = the exact prompt you provided.
- Handles 429 / 402 with proper status codes and CORS headers.
- Uses `LOVABLE_API_KEY` (already configured).

Frontend uses the streaming SSE pattern (token-by-token rendering).

---

### Phase 5: Micro-animations & Polish

1. Scroll-triggered fades — already exist via `ScrollReveal` component. Audit homepage sections and wrap any unwrapped major sections.
2. Page transitions — already implemented in `AppLayout` (`animate-fade-in` keyed on pathname). No change needed.
3. Pikachu — untouched.
4. Header glassmorphism — already has `bg-background/80 backdrop-blur-md`. Add a subtle scroll-based class boost (slightly darker + stronger blur after 20px scroll) using a `useEffect` scroll listener.
5. External links — audit and add `target="_blank" rel="noopener noreferrer"` where missing in new footer + Z Hub.
6. Add a 2px teal→blue gradient line at the very top of every page. Inject in `AppLayout` above the Header as `<div className="h-0.5 w-full bg-gradient-to-r from-primary via-secondary to-primary" />`.

---

### Files Changed
1. `src/components/Header.tsx` — trim top nav, add scroll-state class
2. `src/components/AppLayout.tsx` — new footer, top gradient line, mount AIChatWidget
3. `src/App.tsx` — add `/z-hub` route
4. `src/pages/ZHub.tsx` — new page
5. `src/pages/Index.tsx` — hero animation classes, CTA gradient wrapper, social proof line, pulsing dot
6. `src/index.css` — `@keyframes gradient-shift`, smooth scroll, hero entrance utility
7. `src/components/AIChatWidget.tsx` — new floating chat
8. `supabase/functions/zain-chat/index.ts` — new edge function (Lovable AI, streaming)

### What I will NOT touch
- About, Investing, AI Prompts, Life Notes, Tools, Fun Projects (Pikachu) page contents
- Sidebar data structure
- Any existing brand tokens, fonts, or section spacing standards
- Books / Digital Products pages
