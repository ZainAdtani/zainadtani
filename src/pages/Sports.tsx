import { useEffect, useMemo, useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, ExternalLink, RefreshCw, Tv } from "lucide-react";
import { addDays, format } from "date-fns";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;

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
  pct: number;
  gb: string;
  streak?: string;
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
  const [stLastUpdated, setStLastUpdated] = useState<string | null>(null);
  const [stStale, setStStale] = useState(false);
  const [standingsTab, setStandingsTab] = useState<"east" | "west">("east");

  // load persisted toggle
  useEffect(() => {
    const saved = localStorage.getItem("sports:ball");
    if (saved !== null) setShowBall(saved === "1");
  }, []);
  useEffect(() => {
    localStorage.setItem("sports:ball", showBall ? "1" : "0");
  }, [showBall]);

  const espnDate = useMemo(() => format(selectedDate, "yyyyMMdd"), [selectedDate]);

  /** ---------- live scores ---------- **/
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

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /** ---------- standings ---------- **/
  const loadStandings = useCallback(async (forceRefresh = false) => {
    try {
      setStLoading(true);
      setStError(null);
      setStStale(false);

      const url = `${SUPABASE_URL}/functions/v1/nba-standings${forceRefresh ? "?refresh=1" : ""}`;
      const r = await fetch(url, {
        headers: {
          "apikey": import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string,
        },
      });

      if (!r.ok) throw new Error("standings fetch failed");
      const data = await r.json();

      if (data.error && !data.east) throw new Error(data.error);

      setStandings({ east: data.east || [], west: data.west || [] });
      setStLastUpdated(data.fetchedAt || data.cachedAt || null);
      setStStale(!!data.stale);
    } catch (err) {
      console.error("standings error", err);
      setStError("Unable to load standings right now.");
    } finally {
      setStLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStandings();
  }, [loadStandings, refreshNonce]);

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
        <p className="text-sm text-muted-foreground mb-6">NBA live scores & schedules</p>

        {/* ---------------- LIVE SCORES ---------------- */}
        <Card className="border border-black/5 dark:border-white/10 bg-white/90 dark:bg-neutral-900/80 backdrop-blur shadow-sm">
          <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="text-xl sm:text-2xl">NBA — {format(selectedDate, "EEE, MMM d")}</CardTitle>
              <p className="text-xs sm:text-sm text-muted-foreground">
                {lastUpdated ? `Updated ${format(lastUpdated, "h:mm:ss a")}` : "Live NBA scores"}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={goPrev} aria-label="Previous day">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => setSelectedDate(new Date())}>
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

        {/* ---------------- WHERE TO WATCH (official) ---------------- */}
        <Card className="mt-8 border border-border bg-card backdrop-blur shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl flex items-center gap-2">
              <Tv className="w-5 h-5 text-primary" />
              Where to Watch
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Official ways to catch NBA games live.
            </p>
          </CardHeader>
          <CardContent>
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { label: "NBA League Pass", desc: "Official live & replay streaming", href: "https://www.nba.com/league-pass" },
                { label: "ESPN / ABC", desc: "National broadcast games", href: "https://www.espn.com/watch/" },
                { label: "TNT / Max", desc: "Select national games on TNT", href: "https://www.tntdrama.com/sports" },
                { label: "Amazon Prime Video", desc: "Selected NBA games", href: "https://www.amazon.com/b?node=2858778011" },
                { label: "YouTube TV", desc: "Live local + national channels", href: "https://tv.youtube.com/" },
                { label: "Fubo TV", desc: "Sports-focused cable alternative", href: "https://www.fubo.tv/" },
              ].map((opt) => (
                <li key={opt.href} className="group">
                  <a
                    href={opt.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-xl border border-border bg-background px-4 py-3 hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <div>
                      <div className="font-medium text-foreground">{opt.label}</div>
                      <div className="text-xs text-muted-foreground">{opt.desc}</div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-foreground shrink-0" />
                  </a>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* ---------------- STANDINGS ---------------- */}
        <Card className="mt-8 border border-border bg-card backdrop-blur shadow-sm">
          <CardHeader className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="text-xl sm:text-2xl">NBA Standings</CardTitle>
              <p className="text-xs sm:text-sm text-muted-foreground">
                {stLastUpdated
                  ? `${stStale ? "⚠️ Stale — last updated" : "Updated"} ${format(new Date(stLastUpdated), "MMM d, h:mm a")}`
                  : "Top 6 earn automatic playoff spots · Play-in: 7–10"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => loadStandings(true)} disabled={stLoading}>
                <RefreshCw className={`h-4 w-4 mr-1 ${stLoading ? "animate-spin" : ""}`} />
                Refresh
              </Button>
            </div>
          </CardHeader>

          <CardContent>
            {stLoading && (
              <div className="h-72 rounded-2xl bg-muted/50 animate-pulse" />
            )}

            {stError && (
              <div className="text-center py-10 space-y-3">
                <p className="text-destructive">{stError}</p>
                <Button variant="outline" size="sm" onClick={() => loadStandings(true)}>
                  <RefreshCw className="h-4 w-4 mr-1" /> Retry
                </Button>
              </div>
            )}

            {!stLoading && !stError && (
              <Tabs value={standingsTab} onValueChange={(v) => setStandingsTab(v as "east" | "west")}>
                <TabsList className="mb-4">
                  <TabsTrigger value="east">Eastern Conference</TabsTrigger>
                  <TabsTrigger value="west">Western Conference</TabsTrigger>
                </TabsList>
                <TabsContent value="east">
                  <StandingsTable rows={standings.east} />
                </TabsContent>
                <TabsContent value="west">
                  <StandingsTable rows={standings.west} />
                </TabsContent>
              </Tabs>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

/** ---------- components ---------- **/
function StandingsTable({ rows }: { rows: StandingRow[] }) {
  return (
    <div className="rounded-2xl border border-border bg-background overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-left text-xs uppercase text-muted-foreground bg-muted/40">
            <tr className="[&>th]:px-4 [&>th]:py-2.5">
              <th className="w-10 sticky left-0 bg-muted/40">#</th>
              <th className="sticky left-10 bg-muted/40 min-w-[140px]">Team</th>
              <th className="text-right w-16">W-L</th>
              <th className="text-right w-14">PCT</th>
              <th className="text-right w-14">GB</th>
              <th className="text-right w-16">Streak</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => {
              const isPlayoffCutline = r.rank === 6;
              const isPlayInCutline = r.rank === 10;
              return (
                <tr
                  key={r.teamId || r.rank}
                  className={[
                    "border-b border-border/50 hover:bg-muted/30 transition-colors",
                    isPlayoffCutline ? "border-b-2 border-b-primary/40" : "",
                    isPlayInCutline ? "border-b-2 border-b-destructive/30" : "",
                  ].join(" ")}
                >
                  <td className="px-4 py-2.5 tabular-nums sticky left-0 bg-background">
                    <span className={[
                      "inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold",
                      r.rank <= 6 ? "bg-primary/10 text-primary" : r.rank <= 10 ? "bg-accent/20 text-foreground" : "text-muted-foreground",
                    ].join(" ")}>{r.rank}</span>
                  </td>
                  <td className="px-4 py-2.5 sticky left-10 bg-background">
                    <div className="flex items-center gap-2">
                      {r.logo ? (
                        <img src={r.logo} alt={r.team} className="w-6 h-6 object-contain shrink-0" />
                      ) : (
                        <div className="w-6 h-6 rounded bg-muted grid place-items-center text-[10px] shrink-0">
                          {r.abbr || "—"}
                        </div>
                      )}
                      <span className="font-medium text-foreground">{r.team}</span>
                      <span className="text-muted-foreground text-xs hidden sm:inline">({r.abbr})</span>
                    </div>
                  </td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-foreground">
                    {r.wins}-{r.losses}
                  </td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-muted-foreground">
                    {r.pct ? r.pct.toFixed(3).slice(1) : ".000"}
                  </td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-muted-foreground">{r.gb || "—"}</td>
                  <td className="px-4 py-2.5 text-right tabular-nums">
                    <span className={[
                      "text-xs font-medium",
                      r.streak?.startsWith("W") ? "text-emerald-600 dark:text-emerald-400" : r.streak?.startsWith("L") ? "text-destructive" : "text-muted-foreground",
                    ].join(" ")}>{r.streak || "—"}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {rows.length > 0 && (
        <div className="px-4 py-2 border-t border-border/50 flex items-center gap-4 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1.5"><span className="inline-block w-3 h-3 rounded-full bg-primary/20" /> Top 6 — Playoffs</span>
          <span className="flex items-center gap-1.5"><span className="inline-block w-3 h-3 rounded-full bg-accent/30" /> 7–10 — Play-in</span>
        </div>
      )}
    </div>
  );
}

