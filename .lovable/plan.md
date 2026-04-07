

## Plan: Add "About Zain" Section to Homepage

### What changes

**Single file edit: `src/pages/Index.tsx`**

Insert a new `<ScrollReveal>` section between the hero (ends line 261) and the Daily Motivation Generator (starts line 263). The section will contain:

1. **Heading**: "About Zain" — `font-display font-extrabold`, centered
2. **Bio paragraph** (3-4 sentences): "I'm Zain Adtani. Mechanical Engineer from UTSA turned AI Consultant. I help businesses implement AI and I help creators publish books. Eagle Scout. Husband. Builder."
3. **Credentials strip**: A horizontal row of pill badges with teal border/accent showing: `UTSA Mechanical Engineering`, `Eagle Scout`, `AWS Certified`, `PMP (In Progress)`, `4 Languages`. Uses `flex-wrap` to stack on mobile.

### Design details
- Section uses `py-10 md:py-14`, `max-w-3xl` container, centered text
- Bio text: `text-muted-foreground text-lg`, DM Sans (inherited)
- Credentials: small rounded-full pills with `border border-primary/40 text-primary text-sm px-4 py-1.5` — teal accent, no fill
- Wrapped in `<ScrollReveal>` for consistency with other sections

### What stays untouched
- Hero section (lines 224-261) — not modified
- Daily Motivation Generator and everything below — not modified
- All other pages, sidebar, header, styling

### Files
1. `src/pages/Index.tsx` — insert ~25 lines after line 261

