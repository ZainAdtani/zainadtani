import { Home, GraduationCap, TrendingUp, Wrench, Lock, ShoppingBag, Trophy, BookOpen, Music, HelpCircle, Search, ChevronDown, FolderKanban, FileText, Paperclip, Zap, StickyNote } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { Sun, Moon, Monitor } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState, useEffect, useMemo } from "react";
import Fuse from "fuse.js";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SearchableItem {
  title: string;
  route: string;
  section?: string;
  tags?: string[];
}

const searchIndex: SearchableItem[] = [
  { title: "Home", route: "/", section: "Learn" },
  { title: "Enrolled Agent", route: "/enrolled-agent", section: "Learn", tags: ["EA", "tax", "certification"] },
  { title: "Books HQ", route: "/books", section: "Learn", tags: ["reading", "library"] },
  { title: "Investing", route: "/investing", section: "Learn", tags: ["finance", "stocks"] },
  { title: "Blog", route: "/blog", section: "Learn", tags: ["articles", "posts", "writing"] },
  { title: "Resources", route: "/resources", section: "Resources", tags: ["PDFs", "tools", "quick reference"] },
  { title: "AI Prompts", route: "/ai-prompts", section: "Resources", tags: ["prompts", "coaching", "productivity"] },
  { title: "Life Notes", route: "/life-notes", section: "Resources", tags: ["quotes", "wisdom", "mindset"] },
  { title: "Tools", route: "/tools", section: "Resources", tags: ["utilities"] },
  { title: "Sports", route: "/sports", section: "Resources", tags: ["NBA", "scores"] },
  { title: "Waez", route: "/waez", section: "Resources", tags: ["religious", "lectures", "Abu Ali"] },
  { title: "Projects", route: "/projects", section: "Explore", tags: ["pokedex", "builds"] },
  { title: "Pokédex", route: "/projects/pokedex", section: "Explore", tags: ["pokemon", "notion"] },
  { title: "Secret Vault", route: "/vault", section: "Secret Vault", tags: ["premium", "exclusive"] },
  { title: "Help / Contact", route: "/about", section: "Support" },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const isCollapsed = state === "collapsed";

  // Collapsible state with localStorage persistence
  const [learnOpen, setLearnOpen] = useState(() => {
    const saved = localStorage.getItem("sidebar-learn-open");
    return saved !== null ? JSON.parse(saved) : true;
  });
  const [resourcesOpen, setResourcesOpen] = useState(() => {
    const saved = localStorage.getItem("sidebar-resources-open");
    return saved !== null ? JSON.parse(saved) : true;
  });
  const [supportOpen, setSupportOpen] = useState(() => {
    const saved = localStorage.getItem("sidebar-support-open");
    return saved !== null ? JSON.parse(saved) : true;
  });
  const [exploreOpen, setExploreOpen] = useState(() => {
    const saved = localStorage.getItem("sidebar-explore-open");
    return saved !== null ? JSON.parse(saved) : true;
  });

  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchableItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Persist collapsible state
  useEffect(() => {
    localStorage.setItem("sidebar-learn-open", JSON.stringify(learnOpen));
  }, [learnOpen]);
  useEffect(() => {
    localStorage.setItem("sidebar-resources-open", JSON.stringify(resourcesOpen));
  }, [resourcesOpen]);
  useEffect(() => {
    localStorage.setItem("sidebar-support-open", JSON.stringify(supportOpen));
  }, [supportOpen]);
  useEffect(() => {
    localStorage.setItem("sidebar-explore-open", JSON.stringify(exploreOpen));
  }, [exploreOpen]);

  // Fuse.js search
  const fuse = useMemo(
    () =>
      new Fuse(searchIndex, {
        keys: ["title", "section", "tags"],
        threshold: 0.3,
        includeScore: true,
      }),
    []
  );

  useEffect(() => {
    if (searchQuery.trim()) {
      const results = fuse.search(searchQuery).slice(0, 8);
      setSearchResults(results.map((r) => r.item));
      setSelectedIndex(0);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, fuse]);

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (searchResults.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % searchResults.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + searchResults.length) % searchResults.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      navigate(searchResults[selectedIndex].route);
      setSearchQuery("");
      setSearchResults([]);
    } else if (e.key === "Escape") {
      setSearchQuery("");
      setSearchResults([]);
    }
  };

  const getNavClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "bg-primary/10 text-primary font-medium border-l-2 border-primary"
      : "hover:bg-muted/50";

  return (
    <Sidebar collapsible="icon" className="border-r">
      {/* Search Header */}
      {!isCollapsed && (
        <SidebarHeader className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search pages, sections..."
              className="pl-9 h-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearchKeyDown}
            />
            {searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-popover border rounded-lg shadow-lg z-50 overflow-hidden">
                <ScrollArea className="max-h-[300px]">
                  {searchResults.map((result, idx) => (
                    <button
                      key={result.route}
                      onClick={() => {
                        navigate(result.route);
                        setSearchQuery("");
                        setSearchResults([]);
                      }}
                      className={`w-full text-left px-4 py-2 hover:bg-muted transition-colors ${
                        idx === selectedIndex ? "bg-muted" : ""
                      }`}
                    >
                      <div className="font-medium text-sm">{result.title}</div>
                      {result.section && (
                        <div className="text-xs text-muted-foreground">{result.section}</div>
                      )}
                    </button>
                  ))}
                </ScrollArea>
              </div>
            )}
          </div>
        </SidebarHeader>
      )}

      <SidebarContent>
        {/* Learn Section */}
        <Collapsible open={learnOpen} onOpenChange={setLearnOpen}>
          <SidebarGroup>
            <CollapsibleTrigger asChild>
              <SidebarGroupLabel className="cursor-pointer hover:bg-muted/50 rounded px-2 py-1 flex items-center justify-between">
                Learn
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${learnOpen ? "rotate-180" : ""}`}
                />
              </SidebarGroupLabel>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/" end className={getNavClass}>
                    <Home className="h-4 w-4" />
                    {!isCollapsed && <span>Home</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/enrolled-agent" className={getNavClass}>
                    <GraduationCap className="h-4 w-4" />
                    {!isCollapsed && <span>Enrolled Agent</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/books" className={getNavClass}>
                    <BookOpen className="h-4 w-4" />
                    {!isCollapsed && <span>Books</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/investing" className={getNavClass}>
                    <TrendingUp className="h-4 w-4" />
                    {!isCollapsed && <span>Investing</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/blog" className={getNavClass}>
                    <FileText className="h-4 w-4" />
                    {!isCollapsed && <span>Blog</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>

        {/* Resources Section */}
        <Collapsible open={resourcesOpen} onOpenChange={setResourcesOpen}>
          <SidebarGroup>
            <CollapsibleTrigger asChild>
              <SidebarGroupLabel className="cursor-pointer hover:bg-muted/50 rounded px-2 py-1 flex items-center justify-between">
                Resources
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${resourcesOpen ? "rotate-180" : ""}`}
                />
              </SidebarGroupLabel>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/resources" className={getNavClass}>
                    <Paperclip className="h-4 w-4" />
                    {!isCollapsed && <span>Resources</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/ai-prompts" className={getNavClass}>
                    <Zap className="h-4 w-4" />
                    {!isCollapsed && <span>AI Prompts</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/life-notes" className={getNavClass}>
                    <StickyNote className="h-4 w-4" />
                    {!isCollapsed && <span>Life Notes</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/tools" className={getNavClass}>
                    <Wrench className="h-4 w-4" />
                    {!isCollapsed && <span>Tools</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/sports" className={getNavClass}>
                    <Trophy className="h-4 w-4" />
                    {!isCollapsed && <span>Sports</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/waez" className={getNavClass}>
                    <Music className="h-4 w-4" />
                    {!isCollapsed && <span>Waez</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>

        {/* Explore Section */}
        <Collapsible open={exploreOpen} onOpenChange={setExploreOpen}>
          <SidebarGroup>
            <CollapsibleTrigger asChild>
              <SidebarGroupLabel className="cursor-pointer hover:bg-muted/50 rounded px-2 py-1 flex items-center justify-between">
                Explore
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${exploreOpen ? "rotate-180" : ""}`}
                />
              </SidebarGroupLabel>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/projects" className={getNavClass}>
                    <FolderKanban className="h-4 w-4" />
                    {!isCollapsed && <span>Projects</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>

        {/* Support Section */}
        <Collapsible open={supportOpen} onOpenChange={setSupportOpen}>
          <SidebarGroup>
            <CollapsibleTrigger asChild>
              <SidebarGroupLabel className="cursor-pointer hover:bg-muted/50 rounded px-2 py-1 flex items-center justify-between">
                Support
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${supportOpen ? "rotate-180" : ""}`}
                />
              </SidebarGroupLabel>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/about" className={getNavClass}>
                    <HelpCircle className="h-4 w-4" />
                    {!isCollapsed && <span>Help / Contact</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>

        {/* Secret Vault Section (Standalone) */}
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <NavLink to="/vault" className={getNavClass}>
                  <Lock className="h-4 w-4" />
                  {!isCollapsed && <span>Secret Vault</span>}
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* Theme Toggle Footer */}
      {!isCollapsed && (
        <SidebarFooter className="p-4 border-t">
          <div className="flex items-center gap-2">
            <Button
              variant={theme === "light" ? "default" : "ghost"}
              size="sm"
              onClick={() => setTheme("light")}
              className="flex-1"
            >
              <Sun className="h-4 w-4" />
            </Button>
            <Button
              variant={theme === "dark" ? "default" : "ghost"}
              size="sm"
              onClick={() => setTheme("dark")}
              className="flex-1"
            >
              <Moon className="h-4 w-4" />
            </Button>
            <Button
              variant={theme === "system" ? "default" : "ghost"}
              size="sm"
              onClick={() => setTheme("system")}
              className="flex-1"
            >
              <Monitor className="h-4 w-4" />
            </Button>
          </div>
        </SidebarFooter>
      )}
    </Sidebar>
  );
}
