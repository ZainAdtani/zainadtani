import { JSDOM } from 'jsdom';
import * as fs from 'fs';
import * as path from 'path';

interface ImportedBook {
  title: string;
  author: string;
  category?: string;
  source_url?: string;
  note?: string;
}

function normalizeText(text: string): string {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&#x27;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim();
}

function cleanTitleAuthor(text: string): string {
  // Remove podcast episode markers like (S1 E10), (S3 E5), etc.
  return text.replace(/\(S\d+\s+E\d+\)/gi, '').trim();
}

function parseBooks(): ImportedBook[] {
  const htmlPath = path.join(process.cwd(), 'public', 'data', '100-books.html');
  const html = fs.readFileSync(htmlPath, 'utf-8');
  const dom = new JSDOM(html);
  const doc = dom.window.document;

  const books: ImportedBook[] = [];
  let currentCategory = '';

  // Find the page-body div
  const pageBody = doc.querySelector('.page-body');
  if (!pageBody) {
    console.error('Could not find .page-body');
    return books;
  }

  // Get all paragraphs - books are in numbered list format within paragraphs
  const paragraphs = Array.from(pageBody.querySelectorAll('p'));

  for (let i = 0; i < paragraphs.length; i++) {
    const p = paragraphs[i];
    const text = p.textContent || '';

    // Check if this is a category header (has border-bottom style)
    const hasUnderline = p.querySelector('span[style*="border-bottom"]');
    if (hasUnderline && text.trim() && !text.includes('Table of contents')) {
      currentCategory = normalizeText(text);
      continue;
    }

    // Check if this paragraph contains a book entry
    // Books typically start with a number followed by a period
    const bookMatch = text.match(/^\d+\.\s*(.+?)(?:\s+by\s+(.+?))?$/i);
    if (bookMatch) {
      const anchor = p.querySelector('a');
      let title = '';
      let author = 'Unknown';
      
      if (anchor) {
        // Use anchor text as title
        title = cleanTitleAuthor(normalizeText(anchor.textContent || ''));
        // Try to extract author from the rest of the text
        const fullText = normalizeText(text);
        const byMatch = fullText.match(/by\s+(.+)$/i);
        if (byMatch) {
          author = cleanTitleAuthor(normalizeText(byMatch[1]));
        }
      } else {
        // No anchor, parse title and author from text
        title = cleanTitleAuthor(normalizeText(bookMatch[1]));
        if (bookMatch[2]) {
          author = cleanTitleAuthor(normalizeText(bookMatch[2]));
        }
      }

      // Look ahead for note (next non-numbered paragraph)
      let note = '';
      if (i + 1 < paragraphs.length) {
        const nextP = paragraphs[i + 1];
        const nextText = normalizeText(nextP.textContent || '');
        // If next paragraph doesn't start with a number and isn't a category, it's likely a note
        if (!nextText.match(/^\d+\./) && !nextP.querySelector('span[style*="border-bottom"]')) {
          note = nextText;
        }
      }

      if (title) {
        books.push({
          title,
          author,
          category: currentCategory || undefined,
          source_url: anchor?.href,
          note: note || undefined,
        });
      }
    }
  }

  return books;
}

function main() {
  console.log('🔍 Parsing 100-books.html...');
  const books = parseBooks();
  
  console.log(`✅ Parsed ${books.length} books`);
  
  // Sample first few books to verify
  if (books.length > 0) {
    console.log('\n📖 First 3 books:');
    books.slice(0, 3).forEach((b, i) => {
      console.log(`${i + 1}. "${b.title}" by ${b.author} (${b.category})`);
    });
    
    // Look for "Rip It Up" specifically
    const ripIt = books.find(b => b.title.toLowerCase().includes('rip it'));
    if (ripIt) {
      console.log('\n✓ Found "Rip It Up":', ripIt);
    } else {
      console.warn('\n⚠ Could not find "Rip It Up" - check parser logic');
    }
  }

  // Write to JSON
  const outputPath = path.join(process.cwd(), 'public', 'data', 'books_notionsync.json');
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(books, null, 2));
  
  console.log(`\n💾 Wrote ${books.length} books to ${outputPath}`);
  console.log('\nNext: Update src/data/books.ts to import and merge this JSON file.');
}

main();
