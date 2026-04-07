

## Plan: Simplify Top Navigation

### What changes

**Single file edit: `src/components/Header.tsx`**

The `TOP_NAV` array (lines 13-20) currently has 6 items. Remove the "About" and "Investing" entries, and rename "Digital Products" to "Products". Result:

```ts
const TOP_NAV = [
  { label: "Home", path: "/" },
  { label: "Services", path: "/services" },
  { label: "Products", path: "/digital-products" },
  { label: "Books", path: "/books" },
];
```

### What stays untouched
- All page files, routes, and components (About, Investing, etc.)
- Sidebar navigation and its "Projects" group
- Mobile hamburger menu (it pulls from `nav.ts`, not `TOP_NAV`, so it still shows all pages)
- All styling, theme tokens, layout

### Potential issues
- **None.** The `TOP_NAV` array is a local constant used only for the desktop header links. It has no effect on routing or the sidebar. About and Investing pages remain fully accessible via sidebar, mobile menu, and direct URL.

