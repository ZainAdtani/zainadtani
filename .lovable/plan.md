

## Refactor & Cleanup Plan

### Problem
`src/pages/Index.tsx` is 797 lines — bloated with inline data arrays, unused imports, and large JSX sections. `App.tsx` is already clean (63 lines, all pages properly in `/pages`). No other pages have structural issues.

### Changes

**1. Extract inline data from Index.tsx into data files**

- **Create `src/data/quotes.ts`** — Move the `QUOTES_AND_NOTES` array (~20 long strings, lines 38) out of the component file
- **Create `src/data/podcasts.ts`** — Move the `PODCASTS` array and `Podcast` type (lines 41-105) out of the component file
- **Create `src/data/roleModels.ts`** — Move the 7 role-model objects (lines 619-690) into a standalone data file, importing their image assets there instead of in Index.tsx

**2. Clean up unused imports in Index.tsx**

Remove these unused imports:
- `CardHeader, CardTitle, CardDescription, CardContent` (never used in JSX)
- `Mail, GraduationCap, Book, Award, Cpu, Music, Heart, FileText, Mic, ChevronLeft, ChevronRight, FolderOpen, Lightbulb, Grid3x3, Archive, Dumbbell` (none rendered)
- `millionaireFastlane` image import (unused)
- `maggieSimbaBook` image import (unused)
- `financialSorceryBook` image import (unused)
- `NEWSLETTERS` import (WhatIFollow imports it internally)
- `useRef` (not used in component body)

**3. Replace remaining `hover-lift` with standard micro-interaction classes**

Files with stale `hover-lift` class (should be `hover:scale-[1.02] hover:-translate-y-0.5 hover:shadow-[0_4px_24px_rgba(0,212,170,0.15)]`):
- `src/pages/Index.tsx` — book cards (line 501), credentials cards (lines 548, 570, 591), role model cards (line 690)
- `src/pages/BooksHQ.tsx` — line 249
- `src/pages/Investing.tsx` — options course card (line 150)

**4. Remove dead comments/placeholders in Index.tsx**

- Lines 778-783: empty comment blocks (`Newsletter section removed`, `Published Works removed`, `Buy Me a Coffee moved`)
- Lines 786-793: inline `<style>` block for `@keyframes float` — no longer used (animations are in Tailwind config or component-level)

### Files to CREATE (3)
- `src/data/quotes.ts`
- `src/data/podcasts.ts`
- `src/data/roleModels.ts`

### Files to EDIT (4)
- `src/pages/Index.tsx` — remove dead imports, inline data, dead comments; import from new data files
- `src/pages/BooksHQ.tsx` — replace `hover-lift` (1 instance)
- `src/pages/Investing.tsx` — replace `hover-lift` (1 instance)

### No changes to
- `App.tsx` (already clean and well-organized)
- Any routing, styling, colors, or visible content
- Database/Supabase integration
- Any component files

### Result
Index.tsx drops from ~797 lines to ~550 lines. All data is modular and importable. Zero unused imports. Consistent hover classes site-wide.

