// src/lib/covers.ts
export type CoverQuery = { title?: string; author?: string; isbn?: string | number };

const CACHE_KEY = "bookCoversV2";

function loadCache(): Record<string, string> {
  try { return JSON.parse(localStorage.getItem(CACHE_KEY) || "{}"); } catch { return {}; }
}

function saveCache(cache: Record<string, string>) {
  localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
}

function keyFor(q: CoverQuery) {
  return (q.isbn ? `isbn:${q.isbn}` : `${(q.title || "").toLowerCase()}__${(q.author || "").toLowerCase()}`) || "";
}

export async function findCover(q: CoverQuery): Promise<string | null> {
  const cache = loadCache();
  const cacheKey = keyFor(q);
  if (cacheKey && cache[cacheKey]) return cache[cacheKey];

  // 1) Open Library by ISBN first
  if (q.isbn) {
    const url = `https://covers.openlibrary.org/b/isbn/${q.isbn}-L.jpg`;
    // ping the image (no CORS issue for GET image)
    try {
      const res = await fetch(url, { method: "HEAD" });
      if (res.ok) { cache[cacheKey] = url; saveCache(cache); return url; }
    } catch {}
  }

  // 2) Open Library search by title+author
  if (q.title) {
    try {
      const qs = new URLSearchParams({ title: q.title || "", author: q.author || "" }).toString();
      const s = await fetch(`https://openlibrary.org/search.json?${qs}`);
      const data = await s.json();
      const doc = data?.docs?.[0];
      if (doc?.isbn?.length) {
        const url = `https://covers.openlibrary.org/b/isbn/${doc.isbn[0]}-L.jpg`;
        cache[cacheKey] = url; saveCache(cache); return url;
      }
      if (doc?.cover_i) {
        const url = `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg`;
        cache[cacheKey] = url; saveCache(cache); return url;
      }
    } catch {}
  }

  // 3) Google Books fallback (no key needed for basic search)
  try {
    const qStr = encodeURIComponent([q.title, q.author, q.isbn].filter(Boolean).join(" "));
    const r = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${qStr}&maxResults=1`);
    const data = await r.json();
    const img = data?.items?.[0]?.volumeInfo?.imageLinks?.thumbnail || data?.items?.[0]?.volumeInfo?.imageLinks?.smallThumbnail;
    if (img) {
      const httpsImg = img.replace(/^http:/, "https:");
      cache[cacheKey] = httpsImg; saveCache(cache); return httpsImg;
    }
  } catch {}

  return null;
}
