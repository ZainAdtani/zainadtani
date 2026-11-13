import { test } from "node:test";
import assert from "node:assert/strict";
import { LIFE_NOTES, dayOfYear, notePath, noteUrl, parseNoteNumber, todaysNoteIndex } from "./lifeNotes.ts";

test("there are exactly 15 notes, first and last word for word", () => {
  assert.equal(LIFE_NOTES.length, 15);
  assert.equal(LIFE_NOTES[0], "Rich people buy time. Ambitious people buy skills. Lazy people buy distractions.");
  assert.equal(LIFE_NOTES[14], "Write about your day or take photos for richer memories.");
});

test("note is picked by day of year modulo 15", () => {
  assert.equal(dayOfYear(new Date(2026, 0, 1)), 1);
  assert.equal(todaysNoteIndex(new Date(2026, 0, 1)), 1);
  assert.equal(todaysNoteIndex(new Date(2026, 0, 15)), 0);
  assert.equal(todaysNoteIndex(new Date(2026, 10, 9)), 313 % 15);
});

test("each note has a stable 1-based URL", () => {
  assert.equal(notePath(0), "/lifenotes/1");
  assert.equal(noteUrl(14), "https://zainadtani.com/lifenotes/15");
  assert.equal(parseNoteNumber("1"), 1);
  assert.equal(parseNoteNumber("15"), 15);
  assert.equal(parseNoteNumber("0"), null);
  assert.equal(parseNoteNumber("16"), null);
  assert.equal(parseNoteNumber("01"), null);
  assert.equal(parseNoteNumber("nope"), null);
});

test("same note all day", () => {
  assert.equal(todaysNoteIndex(new Date(2026, 10, 9, 0, 1)), todaysNoteIndex(new Date(2026, 10, 9, 23, 59)));
});
