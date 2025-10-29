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
    title: "Time Tracker (PDF, simple daily grid)",
    kind: "PDF",
    tags: ["Productivity"],
    href: "/files/time-tracker.pdf",
    note: "Print 7-day grid. 6am–10pm blocks.",
  },
  {
    id: 2,
    title: "Morning Start Line — 3-minute script",
    kind: "Tool",
    tags: ["Habits"],
    copy:
`Start Line (3 min):
• 1 min water + 4-4-6 breath
• 1 min neck/hamstring stretch
• 1 min meds + floss`,
    note: "Fast, reliable morning kickoff.",
  },
  {
    id: 3,
    title: "EA Study Loop — Pass 1/2/3",
    kind: "Link",
    tags: ["EA"],
    href: "/blog/ea-study-loop",
    note: "Wide → fix weak topics → mocks.",
  },
];
