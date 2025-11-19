import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Helmet } from "react-helmet-async";
import { Shield, TrendingUp, Home } from "lucide-react";

const FinancialTreasureMap = () => {
  const worlds = [
    {
      id: 1,
      title: "Bonds World",
      description: "Safety first, small but steady moves.",
      icon: Shield,
      badge: "World 1",
    },
    {
      id: 2,
      title: "Stocks World",
      description: "Growth, risk, and long term bets.",
      icon: TrendingUp,
      badge: "World 2",
    },
    {
      id: 3,
      title: "Real Estate World",
      description: "Property, rent, and long game wealth.",
      icon: Home,
      badge: "World 3",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-900 via-slate-900 to-sky-950 relative overflow-hidden">
      <Helmet>
        <title>Financial Treasure Map | Zain Adtani</title>
        <meta name="description" content="Pick a world, set a goal, and track your next smart money move." />
      </Helmet>

      {/* Animated water overlay */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-indigo-500/20 animate-pulse" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-6xl text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Financial Treasure Map
            </h1>
            <p className="text-xl md:text-2xl text-cyan-100 max-w-3xl mx-auto leading-relaxed">
              Pick a world, set a goal, and track your next smart money move.
            </p>
          </div>
        </section>

        {/* Worlds Grid */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {worlds.map((world) => {
                const IconComponent = world.icon;
                return (
                  <Card
                    key={world.id}
                    className="group cursor-pointer hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl border-2 border-cyan-500/30 bg-slate-800/80 backdrop-blur-sm"
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between mb-4">
                        <Badge variant="secondary" className="bg-cyan-500/20 text-cyan-100 border-cyan-500/30">
                          {world.badge}
                        </Badge>
                        <IconComponent className="w-10 h-10 text-cyan-400 group-hover:scale-110 transition-transform" />
                      </div>
                      <CardTitle className="text-2xl text-white">{world.title}</CardTitle>
                      <CardDescription className="text-cyan-100/80 text-base">
                        {world.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-cyan-200/60 italic">
                        Coming soon, this world will unlock a guided map.
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Bottom note */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <p className="text-lg text-cyan-100/70 leading-relaxed">
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
