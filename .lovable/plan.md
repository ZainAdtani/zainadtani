

## Plan: Homepage Copy Updates, Visual Polish & Link Audit

### 1. Copy Updates (`src/pages/Index.tsx`)

**Hero headline** (line 214-218): Change to "I help businesses use AI. I help creators publish books. Both in weeks, not years." — keep teal gradient on "I help creators publish books." and add "Both in weeks, not years." in teal too.

**Hero subheadline** (line 220-222): "Strategy to shipped. No fluff. Real results."

**About blurb** (line 257-259): Replace paragraph with "I am Zain. Engineer by training. Builder by obsession. I help small businesses plug AI into their work, and I help everyday people turn their story into a real book on Amazon. Based in DFW, Texas. Let's build something."

**Service card descriptions** (lines 278, 288, 298):
- AI Websites: "Fast, modern websites built in days, not months. You run the business. I run the tech. Live in under two weeks. ⚡"
- Publish Your Book: "You have a book in you. Let's get it out. I help you write, format, and publish on Amazon. Kindle, paperback, and audiobook ready. 📖"
- Creator Monetization: "Got an audience but no product? I help creators turn knowledge into digital products using AI. You bring the audience. I bring the build. We split the win. 💰"

### 2. Visual Upgrades (`src/pages/Index.tsx` + `src/index.css`)

**Service cards** — update hover classes:
- `hover:-translate-y-1` → `hover:-translate-y-1.5` (6px)
- Add `border border-border/50 hover:border-primary/60` for border color shift on hover
- Keep existing teal glow shadow, ensure 300ms transition

**Hero dot grid background** — add a CSS utility class `.bg-dot-grid` with a repeating radial-gradient of teal dots at ~8% opacity. Apply to the hero section.

**Profile photo pulse glow** — add a CSS keyframe `glow-pulse` (3s cycle) that subtly animates the box-shadow on the headshot image.

**CTA buttons** (hero + service card Get Started buttons) — replace solid `bg-primary` with `bg-gradient-to-r from-[#00D4AA] to-[#3B82F6]`. Add `hover:scale-[1.02] hover:shadow-[0_4px_20px_rgba(0,212,170,0.3)]` with 200ms transition.

**Section entry animations** — already using `<ScrollReveal>` with IntersectionObserver. Update the component's default translateY from 16px to 30px and duration from 500ms to 600ms.

**Section dividers** — replace all `border-t border-border opacity-30` flat lines with a gradient div: `bg-gradient-to-r from-transparent via-primary/30 to-transparent h-px max-w-4xl mx-auto`.

### 3. Link Audit Results

| Button/Link | Points To | Status |
|---|---|---|
| "Work With Me on AI →" | `/services` | OK |
| "Help Me Publish My Book →" | `/services` | OK |
| "Read the latest issue of The Z Letter →" | `#z-letter` (anchor) | OK |
| "Read my full story →" | `/about` | OK |
| "Get Started" (all 3 service cards) | `#contact` (anchor) | OK |
| "Subscribe Free →" | `https://thezletter.beehiiv.com/subscribe` | OK |
| "Read →" (Z Letter cards) | Dynamic RSS feed links | OK |
| "Get Your Copy — $6.99" | `https://whop.com/checkout/plan_neElnSODpLYSb/` | OK |
| "Download Free PDF →" | `https://whop.com/you-bestselling-author` | OK |
| "Get Yours →" (Walking Workday) | `https://whop.com/the-walking-workday/the-walking-workday-bb/` | OK |
| YouTube | `https://youtube.com/@captainduaadventures?si=xPzuebAHwHZTl52V` | OK |
| LinkedIn | `https://www.linkedin.com/in/zainadtani/` | OK |
| "Book a Call" | `https://calendly.com/zkadtani` | OK |
| "Send Me an Email" | `mailto:zkadtani@gmail.com` | OK |
| Coffee support link | Not found on homepage | N/A |

All links point to valid destinations. No broken or placeholder links detected.

### Files Changed
1. `src/pages/Index.tsx` — copy updates, button gradients, card hover classes, dot grid on hero, divider gradient, photo glow
2. `src/index.css` — add `.bg-dot-grid` utility, `glow-pulse` keyframe
3. `src/components/ScrollReveal.tsx` — update translateY to 30px, duration to 600ms

