import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function TopPrompts() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>My Top 10 (Insanely Simple) Prompts I Use Every Week | Zain Adtani</title>
        <meta name="description" content="Discover the AI prompts that save me hours of work every single week." />
      </Helmet>

      <main className="container mx-auto px-4 py-16 max-w-3xl">
        <Link to="/blog">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Button>
        </Link>

        <article className="prose prose-lg dark:prose-invert max-w-none">
          <h1>My Top 10 (Insanely Simple) Prompts I Use Every Week</h1>
          
          <h2>The "Prompt Problem"</h2>
          <p>
            Most people collect prompts the way they collect apps: too many, too random, and no idea when to actually use them.
          </p>
          <p>
            The secret isn't in having 500 prompts… it's in mastering a small set that deliver consistent wins.
          </p>
          <p>
            Here are the <strong>10 prompts Dean leans on weekly</strong>, with context for how they work, what they do, and why they belong in your toolkit.
          </p>

          <h2>The Prompts</h2>

          <h3>1. Rewrite for Impact</h3>
          <p><strong>Prompt:</strong></p>
          <blockquote>
            "Rewrite this email in a more inspiring, conversational tone that feels like I'm talking to one person, not a list."
          </blockquote>
          <p><strong>Why/When to Use:</strong></p>
          <p>When your draft feels flat, robotic, or too corporate. This instantly makes your copy warm and human.</p>
          <p><strong>What It Does:</strong></p>
          <p>Transforms "company-speak" into authentic communication that builds connection and response.</p>

          <h3>2. Summarize Big Stuff Into Action</h3>
          <p><strong>Prompt:</strong></p>
          <blockquote>
            "Summarize this [document/transcript/meeting notes] into 5 key takeaways and 3 action steps I can implement right now."
          </blockquote>
          <p><strong>Why/When to Use:</strong></p>
          <p>After long meetings, transcripts, or research sessions. Keeps you from drowning in details.</p>
          <p><strong>What It Does:</strong></p>
          <p>Distills hours of content into a tight roadmap you can actually <em>use</em>.</p>

          <h3>3. Curiosity-Driven Headlines</h3>
          <p><strong>Prompt:</strong></p>
          <blockquote>
            "Give me 10 short, curiosity-driven headlines I could test for ads or social posts. Keep them punchy, simple, and free of hype."
          </blockquote>
          <p><strong>Why/When to Use:</strong></p>
          <p>When you need hooks for ads, posts, or videos that stop people mid-scroll.</p>
          <p><strong>What It Does:</strong></p>
          <p>Generates attention-grabbing headlines that create intrigue without feeling clickbaity.</p>

          <h3>4. Brainstorm Fresh Angles</h3>
          <p><strong>Prompt:</strong></p>
          <blockquote>
            "Act as my brainstorming partner. Generate 5 new angles to position this offer so it feels irresistible and simple."
          </blockquote>
          <p><strong>Why/When to Use:</strong></p>
          <p>When your messaging feels stale or repetitive.</p>
          <p><strong>What It Does:</strong></p>
          <p>Unlocks new ways to talk about the same product so it always feels fresh to your audience.</p>

          <h3>5. Client-Friendly Follow-Up</h3>
          <p><strong>Prompt:</strong></p>
          <blockquote>
            "Draft a short, friendly reply to this client [paste text] that sounds encouraging but clear, and makes it easy for them to say yes to the next step."
          </blockquote>
          <p><strong>Why/When to Use:</strong></p>
          <p>When follow-ups feel awkward or you're stuck finding the right words.</p>
          <p><strong>What It Does:</strong></p>
          <p>Saves time while keeping communication warm and professional.</p>

          <h3>6. Create a Content Calendar</h3>
          <p><strong>Prompt:</strong></p>
          <blockquote>
            "Create a 30-day social content calendar for [business/topic]. Include 4 weekly themes, daily post ideas, and suggested formats (reel, story, carousel, blog)."
          </blockquote>
          <p><strong>Why/When to Use:</strong></p>
          <p>When you feel inconsistent or blank on what to post.</p>
          <p><strong>What It Does:</strong></p>
          <p>Gives you a plug-and-play content map that eliminates guesswork.</p>

          <h3>7. Spot the Blind Spots</h3>
          <p><strong>Prompt:</strong></p>
          <blockquote>
            "I'm considering [decision]. Break this down into: (1) Pros, (2) Cons, (3) Short-term risks, (4) Long-term risks, (5) Blind spots I may not see. Then recommend a next step."
          </blockquote>
          <p><strong>Why/When to Use:</strong></p>
          <p>When you're stuck on a big choice (hire/fire, launch/cancel, invest/not).</p>
          <p><strong>What It Does:</strong></p>
          <p>Turns fuzzy thinking into structured clarity so you can move forward confidently.</p>

          <h3>8. Repurpose Content Instantly</h3>
          <p><strong>Prompt:</strong></p>
          <blockquote>
            "Take this [article/podcast/transcript] and repurpose it into: (1) a LinkedIn post, (2) a Twitter thread, (3) a short Instagram reel script."
          </blockquote>
          <p><strong>Why/When to Use:</strong></p>
          <p>When you want more reach without creating everything from scratch.</p>
          <p><strong>What It Does:</strong></p>
          <p>Maximizes your content by multiplying formats and platforms in minutes.</p>

          <h3>9. Simplify for Speed</h3>
          <p><strong>Prompt:</strong></p>
          <blockquote>
            "Explain this concept [insert] as if I were a 10-year-old. Then show me one practical way to apply it in my business today."
          </blockquote>
          <p><strong>Why/When to Use:</strong></p>
          <p>When AI outputs feel too complex or you're learning something new.</p>
          <p><strong>What It Does:</strong></p>
          <p>Breaks down complexity into plain language you can act on immediately.</p>

          <h3>10. Draft the First 80%</h3>
          <p><strong>Prompt:</strong></p>
          <blockquote>
            "Draft the first version of [proposal/presentation/plan] using a clear structure. Leave space for me to personalize later."
          </blockquote>
          <p><strong>Why/When to Use:</strong></p>
          <p>When you're staring at a blank page and don't know where to start.</p>
          <p><strong>What It Does:</strong></p>
          <p>Kills blank-page paralysis by giving you a solid starting point you can refine.</p>

          <h2>Here's A Pro Tip</h2>
          <p>
            Don't just <em>use</em> these — build your own "Prompt Library."
          </p>
          <p>
            Start with Dean's list. Every time you find a winner, save it in a doc. Over time, you'll have a personalized toolkit of the exact language that works for <em>you</em>.
          </p>

          <h2>And Lastly… A Challenge For You</h2>
          <p>Pick one of the 10 prompts and try it today.</p>
          <ul>
            <li>Rewrite an email.</li>
            <li>Summarize a meeting.</li>
            <li>Brainstorm new hooks.</li>
          </ul>
        </article>
      </main>
    </div>
  );
}
