export type LifeNote = {
  id: number;
  title: string;
  tags: string[];
  text: string;   // what we copy
  source?: string;
};

export const LIFE_NOTES: LifeNote[] = [
  {
    id: 1,
    title: "College ROI Reality Check",
    tags: ["education","time"],
    text:
`More than 50% of graduates forget most of college material within 5 years, near 100% by 10. ~600 hours per degree-year vanish if unused. Ask: what could I build with 600 hours, $200k, and 4 years?`,
  },
  {
    id: 2,
    title: "Plan Your Day → Traction",
    tags: ["planning"],
    text:
`Plan your day to create traction (actions that move goals forward) instead of distraction. Time-block key tasks.`,
  },
  {
    id: 3,
    title: "4 Hours Lost = 15 Workdays/Month",
    tags: ["attention","math"],
    text:
`Avg 1h social + 2–3h TV = ~4h/day → 28h/week ≈ 3.5 workdays. Over 30 days = 120 hours = 15 workdays/month lost.`,
  },
  {
    id: 4,
    title: "Motivation Follows Action",
    tags: ["behavior"],
    text:
`Motivation is the effect, not the cause. Take one tiny action; momentum creates motivation.`,
  },
  {
    id: 5,
    title: "Exercise = Investment",
    tags: ["health"],
    text:
`Don't treat workouts as exchange for food. Treat them as investment that returns energy over weeks/months/years. Small daily beats rare intense.`,
  },
  {
    id: 6,
    title: "Refuse 'Normal'",
    tags: ["standards"],
    text:
`Statistically, "normal" is unhealthy, anxious, lonely, and in debt. Don't be normal.`,
  },
  {
    id: 7,
    title: "Mindset + Journaling",
    tags: ["mindset","journaling"],
    text:
`Your mindset is the key; journaling is the daily work that shapes it.`,
  },
  {
    id: 8,
    title: "Don't Assume",
    tags: ["compassion"],
    text:
`Don't assume about others—you don't know their battles. Don't assume about yourself either; we're worst at being objective about ourselves.`,
  },
  {
    id: 9,
    title: "No One Is Staring",
    tags: ["confidence"],
    text:
`People think about you far less than you fear; they're busy thinking about themselves. It's freeing.`,
  },
  {
    id: 10,
    title: "Willing to Be Disliked",
    tags: ["courage"],
    text:
`Develop a willingness to be disliked. It frees you to do what needs to be done.`,
  },
  {
    id: 11,
    title: "Hard Things Are Meaningful",
    tags: ["grit"],
    text:
`Nothing meaningful is easy; nothing easy is meaningful. Choose the difficult things you enjoy.`,
  },
  {
    id: 12,
    title: "Never Too Late",
    tags: ["change"],
    text:
`It's never too late to change. The only question: how long will we keep making excuses?`,
  },
];
