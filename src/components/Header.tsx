import { Link, useLocation } from "react-router-dom";
import { Moon, Sun, Menu, Lock, Award, Home as HomeIcon, GraduationCap, BookOpen, TrendingUp, FileText, Paperclip, Zap, StickyNote, Calculator, Wrench, Trophy, Music, FolderKanban, HelpCircle, ChevronDown, Dumbbell, Briefcase } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "@/components/ui/sheet";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useState } from "react";

export const Header = () => {
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const [sheetOpen, setSheetOpen] = useState(false);
  const [learnOpen, setLearnOpen] = useState(true);
  const [resourcesOpen, setResourcesOpen] = useState(true);
  const [exploreOpen, setExploreOpen] = useState(true);
  const [supportOpen, setSupportOpen] = useState(true);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-4">
        {/* Sidebar Trigger */}
        <SidebarTrigger className="-ml-1" />
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="text-3xl font-bold">
            <span className="text-primary">Z</span>
            <span className="text-accent">A</span>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-3">
          <Link 
            to="/" 
            className={`px-3 py-1.5 rounded-full font-semibold text-sm transition-all duration-300 relative overflow-hidden group ${
              isActive('/') && location.pathname === '/' 
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
            <span className="relative z-10">Home</span>
            <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
          
          <Link 
            to="/about" 
            className={`px-3 py-1.5 rounded-full font-semibold text-sm transition-all duration-300 relative overflow-hidden group ${
              isActive('/about') 
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
            <span className="relative z-10">About Me</span>
            <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
          
          <Link 
            to="/investing" 
            className={`px-3 py-1.5 rounded-full font-semibold text-sm transition-all duration-300 relative overflow-hidden group ${
              isActive('/investing') 
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
            <span className="relative z-10">Investing</span>
            <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
          
          <Link 
            to="/digital-products" 
            className={`px-3 py-1.5 rounded-full font-semibold text-sm transition-all duration-300 relative overflow-hidden group ${
              isActive('/digital-products') 
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
            <span className="relative z-10">Digital Products</span>
            <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
          
          <Link 
            to="/books" 
            className={`px-3 py-1.5 rounded-full font-semibold text-sm transition-all duration-300 relative overflow-hidden group ${
              isActive('/books') 
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
            <span className="relative z-10">Books</span>
            <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>

          {/* Hamburger Menu */}
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 overflow-y-auto">
              <SheetHeader>
                <h3 className="text-lg font-semibold">More</h3>
                <p className="text-sm text-muted-foreground">Quick access</p>
              </SheetHeader>

              <nav className="mt-6 space-y-4">
                {/* Learn Section */}
                <Collapsible open={learnOpen} onOpenChange={setLearnOpen}>
                  <div className="border-b border-border pb-2">
                    <CollapsibleTrigger className="flex items-center justify-between w-full py-2 hover:bg-muted/50 rounded px-2">
                      <span className="text-sm font-semibold">Learn</span>
                      <ChevronDown className={`h-4 w-4 transition-transform ${learnOpen ? "rotate-180" : ""}`} />
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="space-y-1 pt-2">
                        <Link to="/" className="flex items-center gap-2 text-foreground hover:underline px-2 py-1" onClick={() => setSheetOpen(false)}>
                          <HomeIcon className="w-4 h-4" />
                          <span>Home</span>
                        </Link>
                        <Link to="/enrolled-agent" className="flex items-center gap-2 text-foreground hover:underline px-2 py-1" onClick={() => setSheetOpen(false)}>
                          <GraduationCap className="w-4 h-4" />
                          <span>Enrolled Agent</span>
                        </Link>
                        <Link to="/books" className="flex items-center gap-2 text-foreground hover:underline px-2 py-1" onClick={() => setSheetOpen(false)}>
                          <BookOpen className="w-4 h-4" />
                          <span>Books</span>
                        </Link>
                        <Link to="/investing" className="flex items-center gap-2 text-foreground hover:underline px-2 py-1" onClick={() => setSheetOpen(false)}>
                          <TrendingUp className="w-4 h-4" />
                          <span>Investing</span>
                        </Link>
                        <Link to="/blog" className="flex items-center gap-2 text-foreground hover:underline px-2 py-1" onClick={() => setSheetOpen(false)}>
                          <FileText className="w-4 h-4" />
                          <span>Blog</span>
                        </Link>
                      </div>
                    </CollapsibleContent>
                  </div>
                </Collapsible>

                {/* Resources Section */}
                <Collapsible open={resourcesOpen} onOpenChange={setResourcesOpen}>
                  <div className="border-b border-border pb-2">
                    <CollapsibleTrigger className="flex items-center justify-between w-full py-2 hover:bg-muted/50 rounded px-2">
                      <span className="text-sm font-semibold">Resources</span>
                      <ChevronDown className={`h-4 w-4 transition-transform ${resourcesOpen ? "rotate-180" : ""}`} />
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="space-y-1 pt-2">
                        <Link to="/resources" className="flex items-center gap-2 text-foreground hover:underline px-2 py-1" onClick={() => setSheetOpen(false)}>
                          <Paperclip className="w-4 h-4" />
                          <span>Resources</span>
                        </Link>
                        <Link to="/ai-prompts" className="flex items-center gap-2 text-foreground hover:underline px-2 py-1" onClick={() => setSheetOpen(false)}>
                          <Zap className="w-4 h-4" />
                          <span>AI Prompts</span>
                        </Link>
                        <Link to="/life-notes" className="flex items-center gap-2 text-foreground hover:underline px-2 py-1" onClick={() => setSheetOpen(false)}>
                          <StickyNote className="w-4 h-4" />
                          <span>Life Notes</span>
                        </Link>
                        <Link to="/quickbooks" className="flex items-center gap-2 text-foreground hover:underline px-2 py-1" onClick={() => setSheetOpen(false)}>
                          <Calculator className="w-4 h-4" />
                          <span>QuickBooks</span>
                        </Link>
                        <Link to="/tools" className="flex items-center gap-2 text-foreground hover:underline px-2 py-1" onClick={() => setSheetOpen(false)}>
                          <Wrench className="w-4 h-4" />
                          <span>Tools</span>
                        </Link>
                        <Link to="/sports" className="flex items-center gap-2 text-foreground hover:underline px-2 py-1" onClick={() => setSheetOpen(false)}>
                          <Trophy className="w-4 h-4" />
                          <span>Sports</span>
                        </Link>
                        <Link to="/waez" className="flex items-center gap-2 text-foreground hover:underline px-2 py-1" onClick={() => setSheetOpen(false)}>
                          <Music className="w-4 h-4" />
                          <span>Waez</span>
                        </Link>
                        <Link to="/workout" className="flex items-center gap-2 text-foreground hover:underline px-2 py-1" onClick={() => setSheetOpen(false)}>
                          <Dumbbell className="w-4 h-4" />
                          <span>Workout</span>
                        </Link>
                      </div>
                    </CollapsibleContent>
                  </div>
                </Collapsible>

                {/* Explore Section */}
                <Collapsible open={exploreOpen} onOpenChange={setExploreOpen}>
                  <div className="border-b border-border pb-2">
                    <CollapsibleTrigger className="flex items-center justify-between w-full py-2 hover:bg-muted/50 rounded px-2">
                      <span className="text-sm font-semibold">Explore</span>
                      <ChevronDown className={`h-4 w-4 transition-transform ${exploreOpen ? "rotate-180" : ""}`} />
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="space-y-1 pt-2">
                        <Link to="/projects" className="flex items-center gap-2 text-foreground hover:underline px-2 py-1" onClick={() => setSheetOpen(false)}>
                          <FolderKanban className="w-4 h-4" />
                          <span>Projects</span>
                        </Link>
                      </div>
                    </CollapsibleContent>
                  </div>
                </Collapsible>

                {/* Support Section */}
                <Collapsible open={supportOpen} onOpenChange={setSupportOpen}>
                  <div className="border-b border-border pb-2">
                    <CollapsibleTrigger className="flex items-center justify-between w-full py-2 hover:bg-muted/50 rounded px-2">
                      <span className="text-sm font-semibold">Support</span>
                      <ChevronDown className={`h-4 w-4 transition-transform ${supportOpen ? "rotate-180" : ""}`} />
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="space-y-1 pt-2">
                        <Link to="/about" className="flex items-center gap-2 text-foreground hover:underline px-2 py-1" onClick={() => setSheetOpen(false)}>
                          <HelpCircle className="w-4 h-4" />
                          <span>Help / Contact</span>
                        </Link>
                        <Link to="/services" className="flex items-center gap-2 text-foreground hover:underline px-2 py-1" onClick={() => setSheetOpen(false)}>
                          <Briefcase className="w-4 h-4" />
                          <span>Services</span>
                        </Link>
                      </div>
                    </CollapsibleContent>
                  </div>
                </Collapsible>

                {/* Secret Vault */}
                <div className="border-t border-border pt-4">
                  <Link to="/vault" className="flex items-center gap-2 text-foreground hover:underline px-2 py-1" onClick={() => setSheetOpen(false)}>
                    <Lock className="w-4 h-4 text-primary" />
                    <span>Secret Vault</span>
                  </Link>
                </div>
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
