import { useEffect, useState } from "react";
import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";

export function TimeBar() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const centralTime = toZonedTime(time, "America/Chicago");
  const pacificTime = toZonedTime(time, "America/Los_Angeles");
  const easternTime = toZonedTime(time, "America/New_York");

  const formatTime = (date: Date) => format(date, "h:mm a");
  const formatDate = (date: Date) => format(date, "EEEE, MMM d, yyyy");

  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  return (
    <div 
      className="sticky top-0 z-30 w-full"
      role="region"
      aria-label="Current date and time"
    >
      <div className="mx-auto max-w-7xl px-4 py-2 md:py-3">
        <div className="flex items-center gap-3 md:gap-5 bg-card/95 backdrop-blur-sm border-2 border-primary rounded-lg md:rounded-2xl shadow-lg px-4 md:px-5 py-2 md:py-3">
          {/* Animated Clock Icon */}
          <div 
            className={`flex-shrink-0 ${!prefersReducedMotion ? 'animate-clock-tick' : ''}`}
            aria-hidden="true"
          >
            <svg 
              width="28" 
              height="28" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="text-primary"
            >
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
              <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>

          {/* Date and Times */}
          <div className="flex-1 min-w-0">
            <div className="text-xs md:text-sm text-muted-foreground font-medium mb-0.5">
              {formatDate(centralTime)}
            </div>
            <div className="text-xs md:text-sm text-foreground flex items-center gap-1.5 md:gap-2 flex-wrap">
              <span className="font-semibold">CT {formatTime(centralTime)}</span>
              <span className="text-muted-foreground">·</span>
              <span className="font-semibold">ET {formatTime(easternTime)}</span>
              <span className="text-muted-foreground">·</span>
              <span className="font-semibold">PT {formatTime(pacificTime)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
