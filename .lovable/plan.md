

## Plan: Add Coloring Book Cover + Fix Issues

### 1. Add Coloring Book Cover Image

Copy the PDF cover page image to `src/assets/ismaili-coloring-book-cover.png` (from the parsed PDF). Update `src/data/products.ts`:
- Import the new cover image
- Add `media: ismailiColoringBookCover` to the coloring book product entry
- Remove the unused `jointFamilyBoundaries` import (it's imported but never used in any product)

### 2. Bug Fix: Duplicate Return Statement

In `src/pages/Index.tsx` line 37, there's a duplicate `return` statement in `getTabFromHash()`. Remove the second identical line.

### 3. Issues & Recommendations Spotted

**Missing divider before contact section**: There's no gradient divider between "Let's Connect" and "Ready to Build Something" (it was removed earlier). The two sections run together without visual separation — worth adding one back.

**Products with `/images/products/` paths**: The newer products (Clinic Clarity Kit, Calm Solo Time, Texas LLC Roadmap, Zen Detachment) use public folder paths like `/images/products/calm_solo_time_cover.png`. These files exist, so they work — but it's inconsistent with the older products that use `src/assets/` imports. Not broken, just a style inconsistency. No change needed unless you want to standardize.

**No other broken links or dead pages found** in the prior audit. All Whop, Calendly, Beehiiv, and social links are valid.

### Files Changed
1. `src/assets/ismaili-coloring-book-cover.png` — new file (copied from PDF)
2. `src/data/products.ts` — add cover import, set media on coloring book, remove unused import
3. `src/pages/Index.tsx` — remove duplicate return on line 37, add divider before contact section

