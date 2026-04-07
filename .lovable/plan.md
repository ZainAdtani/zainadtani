

## Plan: Add "Resources I Use" Section to Homepage

### What changes

**Single file edit: `src/pages/Index.tsx`**

Insert a new `<ScrollReveal>` section between the Spotify Playlist (ends line 613) and the closing `</div>` (line 614). This places it at the very bottom of homepage content, just above the global footer in `AppLayout.tsx`.

### Content

A `ScrollReveal` section with heading "Resources I Use" and a 3-column responsive grid of small cards:

1. **Fidelity** — "Where I invest for the long term" — fidelity.com
2. **Robinhood** — "Simple trading and crypto" — robinhood.com
3. **Marcus by Goldman Sachs** — "High yield savings" — marcus.com

Each card: `<a>` with `target="_blank"`, subtle dark styling (`bg-card/50 border border-border/50`), teal hover glow (`hover:border-primary/60`), emoji as icon (📈, 📱, 🏦), small text.

### Design

- Section: `py-10`, `max-w-4xl`, centered heading in muted style (not loud)
- Cards: `rounded-xl`, small padding, emoji + name bold + description muted, `text-sm`
- Grid: `grid-cols-1 sm:grid-cols-3 gap-4`
- Hover: border shifts to teal, subtle scale

### What stays untouched
- Everything above the Spotify section
- Footer in `AppLayout.tsx`
- All other pages, sidebar, header

### Files
1. `src/pages/Index.tsx` — insert ~30 lines before line 614

