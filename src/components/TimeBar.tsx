import { useEffect, useState } from "react";
import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";

export function TimeBar() {
  const [time, setTime] = useState(new Date());
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  const ct = toZonedTime(time, "America/Chicago");
  const et = toZonedTime(time, "America/New_York");
  const pt = toZonedTime(time, "America/Los_Angeles");

  return (
    <div className="flex justify-end px-4 pt-2">
      <button
        onClick={() => setExpanded(!expanded)}
        className="inline-flex items-center gap-1.5 rounded-full bg-muted/60 px-3 py-1 text-[12px] text-muted-foreground hover:bg-muted transition-colors cursor-pointer select-none"
        aria-label="Toggle time zones"
      >
        <span>{format(ct, "MMM d")} · {format(ct, "h:mm a")} CT</span>
        {expanded && (
          <>
            <span className="text-muted-foreground/50">·</span>
            <span>{format(et, "h:mm a")} ET</span>
            <span className="text-muted-foreground/50">·</span>
            <span>{format(pt, "h:mm a")} PT</span>
          </>
        )}
      </button>
    </div>
  );
}
