import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Clock, Music2, Radio } from "lucide-react";

const TITLE = "AI News Songs | Zain Adtani";
const DESCRIPTION =
  "The day's headlines, turned into a song. A fresh track lands here every morning. Press play and hear what the world sounded like today.";
const CANONICAL = "https://zainadtani.com/resources/ai-news-songs";

/**
 * Small pill badge shown in the player area. The player is live now, so the
 * badge works as a live indicator: a fresh song lands every morning and plays
 * through Suno.
 */
const ARRIVAL_BADGE = "New song every morning";

/**
 * The player is live. Songs play through Suno embed players, so each entry
 * below carries its own sunoUrl.
 */
const PLAYER_LIVE = true;

type Song = {
  id: string;
  date: string;
  title: string;
  style: string;
  runtime: string;
  headlines: string;
  src: string;
  sunoUrl?: string;
};

/** Newest first. Drop new songs at the top of this list. */
const SONGS: Song[] = [
  {
    id: "2026-10-21-doowop",
    date: "October 21, 2026",
    title: "The News, Sung",
    style: "Doo-Wop Pop",
    runtime: "1:26",
    headlines: "The day's top headlines, turned into a song.",
    src: "",
    sunoUrl: "https://suno.com/song/60bc0709-6922-4ad6-bd2e-eda98f779ae2",
  },
  {
    id: "2026-10-20-brass",
    date: "October 20, 2026",
    title: "The News, Sung",
    style: "Brass Pop",
    runtime: "1:26",
    headlines: "The day's top headlines, turned into a song.",
    src: "",
    sunoUrl: "https://suno.com/song/81fc0cae-4397-43ba-bbe2-5cf8792b036a",
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
  const embedUrl = song.sunoUrl
    ? song.sunoUrl.replace("suno.com/song/", "suno.com/embed/")
    : "";

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
        {song.sunoUrl ? (
          <div>
            <iframe
              title={`${song.title} on Suno`}
              src={embedUrl}
              width="100%"
              height="240"
              frameBorder="0"
              allow="autoplay; encrypted-media; fullscreen"
              loading="lazy"
              className="block w-full rounded-lg border-0"
            />
            <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
              <a
                href={song.sunoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-sans text-[13px] font-semibold text-[#2F5C90] underline underline-offset-4 transition-colors hover:text-[#DD5013]"
              >
                <Music2 className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                Open in Suno
              </a>
              <ArrivalPill />
            </div>
          </div>
        ) : (
          PLAYER_LIVE && (
            <audio controls preload="none" className="w-full">
              <source src={song.src} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          )
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
