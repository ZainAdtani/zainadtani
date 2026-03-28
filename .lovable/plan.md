

## Hero Kinetic Text + Logo Integration Plan

### 1. Copy logo to project assets
Copy `user-uploads://za_logo.png` → `src/assets/za_logo.png`

### 2. Create `src/components/KineticText.tsx` (NEW)
A cycling subtitle component with vertical slide/fade animation:
- Props: `phrases: string[]`, `interval?: number` (default 3000), `transitionDuration?: number` (default 300)
- Uses `useState` for current index, `useEffect` with `setInterval` to cycle
- CSS transition: outgoing phrase slides up + fades out, incoming slides in from below
- Text styled in teal (`text-primary`) using the heading font (`font-display`)
- Overflow hidden container with fixed height to prevent layout shift
- Loop infinitely

### 3. Edit `src/pages/Index.tsx` — Hero section only (lines 345-349)
- Import `KineticText` and `zaLogo`
- After the `<h1>Hi, I'm Zain!</h1>`, add `<KineticText phrases={[...]} />` with the 4 phrases
- Add the miniature logo (40px) next to the heading — positioned as a small floating element beside "Hi, I'm Zain!" with:
  - `animate-[spin_20s_linear_infinite]` for slow rotation
  - Teal glow shadow via `filter: drop-shadow(...)`
  - `hover:animate-[spin_6s_linear_infinite]` for faster spin on hover (easter egg)
  - On mobile: reduce to 32px, keep rotation

### 4. Edit `src/components/Header.tsx` — Logo area (lines 37-42)
Replace the `<div>ZA</div>` text logo with:
```tsx
<img src={zaLogo} alt="ZA" className="h-7 w-7 hover:rotate-[15deg] hover:scale-110 transition-all duration-300" />
```
Import `zaLogo` from `@/assets/za_logo.png`

### 5. Edit `src/components/AppSidebar.tsx` — No changes needed
The sidebar doesn't have a separate logo area — it uses the same header.

---

### Files to CREATE (1)
- `src/components/KineticText.tsx`

### Files to EDIT (2)
- `src/pages/Index.tsx` — add KineticText + miniature logo to hero
- `src/components/Header.tsx` — replace ZA text with logo image

### Files to COPY (1)
- `user-uploads://za_logo.png` → `src/assets/za_logo.png`

### No layout changes. No new packages. Hero content preserved. Only additive.

