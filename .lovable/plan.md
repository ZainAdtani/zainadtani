# Read-Only Project Audit — zainadtani.com

No code changes made. This is a file-based map of the project as it exists today, plus flagged risks.

## Access
Repository confirmed readable. Build is clean (no entries in build-errors.log from last check).

## Key files by concern

**Homepage** — `src/pages/Index.tsx` (765 lines)
- Single-component page. Sections: TimeBar → Hero (HeroBlock w/ headshot) → ZAP REST featured book → services/pillars → newsletter → connect → final CTA.
- Helmet sets title/meta/canonical. Hero is a plain section (`pt-8 pb-12`), NOT full-viewport height.
- `HeroLogo3D` is React `lazy()` loaded (line 14) — needs a `<Suspense>` boundary; worth verifying it has one, otherwise hero can pop in late.

**Global styles** — `src/index.css`
- Single locked Dark Nova theme: `--background: 222 44% 7%` (#0A0F1A), primary #447BBE, CTA #DD5013, warm #E9E4A6.
- Fonts: Luckiest Guy (h1/h2), Plus Jakarta Sans (h3–h6), DM Sans (body), JetBrains Mono (code). Font import at top of file.
- **Risk:** global `* { transition ... !important }` rule (lines 3–16) forces transitions on every element — can fight animation libraries and cause visual glitches; must be preserved as-is unless deliberately refactored.

**Theme mismatch (latent bug)** — `src/main.tsx`
- Still wraps the app in `next-themes` `ThemeProvider` with `themes={["spidey", "hay"]}`, `defaultTheme="spidey"`, even though the toggle UI was removed from Header and index.css is now single-theme. Harmless today but dead config; removal must be coordinated if ever cleaned up.

**Header / navigation** — `src/components/Header.tsx`
- Sticky header, TOP_NAV: Home, Services, Connect, Books, Resources. Social icons: LinkedIn (personal + company), Instagram, YouTube, Z Letter (Mail). Calendly "Book a Call" button. Mobile hamburger menu mirrors nav + socials.

**Footer / layout** — `src/components/AppLayout.tsx`
- Gradient divider, animated Z logo, copyright + licensing line, FOOTER_NAV (Home/Services/Books/Resources), FOOTER_SOCIALS (LinkedIn, YouTube, Z Letter, Instagram, Calendly).
- Renders `ReadingProgressBar`, `BackToTop`, and `AIChatWidget` globally. `AppSidebar` exists but is wrapped in `hidden` (dead).
- **Legal disclosure:** footer line 96 — "Licensed Financial Educator · NPN 20207668". Preserve exactly.

**Routes** — `src/App.tsx`
- All routes inside AppLayout except `/kdp-copilot` (standalone, hidden, no nav/footer).
- Live routes: `/`, `/about`, `/investing` (+`/resources/investing`), `/lab`, `/digital-products`, `/tools`, `/books`, `/projects` (+`/projects/ai-songs`), `/resources`, `/ai-prompts`, `/life-notes`, `/services`, `/connect`, `/prompts`, `/harry-potter`, `/pokedex`, `/resources/label-iq`, `/family-protection-gap`, `/roth-ira-game`, catch-all NotFound.

**Scroll / reveal behavior**
- `src/components/ScrollReveal.tsx` — IntersectionObserver, elements start `opacity: 0; translateY(30px)` and reveal at 10% threshold, once.
- **Primary suspect for giant blank vertical gaps:** any ScrollReveal-wrapped section that never intersects (JS error, observer not firing inside nested scroll container, or a runtime error above it) stays invisible forever — the space is reserved but the content is transparent. 8 ScrollReveal blocks on Index alone.
- Secondary suspects: `animate-fade-in` keyed route wrapper in AppLayout (re-mounts per route), lazy `HeroLogo3D` without a sized fallback (layout shift / blank hero), `ZLetterFeed` RSS fetch failing silently (placeholder cards), and `ReadingProgressBar` fixed positioning.

**Chat feature** — `src/components/AIChatWidget.tsx`
- Floating bubble bottom-right, opens full-screen on mobile / 400×540 panel on desktop. Calls edge function `zain-chat` at `${VITE_SUPABASE_URL}/functions/v1/zain-chat` with anon key header. 20-message session cap via sessionStorage. Function source: `supabase/functions/zain-chat/index.ts`.
- Also `supabase/functions/claude-proxy/index.ts` backs `/kdp-copilot`.

**Books / resources data**
- `src/data/books.ts` (1645 lines) — book catalog; helpers in `src/lib/books-*.ts`, covers in `src/lib/covers.ts` + `public/book-covers/`.
- `src/data/resources.ts`, `src/data/ai_prompts.ts`, `src/data/life_notes.ts`, `src/data/newsletters.ts`, `src/data/podcasts.ts`, `src/data/products.ts` (ZAP REST $9.99), `src/data/projects.ts`, `src/data/quotes.ts`, `src/data/resumeData.ts`, `src/data/roleModels.ts`, `src/data/nav.ts`.

**Calendly links** — `https://calendly.com/zkadtani` in: Header, AppLayout (footer), Index, Connect, Services, About, LabelIQ, KDPCopilot, FamilyProtectionGap. Consistent, single destination.

**Beehiiv links** — `https://the-z-letter.beehiiv.com` (+`/subscribe`) in: Header, AppLayout, Index, Connect, About, LabelIQ, ZLetterFeed. ZLetterFeed parses the Beehiiv RSS with fallback placeholder cards.

**Legal / financial disclosures (preserve verbatim)**
- `AppLayout.tsx:96` — NPN 20207668 footer line.
- `Connect.tsx:330` — "Licensed Financial Professional · TX Life #2787686".
- `Connect.tsx:54,86,92` — licensed agent / income-opportunity copy.
- `InvestingStack.tsx:232` — "not financial advice" disclaimer.
- `FamilyProtectionGap.tsx:58` — licensed agent / educational-only line.

## Risky areas to preserve
1. All licensing/NPN/TX Life disclosure lines above — compliance-critical.
2. `/kdp-copilot` must stay OUTSIDE AppLayout and out of all nav/sitemap.
3. Locked brand hexes (#0A0F1A, #447BBE, #DD5013, #D97706, #E9E4A6) — many are hardcoded inline in pages, not just tokens.
4. The global `* { transition !important }` rule — risky to remove wholesale; components may depend on it.
5. `leads` table RLS (public INSERT, no SELECT) — memory-flagged; no client reads allowed.
6. Auto-generated files: `src/integrations/supabase/*`, `.env`, `supabase/config.toml`.

## Likely causes of giant blank gaps (ranked)
1. **ScrollReveal stuck at opacity 0** — sections reserve full height but never reveal if the observer doesn't fire (JS error earlier on the page, or observer edge cases in the nested `main.overflow-auto` scroll container).
2. **Lazy HeroLogo3D** — if its chunk fails or has no fixed-size Suspense fallback, the hero area renders blank/shifted.
3. **ZLetterFeed RSS failure** — section can render empty if fetch + fallback both fail.
4. **Per-route `animate-fade-in` remount** — combined with ScrollReveal, sections re-animate from invisible on every navigation.

## Suggested next step (if approved later)
Diagnose gaps live: load the homepage in the preview browser, check for stuck `opacity: 0` sections and console errors, then fix the root cause (e.g. ScrollReveal fallback timeout or Suspense sizing) — no redesign.
