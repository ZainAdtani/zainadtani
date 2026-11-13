export const LIFE_NOTES: readonly string[] = [
  "Rich people buy time. Ambitious people buy skills. Lazy people buy distractions.",
  "Things don't take much time; procrastination does.",
  "People think about you far less than you believe.",
  "New experiences make time feel longer in your memory.",
  "Hard work and consistency on one thing daily lead to mastery over time.",
  "Nothing will ever be perfect, and that's okay.",
  "Judging yourself less leads to freedom.",
  "Surround yourself with people and places that push you to perform.",
  "Things worth achieving are rarely easy.",
  "It's never too late. Change is possible at any stage of life.",
  "Focus on the moment to make time feel slower and more meaningful.",
  "Almost anything can be learned online.",
  "Journaling daily helps master your mindset.",
  "Choose no more than 3 tasks to focus on daily.",
  "Write about your day or take photos for richer memories.",
];

/** Day of year, 1 for Jan 1, using the visitor's local calendar date. */
export function dayOfYear(date: Date): number {
  const start = Date.UTC(date.getFullYear(), 0, 0);
  const now = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  return Math.round((now - start) / 86400000);
}

/** Index of today's note: day of year modulo the number of notes. */
export function todaysNoteIndex(date: Date = new Date()): number {
  return dayOfYear(date) % LIFE_NOTES.length;
}

/** 1-based public URL for one note, so a single line can be shared. */
export function notePath(index: number): string {
  return `/lifenotes/${index + 1}`;
}

export function noteUrl(index: number): string {
  return `https://zainadtani.com${notePath(index)}`;
}

/** Accepts the 1-based number from the URL. Returns null when it is not a real note. */
export function parseNoteNumber(raw: string | undefined): number | null {
  if (!raw || !/^[1-9]\d*$/.test(raw)) return null;
  const n = Number(raw);
  if (n < 1 || n > LIFE_NOTES.length) return null;
  return n;
}

export async function shareNote(text: string, url = "https://zainadtani.com/lifenotes"): Promise<"shared" | "copied" | "failed"> {
  const payload = `${text}\n\nLife Notes by Zain Adtani: ${url}`;
  try {
    if (typeof navigator !== "undefined" && navigator.share) {
      await navigator.share({ title: "Life Notes", text: payload });
      return "shared";
    }
  } catch (e) {
    if ((e as Error)?.name === "AbortError") return "failed";
  }
  try {
    await navigator.clipboard.writeText(payload);
    return "copied";
  } catch {
    return "failed";
  }
}
