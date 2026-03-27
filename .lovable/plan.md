

## 4-Page Update Plan

### 1. ABOUT PAGE (`src/pages/About.tsx`)

**Remove:**
- Line "I like tools that save time and keep things calm"
- Entire "Find me" card (lines 23-29)

**Redesign** as a flowing, single-column layout (Ali Abdaal style):
- Remove the 2-column grid layout
- Flow: photo (centered, softer rounded corners, teal glow) → "Hey, I am Zain." intro → two bio sentences → subtle divider → Get In Touch cards (LinkedIn, YouTube, Book a Call) in a row
- Generous whitespace between elements, no card wrapping the bio text — let it breathe as plain text
- Keep YouTube Channel and Connect on LinkedIn buttons below the photo
- Keep Get In Touch section with its 3 cards at the bottom
- Remove footer (let AppLayout handle it)

### 2. INVESTING PAGE (`src/pages/Investing.tsx`)

**Remove:**
- "My Portfolio Breakdown" heading and subtitle (lines 225-226)
- "The School of Financial Sorcery" section (lines 267-282)
- "Private Finance Dashboard" section (lines 182-194)

**Keep:**
- Hero, Philosophy, Simple Tips, Banking & Brokerage, Options Trading
- Individual Stocks & ETFs grid (just remove the parent heading)
- Roth IRA Holdings grid

**Polish:** Tighten section padding from `py-12 md:py-16` to `py-8 md:py-12`. Remove the page-level footer (let AppLayout handle it).

### 3. DIGITAL PRODUCTS PAGE (`src/pages/DigitalProductsPage.tsx`)

**Remove from `src/data/products.ts`:**
- `eng2ea-course` (Engineer to EA)
- `daily-ledger-mastery` (Daily Ledger Hindi)
- Also remove the unused imports: `engineerToEA` and `dailyLedgerMastery` assets
- Remove `"Courses"` and `"Communities"` from `CATEGORIES` if no products remain in those categories (after removal: no Courses products remain, but Communities still has free-community which is excluded from catalog — so remove both)

**Add dynamic product count** below the subtitle, e.g. `"{filtered.length} Digital Products"` as a muted badge/text.

**Polish:** Reduce header padding slightly. Keep search/filter intact.

### 4. PROJECTS PAGE — AI Songs (`src/data/projects.ts` + `src/pages/Projects.tsx`)

**Update `projects.ts`:**
- Change AI Songs description to: "Songs I create for learning — real concepts turned into catchy tracks to help others learn through music."
- Add a `thumbnail` path: `/images/projects/ai-songs-cover.png`

**Generate AI Songs thumbnail** using the AI image generation model with prompt: "A minimal dark-themed abstract illustration of sound waves transforming into musical notes with a subtle AI circuit pattern overlay, teal (#00D4AA) and navy (#0A0F1A) color scheme, 16:9 aspect ratio"

**Update `Projects.tsx`:** The existing code already handles thumbnails for non-pokedex projects, so adding the thumbnail path is sufficient. The AI Songs card will automatically render with the image.

---

### Files to EDIT
1. `src/pages/About.tsx` — full rewrite as flowing single-column layout
2. `src/pages/Investing.tsx` — remove 3 sections, tighten spacing
3. `src/pages/DigitalProductsPage.tsx` — add product count display
4. `src/data/products.ts` — remove 2 products + unused imports + update categories
5. `src/data/projects.ts` — update AI Songs description + thumbnail
6. `src/pages/Projects.tsx` — no changes needed (already handles thumbnails)

### Files to CREATE
7. Generate and save AI Songs cover image to `public/images/projects/ai-songs-cover.png`

### No routes added or removed. No shared components touched.

