import { Sun, Sunset, Moon } from "lucide-react";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";

type SunStatus = "morning" | "daytime" | "evening" | "night";

export function SunriseWidget() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000); // Update every minute
    return () => clearInterval(timer);
  }, []);

  // Get current hour in Central Time
  const ctTime = formatInTimeZone(now, "America/Chicago", "HH:mm");
  const ctHour = parseInt(ctTime.split(":")[0]);

  // Simple hardcoded sunrise/sunset based on time of year
  // Winter (Nov-Feb): ~7:00 AM / ~5:15 PM
  // Spring (Mar-May): ~6:30 AM / ~7:30 PM
  // Summer (Jun-Aug): ~6:00 AM / ~8:15 PM
  // Fall (Sep-Oct): ~6:45 AM / ~6:30 PM
  const month = now.getMonth();
  let sunrise = "6:30 AM";
  let sunset = "5:15 PM";
  let sunsetHour = 17;

  if (month >= 2 && month <= 4) {
    // Spring
    sunrise = "6:30 AM";
    sunset = "7:30 PM";
    sunsetHour = 19;
  } else if (month >= 5 && month <= 7) {
    // Summer
    sunrise = "6:00 AM";
    sunset = "8:15 PM";
    sunsetHour = 20;
  } else if (month >= 8 && month <= 9) {
    // Fall
    sunrise = "6:45 AM";
    sunset = "6:30 PM";
    sunsetHour = 18;
  } else {
    // Winter
    sunrise = "7:00 AM";
    sunset = "5:15 PM";
    sunsetHour = 17;
  }

  // Determine status and icon
  let status: SunStatus = "daytime";
  let StatusIcon = Sun;
  let iconColor = "text-yellow-400";

  if (ctHour >= 6 && ctHour < 12) {
    status = "morning";
    StatusIcon = Sun;
    iconColor = "text-yellow-300";
  } else if (ctHour >= 12 && ctHour < sunsetHour - 1) {
    status = "daytime";
    StatusIcon = Sun;
    iconColor = "text-yellow-400";
  } else if (ctHour >= sunsetHour - 1 && ctHour < sunsetHour + 1) {
    status = "evening";
    StatusIcon = Sunset;
    iconColor = "text-orange-400";
  } else {
    status = "night";
    StatusIcon = Moon;
    iconColor = "text-blue-300";
  }

  const statusLabel =
    status === "morning"
      ? "Morning"
      : status === "daytime"
      ? "Daytime"
      : status === "evening"
      ? "Evening"
      : "Night";

  return (
    <div className="w-full flex justify-center px-4 py-3">
      <div className="relative group inline-flex items-center gap-3 px-4 py-2.5 rounded-full bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 backdrop-blur-sm border border-border/50 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
        {/* Icon */}
        <StatusIcon className={`h-5 w-5 ${iconColor}`} />

        {/* Content */}
        <div className="flex items-center gap-4 text-xs">
          <span className="font-medium text-foreground">Today</span>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <span className="font-semibold">↑</span>
            <span>{sunrise}</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <span className="font-semibold">↓</span>
            <span>{sunset}</span>
          </div>
          <span className="text-foreground font-medium">{statusLabel}</span>
        </div>
      </div>
    </div>
  );
}
