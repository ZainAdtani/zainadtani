import { Helmet } from "react-helmet-async";
import { Card } from "@/components/ui/card";

interface Account {
  name: string;
  href: string;
}

const ACCOUNTS: Account[] = [
  { name: "Fidelity", href: "https://www.fidelity.com" },
  { name: "Robinhood", href: "https://robinhood.com" },
  { name: "Marcus Savings", href: "https://www.marcus.com" },
];

function AccountCard({ item }: { item: Account }) {
  return (
    <a href={item.href} target="_blank" rel="noopener noreferrer" className="block">
      <Card className="p-6 flex flex-col gap-2 border border-border/50 hover:border-[#447BBE]/70 transition-all duration-300 h-full">
        <span className="text-lg font-semibold text-foreground">{item.name}</span>
        <span className="text-xs text-muted-foreground uppercase tracking-wider">Personal Account</span>
        <span className="mt-2 text-sm font-medium text-[#447BBE]">Open →</span>
      </Card>
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

          <h2 className="text-2xl font-bold text-foreground mb-6">My Accounts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {ACCOUNTS.map((item) => (
              <AccountCard key={item.name} item={item} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ZHub;
