

## Cleanup & Polish Plan

### 1. Delete 2 Project Sub-Pages

**Delete files:**
- `src/pages/projects/AiAvatars.tsx`
- `src/pages/projects/TalkToAI.tsx`

**Edit `src/App.tsx`:** Remove imports for `AiAvatars` and `TalkToAI`, remove routes `/projects/ai-avatars` and `/projects/ai`.

**Edit `src/data/projects.ts`:** Remove the `ai-avatars` and `talk-to-ai` entries from the array. Keep `pokedex`, `harry-potter-world`, `ai-songs`.

### 2. TimeBar — Compact Pill

Rewrite `src/components/TimeBar.tsx` as a small floating pill/badge:
- Position: fixed or absolute in top-right, below header
- Single line: "Mar 26 · 9:23 AM CT" in 12px muted text
- No full-width bar, no border, no shadow — just a subtle chip
- On hover: expand to also show ET and PT times
- Remove the clock SVG icon and animation

### 3. About Page — Get In Touch Updates

**Edit `src/pages/About.tsx`:**
- Remove the Email card (lines 69-78)
- Change "Book a Call" from disabled/Coming Soon to a live link pointing to `https://calendly.com/zkadtani/job` (same link used on Services page)
- Grid changes from `lg:grid-cols-4` to `sm:grid-cols-3` (3 remaining cards: LinkedIn, YouTube, Book a Call)

### 4. Services Page — Trim & Rewrite

**Edit `src/pages/Services.tsx`:**
- Remove "Tax Review and Savings Plan" and "QuickBooks Cleanup and Care" entries
- Rename and rewrite the 3 remaining services:
  1. "Launch Your Website" — helping non-technical people get a professional site live
  2. "SAT Prep & Academic Mentoring" — premium positioning for test prep and student confidence
  3. "Book Writing & Publishing" — polished copy about going from idea to published book
- Update subtitle to match the new 3 services
- Keep Calendly links and bottom CTA as-is

### 5. Investing Page — Unify with Site Brand

**Edit `src/pages/Investing.tsx`:**
- Remove `import "@/styles/investing-ftw.css"`
- Remove the `ftwMode` state and `Switch` toggle
- Remove the entire FTW conditional branch (lines 56-320)
- Keep only the "original mode" content (lines 324-585) but restyle it to match the site's dark/teal brand:
  - Replace green colors with primary/teal accents
  - Remove `bg-muted/30` and `bg-green-50` backgrounds — use consistent dark backgrounds
  - Remove the "Financial Treasure Map" card (links to deleted page)
  - Clean up footer to match site standard
- **Delete `src/styles/investing-ftw.css`** (no longer imported anywhere)

### 6. Hero Image Path Confirmation

The homepage hero image is imported at `src/pages/Index.tsx` line 19:
```
import headshotImage from "@/assets/zain-headshot.png";
```
The file lives at `src/assets/zain-headshot.png`. To swap the photo, replace that file. The uploaded image appears to be the new headshot — I will copy it to `src/assets/zain-headshot.png` to replace the current one.

---

### Files to DELETE (4)
1. `src/pages/projects/AiAvatars.tsx`
2. `src/pages/projects/TalkToAI.tsx`
3. `src/styles/investing-ftw.css`
4. (No other files)

### Files to EDIT (5)
1. `src/App.tsx` — remove 2 imports + 2 routes
2. `src/data/projects.ts` — remove 2 entries
3. `src/components/TimeBar.tsx` — rewrite as compact pill
4. `src/pages/About.tsx` — remove Email card, activate Book a Call link
5. `src/pages/Services.tsx` — remove 2 services, rewrite 3 remaining
6. `src/pages/Investing.tsx` — remove FTW mode, unify styling, remove dead link

### Asset Update (1)
- Copy uploaded headshot to `src/assets/zain-headshot.png`

