import { ShoppingBag, Users, BookOpen, Heart, Sparkles, type LucideIcon } from "lucide-react";
import authorGuide from "@/assets/author-kit-cover.png";
import authorGuidePDF from "@/assets/author-guide.pdf";
import walkingWorkday from "@/assets/walking-workday-new.png";
import quietYourGut from "@/assets/quiet-your-gut.png";
import jointFamilyBoundaries from "@/assets/joint-family-boundaries.png";
import newlywedsMoveout from "@/assets/newlyweds-moveout-blueprint.png";

export type Product = {
  id: string;
  title: string;
  desc: string;
  category: "Guides" | "Wellness";
  media?: string;
  cta?: { label: string; href: string; download?: boolean; disabled?: boolean };
  tags?: string[];
  badge?: string;
  featured?: boolean;
  order?: number; // Explicit display order
};

export const ALL_PRODUCTS: Product[] = [
  {
    id: "author-guide",
    title: "How to Become an Author (PDF Guide)",
    category: "Guides",
    desc: "Proven framework to publish in ~6 months. Includes Kindle, print, and audiobook.",
    media: authorGuide,
    cta: { label: "Download Free PDF →", href: "https://whop.com/you-bestselling-author", disabled: false },
    tags: ["Free", "PDF"],
    badge: "Preview",
    featured: true,
    order: 2,
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
    order: 3,
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
    order: 4,
  },
  {
    id: "newlyweds-moveout",
    title: "The Newlyweds' 14-Day Move-Out Blueprint",
    category: "Guides",
    desc: "Step-by-step roadmap to confidently move out in just 14 days. Perfect for newlyweds planning their first home together.",
    media: newlywedsMoveout,
    cta: { label: "Get It Now →", href: "https://whop.com/the-newlyweds-14-day-move-out-blueprint/the-newlyweds-14-day-move-out/" },
    tags: ["eBook", "Guide"],
    badge: "New",
    featured: true,
    order: 5,
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
    order: 7,
  },
  {
    id: "clinicClarityKit",
    title: "Clinic Clarity Kit for MAs",
    badge: "New",
    category: "Guides",
    desc: "Three simple Ask, Confirm, Summarize phone scripts for medical assistants to cut callbacks and confusion.",
    media: "/images/products/clinic_clarity_kit_cover.png",
    tags: ["Medical assistant", "Scripts", "Clinic"],
    cta: {
      label: "Get it on Whop",
      href: "https://whop.com/ask-confirm-summarize-playbook/"
    },
    featured: true,
    order: 8,
  },
  {
    id: "calmSoloTime",
    title: "Calm Solo Time",
    badge: "New",
    category: "Wellness",
    desc: "Thirty day clicker and brown noise plan to reduce dog whining and build relaxed alone time.",
    media: "/images/products/calm_solo_time_cover.png",
    tags: ["Dogs", "Training", "Behavior"],
    cta: {
      label: "Get it on Whop",
      href: "https://whop.com/calm-solo-time/"
    },
    featured: true,
    order: 9,
  },
  {
    id: "texasLlcRoadmap",
    title: "The Texas LLC Roadmap",
    badge: "New",
    category: "Guides",
    desc: "Simple launch kit with mind map and templates so a Texas LLC setup feels clear and step by step.",
    media: "/images/products/texas_llc_roadmap_cover.png",
    tags: ["Business", "Texas", "LLC"],
    cta: {
      label: "Get it on Whop",
      href: "https://whop.com/the-texas-llc-roadmap/"
    },
    featured: true,
    order: 10,
  },
  {
    id: "zenDetachment30",
    title: "Thirty Day Zen Detachment",
    badge: "New",
    category: "Wellness",
    desc: "A thirty day process plan to shift from outcome obsession to calm daily action in one life area.",
    media: "/images/products/zen_detachment_30_cover.png",
    tags: ["Mindset", "Habits", "Stress"],
    cta: {
      label: "Get it on Whop",
      href: "https://whop.com/30-day-zen-detachment/"
    },
    featured: true,
    order: 11,
  },
];

export const CATEGORIES = ["All", "Guides", "Wellness"] as const;
