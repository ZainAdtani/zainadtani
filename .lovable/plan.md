

## Plan: Multi-Page Site Cleanup

### PAGE 1: Homepage (src/pages/Index.tsx)

**1. Tabs section** — already only has "digital-products" and "books" tabs with `grid-cols-2`. No change needed here (credentials and role-models were already removed in a previous iteration). The user wants them added to the About page instead.

**2. Reorder Z Letter feed** — Move `<ZLetterFeed />` from its current position (lines 264-267, between About blurb and How I Help) to AFTER the How I Help section (after line 308, before the Tabs section). New flow: Hero -> About blurb -> How I Help -> Z Letter -> Tabs -> Newsletter -> Contact.

**3. Replace Newsletter Opt-in** — Replace the entire "Newsletter Opt-in" section (lines 459-486, with logo, paragraph, and button) with a minimal single-line section:
- Text: "Subscribe to The Z Letter — every Sunday morning."
- Teal button: "Subscribe Free →" linking to `https://thezletter.beehiiv.com/subscribe`
- Remove `zLetterLogo` import if no longer used on homepage (it's used in ZLetterFeed component, so only remove the homepage import).

### PAGE 2: Services Page (src/pages/Services.tsx)

Complete rewrite of the services array and layout:
- Remove SAT Prep entirely
- Change subtitle to "Real work. Real results."
- 2-card layout: `md:grid-cols-2` instead of `md:grid-cols-3`
- **Card 1**: "Done-For-You AI Websites" with specified subtitle, body, bullets, and "Get Started →" button linking to `https://calendly.com/zkadtani`
- **Card 2**: "Book Writing & Publishing" with specified subtitle, body, bullets, and "Start Your Book →" button linking to `https://calendly.com/zkadtani`
- Bottom CTA button link updated to `https://calendly.com/zkadtani` (remove `/job` suffix)

### PAGE 3: About Page (src/pages/About.tsx)

Add two new sections before the footer (before the "Get In Touch" divider):

**Credentials & Certifications section:**
- Three credential cards in a row matching original homepage style
- QuickBooks Certified ProAdvisor (Level 2) with `quickbooks-level2-badge.png`
- AWS Cloud Practitioner with `aws-cloud-practitioner-badge.png`
- Eagle Scout (Earned 2017) with `eagle-scout-badge.png`
- Each card shows the badge image, title, and a short description

**People I Look Up To section:**
- Import `ROLE_MODELS` from `@/data/roleModels`
- Display role model cards with name, role, bio, image, and website link
- `faviconFor` helper function for website favicons
- Style consistent with About page (cards with border, rounded corners)

### Files Changed
1. `src/pages/Index.tsx` — Reorder Z Letter, replace newsletter section
2. `src/pages/Services.tsx` — Full rewrite (2 services, new copy)
3. `src/pages/About.tsx` — Add credentials + role models sections

