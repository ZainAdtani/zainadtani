import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { TrendingUp, Target, PiggyBank, BookOpen, LineChart, ArrowRight, Clock, Layers, GraduationCap } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import "@/styles/investing-ftw.css";

const Investing = () => {
  const [ftwMode, setFtwMode] = useState(true);

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
    { ticker: "BRK.B", name: "Berkshire Hathaway Class B" },
    { ticker: "TSLA", name: "Tesla" },
    { ticker: "MSFT", name: "Microsoft" },
    { ticker: "BTC", name: "Bitcoin" },
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

  // ── FTW Mode ──────────────────────────────────────────────
  if (ftwMode) {
    return (
      <div className="investing-ftw min-h-screen">
        {/* Header */}
        <div className="ftw-page-header">
          <div className="container mx-auto px-4 max-w-4xl">
            <p className="ftw-section-meta">Personal Finance</p>
            <h1>Investing</h1>
            <p>Simple steps to grow your money over time</p>
          </div>
        </div>

        {/* Philosophy */}
        <section className="ftw-section">
          <div className="container mx-auto px-4 max-w-4xl">
            <p className="ftw-section-meta">Philosophy</p>
            <h2 className="ftw-section-title">My Investment Philosophy</h2>

            <div className="grid md:grid-cols-2 gap-8 items-start">
              <div className="ftw-callout">
                <ul className="space-y-3 text-lg" style={{ color: "hsl(var(--ftw-fg-muted))" }}>
                  <li className="flex items-start gap-2">
                    <span style={{ color: "hsl(var(--ftw-accent))" }} className="mt-1">•</span>
                    <span>I focus on simple steps.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: "hsl(var(--ftw-accent))" }} className="mt-1">•</span>
                    <span>I try to avoid risky surprises.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: "hsl(var(--ftw-accent))" }} className="mt-1">•</span>
                    <span>I build habits that last.</span>
                  </li>
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Clock, emoji: "🕰️", title: "Long Term", desc: "Hold for years. Less stress." },
                  { icon: Target, emoji: "🎯", title: "Simple Plan", desc: "Pick a plan. Stick to it." },
                  { icon: Layers, emoji: "🧩", title: "Spread Risk", desc: "Do not bet on one thing." },
                  { icon: GraduationCap, emoji: "📚", title: "Keep Learning", desc: "Learn a little each week." },
                ].map((item) => (
                  <div key={item.title} className="ftw-pill-card">
                    <item.icon className="w-8 h-8 mx-auto ftw-pill-icon" />
                    <h3>{item.emoji} {item.title}</h3>
                    <p>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tips */}
            <div className="mt-10">
              <p className="ftw-section-meta">Guidance</p>
              <h3 className="ftw-section-title text-xl">Simple Tips</h3>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="tip-1">
                  <AccordionTrigger className="text-left">🟢 Start small</AccordionTrigger>
                  <AccordionContent style={{ color: "hsl(var(--ftw-fg-muted))" }}>
                    You do not need a lot of money to start. Even $10 a week adds up over time. Consistency wins.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="tip-2">
                  <AccordionTrigger className="text-left">💰 Save first, then invest</AccordionTrigger>
                  <AccordionContent style={{ color: "hsl(var(--ftw-fg-muted))" }}>
                    Build an emergency fund before putting money in the market. This keeps you calm when prices drop.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="tip-3">
                  <AccordionTrigger className="text-left">🤔 Avoid stuff you do not understand</AccordionTrigger>
                  <AccordionContent style={{ color: "hsl(var(--ftw-fg-muted))" }}>
                    If you cannot explain it simply, skip it. Stick to things you understand well.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="tip-4">
                  <AccordionTrigger className="text-left">✂️ Fees matter. Keep them low.</AccordionTrigger>
                  <AccordionContent style={{ color: "hsl(var(--ftw-fg-muted))" }}>
                    High fees eat into your returns over time. Look for low-cost index funds and ETFs.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="tip-5">
                  <AccordionTrigger className="text-left">🌱 Zoom out. Think long term.</AccordionTrigger>
                  <AccordionContent style={{ color: "hsl(var(--ftw-fg-muted))" }}>
                    Markets go up and down. Do not panic. Look at the 10-year chart, not the daily one.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        {/* Banking & Brokerage */}
        <section className="ftw-section" style={{ background: "hsl(var(--ftw-bg-alt))" }}>
          <div className="container mx-auto px-4 max-w-4xl">
            <p className="ftw-section-meta">Accounts</p>
            <h2 className="ftw-section-title text-center">My Banking & Brokerage</h2>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: "Marcus", logo: "https://logo.clearbit.com/marcus.com", FallbackIcon: PiggyBank, desc: "High yield savings for emergencies and short term goals.", href: "https://www.marcus.com/share/ZAI-3SI-69TP", cta: "Open Account" },
                { name: "Fidelity", logo: "https://logo.clearbit.com/fidelity.com", FallbackIcon: LineChart, desc: "Main brokerage for stocks, ETFs, and retirement.", href: "https://fidelity.app.link/e/wKOQHcrcRVb", cta: "Open Account" },
                { name: "Robinhood", logo: "https://logo.clearbit.com/robinhood.com", FallbackIcon: TrendingUp, desc: "Commission free trading for stocks, ETFs, and crypto.", href: "https://join.robinhood.com/zaina113", cta: "Join" },
              ].map((b) => (
                <div key={b.name} className="ftw-card ftw-operator-card">
                  <div className="h-10 flex items-center">
                    <img
                      src={b.logo}
                      alt={b.name}
                      className="h-7 object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        e.currentTarget.nextElementSibling?.classList.remove("hidden");
                      }}
                    />
                    <b.FallbackIcon className="w-7 h-7 hidden" style={{ color: "hsl(var(--ftw-accent))" }} />
                  </div>
                  <h3 className="ftw-card-title">{b.name}</h3>
                  <p className="ftw-card-desc flex-grow">{b.desc}</p>
                  <a href={b.href} target="_blank" rel="noopener noreferrer" className="ftw-btn mt-2 justify-center">
                    {b.cta} <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Private Dashboard */}
        <section className="ftw-section">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="ftw-card max-w-xl mx-auto text-center">
              <p className="ftw-section-meta">Dashboard</p>
              <h2 className="ftw-section-title">Private Finance Dashboard</h2>
              <p className="ftw-card-desc mb-6">Log in to see your money picture in one place.</p>
              <a href="https://zadtani.com/login" target="_blank" rel="noopener noreferrer" className="ftw-btn ftw-btn-primary">
                Log in to dashboard <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

        {/* Options Trading */}
        <section className="ftw-section" style={{ background: "hsl(var(--ftw-bg-alt))" }}>
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="ftw-section-meta">Education</p>
                <h2 className="ftw-section-title">Master Options Trading</h2>
                <div className="space-y-3" style={{ color: "hsl(var(--ftw-fg-muted))" }}>
                  <p>Options offer leverage, flexibility, and protection.</p>
                  <p>Use them to hedge, generate income, or express a view.</p>
                  <p>This course breaks down calls, puts, spreads, and real strategies.</p>
                </div>
              </div>

              <div className="ftw-card ftw-resource-card">
                <LineChart className="w-8 h-8 mb-4" style={{ color: "hsl(var(--ftw-accent))" }} />
                <h3 className="ftw-card-title">Complete Options Course</h3>
                <p className="ftw-card-desc mb-4">From beginner to advanced. Clear lessons and examples.</p>
                <a
                  href="https://www.udemy.com/course/the-completecomplete-options-course-calls-puts-long-short/?couponCode=MT251006G3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ftw-btn ftw-btn-primary w-full justify-center"
                >
                  Get the Course <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio */}
        <section className="ftw-section">
          <div className="container mx-auto px-4 max-w-4xl">
            <p className="ftw-section-meta text-center">Portfolio</p>
            <h2 className="ftw-section-title text-center">My Portfolio Breakdown</h2>
            <p className="text-center mb-8" style={{ color: "hsl(var(--ftw-fg-muted))" }}>
              Live list from my notes, not financial advice.
            </p>

            {/* Individual */}
            <div className="mb-10">
              <div className="flex items-baseline justify-between gap-4 mb-4">
                <h3 className="ftw-section-title text-xl">Individual Stocks & ETFs</h3>
                <span className="ftw-label" style={{ color: "hsl(var(--ftw-fg-muted))", fontSize: "0.75rem" }}>{INDIVIDUAL_SORTED.length} positions</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {INDIVIDUAL_SORTED.map((p) => (
                  <div key={p.ticker} className="ftw-ticker-card">
                    <div className="flex items-center justify-between">
                      <span className="ftw-ticker-symbol">{p.ticker}</span>
                      {FAVORITES.has(p.ticker) && <span className="ftw-star">★</span>}
                    </div>
                    {p.name && <p className="ftw-ticker-name mt-1 truncate">{p.name}</p>}
                  </div>
                ))}
              </div>
            </div>

            {/* Roth IRA */}
            <div>
              <div className="flex items-baseline justify-between gap-4 mb-4">
                <h3 className="ftw-section-title text-xl">Roth IRA Holdings</h3>
                <span className="ftw-label" style={{ color: "hsl(var(--ftw-fg-muted))", fontSize: "0.75rem" }}>{ROTH_SORTED.length} positions</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {ROTH_SORTED.map((p) => (
                  <div key={p.ticker} className="ftw-ticker-card">
                    <div className="flex items-center justify-between">
                      <span className="ftw-ticker-symbol">{p.ticker}</span>
                      {FAVORITES.has(p.ticker) && <span className="ftw-star">★</span>}
                    </div>
                    {p.name && <p className="ftw-ticker-name mt-1 truncate">{p.name}</p>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Books & Map */}
        <section className="ftw-section" style={{ background: "hsl(var(--ftw-bg-alt))" }}>
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="ftw-card text-center">
                <BookOpen className="w-10 h-10 mx-auto mb-4" style={{ color: "hsl(var(--ftw-accent))" }} />
                <h2 className="ftw-card-title mb-3">The School of Financial Sorcery</h2>
                <p className="ftw-card-desc mb-4">A practical guide to wealth building that blends strategy and mindset.</p>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm" style={{ background: "hsl(var(--ftw-bg))", color: "hsl(var(--ftw-accent))", fontFamily: "var(--ftw-ui)", fontWeight: 600, letterSpacing: "0.04em" }}>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: "hsl(var(--ftw-accent))" }}></span>
                    <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: "hsl(var(--ftw-accent))" }}></span>
                  </span>
                  Book in progress
                </div>
              </div>

              <div className="ftw-card text-center">
                <Target className="w-10 h-10 mx-auto mb-4" style={{ color: "hsl(var(--ftw-accent))" }} />
                <h2 className="ftw-card-title mb-3">Financial Treasure Map</h2>
                <p className="ftw-card-desc mb-4">An interactive game to plan and track goals.</p>
                <a href="/financial-treasure-map" className="ftw-btn ftw-btn-primary">
                  Enter the map <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8" style={{ borderTop: "1px solid hsl(var(--ftw-border))" }}>
          <div className="container mx-auto px-4 max-w-4xl text-center text-sm" style={{ color: "hsl(var(--ftw-fg-muted))", fontFamily: "var(--ftw-ui)" }}>
            © {new Date().getFullYear()} Zain Education Ventures. Not financial advice.
          </div>
        </footer>

        {/* Style Toggle */}
        <div className="ftw-toggle-bar">
          <span>FTW Style</span>
          <Switch checked={ftwMode} onCheckedChange={setFtwMode} />
        </div>
      </div>
    );
  }

  // ── Original Mode ─────────────────────────────────────────
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Investing</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Simple steps to grow your money over time
          </p>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-12 md:py-16 bg-green-50/50 dark:bg-green-950/10">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div>
              <h2 className="text-3xl font-bold mb-6">My Investment Philosophy</h2>
              <ul className="space-y-3 text-lg text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span>I focus on simple steps.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span>I try to avoid risky surprises.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span>I build habits that last.</span>
                </li>
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card className="p-5 text-center hover-lift transition-all duration-300 rounded-xl">
                <Clock className="w-10 h-10 text-green-600 mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-1">🕰️ Long Term</h3>
                <p className="text-sm text-muted-foreground">Hold for years. Less stress.</p>
              </Card>
              <Card className="p-5 text-center hover-lift transition-all duration-300 rounded-xl">
                <Target className="w-10 h-10 text-green-600 mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-1">🎯 Simple Plan</h3>
                <p className="text-sm text-muted-foreground">Pick a plan. Stick to it.</p>
              </Card>
              <Card className="p-5 text-center hover-lift transition-all duration-300 rounded-xl">
                <Layers className="w-10 h-10 text-green-600 mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-1">🧩 Spread Risk</h3>
                <p className="text-sm text-muted-foreground">Do not bet on one thing.</p>
              </Card>
              <Card className="p-5 text-center hover-lift transition-all duration-300 rounded-xl">
                <GraduationCap className="w-10 h-10 text-green-600 mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-1">📚 Keep Learning</h3>
                <p className="text-sm text-muted-foreground">Learn a little each week.</p>
              </Card>
            </div>
          </div>

          {/* Simple Tips Accordion */}
          <div className="mt-10">
            <h3 className="text-xl font-bold mb-4">Simple Tips</h3>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="tip-1">
                <AccordionTrigger className="text-left">🟢 Start small</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  You do not need a lot of money to start. Even $10 a week adds up over time. Consistency wins.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="tip-2">
                <AccordionTrigger className="text-left">💰 Save first, then invest</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Build an emergency fund before putting money in the market. This keeps you calm when prices drop.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="tip-3">
                <AccordionTrigger className="text-left">🤔 Avoid stuff you do not understand</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  If you cannot explain it simply, skip it. Stick to things you understand well.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="tip-4">
                <AccordionTrigger className="text-left">✂️ Fees matter. Keep them low.</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  High fees eat into your returns over time. Look for low-cost index funds and ETFs.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="tip-5">
                <AccordionTrigger className="text-left">🌱 Zoom out. Think long term.</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Markets go up and down. Do not panic. Look at the 10-year chart, not the daily one.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Banking & Brokerage Section */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-8">My Banking & Brokerage</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 hover-lift transition-all duration-300 rounded-xl flex flex-col">
              <div className="h-12 mb-4 flex items-center">
                <img src="https://logo.clearbit.com/marcus.com" alt="Marcus by Goldman Sachs" className="h-8 object-contain" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling?.classList.remove('hidden'); }} />
                <PiggyBank className="w-8 h-8 text-primary hidden" />
              </div>
              <h3 className="text-xl font-bold mb-2">Marcus</h3>
              <p className="text-sm text-muted-foreground mb-4 flex-grow">High yield savings for emergencies and short term goals.</p>
              <Button asChild variant="outline" className="w-full group">
                <a href="https://www.marcus.com/share/ZAI-3SI-69TP" target="_blank" rel="noopener noreferrer">Open Account <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" /></a>
              </Button>
            </Card>
            <Card className="p-6 hover-lift transition-all duration-300 rounded-xl flex flex-col">
              <div className="h-12 mb-4 flex items-center">
                <img src="https://logo.clearbit.com/fidelity.com" alt="Fidelity" className="h-8 object-contain" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling?.classList.remove('hidden'); }} />
                <LineChart className="w-8 h-8 text-green-600 hidden" />
              </div>
              <h3 className="text-xl font-bold mb-2">Fidelity</h3>
              <p className="text-sm text-muted-foreground mb-4 flex-grow">Main brokerage for stocks, ETFs, and retirement.</p>
              <Button asChild variant="outline" className="w-full group">
                <a href="https://fidelity.app.link/e/wKOQHcrcRVb" target="_blank" rel="noopener noreferrer">Open Account <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" /></a>
              </Button>
            </Card>
            <Card className="p-6 hover-lift transition-all duration-300 rounded-xl flex flex-col">
              <div className="h-12 mb-4 flex items-center">
                <img src="https://logo.clearbit.com/robinhood.com" alt="Robinhood" className="h-8 object-contain" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling?.classList.remove('hidden'); }} />
                <TrendingUp className="w-8 h-8 text-green-500 hidden" />
              </div>
              <h3 className="text-xl font-bold mb-2">Robinhood</h3>
              <p className="text-sm text-muted-foreground mb-4 flex-grow">Commission free trading for stocks, ETFs, and crypto.</p>
              <Button asChild variant="outline" className="w-full group">
                <a href="https://join.robinhood.com/zaina113" target="_blank" rel="noopener noreferrer">Join <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" /></a>
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Private Finance Dashboard */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="p-8 hover-lift transition-all duration-300 rounded-xl max-w-xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-3">Private Finance Dashboard</h2>
            <p className="text-muted-foreground mb-6">Log in to see your money picture in one place.</p>
            <Button asChild className="group">
              <a href="https://zadtani.com/login" target="_blank" rel="noopener noreferrer">Log in to dashboard <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" /></a>
            </Button>
          </Card>
        </div>
      </section>

      {/* Options Trading Section */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Master Options Trading</h2>
              <div className="space-y-3 text-muted-foreground">
                <p>Options offer leverage, flexibility, and protection.</p>
                <p>Use them to hedge, generate income, or express a view.</p>
                <p>This course breaks down calls, puts, spreads, and real strategies.</p>
              </div>
            </div>
            <Card className="p-6 hover-lift transition-all duration-300 rounded-xl bg-gradient-to-br from-green-50 to-background dark:from-green-950/20">
              <LineChart className="w-10 h-10 text-green-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">Complete Options Course</h3>
              <p className="text-sm text-muted-foreground mb-4">From beginner to advanced. Clear lessons and examples.</p>
              <Button asChild className="w-full group">
                <a href="https://www.udemy.com/course/the-completecomplete-options-course-calls-puts-long-short/?couponCode=MT251006G3" target="_blank" rel="noopener noreferrer">Get the Course <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" /></a>
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Portfolio Breakdown */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-2">My Portfolio Breakdown</h2>
          <p className="text-center text-muted-foreground mb-8">Live list from my notes, not financial advice.</p>

          <div className="mb-10">
            <div className="flex items-baseline justify-between gap-4 mb-4">
              <h3 className="text-2xl font-bold">Individual Stocks & ETFs</h3>
              <span className="text-xs text-muted-foreground">{INDIVIDUAL_SORTED.length} positions</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {INDIVIDUAL_SORTED.map((p) => (
                <Card key={p.ticker} className="p-4 hover:shadow-md transition-shadow rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-lg">{p.ticker}</span>
                    {FAVORITES.has(p.ticker) && <span className="text-green-500">★</span>}
                  </div>
                  {p.name && <p className="text-xs text-muted-foreground mt-1 truncate">{p.name}</p>}
                </Card>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-baseline justify-between gap-4 mb-4">
              <h3 className="text-2xl font-bold">Roth IRA Holdings</h3>
              <span className="text-xs text-muted-foreground">{ROTH_SORTED.length} positions</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {ROTH_SORTED.map((p) => (
                <Card key={p.ticker} className="p-4 hover:shadow-md transition-shadow rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-lg">{p.ticker}</span>
                    {FAVORITES.has(p.ticker) && <span className="text-green-500">★</span>}
                  </div>
                  {p.name && <p className="text-xs text-muted-foreground mt-1 truncate">{p.name}</p>}
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Books in Progress */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 text-center rounded-xl">
              <BookOpen className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-3">The School of Financial Sorcery</h2>
              <p className="text-sm text-muted-foreground mb-4">A practical guide to wealth building that blends strategy and mindset.</p>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 font-medium rounded-lg text-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Book in progress
              </div>
            </Card>
            <Card className="p-6 text-center rounded-xl">
              <Target className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-3">Financial Treasure Map</h2>
              <p className="text-sm text-muted-foreground mb-4">An interactive game to plan and track goals.</p>
              <Button asChild className="group">
                <a href="/financial-treasure-map">Enter the map <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" /></a>
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-border py-8">
        <div className="container mx-auto px-4 max-w-4xl text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Zain Education Ventures. Not financial advice.
        </div>
      </footer>

      {/* Style Toggle */}
      <div className="investing-toggle-bar">
        <span>FTW Style</span>
        <Switch checked={ftwMode} onCheckedChange={setFtwMode} />
      </div>
    </div>
  );
};

export default Investing;
