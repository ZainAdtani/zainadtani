

## Plan: Round 2 Polish — 4 Pages

### 1. Homepage (`src/pages/Index.tsx`)

**Reduce gap between service cards and Z Letter**: Change the service cards section from `py-20` to `py-16`, and reduce the Z Letter section top padding. Replace the divider between them with a tighter margin variant.

**Center Z Letter feed cards**: The `ZLetterFeed` component already renders a 3-col grid inside a centered container. The issue is likely it appears left-aligned because the parent section lacks centering. Will verify and ensure the feed grid is centered within the section.

**Remove duplicate divider**: Lines 458 and 482 both have gradient dividers sandwiching "Let's Connect". Remove the divider on line 482 (between Let's Connect and Ready to Build Something) so only one remains above Let's Connect.

**Fix YouTube/LinkedIn buttons** (lines 466-477): Replace the solid red/blue gradient buttons with ghost-style buttons — transparent background, thin border, icon keeps its native color, and a teal glow on hover:
```
variant="outline" className="border-border/60 bg-transparent hover:border-primary/60 hover:shadow-[0_0_12px_rgba(0,212,170,0.2)] transition-all duration-300"
```

### 2. About Page (`src/pages/About.tsx`)

**Make "The Z Letter" a link** (line 51): Change the plain text to:
```
Outside of work: I write a Sunday newsletter called <a href="https://thezletter.beehiiv.com" target="_blank" className="text-primary hover:underline">The Z Letter</a> - Check it out!
```

**Remove "Get In Touch" section** (lines 146-188): Delete the entire block including the heading, the 3 cards (LinkedIn, YouTube, Book a Call), and the closing `</main></div>` tags (which will be re-added).

### 3. Digital Products Page (`src/pages/DigitalProductsPage.tsx`)

**Larger category tabs** (lines 64-73): Increase button sizing from `text-sm` to `text-base font-semibold px-6 py-2.5` so they feel like primary nav.

**Standardize card heights**: Add `h-full` to each Card and ensure the description uses `line-clamp-3` (already present). Add `min-h-[420px]` to each card for uniform height.

### 4. Books Page (`src/pages/BooksHQ.tsx`)

**Add pagination**: 
- Add `currentPage` state, default 1. `BOOKS_PER_PAGE = 12`.
- Compute `paginatedBooks = filteredAndSortedBooks.slice((currentPage-1)*12, currentPage*12)`.
- Reset `currentPage` to 1 whenever `statusFilter`, `sortBy`, or `debouncedQuery` changes.
- Render only `paginatedBooks` in the grid.
- Add Previous/Next buttons and page indicators below the grid using the existing `Pagination` UI components.

**Standardize book card heights**:
- Add `h-full` to Card component.
- On the notes/quote text (line 305), enforce `line-clamp-3` (currently unlimited). The "View notes" dialog button already exists for full text.

### Files Changed
1. `src/pages/Index.tsx` — spacing, remove duplicate divider, restyle social buttons
2. `src/pages/About.tsx` — Z Letter link, remove Get In Touch section
3. `src/pages/DigitalProductsPage.tsx` — larger filter tabs, standardized card height
4. `src/pages/BooksHQ.tsx` — pagination (12/page), standardized card heights, line-clamp notes

