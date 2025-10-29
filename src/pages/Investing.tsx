const Investing = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-background via-accent/5 to-secondary/10">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-4xl font-bold text-center mb-3">
          My <span className="text-primary">Portfolio Breakdown</span>
        </h2>
        <p className="text-center text-muted-foreground mb-10">Live list from my notes — not financial advice.</p>

        {(() => {
          type Item = {
            t: string; // ticker
            name: string;
            kind: "Stock" | "ETF" | "Crypto" | "CEF";
            note: string; // 1-line "what it is / what it does"
          };

          type Group = { title: string; items: Item[] };

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

      {/* Investment Areas */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12">
            Where I <span className="text-primary">Invest</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 hover-lift transition-all duration-300 border-2">
              <DollarSign className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-4">Stock Market</h3>
              <p className="text-muted-foreground leading-relaxed">
                Index funds, dividend stocks, and growth opportunities. Building a diversified portfolio for long-term
                wealth creation.
              </p>
            </Card>

            <Card className="p-8 hover-lift transition-all duration-300 border-2">
              <LineChart className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-2xl font-bold mb-4">Business Ventures</h3>
              <p className="text-muted-foreground leading-relaxed">
                Creating and investing in businesses that solve real problems. From digital products to service-based
                companies.
              </p>
            </Card>

            <Card className="p-8 hover-lift transition-all duration-300 border-2">
              <TrendingUp className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-4">Real Estate</h3>
              <p className="text-muted-foreground leading-relaxed">
                Property investments for passive income and long-term appreciation. Building a real estate portfolio
                strategically.
              </p>
            </Card>
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
                Commission-free trading platform for stocks, ETFs, options, and crypto with an intuitive mobile experience.
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
      
          // ------- DATA (edit freely) -------
          const GROUPS: Group[] = [
            {
              title: "Core Index / Broad Market",
              items: [
                { t: "VOO", name: "Vanguard S&P 500", kind: "ETF", note: "Low-cost S&P 500 exposure (core equity)." },
                { t: "QQQM", name: "Nasdaq-100", kind: "ETF", note: "Mega-cap tech tilt via Nasdaq-100." },
                { t: "IWM", name: "iShares Russell 2000", kind: "ETF", note: "U.S. small-cap equity basket." },
                { t: "SCHG", name: "Schwab U.S. Growth", kind: "ETF", note: "Broad U.S. large-cap growth." },
                { t: "AVUV", name: "Avantis U.S. Small Value", kind: "ETF", note: "Factor tilt toward small-cap value." },
              ],
            },
            {
              title: "Income / Cash Alternatives",
              items: [
                { t: "SCHD", name: "Schwab U.S. Dividend", kind: "ETF", note: "Dividend-focused U.S. equities (income)." },
                { t: "VYMI", name: "Intl High Dividend", kind: "ETF", note: "International dividend stocks." },
                { t: "SGOV", name: "iShares 0–3M T-Bills", kind: "ETF", note: "Ultra-short Treasuries; cash parking." },
                { t: "BIL", name: "SPDR 1–3M T-Bill", kind: "ETF", note: "Short-term Treasuries; cash-like." },
                { t: "SHY", name: "iShares 1–3Y Treasury", kind: "ETF", note: "Short-duration U.S. Treasuries." },
                { t: "TEM", name: "Templeton EM (CEF)", kind: "CEF", note: "Emerging-market exposure via CEF." },
              ],
            },
            {
              title: "Real Assets & REITs",
              items: [
                { t: "GLD", name: "SPDR Gold Trust", kind: "ETF", note: "Gold exposure (hedge/inflation)." },
                { t: "VNQ", name: "Vanguard REIT", kind: "ETF", note: "U.S. real estate investment trusts." },
              ],
            },
            {
              title: "Mega-Cap Tech",
              items: [
                { t: "MSFT", name: "Microsoft", kind: "Stock", note: "Cloud + AI platform leader." },
                { t: "AAPL", name: "Apple", kind: "Stock", note: "Hardware + services ecosystem." },
                { t: "GOOGL", name: "Alphabet", kind: "Stock", note: "Search/ads, cloud, AI." },
                { t: "AMZN", name: "Amazon", kind: "Stock", note: "E-commerce + AWS cloud." },
                { t: "NVDA", name: "NVIDIA", kind: "Stock", note: "AI GPUs / data-center driver." },
                { t: "TSLA", name: "Tesla", kind: "Stock", note: "EV + energy + autonomy platform." },
                { t: "BRK.B", name: "Berkshire", kind: "Stock", note: "Diversified conglomerate (core)." },
              ],
            },
            {
              title: "AI / Software / Cyber",
              items: [
                { t: "PLTR", name: "Palantir", kind: "Stock", note: "AI-driven data platforms." },
                { t: "CRWD", name: "CrowdStrike", kind: "Stock", note: "Endpoint cybersecurity (SaaS)." },
                { t: "PATH", name: "UiPath", kind: "Stock", note: "Automation / RPA software." },
                { t: "TTD", name: "Trade Desk", kind: "Stock", note: "Adtech DSP; programmatic ads." },
                { t: "AIQ", name: "Global X AI", kind: "ETF", note: "Basket of AI-related equities." },
              ],
            },
            {
              title: "Fintech / Brokers",
              items: [
                { t: "SOFI", name: "SoFi", kind: "Stock", note: "Digital bank + lending platform." },
                { t: "HOOD", name: "Robinhood", kind: "Stock", note: "Retail brokerage & crypto access." },
              ],
            },
            {
              title: "International / EM",
              items: [
                { t: "BABA", name: "Alibaba", kind: "Stock", note: "China e-commerce & cloud." },
                // VXUS appears in IRA below
              ],
            },
            {
              title: "Crypto & Proxies",
              items: [
                { t: "BTC", name: "Bitcoin", kind: "Crypto", note: "Digital store of value / crypto base layer." },
                { t: "ETH", name: "Ethereum", kind: "Crypto", note: "Smart contracts / L1 platform." },
                { t: "XRP", name: "XRP", kind: "Crypto", note: "Payments/settlement token." },
                { t: "DOGE", name: "Dogecoin", kind: "Crypto", note: "Meme-origin L1; high volatility." },
                { t: "TRUMP", name: "TRUMP token", kind: "Crypto", note: "Speculative memecoin." },
                { t: "MSTR", name: "MicroStrategy", kind: "Stock", note: "BTC proxy via corporate holdings." },
                {
                  t: "FBTC",
                  name: "Fidelity Bitcoin ETF",
                  kind: "ETF",
                  note: "Spot BTC exposure (IRA below if held there).",
                },
              ],
            },
            {
              title: "Speculative / Small Caps",
              items: [
                { t: "APLD", name: "Applied Digital", kind: "Stock", note: "Data-centers / HPC (AI/crypto adjacent)." },
                { t: "BBAI", name: "BigBear.ai", kind: "Stock", note: "AI analytics (small-cap)." },
                { t: "WULF", name: "TeraWulf", kind: "Stock", note: "Bitcoin mining." },
                { t: "RGTI", name: "Rigetti", kind: "Stock", note: "Quantum computing (early-stage)." },
                { t: "QUBT", name: "Quantum Computing", kind: "Stock", note: "Quantum software (speculative)." },
                { t: "MEME", name: "Roundhill MEME", kind: "ETF", note: "Meme-exposed equities basket." },
                { t: "ENTO", name: "Entero", kind: "Stock", note: "Small-cap; higher risk/vol." },
              ],
            },
          ];

          const IRA: Group[] = [
            {
              title: "Roth IRA Holdings",
              items: [
                { t: "JEPI", name: "JPM Equity Premium", kind: "ETF", note: "Covered-call income on U.S. equities." },
                { t: "JEPQ", name: "JPM Nasdaq Premium", kind: "ETF", note: "Covered-call income on Nasdaq-100." },
                { t: "VOO", name: "Vanguard S&P 500", kind: "ETF", note: "Core index exposure (IRA)." },
                { t: "VXUS", name: "Vanguard Total Intl", kind: "ETF", note: "Developed + emerging ex-US." },
                { t: "BND", name: "Vanguard Total Bond", kind: "ETF", note: "Broad U.S. investment-grade bonds." },
                { t: "VNQ", name: "Vanguard REIT", kind: "ETF", note: "U.S. REITs (IRA)." },
                { t: "FBTC", name: "Fidelity Bitcoin ETF", kind: "ETF", note: "Spot BTC exposure (IRA)." },
              ],
            },
          ];
          // ------- /DATA -------

          const KindPill = ({ kind }: { kind: Item["kind"] }) => {
            const styles =
              kind === "ETF"
                ? "bg-blue-500/10 text-blue-400 border-blue-500/30"
                : kind === "Crypto"
                  ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/30"
                  : kind === "CEF"
                    ? "bg-purple-500/10 text-purple-400 border-purple-500/30"
                    : "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
            return (
              <span className={`text-[10px] uppercase tracking-wider px-2 py-1 rounded-full border ${styles}`}>{kind}</span>
            );
          };

          const Row = ({ it }: { it: Item }) => (
            <div className="flex items-start justify-between gap-4 py-3 border-b border-border/50 last:border-0">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-base">{it.t}</span>
                  <KindPill kind={it.kind} />
                </div>
                <div className="text-xs text-muted-foreground">{it.name}</div>
                <div className="text-sm mt-1">{it.note}</div>
              </div>
              {/* optional: link out (comment if you don't want) */}
              {/* <a className="text-xs text-primary mt-1" href={`https://finance.yahoo.com/quote/${it.t}`} target="_blank" rel="noreferrer">Quote ↗</a> */}
            </div>
          );

          const GroupCard = ({ g }: { g: Group }) => (
            <div className="rounded-2xl border-2 bg-background/70 backdrop-blur-sm p-5 shadow-lg">
              <h4 className="text-xl font-extrabold tracking-tight mb-3">{g.title}</h4>
              <div>
                {g.items.map((it) => (
                  <Row key={`${g.title}-${it.t}`} it={it} />
                ))}
              </div>
            </div>
          );

          return (
            <>
              {/* Brokerages landing (top) */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-center mb-4">Brokerage Shortcuts</h3>
                <p className="text-center text-muted-foreground mb-6">Jump straight to your accounts.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
                  <div className="rounded-2xl border-2 p-5 bg-background/70">
                    <h4 className="font-semibold mb-2">Fidelity</h4>
                    <p className="text-sm text-muted-foreground mb-3">Core IRA + index exposure</p>
                    <a href="https://www.fidelity.com/" target="_blank" rel="noreferrer"
                       className="inline-flex items-center justify-center rounded-md px-4 py-2 bg-primary text-primary-foreground hover:opacity-90">
                      Open Fidelity →
                    </a>
                  </div>
                  <div className="rounded-2xl border-2 p-5 bg-background/70">
                    <h4 className="font-semibold mb-2">Robinhood</h4>
                    <p className="text-sm text-muted-foreground mb-3">Active ideas + crypto access</p>
                    <a href="https://robinhood.com/" target="_blank" rel="noreferrer"
                       className="inline-flex items-center justify-center rounded-md px-4 py-2 bg-primary text-primary-foreground hover:opacity-90">
                      Open Robinhood →
                    </a>
                  </div>
                  <div className="rounded-2xl border-2 p-5 bg-background/70">
                    <h4 className="font-semibold mb-2">Schwab</h4>
                    <p className="text-sm text-muted-foreground mb-3">Additional diversification</p>
                    <a href="https://www.schwab.com/" target="_blank" rel="noreferrer"
                       className="inline-flex items-center justify-center rounded-md px-4 py-2 bg-primary text-primary-foreground hover:opacity-90">
                      Open Schwab →
                    </a>
                  </div>
                </div>
              </div>

              {/* Main groups */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                {GROUPS.map((g) => (
                  <GroupCard key={g.title} g={g} />
                ))}
              </div>

              {/* IRA */}
              <div className="grid grid-cols-1 gap-6">
                {IRA.map((g) => (
                  <GroupCard key={g.title} g={g} />
                ))}
              </div>
            </>
          );
        })()}
      </div>
    </section>
  );
};

export default Investing;
