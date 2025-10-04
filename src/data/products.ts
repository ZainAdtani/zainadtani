import { ShoppingBag, Users, BookOpen, Heart, Sparkles, type LucideIcon } from "lucide-react";
import authorGuide from "@/assets/author-guide-preview.png";
import authorGuidePDF from "@/assets/author-guide.pdf";
import walkingWorkday from "@/assets/walking-workday-new.png";
import quietYourGut from "@/assets/quiet-your-gut.png";
import engineerToEA from "@/assets/engineer-to-ea-banner.png";
import jointFamilyBoundaries from "@/assets/joint-family-boundaries.png";

export type Product = {
  id: string;
  title: string;
  desc: string;
  category: "Courses" | "Guides" | "Communities" | "Wellness";
  media?: string;
  cta?: { label: string; href: string; download?: boolean; disabled?: boolean };
  tags?: string[];
  badge?: string;
  featured?: boolean;
  icon?: LucideIcon;
};

export const ALL_PRODUCTS: Product[] = [
  {
    id: "eng2ea-course",
    title: "Engineer to EA — Part 1",
    category: "Courses",
    desc: "Complete course covering all three parts of the Enrolled Agent exam. Fast-track your path from engineer to tax professional.",
    media: engineerToEA,
    cta: { label: "Enroll Now →", href: "https://whop.com/eng2ea/?a=eng2ea" },
    tags: ["Course", "EA", "Beginner"],
    badge: "Popular",
    featured: true,
    icon: ShoppingBag,
  },
  {
    id: "free-community",
    title: "Engineer → Enrolled Agent (Free Community)",
    category: "Communities",
    desc: "Join fellow EA students, get study tips, and access free resources. No fluff, just actionable advice.",
    cta: { label: "Join Free →", href: "https://www.skool.com/eng2ea/about" },
    tags: ["Free", "Community"],
    badge: "#1 Starter",
    featured: true,
    icon: Users,
  },
  {
    id: "author-guide",
    title: "How to Become an Author (PDF Guide)",
    category: "Guides",
    desc: "Proven framework to publish in ~6 months. Includes Kindle, print, and audiobook.",
    media: authorGuide,
    cta: { label: "download free PDF guide", href: authorGuidePDF, download: true },
    tags: ["Free", "PDF"],
    badge: "Preview",
    featured: true,
    icon: BookOpen,
  },
  {
    id: "walking-workday",
    title: "The Walking Workday",
    category: "Wellness",
    desc: "Fit three 20-minute walks into any busy schedule. Calendar and commute strategies to build daily movement without a gym.",
    media: walkingWorkday,
    cta: { label: "Get It Now →", href: "https://whop.com/the-walking-workday/the-walking-workday-bb/" },
    tags: ["Wellness", "eBook"],
    featured: true,
    icon: BookOpen,
  },
  {
    id: "quiet-your-gut",
    title: "Quiet Your Gut",
    category: "Wellness",
    desc: "Natural relief for busy people. Feel calm, confident, and in control—without pills or strict diets.",
    media: quietYourGut,
    cta: { label: "Get It Now →", href: "https://whop.com/stop-bloating-and-grumbling/stop-bloating-and-grumbling/" },
    tags: ["Wellness", "Guide"],
    badge: "New",
    featured: true,
    icon: Heart,
  },
  {
    id: "joint-family-boundaries",
    title: "Joint Family Boundaries Blueprint",
    category: "Courses",
    desc: "Navigate joint family dynamics with proven strategies for setting healthy boundaries while maintaining harmony. Coming soon.",
    media: jointFamilyBoundaries,
    cta: { 
      label: "Coming Soon", 
      href: "#",
      disabled: true
    },
    tags: ["Course", "Coming Soon"],
    badge: "Soon",
    featured: true,
    icon: Users,
  },
];

export const CATEGORIES = ["All", "Courses", "Guides", "Communities", "Wellness"] as const;
