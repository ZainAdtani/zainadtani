import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Router-aware anchor handling. Scrolls to #hash targets after a route change
 * (e.g. /services#ai-consulting from the homepage) and to top otherwise.
 */
export function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.slice(1);
      const attempt = (tries = 0) => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        } else if (tries < 10) {
          window.setTimeout(() => attempt(tries + 1), 60);
        }
      };
      attempt();
      return;
    }
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, hash]);

  return null;
}
