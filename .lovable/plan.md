

## Global Micro-Interactions & Hover Polish Plan

### 1. Create `src/components/ScrollReveal.tsx` (NEW)

Reusable wrapper using native Intersection Observer. Props: `delay` (ms, default 0), `className`, `children`. Animates from `opacity-0 translate-y-4` to `opacity-100 translate-y-0` once on viewport entry. Pure CSS transitions on `transform` and `opacity` — no libraries needed.

### 2. Card hover effects — `src/components/ui/card.tsx`

Add to the Card base classes: `transition-all duration-300 ease-out hover:scale-[1.02] hover:-translate-y-0.5 hover:shadow-[0_4px_24px_rgba(0,212,170,0.15)]`

This replaces the static `boxShadow` inline style with the same default shadow via Tailwind class, plus a teal glow on hover. Uses `transform` only — no layout shift.

### 3. Button press feedback — `src/components/ui/button.tsx`

Add to the base `cva` string: `transition-transform duration-150 active:scale-[0.97]`

This gives all buttons a quick press-down effect on click. The existing `transition-colors` is replaced with `transition-all` to cover both color and transform.

### 4. Page transition fade — `src/components/AppLayout.tsx`

Wrap `{children}` in a keyed div (using `useLocation().pathname`) with a CSS `animate-fade-in` class (already defined in tailwind config: `fade-in 0.3s ease-out`). This gives a subtle opacity+translateY fade on every page navigation.

### 5. Sidebar hover polish — `src/components/AppSidebar.tsx`

Update the `getNavClass` function:
- Hover state: add `hover:border-l-2 hover:border-primary/60 hover:bg-primary/5` 
- Active state (already has `border-l-2 border-primary`): add `bg-primary/10` to make it more prominent than hover

### 6. Apply ScrollReveal to key pages

**Homepage (`src/pages/Index.tsx`):** Wrap the hero section, tabbed section, and WhatIFollow section in `<ScrollReveal>`. For card grids, use staggered `delay` props (0, 100, 200ms per card).

**Digital Products (`src/pages/DigitalProductsPage.tsx`):** Wrap each product card in `<ScrollReveal delay={index * 100}>`.

**Books (`src/pages/BooksHQ.tsx`):** Wrap each book card in `<ScrollReveal delay={index * 80}>`.

**Projects (`src/pages/Projects.tsx`):** Wrap each project card in `<ScrollReveal delay={index * 100}>`.

---

### Files to CREATE (1)
- `src/components/ScrollReveal.tsx`

### Files to EDIT (6)
- `src/components/ui/card.tsx` — hover glow + scale
- `src/components/ui/button.tsx` — active press feedback
- `src/components/AppLayout.tsx` — page fade transition
- `src/components/AppSidebar.tsx` — sidebar hover polish
- `src/pages/Index.tsx` — wrap sections in ScrollReveal
- `src/pages/DigitalProductsPage.tsx` — wrap cards in ScrollReveal
- `src/pages/BooksHQ.tsx` — wrap cards in ScrollReveal
- `src/pages/Projects.tsx` — wrap cards in ScrollReveal

### No new packages. No layout/content/routing changes. Transform+opacity only for GPU performance.

