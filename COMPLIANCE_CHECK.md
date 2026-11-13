# Compliance check: Owner Stress Test

**What this is:** every line in the Owner Stress Test that touches insurance, income loss, death, or a sales call. These may need HGI marketing approval before you share the page or send the scripts.

**What this is not:** a legal review. I do not know HGI's exact approval rules or Texas Department of Insurance advertising rules for your license. Take this list to your upline or HGI compliance contact and ask them.

Last updated: 2026-11-07.

---

## How to use this

1. Send your compliance contact the live link (`/owner-stress-test`) and this file.
2. For each line, mark it **OK**, **Change** (with their wording), or **Remove**.
3. Hand the marked file back to Claude to make the changes in one commit.
4. Do not send the launch kit DMs until every line in section D is cleared.

---

## A. Page copy: `src/pages/OwnerStressTest.tsx`

| # | Line | Exact text | Why it may need review |
|---|------|-----------|------------------------|
| A1 | 29 | "If you stopped working tomorrow, what breaks first? A free 2 minute test for local business owners. See your missed call leak and your safety net in one grade. Educational only." | Search and social preview text. It is the first thing people see when the link is shared. |
| A2 | 395 | "See the money your phone leaks and how long your savings could carry you if you could not work." | Hero line about income loss. |
| A3 | 409 | "Your safety net" / "What keeps the lights on if you cannot show up." | Section frames savings and coverage as protection. |
| A4 | 79 | Slider label "Life insurance payout" / "The total your family would get. Pick $0 if you have none." | Asks about existing life coverage. |
| A5 | 83 | "Do you have disability coverage?" / "It may replace part of your income if you are hurt or sick and cannot work." | Describes what a coverage type does. |
| A6 | 433 | "Your phone and your safety net, scored together." | Grade includes a protection score. |
| A7 | 453 | "Stopped Tomorrow Score" | A score that rates the owner's protection. Ask whether a protection "score" or an A to F grade is allowed. |
| A8 | 459 | "months your savings cover if you cannot work" | Runway result label. |
| A9 | 463 | "months your family's bills are covered if you pass away" | Death-related result label. |
| A10 | 542 | CTA title "Understand your safety net" | Leads to an appointment with a licensed agent. |
| A11 | 544 | "Book a free 15 minute educational call with Zain, a licensed life and health agent. Look at your numbers together and ask questions. No pressure, no obligation." | Appointment invite plus license disclosure. Ask if HGI needs specific wording, an NPN, or the HGI name here. |
| A12 | 547 | Button "Book a free call" (links to calendly.com/zkadtani) | Appointment setting. Check that the Calendly event description is approved too. |

## B. Results and explanation copy: `src/data/owner-stress-test.ts`

| # | Line | Exact text | Why it may need review |
|---|------|-----------|------------------------|
| B1 | 51 | DISCLAIMER: "Educational estimate only. Not financial, tax, or legal advice, and not a quote or offer of insurance. Real numbers depend on your situation. Booking a call does not obligate you to buy anything. Zain Adtani is a licensed life and health insurance agent in Texas." | **Most important line.** Ask HGI for their required disclaimer and license disclosure text, and replace this with it. |
| B2 | 152 | "If you got hurt and could not work, your savings would cover about X months of bills. That is worth a closer look." | Personalized finding about income loss. |
| B3 | 158 | "If you passed away, savings alone would cover about X months of your family's bills." | Personalized finding about death. Shows when the owner enters $0 life coverage. |
| B4 | 161 | "Your business stops earning when you stop working. It helps to plan how bills get paid while you are out." | Suggests planning. |
| B5 | 142 | "Your numbers look strong. Run this test again once a year or when life changes." | Low risk. Listed so every result line is covered. |
| B6 | 255 to 256 | "If you get hurt or sick" step: "...If you have disability coverage, we add 6 months as a simple stand in. It is not a promise of what any plan pays. Real coverage depends on your plan." | Assumes a value for disability coverage. Ask if the 6 month stand in is acceptable or should be removed. |
| B7 | 259 to 260 | "If you pass away" step: "Your savings plus any life insurance payout, divided by your home bills..." | Explains a death benefit calculation. |

## C. Site links

| # | File:line | Exact text | Why it may need review |
|---|-----------|-----------|------------------------|
| C1 | `src/pages/Resources.tsx:65` | "If you stopped working tomorrow, what breaks first? See your missed call leak and your safety net in one grade. Free, no email required." | Site map listing for the tool. |
| C2 | Site footer (all pages, existing) | "Licensed Financial Professional · NPN 20207668" | Not part of this change, but it shows on this page. Wording updated site-wide per Zain: "Financial Educator" is not his title. |

## D. Launch kit: `docs/launch/owner-stress-test-launch-kit.md`

This file is not on the website. It holds scripts you would send or say to real people, so it may count as marketing.

| # | Line | Exact text | Why it may need review |
|---|------|-----------|------------------------|
| D1 | 70 | "Your Stopped Tomorrow Score. How long your home and your business keep running if you could not work." | Outreach copy sent to prospects. |
| D2 | 85 | "It also shows how long things keep going if you got sick and had to stop working." | Outreach copy sent to prospects. |
| D3 | 149 to 151 | Bridge: "...because I am also a licensed life and health agent here in Texas. Can I ask you a couple questions about it?" | Moves a business call into an insurance conversation. Ask how HGI wants this disclosed. |
| D4 | 159 | "If you got hurt and could not work for a few months, what would happen to the business?" | Needs-discovery question. |
| D5 | 163 | "If something happened to you, does your family have a plan?" | Needs-discovery question about death. |
| D6 | 171 | "I do a free 15 minute educational call for that. It is just a conversation..." | Appointment invite. |
| D7 | 179 | "And if you want that educational call later, here is my calendar: calendly.com/zkadtani." | Appointment invite. |
| D8 | 185 | Recap text: "If you ever want the free educational call about your safety net: calendly.com/zkadtani." | Written message to a prospect. |

## E. Data collection (not copy, but worth asking)

| # | Where | What happens | Question for compliance |
|---|-------|--------------|-------------------------|
| E1 | "Email me my full report" form | Saves email, optional business name, and the visitor's numbers (savings, coverage, bills, grade) to the private `leads` table, tagged `owner-stress-test`. | Is storing these numbers OK? Does HGI need a privacy notice or a consent checkbox before you follow up about insurance? |
| E2 | Same form, consent line | "We save your email and these scores so Zain can send your report. That is it. No auto emails, no list selling." | Ask if this consent wording is enough. |

---

## Wording already softened in this pass

- "months your family lasts if you die" changed to "months your family's bills are covered if you pass away".
- "That is not much time." changed to "That is worth a closer look."
- "...and no life coverage set aside." changed to "savings alone would cover about X months of your family's bills."
- "Your family feels that right away." changed to "It helps to plan how bills get paid while you are out."
- Disability helper "It pays you if you get hurt" changed to "It may replace part of your income".
- CTA "Protect the owner / Book a free 15 minute protection review" changed to "Understand your safety net / Book a free 15 minute educational call".
- Added "Booking a call does not obligate you to buy anything." to the disclaimer.
- Launch kit: "protection review" changed to "educational call" in 3 places.

## Things the page never does (keep it this way)

- No product names (term, whole life, IUL, annuity).
- No premiums, prices, or quotes.
- No guarantees, testimonials, or made up statistics.
- No deadlines or "you need this" language.
