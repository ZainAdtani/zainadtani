import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import etched from "@/assets/zain-etched-portrait.png";
import { LIFE_NOTES, todaysNoteIndex } from "@/data/lifeNotes";

export type NpTheme = "dark" | "light";
const KEY = "home-theme";

export function useNpTheme() {
  const [theme, setTheme] = useState<NpTheme>(() =>
    typeof window !== "undefined" && localStorage.getItem(KEY) === "light" ? "light" : "dark",
  );
  useEffect(() => { localStorage.setItem(KEY, theme); }, [theme]);
  return [theme, setTheme] as const;
}

const NAV = [
  { label: "Services", to: "/services" },
  { label: "Books", to: "/books" },
  { label: "Resources", to: "/resources" },
  { label: "About", to: "/about" },
  { label: "The Z Letter", to: "/#z-letter" },
];

export function MinimalHeader({ theme, onToggle }: { theme: NpTheme; onToggle: () => void }) {
  return (
    <header className="np-header">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-5 py-6">
        <Link to="/" className="np-serif text-[22px] np-link-plain">Zain Adtani</Link>
        <nav aria-label="Main" className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[15px]">
          {NAV.map((n) => (
            <a key={n.label} href={n.to} className="np-link-plain">{n.label}</a>
          ))}
          <a href="https://calendly.com/zkadtani" target="_blank" rel="noopener noreferrer" className="np-link-plain">Book a Call</a>
          <button type="button" onClick={onToggle} aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"} className="np-toggle">
            {theme === "dark" ? <Sun className="h-4 w-4" aria-hidden="true" /> : <Moon className="h-4 w-4" aria-hidden="true" />}
          </button>
        </nav>
      </div>
    </header>
  );
}

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

export function MinimalHero() {
  const today = new Date();
  const idx = todaysNoteIndex(today);
  const dateLabel = today.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  return (
    <section className="mx-auto max-w-2xl px-5 pb-16 pt-6">
      <img src={etched} alt="Etched portrait of Zain Adtani" className="np-portrait mx-auto w-full max-w-md" width={1136} height={1408} fetchPriority="high" />
      <div className="mt-12 space-y-5 text-[18px] leading-relaxed">
        <p>Zain Adtani is an AI consultant, author of <Link to="/books" className="np-link">3 books</Link>, and a licensed financial professional. He helps families and local businesses protect what they build.</p>
        <p>Through <Link to="/services" className="np-link">Adtani Education Ventures</Link>, he builds simple AI systems that save local businesses time and catch the calls they miss.</p>
        <p>He also writes <Link to="/the-z-letter" className="np-link">The Z Letter</Link>, a short daily note on AI, money, and building.</p>
      </div>

      <div className="mt-14">
        <h2 className="np-h">New</h2>
        <p className="mt-3 text-[18px] leading-relaxed">{LIFE_NOTES[idx]}</p>
        <p className="np-muted mt-2 text-[14px]">{dateLabel} · <Link to="/lifenotes" className="np-link">See all notes</Link></p>
      </div>

      <div id="start" className="mt-14 scroll-mt-20">
        <h2 className="np-h">Start here</h2>
        <ul className="mt-3 space-y-2 text-[17px]">
          <li><Link to="/missed-call-calculator" className="np-link">Free Missed Call Calculator</Link></li>
          <li><Link to="/owner-stress-test" className="np-link">Take the Owner Stress Test</Link></li>
          <li><a href="https://calendly.com/zkadtani" {...ext} className="np-link">Book a Call</a></li>
        </ul>
      </div>

      <div className="mt-14">
        <h2 className="np-h">Elsewhere</h2>
        <ul className="mt-3 space-y-2 text-[17px]">
          <li><a href="https://www.linkedin.com/in/zainadtani" {...ext} className="np-link">LinkedIn</a></li>
          <li><a href="https://www.instagram.com/adtanieducationventures" {...ext} className="np-link">Instagram</a></li>
          <li><a href="https://www.youtube.com/@BuildThenProtect" {...ext} className="np-link">YouTube</a></li>
        </ul>
      </div>
    </section>
  );
}
