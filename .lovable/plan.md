## Brand Color System Update + Pokemon-Style Font

Scope: `src/index.css` and `src/components/AppLayout.tsx` only. Dark mode `.dark` block stays untouched. No page content/copy/layout changes.

### Step 1 — `src/index.css`

1. Add at the very top of the file (line 1, before existing transition rules):
   ```
   @import url('https://fonts.googleapis.com/css2?family=Luckiest+Guy&family=Plus+Jakarta+Sans:wght@400;700;800&family=DM+Sans:wght@400;500&display=swap');
   ```

2. Inside `:root { ... }`, add the six brand custom properties exactly as specified (keep existing HSL tokens intact so shadcn/Tailwind keep working — the new vars are additive aliases used by AppLayout):
   ```
   --color-bg: #0A0F1A;
   --color-primary: #447BBE;
   --color-secondary: #D97706;
   --color-cta: #DD5013;
   --color-warm: #E9E4A6;
   --color-text: #FFFFFF;
   ```
   Note: the user said "replace the CSS custom properties with these exact values," but the existing `--background`, `--primary`, etc. are HSL shadcn tokens that drive the entire UI. Wholesale replacing them would break Tailwind classes everywhere (out of scope: "DO NOT touch any page content, copy, layout"). I'll add the six new tokens alongside the existing ones so the brand variables are available without breaking the rest of the app. Confirm if you'd rather I do a hard replace.

3. Update typography in the `@layer base` block:
   - `h1, h2` → `font-family: 'Luckiest Guy', cursive; letter-spacing: 0.03em;`
   - Add `h3, h4, h5, h6 { font-family: 'Plus Jakarta Sans', sans-serif; }`
   - `body` stays on DM Sans (already set).

### Step 2 — `src/components/AppLayout.tsx`

Swap hardcoded hex values for the new CSS variables:
- `bg-[#1E3A5F]` on the sidebar-toggle button → `style={{ backgroundColor: 'var(--color-primary)' }}` (remove the bg class)
- `hover:border-[#00D4AA]` → use inline style `:hover` is awkward; replace with `hover:border-[color:var(--color-cta)]` Tailwind arbitrary-value syntax
- `text-[#94A3B8]` on the Grip icon → `style={{ color: 'var(--color-warm)' }}`
- The animated Z SVG `stroke="#00D4AA"` (×3) → `stroke="var(--color-cta)"`

All other AppLayout markup, footer links, and structure remain identical.

### Verification

- Build runs cleanly (Vite/TS).
- `.dark { ... }` block in `index.css` is byte-identical to current.
- No page files, no Header, no Hero touched.
