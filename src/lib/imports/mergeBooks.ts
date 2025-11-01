import { BOOKS, type Book, type BookStatus } from "@/data/books";
import type { BookImport } from "./parse100Books";

/**
 * Normalize a string for matching (lowercase, collapse whitespace)
 */
const norm = (s: string) => s.toLowerCase().replace(/\s+/g, " ").trim();

/**
 * Rank status by strength: IN_PROGRESS > READ > TBR
 */
const byStrength = (s?: BookStatus | string): number => {
  if (s === "IN_PROGRESS") return 3;
  if (s === "READ") return 2;
  return 1; // TBR or undefined
};

/**
 * Choose the stronger status (never downgrade READ to TBR)
 */
function chooseStatus(existing: BookStatus, incoming?: BookStatus): BookStatus {
  if (!incoming) return existing;
  return byStrength(incoming) > byStrength(existing) ? incoming : existing;
}

/**
 * Prefer first non-undefined value
 */
function prefer<T>(a?: T, b?: T): T | undefined {
  return a ?? b;
}

/**
 * Generate a unique ID from title
 */
function generateId(title: string, existingIds: Set<string>): string {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48);
  
  let candidate = `import-100-${slug}`;
  let counter = 2;
  
  while (existingIds.has(candidate)) {
    candidate = `import-100-${slug}-${counter}`;
    counter++;
  }
  
  existingIds.add(candidate);
  return candidate;
}

/**
 * Merge imported books into the global BOOKS array
 * - Deduplicates by normalized title+author
 * - Preserves stronger status (IN_PROGRESS > READ > TBR)
 * - Fills missing links and notes
 * - Creates new entries for unknown books
 * - Consolidates exact duplicates in final pass
 */
export function mergeIntoBooks(incoming: BookImport[]): void {
  const existingIds = new Set(BOOKS.map(b => b.id));
  
  // Phase 1: Merge or add incoming books
  for (const item of incoming) {
    if (!item.title?.trim()) continue;
    
    const normTitle = norm(item.title);
    const normAuthor = norm(item.author || "");
    
    // Try to find existing book by title+author
    const existing = BOOKS.find(b => {
      const matchTitle = norm(b.title) === normTitle;
      const matchAuthor = normAuthor ? norm(b.author) === normAuthor : true;
      return matchTitle && matchAuthor;
    });
    
    if (existing) {
      // Merge: upgrade status, fill missing data
      existing.status = chooseStatus(existing.status, undefined); // Keep existing status (no incoming status)
      existing.link = prefer(existing.link, item.link);
      existing.notes = prefer(existing.notes, item.notes);
      // Preserve: cover, rating, progress, tags, myThoughts
    } else {
      // Create new entry
      const newBook: Book = {
        id: generateId(item.title, existingIds),
        title: item.title.trim(),
        author: (item.author || "Unknown").trim(),
        status: "TBR",
        link: item.link,
        notes: item.notes,
      };
      BOOKS.push(newBook);
    }
  }
  
  // Phase 2: Consolidate exact duplicates within BOOKS
  const groups = new Map<string, Book[]>();
  
  for (const book of BOOKS) {
    const key = norm(book.title) + "|" + norm(book.author);
    if (!groups.has(key)) {
      groups.set(key, []);
    }
    groups.get(key)!.push(book);
  }
  
  // For each group with duplicates, keep the best one
  const toRemove = new Set<string>();
  
  for (const [, group] of groups) {
    if (group.length <= 1) continue;
    
    // Sort by: strongest status, then has link, then has notes/cover, then first occurrence
    group.sort((a, b) => {
      const strengthDiff = byStrength(b.status) - byStrength(a.status);
      if (strengthDiff !== 0) return strengthDiff;
      
      const linkDiff = (b.link ? 1 : 0) - (a.link ? 1 : 0);
      if (linkDiff !== 0) return linkDiff;
      
      const notesCoverDiff = ((b.notes ? 1 : 0) + (b.cover ? 1 : 0)) - ((a.notes ? 1 : 0) + (a.cover ? 1 : 0));
      if (notesCoverDiff !== 0) return notesCoverDiff;
      
      return 0; // Keep first occurrence
    });
    
    // Keep first (best), mark rest for removal
    for (let i = 1; i < group.length; i++) {
      toRemove.add(group[i].id);
    }
  }
  
  // Remove duplicates
  if (toRemove.size > 0) {
    let i = BOOKS.length;
    while (i--) {
      if (toRemove.has(BOOKS[i].id)) {
        BOOKS.splice(i, 1);
      }
    }
    console.info(`[mergeBooks] Removed ${toRemove.size} duplicate(s)`);
  }
}
