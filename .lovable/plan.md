
# Website Navigation & Pages Update Plan

## Overview
This plan covers 4 major areas:
1. Newsletter section updates (Home page)
2. Archive page creation and navigation restructure
3. Health page (rename from Workout)
4. Resume page redesign

---

## A. Newsletter Section Updates

**File: `src/pages/Index.tsx`**

### Changes to "Join Zain's World" section (lines 1212-1263)

1. **Add second button** next to signup:
   - Label: "Read the Newsletter"
   - Links to: `https://zains-world.beehiiv.com/`
   - Opens in new tab

2. **Update hook text**:
   - Replace current bullet list with: "Free posts. Quick ideas. No fluff."
   - Add smaller line: "Read the archive on Beehiiv, then subscribe there too."

3. **Button layout**: Side-by-side on desktop, stacked on mobile

---

## B. Archive Page & Navigation Restructure

### B1. Update Navigation Config

**File: `src/data/nav.ts`**

Add new section type "archive" and move these pages:
- Enrolled Agent (`/enrolled-agent`)
- Personal Learning Vault (`/personal-learning-vault`)
- QuickBooks (`/quickbooks`)

Remove from Learn/Resources sections, add to new "archive" section.

**Changes:**
```text
1. Update NavItem interface to include "archive" section type
2. Remove Enrolled Agent from "learn" section
3. Remove Personal Learning Vault from "resources" section
4. Remove QuickBooks from "resources" section
5. Add all three to new "archive" section
```

### B2. Update Sidebar

**File: `src/components/AppSidebar.tsx`**

Add new "Archive" collapsible group after Support section, before Vault.

### B3. Create Archive Page

**New file: `src/pages/Archive.tsx`**

Layout:
- Header with note: "Old pages live here. I keep them for reference."
- Grid of 3 cards:
  - Enrolled Agent: "Tax prep certification and study resources." → `/enrolled-agent`
  - Personal Learning Vault: "Video summaries and course notes." → `/personal-learning-vault`
  - QuickBooks: "Bookkeeping training and tools." → `/quickbooks`
- Each card has title, one-line description, "Open" button

### B4. Add Route

**File: `src/App.tsx`**

Add: `<Route path="/archive" element={<Archive />} />`

---

## C. Health Page (Rename Workout)

### C1. Create New Health Page

**New file: `src/pages/Health.tsx`**

Layout structure:

**Hero Section:**
- Title: "Health"
- Subtitle: "Small steps. Better energy."
- Two buttons: "Start here" and "Tools I use" (scroll to sections)

**4-Card Grid:**
| Card | Subtitle |
|------|----------|
| Move | Walk. Lift. Stretch. |
| Food | Eat simple. |
| Sleep | Protect your bedtime. |
| Mind | Calm wins. |

**Quick Checklist Section:**
7 items with checkboxes:
- Walk 10 minutes
- Drink water
- Protein with a meal
- One veggie
- Sunlight
- Sleep time set
- No screens last 20 minutes

**Resources Section:**
3 placeholder cards: "My routines", "My favorite tools", "My notes"

### C2. Keep Workout Route with Redirect

**File: `src/App.tsx`**

```text
Add: <Route path="/health" element={<Health />} />
Change: <Route path="/workout" element={<Navigate to="/health" replace />} />
```

### C3. Update Navigation

**File: `src/data/nav.ts`**

Change "Workout" label to "Health" and update path to `/health`

---

## D. Resume Page Redesign

**File: `src/pages/Resume.tsx`**

Complete redesign for clean white one-pager:

### Layout Structure

**Header (centered):**
- Name: "Zain Adtani"
- Title line: "Website builder and systems guy"
- Two buttons: "LinkedIn" and "Email"

**Two-column layout on desktop, single column on mobile:**

**Left Column:**
- Summary: 3 short lines max
- Skills: Grouped as small pills
- Tools: Small list (Lovable, Notion, etc.)

**Right Column:**
- Experience: Newest first, simple bullets
- Projects: 3 max, each with one-line result
- Education: UTD engineering line

### Interactivity
- "Show details" toggle for each job/project
- Default view stays collapsed
- "Print" button that triggers `window.print()`

### Style Changes
- White background (`bg-white`)
- Black text
- Subtle gray lines/borders
- Print-friendly CSS (`@media print`)
- Remove side navigation
- Remove dark theme styling

### Data Adjustments

**File: `src/data/resumeData.ts`**

Update summary to 3 short lines. Keep existing content but display shorter version on page.

---

## Files Summary

| File | Action |
|------|--------|
| `src/pages/Index.tsx` | Update newsletter section |
| `src/data/nav.ts` | Add "archive" section, rename Workout to Health |
| `src/components/AppSidebar.tsx` | Add Archive collapsible group |
| `src/pages/Archive.tsx` | **NEW** - Archive page with cards |
| `src/pages/Health.tsx` | **NEW** - Health page with new design |
| `src/pages/Workout.tsx` | Keep for reference (redirect handles routing) |
| `src/pages/Resume.tsx` | Complete redesign |
| `src/App.tsx` | Add routes for /archive, /health, redirect /workout |

---

## Technical Notes

- All existing page content preserved (Workout.tsx not deleted, just redirected)
- Archive pages remain accessible via URL
- Navigation stays clean with fewer items in main sections
- Mobile-responsive design maintained throughout
- Uses existing UI components (Card, Button, Badge)
- No new dependencies required
