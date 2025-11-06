export type Newsletter = {
  title: string;
  byline?: string;
  blurb: string;
  href: string;
};

export const NEWSLETTERS: Newsletter[] = [
  {
    title: "5-Bullet Friday",
    byline: "by Tim Ferriss",
    blurb: "Five cool things each week—books, hacks, tools.",
    href: "https://go.tim.blog/5-bullet-friday-1/",
  },
  {
    title: "High Performance Journal",
    byline: "by Dan Go",
    blurb: "One practical health tip in ~4 minutes.",
    href: "https://www.dango.co/newsletter",
  },
  {
    title: "Market Briefs",
    byline: "by Briefs Media",
    blurb: "Daily 5-minute finance for regular investors.",
    href: "https://www.briefs.co/",
  },
  {
    title: "LifeNotes",
    byline: "by Ali Abdaal",
    blurb: "Weekly, friendly notes on productivity, practical life advice, and book takeaways.",
    href: "https://aliabdaal.com/newsletter/",
  },
  {
    title: "The Starting Five",
    byline: "by NBA",
    blurb: "Everything from last night and the best of today—daily, fast, and fun.",
    href: "https://www.nba.com/starting5",
  },
  {
    title: "The Rundown AI",
    byline: "",
    blurb: "Learn AI in minutes a day—what's new, why it matters, and how to apply it.",
    href: "http://therundown.ai/subscribe",
  },
  {
    title: "The Curiosity Chronicle",
    byline: "by Sahil Bloom",
    blurb: "Ideas and playbooks for wealth, health, and a better life—clear and actionable.",
    href: "https://www.sahilbloom.com/newsletter",
  },
];
