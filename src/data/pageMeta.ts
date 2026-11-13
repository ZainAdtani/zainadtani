export const SITE_ORIGIN = "https://zainadtani.com";
export const OG_IMAGE = `${SITE_ORIGIN}/og-image.jpg`;

export type PageMeta = { title: string; description: string };

/** Social and fallback descriptions. Page-level Helmet tags still win when they set the same field. */
export const PAGE_META: Record<string, PageMeta> = {
  "/": {
    title: "Zain Adtani | AI Consultant · Author · Licensed Financial Professional",
    description:
      "AI Consultant, Author, and Licensed Financial Professional based in DFW Texas. I help small businesses run on AI, help creators publish books, and help families protect what they build.",
  },
  "/about": {
    title: "About Zain Adtani — AI Consultant & Author in DFW Texas",
    description:
      "Get to know Zain Adtani — an AI consultant, author, and systems builder based in Dallas-Fort Worth helping small businesses use AI and helping everyday people publish books.",
  },
  "/services": {
    title: "Services — AI Consulting & Book Coaching | Zain Adtani",
    description:
      "AI websites, book publishing help, and AI workflow consulting from Zain Adtani — practical services for small businesses and first-time authors in DFW Texas.",
  },
  "/ai-checkup": {
    title: "Free AI Checkup | Adtani Education Ventures",
    description:
      "A free report card for your business: how your website, Google reviews, social pages, and AI search visibility stack up, and what to fix first. From Adtani Education Ventures in Bedford, Texas.",
  },
  "/connect": {
    title: "Connect with Zain Adtani | Income Opportunity & Family Protection",
    description:
      "Talk to Zain about a second income opportunity in financial education or about protecting your family with life insurance, wills, and trusts.",
  },
  "/books": {
    title: "Book Portal — Reading List & Recommendations | Zain Adtani",
    description:
      "Zain Adtani's full reading list — books I've read, books I'm reading, and books I want to read, with notes, ratings, and recommendations across business, tech, and personal growth.",
  },
  "/family-protection-gap": {
    title: "The Family Protection Gap | Zain Adtani",
    description:
      "A plain-language guide to help families understand the gap between job benefits, savings, retirement accounts, and real protection. Free PDF.",
  },
  "/resources": {
    title: "Resources — Tools, Books & Links I Recommend | Zain Adtani",
    description:
      "A curated library of tools, books, articles, and links Zain Adtani recommends for AI, building small businesses, writing, and personal growth.",
  },
  "/missed-call-calculator": {
    title: "Missed Call Cost Calculator | Zain Adtani",
    description:
      "Move the sliders and see what missed calls cost your business every month and year. No email needed. From Zain Adtani.",
  },
  "/owner-stress-test": {
    title: "Owner Stress Test | Zain Adtani",
    description:
      "If you stopped working tomorrow, what breaks first? A free 2 minute test for local business owners. See your missed call leak and your safety net in one grade. Educational only.",
  },
  "/investing": {
    title: "Investing — Simple Long-Term Money Philosophy | Zain Adtani",
    description:
      "Zain Adtani's plain-English investing philosophy — simple, steady steps to grow your money over decades without the noise, hype, or stock tips.",
  },
  "/tools": {
    title: "Tools — Software I Use Every Day | Zain Adtani",
    description:
      "A categorized list of the software, AI tools, and apps Zain Adtani uses every day for building, writing, designing, automating, and running a small business.",
  },
  "/projects": {
    title: "Fun Projects — Zain Adtani",
    description:
      "A collection of fun side projects by Zain Adtani — a Notion Pokédex, a Harry Potter timeline, AI songs, and other creative experiments.",
  },
  "/projects/ai-songs": {
    title: "AI Songs | Zain Adtani",
    description: "Fun study music made with AI to help you remember tricky topics.",
  },
  "/lab": {
    title: "The Lab — Just For Fun | Zain Adtani",
    description: "Pokémon, Harry Potter, and other side projects Zain built for fun in Notion.",
  },
  "/pokedex": {
    title: "Zain's Notion Pokédex — Zain Adtani",
    description: "All 151 original Pokémon. Built in Notion.",
  },
  "/harry-potter": {
    title: "Harry Potter World — Zain Adtani",
    description: "Seven books. One journey. Every moment that mattered.",
  },
  "/digital-products": {
    title: "Digital Product HQ — Free Guides & Tools | Zain Adtani",
    description:
      "Free guides and simple tools from Zain Adtani — AI prompt packs, budget worksheets, and family protection planners, all sold through Gumroad.",
  },
  "/ai-prompts": {
    title: "AI Prompt Library — Curated ChatGPT & Claude Prompts | Zain Adtani",
    description:
      "Zain Adtani's curated library of AI prompts for ChatGPT, Claude, and Gemini — searchable, tagged, and built for real work across writing, business, and learning.",
  },
  "/prompts": {
    title: "AI Starter Prompts — 10 Prompts That Will Change How You Work",
    description: "10 free AI starter prompts you can steal and use today. No signup required.",
  },
  "/life-notes": {
    title: "Life Notes — Short Ideas Worth Re-Using | Zain Adtani",
    description:
      "Short, searchable life notes from Zain Adtani — bite-sized ideas, lessons, and reminders on work, money, parenting, and personal growth, easy to copy and re-use.",
  },
  "/lifenotes": {
    title: "Life Notes | Zain Adtani",
    description: "Fifteen short Life Notes from Zain Adtani. One new note is featured each day, and each note has its own page.",
  },
  "/resources/label-iq": {
    title: "Label IQ: Read Any Food Label in 10 Seconds",
    description:
      "Food brands hide junk behind fancy words. Learn the one rule, the serving size trick, and the 4 villains. Free cheat sheet from Zain Adtani.",
  },
  "/resources/life-insurance-calculator": {
    title: "Life Insurance Calculator: How Much Coverage Do You Need?",
    description:
      "Answer 7 quick questions and get a plain-English estimate of how much life insurance your family might need. Free from Zain Adtani, no email required.",
  },
  "/resources/final-expense-estimator": {
    title: "Final Expense Estimator | Zain Adtani",
    description: "Free 30-second estimator for burial costs, debts, and legacy. See the full math, no email needed. From Zain Adtani.",
  },
  "/resources/term-vs-whole-life-quiz": {
    title: "Term vs. Whole Life Quiz | Zain Adtani",
    description: "Five questions, sixty seconds. Find the life insurance strategy that fits your real life. Free from Zain Adtani, no email required.",
  },
  "/resources/ai-news-songs": {
    title: "AI News Songs | Zain Adtani",
    description:
      "The day's headlines, turned into a song. A fresh track lands here every morning. Press play and hear what the world sounded like today.",
  },
  "/buzzerblock-privacy": {
    title: "BuzzerBlock Privacy Policy | Adtani Education Ventures",
    description: "BuzzerBlock does not collect, store, or share personal information.",
  },
};
