

## 7-Area Polish & Fixes Plan

### AREA 1: Hero Spacing & Size

**File: `src/components/HeroLogo3D.tsx`**
- Increase canvas size from `w-40 h-40` to `w-[180px] h-[180px]` on desktop (line 176)

**File: `src/pages/Index.tsx`**
- Add `mb-3` to the KineticText wrapper (around line 365-372) to add spacing before the Daily Motivation card
- ScrollReveal on product cards is already applied in the Digital Products tab (line 99 in DigitalProductsPage.tsx). Verify homepage tab cards also have it — they currently don't. Wrap each product card in the homepage digital-products tab (lines 455-476) with `<ScrollReveal delay={index * 100}>`

---

### AREA 2: Header Logo Position + Digital Products Nav

**File: `src/components/Header.tsx`**
- Move the logo closer to the left by adjusting layout: swap sidebar trigger and logo ordering so the logo sits at the far left, then sidebar trigger. Or simply remove `gap-4` excess and place logo first in the flex container.
- Add `{ label: "Digital Products", path: "/digital-products" }` to `TOP_NAV` array after "Services" (line 20), making the order: Home, About, Services, Digital Products, Books, Investing
- Reduce nav link text size to `text-xs` on `md` breakpoint to prevent overflow with 6 items, or keep `text-sm` if it fits

---

### AREA 3: Investing Page Cleanup

**File: `src/pages/Investing.tsx`**
- Remove the entire Portfolio section (lines 207-246): the "Individual Stocks & ETFs" grid and "Roth IRA Holdings" grid
- Remove all related data: `FAVORITES`, `INDIVIDUAL`, `ROTH_IRA`, `sortByFavorites`, `INDIVIDUAL_SORTED`, `ROTH_SORTED` (lines 8-49)
- Keep: Hero, Philosophy, Simple Tips, Banking & Brokerage, Options Trading sections

---

### AREA 4: Digital Products CTA Consistency

**File: `src/data/products.ts`**
- Change "How to Become an Author" CTA label to `"Download Free PDF →"` (already correct on line 29)
- Change "Walking Workday" label from `"Get It Now →"` to `"Get Yours →"` (line 41)
- Change "Quiet Your Gut" label from `"Get It Now →"` to `"Get Yours →"` (line 52)
- Change "Newlyweds" label from `"Get It Now →"` to `"Get Yours →"` (line 64)
- Change "Clinic Clarity Kit" label from `"Get it on Whop"` to `"Get Yours →"` (line 91)
- Change "Calm Solo Time" label from `"Get it on Whop"` to `"Get Yours →"` (line 106)
- Change "Texas LLC Roadmap" label from `"Get it on Whop"` to `"Get Yours →"` (line 120)
- Change "Zen Detachment" label from `"Get it on Whop"` to `"Get Yours →"` (line 136)

Both the `/digital-products` page and homepage tab render from `ALL_PRODUCTS`, so fixing the data file fixes both.

---

### AREA 5: Breadcrumb Consistency

**Current state**: Projects and ProjectPokedex have inline breadcrumbs. HarryPotterWorld and AiSongs do NOT have breadcrumbs. A reusable `breadcrumb.tsx` UI component exists but is unused.

**Files to edit:**
- `src/pages/projects/AiSongs.tsx` — Add breadcrumb nav: Home → Projects → AI Songs (after Helmet, before hero)
- `src/pages/projects/HarryPotterWorld.tsx` — Add breadcrumb nav: Home → Projects → Harry Potter World (after Helmet, inside container)

These are the only subpages with parent→child relationships based on the routes in App.tsx. No blog, no other nested detail pages exist.

---

### AREA 6: General Consistency & Polish Sweep

Based on my audit:
- **Footer consistency**: Only Index.tsx and DigitalProductsPage.tsx have footers. The AppLayout doesn't have a global footer. Most pages have no footer at all.
- **Card styles**: The Investing page cards use `hover-lift` (old class) instead of the new micro-interaction classes. Update the 4 philosophy cards and 3 brokerage cards to use the standard hover treatment.
- **The DigitalProductsPage footer** is missing the coffee link. Since the footer isn't global, I'll add a shared footer to `AppLayout.tsx` so every page gets it consistently.

**File: `src/components/AppLayout.tsx`**
- Add a global footer with the coffee link and copyright, matching the Index.tsx footer style
  
**File: `src/pages/Index.tsx`**
- Remove the per-page footer (lines 780-796) since AppLayout will now handle it

**File: `src/pages/DigitalProductsPage.tsx`**
- Remove the per-page footer (lines 172-177)

---

### AREA 7: Footer — Buy Me a Coffee

Handled by Area 6 above. The global footer in AppLayout will contain the subtle "☕ Support my work" text link + copyright. This makes it consistent across ALL pages automatically.

---

### Summary of files

**Files to EDIT (8):**
1. `src/components/HeroLogo3D.tsx` — canvas size bump
2. `src/pages/Index.tsx` — KineticText spacing, ScrollReveal on product cards, remove per-page footer
3. `src/components/Header.tsx` — logo position, add Digital Products to nav
4. `src/pages/Investing.tsx` — remove portfolio holdings data
5. `src/data/products.ts` — normalize all CTA labels
6. `src/pages/projects/AiSongs.tsx` — add breadcrumbs
7. `src/pages/projects/HarryPotterWorld.tsx` — add breadcrumbs
8. `src/components/AppLayout.tsx` — add global footer
9. `src/pages/DigitalProductsPage.tsx` — remove per-page footer

**No new files. No new packages. No route changes. No page deletions.**

