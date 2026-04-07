

## Plan: Sidebar Rename, Hero Redesign, Light/Dark Mode Fix, SEO

### CHANGE 1: Sidebar — Rename "Archive" to "Fun Projects"

**Files to edit:**
- `src/components/AppSidebar.tsx` — Change the label "Archive" to "Fun Projects" (line 173). Update localStorage key from `sidebar-archive-open` to `sidebar-funprojects-open` (lines 46, 56).
- `src/components/Header.tsx` — Change the mobile sheet collapsible label from "Archive" to "Fun Projects" (line 103).

No changes to `src/data/nav.ts` — the items already use `section: "archive"` internally, which is fine as a code-level grouping. Only the displayed label changes.

---

### CHANGE 2: Hero Section Redesign

**File: `src/pages/Index.tsx`** — Rewrite the hero section (lines 224–291). Replace the current layout with:

- **Announcement bar** at the very top of the page (above hero, below TimeBar): a slim `bg-muted` bar with one line like "📘 New: How to Become an Author — Download Free PDF →" linking to the product. Subtle, not a card.
- **Hero content** (replaces current headshot + greeting + KineticText + motivation card + "Build a Simple Site" card):
  - Eyebrow: `<p className="text-xs uppercase tracking-widest text-primary font-semibold">AI Consultant + Author</p>`
  - Headline: `<h1>` "I Help Businesses Use AI. I Help Creators Publish Books." — `text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-foreground`
  - Subheadline: "From strategy to execution, I make AI work for real people. No fluff. Just results." — `text-lg text-muted-foreground`
  - Two CTA buttons side by side: "Work With Me" (`bg-primary text-primary-foreground`) linking to `/services`, and "See My Work" (`border border-secondary text-secondary`) linking to `#tabs-section`
  - Keep the `HeroLogo3D` component positioned as a decorative element (right side on desktop, hidden on mobile)
- **Remove from hero**: headshot image, "Hi, I'm Zain!", KineticText, Daily Motivation Generator card, "Build a Simple Site" card. These are removed from the hero but NOT deleted from the codebase — the motivation generator moves into its own small section below the hero (or is kept but repositioned after the tabs section).

**SEO** (same file, lines 213–220): Update `<Helmet>` title to "Zain Adtani | AI Consultant + Author | DFW Texas" and meta description to the provided text.

---

### CHANGE 3: Light/Dark Mode Fix

**File: `src/index.css`** — The current CSS defines `:root, .dark` together with dark theme colors, meaning light mode uses the same dark colors. Fix by:

1. Change `:root, .dark` to just `.dark` for the dark palette
2. Add a new `:root` block with proper light mode HSL values:
   - `--background: 0 0% 100%` (white)
   - `--foreground: 222 47% 11%` (near-black)
   - `--card: 0 0% 98%` (off-white)
   - `--primary: 168 100% 42%` (same teal)
   - `--muted: 210 40% 96%`
   - `--border: 214 32% 91%`
   - etc. — standard light counterparts for every token
3. Convert `bg-gradient-hero` from hardcoded hex to use HSL vars: `background: linear-gradient(135deg, hsl(var(--hero-bg)) 0%, hsl(var(--card)) 50%, hsl(var(--muted)) 100%)`
4. Convert `bg-gradient-cta` and `bg-gradient-badge` similarly

**Hardcoded color audit** — Replace `text-white` with `text-primary-foreground` where it appears on primary/CTA buttons. The `bg-black/80` in dialog/drawer overlays is standard shadcn and acceptable (it's an overlay opacity, not a theme color). The `text-white` on branded buttons (YouTube red, LinkedIn blue, AWS orange) is intentional and stays — those are brand colors, not theme colors.

---

### Summary of files

**Files to EDIT (4):**
1. `src/components/AppSidebar.tsx` — rename "Archive" label to "Fun Projects"
2. `src/components/Header.tsx` — rename "Archive" label to "Fun Projects" in mobile menu
3. `src/pages/Index.tsx` — hero redesign, announcement bar, SEO meta tags
4. `src/index.css` — add light mode `:root` tokens, convert gradient utilities to use HSL vars

**No new files. No deleted files. No route changes. No package changes.**

