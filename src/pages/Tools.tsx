import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Header } from "@/components/Header";

const CATS: Record<string, [string, string][]> = {
  "AI & Agents": [
    ["Google AI Studio", "https://ai.google.dev/"],
    ["Claude", "https://claude.ai/"],
    ["ElevenLabs (TTS)", "https://elevenlabs.io/"],
    ["NotebookLM", "https://notebooklm.google/"],
  ],
  "Courses & Learning": [
    ["Udemy (My Learning)", "https://www.udemy.com/home/my-courses/learning/"],
    ["Gamma", "https://gamma.app/"],
    ["Mastermind.com", "https://www.mastermind.com/"],
  ],
  "Productivity": [
    ["Otter.ai", "https://otter.ai/"],
    ["Send to Kindle", "https://www.amazon.com/sendtokindle"],
    ["Mindgrasp", "https://mindgrasp.ai/"],
    ["ShowMyPC", "https://showmypc.com/"],
  ],
  "Research & Writing": [
    ["Figma", "https://www.figma.com/"],
    ["Euless Public Library", "https://www.eulesstx.gov/library"],
    ["Reddit", "https://www.reddit.com/"],
  ],
  "Utilities": [
    ["Temp Mail", "https://temp-mail.org/"],
    ["Napkin AI", "https://www.napkin.ai/"],
    ["Playlist Manager", "#"],
  ],
};

export default function Tools() {
  const [q, setQ] = useState("");
  const items = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return CATS;
    const filtered: Record<string, [string, string][]> = {};
    for (const [cat, links] of Object.entries(CATS)) {
      const keep = links.filter(([name]) => name.toLowerCase().includes(query));
      if (keep.length) filtered[cat] = keep;
    }
    return filtered;
  }, [q]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <header className="py-10">
        <div className="container mx-auto px-4 max-w-6xl">
          <h1 className="text-3xl md:text-4xl font-bold">Tools</h1>
          <p className="text-muted-foreground mt-2">Everything I use—organized by bucket.</p>
          <div className="relative mt-6 max-w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search tools…"
              className="pl-10 h-12"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              aria-label="Search tools"
            />
          </div>
        </div>
      </header>

      <main className="pb-24">
        <div className="container mx-auto px-4 max-w-6xl grid gap-6">
          {Object.entries(items).map(([cat, links]) => (
            <Card key={cat} className="p-6 border-2">
              <h2 className="text-xl font-semibold mb-4">{cat}</h2>
              <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {links.map(([name, href]) => (
                  <li key={name}>
                    <a href={href} target="_blank" rel="noopener" className="block p-3 rounded-lg border hover:bg-secondary transition">
                      {name} ↗
                    </a>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
