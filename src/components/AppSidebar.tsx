import { Search, ChevronDown } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { NAV_ITEMS, getNavItemsBySection } from "@/data/nav";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
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

const searchIndex: SearchableItem[] = NAV_ITEMS.map((item) => ({
  title: item.label,
  route: item.path,
  section: item.section.charAt(0).toUpperCase() + item.section.slice(1),
  tags: item.searchTags,
}));

export function AppSidebar() {
  const { state } = useSidebar();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const isCollapsed = state === "collapsed";

  const [archiveOpen, setArchiveOpen] = useState(() => {
    const saved = localStorage.getItem("sidebar-funprojects-open");
    return saved !== null ? JSON.parse(saved) : false;
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchableItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    localStorage.setItem("sidebar-funprojects-open", JSON.stringify(archiveOpen));
  }, [archiveOpen]);

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
      : "hover:bg-primary/5 hover:border-l-2 hover:border-primary/60 transition-all duration-200";

  return (
    <Sidebar collapsible="icon" className="border-r">
      {!isCollapsed && (
        <SidebarHeader className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search pages..."
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
                      key={result.route + idx}
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
        {/* Main — flat list, no header */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {getNavItemsBySection("main").map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.path}
                      end={item.path === "/"}
                      className={getNavClass}
                    >
                      <item.icon className="h-4 w-4" />
                      {!isCollapsed && <span>{item.label}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Archive — collapsible */}
        <Collapsible open={archiveOpen} onOpenChange={setArchiveOpen}>
          <SidebarGroup>
            <CollapsibleTrigger asChild>
              <SidebarGroupLabel className="cursor-pointer hover:bg-muted/50 rounded px-2 py-1 flex items-center justify-between">
                Projects
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${archiveOpen ? "rotate-180" : ""}`}
                />
              </SidebarGroupLabel>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {getNavItemsBySection("archive").map((item, idx) => (
                    <SidebarMenuItem key={item.path + idx}>
                      <SidebarMenuButton asChild>
                        <NavLink to={item.path} className={getNavClass}>
                          <item.icon className="h-4 w-4" />
                          {!isCollapsed && <span>{item.label}</span>}
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>

      </SidebarContent>

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
