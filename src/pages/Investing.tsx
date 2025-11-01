import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, DollarSign, PiggyBank, LineChart, BookOpen, Target } from "lucide-react";

const Investing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Investing</h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Building wealth through smart investment strategies and financial education
            </p>
          </div>
        </div>
      </section>

      {/* Investment Philosophy */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                My Investment <span className="text-primary">Philosophy</span>
              </h2>
              <div className="space-y-4 text-lg text-muted-foreground">
                <p>
                  Investing isn't just about making money—it's about building financial freedom and creating
                  opportunities for yourself and those you care about.
                </p>
                <p>
                  I believe in a balanced approach that combines long-term wealth building with calculated risks, always
                  focusing on continuous learning and adaptation.
                </p>
                <p>
                  Whether it's stocks, real estate, or building businesses, the key is understanding the fundamentals
                  and staying disciplined.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <Card className="p-6 text-center hover-lift transition-all duration-300">
                <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-bold text-2xl mb-2">Long-Term</h3>
                <p className="text-muted-foreground">Focus on sustainable growth</p>
              </Card>

              <Card className="p-6 text-center hover-lift transition-all duration-300">
                <Target className="w-12 h-12 text-accent mx-auto mb-4" />
                <h3 className="font-bold text-2xl mb-2">Strategic</h3>
                <p className="text-muted-foreground">Data-driven decisions</p>
              </Card>

              <Card className="p-6 text-center hover-lift transition-all duration-300">
                <PiggyBank className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-bold text-2xl mb-2">Diversified</h3>
                <p className="text-muted-foreground">Spread risk wisely</p>
              </Card>

              <Card className="p-6 text-center hover-lift transition-all duration-300">
                <BookOpen className="w-12 h-12 text-accent mx-auto mb-4" />
                <h3 className="font-bold text-2xl mb-2">Educated</h3>
                <p className="text-muted-foreground">Always learning</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Savings & Brokerage Accounts */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12">
            My <span className="text-primary">Banking & Brokerage</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="p-8 hover-lift transition-all duration-300 border-2 border-primary/20">
              <PiggyBank className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-4">Marcus by Goldman Sachs</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                High-yield savings account for building emergency funds and short-term savings goals.
              </p>
              <Button asChild variant="outline" className="w-full">
                <a href="https://www.marcus.com/share/ZAI-3SI-69TP" target="_blank" rel="noopener noreferrer">
                  Open Marcus Account →
                </a>
              </Button>
            </Card>

            <Card className="p-8 hover-lift transition-all duration-300 border-2 border-accent/20">
              <LineChart className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-2xl font-bold mb-4">Fidelity</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                My primary brokerage for stocks, ETFs, and retirement accounts with excellent research tools.
              </p>
              <Button asChild variant="outline" className="w-full">
                <a href="https://fidelity.app.link/e/wKOQHcrcRVb" target="_blank" rel="noopener noreferrer">
                  Open Fidelity Account →
                </a>
              </Button>
            </Card>

            <Card className="p-8 hover-lift transition-all duration-300 border-2 border-primary/20">
              <TrendingUp className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-4">Robinhood</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Commission-free trading platform for stocks, ETFs, options, and crypto with an intuitive mobile
                experience.
              </p>
              <Button asChild variant="outline" className="w-full">
                <a href="https://join.robinhood.com/zaina113" target="_blank" rel="noopener noreferrer">
                  Join Robinhood →
                </a>
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Options Trading Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                Master <span className="text-primary">Options Trading</span>
              </h2>
              <div className="space-y-4 text-lg text-muted-foreground">
                <p>
                  Options are one of the most powerful tools in investing—offering flexibility, leverage, and strategic
                  opportunities beyond simple stock ownership.
                </p>
                <p>
                  Whether you're hedging your portfolio, generating income through covered calls, or speculating on
                  market movements, understanding options is essential for serious investors.
                </p>
                <p>
                  I'm learning from the best resources available, and I highly recommend this comprehensive course that
                  breaks down calls, puts, spreads, and advanced strategies.
                </p>
              </div>
            </div>

            <Card className="p-8 hover-lift transition-all duration-300 border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-accent/5">
              <LineChart className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-4">Complete Options Course</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Master calls, puts, long & short positions, spreads, and real-world strategies. From beginner to
                advanced, this course covers everything you need to trade options confidently.
              </p>
              <Button asChild className="w-full" size="lg">
                <a
                  href="https://www.udemy.com/course/the-completecomplete-options-course-calls-puts-long-short/?couponCode=MT251006G3"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get the Course →
                </a>
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* === Portfolio Breakdown (3D Cards) === */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-background via-accent/5 to-secondary/10">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-4">
            My <span className="text-primary">Portfolio Breakdown</span>
          </h2>
          <p className="text-center text-muted-foreground mb-12">
            Live list from my notes — not financial advice. I’ll update positions as I go.
          </p>

          {/* Data (edit freely) */}
          {(() => {
            // === INDIVIDUAL: cleaned to only stocks & ETFs; simple display ===
            const INDIVIDUAL_TICKERS = [
              "BBAI","WULF","ENTO","MEME","MSTR","PATH","IWM","RGTI","TTD",
              "VYMI","CRWV","SCHG","BABA","UNH","QUBT"
            ];

            // Optional: plain names when confidently known; leave blank if unsure
            const NAME_BY_TICKER: Record<string, string> = {
              BBAI: "BigBear.ai",
              WULF: "TeraWulf",
              ENTO: "Entero Therapeutics",
              MEME: "Roundhill MEME ETF",
              MSTR: "MicroStrategy",
              PATH: "UiPath",
              IWM: "iShares Russell 2000 ETF",
              RGTI: "Rigetti Computing",
              TTD: "The Trade Desk",
              VYMI: "Vanguard Intl High Dividend ETF",
              SCHG: "Schwab U.S. Large-Cap Growth ETF",
              BABA: "Alibaba Group",
              UNH: "UnitedHealth Group",
              QUBT: "Quantum Computing, Inc.",
              // CRWV left blank intentionally
            };

            const INDIVIDUAL = INDIVIDUAL_TICKERS.map((t) => ({
              ticker: t,
              name: NAME_BY_TICKER[t] ?? "",
            }));

            const ROTH_IRA = [
              { ticker: "JEPI", name: "JPM Equity Premium", tag: "Income" },
              { ticker: "JEPQ", name: "JPM Nasdaq Premium", tag: "Income" },
              { ticker: "VOO", name: "Vanguard S&P 500", tag: "Core" },
              { ticker: "VXUS", name: "Vanguard Total Intl", tag: "ETF" },
              { ticker: "BND", name: "Vanguard Total Bond", tag: "Income" },
              { ticker: "VNQ", name: "Vanguard REIT", tag: "Income" },
              { ticker: "FBTC", name: "Fidelity Bitcoin ETF", tag: "Crypto" },
            ];

            // Minimal, clean card: ticker + (optional) name. No icons, no tags.
            const SimpleHoldingCard = ({ p }: { p: { ticker: string; name?: string } }) => (
              <div className="rounded-2xl border bg-background/70 p-5 shadow-sm hover:shadow-md transition">
                <div>
                  <div className="text-2xl font-extrabold tracking-tight">{p.ticker}</div>
                  {p.name ? <div className="text-sm text-muted-foreground mt-1">{p.name}</div> : null}
                </div>
              </div>
            );

            const Card3D = ({ p }: { p: any }) => (
              <div
                className="group relative rounded-2xl border-2 bg-background/70 backdrop-blur-sm p-5 shadow-lg hover:shadow-2xl transition-all duration-300"
                onMouseMove={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  const r = el.getBoundingClientRect();
                  const x = e.clientX - r.left;
                  const y = e.clientY - r.top;
                  const rx = (y / r.height - 0.5) * -6;
                  const ry = (x / r.width - 0.5) * 6;
                  el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform =
                    "perspective(900px) rotateX(0) rotateY(0) translateY(0)";
                }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 via-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <h4 className="text-2xl font-extrabold tracking-tight">{p.ticker}</h4>
                    <TrendingUp className="w-5 h-5 text-primary opacity-70" />
                  </div>
                  {p.name ? <p className="text-sm text-muted-foreground mt-1">{p.name}</p> : null}
                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.tag ? (
                      <span className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-full border">
                        {p.tag}
                      </span>
                    ) : null}
                  </div>
                </div>
              </div>
            );

            return (
              <>
                {/* Individual */}
                <div className="mb-12">
                  <div className="flex items-baseline justify-between gap-4 mb-6">
                    <h3 className="text-3xl font-bold">
                      Individual <span className="text-primary">Stocks & ETFs</span>
                    </h3>
                    <span className="text-xs text-muted-foreground">{INDIVIDUAL.length} positions</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {INDIVIDUAL.map((p, i) => (
                      <SimpleHoldingCard key={p.ticker + i} p={p} />
                    ))}
                  </div>
                </div>

                {/* Roth IRA */}
                <div>
                  <div className="flex items-baseline justify-between gap-4 mb-6">
                    <h3 className="text-3xl font-bold">
                      Roth IRA <span className="text-primary">Holdings</span>
                    </h3>
                    <span className="text-xs text-muted-foreground">{ROTH_IRA.length} positions</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {ROTH_IRA.map((p, i) => (
                      <Card3D key={p.ticker + i} p={p} />
                    ))}
                  </div>
                </div>
              </>
            );
          })()}
        </div>
      </section>

      {/* Book in Progress Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-accent/5 via-background to-primary/5">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 md:p-12 text-center border-2 border-primary/20">
              <BookOpen className="w-16 h-16 text-primary mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                The School of <span className="text-primary">Financial Sorcery</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto">
                I'm currently writing a comprehensive guide that demystifies wealth-building, combining practical
                investing strategies with mindset shifts that transform your relationship with money. This book will
                cover everything from stock market fundamentals to real estate, business ventures, and the psychology of
                wealth creation.
              </p>
              <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary/20 to-accent/20 text-foreground font-bold rounded-lg">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                </span>
                BOOK IN PROGRESS
              </div>
            </Card>

            <Card className="p-8 md:p-12 text-center border-2 border-accent/20">
              <Target className="w-16 h-16 text-accent mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Financial <span className="text-accent">Treasure Map</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto">
                An interactive game to help you visualize and achieve your financial goals. Make smart money decisions,
                unlock achievements, and build your wealth journey through gamification. Coming soon!
              </p>
              <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-accent/20 to-primary/20 text-foreground font-bold rounded-lg">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
                </span>
                COMING SOON
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-border py-8">
        <div className="container mx-auto px-4 max-w-6xl text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Zain Adtani. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Investing;
