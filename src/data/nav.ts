import { LucideIcon } from "lucide-react";
import {
  Home,
  GraduationCap,
  BookOpen,
  TrendingUp,
  FileText,
  Mic,
  Paperclip,
  Zap,
  StickyNote,
  Calculator,
  Wrench,
  Trophy,
  Music,
  Dumbbell,
  FolderKanban,
  HelpCircle,
  Briefcase,
  Lock,
} from "lucide-react";

export interface NavItem {
  label: string;
  path: string;
  icon: LucideIcon;
  section: "learn" | "resources" | "explore" | "support" | "vault";
  searchTags?: string[];
}

export const NAV_ITEMS: NavItem[] = [
  // Learn Section
  {
    label: "Home",
    path: "/",
    icon: Home,
    section: "learn",
  },
  {
    label: "Enrolled Agent",
    path: "/enrolled-agent",
    icon: GraduationCap,
    section: "learn",
    searchTags: ["EA", "tax", "certification"],
  },
  {
    label: "Books",
    path: "/books",
    icon: BookOpen,
    section: "learn",
    searchTags: ["reading", "library"],
  },
  {
    label: "Investing",
    path: "/investing",
    icon: TrendingUp,
    section: "learn",
    searchTags: ["finance", "stocks"],
  },
  {
    label: "Blog",
    path: "/blog",
    icon: FileText,
    section: "learn",
    searchTags: ["articles", "posts", "writing"],
  },
  {
    label: "My Podcast",
    path: "/my-podcast",
    icon: Mic,
    section: "learn",
    searchTags: ["podcast", "audio", "episodes"],
  },
  // Resources Section
  {
    label: "Resources",
    path: "/resources",
    icon: Paperclip,
    section: "resources",
    searchTags: ["PDFs", "tools", "quick reference"],
  },
  {
    label: "AI Prompts",
    path: "/ai-prompts",
    icon: Zap,
    section: "resources",
    searchTags: ["prompts", "coaching", "productivity"],
  },
  {
    label: "Life Notes",
    path: "/life-notes",
    icon: StickyNote,
    section: "resources",
    searchTags: ["quotes", "wisdom", "mindset"],
  },
  {
    label: "Personal Learning Vault",
    path: "/personal-learning-vault",
    icon: BookOpen,
    section: "resources",
    searchTags: ["videos", "learning", "notes", "summaries"],
  },
  {
    label: "QuickBooks",
    path: "/quickbooks",
    icon: Calculator,
    section: "resources",
    searchTags: ["training", "bookkeeping", "cleanup"],
  },
  {
    label: "Tools",
    path: "/tools",
    icon: Wrench,
    section: "resources",
    searchTags: ["utilities"],
  },
  {
    label: "Sports",
    path: "/sports",
    icon: Trophy,
    section: "resources",
    searchTags: ["NBA", "scores"],
  },
  {
    label: "Waez",
    path: "/waez",
    icon: Music,
    section: "resources",
    searchTags: ["religious", "lectures", "Abu Ali"],
  },
  {
    label: "Workout",
    path: "/workout",
    icon: Dumbbell,
    section: "resources",
    searchTags: ["fitness", "health", "exercise"],
  },
  // Explore Section
  {
    label: "Projects",
    path: "/projects",
    icon: FolderKanban,
    section: "explore",
    searchTags: ["pokedex", "builds"],
  },
  {
    label: "Services",
    path: "/services",
    icon: Briefcase,
    section: "explore",
    searchTags: ["website", "lovable", "build"],
  },
  // Support Section
  {
    label: "Help / Contact",
    path: "/about",
    icon: HelpCircle,
    section: "support",
  },
  // Vault Section (Standalone)
  {
    label: "Secret Vault",
    path: "/vault",
    icon: Lock,
    section: "vault",
    searchTags: ["premium", "exclusive"],
  },
];

// Helper to get items by section
export const getNavItemsBySection = (section: NavItem["section"]) =>
  NAV_ITEMS.filter((item) => item.section === section);
