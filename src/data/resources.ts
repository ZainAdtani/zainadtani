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
];
