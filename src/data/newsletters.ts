export type Newsletter = {
  title: string;
  byline?: string;
  blurb: string;
  href: string;
  image?: string | null;
};

export const NEWSLETTERS: Newsletter[] = [
  {
    title: "LifeNotes",
    byline: "by Ali Abdaal",
    blurb: "Weekly, friendly notes on productivity, practical life advice, and book takeaways—concise, actionable, and easy to apply.",
    href: "https://aliabdaal.com/newsletter/",
    image: "https://aliabdaal.com/wp-content/uploads/2024/09/Avatars.png",
  },
  {
    title: "Starting 5 (Daily)",
    byline: "by NBA",
    blurb: "The quickest way to catch up: last night's action, today's must-knows, and storylines to watch—every morning.",
    href: "https://www.nba.com/starting5",
    image: "https://cdn.nba.com/manage/2023/10/STARTING5-ACTION-FINAL-HEADER-1.jpg",
  },
  {
    title: "The Curiosity Chronicle",
    byline: "by Sahil Bloom",
    blurb: "Simple, well-researched ideas on wealth, health, and living better—mental models, playbooks, and stories you can use this week.",
    href: "https://www.sahilbloom.com/newsletter",
    image: null,
  },
  {
    title: "The Rundown AI",
    byline: "",
    blurb: "Learn AI in minutes a day—clear summaries of what's new, why it matters, and practical ways to use it.",
    href: "http://therundown.ai/subscribe",
    image: null,
  },
];
