export type AIPrompt = {
  id: number;
  title: string;
  category: "Coaching" | "Productivity" | "Learning" | "Email" | "Delegation" | "Automation";
  tags: string[];
  prompt: string;   // the part we copy
  note?: string;    // short "why it works"
};

export const AI_PROMPTS: AIPrompt[] = [
  {
    id: 1,
    title: "Wise Life Coach (only answer if sure)",
    category: "Coaching",
    tags: ["mindset"],
    prompt:
`I want you to act as if you are an old and wise life coach, who has lived a full life. You have overcome many struggles in your life, and have lived through changing times, giving you hard-won wisdom on how to solve life's problems. I want you to answer questions that I give you as clearly as possible. But only answer if you're confident you know the answer.`,
  },
  {
    id: 2,
    title: "Expert in X (signal vs noise)",
    category: "Coaching",
    tags: ["clarity"],
    prompt:
`I want you to act as an expert in X, and know which information is the most useful, as well as how to communicate that information in a simple way. Ensure that you only answer questions where you're confident you can give me the right answer.`,
  },
  {
    id: 3,
    title: "80/20 Prioritizer",
    category: "Productivity",
    tags: ["pareto","planning"],
    prompt:
`Identify the 20% of my tasks that contribute to 80% of my results. Here's a list of my weekly tasks: [Insert Task List]. Please analyse and recommend which tasks I should prioritise for maximum impact.`,
    note: "Focuses on leverage.",
  },
  {
    id: 4,
    title: "Automation Scanner",
    category: "Automation",
    tags: ["tools","ops"],
    prompt:
`Review my list of daily activities: [Insert Daily Activities]. Suggest which tasks can be automated and recommend specific AI tools or software that can accomplish this.`,
  },
  {
    id: 5,
    title: "Delegation Map",
    category: "Delegation",
    tags: ["team","ops"],
    prompt:
`Considering my current project tasks: [Insert Project Tasks], identify which can be delegated and provide guidance on how to communicate these delegations effectively, including any necessary instructions or expectations.`,
  },
  {
    id: 6,
    title: "Email TL;DR + Reply",
    category: "Email",
    tags: ["communication"],
    prompt:
`Summarise the following email thread [Insert Email Thread] into a concise message that highlights the main points and required actions. Also, draft a response that addresses these points efficiently.`,
  },
  {
    id: 7,
    title: "Learning Plan (Beginner → Competent)",
    category: "Learning",
    tags: ["syllabus","study"],
    prompt:
`Create a 14-day beginner syllabus for {topic}. For each day: objective, key idea, 1 resource, 1 exercise, 10-minute quiz prompt.`,
  },
  // Speed Learning — Construct / Connect / Challenge (samples)
  {
    id: 8,
    title: "Construct: Next 10 Concepts",
    category: "Learning",
    tags: ["roadmap"],
    prompt:
`I'm a beginner at {topic}. I currently understand it as: <my words>. What are the next 10 concepts I should learn? Define each and explain why this order.`,
  },
  {
    id: 9,
    title: "Connect: 3 Analogies",
    category: "Learning",
    tags: ["analogy"],
    prompt:
`Create 3 analogies to explain {concept}. For each, give the strength and limitation. Then relate the concept to the bigger picture.`,
  },
  {
    id: 10,
    title: "Challenge: Critique My Understanding",
    category: "Learning",
    tags: ["feedback","critical thinking"],
    prompt:
`I'm learning {topic}. Here's my current understanding: <text>. Critique it—strengths, weaknesses, likely misconceptions, and next concepts to study.`,
  },
];
