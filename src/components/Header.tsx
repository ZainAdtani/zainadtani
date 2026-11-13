import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import zaLogo from "@/assets/za_logo.png";

type NavItem = { label: string; path: string; children?: { label: string; path: string }[] };

const TOP_NAV: NavItem[] = [
  {
    label: "Services",
    path: "/services",
    children: [
      { label: "Services home", path: "/services" },
      { label: "Free AI Checkup", path: "/ai-checkup" },
      { label: "Connect", path: "/connect" },
    ],
  },
  {
    label: "Books",
    path: "/books",
    children: [
      { label: "My books", path: "/#books" },
      { label: "Reading library", path: "/books" },
      { label: "The Family Protection Gap", path: "/family-protection-gap" },
    ],
  },
  {
    label: "Resources",
    path: "/resources",
    children: [
      { label: "Resources home", path: "/resources" },
      { label: "Free AI Checkup", path: "/ai-checkup" },
      { label: "Missed Call Calculator", path: "/missed-call-calculator" },
      { label: "Owner Stress Test", path: "/owner-stress-test" },
      { label: "Investing", path: "/investing" },
      { label: "Tools I use", path: "/tools" },
      { label: "Fun projects", path: "/projects" },
      { label: "The Lab", path: "/lab" },
      { label: "Digital Product HQ", path: "/digital-products" },
      { label: "AI Prompt Library", path: "/ai-prompts" },
      { label: "10 starter prompts", path: "/prompts" },
      { label: "Life Notes", path: "/life-notes" },
      { label: "Life Notes (daily)", path: "/lifenotes" },
    ],
  },
  { label: "About", path: "/about" },
  { label: "The Daily Z", path: "/#z-letter" },
];

const CALENDLY_URL = "https://calendly.com/zkadtani";

export const Header = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileSub, setMobileSub] = useState<string | null>(null);

  useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
  }, [location.pathname, location.hash]);

  const isActive = (path: string) =>
    path.startsWith("/#") ? false : path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);
  const focusRing = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#447BBE] focus-visible:ring-offset-2";

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
          {TOP_NAV.map((item) => {
            const linkCls = `px-3 py-2 rounded-lg font-sans font-medium text-[15px] transition-colors ${focusRing} ${
              isActive(item.path)
                ? "text-[#2F5C90] bg-[#447BBE]/10"
                : "text-[#0A0F1A] hover:text-[#2F5C90] hover:bg-[#447BBE]/5"
            }`;
            if (!item.children) {
              return (
                <Link key={item.label} to={item.path} aria-current={isActive(item.path) ? "page" : undefined} className={linkCls}>
                  {item.label}
                </Link>
              );
            }
            const open = openMenu === item.label;
            return (
              <div
                key={item.label}
                className="relative flex items-center"
                onMouseEnter={() => setOpenMenu(item.label)}
                onMouseLeave={() => setOpenMenu(null)}
                onKeyDown={(e) => { if (e.key === "Escape") setOpenMenu(null); }}
                onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpenMenu(null); }}
              >
                <Link to={item.path} aria-current={isActive(item.path) ? "page" : undefined} className={`${linkCls} pr-1`}>
                  {item.label}
                </Link>
                <button
                  type="button"
                  aria-label={`${item.label} menu`}
                  aria-expanded={open}
                  onClick={() => setOpenMenu(open ? null : item.label)}
                  className={`p-1 rounded-md text-[#0A0F1A] hover:text-[#2F5C90] ${focusRing}`}
                >
                  <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden="true" />
                </button>
                {open && (
                  <div className="absolute left-0 top-full pt-2 z-50">
                    <ul className="surface-card min-w-[230px] max-h-[70vh] overflow-y-auto bg-white p-2 shadow-lg">
                      {item.children.map((c) => (
                        <li key={c.path + c.label}>
                          <Link to={c.path} className={`block rounded-lg px-3 py-2 font-sans text-[14px] text-[#0A0F1A] hover:bg-[#447BBE]/10 hover:text-[#2F5C90] ${focusRing}`}>
                            {c.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
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
        <div className="md:hidden border-t border-[#447BBE]/15 bg-white max-h-[calc(100vh-4rem)] overflow-y-auto">
          <nav className="container mx-auto px-4 py-3 flex flex-col gap-1" aria-label="Mobile">
            {TOP_NAV.map((item) => (
              <div key={item.label}>
                <div className="flex items-center">
                  <Link
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className={`flex-1 flex items-center min-h-[48px] px-4 rounded-xl font-sans font-medium text-[16px] transition-colors ${focusRing} ${
                      isActive(item.path) ? "text-[#2F5C90] bg-[#447BBE]/10" : "text-[#0A0F1A] hover:bg-[#447BBE]/5"
                    }`}
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <button
                      type="button"
                      aria-label={`Show ${item.label} links`}
                      aria-expanded={mobileSub === item.label}
                      onClick={() => setMobileSub(mobileSub === item.label ? null : item.label)}
                      className={`w-12 h-12 inline-flex items-center justify-center rounded-xl text-[#0A0F1A] hover:bg-[#447BBE]/10 ${focusRing}`}
                    >
                      <ChevronDown className={`h-5 w-5 transition-transform ${mobileSub === item.label ? "rotate-180" : ""}`} aria-hidden="true" />
                    </button>
                  )}
                </div>
                {item.children && mobileSub === item.label && (
                  <ul className="ml-4 border-l border-[#447BBE]/20 pl-2 mb-1">
                    {item.children.map((c) => (
                      <li key={c.path + c.label}>
                        <Link
                          to={c.path}
                          onClick={() => setMobileOpen(false)}
                          className={`flex items-center min-h-[44px] px-3 rounded-lg font-sans text-[15px] text-[#0A0F1A] hover:bg-[#447BBE]/5 ${focusRing}`}
                        >
                          {c.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
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
