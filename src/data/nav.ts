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
  Archive,
  ShoppingBag,
  Mail,
  Globe,
  Map,
  Gamepad2,
} from "lucide-react";

export interface NavItem {
  label: string;
  path: string;
  icon: LucideIcon;
  section: "main" | "archive" | "vault";
  searchTags?: string[];
}

export const NAV_ITEMS: NavItem[] = [
  // ── Main (flat list) ──
  { label: "Home", path: "/", icon: Home, section: "main" },
  { label: "About", path: "/about", icon: HelpCircle, section: "main" },
  { label: "Services", path: "/services", icon: Briefcase, section: "main" },
  { label: "Books", path: "/books", icon: BookOpen, section: "main", searchTags: ["reading", "library"] },
  { label: "Blog", path: "/blog", icon: FileText, section: "main", searchTags: ["articles", "posts", "writing"] },
  { label: "Digital Products", path: "/digital-products", icon: ShoppingBag, section: "main", searchTags: ["products", "store"] },
  { label: "AI Prompts", path: "/ai-prompts", icon: Zap, section: "main", searchTags: ["prompts", "coaching", "productivity"] },
  { label: "Life Notes", path: "/life-notes", icon: StickyNote, section: "main", searchTags: ["quotes", "wisdom", "mindset"] },
  { label: "Tools", path: "/tools", icon: Wrench, section: "main", searchTags: ["utilities"] },
  { label: "Health", path: "/health", icon: Dumbbell, section: "main", searchTags: ["fitness", "wellness", "exercise"] },
  { label: "Contact", path: "/contact", icon: Mail, section: "main" },

  // ── Archive (collapsible) ──
  { label: "Enrolled Agent", path: "/enrolled-agent", icon: GraduationCap, section: "archive", searchTags: ["study", "certification"] },
  { label: "Tax Quest", path: "/tax-quest", icon: Gamepad2, section: "archive", searchTags: ["game", "EA"] },
  { label: "QuickBooks", path: "/quickbooks", icon: Calculator, section: "archive", searchTags: ["bookkeeping"] },
  { label: "NBA Tracker", path: "/sports", icon: Trophy, section: "archive", searchTags: ["NBA", "scores"] },
  { label: "Interactive Resume", path: "/resume", icon: FileText, section: "archive", searchTags: ["resume", "cv", "career"] },
  { label: "Financial Treasure Map", path: "/financial-treasure-map", icon: Map, section: "archive", searchTags: ["finance", "investing"] },
  { label: "Personal Learning Vault", path: "/personal-learning-vault", icon: BookOpen, section: "archive", searchTags: ["videos", "learning"] },
  { label: "Website Starter Lab", path: "/website-lab", icon: Globe, section: "archive", searchTags: ["website", "build"] },
  { label: "Sports", path: "/sports", icon: Trophy, section: "archive", searchTags: ["NBA", "scores"] },
  { label: "Investing", path: "/investing", icon: TrendingUp, section: "archive", searchTags: ["finance", "stocks"] },
  { label: "Waez", path: "/waez", icon: Music, section: "archive", searchTags: ["religious", "lectures"] },
  { label: "Projects", path: "/projects", icon: FolderKanban, section: "archive", searchTags: ["pokedex", "builds"] },
  { label: "My Podcast", path: "/my-podcast", icon: Mic, section: "archive", searchTags: ["podcast", "audio"] },

  // ── Vault (standalone) ──
  { label: "Secret Vault", path: "/vault", icon: Lock, section: "vault", searchTags: ["premium", "exclusive"] },
];

// Helper to get items by section
export const getNavItemsBySection = (section: NavItem["section"]) =>
  NAV_ITEMS.filter((item) => item.section === section);
