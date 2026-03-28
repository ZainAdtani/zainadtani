import { useState, useEffect } from "react";

interface KineticTextProps {
  phrases: string[];
  interval?: number;
  transitionDuration?: number;
}

export function KineticText({ phrases, interval = 3000, transitionDuration = 300 }: KineticTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % phrases.length);
        setIsTransitioning(false);
      }, transitionDuration);
    }, interval);

    return () => clearInterval(timer);
  }, [phrases.length, interval, transitionDuration]);

  return (
    <div className="h-10 md:h-12 overflow-hidden relative">
      <p
        className="text-xl md:text-2xl font-display font-semibold text-primary transition-all"
        style={{
          transitionDuration: `${transitionDuration}ms`,
          transitionTimingFunction: "ease-out",
          opacity: isTransitioning ? 0 : 1,
          transform: isTransitioning ? "translateY(-16px)" : "translateY(0)",
        }}
      >
        {phrases[currentIndex]}
      </p>
    </div>
  );
}
