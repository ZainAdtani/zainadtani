import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Sparkles, 
  Heart, 
  CheckCircle, 
  Link as LinkIcon,
  Home as HomeIcon,
  ArrowLeft,
  Copy,
  Check
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

// Timeline step data structure
type TimelineStep = {
  id: string;
  icon: React.ElementType;
  badge?: string;
  heading: string;
  body: string[];
  color: string;
  copyable?: string; // Optional text to copy (for duas/quotes)
  resources?: Array<{ label: string; url: string }>;
};

const TIMELINE_STEPS: TimelineStep[] = [
  {
    id: "opening",
    icon: BookOpen,
    badge: "Introduction",
    heading: "Why this Waez matters",
    body: [
      "A curated collection of talks from Rai Dr. Abualy Alibhai Aziz (Abu Ali), focused on spiritual practice, contemplation, and living with purpose.",
      "These teachings offer timeless wisdom on cultivating inner awareness and connecting with higher meaning."
    ],
    color: "bg-blue-500/10 border-blue-500/20"
  },
  {
    id: "origin",
    icon: BookOpen,
    badge: "Early Life",
    heading: "Origin",
    body: [
      "Born in Amritsar, India (1919), Abu Ali dedicated his life to religious service from an early age.",
      "He traveled extensively, delivering over 10,000 lectures worldwide across eight decades."
    ],
    color: "bg-emerald-500/10 border-emerald-500/20"
  },
  {
    id: "turning-point",
    icon: Sparkles,
    badge: "Turning Point",
    heading: "A Life of Service",
    body: [
      "His clarity, discipline, and devotion made him one of the most recognized missionaries of the 20th century.",
      "Thousands of recordings preserve his legacy, offering guidance for future generations."
    ],
    color: "bg-amber-500/10 border-amber-500/20"
  },
  {
    id: "lesson",
    icon: Heart,
    badge: "Key Lesson",
    heading: "The Power of Contemplation",
    body: [
      "Bait-ul-Khayal—a practice of contemplative reflection—helps cultivate inner awareness, gratitude, and spiritual discipline.",
      "Through structured thought exercises, we connect with higher purpose and meaning in daily life."
    ],
    color: "bg-rose-500/10 border-rose-500/20",
    copyable: "Ya Ali Madad - May divine grace guide us in our reflections"
  },
  {
    id: "action",
    icon: CheckCircle,
    badge: "Try This",
    heading: "Practical Takeaways",
    body: [
      "Start with 5 minutes of daily contemplation—reflect on your purpose, gratitude, and spiritual goals.",
      "Listen to one short waez this week and apply its teachings to your daily routine.",
      "Share insights with your community to deepen understanding through dialogue."
    ],
    color: "bg-violet-500/10 border-violet-500/20"
  },
  {
    id: "resources",
    icon: LinkIcon,
    badge: "Further Study",
    heading: "Resources & Links",
    body: [
      "Explore the full collection of lectures and notes to deepen your practice."
    ],
    color: "bg-indigo-500/10 border-indigo-500/20",
    resources: [
      { label: "Khoja Wiki", url: "https://khojawiki.org" },
      { label: "Ismaili Heritage", url: "https://ismailiheritage.org" },
      { label: "UTM Collections", url: "https://utm.utoronto.ca" },
      { label: "Learn about Bait-ul-Khayal", url: "https://www.youtube.com/results?search_query=bait+ul+khayal+ismaili" }
    ]
  }
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleCopy}
      className="gap-2"
      aria-label={copied ? "Copied" : "Copy to clipboard"}
    >
      {copied ? (
        <>
          <Check className="w-4 h-4" />
          Copied!
        </>
      ) : (
        <>
          <Copy className="w-4 h-4" />
          Copy
        </>
      )}
    </Button>
  );
}

