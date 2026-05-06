## Plan: Footer LLC + /prompts Page + Homepage Link

### Task 1 — Footer LLC line
**File:** `src/components/AppLayout.tsx`
- Replace the existing copyright `<p>` text with: `© 2026 Zain Adtani · Adtani Education Ventures LLC · DFW, Texas`
- Keep existing `text-xs text-muted-foreground` classes — no style changes.

### Task 2 — New `/prompts` page "AI Starter Prompts"

**New file:** `src/pages/Prompts.tsx`
- Hero: H1 "10 Prompts That Will Change How You Work" (Plus Jakarta Sans via existing global heading styles), subtext "Steal these. Use them today. No signup required." (DM Sans body).
- Below hero: responsive grid `grid-cols-1 md:grid-cols-2 gap-6` of 11 cards (10 + bonus card 11).
- Each card (use existing `Card` component for consistent hover lift/teal glow already defined):
  - Number badge (circular, teal bg, white number) top-left
  - Short title (semibold)
  - `<pre><code>` block with prompt text — `font-mono text-sm bg-[#0A0A0F] border border-primary/40 rounded-md p-4 whitespace-pre-wrap`
  - Reuse existing `CopyBlock` component (`src/components/CopyBlock.tsx`) for the Copy button — already toggles to "Copied!" for 2s. Will pass label="Copy" and the prompt text.
- Footer CTA section: text "Want me to build these into your workflow?" + Button link "→ Work With Me on AI" routing to `/services`.
- Wrap in standard page container (`container mx-auto px-4 max-w-6xl py-20`).

**Routing:** `src/App.tsx` — add `<Route path="/prompts" element={<Prompts />} />` above the catch-all, plus the import.

**Navbar:** `src/components/Header.tsx` — add `{ label: "Resources", path: "/prompts" }` in `TOP_NAV` between Books and Products.

**Footer nav:** `src/components/AppLayout.tsx` — add `{ label: "Resources", to: "/prompts" }` to `FOOTER_NAV` between Books and Products (keeps nav consistent).

### Task 3 — Homepage link in Digital Products section
**File:** `src/pages/Index.tsx`
- Locate the Digital Products section header on the homepage and insert directly below it:
  ```tsx
  <Link to="/prompts" className="text-sm text-primary hover:underline">
    → Free: Grab my AI Starter Prompts
  </Link>
  ```
- Uses Electric Teal via `text-primary` token (already #00D4AA), DM Sans is the global body font.

### Files touched
- `src/components/AppLayout.tsx` (footer copyright + footer nav)
- `src/components/Header.tsx` (navbar TOP_NAV)
- `src/App.tsx` (route + import)
- `src/pages/Prompts.tsx` (new)
- `src/pages/Index.tsx` (digital products section link)

No existing pages, components, copy, or structure are removed or otherwise altered.
