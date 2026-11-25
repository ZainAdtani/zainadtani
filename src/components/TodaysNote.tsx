import { useState } from "react";
import { Link } from "react-router-dom";
import { Share2, Check } from "lucide-react";
import { TypeOut } from "@/components/TypeOut";
import { LIFE_NOTES, todaysNoteIndex, noteUrl, shareNote } from "@/data/lifeNotes";

export function NoteShareButton({ text, url, className = "" }: { text: string; url?: string; className?: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      aria-label="Share this note"
      title="Share this note"
      onClick={async () => {
        const r = await shareNote(text, url);
        if (r !== "failed") {
          setDone(true);
          setTimeout(() => setDone(false), 1800);
        }
      }}
      className={`inline-flex items-center gap-1.5 rounded-full border border-[#447BBE]/30 bg-card px-3 py-1.5 font-sans text-[13px] font-semibold text-[#447BBE] hover:bg-[#447BBE]/10 transition-colors ${className}`}
    >
      {done ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
      {done ? "Copied" : "Share"}
    </button>
  );
}

export function TodaysNoteStrip() {
  const today = new Date();
  const index = todaysNoteIndex(today);
  const note = LIFE_NOTES[index];
  const dateLabel = today.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  return (
    <section aria-label="Today's Note" className="surface-warm border-b border-border px-5 py-5">
      <div className="mx-auto flex max-w-3xl flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
        <div className="flex-1 text-left">
          <p className="font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-white/60">
            Today's Note <span className="mx-1">·</span> <span className="normal-case tracking-normal">{dateLabel}</span>
          </p>
          <p className="mt-1 font-sans text-[16px] sm:text-[17px] leading-snug text-white"><TypeOut text={note} /></p>
        </div>
        <div className="flex items-center gap-4">
          <NoteShareButton text={note} url={noteUrl(index)} />
          <Link to="/lifenotes" className="font-sans text-[14px] font-semibold text-[#447BBE] underline-offset-4 hover:underline whitespace-nowrap">
            See all notes
          </Link>
        </div>
      </div>
      <MoreNotes today={today} todayIndex={index} />
    </section>
  );
}

/** The 5 notes from the days before today, newest first. */
function MoreNotes({ today, todayIndex }: { today: Date; todayIndex: number }) {
  const entries = Array.from({ length: 5 }, (_, k) => {
    const d = new Date(today);
    d.setDate(d.getDate() - (k + 1));
    const i = (todayIndex - (k + 1) + LIFE_NOTES.length * 2) % LIFE_NOTES.length;
    return { date: d, text: LIFE_NOTES[i] };
  });
  return (
    <div className="mx-auto mt-5 max-w-3xl border-t border-white/10 pt-4">
      <p className="font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-white/60">More notes</p>
      <ul className="mt-2 space-y-2">
        {entries.map((e) => (
          <li key={e.date.toDateString()} className="font-sans text-[15px] leading-snug text-white">
            <span className="text-white/50">
              {e.date.toLocaleDateString("en-US", { month: "long", day: "numeric" })}
            </span>
            <span className="mx-2 text-white/30">·</span>
            {e.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
