

## Plan: Add Resources, Tools, Life Notes, and AI Prompts as Cards in Fun Projects

### What changes

**Single file edit: `src/data/projects.ts`**

Add 4 new entries to the `projects` array:

1. **Resources** — "Handy PDFs, links, and small tools." — route `/resources`
2. **Tools** — "Curated apps and platforms I use daily." — route `/tools`
3. **Life Notes** — "Quotes, wisdom, and mindset notes." — route `/life-notes`
4. **AI Prompts** — "A library of ready-to-use AI prompts." — route `/ai-prompts`

No thumbnails needed — the Projects page already handles cards without thumbnails (skips the image div). Each card will show title + description + an "Open" button linking to its page, just like the existing Pokedex/HP/AI Songs cards.

### What stays untouched
- The Projects page component (`src/pages/Projects.tsx`) — no changes needed, it already maps over the `projects` array
- The sidebar navigation — untouched
- All existing project entries (Pokedex, Harry Potter, AI Songs)
- All page components and routes

### Potential issues
- None. The grid already handles any number of cards responsively.

