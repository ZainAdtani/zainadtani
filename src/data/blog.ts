// src/data/blog.ts
export type BlogPost = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  date: string;        // e.g., "January 2025"
  readTime: string;    // e.g., "5 min read"
  status: "published" | "draft";
  tags?: string[];
  audioUrl?: string;   // e.g., "/audio/top-10-prompts.mp3"
  content?: string[];
  // 👇 new but optional (won’t break anything)
  coverImage?: string; // e.g., "/blog/top-10-prompts.jpg"
  featured?: boolean;  // shows on top banner
  pinned?: boolean;    // shows in "Start Here"
};

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    slug: "top-10-prompts",
    title: "My Top 10 (Insanely Simple) Prompts I Use Every Week",
    excerpt: "Discover the AI prompts that save me hours of work every single week.",
    date: "January 2025",
    readTime: "5 min read",
    status: "published",
    tags: ["AI", "Productivity"],
    audioUrl: "/audio/top-10-prompts.mp3",
    coverImage: "/blog/top-10-prompts.jpg",
    featured: true,
    pinned: true,
    content: [
      "Intro paragraph about why these prompts matter...",
      "Prompt #1: ...",
      "Prompt #2: ...",
    ],
  },
  {
    id: 2,
    slug: "chatgpt-vs-claude",
    title: "ChatGPT vs Claude: Which AI Should You Use (and When)?",
    excerpt: "A practical comparison of the two leading AI assistants and when to use each one.",
    date: "January 2025",
    readTime: "7 min read",
    status: "published",
    tags: ["AI", "Tools"],
    audioUrl: "/audio/chatgpt-vs-claude.mp3",
    coverImage: "/blog/chatgpt-vs-claude.jpg",
    content: ["Both assistants are excellent, but use cases differ..."],
  },
  {
    id: 3,
    slug: "email-chaos-to-clarity",
    title: "From Chaos to Clarity: Cut Your Inbox Time by 70% Using AI",
    excerpt: "Learn my exact system for managing email efficiently with AI assistance.",
    date: "January 2025",
    readTime: "6 min read",
    status: "published",
    tags: ["Systems", "Productivity"],
    audioUrl: "/audio/email-chaos-to-clarity.mp3",
    coverImage: "/blog/email-chaos.jpg",
    pinned: true,
    content: ["Email overwhelm is solvable with a simple loop..."],
  },
  {
    id: 4,
    slug: "when-the-darkness-closes-in",
    title: "When the Darkness Closes In: What Helped Someone Stay, and What Might Help You Too",
    excerpt: "A gentle, practical note for heavy days. (Full post coming soon.)",
    date: "January 2025",
    readTime: "—",
    status: "draft",
    tags: ["Life"],
    content: [],
  },
  {
    id: 5,
    slug: "tims-heavy-episode-straight-shooter",
    title: "Tim's Heavy Episode, Told Like a Straight-Shooter",
    excerpt: "A raw, clear retell with resources. (Full post coming soon.)",
    date: "January 2025",
    readTime: "—",
    status: "draft",
    tags: ["Life"],
    content: [],
  },
];
