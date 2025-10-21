import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, ExternalLink, RefreshCw } from "lucide-react";
import { format } from "date-fns";

type LiveGame = {
  id: string;
  startTime: string; // ISO
  statusType: "STATUS_SCHEDULED" | "STATUS_IN_PROGRESS" | "STATUS_FINAL" | string;
  statusDetail: string; // e.g., "Q3 05:21", "Final"
  leagueLabel: string;
  away: { name: string; abbr: string; score: number };
  home: { name: string; abbr: string; score: number };
  boxUrl?: string;
};

export default function Sports() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [games, setGames] = useState<LiveGame[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // YYYYMMDD for ESPN
  const espnDate = useMemo(() => format(selectedDate, "yyyyMMdd"), [selectedDate]);

  useEffect(() => {
    let timer: number | undefined;

    const load = async (manual = false) => {
      if (!manual) setLoading(true);
      setError(null);
      try {
        const url = `https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard?dates=${espnDate}`;
        const r = await fetch(url, { cache: "no-store" });
        if (!r.ok) throw new Error("Failed to fetch ESPN scoreboard");
        const json = await r.json();

        const events = (json?.events ?? []) as any[];

        const parsed: LiveGame[] = events.map((ev) => {
          const comp = ev?.competitions?.[0];
          const boxUrl =
            comp?.links?.find(
              (l: any) => l.text?.toLowerCase().includes("gamecast") || l.text?.toLowerCase().includes("box score"),
            )?.href || ev?.links?.[0]?.href;

          // competitors: home/away
          const [c1, c2] = (comp?.competitors ?? []) as any[];
          const homeRaw = [c1, c2].find((c: any) => c?.homeAway === "home");
          const awayRaw = [c1, c2].find((c: any) => c?.homeAway === "away");

          const toTeam = (c: any) => ({
            name: c?.team?.displayName ?? "",
            abbr: c?.team?.abbreviation ?? "",
            score: Number(c?.score ?? 0),
          });

          const statusType = comp?.status?.type?.name ?? ev?.status?.type?.name ?? "STATUS_SCHEDULED";
          const statusDetail = comp?.status?.type?.shortDetail ?? ev?.status?.type?.shortDetail ?? "";
          const startTime = comp?.date ?? ev?.date ?? new Date().toISOString();

          return {
            id: ev?.id ?? crypto.randomUUID(),
            startTime,
            statusType,
            statusDetail,
            leagueLabel: json?.leagues?.[0]?.abbreviation ?? "NBA",
            away: toTeam(awayRaw || {}),
            home: toTeam(homeRaw || {}),
            boxUrl,
          };
        });

        // Sort: in-progress first, then upcoming by time, then finals
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
      } catch (e: any) {
        setError("Unable to load live scores right now.");
      } finally {
        setLoading(false);
      }
    };

    load();

    // Poll every ~45s for live updates on the selected date
    timer = window.setInterval(() => load(true), 45000);

    return () => {
      if (timer) window.clearInterval(timer);
    };
  }, [espnDate]);

  const headerSubtitle = lastUpdated ? `Updated ${format(lastUpdated, "h:mm:ss a")}` : "Live NBA scores";

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#ecf3ff,#eaf1ff)]">
      <Helmet>
        <title>Sports | Zain Adtani</title>
      </Helmet>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <h1 className="text-4xl font-bold mb-2">Sports</h1>
        <p className="text-muted-foreground mb-6">NBA live scores & schedules</p>

        <Tabs defaultValue="nba">
          <TabsList className="bg-white">
            <TabsTrigger value="nba">NBA</TabsTrigger>
            <TabsTrigger value="other" disabled>
              Other (soon)
            </TabsTrigger>
          </TabsList>

          <TabsContent value="nba" className="mt-6">
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
                      const upcoming = g.statusType === "STATUS_SCHEDULED";

                      return (
                        <div
                          key={g.id}
                          className="rounded-2xl border bg-white p-4 shadow-sm hover:shadow-md transition"
                        >
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
                              {final
                                ? "Final"
                                : live
                                  ? g.statusDetail || "Live"
                                  : format(new Date(g.startTime), "h:mm a")}
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

                          <div className="flex items-center justify-between font-semibold text-lg">
                            <div className="flex-1 pr-2">
                              <div className="text-slate-700">{g.away.abbr || g.away.name}</div>
                              <div className="text-slate-400 text-xs">{g.away.name}</div>
                            </div>
                            <div className="text-2xl tabular-nums">{final || live ? g.away.score : "-"}</div>
                          </div>

                          <div className="flex items-center justify-between font-semibold text-lg mt-1">
                            <div className="flex-1 pr-2">
                              <div className="text-slate-700">{g.home.abbr || g.home.name}</div>
                              <div className="text-slate-400 text-xs">{g.home.name}</div>
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
          </TabsContent>

          <TabsContent value="other">
            <Card>
              <CardContent className="py-12">
                <p className="text-center">More leagues coming soon.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
