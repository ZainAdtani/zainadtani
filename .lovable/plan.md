## Plan: Header CTA, hide icon rail, hero redesign, unified Resources page

### Task 1 — Header (`src/components/Header.tsx`)
- In `TOP_NAV`, change `Resources` path from `/prompts` to `/resources`.
- After the mapped nav links and before the theme toggle, insert (desktop only, `hidden md:flex items-center gap-3`):
  - `<a href="https://linkedin.com/in/zainadtani" target="_blank" rel="noopener noreferrer" className="text-[#94A3B8] hover:text-[#00D4AA] transition-colors">` with `<Linkedin className="h-5 w-5" />`
  - Same wrapper for YouTube → `https://youtube.com/@zainadtani` with `<Youtube className="h-5 w-5" />`
- Add lucide imports: `Linkedin, Youtube`.
- After social icons (still before theme toggle), add Book a Call CTA `<a>`:
  - `href="https://calendly.com/zkadtani"`, `target="_blank"`, `rel="noopener noreferrer"`
  - `className="hidden md:inline-flex font-display bg-[#00D4AA] text-[#0A0F1A] font-semibold text-sm px-4 py-2 rounded-[8px] hover:opacity-90 transition-opacity"`
  - Text: `Book a Call`

### Task 2 — Hide sidebar icon rail (`src/components/AppLayout.tsx`)
- In `LayoutShell`, read `state` from existing `useSidebar()` and wrap `<AppSidebar />` in a `<div className={state === "collapsed" ? "hidden" : ""}>`. This hides the collapsed icon rail without touching `AppSidebar.tsx`. The secret footer Grip button calls `toggleSidebar()`, which opens the sidebar to expanded (state becomes `expanded`), at which point the wrapper renders normally.

### Task 3 — Hero redesign (`src/pages/Index.tsx`)
- Locate the existing hero section (the 90vh split with radial gradient added previously) and replace it with the new section per spec:
  - Outer: `<section className="relative w-full bg-[#0A0F1A] pt-20 pb-0 overflow-hidden">`
  - Inner grid: `max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center md:py-20`
  - Left column (`order-2 md:order-1 flex flex-col gap-6`):
    1. Eyebrow pill exactly as specified.
    2. `<h1 className="font-display font-extrabold text-[36px] md:text-[52px] leading-[1.1] text-[#F1F5F9]">` with four `<span className="block">` lines.
    3. Subtext `<p className="font-sans text-[17px] text-[#94A3B8] max-w-[420px]">…</p>`.
    4. CTA row `<div className="flex gap-3 flex-wrap mt-2">`:
       - Primary `<a>` Calendly → bg `#00D4AA`, text `#0A0F1A`, `font-display font-semibold px-6 py-3 rounded-[10px] text-[15px] hover:opacity-90 transition`.
       - Ghost `<a>` Beehiiv → `border-[1.5px] border-[#00D4AA]/40 text-[#00D4AA] font-display font-semibold px-6 py-3 rounded-[10px] text-[15px] hover:border-[#00D4AA] transition-colors`.
    5. Social proof `<p className="mt-4 font-sans text-[13px] text-[#6B7280]">📍 DFW, Texas · 🎓 UTSA Mechanical Engineer · 📚 Published Author</p>`.
  - Right column (`order-1 md:order-2 relative rounded-2xl overflow-hidden md:max-h-[520px]`):
    - Sibling glow div: `absolute inset-0 rounded-2xl pointer-events-none` with inline `boxShadow: "0 0 60px rgba(0,212,170,0.08)"`.
    - `<img src={headshotImage} alt="Zain Adtani" className="w-full h-full object-cover object-top max-h-[320px] md:max-h-[520px] rounded-2xl" />`.
    - Bottom fade: `<div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A0F1A] to-transparent pointer-events-none" />`.
- Keep `<Helmet>` and `<TimeBar />` as-is. Reuse the existing `headshotImage` import (already present).

### Task 4 — Unified `/resources` page
- Create `src/pages/Resources.tsx` (replacing current Resources content). Existing Resources file is in use by no nav (Resources nav now points to `/resources` via the new file). Old Resources page at `/resources` route is currently registered — replace its content. Keep `/prompts`, `/ai-prompts`, `/life-notes` routes intact.
- Structure:
  - `<Helmet>` title "Resources | Zain Adtani".
  - Hero block: `max-w-6xl mx-auto px-6 pt-20 pb-10 text-center`, h1 `font-display font-extrabold text-[40px]` "Resources", subtext.
  - Tab bar: `useState<'prompts' | 'notes'>('prompts')`. Two pill buttons styled per spec (active = teal bg, inactive = `#0F2340` etc.).
  - Tab 1 panel: inline the same 11-prompt array + grid + CopyBlock JSX from `src/pages/Prompts.tsx` (copy the `PROMPTS` constant and the grid + footer CTA).
  - Tab 2 panel: import `LifeNotes` page component default and render `<LifeNotes />` directly (re-uses the exact existing content; simpler than copying).
  - Footer row: `mt-16 text-center font-sans text-[14px] text-[#00D4AA]` with "Looking for more? → " followed by `<Link to="/ai-prompts" className="underline-offset-4 hover:underline">Full Prompt Library</Link>`.
- Update `src/App.tsx`: the `<Route path="/resources" element={<Resources />} />` already exists pointing to the existing Resources file; the rewritten file at the same path keeps the route working. No other route changes.

### Task 5 — Footer links (`src/components/AppLayout.tsx`)
- Update `FOOTER_CONNECT`:
  - LinkedIn → `https://linkedin.com/in/zainadtani`
  - YouTube → `https://youtube.com/@zainadtani`
  - The Z Letter → `https://the-z-letter.beehiiv.com`
  - Email → `mailto:zkadtani@gmail.com`
  - Add: `{ label: "Book a Call", href: "https://calendly.com/zkadtani" }`
- `FOOTER_MORE` already has About → `/about` and Book a Call → Calendly; leave as-is.

### Files touched
- `src/components/Header.tsx`
- `src/components/AppLayout.tsx`
- `src/pages/Index.tsx`
- `src/pages/Resources.tsx` (rewrite)
- `src/App.tsx` — no change needed; route already registered.

No routes deleted. No sidebar content modified. `/prompts`, `/ai-prompts`, `/life-notes` remain registered.