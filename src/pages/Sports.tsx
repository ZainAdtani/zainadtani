import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { format } from "date-fns";

interface Game {
  id: number;
  date: string;
  home_team: { full_name: string; abbreviation: string };
  visitor_team: { full_name: string; abbreviation: string };
  home_team_score: number;
  visitor_team_score: number;
  status: string;
  time: string;
}

export default function Sports() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchGames(selectedDate);
  }, [selectedDate]);

  const fetchGames = async (date: Date) => {
    const dateStr = format(date, "yyyy-MM-dd");
    const cacheKey = `nba_games_${dateStr}`;
    const cached = sessionStorage.getItem(cacheKey);

    if (cached) {
      setGames(JSON.parse(cached));
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://www.balldontlie.io/api/v1/games?dates[]=${dateStr}`);
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      setGames(data.data || []);
      sessionStorage.setItem(cacheKey, JSON.stringify(data.data || []));
    } catch {
      setError("Unable to load games");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Sports | Zain Adtani</title>
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Sports</h1>

        <Tabs defaultValue="nba" id="nba">
          <TabsList>
            <TabsTrigger value="nba">NBA</TabsTrigger>
            <TabsTrigger value="other">Other</TabsTrigger>
          </TabsList>

          <TabsContent value="nba" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>NBA Games</CardTitle>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="sm">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {format(selectedDate, "MMM dd, yyyy")}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={selectedDate} onSelect={(d) => d && setSelectedDate(d)} />
                    </PopoverContent>
                  </Popover>
                </div>
              </CardHeader>
              <CardContent>
                {loading && <p className="text-center py-8">Loading...</p>}
                {error && <p className="text-center py-8 text-destructive">{error}</p>}
                {!loading && !error && games.length === 0 && <p className="text-center py-8">No games scheduled</p>}
                {!loading && !error && games.length > 0 && (
                  <div className="space-y-3">
                    {games.map((g) => (
                      <div key={g.id} className="flex justify-between p-4 border rounded-lg">
                        <div>
                          <div className="font-medium">{g.visitor_team.full_name} @ {g.home_team.full_name}</div>
                          <div className="text-sm text-muted-foreground">{g.time || format(new Date(g.date), "h:mm a")}</div>
                        </div>
                        {g.status === "Final" && <div className="text-right font-semibold">{g.visitor_team_score} - {g.home_team_score}</div>}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="other">
            <Card><CardContent className="py-12"><p className="text-center">Coming soon...</p></CardContent></Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
