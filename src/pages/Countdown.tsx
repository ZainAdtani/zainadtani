import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isComplete: boolean;
}

interface CountdownCardProps {
  title: string;
  targetDate: Date;
  emoji: string;
  gradient: string;
  startDate?: Date;
}

const calculateTimeLeft = (targetDate: Date): TimeLeft => {
  const now = new Date();
  const difference = targetDate.getTime() - now.getTime();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isComplete: true };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
    isComplete: false,
  };
};

const calculateProgress = (startDate: Date, targetDate: Date): number => {
  const now = new Date();
  const total = targetDate.getTime() - startDate.getTime();
  const elapsed = now.getTime() - startDate.getTime();
  return Math.min(Math.max((elapsed / total) * 100, 0), 100);
};

function CountdownCard({ title, targetDate, emoji, gradient, startDate = new Date() }: CountdownCardProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft(targetDate));
  const [progress, setProgress] = useState(calculateProgress(startDate, targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
      setProgress(calculateProgress(startDate, targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, startDate]);

  return (
    <Card className={`relative overflow-hidden bg-gradient-to-br ${gradient} border-0 shadow-lg hover:shadow-xl transition-all duration-300`}>
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
      <div className="relative z-10">
        <CardHeader>
          <CardTitle className="text-2xl text-white flex items-center gap-2">
            <span className="text-4xl">{emoji}</span>
            <span>{title}</span>
          </CardTitle>
          <CardDescription className="text-white/80">
            {timeLeft.isComplete ? "Time's up!" : "Counting down..."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {timeLeft.isComplete ? (
            <div className="text-center py-8">
              <p className="text-4xl font-bold text-white animate-bounce">🎉 It's here! 🎉</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-4 gap-3">
                <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                  <div className="text-3xl md:text-4xl font-bold text-white tabular-nums">
                    {timeLeft.days}
                  </div>
                  <div className="text-xs md:text-sm text-white/80 uppercase tracking-wider mt-1">
                    Days
                  </div>
                </div>
                <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                  <div className="text-3xl md:text-4xl font-bold text-white tabular-nums">
                    {timeLeft.hours}
                  </div>
                  <div className="text-xs md:text-sm text-white/80 uppercase tracking-wider mt-1">
                    Hours
                  </div>
                </div>
                <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                  <div className="text-3xl md:text-4xl font-bold text-white tabular-nums">
                    {timeLeft.minutes}
                  </div>
                  <div className="text-xs md:text-sm text-white/80 uppercase tracking-wider mt-1">
                    Min
                  </div>
                </div>
                <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                  <div className="text-3xl md:text-4xl font-bold text-white tabular-nums">
                    {timeLeft.seconds}
                  </div>
                  <div className="text-xs md:text-sm text-white/80 uppercase tracking-wider mt-1">
                    Sec
                  </div>
                </div>
              </div>

              {/* 3D Glowing Progress Bar */}
              <div className="relative">
                <div className="relative h-8 w-full overflow-hidden rounded-full bg-black/30 backdrop-blur-sm border border-white/20 shadow-inner">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-white/90 to-white/70 transition-all duration-500 relative"
                    style={{
                      width: `${progress}%`,
                      boxShadow:
                        "0 0 20px rgba(255, 255, 255, 0.8), 0 0 40px rgba(255, 255, 255, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.5)",
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/30 rounded-full animate-pulse" />
                  </div>
                </div>
                <p className="text-center text-white/70 text-xs mt-2">
                  {progress.toFixed(1)}% complete
                </p>
              </div>
            </>
          )}
        </CardContent>
      </div>
    </Card>
  );
}

export default function Countdown() {
  return (
    <>
      <Helmet>
        <title>Countdown Timers – Zain</title>
        <meta name="description" content="Track important dates with beautiful countdown timers and progress indicators." />
      </Helmet>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Countdown Timers
          </h1>
          <p className="text-lg text-muted-foreground">
            Track important dates with style ⏰
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <CountdownCard
            title="Feb 4th"
            targetDate={new Date("2026-02-04T00:00:00")}
            emoji="🎉"
            gradient="from-purple-500 to-pink-500"
            startDate={new Date("2025-01-01T00:00:00")}
          />
          <CountdownCard
            title="Christmas"
            targetDate={new Date("2025-12-25T00:00:00")}
            emoji="🎄"
            gradient="from-red-500 to-green-500"
            startDate={new Date("2025-01-01T00:00:00")}
          />
          <CountdownCard
            title="New Year"
            targetDate={new Date("2026-01-01T00:00:00")}
            emoji="🎆"
            gradient="from-blue-500 to-purple-500"
            startDate={new Date("2025-01-01T00:00:00")}
          />
        </div>
      </div>
    </>
  );
}
