## Three Surgical Fixes

### Fix 1: Footer Bottom Row — Centered

**File**: `src/components/AppLayout.tsx` (lines ~111-130)

Replace the bottom bar's `flex items-center justify-between` row with a centered single-column layout. The "Z Hub" circular link will move to its own centered position above (or be kept floating right via absolute positioning). Cleanest approach: stack vertically, centered.

New layout:
- Centered "☕ Support my work" link (kept — it links to buymeacoffee.com)
- Centered "© 2026 Zain Adtani. All rights reserved."
- The "Z" hub circular button moves to the right side via absolute positioning so the copyright stays visually centered on the page on all breakpoints.

```tsx
<div className="border-t border-border/60 pt-6 relative">
  <div className="flex flex-col items-center gap-2 text-center">
    <a href="https://buymeacoffee.com/curiouszen" target="_blank" rel="noopener noreferrer"
       className="text-xs text-muted-foreground hover:text-primary transition-colors">
      ☕ Support my work
    </a>
    <p className="text-xs text-muted-foreground">© 2026 Zain Adtani. All rights reserved.</p>
  </div>
  <Link to="/z-hub" aria-label="Z Hub"
        className="absolute right-0 top-1/2 -translate-y-1/2 mt-3 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[11px] font-bold hover:scale-110 hover:shadow-[0_0_12px_rgba(0,212,170,0.6)] transition-all duration-300">
    Z
  </Link>
</div>
```

### Fix 2: Sidebar "Projects" Icons — Neutral Line Icons

**File**: `src/data/nav.ts`

The four archive items currently use icons (Zap, StickyNote, Wrench, FolderKanban). User sees them as colored badges — likely the active/hover background tint reading as a circle. Swap icons per spec and ensure the rendered icon color is muted gray.

- AI Prompts: `Zap` → `Sparkles`
- Life Notes: `StickyNote` → `FileText`
- Tools: `Wrench` (keep)
- Fun Projects: `FolderKanban` → `Star`

**File**: `src/components/AppSidebar.tsx` (Projects render block, ~line 175)

Add explicit muted styling to archive-section icons only — `className="h-4 w-4 text-[#94A3B8]"` and ensure no background. Main section icons stay untouched.

```tsx
{getNavItemsBySection("archive").map((item, idx) => (
  <SidebarMenuItem key={item.path + idx}>
    <SidebarMenuButton asChild>
      <NavLink to={item.path} className={getNavClass}>
        <item.icon className="h-4 w-4 text-[#94A3B8]" strokeWidth={1.75} />
        {!isCollapsed && <span>{item.label}</span>}
      </NavLink>
    </SidebarMenuButton>
  </SidebarMenuItem>
))}
```

### Fix 3: Homepage Body Text Readability

**File**: `src/pages/Index.tsx`

Bump body paragraphs to `text-base` (16px) minimum and ensure normal weight. DM Sans is already the global body font (set in `index.css`), so no font swap needed.

| Location | Current | Change to |
|---|---|---|
| Hero subtext (line 219) | `text-lg text-muted-foreground` | keep — already 18px ✓ |
| Hero microcopy (line 237) | `text-xs ... italic` | `text-sm` (still small, but min 14px — italic kept) |
| About body (line 262) | `text-muted-foreground text-lg` | already ≥16px ✓ |
| About sub-tagline (line 261) | `text-base` | already 16px ✓ |
| How I Help sub-tagline (line 278) | `text-base` | already 16px ✓ |
| How I Help card descriptions (lines 283, 293, 303) | `text-sm text-muted-foreground` (14px) | `text-base text-muted-foreground font-normal` (16px) |
| Z Letter sub-tagline (line 322) | `text-base` | already 16px ✓ |

Only the three "How I Help" card description paragraphs and the hero microcopy need bumping. Headings, buttons, and nav untouched.

### Files Changed
1. `src/components/AppLayout.tsx` — centered footer bottom row, Z hub repositioned
2. `src/data/nav.ts` — swap 3 archive icons (Sparkles, FileText, Star)
3. `src/components/AppSidebar.tsx` — muted gray styling on archive icons only
4. `src/pages/Index.tsx` — bump 3 service card descriptions to text-base, hero microcopy to text-sm
