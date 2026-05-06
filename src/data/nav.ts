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
  { label: "AI Prompts", path: "/ai-prompts", icon: Sparkles, section: "main", searchTags: ["prompts", "coaching", "productivity"] },
  { label: "Life Notes", path: "/life-notes", icon: FileText, section: "main", searchTags: ["quotes", "wisdom", "mindset"] },
];

// Helper to get items by section
export const getNavItemsBySection = (section: NavItem["section"]) =>
  NAV_ITEMS.filter((item) => item.section === section);
