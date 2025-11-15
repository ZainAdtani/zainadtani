import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Target, PiggyBank, BookOpen, LineChart } from "lucide-react";

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
                <p>Investing is about building financial freedom and creating opportunities for you and your family.</p>
                <p>
                  I use a balanced approach that mixes long term wealth building with calculated risks, focused on
                  learning and discipline.
                </p>
                <p>Stocks, real estate, and businesses all matter. Fundamentals and consistency win.</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <Card className="p-6 text-center hover-lift transition-all duration-300">
                <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-bold text-2xl mb-2">Long Term</h3>
                <p className="text-muted-foreground">Sustainable growth</p>
              </Card>

              <Card className="p-6 text-center hover-lift transition-all duration-300">
                <Target className="w-12 h-12 text-accent mx-auto mb-4" />
                <h3 className="font-bold text-2xl mb-2">Strategic</h3>
                <p className="text-muted-foreground">Data driven</p>
              </Card>

              <Card className="p-6 text-center hover-lift transition-all duration-300">
                <PiggyBank className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-bold text-2xl mb-2">Diversified</h3>
                <p className="text-muted-foreground">Manage risk</p>
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
                High yield savings for emergencies and short term goals.
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
                Primary brokerage for stocks, ETFs, and retirement with strong research tools.
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
                Commission free trading for stocks, ETFs, options, and crypto with a simple app.
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
                <p>Options offer leverage, flexibility, and protection.</p>
                <p>Use them to hedge, generate income, or express a view.</p>
                <p>This course breaks down calls, puts, spreads, and real strategies.</p>
              </div>
            </div>

            <Card className="p-8 hover-lift transition-all duration-300 border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-accent/5">
              <LineChart className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-4">Complete Options Course</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                From beginner to advanced. Clear lessons and examples.
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

      {/* === Portfolio Breakdown (updated) === */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-background via-accent/5 to-secondary/10">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-4">
            My <span className="text-primary">Portfolio Breakdown</span>
          </h2>
          <p className="text-center text-muted-foreground mb-12">
            Live list from my notes, not financial advice. I will update positions as I go.
          </p>

          {(() => {
            const FAVORITES = new Set(["VOO", "SCHD", "QQQM", "BTC"]);

            const INDIVIDUAL = [
              { ticker: "SCHD", name: "Schwab U.S. Dividend Equity ETF" },
              { ticker: "NVDA", name: "NVIDIA" },
              { ticker: "QQQM", name: "Invesco NASDAQ-100 ETF" },
              { ticker: "VOO", name: "Vanguard S&P 500 ETF" },
              { ticker: "SOFI", name: "SoFi Technologies" },
              { ticker: "GOOGL", name: "Alphabet" },
              { ticker: "AAPL", name: "Apple" },
              { ticker: "PLTR", name: "Palantir Technologies" },
              { ticker: "GLD", name: "SPDR Gold Shares" },
              { ticker: "SGOV", name: "iShares 0 to 3 Month T-Bill ETF" },
              { ticker: "AMZN", name: "Amazon.com" },
              { ticker: "VNQ", name: "Vanguard REIT ETF" },
              { ticker: "AVUV", name: "Avantis U.S. Small Cap Value ETF" },
              { ticker: "SHY", name: "iShares 1 to 3 Year Treasury ETF" },
              { ticker: "AIQ", name: "Global X Artificial Intelligence & Tech ETF" },
              { ticker: "BRK.B", name: "Berkshire Hathaway Class B" },
              { ticker: "HOOD", name: "Robinhood Markets" },
              { ticker: "TSLA", name: "Tesla" },
              { ticker: "MSFT", name: "Microsoft" },
              { ticker: "APLD", name: "Applied Digital" },
              { ticker: "BBAI", name: "BigBear.ai" },
              { ticker: "ENTO", name: "Entero Therapeutics" },
              { ticker: "WULF", name: "TeraWulf" },
              { ticker: "MEME", name: "Roundhill MEME ETF" },
              { ticker: "PATH", name: "UiPath" },
              { ticker: "MSTR", name: "MicroStrategy" },
              { ticker: "IWM", name: "iShares Russell 2000 ETF" },
              { ticker: "VYMI", name: "Vanguard Intl High Dividend ETF" },
              { ticker: "TTD", name: "The Trade Desk" },
              { ticker: "BTC", name: "Bitcoin" },
              { ticker: "RGTI", name: "Rigetti Computing" },
              { ticker: "SCHG", name: "Schwab U.S. Large Cap Growth ETF" },
              { ticker: "CRWV", name: "" },
              { ticker: "TEM", name: "Tempus AI" },
              { ticker: "BABA", name: "Alibaba Group" },
              { ticker: "UNH", name: "UnitedHealth Group" },
              { ticker: "QUBT", name: "Quantum Computing, Inc." },
            ];

            const ROTH_IRA = [
              { ticker: "JEPI", name: "JPM Equity Premium" },
              { ticker: "JEPQ", name: "JPM Nasdaq Premium" },
              { ticker: "VOO", name: "Vanguard S&P 500" },
              { ticker: "VXUS", name: "Vanguard Total Intl" },
              { ticker: "BND", name: "Vanguard Total Bond" },
              { ticker: "VNQ", name: "Vanguard REIT" },
              { ticker: "FBTC", name: "Fidelity Bitcoin ETF" },
            ];

            const sortByFavorites = (items: { ticker: string; name?: string }[]) =>
              [...items].sort((a, b) => {
                const aFav = FAVORITES.has(a.ticker) ? 0 : 1;
                const bFav = FAVORITES.has(b.ticker) ? 0 : 1;
                if (aFav !== bFav) return aFav - bFav;
                return a.ticker.localeCompare(b.ticker);
              });

            const INDIVIDUAL_SORTED = sortByFavorites(INDIVIDUAL);
            const ROTH_SORTED = sortByFavorites(ROTH_IRA);

            const Card3D = ({ p }: { p: { ticker: string; name?: string } }) => (
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
                    <h4 className="text-2xl font-extrabold tracking-tight">
                      {p.ticker}
                      {FAVORITES.has(p.ticker) ? <span className="ml-2 text-primary">★</span> : null}
                    </h4>
                  </div>
                  {p.name ? <p className="text-sm text-muted-foreground mt-1">{p.name}</p> : null}
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
                    <span className="text-xs text-muted-foreground">{INDIVIDUAL_SORTED.length} positions</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {INDIVIDUAL_SORTED.map((p) => (
                      <Card3D key={p.ticker} p={p} />
                    ))}
                  </div>
                </div>

                {/* Roth IRA */}
                <div>
                  <div className="flex items-baseline justify-between gap-4 mb-6">
                    <h3 className="text-3xl font-bold">
                      Roth IRA <span className="text-primary">Holdings</span>
                    </h3>
                    <span className="text-xs text-muted-foreground">{ROTH_SORTED.length} positions</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {ROTH_SORTED.map((p) => (
                      <Card3D key={p.ticker} p={p} />
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
                I am writing a practical guide to wealth building that blends strategy and mindset across stocks, real
                estate, business, and money psychology.
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
                An interactive game to plan and track goals with smart money choices. Coming soon.
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
