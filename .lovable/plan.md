

## Plan: About Section Refinement + Z Letter Asset Integration

### 1. About Zain Copy and Tags Update (`src/pages/Index.tsx`, lines 271-281)

**Copy** (line 272-274): Replace with:
"I'm Zain Adtani, Mechanical Engineer. I help businesses implement AI and I help creators publish books."

**Tags** (line 277): Remove "Eagle Scout" and "Builder" from the array. Remaining tags:
- UTSA Mechanical Engineering
- AWS Certified
- PMP (In Progress)
- 4 Languages

### 2. Z Letter Asset Integration

**Step 1:** Copy the uploaded image (`user-uploads://theZletter.jpeg`) into `src/assets/z-letter-logo.jpeg`.

**Step 2: RSS Cards** (`src/components/ZLetterFeed.tsx`): Import the image and add a `w-12 h-12 rounded-lg border border-border object-cover` thumbnail at the top of each card, before the title.

**Step 3: Footer Cap** (`src/pages/Index.tsx`, lines 624-644): Restructure the section content to place a `w-16 h-16 rounded-xl` version of the graphic to the left of the text block on desktop (using `flex` layout), centered above on mobile.

### 3. Join Button Hover Enhancement (`src/pages/Index.tsx`, line 638)

Add high-contrast hover: `hover:bg-primary/80 hover:shadow-[0_4px_20px_rgba(0,212,170,0.3)]` to ensure strong visual feedback.

### Files Changed

1. **Copy:** `user-uploads://theZletter.jpeg` to `src/assets/z-letter-logo.jpeg`
2. **Edit:** `src/pages/Index.tsx` — About copy/tags + Footer Cap layout + hover state
3. **Edit:** `src/components/ZLetterFeed.tsx` — Add thumbnail to RSS cards

