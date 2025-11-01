export type BookImport = {
  title: string;
  author?: string;
  link?: string;
  notes?: string;
};

/**
 * Parses the Notion HTML export for "100 Books to Live your Best Life"
 * Extracts title, author, link, and description from the HTML structure
 */
export async function parse100Books(): Promise<BookImport[]> {
  try {
    const response = await fetch("/imports/100-books.html");
    if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`);
    
    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    
    const books: BookImport[] = [];
    const seenKeys = new Set<string>();
    
    // Find all headers that match the pattern: "# 1) Title by Author"
    const allHeaders = Array.from(doc.querySelectorAll("h1, h2, h3"));
    
    for (const header of allHeaders) {
      const text = header.textContent?.trim() || "";
      
      // Pattern: "# 1) Book Title by Author Name (optional refs)"
      const match = text.match(/^#?\s*(\d+)\)\s*(.+?)\s+by\s+(.+?)(?:\s+\([^)]+\))?$/i);
      
      if (!match) continue;
      
      const [, , rawTitle, rawAuthor] = match;
      const title = normalizeText(rawTitle);
      const author = normalizeText(rawAuthor);
      
      if (!title) continue;
      
      // Dedupe by normalized key
      const key = norm(title) + "|" + norm(author);
      if (seenKeys.has(key)) continue;
      seenKeys.add(key);
      
      // Try to find description in next sibling paragraph
      let notes: string | undefined;
      let nextEl = header.nextElementSibling;
      while (nextEl && nextEl.tagName !== "H1" && nextEl.tagName !== "H2" && nextEl.tagName !== "H3") {
        const pText = nextEl.textContent?.trim();
        if (pText && pText.length > 20) {
          notes = normalizeText(pText).slice(0, 280);
          break;
        }
        nextEl = nextEl.nextElementSibling;
      }
      
      // Try to find a link (anchor tag near the header)
      let link: string | undefined;
      const anchors = header.querySelectorAll("a[href]");
      if (anchors.length > 0) {
        link = (anchors[0] as HTMLAnchorElement).href;
      }
      
      books.push({ title, author, link, notes });
    }
    
    console.info(`[parse100Books] Parsed ${books.length} books from HTML`);
    return books;
    
  } catch (error) {
    console.error("[parse100Books] Error:", error);
    return [];
  }
}

// Helper to normalize text: collapse whitespace, normalize quotes, trim
function normalizeText(s: string): string {
  return s
    .replace(/[""]/g, '"')
    .replace(/['']/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

// Helper for deduplication
function norm(s: string): string {
  return s.toLowerCase().replace(/\s+/g, " ").trim();
}
