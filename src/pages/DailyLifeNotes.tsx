import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { LIFE_NOTES, notePath, noteUrl, parseNoteNumber, todaysNoteIndex } from "@/data/lifeNotes";
import { NoteShareButton } from "@/components/TodaysNote";

export default function DailyLifeNotes() {
  const todayIdx = todaysNoteIndex();
  const order = [todayIdx, ...LIFE_NOTES.map((_, i) => i).filter((i) => i !== todayIdx)];
  return (
    <div className="bg-background">
      <Helmet>
        <title>Life Notes | Zain Adtani</title>
        <meta name="description" content="Fifteen short Life Notes from Zain Adtani. One new note is featured each day, and each note has its own page." />
        <link rel="canonical" href="https://zainadtani.com/lifenotes" />
      </Helmet>
      <section className="hero-warm px-5 py-12 text-center">
        <h1 className="text-[44px] sm:text-[56px] text-foreground">Life Notes</h1>
        <p className="mx-auto mt-3 max-w-xl font-sans text-[17px] text-foreground/80">
          Short lines I live by. A new one is featured every day. Open any note for a link you can share.
        </p>
      </section>
      <section className="px-5 py-10">
        <ul className="stagger-list mx-auto grid max-w-3xl gap-4">
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
                    <Link
                      to={notePath(i)}
                      className="mt-1.5 block font-sans text-[17px] leading-snug text-[#0A0F1A] underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#447BBE] rounded"
                    >
                      {LIFE_NOTES[i]}
                    </Link>
                  </div>
                  <NoteShareButton text={LIFE_NOTES[i]} url={noteUrl(i)} className="shrink-0" />
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}

export function LifeNotePage() {
  const { noteId } = useParams();
  const number = parseNoteNumber(noteId);
  if (number == null) {
    return (
      <div className="bg-background">
        <Helmet>
          <title>Note not found | Zain Adtani</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <section className="hero-warm px-5 py-16 text-center">
          <h1 className="text-[40px] sm:text-[52px] text-foreground">That note is not in the list</h1>
          <p className="mx-auto mt-3 max-w-md font-sans text-[17px] text-foreground/80">
            There are {LIFE_NOTES.length} Life Notes. Pick one from the archive.
          </p>
          <Link to="/lifenotes" className="btn-cta mt-6">
            See all notes
          </Link>
        </section>
      </div>
    );
  }

  const index = number - 1;
  const text = LIFE_NOTES[index];
  const isToday = index === todaysNoteIndex();
  const url = noteUrl(index);
  return (
    <div className="bg-background">
      <Helmet>
        <title>{`Life Note ${number} | Zain Adtani`}</title>
        <meta name="description" content={text} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={`Life Note ${number} | Zain Adtani`} />
        <meta property="og:description" content={text} />
        <meta property="og:url" content={url} />
      </Helmet>
      <section className="hero-warm px-5 py-14">
        <article className="mx-auto max-w-xl rounded-2xl border border-[#D97706]/30 bg-white p-7 shadow-sm">
          <p className="font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-[#0A0F1A]/55">
            {isToday ? <span className="text-[#DD5013]">Today's note</span> : `Life Note ${number}`}
          </p>
          <h1 className="hero-greeting mt-3 text-[26px] sm:text-[32px] leading-snug text-[#0A0F1A]">
            {text}
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <NoteShareButton text={text} url={url} />
            <Link to="/lifenotes" className="font-sans text-[14px] font-semibold text-[#2F5C90] underline-offset-4 hover:underline">
              All notes
            </Link>
          </div>
        </article>
      </section>
    </div>
  );
}
