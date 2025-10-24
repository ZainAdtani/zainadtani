// src/components/BooksImport.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { parseManyBookmoryTxt } from "@/lib/imports/bookmory";
import { findCover } from "@/lib/covers";
import { BOOKS } from "@/data/books";
import { Upload } from "lucide-react";

export default function BooksImport({ onImported }: { onImported?: () => void }) {
  const [busy, setBusy] = useState(false);
  const [added, setAdded] = useState(0);

  async function handleFiles(files: FileList | File[]) {
    setBusy(true);
    try {
      const imported = await parseManyBookmoryTxt(files);
      let newCount = 0;

      for (const b of imported) {
        const exists = BOOKS.find(
          (x) =>
            (b.isbn && x.isbn && b.isbn === x.isbn) ||
            (x.title.toLowerCase() === b.title.toLowerCase() &&
              x.author.toLowerCase() === b.author.toLowerCase())
        );
        if (exists) continue;

        // Try to fetch cover now so user sees it immediately
        const cover = await findCover({ title: b.title, author: b.author, isbn: b.isbn });

        BOOKS.push({
          id: `import-${Date.now()}-${Math.random().toString(36).slice(2)}`,
          title: b.title,
          author: b.author || "Unknown",
          cover: cover || undefined,
          status: (b.status as any) || "TBR",
          progress: undefined,
          rating: b.rating,
          tags: b.tags || [],
          isbn: b.isbn,
          notes: undefined,
          link: undefined,
        });
        newCount++;
      }

      setAdded(newCount);
      onImported?.();
    } finally {
      setBusy(false);
      setTimeout(() => setAdded(0), 3000);
    }
  }

  return (
    <Card className="p-4 flex items-center justify-between gap-4">
      <div className="text-sm flex-1">
        <div className="font-medium flex items-center gap-2">
          <Upload className="w-4 h-4" />
          Import from Bookmory (.txt)
        </div>
        <div className="text-muted-foreground">Drop multiple .txt exports or click "Choose files".</div>
      </div>
      <div className="flex items-center gap-2">
        <input
          id="bookmory-files"
          type="file"
          accept=".txt"
          multiple
          className="hidden"
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
        />
        <Button asChild disabled={busy} size="sm">
          <label htmlFor="bookmory-files" className="cursor-pointer">
            {busy ? "Importing…" : "Choose files"}
          </label>
        </Button>
        {added > 0 && <div className="text-xs text-green-600 dark:text-green-400 font-medium">{added} added</div>}
      </div>
    </Card>
  );
}
