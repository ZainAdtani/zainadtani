import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { RESOURCES } from "@/data/resources";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ExternalLink } from "lucide-react";
import { CopyBlock } from "@/components/CopyBlock";

export default function Resources() {
  const [q, setQ] = useState("");
  const list = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return RESOURCES;
    return RESOURCES.filter((r) =>
      [r.title, r.note, r.tags.join(" ")].filter(Boolean).join(" ").toLowerCase().includes(t)
    );
  }, [q]);

  return (
    <div className="min-h-screen bg-background">
      <Helmet><title>Resources | Zain Adtani</title></Helmet>
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-2">Resources 📎</h1>
        <p className="text-muted-foreground mb-6">Handy PDFs, links, and small tools. Search + one-tap copy.</p>
        <div className="max-w-xl mb-6">
          <Input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Search resources…" className="h-11" />
        </div>

        <div className="grid gap-4">
          {list.map((r) => (
            <Card key={r.id} className="p-5 rounded-2xl border hover:shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="secondary">{r.kind}</Badge>
                    {r.tags.map(t => <Badge key={t} variant="outline">{t}</Badge>)}
                  </div>
                  <h2 className="text-lg font-semibold">{r.title}</h2>
                  {r.note && <p className="text-sm text-muted-foreground mt-1">{r.note}</p>}
                </div>
                <div className="flex gap-2">
                  {r.copy && <CopyBlock text={r.copy} />}
                  {r.href && (
                    <Button asChild size="sm">
                      <a href={r.href} target={r.href.startsWith("/") ? "_self" : "_blank"} rel="noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" /> Open
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
