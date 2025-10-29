import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { LIFE_NOTES } from "@/data/life_notes";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { CopyBlock } from "@/components/CopyBlock";

export default function LifeNotes() {
  const [q, setQ] = useState("");
  const list = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return LIFE_NOTES;
    return LIFE_NOTES.filter(n =>
      [n.title, n.text, n.tags.join(" "), n.source].filter(Boolean).join(" ").toLowerCase().includes(t)
    );
  }, [q]);

  return (
    <div className="min-h-screen bg-background">
      <Helmet><title>Life Notes | Zain Adtani</title></Helmet>
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-2">Life Notes ✍️</h1>
        <p className="text-muted-foreground mb-6">Short ideas worth re-using. Search + copy.</p>

        <div className="max-w-xl mb-6">
          <Input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Search notes…" className="h-11" />
        </div>

        <div className="grid gap-4">
          {list.map((n) => (
            <Card key={n.id} className="p-5 rounded-2xl border">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    {n.tags.map(t => <Badge key={t} variant="outline">{t}</Badge>)}
                  </div>
                  <h2 className="text-lg font-semibold">{n.title}</h2>
                  <p className="text-sm text-muted-foreground mt-1 whitespace-pre-wrap">{n.text}</p>
                  {n.source && <p className="text-xs text-muted-foreground mt-2">Source: {n.source}</p>}
                </div>
                <CopyBlock text={n.text} />
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
