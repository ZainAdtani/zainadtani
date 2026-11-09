import { Helmet } from "react-helmet-async";
import { LIFE_NOTES, todaysNoteIndex } from "@/data/lifeNotes";
import { NoteShareButton } from "@/components/TodaysNote";

export default function DailyLifeNotes() {
  const todayIdx = todaysNoteIndex();
  const order = [todayIdx, ...LIFE_NOTES.map((_, i) => i).filter((i) => i !== todayIdx)];
  return (
    <div className="bg-background">
      <Helmet>
        <title>Life Notes | Zain Adtani</title>
        <meta name="description" content="Fifteen short Life Notes from Zain Adtani. One new note is featured each day." />
        <link rel="canonical" href="https://zainadtani.com/lifenotes" />
      </Helmet>
      <section className="hero-warm px-5 py-12 text-center">
        <h1 className="text-[44px] sm:text-[56px] text-foreground">Life Notes</h1>
        <p className="mx-auto mt-3 max-w-xl font-sans text-[17px] text-foreground/80">
          Short lines I live by. A new one is featured every day.
        </p>
      </section>
      <section className="px-5 py-10">
        <ul className="mx-auto grid max-w-3xl gap-4">
          {order.map((i) => {
            const isToday = i === todayIdx;
            return (
              <li
                key={i}
                className={`rounded-xl border bg-white p-5 shadow-sm ${isToday ? "border-[#DD5013]/50 ring-2 ring-[#DD5013]/20" : "border-border"}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-[#0A0F1A]/55">
                      {isToday ? <span className="text-[#DD5013]">Today's note</span> : `Note ${i + 1}`}
                    </p>
                    <p className="mt-1.5 font-sans text-[17px] leading-snug text-[#0A0F1A]">{LIFE_NOTES[i]}</p>
                  </div>
                  <NoteShareButton text={LIFE_NOTES[i]} className="shrink-0" />
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
