

## Plan: Update Hero Headline and CTAs

### Single file edit: `src/pages/Index.tsx` (lines 230-246)

**Text changes:**
- Headline (line 231-234): Already says "I Help Businesses Use AI. I Help Creators Publish Books." — keeping as-is since it matches the request
- Subheadline (lines 236-238): Replace with "From strategy to execution. No fluff. Just results."
- Button 1 (line 240-242): Change label to "AI Consulting", keep link to `/services`, keep primary teal style
- Button 2 (lines 243-245): Change label to "Publish Your Book", change from `<a href="#tabs-section">` to `<Link to="/services">`, switch to outline style with teal border (`border-primary text-primary hover:bg-primary/10`)

### What stays untouched
- Hero layout, background gradient, animations, headshot, ScrollReveal wrapper
- Everything else on the page

### Potential issues
- None. All changes are text/label swaps within existing JSX.

