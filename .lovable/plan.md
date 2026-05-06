## Plan: Header trim, Sidebar slim + secret toggle, Hero redesign, Services rework, About removal

### Task 1 — Remove hamburger from Header
**File:** `src/components/Header.tsx`
- Remove the entire mobile `<Sheet>...</Sheet>` block (lines ~74–137) including the `Menu` trigger button. This is the only hamburger in the header.
- Remove the now-unused imports: `Menu` from lucide-react, `Sheet/SheetContent/SheetHeader/SheetTrigger`, `getNavItemsBySection`, and the `sheetOpen` state.
- Keep the `SidebarTrigger` (it's a separate icon next to the logo) — the spec only forbids the hamburger. Actually re-reading: "Find the hamburger/menu toggle button that opens the sidebar." → that's `SidebarTrigger` next to the logo. Remove that one too. Keep desktop TOP_NAV (Home, Services, Books, Resources) and the desktop theme toggle untouched.
- Net: remove both `SidebarTrigger` (line 45) and the mobile `Sheet` hamburger. No empty space — they were inline flex items, removing them collapses the gap.

### Task 2 — Sidebar slim down + secret toggle
**File:** `src/data/nav.ts`
- Reduce `NAV_ITEMS` to only:
  - `{ label: "AI Prompts", path: "/ai-prompts", icon: Sparkles, section: "main" }`
  - `{ label: "Life Notes", path: "/life-notes", icon: FileText, section: "main" }`
- Removes Home/About/Services/Books/Investing/Digital Products/Tools/Fun Projects from the nav array. Routes themselves remain registered in `App.tsx`; only the sidebar visibility changes (Header TOP_NAV uses its own array, unaffected).

**File:** `src/components/AppSidebar.tsx`
- The "Projects" group becomes empty since both items are now in "main" — remove the empty Projects `SidebarGroup` block.

**File:** `src/components/AppLayout.tsx`
- Add a secret toggle button inside the footer copyright row, inline at the right end (replacing/next to the existing "Z" link area is fine, but spec says "after the LLC copyright line"). Place it inline after the © line:
  - 32px circular button, `bg-[#1E3A5F]`, hover adds `border border-[#00D4AA]`
  - Icon: `Grip` (or three-dot) lucide icon, muted
  - `onClick`: calls `toggleSidebar()` from `useSidebar()`
  - No tooltip, no aria-label visible (keep `aria-label="Toggle sidebar"` for a11y)
- Because `useSidebar()` must be called inside `SidebarProvider`, extract the inner content (currently inside `SidebarProvider`) into a small inner component `LayoutShell` so it can call the hook. Move all current children of `SidebarProvider` into `LayoutShell`. Keep `SidebarProvider defaultOpen={false}` wrapper as-is.

### Task 3 — Homepage hero redesign
**File:** `src/pages/Index.tsx`
- Replace the existing hero `<ScrollReveal><section>...</section></ScrollReveal>` block (the first section after `<TimeBar />`) with a new full-bleed hero:
  - Outer `<section>`: `relative w-full min-h-[90vh] bg-[#0A0F1A] overflow-hidden` + inline style for the radial gradient `background: radial-gradient(ellipse at 15% 50%, rgba(0,212,170,0.07) 0%, transparent 60%), #0A0F1A`
  - Inner: `grid md:grid-cols-[55%_45%] min-h-[90vh]`
  - **Left column** (`flex flex-col justify-center px-8 md:px-16 py-16`):
    - Eyebrow: `<p className="text-[13px] font-medium tracking-widest uppercase text-[#00D4AA] font-sans">AI CONSULTANT · AUTHOR · EDUCATOR</p>` (DM Sans is `font-sans`)
    - Headline: `<h1 className="font-display font-extrabold text-[40px] md:text-[64px] leading-[1.1] text-[#F1F5F9] mt-4">` with four `<span className="block">` lines: "I Help Businesses", "Run on AI.", "I Help Creators", "Publish Books."
    - Subtext: `<p className="font-sans text-[18px] text-[#94A3B8] mt-6 max-w-[480px]">Strategy to shipped. No fluff. Real results.<br/>Based in DFW, Texas.</p>`
    - Buttons row `mt-10 flex flex-wrap gap-4`:
      - Primary: `<Link to="/services" className="px-7 py-3.5 rounded-[10px] font-display font-semibold text-[15px] text-white" style={{background:'linear-gradient(135deg,#00D4AA,#3B82F6)'}}>Work With Me</Link>`
      - Ghost: `<a href="https://the-z-letter.beehiiv.com" target="_blank" rel="noopener noreferrer" className="px-7 py-3.5 rounded-[10px] font-display font-semibold text-[15px] text-[#00D4AA] border-[1.5px] border-[#00D4AA]/40 hover:border-[#00D4AA] transition-colors">Read The Z Letter</a>`
  - **Right column** (`relative md:h-[90vh] h-[40vh] order-first md:order-last`):
    - `<img src={headshotImage} className="w-full h-full object-cover object-top" />` — no border-radius, no shadow
    - Overlay div: desktop fades left edge `absolute inset-0 bg-gradient-to-r from-[#0A0F1A] via-transparent to-transparent md:bg-[linear-gradient(to_right,#0A0F1A_0%,transparent_40%)]`. Mobile uses bottom fade: include responsive variant `bg-[linear-gradient(to_bottom,transparent_50%,#0A0F1A_100%)] md:bg-[linear-gradient(to_right,#0A0F1A_0%,transparent_40%)]`
- Keep the existing `<Helmet>` and `<TimeBar />` above. Everything below the hero (divider, Z Letter, etc.) stays.

### Task 4 — "How Can I Help You?" section rework
**File:** `src/pages/Index.tsx`
- Replace the existing "Here's How We Can Work Together" section (the ScrollReveal block with the 3 service Cards) with:
  - `<section className="bg-[#0A0F1A] py-[100px]">` + container `max-w-6xl mx-auto px-6`
  - `grid md:grid-cols-[35%_65%] gap-12`
  - **Left** (`md:sticky md:top-[120px] self-start`):
    - Label "WHAT I DO" (12px, teal, uppercase, tracking-widest, font-sans 500)
    - Heading `font-display font-extrabold text-[48px] leading-[1.15] text-[#F1F5F9] mt-3`: "How Can I" / "Help You?" (block spans)
    - Subtext `font-sans text-[16px] text-[#94A3B8] mt-4 max-w-[260px]`: "Pick your path." / "Let's get to work." (with `<br/>`)
  - **Right**: `grid grid-cols-1 gap-5`. Three cards:
    - Each `<div className="bg-[#0F2340] border border-[#1E3A5F] rounded-[14px] p-8 transition-all duration-[250ms] hover:border-[rgba(0,212,170,0.4)] hover:-translate-y-[3px]">`
    - Inside: emoji icon (text-3xl), `<h3 className="font-display font-bold text-[20px] text-[#F1F5F9] mt-4">{title}</h3>`, body `<p className="font-sans text-[15px] text-[#94A3B8] mt-3">{body}</p>`, link `<Link to="/services" className="inline-block mt-4 font-sans font-medium text-[14px] text-[#00D4AA] hover:underline">Get started →</Link>`
    - Card 1: 🤖, "Done-For-You AI Websites", body per spec
    - Card 2: 📖, "Publish Your Book", body per spec
    - Card 3: ⚙️, "AI Workflow Consulting", body per spec

### Task 5 — Remove "A little about me" section
**File:** `src/pages/Index.tsx`
- Delete the `<ScrollReveal delay={50}><section className="py-20 max-w-3xl..."><h2>A little about me</h2>...</section></ScrollReveal>` block and the divider immediately preceding/following it (keep one divider so the page doesn't have doubled lines). The `/about` route and `src/pages/About.tsx` are untouched.

### Files Touched
- `src/components/Header.tsx` — remove `SidebarTrigger` and mobile Sheet hamburger + unused imports
- `src/data/nav.ts` — reduce NAV_ITEMS to AI Prompts + Life Notes
- `src/components/AppSidebar.tsx` — remove now-empty Projects group
- `src/components/AppLayout.tsx` — wrap inner content in `LayoutShell` to access `useSidebar`; add 32px circular secret toggle in footer copyright row
- `src/pages/Index.tsx` — new hero, new "How Can I Help You?" section, remove "A little about me"

No routes deleted. No other homepage sections modified. Sidebar component and toggle plumbing remain in codebase.