// src/data/blog.ts
export type BlogPostSection = {
  id: string;
  title: string;
  paragraphs: string[];
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
      { id: "intro", title: "", paragraphs: ["Class, pull up a chair. Today we're talking about Tim—an adult who did something incredibly brave: he stopped pretending he was fine and faced painful memories from when he was a kid. It wasn't a \"quick fix.\" It was more like learning to walk again after a bad fall—slow, shaky, and super brave."] },
      { id: "storm", title: "The Storm He Couldn't Outrun", paragraphs: ["For years, Tim tried to out-hustle his feelings—more work, more trophies, more distractions. But storms don't disappear just because you run faster. One day, the wind caught him. Old memories showed up like uninvited guests, and his body sounded the alarm (fast heartbeat, jumpiness, zoning out). He finally said, \"I can't do this alone.\"", "So he invited a trusted friend, Debbie, to sit with him while he told the truth out loud. She wasn't there to \"fix\" him—she was there to be a steady hand on a shaky bridge. Two people. One flashlight. Lots of courage."] },
      { id: "toolkit", title: "The Teacher's Toolkit (that isn't therapy homework)", paragraphs: ["I'm your teacher here, not your doctor. So I'm not giving medical advice. I'm explaining ideas that help people move from \"hurt\" to \"healing,\" slowly and safely:", "• Safe grown-ups: real pros (like trauma-informed therapists) and real friends who answer the phone at 2 a.m. You don't go cave-exploring without a guide.", "• Body check-ins: feelings speak \"body language.\" When your heart races or you space out, that's information—not failure.", "• Tiny wins: if today you breathed through a tough minute, that's progress."] },
      { id: "map", title: "The Life Map Behind the Story (Christensen's wisdom)", paragraphs: ["1) Purpose = Your \"Why,\" Drawn Like a Picture", "Christensen says purpose has three parts: a clear picture of who/what you're aiming to become, a real commitment to it, and a few simple ways to measure progress. Think of it like sketching the finished puzzle on the box, promising you'll build it, and using a small scorecard to track pieces you place each day.", "Tim's version: Picture: \"I want to be someone who tells the truth about hard things.\" Commitment: \"Even when it's scary, I'll keep going.\" Measures: \"Did I share honestly today? Did I take care of my body? Did I reach out for help?\"", "2) Strategy = Where Your Time Actually Goes", "Lots of people \"plan\" one life but \"spend\" their time on another. Your real strategy is how you allocate time and energy. Tim's fix: he started spending time on healing—appointments, rest, honest conversations. That time-shift was the new strategy.", "3) Relationships = Ask \"What job do they need me to do?\"", "Christensen's \"jobs to be done\" idea says we \"hire\" things (and people) to do jobs in our lives. In families, one job might be \"Please hear me without judging.\" With Debbie, the job was steady, kind listening—so Tim could keep walking across that scary bridge.", "4) Integrity = Don't Do \"Just This Once\"", "A dangerous trick our brains play: \"I'll ignore what I need—just this once.\" Little exceptions add up. It's easier to be true to yourself 100% of the time than 98%. In healing: don't ghost your feelings \"just this once.\" Keep your promise to you."] },
      { id: "teen", title: "How a 13-Year-Old Can Use This (No heavy details, just skills)", paragraphs: ["• Name your picture: \"I'm becoming someone who tells the truth kindly.\"", "• Spend your minutes on it: 10 minutes journaling, 5 minutes breathing, one honest check-in with a safe adult. Your time is your strategy.", "• Ask the job question: \"What job does my friend/sibling/parent need from me today—listening, space, or help?\"", "• Keep your promises to you: Don't skip your tiny self-care today \"just this once.\" Future-you is counting on it."] },
      { id: "heart", title: "The Heart of It", paragraphs: ["Tim's story isn't about being perfect. It's about being brave enough to start, gentle enough to go slow, and wise enough to let helpers help. The goal isn't to \"win healing\"—it's to keep choosing the next kind step. If by bedtime you have one more ounce of hope than you woke up with, that's a good day."] },
      { id: "safety", title: "Gentle Safety Note", paragraphs: ["If anything here touches something heavy for you, talk to a trusted adult or a licensed professional. Healing is real—and you don't have to do it alone."] },
    ],
  },
  {
    id: 2,
    slug: "when-the-darkness-closes-in",
    title: "When the Darkness Closes In",
    excerpt: "What helped someone stay—and what might help you, too. Clear, practical ideas for getting through the hardest nights.",
    date: "October 2025",
    readTime: "7–9 min read",
    status: "published",
    tags: ["Mindset", "Support"],
    audioUrl: "/audio/when-the-darkness-closes-in.mp3",
    sections: [
      { id: "intro", title: "", paragraphs: ["If you're in immediate danger or thinking about self-harm: call or text 988 in the U.S. (24/7). If you're outside the U.S., search your country's crisis line. You are not alone.", "I want to talk to you the way a good teacher would: clear voice, steady hands, no judgment. This is about suicidal thoughts—why they can feel final, why they aren't, and what tiny moves can keep you here until the weather changes.", "This is my retelling, but the spark comes from Tim Ferriss's essay \"Some Practical Thoughts on Suicide.\" He didn't share a highlight reel. He shared a hard truth—and it helped people. I'm passing that light forward."] },
      { id: "crack", title: "The moment that cracked the silence", paragraphs: ["Tim met a reader whose younger brother had died by suicide. The reader asked, \"Would you talk about this? You might save someone.\" That one request turned into a promise: stop hiding, start telling the truth. Sometimes a single honest question opens a door you thought was made of stone."] },
      { id: "why", title: "Why suicidal thoughts feel so final (and why they aren't)", paragraphs: ["1) Pressure shrinks your world. When stress piles up, your brain narrows the story to one awful sentence: \"It'll always be this way.\" That's tunnel vision, not reality. Your world is bigger than your worst day.", "2) Pain sounds like facts. \"I'm a burden. There's no way out.\" Those lines feel solid—but they're feelings, not facts. Facts can be checked. Feelings need care.", "3) We forget the blast radius. In the dark, it's easy to believe your exit would tidy the mess. It won't. It multiplies pain—for family, friends, first responders, even strangers. Your staying matters more than you can see from the storm.", "4) It's a bad bet on the unknown. Here, today, there are variables you can still change—food, sleep, movement, people, plans. There, you can't. Don't make a permanent decision from temporary weather.", "5) Interruptions save lives. A random phone call. A stubborn friend at the door. A hotline operator who keeps you talking. These \"interruptions\" are actually tools. Build them in on purpose."] },
      { id: "helped", title: "What helped him stay (and might help you)", paragraphs: ["No magic. Just friction—small wedges that slow the slide.", "1) Make connection non-negotiable. If you're on the edge, call or text 988. Say, \"I don't feel safe.\" If that feels too raw, say anything that keeps a human voice with you. Awkward is fine. Alive is the goal.", "2) Borrow a vow. Some people make a no-suicide promise to someone they love. When your own hope is low, borrow theirs. \"I won't do this to you\" can carry you through a bad hour.", "3) Use your body to unstick your mind. Walk. Stretch. Do a few pushups. Take a hot shower. You're not chasing a medal; you're changing chemistry. Ten minutes can move the needle.", "4) Win one square. Pick one meaningful task. Block 90–120 minutes for just that. No tabs. No ping-ponging. One square on the chessboard. A single forward move changes the whole position.", "5) Remember: storms pass. Tim finished the hard thing he thought would break him. Time did what time does. Your future self deserves the chance to be surprised by how this turns."] },
      { id: "daily", title: "A tiny daily plan (seatbelt, not sparkle)", paragraphs: ["Before screens", "Drink water. Sit with a pen and paper.", "Write the 3–5 scariest or heaviest items.", "Circle the one that would make the day a win if you moved it even a little.", "Block 2–3 hours for that one thing. Put your phone in another room.", "When your brain wanders, gently return. (Gentle is part of the plan.)"] },
      { id: "anchors", title: "Mood anchors (low effort, high leverage)", paragraphs: ["Move 20+ minutes. Outside if you can.", "Eat to steady. Protein, real foods, fewer sugar spikes.", "One human touchpoint. Text someone, or sit near people (library, café).", "One small kindness. Send a two-line thank-you. Gratitude pulls you toward the living."] },
      { id: "reframes", title: "Reframes that help when hope is thin", paragraphs: ["You are not the storm. You are the sky it passes through.", "\"I'm a burden\" is a feeling. The fact: people would crawl across the world to keep you.", "You can quit a plan without quitting life. Drop classes, switch jobs, leave a city. Don't leave the whole story.", "Borrow oxygen. If you can't breathe for you today, breathe for the ones who can't bear losing you."] },
      { id: "supporting", title: "If you're supporting someone", paragraphs: ["Ask directly: \"Are you thinking about suicide?\" You won't put the idea there.", "Stay with them (call, text, sit) while help is contacted.", "Remove means if it's safe.", "Keep interrupting the spiral: warmth + logistics.", "Follow up tomorrow. And the next day. Repetition saves lives."] },
      { id: "resources", title: "Quick resources", paragraphs: ["U.S. Suicide & Crisis Lifeline: call/text 988 (24/7) or chat online.", "If you're outside the U.S., search \"suicide hotline + [your country].\"", "Consider talking with a licensed, trauma-informed professional. You don't have to carry this alone."] },
      { id: "tonight", title: "If tonight feels impossible", paragraphs: ["Text 988.", "Or make a no-suicide vow to someone who loves you.", "Or put on shoes. Walk to the end of the block and back. That's it.", "You still have chapters you haven't met yet—people you'll laugh with, places you'll love, quiet mornings that feel like mercy. Stay for those. Stay for the you who gets to see them.", "With respect to Tim Ferriss for telling the truth out loud, and to everyone who ever interrupted a plan. May we keep interrupting, together."] },
    ],
  },
  {
    id: 3,
    slug: "save-5-hours-automation-audit",
    title: "The Automation Audit: Identify the 3 Things You Should Never Do Manually Again",
    excerpt: "Most entrepreneurs are still doing tasks every week that don't actually need them. Here's how to find what to automate first.",
    date: "November 2025",
    readTime: "6 min read",
    status: "published",
    tags: ["Productivity", "Automation", "AI"],
    sections: [
      { id: "problem", title: "Here's The Problem...", paragraphs: ["Most entrepreneurs and professionals are still doing tasks every week that don't actually need them.", "They're stuck inside a mental loop that says, \"It'll be faster if I just do it myself.\" But it's never faster in the long run.", "Repetitive work quietly drains focus, decision-making energy, and creativity. Every time you retype the same email, schedule the same meeting, or copy-paste the same data, you're burning mental fuel that could be spent on real progress.", "Tony often says, \"You can't grow if you're doing what keeps you small.\"", "Automation isn't about replacing effort. It's about reclaiming energy for the work that actually moves your business forward."] },
      { id: "shift", title: "Here's the Shift...", paragraphs: ["AI is no longer just a tool for tech experts. It's your personal operations assistant. It can find the repetitive tasks that are slowing you down, organize them, and even recommend what to automate first.", "Once you see how much of your week is filled with repeat work, you'll start to notice how much of your potential has been trapped inside it."] },
      { id: "hack", title: "So Here's Your Hack", paragraphs: ["We're going to build a 3-step AI-powered Automation Audit that reveals where you're wasting time and how to reclaim it.", "This process helps you:", "• Identify hidden bottlenecks that drain hours weekly.", "• Classify tasks by automation potential.", "• Build your first \"AI Task Stack\" — a list of automations that will save you time every single week."] },
      { id: "step1", title: "Step 1 – Create Your Task Inventory", paragraphs: ["Open ChatGPT and paste this prompt:", "\"I want to find the top 3 tasks I should automate. I'll list everything I do in a typical week. Please organize each task by category (Admin, Communication, Creative, Strategy) and estimate how much time it consumes weekly.\"", "Example categories AI might create:", "• Admin (scheduling, invoices, file organization)", "• Communication (emails, follow-ups, meeting prep)", "• Creative (content creation, brainstorming)", "• Strategy (planning, reporting, reviewing metrics)", "By seeing your tasks laid out, you'll notice how much of your week is spent maintaining instead of creating."] },
      { id: "step2", title: "Step 2 – Find What's Ripe for Automation", paragraphs: ["Now paste this prompt:", "\"Based on my task list, identify which items could be automated with AI tools or workflows. For each, suggest one possible tool or system that could handle it.\"", "Examples:", "• Scheduling meetings → Calendly or Motion", "• Summarizing notes → Fathom or Fireflies", "• Rewriting posts → ChatGPT or Jasper"] },
      { id: "protip", title: "", paragraphs: ["> **Pro Tip**  \n> Ask: \"Rank these automation opportunities from easiest to implement to highest impact.\"  \n> That way, you start with quick wins that save you time immediately."] },
      { id: "step3", title: "Step 3 – Build Your \"AI Task Stack\"", paragraphs: ["Once you've got your list, say:", "\"Turn these automation opportunities into a simple table with three columns: Task, Tool, and Time Saved per Week.\"", "You'll now have a personal Automation Dashboard — your roadmap to reclaim hours every week."] },
      { id: "example", title: "Real-World Example", paragraphs: ["Before AI: Alex, a business coach, spent 10+ hours each week scheduling calls, writing recap notes, and drafting client updates. His calendar looked full, but his creativity was fried.", "After AI: He ran the Automation Audit and realized 70% of those tasks could be handled automatically. Now, his week starts with clarity, his follow-ups happen without fail, and his creativity is back where it belongs — serving clients, not chasing admin tasks."] },
      { id: "mistake", title: "Mistake to Avoid", paragraphs: ["Don't try to automate everything at once. Start small, automate one system, test it, then layer the next. You want evolution, not chaos."] },
      { id: "action", title: "Action Step", paragraphs: ["Make your list right now. Drop your top 10 recurring tasks into ChatGPT and run the prompts above. Circle the three that will save you the most time or mental energy. That's your Automation Starter Stack for this week."] },
      { id: "insight", title: "", paragraphs: ["> **💡 AI Amplifier Insight**  \n> Prompt: \"Analyze my weekly task list and identify which 3 tasks would save me the most time, energy, and focus if automated. Rank them by impact and ease of implementation.\"  \n> This single exercise often gives people back 3–5 hours a week… and an enormous sense of peace."] },
    ],
  },
];
