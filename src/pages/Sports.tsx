import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trophy, Calendar } from "lucide-react";

// Sample schedule data
const NBA_SCHEDULE = [
  { date: "2025-10-08", opponent: "Lakers", homeAway: "H", result: "W 112-108" },
  { date: "2025-10-10", opponent: "Warriors", homeAway: "A", result: "L 98-105" },
  { date: "2025-10-12", opponent: "Celtics", homeAway: "H", result: "W 120-115" },
  { date: "2025-10-14", opponent: "Heat", homeAway: "A", result: "-" },
  { date: "2025-10-16", opponent: "Bucks", homeAway: "H", result: "-" },
];

const Sports = () => {
  const [selectedTeam, setSelectedTeam] = useState("all");
  const [timeFilter, setTimeFilter] = useState("week");

  const filteredSchedule = NBA_SCHEDULE.filter((game) => {
    if (selectedTeam !== "all" && !game.opponent.includes(selectedTeam)) {
      return false;
    }
    // Time filtering logic would go here
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <div className="flex items-center justify-center gap-3">
              <Trophy className="w-12 h-12 text-primary" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold">
              🏀 <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Sports</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Live NBA scores and team schedules
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-12 space-y-12">
        {/* NBA Live Scores */}
        <div id="nba-live">
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Trophy className="w-6 h-6 text-primary" />
                NBA — Live Scores
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted/30 rounded-lg p-8 text-center space-y-4">
                <iframe
                  src="about:blank"
                  title="NBA Live Scores"
                  className="w-full h-96 rounded-lg border-2 border-dashed border-muted-foreground/30"
                />
                <p className="text-sm text-muted-foreground">
                  📝 Note: Swap this iframe with your live-scores provider embed
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* NBA Team Schedule */}
        <div id="nba-schedule">
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Calendar className="w-6 h-6 text-primary" />
                NBA — Team Schedule
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Filter Controls */}
              <div className="flex flex-wrap gap-4">
                <Select value={selectedTeam} onValueChange={setSelectedTeam}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Select team" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Teams</SelectItem>
                    <SelectItem value="Lakers">Lakers</SelectItem>
                    <SelectItem value="Warriors">Warriors</SelectItem>
                    <SelectItem value="Celtics">Celtics</SelectItem>
                    <SelectItem value="Heat">Heat</SelectItem>
                    <SelectItem value="Bucks">Bucks</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex gap-2">
                  <Button
                    variant={timeFilter === "today" ? "default" : "outline"}
                    onClick={() => setTimeFilter("today")}
                    size="sm"
                  >
                    Today
                  </Button>
                  <Button
                    variant={timeFilter === "week" ? "default" : "outline"}
                    onClick={() => setTimeFilter("week")}
                    size="sm"
                  >
                    Week
                  </Button>
                  <Button
                    variant={timeFilter === "month" ? "default" : "outline"}
                    onClick={() => setTimeFilter("month")}
                    size="sm"
                  >
                    Month
                  </Button>
                </div>
              </div>

              {/* Schedule Table */}
              <div className="rounded-lg border overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="text-left p-4 font-semibold">Date</th>
                      <th className="text-left p-4 font-semibold">Opponent</th>
                      <th className="text-center p-4 font-semibold">H/A</th>
                      <th className="text-left p-4 font-semibold">Result</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSchedule.map((game, index) => (
                      <tr
                        key={index}
                        className="border-t hover:bg-muted/50 transition-colors"
                      >
                        <td className="p-4">{game.date}</td>
                        <td className="p-4 font-medium">{game.opponent}</td>
                        <td className="p-4 text-center">
                          <span
                            className={`px-2 py-1 rounded text-xs font-semibold ${
                              game.homeAway === "H"
                                ? "bg-primary/10 text-primary"
                                : "bg-accent/10 text-accent"
                            }`}
                          >
                            {game.homeAway}
                          </span>
                        </td>
                        <td className="p-4">
                          {game.result === "-" ? (
                            <span className="text-muted-foreground">
                              Upcoming
                            </span>
                          ) : game.result.startsWith("W") ? (
                            <span className="text-primary font-semibold">
                              {game.result}
                            </span>
                          ) : (
                            <span className="text-destructive font-semibold">
                              {game.result}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Zain Education Ventures.</p>
        </div>
      </footer>
    </div>
  );
};

export default Sports;
