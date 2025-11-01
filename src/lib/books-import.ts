import type { Book } from '@/data/books';

type ImportedBook = {
  title: string;
  author: string;
  category?: string;
  link?: string;
  notes?: string;
};

// Normalize text for deduplication
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, '-')
    .trim();
}

// Extract primary author (first one)
function getPrimaryAuthor(authorString: string): string {
  const authors = authorString.split(/[,;&]| and /i);
  return authors[0]?.trim() || authorString;
}

// Generate dedup key
function generateKey(title: string, author: string): string {
  return `${slugify(title)}::${slugify(getPrimaryAuthor(author))}`;
}

// Parse markdown format
export function parseNotionMarkdown(markdown: string): ImportedBook[] {
  const books: ImportedBook[] = [];
  const lines = markdown.split('\n');
  
  let currentCategory = '';
  let i = 0;
  
  while (i < lines.length) {
    const line = lines[i].trim();
    
    // Check for category headers (### followed by category name)
    if (line.startsWith('###') && !line.toLowerCase().includes('table of contents')) {
      currentCategory = line.replace(/^###\s*/, '').replace(/\*\*/g, '').trim();
      i++;
      continue;
    }
    
    // Check for book entries (numbered list with link)
    // Format: **1)** [**Title](link) by Author (S3 E5)**
    const bookMatch = line.match(/^\*\*\d+\)\*\*\s*\[?\*\*(.+?)\*\*\]?\(([^)]+)\)\s+by\s+(.+?)(?:\s*\([^)]*\))?\*\*?$/);
    
    if (bookMatch) {
      const title = bookMatch[1].trim();
      const link = bookMatch[2].trim();
      let author = bookMatch[3].trim();
      
      // Remove podcast episode markers like (S3 E5)
      author = author.replace(/\s*\([^)]*\)\s*$/g, '').trim();
      
      // Look ahead for notes (next non-empty, non-numbered paragraph)
      let notes = '';
      let j = i + 1;
      
      while (j < lines.length) {
        const nextLine = lines[j].trim();
        
        // Stop if we hit another book entry or category
        if (nextLine.startsWith('**') && /^\*\*\d+\)/.test(nextLine)) break;
        if (nextLine.startsWith('###')) break;
        
        // Accumulate non-empty lines as notes
        if (nextLine && !nextLine.startsWith('**Table of contents**')) {
          notes += (notes ? ' ' : '') + nextLine;
        } else if (nextLine === '' && notes) {
          // Stop at first blank line after we have notes
          break;
        }
        
        j++;
      }
      
      books.push({
        title,
        author,
        category: currentCategory || undefined,
        link: link.startsWith('http') ? link : undefined,
        notes: notes || undefined,
      });
    }
    
    i++;
  }
  
  return books;
}

// Merge imported books with existing books
export function mergeImportedBooks(markdown: string, existing: Book[]): Book[] {
  const imported = parseNotionMarkdown(markdown);
  
  // Build a map of existing books by key
  const existingMap = new Map<string, Book>();
  const usedIds = new Set<string>();
  
  existing.forEach(book => {
    const key = generateKey(book.title, book.author);
    existingMap.set(key, book);
    usedIds.add(book.id);
  });
  
  // Process imported books
  const mergedBooks: Book[] = [...existing];
  
  imported.forEach(imp => {
    const key = generateKey(imp.title, imp.author);
    const existingBook = existingMap.get(key);
    
    if (existingBook) {
      // Update existing book with missing fields
      if (imp.notes && !existingBook.notes) {
        existingBook.notes = imp.notes;
      }
      if (imp.link && !existingBook.link) {
        existingBook.link = imp.link;
      }
      if (imp.category && !existingBook.tags?.includes(imp.category)) {
        existingBook.tags = [...(existingBook.tags || []), imp.category];
      }
    } else {
      // Add new book
      const id = slugify(imp.title);
      let finalId = id;
      let counter = 1;
      
      while (usedIds.has(finalId)) {
        finalId = `${id}-${counter}`;
        counter++;
      }
      
      usedIds.add(finalId);
      
      const newBook: Book = {
        id: finalId,
        title: imp.title,
        author: imp.author,
        status: 'TBR',
        link: imp.link,
        notes: imp.notes,
        tags: imp.category ? [imp.category] : undefined,
      };
      
      mergedBooks.push(newBook);
    }
  });
  
  return mergedBooks;
}
