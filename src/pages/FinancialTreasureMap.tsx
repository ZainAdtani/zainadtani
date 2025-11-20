import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Helmet } from "react-helmet-async";
import { Shield, TrendingUp, Home, Brain, PiggyBank, Briefcase } from "lucide-react";

const FinancialTreasureMap = () => {
  const worlds = [
    {
      id: 0,
      badge: "World 0",
      title: "Mindset World",
      tagline: "Strong money habits start in your head.",
      description: "You shape your future when you decide wealth is possible for you.",
      icon: Brain,
      keyIdeas: [
        "Money is a tool, not a score.",
        "Belief comes first, skills follow.",
        "Old stories about money often limit progress.",
      ],
      tinyActions: [
        "Write one money goal for the next twelve months.",
        "Finish one short video or page from this map with full focus.",
        "Write one belief about money you want to upgrade.",
      ],
    },
    {
      id: 1,
      badge: "World 1",
      title: "Starter World",
      tagline: "Build a small safety net before big moves.",
      description: "Two thousand saved gives breathing room when life feels rough.",
      icon: PiggyBank,
      keyIdeas: [
        "Use a 75 15 10 plan for spend, invest, and save.",
        "Track every dollar for one month to find leaks.",
        "Keep the cushion in a high yield savings account for quick access.",
      ],
      tinyActions: [
        "Open or pick one savings account for the cushion.",
        "Cancel one bill or subscription you no longer value.",
        "Move a small amount today into the cushion fund.",
      ],
    },
    {
      id: 2,
      badge: "World 2",
      title: "Bonds World",
      tagline: "Quiet, steady protection when markets shake.",
      description: "Bonds focus on safety more than growth.",
      icon: Shield,
      keyIdeas: [
        "U S Treasury bonds sit near the low risk end of the spectrum.",
        "Prices often rise when nervous investors run from stocks.",
        "Bond ETFs give easy access to a group of bonds in one click.",
      ],
      tinyActions: [
        "Check what share of your investments you want in safe assets.",
        "Search one Treasury bond ETF and read its overview page.",
        "Notice how its price moved in past crashes or rough years.",
      ],
    },
    {
      id: 3,
      badge: "World 3",
      title: "Stocks World",
      tagline: "Own pieces of real businesses for long term growth.",
      description: "Stocks bring risk, yet reward patient investors.",
      icon: TrendingUp,
      keyIdeas: [
        "Broad index ETFs spread risk across many companies.",
        "Dollar cost averaging uses regular deposits through ups and downs.",
        "Holding for longer than one year often leads to lower tax rates.",
      ],
      tinyActions: [
        "Open a brokerage account if you still need one.",
        "Buy one share or fraction of a broad market ETF.",
        "Set an automatic weekly or monthly buy amount.",
      ],
    },
    {
      id: 4,
      badge: "World 4",
      title: "Real Estate World",
      tagline: "Own places people pay to live or work.",
      description: "Real estate mixes income, leverage, and strong tax rules.",
      icon: Home,
      keyIdeas: [
        "Positive cash flow means rent covers all costs with money left over.",
        "Depreciation deductions lower taxable profit on paper.",
        "You defer tax on growth with a 1031 exchange when you roll into a new property.",
      ],
      tinyActions: [
        "Learn a simple cash flow formula for rentals.",
        "Read a short guide on depreciation for landlords.",
        "Search property managers in your area and note typical fees.",
      ],
    },
    {
      id: 5,
      badge: "World 5",
      title: "Advanced World",
      tagline: "Use entities and planning to keep more of what you earn.",
      description: "Shift income types and use legal rules for long term advantage.",
      icon: Briefcase,
      keyIdeas: [
        "Earned, portfolio, and passive income all face different rules.",
        "Running even a small business unlocks many legal deductions.",
        "Smart planning happens during the year, not during tax filing week.",
      ],
      tinyActions: [
        "List every income source and label it earned, portfolio, or passive.",
        "Start a simple log for any side hustle costs.",
        "Book time with a tax pro who focuses on planning, not only forms.",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-900 via-slate-900 to-sky-950 relative overflow-hidden">
      <Helmet>
        <title>Financial Treasure Map | Zain Adtani</title>
        <meta name="description" content="Pick a world, set a goal, and track your next smart money move." />
      </Helmet>

      {/* Soft animated overlay */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-indigo-500/20 animate-pulse" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Financial Treasure Map</h1>
            <p className="text-xl md:text-2xl text-cyan-100 max-w-3xl mx-auto leading-relaxed">
              Pick a world, set a goal, and track your next smart money move.
            </p>
            <p className="mt-4 text-base md:text-lg text-cyan-100/80">
              Scroll through each world, pick one level, and focus on one small step at a time.
            </p>
          </div>
        </section>

        {/* Worlds timeline */}
        <section className="pb-12 md:pb-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="relative">
              <div className="hidden md:block absolute left-4 top-0 bottom-0 w-px bg-cyan-500/40" />
              <div className="space-y-8 md:space-y-10">
                {worlds.map((world, index) => {
                  const IconComponent = world.icon;

                  return (
                    <div key={world.id} className="relative md:pl-10">
                      <div className="hidden md:flex absolute left-0 top-8 w-8 h-8 items-center justify-center rounded-full bg-slate-900 border border-cyan-400/70">
                        <span className="text-xs font-semibold text-cyan-100">{index}</span>
                      </div>

                      <Card className="group bg-slate-900/80 border border-cyan-500/40 backdrop-blur-sm hover:border-cyan-300/80 hover:-translate-y-1 transition-all duration-300">
                        <CardHeader>
                          <div className="flex items-center justify-between gap-4 mb-2">
                            <Badge variant="secondary" className="bg-cyan-500/20 text-cyan-100 border-cyan-500/40">
                              {world.badge}
                            </Badge>
                            <IconComponent className="w-10 h-10 text-cyan-400 group-hover:scale-110 transition-transform" />
                          </div>
                          <CardTitle className="text-2xl text-white">{world.title}</CardTitle>
                          <CardDescription className="text-cyan-100/80 text-base">{world.tagline}</CardDescription>
                        </CardHeader>

                        <CardContent>
                          <p className="text-cyan-100/80 text-sm md:text-base mb-4">{world.description}</p>

                          <div className="grid gap-6 md:grid-cols-2">
                            <div>
                              <h3 className="text-sm font-semibold text-cyan-200 mb-2">Key ideas</h3>
                              <ul className="space-y-1 text-sm text-cyan-100/80">
                                {world.keyIdeas.map((idea, i) => (
                                  <li key={i} className="flex gap-2">
                                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-400" />
                                    <span>{idea}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div>
                              <h3 className="text-sm font-semibold text-cyan-200 mb-2">Tiny actions today</h3>
                              <ul className="space-y-1 text-sm text-cyan-100/80">
                                {world.tinyActions.map((action, i) => (
                                  <li key={i} className="flex gap-2">
                                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                                    <span>{action}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          <p className="mt-6 text-xs text-cyan-200/70 italic">
                            Guided quests and deeper lessons for this world will unlock in a future update.
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Bottom note */}
        <section className="pb-12 md:pb-16">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <p className="text-lg text-cyan-100/80 leading-relaxed">
              More worlds and quests are coming. Start with one goal you want to move closer to today.
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 border-t border-cyan-500/20">
          <div className="container mx-auto px-4 max-w-6xl text-center text-sm text-cyan-100/50">
            © {new Date().getFullYear()} Zain Adtani. All rights reserved.
          </div>
        </footer>
      </div>
    </div>
  );
};

export default FinancialTreasureMap;
