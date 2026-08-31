import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import zaLogo from "@/assets/za_logo.png";

const TOP_NAV = [
  { label: "Home", path: "/" },
  { label: "Services", path: "/services" },
  { label: "Connect", path: "/connect" },
  { label: "Books", path: "/books" },
  { label: "Resources", path: "/resources" },
];

const CALENDLY_URL = "https://calendly.com/zkadtani";

export const Header = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-[#447BBE]/15">
      <div className="container mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        <Link to="/" className="flex items-center gap-2" aria-label="Zain Adtani — home">
          <img src={zaLogo} alt="Zain Adtani logo" className="h-9 w-9 object-contain" />
          <span className="hidden sm:inline font-display font-extrabold text-[15px] text-[#0A0F1A]">
            Zain Adtani
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1" aria-label="Main">
          {TOP_NAV.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              aria-current={isActive(item.path) ? "page" : undefined}
              className={`px-3 py-2 rounded-lg font-sans font-medium text-[15px] transition-colors ${
                isActive(item.path)
                  ? "text-[#2F5C90] bg-[#447BBE]/10"
                  : "text-[#0A0F1A] hover:text-[#2F5C90] hover:bg-[#447BBE]/07"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center justify-center bg-[#DD5013] text-white font-sans font-semibold text-[14px] px-5 py-2.5 rounded-xl hover:bg-[#C4460F] transition-colors"
          >
            Book a Call
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg text-[#0A0F1A] hover:bg-[#447BBE]/10 transition-colors"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-[#447BBE]/15 bg-white">
          <nav className="container mx-auto px-4 py-3 flex flex-col gap-1" aria-label="Mobile">
            {TOP_NAV.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center min-h-[48px] px-4 rounded-xl font-sans font-medium text-[16px] transition-colors ${
                  isActive(item.path)
                    ? "text-[#2F5C90] bg-[#447BBE]/10"
                    : "text-[#0A0F1A] hover:bg-[#447BBE]/08"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="mt-2 flex items-center justify-center min-h-[48px] px-4 rounded-xl bg-[#DD5013] text-white font-sans font-semibold text-[16px]"
            >
              Book a Call
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};
