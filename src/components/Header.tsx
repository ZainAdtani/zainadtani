import { Link, useLocation } from "react-router-dom";
import { Moon, Sun, Menu, ChevronDown } from "lucide-react";
import { useTheme } from "next-themes";
import { getNavItemsBySection } from "@/data/nav";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "@/components/ui/sheet";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useState } from "react";
import zaLogo from "@/assets/za_logo.png";

const TOP_NAV = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Books", path: "/books" },
  { label: "Investing", path: "/investing" },
];

export const Header = () => {
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const [sheetOpen, setSheetOpen] = useState(false);
  const [archiveOpen, setArchiveOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-4">
        {/* Sidebar Trigger — desktop only */}
        <SidebarTrigger className="-ml-1 hidden md:inline-flex" />
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="text-3xl font-bold">
            <span className="text-primary">Z</span>
            <span className="text-accent">A</span>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-3">
          {/* Top nav links — desktop only */}
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

          {/* Hamburger Menu — mirrors sidebar exactly */}
          {/* Hamburger Menu — mobile only */}
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Open menu" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 overflow-y-auto">
              <SheetHeader>
                <h3 className="text-lg font-semibold">More</h3>
                <p className="text-sm text-muted-foreground">Quick access</p>
              </SheetHeader>

              <nav className="mt-6 space-y-4">
                {/* Main — flat list (mirrors sidebar main section) */}
                <div className="space-y-1">
                  {getNavItemsBySection("main").map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="flex items-center gap-2 text-foreground hover:underline px-2 py-1"
                      onClick={() => setSheetOpen(false)}
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </div>

                {/* Archive — collapsible (mirrors sidebar archive section) */}
                <Collapsible open={archiveOpen} onOpenChange={setArchiveOpen}>
                  <div className="border-t border-border pt-2">
                    <CollapsibleTrigger className="flex items-center justify-between w-full py-2 hover:bg-muted/50 rounded px-2">
                      <span className="text-sm font-semibold">Archive</span>
                      <ChevronDown className={`h-4 w-4 transition-transform ${archiveOpen ? "rotate-180" : ""}`} />
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="space-y-1 pt-2">
                        {getNavItemsBySection("archive").map((item, idx) => (
                          <Link
                            key={item.path + idx}
                            to={item.path}
                            className="flex items-center gap-2 text-foreground hover:underline px-2 py-1"
                            onClick={() => setSheetOpen(false)}
                          >
                            <item.icon className="w-4 h-4" />
                            <span>{item.label}</span>
                          </Link>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </div>
                </Collapsible>

              </nav>

              {/* Theme Toggle */}
              <div className="mt-8 pt-6 border-t border-border">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                  className="w-full"
                >
                  {theme === "light" ? <Moon className="h-4 w-4 mr-2" /> : <Sun className="h-4 w-4 mr-2" />}
                  {theme === "light" ? "Dark" : "Light"} Mode
                </Button>
              </div>
            </SheetContent>
          </Sheet>

          {/* Theme Toggle (Desktop) */}
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
