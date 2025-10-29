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
`I want you to act as if you are an old and wise life coach who has lived a full life. You have overcome many struggles and have hard-won wisdom. Answer questions as clearly as possible—and only answer if you're confident you know the answer.`,
  },
  {
    id: 2,
    title: "Expert in X (signal vs noise)",
    category: "Coaching",
    tags: ["clarity"],
    prompt:
`Act as an expert in {X}. Only answer if you're confident. Prioritize the 20% of information that creates 80% of results. Explain simply.`,
  },
  {
    id: 3,
    title: "80/20 Prioritizer",
    category: "Productivity",
    tags: ["pareto","planning"],
    prompt:
`Identify the 20% of my tasks that drive 80% of results. Here are my weekly tasks: <paste list>. Recommend which to prioritize and why.`,
    note: "Focuses on leverage.",
  },
  {
    id: 4,
    title: "Automation Scanner",
    category: "Automation",
    tags: ["tools","ops"],
    prompt:
`Review my daily activities: <paste>. Suggest what to automate and name specific tools/workflows.`,
  },
  {
    id: 5,
    title: "Delegation Map",
    category: "Delegation",
    tags: ["team","ops"],
    prompt:
`Given these project tasks: <paste>, identify what to delegate, to whom/role, and provide a ready-to-send delegation message with outcomes & deadline.`,
  },
  {
    id: 6,
    title: "Email TL;DR + Reply",
    category: "Email",
    tags: ["communication"],
    prompt:
`Summarize this email thread into 5 bullets with owners + due dates. Draft a concise reply that addresses each point. <paste thread>`,
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
