

## Plan: 6 Homepage Updates

### Change 1: Hero Buttons (lines 239-244)
Update the two CTA button labels:
- Primary: "Work With Me on AI →" (keeps `/services` link)
- Outline: "Help Me Publish My Book →" (keeps `/services` link)

### Change 2: How I Help Cards (lines 287-316)
Update all 3 cards with new titles and body text:
- Card 1: "Done-For-You AI Websites" — "I build fast, modern websites..."
- Card 2: "Publish Your Book" — "You have a story worth sharing..."
- Card 3: "Creator Monetization" — "Already have an audience?..."

### Change 3: About Section (lines 266-268)
Replace the paragraph text with: "I am Zain. I help small businesses use AI and help everyday people publish books. Based in DFW, Texas. Let's get to work."

### Change 4: Remove Credentials Tab
- Remove the `credentials` TabsTrigger (line 334-336)
- Remove the entire `TabsContent value="credentials"` block (lines 448-508)
- Update `TABS` array (line 40) to remove `"credentials"`
- Update `TabsList` grid from `grid-cols-4` to `grid-cols-2` (line 327)
- Remove unused imports: `qbBadge`, `awsBadge`, `eagleScoutBadge` (lines 27-29)

### Change 5: Remove Role Models Tab
- Remove the `role-models` TabsTrigger (lines 337-339)
- Remove the entire `TabsContent value="role-models"` block (lines 510-558)
- Remove `ROLE_MODELS` import (line 25) and `faviconFor` function (lines 32-39) if unused elsewhere
- Remove unused `ExternalLink`, `Youtube` icon imports if only used there (check — `Youtube` is also used in Let's Connect section, so keep it)

### Change 6: Add Ismaili Coloring Book Product
Add a new entry at the **beginning** of `ALL_PRODUCTS` in `src/data/products.ts` with `order: 1` and `featured: true`:
- Title: "Ismaili Coloring Book"
- Desc: "A faith-inspired coloring book for kids and families..."
- CTA label: "Get Your Copy — $6.99"
- CTA href: `https://whop.com/checkout/plan_neElnSODpLYSb/`
- Tags: `["Family", "Digital PDF"]`, badge: "New"

### Files Changed
1. `src/pages/Index.tsx` — All UI changes (hero buttons, cards, about text, remove 2 tabs)
2. `src/data/products.ts` — Add Ismaili Coloring Book product

