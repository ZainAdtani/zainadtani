import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { AI_PROMPTS } from "@/data/ai_prompts";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { CopyBlock } from "@/components/CopyBlock";

export default function AIPrompts() {
  const [q, setQ] = useState("");
  const list = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return AI_PROMPTS;
    return AI_PROMPTS.filter(p =>
      [p.title, p.category, p.tags.join(" "), p.note, p.prompt].filter(Boolean).join(" ").toLowerCase().includes(t)
    );
  }, [q]);

  return (
    <div className="min-h-screen bg-background">
      <Helmet><title>AI Prompts | Zain Adtani</title></Helmet>
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-2">AI Prompts ⚡</h1>
        <p className="text-muted-foreground mb-6">Battle-tested prompts. Search, tweak, copy.</p>

        <div className="max-w-xl mb-6">
          <Input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Search prompts…" className="h-11" />
        </div>

        <div className="grid gap-4">
          {list.map((p) => (
            <Card key={p.id} className="p-5 rounded-2xl border">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="secondary">{p.category}</Badge>
                    {p.tags.map(t => <Badge key={t} variant="outline">{t}</Badge>)}
                  </div>
                  <h2 className="text-lg font-semibold">{p.title}</h2>
                  {p.note && <p className="text-sm text-muted-foreground mt-1">{p.note}</p>}
                  <pre className="mt-3 p-3 rounded-lg bg-muted overflow-x-auto text-sm whitespace-pre-wrap">
{p.prompt}
                  </pre>
                </div>
                <CopyBlock text={p.prompt} />
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
