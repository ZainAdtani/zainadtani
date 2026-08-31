import { useEffect, useRef, ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

/**
 * Progressive enhancement only.
 *
 * Content renders fully visible by default. The subtle fade/rise is opted into
 * at runtime by adding `js-reveal-ready` to <html> — and only when the browser
 * supports IntersectionObserver and the user has not asked for reduced motion.
 * If JS fails, the observer never fires, or the page is rendered full-page for
 * a screenshot, the content stays visible. It can never leave a blank gap.
 */
export function ScrollReveal({ children, delay = 0, className = "" }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced || typeof IntersectionObserver === "undefined") return;

    document.documentElement.classList.add("js-reveal-ready");
    el.classList.add("reveal-anim");

    // Safety net: if the observer never fires for any reason, force-show.
    const failsafe = window.setTimeout(() => el.classList.add("is-visible"), 1200);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add("is-visible");
            observer.unobserve(el);
          }
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -5% 0px" }
    );

    observer.observe(el);

    return () => {
      window.clearTimeout(failsafe);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={{ transitionDelay: delay ? `${delay}ms` : undefined }}
    >
      {children}
    </div>
  );
}
