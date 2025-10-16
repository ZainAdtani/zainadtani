import { ShoppingBag, Users, BookOpen, Heart, Sparkles, type LucideIcon } from "lucide-react";
import authorGuide from "@/assets/author-guide-preview.png";
import authorGuidePDF from "@/assets/author-guide.pdf";
import walkingWorkday from "@/assets/walking-workday-new.png";
import quietYourGut from "@/assets/quiet-your-gut.png";
import engineerToEA from "@/assets/engineer-to-ea-banner.png";
import jointFamilyBoundaries from "@/assets/joint-family-boundaries.png";
import dailyLedgerMastery from "@/assets/daily-ledger-mastery.png";
import newlywedsMoveout from "@/assets/newlyweds-moveout-blueprint.png";

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
  order?: number; // Explicit display order
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
    order: 1,
  },
  {
    id: "author-guide",
    title: "How to Become an Author (PDF Guide)",
    category: "Guides",
    desc: "Proven framework to publish in ~6 months. Includes Kindle, print, and audiobook.",
    media: authorGuide,
    cta: { label: "Download Free PDF →", href: authorGuidePDF, download: true },
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
    id: "daily-ledger-mastery",
    title: "Daily Ledger Mastery for Shop-Helping Teens in Hindi",
    category: "Guides",
    desc: "18,000 शब्दों की व्यावहारिक ईबुक + टेम्पलेट्स। दुकान में मदद करने वाले टीनएजर्स के लिए रोज़ाना बही-खाता सिस्टम। 7 दिनों में आत्मविश्वास के साथ कैशबुक, बिक्री, उधारी, स्टॉक रजिस्टर सीखें।",
    media: dailyLedgerMastery,
    cta: { 
      label: "Get It Now →", 
      href: "https://whop.com/qbo-hindi/quickbooks-for-teens-in-hindi/"
    },
    tags: ["eBook", "Hindi"],
    badge: "New",
    featured: true,
    order: 6,
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
    order: 7,
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
    order: 8,
  },
];

export const CATEGORIES = ["All", "Courses", "Guides", "Communities", "Wellness"] as const;
