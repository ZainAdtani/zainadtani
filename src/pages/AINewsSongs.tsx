import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Clock, Music2, Radio } from "lucide-react";

const TITLE = "AI News Songs | Zain Adtani";
const DESCRIPTION =
  "The day's headlines, turned into a song. A fresh track lands here every morning. Press play and hear what the world sounded like today.";
const CANONICAL = "https://zainadtani.com/resources/ai-news-songs";

/**
 * Small pill badge shown in the player area. The audio files land in
 * /songs/ on Oct 23, so the badge stands in for the player until then.
 */
const ARRIVAL_BADGE = "Arrives Oct 23";

/**
 * Flip this to true the day the mp3 files are dropped into public/songs.
 * The audio elements below already point at the final file paths, so the
 * real players take over with no other edits.
 */
const PLAYER_LIVE = false;

type Song = {
  id: string;
  date: string;
  title: string;
  style: string;
  runtime: string;
  headlines: string;
  src: string;
};

/** Newest first. Drop new songs at the top of this list. */
const SONGS: Song[] = [
  {
    id: "2026-10-14-disco",
    date: "October 14, 2026",
    title: "The News, Sung",
    style: "Funky Disco Pop",
    runtime: "1:41",
    headlines:
      "Apple's new smart home screen, a spy caught at OpenAI, and the tiny gadgets racing to replace your phone.",
    src: "/songs/2026-10-14-disco.mp3",
  },
  {
    id: "2026-10-14-motown",
    date: "October 14, 2026",
    title: "The News, Sung (Soul Version)",
    style: "Motown Soul",
    runtime: "1:32",
    headlines: "The same big stories, sung the soul way.",
    src: "/songs/2026-10-14-motown.mp3",
  },
  {
    id: "2026-10-12-pilot-a",
    date: "October 12, 2026",
    title: "The News, Sung (Pilot A)",
    style: "First Run",
    runtime: "1:08",
    headlines: "The very first test run of the daily news song.",
    src: "/songs/2026-10-12-pilot-a.mp3",
  },
  {
    id: "2026-10-12-pilot-b",
    date: "October 12, 2026",
    title: "The News, Sung (Pilot B)",
    style: "First Run",
    runtime: "1:38",
    headlines: "The second test run, a little longer and looser.",
    src: "/songs/2026-10-12-pilot-b.mp3",
  },
];

function ArrivalPill() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#D97706]/30 bg-[#E9E4A6]/60 px-3 py-1 font-sans text-[12px] font-semibold text-[#A85B05]">
      <Radio className="h-3.5 w-3.5" aria-hidden="true" />
      {ARRIVAL_BADGE}
    </span>
  );
}

function SongCard({ song }: { song: Song }) {
  return (
    <article className="surface-card p-6 sm:p-7">
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-mono text-[12px] uppercase tracking-[0.12em] text-[#2F5C90]">
          {song.date}
        </span>
        <span className="rounded-full border border-[#447BBE]/25 bg-[#447BBE]/10 px-3 py-1 font-sans text-[12px] font-semibold text-[#2F5C90]">
          {song.style}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#0A0F1A]/10 bg-[#0A0F1A]/[0.04] px-3 py-1 font-sans text-[12px] font-semibold text-[#0A0F1A]/70">
          <Clock className="h-3.5 w-3.5" aria-hidden="true" />
          {song.runtime}
        </span>
      </div>

      <h3 className="mt-4 text-[22px] leading-snug text-[#0A0F1A]">{song.title}</h3>

      <p className="mt-2 max-w-2xl font-sans text-[14.5px] leading-7 text-[#0A0F1A]/70">
        <span className="font-semibold text-[#0A0F1A]">Headlines in this track: </span>
        {song.headlines}
      </p>

      <div className="mt-5 rounded-xl border border-dashed border-[#447BBE]/35 bg-[#447BBE]/[0.05] p-4">
        <audio
          controls
          preload="none"
          className={PLAYER_LIVE ? "w-full" : "hidden"}
        >
          <source src={song.src} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>

        {!PLAYER_LIVE && (
          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
            <span className="inline-flex items-center gap-2 font-sans text-[13px] leading-6 text-[#0A0F1A]/65">
              <Music2 className="h-4 w-4 shrink-0 text-[#2F5C90]" aria-hidden="true" />
              The player switches on the morning the tracks land.
            </span>
            <ArrivalPill />
          </div>
        )}
      </div>
    </article>
  );
}

export default function AINewsSongs() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <Helmet>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={CANONICAL} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={CANONICAL} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
      </Helmet>

      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="mx-auto max-w-4xl px-5 pt-6 font-sans text-[13px] text-[#0A0F1A]/55 sm:px-6"
      >
        <Link to="/" className="hover:text-[#2F5C90] transition-colors">
          Home
        </Link>
        <span className="mx-2" aria-hidden="true">
          →
        </span>
        <Link to="/resources" className="hover:text-[#2F5C90] transition-colors">
          Resources
        </Link>
        <span className="mx-2" aria-hidden="true">
          →
        </span>
        <span className="text-[#0A0F1A]">AI News Songs</span>
      </nav>

      {/* Hero */}
      <section className="hero-warm mt-6 px-5 py-14 text-center sm:px-6 md:py-20">
        <div className="mx-auto max-w-3xl">
          <p className="eyebrow">A daily listening habit</p>
          <h1 className="mt-4 text-[40px] leading-[1.08] text-[#0A0F1A] sm:text-[52px] md:text-[60px]">
            AI News Songs
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-[17px] leading-8 text-[#0A0F1A]/75 md:text-[18px]">
            The day's headlines, turned into a song. A fresh track lands here every
            morning. Press play and hear what the world sounded like today.
          </p>
          <p className="mt-4 font-sans text-[13.5px] italic leading-6 text-[#0A0F1A]/55">
            How are these made? That part stays our little secret.
          </p>
        </div>
      </section>

      {/* Song library */}
      <section className="section-y px-5 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 className="text-[26px] leading-tight text-[#0A0F1A] sm:text-[30px]">
              Song Library
            </h2>
            <p className="font-sans text-[13px] font-semibold uppercase tracking-[0.12em] text-[#2F5C90]">
              Newest first
            </p>
          </div>

          <div className="mt-8 space-y-5">
            {SONGS.map((song) => (
              <SongCard key={song.id} song={song} />
            ))}
          </div>

          <p className="mt-10 rounded-xl border border-[#447BBE]/20 bg-[#447BBE]/[0.05] px-5 py-4 text-center font-sans text-[14.5px] leading-7 text-[#0A0F1A]/75">
            New here? Start with the newest song at the top. The library grows every
            morning.
          </p>
        </div>
      </section>
    </div>
  );
}
