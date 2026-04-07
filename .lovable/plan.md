

## Plan: Sidebar Flat Layout, Hero Cleanup, Softer Light Mode

### CHANGE 1: Sidebar — Flat "Projects" group (no collapsible)

**`src/components/AppSidebar.tsx`** — Replace the `Collapsible` wrapping the archive section (lines 168-196) with a plain `SidebarGroup` that has a `SidebarGroupLabel` "Projects" and a flat `SidebarMenu` listing all archive items. Remove `Collapsible`, `CollapsibleTrigger`, `CollapsibleContent` usage and the `archiveOpen` state + localStorage logic (lines 46-56). Remove `ChevronDown` import if no longer needed.

**`src/components/Header.tsx`** — Same change in mobile sheet (lines 99-124): replace `Collapsible` with a plain section header "Projects" and flat list of links. Remove `archiveOpen` state and `Collapsible` imports.

**`src/data/nav.ts`** — Change the label for the `/projects` entry (line 37) from `"Projects"` to `"Fun Projects"`.

**`src/pages/Projects.tsx`** — Verify page title already says "Fun Projects" (it does from prior changes).

### CHANGE 2: Hero strip-down

**`src/pages/Index.tsx`** lines 230-252 — three deletions, one rewrite:

1. **Delete pill tag** (line 230-232): Remove the `<span>` with "Eagle Scout · Mechanical Engineer · AI Consultant"
2. **Rewrite subheadline** (line 239-241): Replace with "Bridging the gap between human creativity and AI efficiency to help you publish faster and scale smarter."
3. **Delete trust line** (line 250-252): Remove the `<p>` with "B.S. Mechanical Engineering · UTSA Dean's List · Eagle Scout · PMP Candidate"

Keep headline, CTAs, and profile photo untouched.

### CHANGE 3: Softer light mode tokens

**`src/index.css`** — Update `:root` values (lines 11-41):
- `--background: 210 10% 94%`
- `--foreground: 222 47% 10%`
- `--card: 210 10% 90%`
- `--card-foreground: 222 47% 10%`
- `--border: 210 10% 82%`
- `--input: 210 10% 82%`
- `--hero-bg: 210 10% 94%`
- `--hero-foreground: 222 47% 10%`

Keep `--primary: 168 100% 42%` unchanged. Update sidebar tokens to match the new background/border values.

### Files to edit (5)
1. `src/components/AppSidebar.tsx` — flatten archive section, remove collapsible
2. `src/components/Header.tsx` — flatten archive section in mobile menu
3. `src/data/nav.ts` — rename Projects label to "Fun Projects"
4. `src/pages/Index.tsx` — remove pill tag, rewrite subheadline, remove trust line
5. `src/index.css` — update light mode tokens

No new files. No deleted pages. No route changes.

