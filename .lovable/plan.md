

## 3D Interactive Logo — Hero Enhancement Plan

### What exists now
- `Logo3D.tsx`: Uses `@react-three/fiber` + `@react-three/drei` (Text component). Renders "ZA" text with subtle float/rotation. Used only on the Digital Products page header.
- Hero section already has a small `za_logo.png` image (spinning CSS) next to "Hi, I'm Zain!" heading.
- Three.js ecosystem already installed: `@react-three/fiber@^8.18.0`, `@react-three/drei@^9.122.0`, `three`.

### Plan

**1. Create `src/components/HeroLogo3D.tsx` (NEW)**

A new standalone component (does not modify Logo3D.tsx):
- **Scene setup**: Small `<Canvas>` (~200x200px) with transparent background, camera at z=4
- **Logo mesh**: A flat `<planeGeometry>` textured with `za_logo.png` using `useTexture` from drei. Double-sided, with a metallic/reflective material (MeshStandardMaterial, metalness ~0.6, roughness ~0.3)
- **Default animation** (useFrame):
  - Gentle Y-axis rotation: `mesh.rotation.y += 0.003` (slow coin spin)
  - Sine-wave bobbing: `mesh.position.y = Math.sin(clock * 0.8) * 0.15`
- **Mouse interaction**: Track normalized mouse position via `onPointerMove` on the Canvas. Use lerp to smoothly interpolate mesh rotation toward cursor (tiltX from mouseY, tiltY from mouseX, max ~15 degrees). Dampening factor ~0.05.
- **Particles**: 30-40 small teal points using `<Points>` from drei, drifting slowly outward with random initial positions in a sphere. Reset when they drift too far.
- **Lighting**: Ambient (0.4) + one directional light with teal tint (#0ea5e9, intensity 1.5) for rim glow effect
- **Rim glow**: Add a second slightly larger transparent plane behind the logo with teal emissive color and low opacity for edge glow effect
- **Mobile**: Use `useIsMobile()` hook — on mobile, disable mouse tracking, keep only rotation + bob. Use `matchMedia('(prefers-reduced-motion: reduce)')` to show static logo instead.
- **Lazy loading**: Export as `React.lazy()` compatible, wrap in `<Suspense>` with the static logo as fallback

**2. Edit `src/pages/Index.tsx` — Hero section only (lines ~340-398)**

- Lazy import `HeroLogo3D`
- Place it to the right of the hero text in the existing `flex-row` layout on desktop (after the headshot column, before the text column — or as a decorative element overlapping the text area)
- Actually, the current layout is: headshot (left) + text (right). Adding a 3rd column would crowd it. Better approach: **Position the 3D logo as a decorative element behind/beside the heading**, using `absolute` positioning within the hero text area. Size ~160x160px on desktop, hidden or 80x80 on mobile.
- Remove the existing small spinning `<img>` of za_logo (line 352-357) and replace it with the 3D version inline, OR keep the img as mobile fallback and show 3D only on desktop.
- Wrap in `<Suspense fallback={<img src={zaLogo} ... />}>` so it degrades gracefully

### Files to CREATE (1)
- `src/components/HeroLogo3D.tsx`

### Files to EDIT (1)
- `src/pages/Index.tsx` — hero section only (swap static logo img for lazy-loaded 3D version, keep static as mobile/fallback)

### No changes to
- `Logo3D.tsx` (untouched, still used on Digital Products page)
- `CosmicBackground.tsx`
- Any other page sections, layouts, or shared components
- No new packages needed (Three.js + drei already installed)

