import type { Book } from '@/data/books';

type ImportedBook = {
  title: string;
  author: string;
  category?: string;
  link?: string;
  notes?: string;
};

/**
 * Strip all episode markers like (S1 E5), (S2 E11), etc. from text
 * Handles multiple episode tags in one string
 * Pattern: (S<digit(s)> E<digit(s)>)
 */
function stripEpisodeTags(text: string): string {
  return text
    .replace(/\s*\(S\d+\s+E\d+\)\s*/gi, ' ') // Remove (S1 E5), (S2 E11), etc.
    .replace(/\s+/g, ' ') // Collapse multiple spaces
    .trim();
}

// Normalize text for deduplication
function slugify(text: string): string {
  return stripEpisodeTags(text)
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
      // Normalize weird markdown like S**elf-help** -> Self-help
      currentCategory = line
        .replace(/^###\s*/, '')
        .replace(/\*/g, '')
        .replace(/\s+/g, ' ')
        .trim();
      i++;
      continue;
    }

    // Try to detect a book entry line more loosely
    // Examples observed:
    // "**1)** [**Rip It up](https://...) by Richard Wiseman (S3 E5)**"
    // "**29) [The War Of Art](https://...) by Steven Pressfield (S3 E10)"
    // "6) [Think Big](https://...) by Dr Grace Lordan (S1 E6)"
    // Strategy: look for [title](link) by author ....
    if (line.includes('](') && /\bby\b/i.test(line)) {
      const linkTitleMatch = line.match(/\[(.+?)\]\((https?:\/\/[^)\s]+)\)/);
      if (linkTitleMatch) {
        let rawTitle = linkTitleMatch[1];
        const link = linkTitleMatch[2];

        // Remove bold markers and episode tags from title
        const title = stripEpisodeTags(rawTitle.replace(/\*\*/g, '')).trim();

        // Extract author: take substring after " by "
        const byIndex = line.toLowerCase().lastIndexOf(' by ');
        let rawAuthor = line.slice(byIndex + 4).trim();
        // Remove ALL episode tags and bold markers from author
        const author = stripEpisodeTags(rawAuthor)
          .replace(/\*\*/g, '')
          .replace(/\s*\([^)]*\)\s*/g, '') // Remove any remaining parentheticals
          .trim();

        // Look ahead for notes (next non-empty lines until next item or category)
        let notes = '';
        let j = i + 1;
        while (j < lines.length) {
          const nextLine = lines[j].trim();
          const isNextBook = /^\**\d+\)\s*\[/.test(nextLine); // e.g., **10) [ ...
          const isHeader = nextLine.startsWith('###');
          if (isNextBook || isHeader) break;
          if (nextLine) {
            notes += (notes ? ' ' : '') + nextLine;
          } else if (notes) {
            break; // stop at first blank line after we have notes
          }
          j++;
        }

        books.push({
          title,
          author,
          category: currentCategory || undefined,
          link,
          notes: notes || undefined,
        });
      }
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
      // Preserve existing book data, only fill in missing fields
      
      // Link: keep existing if present
      if (imp.link && !existingBook.link) {
        existingBook.link = imp.link;
      }
      
      // Notes: keep existing if present
      if (imp.notes && !existingBook.notes) {
        existingBook.notes = imp.notes;
      }
      
      // Tags: merge unique values
      if (imp.category) {
        const existingTags = existingBook.tags || [];
        if (!existingTags.includes(imp.category)) {
          existingBook.tags = [...existingTags, imp.category];
        }
      }
      
      // Status, progress, rating, myThoughts, cover: NEVER overwrite from import
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
