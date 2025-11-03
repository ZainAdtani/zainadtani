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
  // Additional Construct prompts
  {
    id: 11,
    title: "Construct: 10 Key Concepts List",
    category: "Learning",
    tags: ["roadmap","beginner"],
    prompt:
`Give me a bullet list of the 10 most important concepts to start learning as a complete beginner to the topic of XX. Briefly define each concept and then explain to me why I should learn them in this order.`,
  },
  {
    id: 12,
    title: "Construct: Simple Explanation + Big Picture",
    category: "Learning",
    tags: ["fundamentals","context"],
    prompt:
`Explain the concept of XX in simple terms for a beginner. Then explain how it relates to the big picture of XX.`,
  },
  {
    id: 13,
    title: "Construct: Next Learning Path",
    category: "Learning",
    tags: ["roadmap","progression"],
    prompt:
`I just started learning about the topic of XX. Which concepts should I learn next and in which order to get a more well-rounded perspective of the topic?`,
  },
  // Additional Connect prompts
  {
    id: 14,
    title: "Connect: Relate to Other Concepts",
    category: "Learning",
    tags: ["relationships","understanding"],
    prompt:
`I'm having trouble understanding the concept of XX and how it relates to [other concepts]. Explain it to me in simple terms and then explain how it relates to these other concepts.`,
  },
  {
    id: 15,
    title: "Connect: 3 Examples + Use Cases",
    category: "Learning",
    tags: ["examples","practical"],
    prompt:
`I'm having difficulty understanding XX. Explain it to me in simple terms and provide 3 examples and real world use cases to help me understand it better.`,
  },
  {
    id: 16,
    title: "Connect: Compare & Contrast Table",
    category: "Learning",
    tags: ["comparison","analysis"],
    prompt:
`Create a table to compare and contrast XX, XX, XX. Then explain why the relationship between these concepts is important and how it helps me understand [big picture concept] as a whole.`,
  },
  {
    id: 17,
    title: "Connect: Explore Related Concepts",
    category: "Learning",
    tags: ["depth","connections"],
    prompt:
`I understand that the concept of XX is related to XX because of XX. Help me explore related concepts to XX that would create a more well rounded understanding of it and explain why.`,
  },
  {
    id: 18,
    title: "Connect: Multiple Perspectives",
    category: "Learning",
    tags: ["perspective","depth"],
    prompt:
`You are an expert in XX topic. I just learned that XX is XX and relates to the concepts of XX in XX way. Give me other perspectives I can look at XX to get a more complete and well-rounded understanding.`,
  },
  {
    id: 19,
    title: "Connect: Industry Implications",
    category: "Learning",
    tags: ["application","context"],
    prompt:
`Discuss the implications of XX on XX industry / relevant field.`,
  },
  // Additional Challenge prompts
  {
    id: 20,
    title: "Challenge: Critical Evaluation",
    category: "Learning",
    tags: ["critical thinking","analysis"],
    prompt:
`You are an expert at XX. Guide me in critically evaluating the strengths and weaknesses of [theory, concept, or argument] related to [topic]?`,
  },
  {
    id: 21,
    title: "Challenge: Analyze Consequences",
    category: "Learning",
    tags: ["analysis","implications"],
    prompt:
`Help me analyze the implications and potential consequences of [topic] in [specific context].`,
  },
  {
    id: 22,
    title: "Challenge: Develop Argument",
    category: "Learning",
    tags: ["reasoning","perspective"],
    prompt:
`Provide different perspectives on [topic] and help me develop a well-reasoned argument.`,
  },
  {
    id: 23,
    title: "Challenge: Practice Test",
    category: "Learning",
    tags: ["testing","evaluation"],
    prompt:
`You are an expert professor in XX. Create a 10 question short answer practice test on the topics of XX to evaluate how well I understand why this topic is important.`,
  },
  {
    id: 24,
    title: "Challenge: Test Answers + Explanations",
    category: "Learning",
    tags: ["feedback","learning"],
    prompt:
`Thanks I just took the test. Now provide me with the answers along with detailed explanations about why the answers are correct and common pitfalls that students make who answer them incorrectly.`,
  },
  {
    id: 25,
    title: "Challenge: Thought Process Check",
    category: "Learning",
    tags: ["self-assessment","feedback"],
    prompt:
`I am learning about XX. Is my thought process for this topic accurate? What are the strengths of my understanding and weaknesses of my understanding. And what are other concepts I should consider to form a well rounded perspective?`,
  },
];
