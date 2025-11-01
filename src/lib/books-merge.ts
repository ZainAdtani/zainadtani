import type { Book, BookStatus } from '@/data/books';
import type { ImportedBook } from '@/lib/books-sync';

/**
 * Merge the Notion import JSON with existing LOCAL_BOOKS
 * This runs at build time to create the final BOOKS export
 */
export function createMergedBooks(localBooks: Book[], importedBooks: ImportedBook[]): Book[] {
  const merged: Book[] = [];
  const existingIds = new Set<string>();
  const seenKeys = new Map<string, Book>();

  // Normalize for deduplication
  function norm(s: string): string {
    return s
      .toLowerCase()
      .replace(/&amp;|&/g, 'and')
      .replace(/[^a-z0-9\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function authorKey(author: string): string {
    const parts = norm(author).split(' ').filter(Boolean);
    return parts.length > 0 ? parts[parts.length - 1] : norm(author);
  }

  function keyOf(title: string, author: string): string {
    return `${norm(title)}|${authorKey(author)}`;
  }

  function generateId(title: string): string {
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

  // First pass: add all existing books
  for (const book of localBooks) {
    const key = keyOf(book.title, book.author);
    existingIds.add(book.id);
    
    if (!seenKeys.has(key)) {
      seenKeys.set(key, book);
    } else {
      // Keep the one with more data
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
  for (const importedBook of importedBooks) {
    const key = keyOf(importedBook.title, importedBook.author);
    
    if (seenKeys.has(key)) {
      // Update existing entry
      const existing = seenKeys.get(key)!;
      seenKeys.set(key, {
        ...existing,
        link: existing.link || importedBook.source_url,
        notes: existing.notes || importedBook.note,
        tags: existing.tags || (importedBook.category ? [importedBook.category] : ['best-life']),
      });
    } else {
      // Add new book
      const id = generateId(importedBook.title);
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

  return merged;
}
