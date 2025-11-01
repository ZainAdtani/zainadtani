import type { Book, BookStatus } from '@/data/books';

export interface ImportedBook {
  title: string;
  author: string;
  category?: string;
  source_url?: string;
  note?: string;
}

/**
 * Normalize text for comparison: lowercase, strip punctuation, collapse whitespace
 */
function norm(s: string): string {
  return s
    .toLowerCase()
    .replace(/&amp;|&/g, 'and')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Extract last name or first word for author comparison
 */
function authorKey(author: string): string {
  const parts = norm(author).split(' ').filter(Boolean);
  return parts.length > 0 ? parts[parts.length - 1] : norm(author);
}

/**
 * Create a dedupe key from title and author
 */
function keyOf(title: string, author: string): string {
  return `${norm(title)}|${authorKey(author)}`;
}

/**
 * Generate a stable ID from title
 */
function generateId(title: string, existingIds: Set<string>): string {
  let baseId = norm(title).replace(/\s+/g, '-');
  let id = baseId;
  let counter = 1;
  
  while (existingIds.has(id)) {
    id = `${baseId}-${counter}`;
    counter++;
  }
  
  existingIds.add(id);
  return id;
}

/**
 * Merge imported books with existing books, deduplicating intelligently
 */
export function mergeBooks(existing: Book[], imported: ImportedBook[]): Book[] {
  const merged: Book[] = [];
  const existingIds = new Set<string>();
  const seenKeys = new Map<string, Book>();

  // First pass: add all existing books to the map
  for (const book of existing) {
    const key = keyOf(book.title, book.author);
    existingIds.add(book.id);
    
    if (!seenKeys.has(key)) {
      seenKeys.set(key, book);
    } else {
      // Keep the one with more data (prefer with cover, then with status, then with notes)
      const current = seenKeys.get(key)!;
      const hasBetterData = 
        (book.cover && !current.cover) ||
        (book.status !== 'TBR' && current.status === 'TBR') ||
        (book.notes && !current.notes) ||
        (book.myThoughts && !current.myThoughts);
      
      if (hasBetterData) {
        seenKeys.set(key, book);
      }
    }
  }

  // Second pass: merge imported books
  for (const importedBook of imported) {
    const key = keyOf(importedBook.title, importedBook.author);
    
    if (seenKeys.has(key)) {
      // Update existing entry with imported data (but preserve existing status, cover, etc.)
      const existing = seenKeys.get(key)!;
      seenKeys.set(key, {
        ...existing,
        // Only fill in missing data
        link: existing.link || importedBook.source_url,
        notes: existing.notes || importedBook.note,
        tags: existing.tags || (importedBook.category ? [importedBook.category] : ['best-life']),
      });
    } else {
      // Add new book
      const id = generateId(importedBook.title, existingIds);
      seenKeys.set(key, {
        id,
        title: importedBook.title,
        author: importedBook.author,
        status: 'TBR' as BookStatus,
        progress: 0,
        tags: importedBook.category ? [importedBook.category] : ['best-life'],
        link: importedBook.source_url,
        notes: importedBook.note,
      });
    }
  }

  // Convert map to array
  merged.push(...seenKeys.values());

  console.log(`📚 Merged ${merged.length} books (${existing.length} existing + ${imported.length} imported)`);
  console.log(`🔍 Removed ${existing.length + imported.length - merged.length} duplicates`);

  return merged;
}
