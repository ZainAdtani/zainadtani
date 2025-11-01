// src/data/blog.ts
export type BlogPostSection = {
  id: string; // anchor id for TOC links
  title: string; // section heading (H2). Can be "" for intro
  paragraphs: string[]; // content for that section
};

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

  /** NEW: used for the “Video / Slides” tabs on the post page */
  videoUrl?: string; // mp4 url or a page with your embedded player
  slidesEmbedUrl?: string; // iframe-able URL (e.g., Gamma)

  /** Legacy flat paragraphs (still supported) */
  content?: string[];
  /** Preferred structured content (enables right-rail TOC) */
  sections?: BlogPostSection[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    slug: "tims-tough-journey-teacher",
    title: "Tim's Tough Journey, Told by a Teacher",
    excerpt:
      "A classroom-style retell of one man's brave, slow walk from hurt to healing—told with safety, skills, and kindness.",
    date: "October 2025",
    readTime: "6–8 min read",
    status: "published",
    tags: ["Mindset", "Healing"],
    audioUrl: "/audio/tims-tough-journey.mp3",
    sections: [
      {
        id: "intro",
        title: "",
        paragraphs: [
          "Class, pull up a chair. Today we're talking about Tim - an adult who did something incredibly brave: he stopped pretending he was fine and faced painful memories from when he was a kid. It wasn't a 'quick fix.' It was more like learning to walk again after a bad fall - slow, shaky, and super brave.",
        ],
      },
      {
        id: "storm",
        title: "The Storm He Couldn't Outrun",
        paragraphs: [
          "For years, Tim tried to out-hustle his feelings - more work, more trophies, more distractions. But storms don't disappear just because you run faster. One day, the wind caught him. Old memories showed up like uninvited guests, and his body sounded the alarm (fast heartbeat, jumpiness, zoning out). He finally said, 'I can't do this alone.'",
          "So he invited a trusted friend, Debbie, to sit with him while he told the truth out loud. She wasn't there to 'fix' him - she was there to be a steady hand on a shaky bridge. Two people. One flashlight. Lots of courage.",
        ],
      },
      {
        id: "toolkit",
        title: "The Teacher's Toolkit (that isn't therapy homework)",
        paragraphs: [
          "I'm your teacher here, not your doctor. So I'm not giving medical advice. I'm explaining ideas that help people move from 'hurt' to 'healing,' slowly and safely:",
          "Safe grown-ups: real pros (like trauma-informed therapists) and real friends who answer the phone at 2 a.m. You don't go cave-exploring without a guide.",
          "Body check-ins: feelings speak 'body language.' When your heart races or you space out, that's information - not failure.",
          "Tiny wins: if today you breathed through a tough minute, that's progress.",
        ],
      },
      {
        id: "map",
        title: "The Life Map Behind the Story (Christensen's wisdom)",
        paragraphs: [
          "1) Purpose = Your 'Why,' Drawn Like a Picture",
          "Christensen says purpose has three parts: a clear picture of who/what you're aiming to become, a real commitment to it, and a few simple ways to measure progress. Think of it like sketching the finished puzzle on the box, promising you'll build it, and using a small scorecard to track pieces you place each day.",
          "Tim's version: Picture: 'I want to be someone who tells the truth about hard things.' Commitment: 'Even when it's scary, I'll keep going.' Measures: 'Did I share honestly today? Did I take care of my body? Did I reach out for help?'",
          "2) Strategy = Where Your Time Actually Goes",
          "Lots of people 'plan' one life but 'spend' their time on another. Your real strategy is how you allocate time and energy. Tim's fix: he started spending time on healing - appointments, rest, honest conversations. That time-shift was the new strategy.",
          "3) Relationships = Ask 'What job do they need me to do?'",
          "Christensen's 'jobs to be done' idea says we 'hire' things (and people) to do jobs in our lives. In families, one job might be 'Please hear me without judging.' With Debbie, the job was steady, kind listening - so Tim could keep walking across that scary bridge.",
          "4) Integrity = Don't Do 'Just This Once'",
          "A dangerous trick our brains play: 'I'll ignore what I need - just this once.' Little exceptions add up. It's easier to be true to yourself 100% of the time than 98%. In healing: don't ghost your feelings 'just this once.' Keep your promise to you.",
        ],
      },
      {
        id: "teen",
        title: "How a 13-Year-Old Can Use This (No heavy details, just skills)",
        paragraphs: [
          "Name your picture: 'I'm becoming someone who tells the truth kindly.'",
          "Spend your minutes on it: 10 minutes journaling, 5 minutes breathing, one honest check-in with a safe adult. Your time is your strategy.",
          "Ask the job question: 'What job does my friend/sibling/parent need from me today - listening, space, or help?'",
          "Keep your promises to you: Don't skip your tiny self-care today 'just this once.' Future-you is counting on it.",
        ],
      },
      {
        id: "heart",
        title: "The Heart of It",
        paragraphs: [
          "Tim's story isn't about being perfect. It's about being brave enough to start, gentle enough to go slow, and wise enough to let helpers help. The goal isn't to 'win healing' - it's to keep choosing the next kind step. If by bedtime you have one more ounce of hope than you woke up with, that's a good day.",
        ],
      },
      {
        id: "safety",
        title: "Gentle Safety Note",
        paragraphs: [
          "If anything here touches something heavy for you, talk to a trusted adult or a licensed professional. Healing is real - and you don't have to do it alone.",
        ],
      },
    ],
  },
  {
    id: 2,
    slug: "interrupt-plan",
    title: "Interrupt the Plan — A Note to the Fighters Who Need Permission",
    excerpt:
      "Sometimes courage isn't finishing the plan—it's stopping mid-step and choosing something better. A note for anyone who ever decided not to.",
    date: "October 2025",
    readTime: "5–7 min read",
    status: "published",
    tags: ["Hope", "Resilience"],
    audioUrl: "/audio/interrupt-plan.mp3",
    sections: [
      {
        id: "intro",
        title: "",
        paragraphs: [
          "This is for the people who once had a plan to end things and chose something else. If that's you - here's a note I hope you'll read when the world feels heavy again.",
        ],
      },
      {
        id: "permission",
        title: "Permission to Interrupt",
        paragraphs: [
          "If you ever find yourself back at that edge, let me say something clearly:",
          "You are allowed to change your mind. Even in the middle of the worst moment. Even if it feels like the plan is already in motion.",
          "Courage isn't always finishing what you started. Sometimes the bravest thing is stopping mid-step and asking, 'Wait - is this the only way?'",
          "The answer is: No.",
        ],
      },
      // ... (unchanged rest)
      {
        id: "move",
        title: "The Move (Right Now)",
        paragraphs: [
          "If you're reading this and something feels close:",
          "Put your phone down after this. Go outside for two minutes. Or call someone. Or text 988.",
          "Or put on shoes. Walk to the end of the block and back. That's it.",
          "You still have chapters you haven't met yet - people you'll laugh with, places you'll love, quiet mornings that feel like mercy. Stay for those. Stay for the you who gets to see them.",
          "With respect to Tim Ferriss for telling the truth out loud, and to everyone who ever interrupted a plan. May we keep interrupting, together.",
        ],
      },
    ],
  },
  {
    id: 3,
    slug: "save-5-hours-automation-audit",
    title: "Save 5 Hours, Keep Your Sanity: A Beginner's Automation Audit",
    excerpt: "Free up 4–5 hours a week by automating repeat work—so your effort actually counts.",
    date: "October 2025",
    readTime: "7–9 min read",
    status: "published",
    tags: ["Productivity", "Automation", "Systems"],

    /** ADD THESE for the tabs */
    videoUrl: "/video/automation-audit.mp4", // change if your mp4 is elsewhere
    slidesEmbedUrl: "https://gamma.app/embed/lhmoxndy1b2dtye",

    audioUrl: "/audio/automation-audit.mp3",
    sections: [
      {
        id: "intro",
        title: "",
        paragraphs: [
          "Here's The Problem...",
          "Most entrepreneurs and professionals are still doing tasks every week that don't actually need them.",
          "They're stuck inside a mental loop that says, 'It'll be faster if I just do it myself.' But it's never faster in the long run.",
          "Repetitive work quietly drains focus, decision-making energy, and creativity. Every time you retype the same email, schedule the same meeting, or copy-paste the same data, you're burning mental fuel that could be spent on real progress.",
          "Tony often says, 'You can't grow if you're doing what keeps you small.'",
          "Automation isn't about replacing effort. It's about reclaiming energy for the work that actually moves your business forward.",
        ],
      },
      {
        id: "shift",
        title: "Here's the Shift...",
        paragraphs: [
          "AI is no longer just a tool for tech experts. It's your personal operations assistant. It can find the repetitive tasks that are slowing you down, organize them, and even recommend what to automate first.",
          "Once you see how much of your week is filled with repeat work, you'll start to notice how much of your potential has been trapped inside it.",
        ],
      },
      {
        id: "hack",
        title: "So Here's Your Hack",
        paragraphs: [
          "We're going to build a 3-step AI-powered Automation Audit that reveals where you're wasting time and how to reclaim it.",
          "This process helps you:",
          "• Identify hidden bottlenecks that drain hours weekly.",
          "• Classify tasks by automation potential.",
          '• Build your first "AI Task Stack" — a list of automations that will save you time every single week.',
        ],
      },
      // ... (rest unchanged)
    ],
  },
];
