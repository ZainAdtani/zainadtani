## Plan: Header mobile menu, hide sidebar, expanded Resources

### Task 1 — `src/pages/Index.tsx`
Reduce hero spacing: change the hero outer wrapper from `pt-20 pb-0` to `pt-8 pb-0`, and the inner grid from `md:py-20` to `md:py-12`. No copy or layout structure changes.

### Task 2 — `src/components/Header.tsx`
Add a mobile hamburger menu.
- Add `useState` for `mobileOpen`.
- Add `Menu`, `X` to lucide imports.
- After the theme toggle (still inside the nav row), add a `md:hidden` icon button toggling `mobileOpen`, showing `Menu` or `X`.
- Below the inner container (still inside `<header>`), conditionally render a `md:hidden` dropdown panel with:
  - All `TOP_NAV` items as `<Link>`s (closing the menu on click).
  - LinkedIn, YouTube external links.
  - "Book a Free Call" Calendly CTA button (teal).
- Style matches brand tokens (`#0A0F1A`, `#0F2340`, `#1E3A5F`, `#00D4AA`, `#94A3B8`, `#F1F5F9`).

### Task 3 — `src/components/AppLayout.tsx`
Always hide the AppSidebar wrapper: replace `state === "collapsed" ? "hidden" : ""` with the constant `"hidden"`. Remove `useSidebar` if no longer needed (keep `state` removal). Change the secret Grip button's `onClick` to a no-op (`() => {}`) since the sidebar is fully hidden. Sidebar files remain untouched.

### Task 4 — `src/pages/Resources.tsx` (rewrite)
Three tabs with state `"business" | "library" | "notes"`, default `"business"`.

Tab pills row centered, brand styling per spec.

**Tab 1 — For Business:** Existing 11-item `PROMPTS` array + `CopyBlock` cards grid + footer CTA "Want me to build these into your workflow?" with button → `/services`. Unchanged from current.

**Tab 2 — Prompt Library:**
- Import `AI_PROMPTS` from `@/data/ai_prompts`.
- Inline a local `CUSTOM_INSTRUCTIONS` constant (copied from `src/pages/AIPrompts.tsx`) so we don't depend on a default-exported page.
- Custom Instructions card at top: dark `#0F2340` bg, `#1E3A5F` border, rounded-2xl, p-6. Header with title + `CopyBlock`. Subtext line. Scrollable `<pre>` (max-h-48, overflow-y-auto, mono, `#0A0F1A` bg).
- Search `Input` with `Search` lucide icon (controlled `q` state).
- Category pills row: `All`, `Coaching`, `Productivity`, `Learning`, `Email`, `Delegation`, `Automation` (controlled `selectedCategory` state, `""` = all). Active = teal bg; inactive = dark with `#1E3A5F` border.
- "X prompts found" muted count.
- 2-col grid (1 on mobile) of prompt cards: category badge (color-mapped), title, optional italic note, monospace prompt block with max-h-32 + Expand/Collapse toggle (per-card expanded state set), `CopyBlock` button.
- Filter logic: title + prompt + tags + category match `q`; category filter when not "All".

**Tab 3 — Life Notes:** Render `<LifeNotes />` directly (already imported).

Page footer block (below tabs): "More tools coming soon. Have a prompt to share? [email link in teal]".

### Task 5 — `src/data/nav.ts`
Remove the `Life Notes` entry from `NAV_ITEMS`. Keep only `AI Prompts`. `/life-notes` route and page file remain.

### Files touched
- `src/pages/Index.tsx`
- `src/components/Header.tsx`
- `src/components/AppLayout.tsx`
- `src/pages/Resources.tsx`
- `src/data/nav.ts`

No routes deleted. No page files deleted. Sidebar files retained but hidden.