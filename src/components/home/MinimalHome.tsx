import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import etched from "@/assets/zain-etched-portrait.png";
import { LIFE_NOTES, todaysNoteIndex } from "@/data/lifeNotes";

const CALENDLY_URL = "https://calendly.com/zkadtani";

const NAV = [
  { label: "Services", to: "/services" },
  { label: "Books", to: "/books" },
  { label: "Resources", to: "/resources" },
  { label: "About", to: "/about" },
  { label: "The Z Letter", to: "/#z-letter" },
];

export function MinimalHeader() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="np-header sticky top-0 z-40 border-b border-white/10">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3 sm:px-5">
        <Link to="/" className="np-serif shrink-0 text-[20px] leading-none np-link-plain sm:text-[22px]">
          Zain Adtani
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-x-5 text-[15px] lg:flex">
          {NAV.map((n) => (
            <Link key={n.label} to={n.to} className="np-link-plain">
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="np-cta">
            Book a Call
          </a>
          <button
            type="button"
            className="np-menu-btn lg:hidden"
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          </button>
        </div>
      </div>

      {open && (
        <nav id="site-menu" aria-label="Mobile" className="border-t border-white/10 px-4 py-2 lg:hidden sm:px-5">
          <ul className="flex flex-col">
            {NAV.map((n) => (
              <li key={n.label}>
                <Link to={n.to} className="np-mobile-link" onClick={() => setOpen(false)}>
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
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
      <img src={etched} alt="Etched portrait of Zain Adtani" className="np-portrait mx-auto w-full max-w-md" width={1136} height={1408} {...{ fetchpriority: "high" }} />
      <div className="mt-12 space-y-5 text-[18px] leading-relaxed">
        <p>Zain Adtani is an AI consultant, author of <Link to="/#books" className="np-link">3 books</Link>, and a licensed financial professional. He helps families and local businesses protect what they build.</p>
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
