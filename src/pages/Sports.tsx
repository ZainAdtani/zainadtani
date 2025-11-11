import { useEffect, useMemo, useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, ExternalLink, RefreshCw } from "lucide-react";
import { addDays, format } from "date-fns";

/** ---------- types ---------- **/
type LiveGame = {
  id: string;
  startTime: string;
  statusType: "STATUS_SCHEDULED" | "STATUS_IN_PROGRESS" | "STATUS_FINAL" | string;
  statusDetail: string;
  away: { name: string; abbr: string; score: number; logo?: string };
  home: { name: string; abbr: string; score: number; logo?: string };
  boxUrl?: string;
};

type StandingRow = {
  rank: number;
  teamId: string;
  team: string;
  abbr: string;
  logo?: string;
  wins: number;
  losses: number;
  pct: number; // 0..1
  gb: string; // "—" or "1.5"
};

type StandingsState = {
  east: StandingRow[];
  west: StandingRow[];
};

/** ---------- page ---------- **/

export default function Sports() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [games, setGames] = useState<LiveGame[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [refreshNonce, setRefreshNonce] = useState(0);
  const [showBall, setShowBall] = useState<boolean>(true);

  // standings
  const [standings, setStandings] = useState<StandingsState>({ east: [], west: [] });
  const [stLoading, setStLoading] = useState<boolean>(false);
  const [stError, setStError] = useState<string | null>(null);

  // load persisted toggle
  useEffect(() => {
    const saved = localStorage.getItem("sports:ball");
    if (saved !== null) setShowBall(saved === "1");
  }, []);
  useEffect(() => {
    localStorage.setItem("sports:ball", showBall ? "1" : "0");
  }, [showBall]);

  const espnDate = useMemo(() => format(selectedDate, "yyyyMMdd"), [selectedDate]);

  /** ---------- live scores (existing) ---------- **/
  const load = useCallback(
    async (manual = false) => {
      if (!manual) setLoading(true);
      setError(null);
      try {
        const url = `https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard?dates=${espnDate}`;
        const r = await fetch(url, { cache: "no-store" });
        if (!r.ok) throw new Error("fetch failed");
        const json = await r.json();

        const events = (json?.events ?? []) as any[];
        const parsed: LiveGame[] = events.map((ev) => {
          const comp = ev?.competitions?.[0];
          const link =
            comp?.links?.find((l: any) => (l.text || "").toLowerCase().includes("box"))?.href ||
            comp?.links?.find((l: any) => (l.text || "").toLowerCase().includes("gamecast"))?.href ||
            ev?.links?.[0]?.href;

          const competitors = (comp?.competitors ?? []) as any[];
          const homeRaw = competitors.find((c) => c?.homeAway === "home");
          const awayRaw = competitors.find((c) => c?.homeAway === "away");

          const firstLogo = (t: any) =>
            t?.team?.logo || t?.team?.logos?.[0]?.href || t?.team?.logos?.[0]?.url || undefined;

          const toTeam = (c: any) => ({
            name: c?.team?.displayName ?? "",
            abbr: c?.team?.abbreviation ?? "",
            score: Number(c?.score ?? 0),
            logo: firstLogo(c),
          });

          const statusType = comp?.status?.type?.name ?? ev?.status?.type?.name ?? "STATUS_SCHEDULED";
          const statusDetail = comp?.status?.type?.shortDetail ?? ev?.status?.type?.shortDetail ?? "";
          const startTime = comp?.date ?? ev?.date ?? new Date().toISOString();

          return {
            id: ev?.id ?? crypto.randomUUID(),
            startTime,
            statusType,
            statusDetail,
            away: toTeam(awayRaw || {}),
            home: toTeam(homeRaw || {}),
            boxUrl: link,
          };
        });

        parsed.sort((a, b) => {
          const rank = (g: LiveGame) =>
            g.statusType === "STATUS_IN_PROGRESS"
              ? 0
              : g.statusType === "STATUS_SCHEDULED"
                ? 1
                : g.statusType === "STATUS_FINAL"
                  ? 2
                  : 3;
          if (rank(a) !== rank(b)) return rank(a) - rank(b);
          return new Date(a.startTime).getTime() - new Date(b.startTime).getTime();
        });

        setGames(parsed);
        setLastUpdated(new Date());
      } catch {
        setError("Unable to load live scores right now.");
      } finally {
        setLoading(false);
      }
    },
    [espnDate],
  );

  useEffect(() => {
    let timer: number | undefined;
    load();
    timer = window.setInterval(() => load(true), 45000);
    return () => {
      if (timer) window.clearInterval(timer);
    };
  }, [load, refreshNonce]);

  const headerSubtitle = lastUpdated ? `Updated ${format(lastUpdated, "h:mm:ss a")}` : "Live NBA scores";
  const goPrev = () => setSelectedDate((d) => addDays(d, -1));
  const goNext = () => setSelectedDate((d) => addDays(d, 1));
  const goToday = () => setSelectedDate(new Date());
  const doRefresh = () => setRefreshNonce((n) => n + 1);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /** ---------- UI ---------- **/
  return (
    <div
      className={`
        min-h-screen relative overflow-hidden
        bg-[linear-gradient(180deg,#f6f7fb,#eef2f8)]
        dark:bg-[linear-gradient(180deg,#0b1020,#0a0f1a)]
      `}
    >
      <Helmet>
        <title>Sports | Zain Adtani</title>
      </Helmet>

      {/* subtle background accents */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40 dark:opacity-20"
        style={{
          background:
            "radial-gradient(600px 300px at 110% 110%, rgba(16,163,127,0.10), transparent 60%), radial-gradient(500px 260px at -10% -10%, rgba(255,138,0,0.08), transparent 60%)",
        }}
      />

      {/* BOUNCING BASKETBALL */}
      <style>{`
        @keyframes bounceBall {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-18px) scale(1.02); }
        }
        .cut { border-bottom: 2px dashed rgba(0,0,0,.12); }
        .dark .cut { border-bottom-color: rgba(255,255,255,.15); }
      `}</style>

      {showBall && (
        <div
          aria-hidden
          className="fixed bottom-8 right-8 sm:bottom-6 sm:right-6 z-30 pointer-events-none"
          style={{
            width: 56,
            height: 56,
            animation: "bounceBall 1.2s ease-in-out infinite",
            filter: "drop-shadow(0 6px 10px rgba(0,0,0,.15))",
          }}
          title="🏀"
        >
          <svg viewBox="0 0 100 100">
            <defs>
              <radialGradient id="g" cx="30%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#ffb37a" />
                <stop offset="100%" stopColor="#ff7a1a" />
              </radialGradient>
            </defs>
            <circle cx="50" cy="50" r="48" fill="url(#g)" stroke="#cc5e10" strokeWidth="4" />
            <path d="M50 2 v96 M2 50 h96" stroke="#8a3a03" strokeWidth="4" />
            <path d="M14 18 C44 44, 56 56, 82 86" stroke="#8a3a03" strokeWidth="4" fill="none" />
            <path d="M86 14 C56 44, 44 56, 18 82" stroke="#8a3a03" strokeWidth="4" fill="none" />
          </svg>
        </div>
      )}

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-1">Sports</h1>
        <p className="text-sm text-muted-foreground mb-6">NBA live scores &amp; schedules</p>

        {/* ---------------- LIVE SCORES (unchanged) ---------------- */}
        <Card className="border border-black/5 dark:border-white/10 bg-white/90 dark:bg-neutral-900/80 backdrop-blur shadow-sm">
          <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="text-xl sm:text-2xl">NBA — {format(selectedDate, "EEE, MMM d")}</CardTitle>
              <p className="text-xs sm:text-sm text-muted-foreground">{headerSubtitle}</p>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={goPrev} aria-label="Previous day">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={goToday}>
                Today
              </Button>
              <Button variant="outline" size="sm" onClick={goNext} aria-label="Next day">
                <ChevronRight className="h-4 w-4" />
              </Button>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(selectedDate, "MMM dd, yyyy")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <Calendar mode="single" selected={selectedDate} onSelect={(d) => d && setSelectedDate(d)} />
                </PopoverContent>
              </Popover>

              <Button variant="outline" size="sm" onClick={() => setRefreshNonce((n) => n + 1)} title="Force refresh">
                <RefreshCw className="h-4 w-4 mr-1" />
                Refresh
              </Button>

              {/* Ball toggle */}
              <Button
                variant={showBall ? "default" : "outline"}
                size="sm"
                onClick={() => setShowBall((s) => !s)}
                title={showBall ? "Hide basketball" : "Show basketball"}
              >
                {showBall ? "🏀 On" : "🏀 Off"}
              </Button>
            </div>
          </CardHeader>

          <CardContent>
            {loading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-28 rounded-2xl bg-neutral-200/70 dark:bg-neutral-800/70 animate-pulse" />
                ))}
              </div>
            )}

            {error && <p className="text-center py-10 text-red-600 dark:text-red-400">{error}</p>}

            {!loading && !error && games.length === 0 && (
              <p className="text-center py-10 text-muted-foreground">No games scheduled.</p>
            )}

            {!loading && !error && games.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {games.map((g) => {
                  const live = g.statusType === "STATUS_IN_PROGRESS";
                  const final = g.statusType === "STATUS_FINAL";
                  return (
                    <div
                      key={g.id}
                      className="rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-neutral-900 p-4 shadow-sm hover:shadow-md transition"
                    >
                      <div className="flex items-center justify-between text-[11px] mb-2">
                        <span
                          className={[
                            "px-2 py-0.5 rounded-full font-medium tabular-nums",
                            live
                              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-300"
                              : final
                                ? "bg-neutral-100 text-neutral-700 dark:bg-neutral-700/30 dark:text-neutral-300"
                                : "bg-blue-100 text-blue-700 dark:bg-blue-400/15 dark:text-blue-300",
                          ].join(" ")}
                        >
                          {final ? "Final" : live ? g.statusDetail || "Live" : format(new Date(g.startTime), "h:mm a")}
                        </span>

                        <a
                          href={g.boxUrl || `https://www.espn.com/nba/game?gameId=${g.id}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] text-blue-700 dark:text-blue-300 hover:underline"
                        >
                          Details <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {g.away.logo ? (
                            <img src={g.away.logo} alt={g.away.name} className="w-8 h-8 object-contain" />
                          ) : (
                            <div className="w-8 h-8 rounded bg-neutral-100 dark:bg-neutral-800 grid place-items-center text-[10px]">
                              {g.away.abbr || "AWY"}
                            </div>
                          )}
                          <div>
                            <div className="text-neutral-800 dark:text-neutral-200 font-semibold">
                              {g.away.abbr || g.away.name}
                            </div>
                            <div className="text-neutral-500 dark:text-neutral-400 text-[11px]">{g.away.name}</div>
                          </div>
                        </div>
                        <div className="text-2xl tabular-nums text-neutral-900 dark:text-neutral-100">
                          {final || live ? g.away.score : "–"}
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-3">
                          {g.home.logo ? (
                            <img src={g.home.logo} alt={g.home.name} className="w-8 h-8 object-contain" />
                          ) : (
                            <div className="w-8 h-8 rounded bg-neutral-100 dark:bg-neutral-800 grid place-items-center text-[10px]">
                              {g.home.abbr || "HOME"}
                            </div>
                          )}
                          <div>
                            <div className="text-neutral-800 dark:text-neutral-200 font-semibold">
                              {g.home.abbr || g.home.name}
                            </div>
                            <div className="text-neutral-500 dark:text-neutral-400 text-[11px]">{g.home.name}</div>
                          </div>
                        </div>
                        <div className="text-2xl tabular-nums text-neutral-900 dark:text-neutral-100">
                          {final || live ? g.home.score : "–"}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* ---------------- STANDINGS (new) ---------------- */}
        <Card className="mt-8 border border-black/5 dark:border-white/10 bg-white/90 dark:bg-neutral-900/80 backdrop-blur shadow-sm">
          <CardHeader className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="text-xl sm:text-2xl">Standings — {seasonYear}</CardTitle>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Top 6 earn automatic playoff spots; lines after #6 and #10.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={loadStandings}>
                <RefreshCw className="h-4 w-4 mr-1" />
                Refresh
              </Button>
            </div>
          </CardHeader>

          <CardContent>
            {stLoading && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="h-72 rounded-2xl bg-neutral-200/70 dark:bg-neutral-800/70 animate-pulse" />
                <div className="h-72 rounded-2xl bg-neutral-200/70 dark:bg-neutral-800/70 animate-pulse" />
              </div>
            )}

            {stError && <p className="text-center py-10 text-red-600 dark:text-red-400">{stError}</p>}

            {!stLoading && !stError && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <StandingsTable title="Eastern Conference" rows={standings.east} />
                <StandingsTable title="Western Conference" rows={standings.west} />
              </div>
            )}
          </CardContent>
        </Card>

        {/* ---------------- UNOFFICIAL STREAM LINKS (new) ---------------- */}
        <Card className="mt-8 border border-amber-300/40 bg-amber-50/80 dark:bg-amber-950/20 dark:border-amber-300/20 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl flex items-center gap-2">
              <span className="text-amber-600 dark:text-amber-300">⚠️</span>
              Where to watch (unofficial) — use at your own risk
            </CardTitle>
            <p className="text-sm text-amber-800/90 dark:text-amber-200/80">
              These are third-party sites. Expect pop-ups. Close them quickly and repeatedly. On Mac,{" "}
              <span className="font-semibold">⌘ + W</span> closes the current tab/window. Links may change—I'll update
              when I can.
            </p>
          </CardHeader>
          <CardContent>
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                "https://crackstreams.ms/stream/brooklyn-nets-vs-minnesota-timberwolves",
                "https://crackstreams.io/nba-streams2",
                "https://app.buffstream.io/index-version-24",
                "https://streameasthd.com/v11",
                "https://crackstreams.io/nba-streams2", // duplicate on purpose in source; we'll dedupe below
                "https://crackstreams.ms/",
              ]
                // de-dupe
                .filter((v, i, a) => a.indexOf(v) === i)
                .map((href, i) => (
                  <li key={href} className="group">
                    <a
                      href={href}
                      target="_blank"
                      rel="nofollow noreferrer"
                      className="flex items-center justify-between rounded-xl border bg-white/90 dark:bg-neutral-900/80 dark:border-white/10 border-black/5 px-4 py-3 hover:shadow-sm transition"
                    >
                      <div>
                        <div className="font-medium">Link {i + 1}</div>
                        <div className="text-xs text-muted-foreground truncate max-w-[32ch]">{href}</div>
                      </div>
                      <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-foreground" />
                    </a>
                  </li>
                ))}
            </ul>
            <p className="mt-3 text-xs text-muted-foreground">
              Tip: If a page spawns a pop-up, close it immediately and return to the main player. Use an ad-blocker if
              possible.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

/** ---------- components ---------- **/
function StandingsTable({ title, rows }: { title: string; rows: StandingRow[] }) {
  return (
    <div className="rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-neutral-900 overflow-hidden">
      <div className="px-4 py-3 border-b border-black/5 dark:border-white/10">
        <h3 className="font-semibold">{title}</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-left text-xs uppercase text-muted-foreground">
            <tr className="[&>th]:px-4 [&>th]:py-2">
              <th className="w-10">#</th>
              <th>Team</th>
              <th className="text-right w-16">W-L</th>
              <th className="text-right w-14">PCT</th>
              <th className="text-right w-14">GB</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => {
              const borderClass = r.rank === 6 || r.rank === 10 ? "cut" : "";
              return (
                <tr key={r.teamId || r.rank} className={borderClass}>
                  <td className="px-4 py-2 tabular-nums text-muted-foreground">{r.rank}</td>
                  <td className="px-4 py-2">
                    <div className="flex items-center gap-2">
                      {r.logo ? (
                        <img src={r.logo} alt={r.team} className="w-6 h-6 object-contain" />
                      ) : (
                        <div className="w-6 h-6 rounded bg-neutral-100 dark:bg-neutral-800 grid place-items-center text-[10px]">
                          {r.abbr || "—"}
                        </div>
                      )}
                      <span className="font-medium">{r.team}</span>
                      <span className="text-muted-foreground text-xs">({r.abbr})</span>
                    </div>
                  </td>
                  <td className="px-4 py-2 text-right tabular-nums">
                    {r.wins}-{r.losses}
                  </td>
                  <td className="px-4 py-2 text-right tabular-nums">{r.pct ? r.pct.toFixed(3).slice(1) : ".000"}</td>
                  <td className="px-4 py-2 text-right tabular-nums">{r.gb || "—"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
