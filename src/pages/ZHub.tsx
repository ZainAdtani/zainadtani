import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import {
  TrendingUp,
  LineChart,
  PiggyBank,
  FileText,
  HardDrive,
  Mail,
  Sparkles,
  StickyNote,
  Wrench,
  FolderKanban,
  LucideIcon,
} from "lucide-react";

interface HubLink {
  label: string;
  href: string;
  icon: LucideIcon;
  internal?: boolean;
}

const QUICK_LINKS: HubLink[] = [
  { label: "Fidelity", href: "https://www.fidelity.com", icon: TrendingUp },
  { label: "Robinhood", href: "https://robinhood.com", icon: LineChart },
  { label: "Marcus Savings", href: "https://www.marcus.com", icon: PiggyBank },
  { label: "Notion", href: "https://notion.so", icon: FileText },
  { label: "Google Drive", href: "https://drive.google.com", icon: HardDrive },
  { label: "Beehiiv Dashboard", href: "https://app.beehiiv.com", icon: Mail },
];

const PROJECT_LINKS: HubLink[] = [
  { label: "AI Prompts", href: "/ai-prompts", icon: Sparkles, internal: true },
  { label: "Life Notes", href: "/life-notes", icon: StickyNote, internal: true },
  { label: "Tools", href: "/tools", icon: Wrench, internal: true },
  { label: "Fun Projects", href: "/projects", icon: FolderKanban, internal: true },
];

function HubCard({ item }: { item: HubLink }) {
  const Icon = item.icon;
  const inner = (
    <Card className="group p-6 flex flex-col items-center justify-center gap-3 text-center border border-border/50 hover:border-primary/70 hover:shadow-[0_0_24px_rgba(0,212,170,0.25)] transition-all duration-300 cursor-pointer h-full">
      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <span className="text-sm font-medium text-foreground">{item.label}</span>
    </Card>
  );

  if (item.internal) {
    return <Link to={item.href}>{inner}</Link>;
  }
  return (
    <a href={item.href} target="_blank" rel="noopener noreferrer">
      {inner}
    </a>
  );
}

const ZHub = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Z Hub — Zain Adtani</title>
        <meta name="description" content="Quick links, tools, and side projects." />
      </Helmet>

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-[900px]">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-display font-extrabold text-foreground inline-block relative">
              Z Hub
              <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent" />
            </h1>
            <p className="mt-6 text-muted-foreground text-base md:text-lg">
              My corner of the internet. Quick links, tools, and side projects.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-foreground mb-6">Quick Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
            {QUICK_LINKS.map((item) => (
              <HubCard key={item.label} item={item} />
            ))}
          </div>

          <h2 className="text-2xl font-bold text-foreground mb-6">Projects & Fun</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PROJECT_LINKS.map((item) => (
              <HubCard key={item.label} item={item} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ZHub;
