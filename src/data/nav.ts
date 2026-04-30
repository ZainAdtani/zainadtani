import { LucideIcon } from "lucide-react";
import {
  Home,
  BookOpen,
  TrendingUp,
  FileText,
  Sparkles,
  Wrench,
  Star,
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
  { label: "Investing", path: "/investing", icon: TrendingUp, section: "main", searchTags: ["finance", "stocks"] },
  { label: "Digital Products", path: "/digital-products", icon: ShoppingBag, section: "main", searchTags: ["products", "store"] },

  // ── Archive ──
  { label: "AI Prompts", path: "/ai-prompts", icon: Sparkles, section: "archive", searchTags: ["prompts", "coaching", "productivity"] },
  { label: "Life Notes", path: "/life-notes", icon: FileText, section: "archive", searchTags: ["quotes", "wisdom", "mindset"] },
  { label: "Tools", path: "/tools", icon: Wrench, section: "archive", searchTags: ["utilities"] },
  { label: "Fun Projects", path: "/projects", icon: Star, section: "archive", searchTags: ["pokedex", "builds"] },
];

// Helper to get items by section
export const getNavItemsBySection = (section: NavItem["section"]) =>
  NAV_ITEMS.filter((item) => item.section === section);
