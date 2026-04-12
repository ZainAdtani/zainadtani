

## Plan: 5 Changes — About Page Rewrite, Nav Update, Homepage Refinements

### Change 1: Rewrite About Page (`src/pages/About.tsx`)

Replace the entire page content:
- **Hero**: "Hey, I'm Zain." headline, subheadline with credentials
- **Three body paragraphs** (DFW background, current work, personal life)
- **Three stat blocks** in a row: "4 / Languages spoken", "Eagle Scout / BSA", "UTSA BSME / Dean's List"
- **CTA**: "Book a Free Call" button → Calendly, Electric Teal bg, white text
- **Remove**: "What I'm Listening To" (Spotify) and "Tools I Use & Recommend" (Fidelity/Robinhood/Marcus) sections entirely
- **Keep**: Photo, YouTube/LinkedIn social buttons, Get In Touch cards, footer

### Change 2: Add "About" to Header Nav (`src/components/Header.tsx`)

Insert `{ label: "About", path: "/about" }` after "Home" in the `TOP_NAV` array. New order: Home, About, Services, Products, Books.

### Change 3: Replace Homepage "About Zain" Section (`src/pages/Index.tsx`, lines 262-277)

- **Headline**: "A little about me"
- **Body**: "I'm Zain — Engineer, Eagle Scout, and aspiring author..."
- **Link**: "Read my full story →" styled in Electric Teal, pointing to `/about`
- **Remove**: The credentials bar (UTSA, AWS, PMP, 4 Languages tags)

### Change 4: Remove "What I Follow" from Homepage (`src/pages/Index.tsx`, lines 590-593)

Delete the `<WhatIFollow>` section. Remove the `WhatIFollow` import and `PODCASTS` import if no longer used elsewhere on this page.

### Change 5: Replace Digital Products Tab Content (`src/pages/Index.tsx`, lines 346-390)

Replace the product cards grid with a centered placeholder:
- **Headline**: "New products coming soon."
- **Subtext**: "Join The Z Letter to be the first to know."
- **Button**: "Join the Newsletter" → `https://the-z-letter.beehiiv.com`, Electric Teal style

Remove product shuffle state/effects (`shuffleIndex`, `isHoveringProducts`, `productsFading`, `filteredProducts`, `allFeatured`, `searchQuery`) and related imports (`ALL_PRODUCTS`) since the product cards are gone from the homepage. Keep `productCatalog` only if referenced elsewhere — it won't be needed.

### Files Changed

1. `src/pages/About.tsx` — Full rewrite of content sections
2. `src/components/Header.tsx` — Add "About" to `TOP_NAV`
3. `src/pages/Index.tsx` — Three modifications (About section, remove What I Follow, replace Digital Products tab)

