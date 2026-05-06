import { Link, useLocation } from "react-router-dom";
import { Moon, Sun, Linkedin, Youtube } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import zaLogo from "@/assets/za_logo.png";

const TOP_NAV = [
  { label: "Home", path: "/" },
  { label: "Services", path: "/services" },
  { label: "Books", path: "/books" },
  { label: "Resources", path: "/resources" },
];

export const Header = () => {
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${scrolled ? 'border-border/80 bg-background/90 backdrop-blur-xl shadow-sm' : 'border-border bg-background/80 backdrop-blur-md'}`}>
      <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-2">
        <Link to="/" className="flex items-center">
          <img src={zaLogo} alt="ZA" className="h-10 w-10 hover:rotate-[15deg] hover:scale-110 transition-all duration-300 drop-shadow-[0_0_6px_rgba(0,212,170,0.4)]" />
        </Link>

        <nav className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-3">
            {TOP_NAV.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-1.5 rounded-full font-semibold text-sm transition-all duration-300 relative overflow-hidden group ${
                  isActive(item.path) && (item.path !== '/' || location.pathname === '/')
                    ? 'bg-primary/10 shadow-md'
                    : 'hover:shadow-lg hover:-translate-y-0.5'
                }`}
                style={{
                  border: '1px solid transparent',
                  backgroundImage: 'linear-gradient(var(--background), var(--background)), linear-gradient(30deg, hsl(var(--primary)), hsl(var(--accent)))',
                  backgroundOrigin: 'border-box',
                  backgroundClip: 'padding-box, border-box'
                }}
              >
                <span className="relative z-10">{item.label}</span>
                <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://linkedin.com/in/zainadtani"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-[#94A3B8] hover:text-[#00D4AA] transition-colors"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="https://youtube.com/@zainadtani"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="text-[#94A3B8] hover:text-[#00D4AA] transition-colors"
            >
              <Youtube className="h-5 w-5" />
            </a>
          </div>

          <a
            href="https://calendly.com/zkadtani"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex font-display bg-[#00D4AA] text-[#0A0F1A] font-semibold text-sm px-4 py-2 rounded-[8px] hover:opacity-90 transition-opacity"
          >
            Book a Call
          </a>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="hidden md:inline-flex"
          >
            {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </nav>
      </div>
    </header>
  );
};
