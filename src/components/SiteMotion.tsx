import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Site-wide motion: every <section> inside <main> fades and rises into view.
 * Content stays visible when motion is reduced or IntersectionObserver is missing.
 */
export function SiteMotion() {
  const { pathname } = useLocation();

  useEffect(() => {
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduced || typeof IntersectionObserver === "undefined") return;

    let observer: IntersectionObserver | null = null;
    const raf = requestAnimationFrame(() => {
      const main = document.querySelector("main");
      if (!main) return;
      const targets = Array.from(main.querySelectorAll<HTMLElement>("section")).filter(
        (el) => !el.closest(".site-reveal") && !el.classList.contains("site-reveal")
      );
      if (!targets.length) return;
      document.documentElement.classList.add("js-reveal-ready");
      observer = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) {
              e.target.classList.add("is-visible");
              observer?.unobserve(e.target);
            }
          }
        },
        { threshold: 0.04, rootMargin: "0px 0px -6% 0px" }
      );
      targets.forEach((el) => {
        el.classList.add("site-reveal");
        observer!.observe(el);
      });
    });
    return () => {
      cancelAnimationFrame(raf);
      observer?.disconnect();
      document.querySelectorAll(".site-reveal").forEach((el) => el.classList.add("is-visible"));
    };
  }, [pathname]);

  return null;
}
