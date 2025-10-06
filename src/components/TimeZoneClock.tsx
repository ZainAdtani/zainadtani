import { useEffect, useState } from "react";
import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { Clock } from "lucide-react";

export function TimeZoneClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const centralTime = toZonedTime(time, "America/Chicago");
  const pacificTime = toZonedTime(time, "America/Los_Angeles");
  const easternTime = toZonedTime(time, "America/New_York");

  const formatTime = (date: Date) => format(date, "h:mm:ss a");
  const formatDate = (date: Date) => format(date, "EEEE, MMM d, yyyy");

  return (
    <div className="fixed bottom-4 left-4 z-50 animate-fade-in">
      <div className="backdrop-blur-md bg-card/90 border border-border rounded-xl shadow-lg p-3 min-w-[280px]">
        <div className="flex items-center gap-2 mb-2 pb-2 border-b border-border/50">
          <Clock className="w-4 h-4 text-primary" />
          <span className="text-xs font-medium text-muted-foreground">
            {formatDate(centralTime)}
          </span>
        </div>
        <div className="space-y-1.5 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground font-medium">CT:</span>
            <span className="font-mono text-foreground">{formatTime(centralTime)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground font-medium">ET:</span>
            <span className="font-mono text-foreground">{formatTime(easternTime)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground font-medium">PT:</span>
            <span className="font-mono text-foreground">{formatTime(pacificTime)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