function TimelineCard({ step, index }: { step: TimelineStep; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  const Icon = step.icon;

  return (
    <div
      ref={cardRef}
      className={`relative transition-all duration-500 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: prefersReducedMotion ? "0ms" : `${index * 100}ms` }}
    >
      {/* Connecting line dot */}
      <div className="absolute left-0 top-8 w-3 h-3 rounded-full bg-primary border-2 border-background shadow-lg -translate-x-1/2" />

      {/* Card content */}
      <div className={`ml-8 p-6 rounded-2xl border-2 ${step.color} backdrop-blur-sm shadow-md hover:shadow-lg transition-shadow`}>
        <div className="flex items-start gap-4 mb-4">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-background border-2 border-primary/20 flex items-center justify-center">
            <Icon className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            {step.badge && (
              <Badge variant="secondary" className="mb-2 text-xs">
                {step.badge}
              </Badge>
            )}
            <h3 className="text-xl font-bold text-foreground mb-2">
              {step.heading}
            </h3>
          </div>
        </div>

        <div className="space-y-3 text-base leading-relaxed text-muted-foreground">
          {step.body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        {step.copyable && (
          <div className="mt-4 p-3 rounded-lg bg-background/50 border border-primary/20 flex items-center justify-between gap-3">
            <p className="text-sm italic text-foreground">{step.copyable}</p>
            <CopyButton text={step.copyable} />
          </div>
        )}

        {step.resources && (
          <div className="mt-4 space-y-2">
            {step.resources.map((res, i) => (
              <a
                key={i}
                href={res.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-primary hover:underline"
              >
                → {res.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Waez() {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    TIMELINE_STEPS.forEach((step) => {
      const el = document.getElementById(step.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-accent/5 to-background">
      <Helmet>
        <title>Waez — Spiritual Timeline | Zain Adtani</title>
        <meta name="description" content="A journey through the teachings of Rai Dr. Abualy Alibhai Aziz (Abu Ali)" />
        <meta property="og:title" content="Waez — Spiritual Timeline | Zain Adtani" />
        <meta property="og:description" content="Explore timeless wisdom through a visual journey" />
        <meta property="og:image" content="/og-waez.png" />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Sticky TOC - Desktop only */}
      <nav className="hidden lg:block fixed left-8 top-1/2 -translate-y-1/2 z-30">
        <div className="space-y-3">
          {TIMELINE_STEPS.map((step) => (
            <a
              key={step.id}
              href={`#${step.id}`}
              className={`block w-3 h-3 rounded-full border-2 transition-all ${
                activeSection === step.id
                  ? "bg-primary border-primary scale-150"
                  : "bg-background border-muted-foreground/30 hover:border-primary"
              }`}
              aria-label={`Jump to ${step.heading}`}
            />
          ))}
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-3 mb-8 text-sm text-muted-foreground">
          <Link to="/" className="flex items-center gap-1 hover:text-primary transition-colors">
            <HomeIcon className="w-4 h-4" />
            Home
          </Link>
          <span>▸</span>
          <span className="text-foreground font-medium">Waez</span>
        </nav>

        <div className="mb-4">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/" className="flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </Button>
        </div>

        {/* Hero */}
        <header className="text-center mb-16 space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground">
            Waez Timeline
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A journey through the teachings of Rai Dr. Abualy Alibhai Aziz
          </p>
          <Badge variant="secondary" className="text-xs">
            Updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </Badge>
        </header>

        {/* Vertical Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent" />

          {/* Timeline steps */}
          <div className="space-y-12">
            {TIMELINE_STEPS.map((step, index) => (
              <div key={step.id} id={step.id}>
                <TimelineCard step={step} index={index} />
              </div>
            ))}
          </div>
        </div>

        {/* Footer CTA */}
        <div className="mt-20 text-center p-8 rounded-2xl bg-primary/5 border-2 border-primary/20">
          <h2 className="text-2xl font-bold text-foreground mb-3">
            Continue Your Journey
          </h2>
          <p className="text-muted-foreground mb-6">
            Explore more teachings and resources to deepen your practice
          </p>
          <Button asChild size="lg">
            <Link to="/">
              Return to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
