export type Resource = {
  id: number;
  title: string;
  kind: "PDF" | "Link" | "Tool";
  tags: string[];
  href?: string;     // url or /files/file.pdf
  note?: string;     // short description
  copy?: string;     // optional text to copy
};

export const RESOURCES: Resource[] = [
  {
    id: 1,
    title: "Accelerate, Don't Replace — Dan Martell (Guide)",
    kind: "PDF",
    tags: ["AI", "Leadership"],
    href: "/resources/accelerate-dont-replace-dan-martell.pdf",
    note: "AI isn't here to take your job — it's here to magnify you. This quick, practical guide shows the 92/8 rule, first moves to try this week, and how to turn your team into directors, not doers.",
  },
  {
    id: 2,
    title: "The Time Machine Method — Julian Goldie (PDF)",
    kind: "PDF",
    tags: ["SEO", "Productivity"],
    href: "/resources/time-machine-method-julian-goldie.pdf",
    note: "A 1-page SEO time-boxing system to prioritize needle-moving tasks.",
  },
  {
    id: 3,
    title: "Time of Your Life — Action Workbook (PDF)",
    kind: "PDF",
    tags: ["Planning", "Productivity", "Tony Robbins"],
    href: "/resources/time-of-your-life-action-workbook.pdf",
    note: "Tony Robbins' RPM pages to turn outcomes into weekly action.",
  },
  {
    id: 4,
    title: "Start Your Bookkeeping Biz — Checklist (PDF)",
    kind: "PDF",
    tags: ["Business", "Bookkeeping", "Checklist"],
    href: "/resources/start-your-bookkeeping-biz-checklist.pdf",
    note: "From naming & EIN to pricing & first clients—your quick-start list.",
  },
  {
    id: 5,
    title: "My Morning Routine (PDF)",
    kind: "PDF",
    tags: ["Habits", "Morning", "Mindset"],
    href: "/resources/my-morning-routine.pdf",
    note: "A simple, repeatable AM routine to start the day on offense.",
  },
  {
    id: 6,
    title: "Python Syntax Cheat Sheet (Booklet v2) (PDF)",
    kind: "PDF",
    tags: ["Coding", "Python", "Cheat Sheet"],
    href: "/resources/python-syntax-cheat-sheet-v2.pdf",
    note: "One-glance Python basics—types, loops, functions, errors, more.",
  },
  {
    id: 7,
    title: "12 Rules to Learn to Code — Dr. Angela Yu (PDF)",
    kind: "PDF",
    tags: ["Coding", "Learning", "Motivation"],
    href: "/resources/12-rules-to-learn-to-code-angela-yu.pdf",
    note: "Motivation + tactics (20-min rule, copy smart, ship projects).",
  },
  {
    id: 8,
    title: "The 4-Hour Workweek, free sample chapters",
    kind: "PDF",
    tags: ["PDF", "Productivity", "Books"],
    href: "https://tim.blog/wp-content/uploads/2014/10/the-4-hour-workweek-expanded-and-updated-by-timothy-ferriss.pdf",
    note: "Lifestyle design basics, elimination, automation, mini retirements. Fast intro to the core moves.",
  },
  {
    id: 9,
    title: "The 4-Hour Body, free sample chapters",
    kind: "PDF",
    tags: ["PDF", "Health", "Books"],
    href: "https://tim.blog/wp-content/uploads/2014/10/4-hour-body.pdf",
    note: "Slow-carb fundamentals, tracking, rapid body change principles.",
  },
  {
    id: 10,
    title: "The 4-Hour Chef, free sample chapters",
    kind: "PDF",
    tags: ["PDF", "Learning", "Books"],
    href: "https://tim.blog/wp-content/uploads/2014/10/the-4-hour-chef.pdf",
    note: "Meta-learning through cooking. Learn skills faster with a clear method.",
  },
];
