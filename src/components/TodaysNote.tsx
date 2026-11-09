import { useState } from "react";
import { Link } from "react-router-dom";
import { Share2, Check } from "lucide-react";
import { LIFE_NOTES, todaysNoteIndex, shareNote } from "@/data/lifeNotes";

export function NoteShareButton({ text, className = "" }: { text: string; className?: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      aria-label="Share this note"
      title="Share this note"
      onClick={async () => {
        const r = await shareNote(text);
        if (r !== "failed") {
          setDone(true);
          setTimeout(() => setDone(false), 1800);
        }
      }}
      className={`inline-flex items-center gap-1.5 rounded-full border border-[#447BBE]/30 bg-white px-3 py-1.5 font-sans text-[13px] font-semibold text-[#2F5C90] hover:bg-[#447BBE]/10 transition-colors ${className}`}
    >
      {done ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
      {done ? "Copied" : "Share"}
    </button>
  );
}

export function TodaysNoteStrip() {
  const today = new Date();
  const note = LIFE_NOTES[todaysNoteIndex(today)];
  const dateLabel = today.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  return (
    <section aria-label="Today's Note" className="surface-warm border-b border-border px-5 py-5">
      <div className="mx-auto flex max-w-3xl flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
        <div className="flex-1 text-left">
          <p className="font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-[#0A0F1A]/60">
            Today's Note <span className="mx-1">·</span> <span className="normal-case tracking-normal">{dateLabel}</span>
          </p>
          <p className="mt-1 font-sans text-[16px] sm:text-[17px] leading-snug text-[#0A0F1A]">{note}</p>
        </div>
        <div className="flex items-center gap-4">
          <NoteShareButton text={note} />
          <Link to="/lifenotes" className="font-sans text-[14px] font-semibold text-[#2F5C90] underline-offset-4 hover:underline whitespace-nowrap">
            See all notes
          </Link>
        </div>
      </div>
    </section>
  );
}
