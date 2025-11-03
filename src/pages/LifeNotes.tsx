import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { LIFE_NOTES, LifeNote } from "@/data/life_notes";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { CopyBlock } from "@/components/CopyBlock";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X } from "lucide-react";

const LONG_THRESHOLD = 240;

function isLong(body: string) {
  return body.trim().length > LONG_THRESHOLD;
}

function preview(body: string) {
  if (!isLong(body)) return body.trim();
  const slice = body.trim().slice(0, 200);
  const cut = slice.lastIndexOf(" ");
  return (cut > 160 ? slice.slice(0, cut) : slice) + "…";
}

export default function LifeNotes() {
  const [q, setQ] = useState("");
  const [activeNote, setActiveNote] = useState<LifeNote | null>(null);
  
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
                  const bodyPreview = preview(n.body);
                  const long = isLong(n.body);
                  return (
                    <Card key={`${section}-${idx}`} className="p-5 rounded-2xl border">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            {n.tags.map(t => <Badge key={t} variant="outline">{t}</Badge>)}
                          </div>
                          <h3 className="text-lg font-semibold mb-3">{n.title}</h3>
                          <div className="rounded-xl bg-rose-50 text-rose-900 dark:bg-rose-100/10 dark:text-rose-100 border border-rose-100 dark:border-rose-200/10 p-3 leading-relaxed whitespace-pre-line">
                            {bodyPreview}
                          </div>
                          {long && (
                            <button
                              onClick={() => setActiveNote(n)}
                              className="mt-2 text-sm text-rose-700 hover:underline dark:text-rose-300"
                            >
                              Continue reading
                            </button>
                          )}
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

      <Dialog open={!!activeNote} onOpenChange={(open) => !open && setActiveNote(null)}>
        <DialogContent className="max-w-2xl w-[92vw] rounded-2xl bg-white dark:bg-[#0b0f16] shadow-2xl border border-white/10">
          <button
            onClick={() => setActiveNote(null)}
            className="absolute right-4 top-4 h-8 w-8 grid place-items-center rounded-full hover:bg-white/60 hover:dark:bg-white/10 transition-colors"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
          {activeNote && (
            <div className="pt-6">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold mb-4">{activeNote.title}</DialogTitle>
              </DialogHeader>
              <div className="rounded-xl bg-rose-50 text-rose-900 dark:bg-rose-100/10 dark:text-rose-100 border border-rose-100 dark:border-rose-200/10 p-4 leading-relaxed whitespace-pre-line">
                {activeNote.body}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
