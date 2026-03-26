

## Site Cleanup — Phase 2

### Files to DELETE (4 pages + 2 data files + 6 media files = 12 files)

**Pages:**
1. `src/pages/Waez.tsx`
2. `src/pages/Blog.tsx`
3. `src/pages/BlogPost.tsx`
4. `src/pages/MyPodcast.tsx`

**Data files:**
5. `src/data/blog.ts`
6. `src/data/beehiivPosts.ts`

**Media (Waez-only):**
7. `public/images/waez/abu-ali-1.png`
8. `public/images/waez/abu-ali-2.png`
9. `public/images/waez/abu-ali-3.png`
10. `public/images/waez/abu-ali-4.png`
11. `public/media/waez-131-april-24-1991.mp3`
12. `public/media/waez-14-april-28-1991.mp3`

**Keep:** `ReadingProgressBar.tsx` — it's used globally in `AppLayout.tsx` (not blog-specific). `WhatIFollow.tsx` — used by the homepage. `public/media/automation-audit.srt` and `public/media/canada-youth-address-imam.mp3` — not Waez-specific, keep.

---

### Files to EDIT

**`src/App.tsx`** — Remove imports and routes for Blog, BlogPost, Waez, MyPodcast.

**`src/data/nav.ts`** — Remove Blog, Waez, My Podcast entries. Move Investing from `archive` to `main` (insert after Books). Archive section keeps only Projects.

**`src/components/Header.tsx`** — Replace `Blog` with `Investing` in the `TOP_NAV` array (line 16).

---

### Final nav structure

**Main sidebar:** Home, About, Services, Books, Investing, Digital Products, AI Prompts, Life Notes, Tools

**Archive:** Projects

**Top nav bar:** Home, About, Services, Books, Investing

