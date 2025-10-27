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
