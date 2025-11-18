import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { RESOURCES } from "@/data/resources";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ExternalLink, Info } from "lucide-react";
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

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {list.map((r) => (
            <Card key={r.id} className="p-5 rounded-2xl border-2 hover:-translate-y-1 hover:shadow-xl transition-all duration-200 flex flex-col h-full">
              {/* Content area that grows */}
              <div className="flex-1 mb-4">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <Badge variant="secondary">{r.kind}</Badge>
                  {r.tags.map(t => <Badge key={t} variant="outline">{t}</Badge>)}
                </div>
                <h2 className="text-lg font-semibold mb-2">{r.title}</h2>
                {r.note && <p className="text-sm text-muted-foreground">{r.note}</p>}
              </div>
              
              {/* Button area fixed at bottom */}
              <div className="flex gap-2 items-stretch">
                {r.copy && <CopyBlock text={r.copy} />}
                {r.moreInfo && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Info className="w-4 h-4 mr-2" /> More info
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>{r.title}</DialogTitle>
                      </DialogHeader>
                      <p className="text-sm text-muted-foreground leading-relaxed">{r.moreInfo}</p>
                    </DialogContent>
                  </Dialog>
                )}
                {r.href && (
                  <Button asChild size="sm" className={r.moreInfo ? "flex-1" : "w-full"}>
                    <a href={r.href} target="_blank" rel="noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" /> {r.kind === "PDF" ? "Download" : "Open"}
                    </a>
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
