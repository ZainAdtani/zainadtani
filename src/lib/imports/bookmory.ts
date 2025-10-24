// src/lib/imports/bookmory.ts
import type { BookStatus } from "@/data/books";

export type ImportedBook = {
  title: string;
  author: string;
  isbn?: string;
  pages?: number;
  status?: BookStatus | "TBR" | "IN_PROGRESS" | "READ";
  tags?: string[];
  notes?: string;
  rating?: number;
};

const statusMap: Record<string, BookStatus> = {
  "I've read it all!": "READ",
  "To read": "TBR",
  "In progress": "IN_PROGRESS",
  "Want to read": "TBR",
  "Reading": "IN_PROGRESS",
};

export async function parseBookmoryTxt(txt: string): Promise<ImportedBook | null> {
  // Very forgiving line parser based on examples
  // Example lines:
  // - Title: Tuesdays with Morrie: ...
  // - Author: Mitch Albom
  // - ISBN: 978...
  // - Total pages: p. 198
  // - Tags in use: #Nonfiction #Memoir
  // - Status: I've read it all!
  const get = (label: string) => {
    const m = txt.match(new RegExp(`^\\s*[-•]?\\s*${label}:\\s*(.+)$`, "im"));
    return m?.[1]?.trim() || "";
  };

  const title = get("Title") || "";
  const author = get("Author") || "";
  if (!title) return null;

  const isbn = get("ISBN") || "";
  const pagesRaw = get("Total pages");
  const pages = pagesRaw ? parseInt(pagesRaw.replace(/[^\d]/g, "") || "0", 10) : undefined;

  const tagsLine = get("Tags in use");
  const tags = tagsLine ? tagsLine.split(/\s+/).filter(t => t.startsWith("#")).map(t => t.replace(/^#/, "")) : [];

  const statusLine = get("Status");
  const status = statusMap[statusLine] || undefined;

  // Try to extract rating from reading log
  const ratingMatch = txt.match(/Star ratings:\s*(\d+(?:\.\d+)?)/i);
  const rating = ratingMatch ? parseFloat(ratingMatch[1]) : undefined;

  return { title, author, isbn: isbn || undefined, pages, status, tags, rating };
}

export async function parseManyBookmoryTxt(files: FileList | File[]): Promise<ImportedBook[]> {
  const arr: ImportedBook[] = [];
  for (const f of Array.from(files)) {
    if (!/\.txt$/i.test(f.name)) continue;
    const txt = await f.text();
    const one = await parseBookmoryTxt(txt);
    if (one) arr.push(one);
  }
  return arr;
}
