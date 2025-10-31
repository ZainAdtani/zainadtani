// src/data/blog.ts
export type BlogPost = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  /** Optional. If missing, UI shows current Month Year. */
  date?: string;
  /** Optional. If missing, UI shows "—". */
  readTime?: string;
  status: "published" | "draft";
  tags?: string[];
  audioUrl?: string;
  content?: string[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    slug: "top-10-prompts",
    title: "My Top 10 (Insanely Simple) Prompts I Use Every Week",
    excerpt: "Discover the AI prompts that save me hours of work every single week.",
    date: "October 2025",
    readTime: "5 min read",
    status: "published",
    tags: ["AI", "Productivity"],
    audioUrl: "/audio/top-10-prompts.mp3",
    content: ["Intro paragraph about why these prompts matter...", "Prompt #1: ...", "Prompt #2: ..."],
  },
  {
    id: 2,
    slug: "chatgpt-vs-claude",
    title: "ChatGPT vs Claude: Which AI Should You Use (and When)?",
    excerpt: "A practical comparison of the two leading AI assistants and when to use each one.",
    date: "October 2025",
    readTime: "7 min read",
    status: "published",
    tags: ["AI", "Tools"],
    audioUrl: "/audio/chatgpt-vs-claude.mp3",
    content: ["Both assistants are excellent, but use cases differ..."],
  },
  {
    id: 3,
    slug: "email-chaos-to-clarity",
    title: "From Chaos to Clarity: Cut Your Inbox Time by 70% Using AI",
    excerpt: "Learn my exact system for managing email efficiently with AI assistance.",
    date: "October 2025",
    readTime: "6 min read",
    status: "published",
    tags: ["Systems", "Productivity"],
    audioUrl: "/audio/email-chaos-to-clarity.mp3",
    content: ["Email overwhelm is solvable with a simple loop..."],
  },

  // NEW — full post (replaces the old draft)
  {
    id: 4,
    slug: "tims-tough-journey-teacher",
    title: "Tim’s Tough Journey, Told by a Teacher",
    excerpt:
      "A classroom-style retell of one man’s brave, slow walk from hurt to healing—told with safety, skills, and kindness.",
    date: "October 2025",
    readTime: "6–8 min read",
    status: "published",
    tags: ["Mindset", "Healing"],
    audioUrl: "/audio/tims-tough-journey.mp3",
    content: [
      "Class, pull up a chair. Today we’re talking about Tim—an adult who did something incredibly brave: he stopped pretending he was fine and faced painful memories from when he was a kid. It wasn’t a “quick fix.” It was more like learning to walk again after a bad fall—slow, shaky, and super brave.",
      "The Storm He Couldn’t Outrun",
      "For years, Tim tried to out-hustle his feelings—more work, more trophies, more distractions. But storms don’t disappear just because you run faster. One day, the wind caught him. Old memories showed up like uninvited guests, and his body sounded the alarm (fast heartbeat, jumpiness, zoning out). He finally said, “I can’t do this alone.”",
      "So he invited a trusted friend, Debbie, to sit with him while he told the truth out loud. She wasn’t there to “fix” him—she was there to be a steady hand on a shaky bridge. Two people. One flashlight. Lots of courage.",
      "The Teacher’s Toolkit (that isn’t therapy homework)",
      "I’m your teacher here, not your doctor. So I’m not giving medical advice. I’m explaining ideas that help people move from “hurt” to “healing,” slowly and safely:",
      "• Safe grown-ups: real pros (like trauma-informed therapists) and real friends who answer the phone at 2 a.m. You don’t go cave-exploring without a guide.",
      "• Body check-ins: feelings speak “body language.” When your heart races or you space out, that’s information—not failure.",
      "• Tiny wins: if today you breathed through a tough minute, that’s progress.",
      "The Life Map Behind the Story (Christensen’s wisdom)",
      "1) Purpose = Your “Why,” Drawn Like a Picture",
      "Christensen says purpose has three parts: a clear picture of who/what you’re aiming to become, a real commitment to it, and a few simple ways to measure progress. Think of it like sketching the finished puzzle on the box, promising you’ll build it, and using a small scorecard to track pieces you place each day.",
      "Tim’s version: Picture: “I want to be someone who tells the truth about hard things.” Commitment: “Even when it’s scary, I’ll keep going.” Measures: “Did I share honestly today? Did I take care of my body? Did I reach out for help?”",
      "2) Strategy = Where Your Time Actually Goes",
      "Lots of people “plan” one life but “spend” their time on another. Your real strategy is how you allocate time and energy. Tim’s fix: he started spending time on healing—appointments, rest, honest conversations. That time-shift was the new strategy.",
      "3) Relationships = Ask “What job do they need me to do?”",
      "Christensen’s “jobs to be done” idea says we “hire” things (and people) to do jobs in our lives. In families, one job might be “Please hear me without judging.” With Debbie, the job was steady, kind listening—so Tim could keep walking across that scary bridge.",
      "4) Integrity = Don’t Do “Just This Once”",
      "A dangerous trick our brains play: “I’ll ignore what I need—just this once.” Little exceptions add up. It’s easier to be true to yourself 100% of the time than 98%. In healing: don’t ghost your feelings “just this once.” Keep your promise to you.",
      "How a 13-Year-Old Can Use This (No heavy details, just skills)",
      "• Name your picture: “I’m becoming someone who tells the truth kindly.”",
      "• Spend your minutes on it: 10 minutes journaling, 5 minutes breathing, one honest check-in with a safe adult. Your time is your strategy.",
      "• Ask the job question: “What job does my friend/sibling/parent need from me today—listening, space, or help?”",
      "• Keep your promises to you: Don’t skip your tiny self-care today “just this once.” Future-you is counting on it.",
      "The Heart of It",
      "Tim’s story isn’t about being perfect. It’s about being brave enough to start, gentle enough to go slow, and wise enough to let helpers help. The goal isn’t to “win healing”—it’s to keep choosing the next kind step. If by bedtime you have one more ounce of hope than you woke up with, that’s a good day.",
      "Gentle Safety Note",
      "If anything here touches something heavy for you, talk to a trusted adult or a licensed professional. Healing is real—and you don’t have to do it alone.",
    ],
  },

  // Keep one October draft (shows as “Coming soon” on the list)
  {
    id: 5,
    slug: "when-the-darkness-closes-in",
    title: "When the Darkness Closes In: What Helped Someone Stay, and What Might Help You Too",
    excerpt: "A gentle, practical note for heavy days. (Full post coming soon.)",
    date: "October 2025",
    readTime: "—",
    status: "draft",
    tags: ["Mindset"],
    content: [],
  },
];
