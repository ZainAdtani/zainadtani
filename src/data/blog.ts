// src/data/blog.ts
export type BlogPost = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  date: string;        // e.g., "January 2025"
  readTime: string;    // e.g., "5 min read"
  tags?: string[];
  audioUrl?: string;   // e.g., "/audio/top-10-prompts.mp3" (drop MP3s in /public/audio)
  content?: string[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    slug: "top-10-prompts",
    title: "My Top 10 (Insanely Simple) Prompts I Use Every Week",
    excerpt: "Discover the AI prompts that save me hours of work every single week.",
    date: "January 2025",
    readTime: "5 min read",
    tags: ["AI", "Productivity"],
    audioUrl: "/audio/top-10-prompts.mp3",
    content: [
      "AI tools are only as good as the prompts you give them. After using ChatGPT, Claude, and other AI assistants daily for the past year, I've refined my prompts down to 10 simple templates that I use constantly.",
      "These aren't fancy or complicated. They're practical, repeatable, and save me hours every single week. Let me share them with you.",
      "Prompt #1: The Quick Summarizer - 'Summarize this in 3 bullet points, focusing on actionable takeaways.' Perfect for long emails, articles, or meeting notes.",
      "Prompt #2: The Email Drafter - 'Write a professional email to [person] about [topic], keeping it under 100 words and friendly in tone.' Saves me 10+ minutes per email.",
      "Prompt #3: The Idea Expander - 'Take this rough idea and give me 5 different ways to approach it.' Great for brainstorming when you're stuck.",
      "Prompt #4: The Content Outliner - 'Create an outline for a [type] about [topic] with 5 main sections.' Perfect for blog posts, presentations, or reports.",
      "Prompt #5: The Clarity Check - 'Rewrite this to be clearer and more concise while keeping the same meaning.' Use this before hitting send on anything important.",
      "Prompt #6: The Decision Helper - 'I need to decide between [option A] and [option B]. List 5 pros and cons for each.' Helps you think through choices objectively.",
      "Prompt #7: The Learning Accelerator - 'Explain [complex topic] like I'm 12 years old, then give me 3 follow-up questions to deepen my understanding.' Great for learning new subjects fast.",
      "Prompt #8: The Meeting Prep - 'Based on this agenda, give me 3 key questions I should ask and 2 potential objections I should prepare for.' Makes meetings way more productive.",
      "Prompt #9: The Problem Solver - 'I'm facing [problem]. Walk me through a step-by-step process to solve it.' Breaks down overwhelming issues into manageable steps.",
      "Prompt #10: The Task Breakdown - 'I need to [big goal]. Break this into 5 specific tasks I can complete in under 30 minutes each.' Turns daunting projects into action items.",
      "The key to all these prompts? They're specific, they set clear expectations, and they save you from vague, unhelpful AI responses. Copy them, tweak them, and watch your productivity soar.",
    ],
  },
  {
    id: 2,
    slug: "chatgpt-vs-claude",
    title: "ChatGPT vs Claude: Which AI Should You Use (and When)?",
    excerpt: "A practical comparison of the two leading AI assistants and when to use each one.",
    date: "January 2025",
    readTime: "7 min read",
    tags: ["AI", "Tools"],
    audioUrl: "/audio/chatgpt-vs-claude.mp3",
    content: [
      "Both ChatGPT and Claude are excellent AI assistants, but they have different strengths. Here's my practical guide on when to use each one, based on daily use.",
      "ChatGPT Strengths: ChatGPT excels at creative tasks, brainstorming, and general knowledge. It's my go-to for drafting content, generating ideas, and quick research. The interface is faster and more widely integrated into other tools.",
      "Claude Strengths: Claude is better at nuanced analysis, longer context windows, and following complex instructions. I use it for detailed work like analyzing contracts, writing technical documentation, or working through multi-step problems.",
      "Use ChatGPT when: You need quick answers, creative writing, casual brainstorming, or when you're working with tools that integrate ChatGPT (like Notion, Zapier, etc.).",
      "Use Claude when: You're analyzing long documents, need careful reasoning, want more thoughtful responses, or are working on sensitive information (Claude has stronger privacy commitments).",
      "Real-World Example: For a blog post like this, I'd use ChatGPT to generate initial ideas and outlines (faster, more creative). Then I'd use Claude to refine the writing and ensure accuracy (more careful, better at following tone guidelines).",
      "The Bottom Line: Don't pick one over the other. Use both strategically based on the task. ChatGPT for speed and creativity, Claude for depth and precision. Having both in your toolkit makes you unstoppable.",
    ],
  },
  {
    id: 3,
    slug: "email-chaos-to-clarity",
    title: "From Chaos to Clarity: Cut Your Inbox Time by 70% Using AI",
    excerpt: "My exact system for managing email efficiently with AI assistance.",
    date: "January 2025",
    readTime: "6 min read",
    tags: ["Systems", "Productivity"],
    audioUrl: "/audio/email-chaos-to-clarity.mp3",
    content: [
      "Email overwhelm is solvable. I used to spend 2+ hours a day in my inbox. Now I spend 30 minutes. Here's my exact AI-powered system.",
      "The Problem: Most people treat email like a never-ending task list. They respond to everything immediately, context-switch constantly, and never get ahead. Sound familiar?",
      "My Solution: A simple 3-step AI loop that processes emails in batches, prioritizes ruthlessly, and automates responses. Here's how it works.",
      "Step 1 - The Morning Triage (5 minutes): Open your inbox once in the morning. Copy all unread subject lines into ChatGPT with this prompt: 'Categorize these emails into Urgent, Important, and Can Wait. List only the urgent and important ones.' This gives you instant clarity on what actually needs attention.",
      "Step 2 - The AI Draft (15 minutes): For each email that needs a response, paste it into Claude with: 'Draft a response to this email in my voice (professional but friendly, concise). Give me 2 options: a detailed response and a quick one.' Pick the version you like, tweak if needed (usually takes 30 seconds), and send. This alone saves me an hour a day.",
      "Step 3 - The Afternoon Check (10 minutes): Do another quick triage in the afternoon using the same system. Most 'urgent' emails aren't actually urgent. You'll find that 80% of emails can wait until tomorrow's batch, and many resolve themselves if you wait 24 hours.",
      "Bonus Tips: Use email filters to auto-archive newsletters and notifications (read them later in a dedicated batch). Turn off all email notifications. Check email at set times only (morning, afternoon). Use the 2-minute rule: if it takes less than 2 minutes, do it now. Everything else gets batched.",
      "Results: I went from 2+ hours daily to 30 minutes. My response time actually improved because I'm focused when I do respond, not distracted by constant interruptions. Email stopped controlling my day.",
      "Try this system for one week. You'll never go back to the old way.",
    ],
  },
  {
    id: 4,
    slug: "ea-part1-strategy",
    title: "Engineer → EA: Why Part 1 (Individuals) Is the Make-or-Break",
    excerpt: "If you master Individuals, everything else gets easier. Here's how I'm approaching it.",
    date: "January 2025",
    readTime: "5 min read",
    tags: ["EA Exam", "Study"],
    audioUrl: "/audio/ea-part1-strategy.mp3",
    content: [
      "I'm studying for the EA exam while working full-time as an engineer. Part 1 (Individuals) is foundational—if you nail it, Parts 2 and 3 become much easier.",
      "Why Part 1 matters: Individual taxation covers filing status, dependents, income types, deductions, credits, and retirement accounts. These concepts show up everywhere in business and representation too.",
      "My strategy: Focus on high-yield topics first. I'm spending 80% of my time on the 20% of topics that show up most: standard deduction vs itemized, QBI, capital gains, retirement contributions, and common credits (EITC, CTC, education credits).",
      "Study loop: 30 minutes daily of focused practice. I do 10-15 MCQs, review explanations for wrong answers, then write one-line summaries of what I learned. Tiny reps, big gains.",
      "Resources I'm using: Gleim for practice questions, IRS Pub 17 for clarifications, and my own notes condensed into flashcards. I also built a mini tax practice game (Tax Quest) to make studying less boring.",
      "Timeline: I'm aiming to take Part 1 in 6-8 weeks. Not rushing, but staying consistent. The goal isn't perfection—it's passing with confidence and building a foundation for the next parts.",
    ],
  },
  {
    id: 5,
    slug: "8020-study-loop",
    title: "The 80/20 Study Loop: Tiny Reps, Big Gains",
    excerpt: "A minimal, repeatable loop for daily study momentum (works for any hard topic).",
    date: "January 2025",
    readTime: "4 min read",
    tags: ["Learning", "Mindset"],
    audioUrl: "/audio/8020-study-loop.mp3",
    content: [
      "Studying for hard exams (EA, CPA, LSAT, etc.) doesn't require 4-hour blocks. It requires daily momentum. Here's my 30-minute study loop that actually works.",
      "The Problem: Most people study in giant, exhausting sessions when they're motivated, then burn out and quit. Consistency beats intensity every time.",
      "The 80/20 Study Loop: Do this every single day, even weekends. Takes 30 minutes max.",
      "Step 1 - Active Practice (20 min): Do 10-15 practice questions on your weakest topic. Don't study theory first—jump straight into problems. You'll learn faster by struggling.",
      "Step 2 - Review Wrong Answers (5 min): For each wrong answer, read the explanation and write a one-sentence summary in your own words. This forces you to process it, not just skim.",
      "Step 3 - Note One Key Insight (5 min): At the end, write down the single most important thing you learned today. Just one. This builds a condensed study guide over time.",
      "Why it works: Small daily reps build neural pathways faster than cramming. You're training your brain like a muscle—consistency matters more than intensity.",
      "Bonus: Use spaced repetition. Review your one-line summaries every 3 days, then every week. This locks the knowledge in long-term memory.",
      "I've used this loop for every hard exam I've passed. It's boring, it's simple, and it works. Try it for 2 weeks and see for yourself.",
    ],
  },
];
