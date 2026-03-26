import { LucideIcon } from "lucide-react";
import {
  Home,
  BookOpen,
  TrendingUp,
  FileText,
  Mic,
  Zap,
  StickyNote,
  Wrench,
  Music,
  FolderKanban,
  HelpCircle,
  Briefcase,
  ShoppingBag,
} from "lucide-react";

export interface NavItem {
  label: string;
  path: string;
  icon: LucideIcon;
  section: "main" | "archive";
  searchTags?: string[];
}

export const NAV_ITEMS: NavItem[] = [
  // ── Main ──
  { label: "Home", path: "/", icon: Home, section: "main" },
  { label: "About", path: "/about", icon: HelpCircle, section: "main" },
  { label: "Services", path: "/services", icon: Briefcase, section: "main" },
  { label: "Books", path: "/books", icon: BookOpen, section: "main", searchTags: ["reading", "library"] },
  { label: "Blog", path: "/blog", icon: FileText, section: "main", searchTags: ["articles", "posts", "writing"] },
  { label: "Digital Products", path: "/digital-products", icon: ShoppingBag, section: "main", searchTags: ["products", "store"] },
  { label: "AI Prompts", path: "/ai-prompts", icon: Zap, section: "main", searchTags: ["prompts", "coaching", "productivity"] },
  { label: "Life Notes", path: "/life-notes", icon: StickyNote, section: "main", searchTags: ["quotes", "wisdom", "mindset"] },
  { label: "Tools", path: "/tools", icon: Wrench, section: "main", searchTags: ["utilities"] },

  // ── Archive ──
  { label: "Investing", path: "/investing", icon: TrendingUp, section: "archive", searchTags: ["finance", "stocks"] },
  { label: "Waez", path: "/waez", icon: Music, section: "archive", searchTags: ["religious", "lectures"] },
  { label: "Projects", path: "/projects", icon: FolderKanban, section: "archive", searchTags: ["pokedex", "builds"] },
  { label: "My Podcast", path: "/my-podcast", icon: Mic, section: "archive", searchTags: ["podcast", "audio"] },
];

// Helper to get items by section
export const getNavItemsBySection = (section: NavItem["section"]) =>
  NAV_ITEMS.filter((item) => item.section === section);
