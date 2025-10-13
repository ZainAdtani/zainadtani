import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Helmet } from "react-helmet-async";
import { Loader2 } from "lucide-react";

type Game = {
  id: number;
  date: string;
  status: string;
  time: string;
  home_team: {
    id: number;
    name: string;
    abbreviation: string;
  };
  visitor_team: {
    id: number;
    name: string;
    abbreviation: string;
  };
  home_team_score: number;
  visitor_team_score: number;
};

type Team = {
  id: number;
  abbreviation: string;
  city: string;
  conference: string;
  division: string;
  full_name: string;
  name: string;
};

export default function NBA() {
  const [games, setGames] = useState<Game[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [loadingGames, setLoadingGames] = useState(true);
  const [loadingTeams, setLoadingTeams] = useState(true);
  const [errorGames, setErrorGames] = useState<string | null>(null);
  const [errorTeams, setErrorTeams] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  // Fetch games
  useEffect(() => {
    const fetchGames = async () => {
      // Check sessionStorage cache
      const cacheKey = `nba-games-${selectedDate}`;
      const cached = sessionStorage.getItem(cacheKey);
      
      if (cached) {
        setGames(JSON.parse(cached));
        setLoadingGames(false);
        return;
      }

      setLoadingGames(true);
      setErrorGames(null);

      try {
        const response = await fetch(
          `https://www.balldontlie.io/api/v1/games?dates[]=${selectedDate}`
        );
        
        if (!response.ok) throw new Error('Failed to fetch games');
        
        const data = await response.json();
        setGames(data.data || []);
        sessionStorage.setItem(cacheKey, JSON.stringify(data.data || []));
      } catch (err) {
        setErrorGames(err instanceof Error ? err.message : 'Failed to load games');
      } finally {
        setLoadingGames(false);
      }
    };

    fetchGames();
  }, [selectedDate]);

  // Fetch teams
  useEffect(() => {
    const fetchTeams = async () => {
      const cacheKey = 'nba-teams';
      const cached = sessionStorage.getItem(cacheKey);
      
      if (cached) {
        setTeams(JSON.parse(cached));
        setLoadingTeams(false);
        return;
      }

      setLoadingTeams(true);
      setErrorTeams(null);

      try {
        const response = await fetch('https://www.balldontlie.io/api/v1/teams');
        
        if (!response.ok) throw new Error('Failed to fetch teams');
        
        const data = await response.json();
        setTeams(data.data || []);
        sessionStorage.setItem(cacheKey, JSON.stringify(data.data || []));
      } catch (err) {
        setErrorTeams(err instanceof Error ? err.message : 'Failed to load teams');
      } finally {
        setLoadingTeams(false);
      }
    };

    fetchTeams();
  }, []);

  const handleDateChange = (offset: number) => {
    const date = new Date(selectedDate);
    date.setDate(date.getDate() + offset);
    setSelectedDate(date.toISOString().split('T')[0]);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>NBA - Live Scores & Standings | Zain Adtani</title>
        <meta name="description" content="Check live NBA scores, game schedules, and team standings." />
      </Helmet>

      <div className="container mx-auto px-4 py-16 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            🏀 NBA
          </h1>
          <p className="text-xl text-muted-foreground">
            Live scores, schedules, and team info
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="games" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="games">Today's Games</TabsTrigger>
            <TabsTrigger value="teams">Teams</TabsTrigger>
          </TabsList>

          {/* Games Tab */}
          <TabsContent value="games">
            <Card className="shadow-lg border-2">
              <CardHeader>
                <CardTitle>Games Schedule</CardTitle>
                <CardDescription>
                  {formatDate(selectedDate)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Date Navigation */}
                <div className="flex gap-2 mb-6 justify-center">
                  <Button
                    variant="outline"
                    onClick={() => handleDateChange(-1)}
                  >
                    Previous Day
                  </Button>
                  <Button
                    variant="default"
                    onClick={() => setSelectedDate(new Date().toISOString().split('T')[0])}
                  >
                    Today
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleDateChange(1)}
                  >
                    Next Day
                  </Button>
                </div>

                {/* Loading State */}
                {loadingGames && (
                  <div className="flex justify-center items-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  </div>
                )}

                {/* Error State */}
                {errorGames && (
                  <div className="text-center py-12">
                    <p className="text-destructive mb-4">{errorGames}</p>
                    <Button onClick={() => setSelectedDate(selectedDate)}>
                      Try Again
                    </Button>
                  </div>
                )}

                {/* Games List */}
                {!loadingGames && !errorGames && (
                  <div className="space-y-4">
                    {games.length === 0 ? (
                      <p className="text-center text-muted-foreground py-8">
                        No games scheduled for this date.
                      </p>
                    ) : (
                      games.map((game) => (
                        <div
                          key={game.id}
                          className="border rounded-lg p-4 hover:bg-accent/50 transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <span className="font-semibold text-base">
                                  {game.visitor_team.abbreviation}
                                </span>
                                <span className="text-2xl font-bold">
                                  {game.visitor_team_score || '-'}
                                </span>
                              </div>
                              <div className="flex items-center gap-3">
                                <span className="font-semibold text-base">
                                  {game.home_team.abbreviation}
                                </span>
                                <span className="text-2xl font-bold">
                                  {game.home_team_score || '-'}
                                </span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-medium text-muted-foreground mb-1">
                                {game.status}
                              </div>
                              {game.time && (
                                <div className="text-xs text-muted-foreground">
                                  {game.time}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Teams Tab */}
          <TabsContent value="teams">
            <Card className="shadow-lg border-2">
              <CardHeader>
                <CardTitle>NBA Teams</CardTitle>
                <CardDescription>
                  All 30 teams by conference and division
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Loading State */}
                {loadingTeams && (
                  <div className="flex justify-center items-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  </div>
                )}

                {/* Error State */}
                {errorTeams && (
                  <div className="text-center py-12">
                    <p className="text-destructive">{errorTeams}</p>
                  </div>
                )}

                {/* Teams Grid */}
                {!loadingTeams && !errorTeams && (
                  <div className="space-y-8">
                    {['East', 'West'].map((conference) => {
                      const conferenceTeams = teams.filter(
                        (team) => team.conference === conference
                      );
                      
                      return (
                        <div key={conference}>
                          <h3 className="text-xl font-semibold mb-4">
                            {conference}ern Conference
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {conferenceTeams.map((team) => (
                              <div
                                key={team.id}
                                className="border rounded-lg p-4 hover:bg-accent/50 transition-colors"
                              >
                                <div className="font-semibold text-lg">
                                  {team.full_name}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {team.division} Division
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
