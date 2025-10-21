import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, ExternalLink, RefreshCw } from "lucide-react";
import { format } from "date-fns";

type LiveGame = {
  id: string;
  startTime: string;
  statusType: "STATUS_SCHEDULED" | "STATUS_IN_PROGRESS" | "STATUS_FINAL" | string;
  statusDetail: string;
  away: { name: string; abbr: string; score: number; logo?: string };
  home: { name: string; abbr: string; score: number; logo?: string };
  boxUrl?: string;
};

export default function Sports() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [games, setGames] = useState<LiveGame[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const espnDate = useMemo(() => format(selectedDate, "yyyyMMdd"), [selectedDate]);

  useEffect(() => {
    let timer: number | undefined;

    const load = async (manual = false) => {
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
    };

    load();
    timer = window.setInterval(() => load(true), 45000);
    return () => {
      if (timer) window.clearInterval(timer);
    };
  }, [espnDate]);

  const headerSubtitle = lastUpdated ? `Updated ${format(lastUpdated, "h:mm:ss a")}` : "Live NBA scores";

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#ecf3ff,#eaf1ff)] relative overflow-hidden">
      <Helmet>
        <title>Sports | Zain Adtani</title>
      </Helmet>

      {/* BOUNCING BASKETBALL */}
      <style>{`
        @keyframes bounceBall {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-18px) scale(1.02); }
        }
        .basketball {
          animation: bounceBall 1.2s ease-in-out infinite;
          filter: drop-shadow(0 6px 10px rgba(0,0,0,.15));
        }
      `}</style>
      <div aria-hidden className="fixed bottom-6 right-6 z-10 basketball" style={{ width: 56, height: 56 }} title="🏀">
        {/* simple SVG ball */}
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

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <h1 className="text-4xl font-bold mb-2">Sports</h1>
        <p className="text-muted-foreground mb-6">NBA live scores & schedules</p>

        {/* just NBA (no tabs) */}
        <Card className="border-white/60 bg-white/80 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between gap-3">
            <div>
              <CardTitle className="text-2xl">NBA — {format(selectedDate, "EEE, MMM d")}</CardTitle>
              <p className="text-sm text-muted-foreground">{headerSubtitle}</p>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setSelectedDate(new Date())}>
                Today
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

              <Button variant="outline" size="sm" onClick={() => setSelectedDate(new Date(selectedDate))}>
                <RefreshCw className="h-4 w-4 mr-1" />
                Refresh
              </Button>
            </div>
          </CardHeader>

          <CardContent>
            {loading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-28 rounded-xl bg-slate-200/60 animate-pulse" />
                ))}
              </div>
            )}

            {error && <p className="text-center py-10 text-destructive">{error}</p>}

            {!loading && !error && games.length === 0 && <p className="text-center py-10">No games scheduled.</p>}

            {!loading && !error && games.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {games.map((g) => {
                  const live = g.statusType === "STATUS_IN_PROGRESS";
                  const final = g.statusType === "STATUS_FINAL";

                  return (
                    <div key={g.id} className="rounded-2xl border bg-white p-4 shadow-sm hover:shadow-md transition">
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span
                          className={`px-2 py-0.5 rounded-full ${
                            live
                              ? "bg-green-100 text-green-700"
                              : final
                                ? "bg-slate-100 text-slate-700"
                                : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {final ? "Final" : live ? g.statusDetail || "Live" : format(new Date(g.startTime), "h:mm a")}
                        </span>
                        <a
                          href={g.boxUrl || `https://www.espn.com/nba/game?gameId=${g.id}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-blue-700 hover:underline"
                        >
                          Details <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>

                      {/* teams with logos */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {g.away.logo ? (
                            <img src={g.away.logo} alt={g.away.name} className="w-8 h-8 object-contain" />
                          ) : (
                            <div className="w-8 h-8 rounded bg-slate-100 grid place-items-center text-xs">
                              {g.away.abbr || "AWY"}
                            </div>
                          )}
                          <div>
                            <div className="text-slate-700 font-semibold">{g.away.abbr || g.away.name}</div>
                            <div className="text-slate-400 text-xs">{g.away.name}</div>
                          </div>
                        </div>
                        <div className="text-2xl tabular-nums">{final || live ? g.away.score : "-"}</div>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-3">
                          {g.home.logo ? (
                            <img src={g.home.logo} alt={g.home.name} className="w-8 h-8 object-contain" />
                          ) : (
                            <div className="w-8 h-8 rounded bg-slate-100 grid place-items-center text-xs">
                              {g.home.abbr || "HOME"}
                            </div>
                          )}
                          <div>
                            <div className="text-slate-700 font-semibold">{g.home.abbr || g.home.name}</div>
                            <div className="text-slate-400 text-xs">{g.home.name}</div>
                          </div>
                        </div>
                        <div className="text-2xl tabular-nums">{final || live ? g.home.score : "-"}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
