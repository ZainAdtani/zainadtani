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
      [n.title, n.body, n.tags.join(" "), n.section].filter(Boolean).join(" ").toLowerCase().includes(t)
    );
  }, [q]);

  const sectionOrder = [
    "Education & Career",
    "Productivity",
    "Mindset",
    "Health",
    "Standards",
    "Compassion & Perspective",
    "Confidence",
    "Courage",
    "Growth & Change"
  ];

  const grouped = useMemo(() => {
    const map = new Map<string, typeof list>();
    list.forEach(n => {
      if (!map.has(n.section)) map.set(n.section, []);
      map.get(n.section)!.push(n);
    });
    return sectionOrder
      .filter(s => map.has(s))
      .map(s => ({ section: s, notes: map.get(s)! }));
  }, [list]);

  return (
    <div className="min-h-screen bg-background">
      <Helmet><title>Life Notes | Zain Adtani</title></Helmet>
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-2">Life Notes ✍️</h1>
        <p className="text-muted-foreground mb-6">Short ideas worth re-using. Search + copy.</p>

        <div className="max-w-xl mb-6">
          <Input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Search notes…" className="h-11" />
        </div>

        <div className="space-y-8">
          {grouped.map(({ section, notes }) => (
            <div key={section}>
              <h2 className="text-2xl font-bold mb-4">{section}</h2>
              <div className="grid gap-4">
                {notes.map((n, idx) => {
                  const preview = n.body.length > 140 ? n.body.slice(0, 140) + "…" : n.body;
                  return (
                    <Card key={`${section}-${idx}`} className="p-5 rounded-2xl border">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            {n.tags.map(t => <Badge key={t} variant="outline">{t}</Badge>)}
                          </div>
                          <h3 className="text-lg font-semibold">{n.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{preview}</p>
                        </div>
                        <CopyBlock text={n.body} />
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
