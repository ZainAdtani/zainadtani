import { useState } from "react";

type Holding = { ticker: string; name: string; thesis: string };

const TABS: { key: string; label: string; subtitle: string; holdings: Holding[]; footer: string }[] = [
  {
    key: "robinhood",
    label: "Robinhood",
    subtitle: "Individual Account — DCA + Thesis",
    holdings: [
      { ticker: "NVDA", name: "Nvidia", thesis: "The engine room of the AI revolution." },
      { ticker: "GOOGL", name: "Google", thesis: "AI, cloud, search. Too many moats to ignore." },
      { ticker: "AAPL", name: "Apple", thesis: "Ecosystem lock-in. Everyone's in it." },
      { ticker: "AMZN", name: "Amazon", thesis: "Cloud, retail, logistics. Compounding quietly." },
      { ticker: "PLTR", name: "Palantir", thesis: "Government AI and data infrastructure play." },
      { ticker: "AVUV", name: "Avantis US Small Cap Value", thesis: "Small cap value factor. Long-term outperformance bet." },
      { ticker: "GLD", name: "SPDR Gold ETF", thesis: "Inflation hedge. Portfolio ballast." },
    ],
    footer: "Also hold: VOO, QQQM, SCHD, SOFI, WQTM, MP Materials",
  },
  {
    key: "roth",
    label: "Roth IRA",
    subtitle: "Auto-buy weekly, set and forget",
    holdings: [
      { ticker: "VOO", name: "Vanguard S&P 500", thesis: "$10/week. The whole US market. Set it and forget it." },
      { ticker: "VXUS", name: "Vanguard Total International", thesis: "$5/week. Global diversification outside the US." },
      { ticker: "FBTC", name: "Fidelity Bitcoin ETF", thesis: "$5/week. Small crypto allocation, regulated." },
      { ticker: "PHO", name: "Water Resources ETF", thesis: "$5/week. Infrastructure and water. Long thesis." },
      { ticker: "VNQ", name: "Vanguard Real Estate ETF", thesis: "$5/week. Real estate exposure without owning property." },
    ],
    footer: "All buys are automatic weekly. Total ~$30/week into Roth IRA.",
  },
  {
    key: "fidelity",
    label: "Fidelity",
    subtitle: "Long-term hold, untouched",
    holdings: [
      { ticker: "VOO", name: "Vanguard S&P 500", thesis: "Core long-term hold. The boring backbone." },
      { ticker: "SCHD", name: "Schwab Dividend ETF", thesis: "Dividend growth. Gets paid while I sleep." },
      { ticker: "QQQM", name: "Invesco Nasdaq", thesis: "Tech heavy. Long on the future of innovation." },
    ],
    footer: "This account is a hold account. No active trades. Just DCA and wait.",
  },
  {
    key: "vanguard",
    label: "Vanguard",
    subtitle: "Opened May 2026, hold",
    holdings: [
      { ticker: "VGT", name: "Vanguard Info Technology ETF", thesis: "Pure tech sector. High conviction long hold." },
      { ticker: "VUG", name: "Vanguard Growth ETF", thesis: "Large-cap growth. Complements value holdings." },
      { ticker: "VIS", name: "Vanguard Industrials ETF", thesis: "Industrials and defense. Physical world infrastructure." },
    ],
    footer: "New account opened May 2026. Buy and hold for 10 years minimum.",
  },
];

export function InvestingStack() {
  const [active, setActive] = useState("robinhood");
  const current = TABS.find((t) => t.key === active)!;

  return (
    <section id="investing" className="py-20 bg-[#0A0F1A]">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-10">
          <p className="font-sans text-[12px] font-medium tracking-widest uppercase text-[#447BBE]">
            WHAT I ACTUALLY DO WITH MONEY
          </p>
          <h2
            className="text-[#F1F5F9] text-4xl md:text-5xl mt-3"
            style={{ fontFamily: '"Luckiest Guy", cursive' }}
          >
            My Personal Investing Stack.
          </h2>
          <p className="font-sans text-[15px] mt-4 max-w-2xl mx-auto" style={{ color: "#E9E4A6" }}>
            Not financial advice. Just what I personally hold and why. Do your own research.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {TABS.map((t) => {
            const isActive = t.key === active;
            return (
              <button
                key={t.key}
                type="button"
                onClick={() => setActive(t.key)}
                className="px-5 py-2.5 rounded-full font-sans font-semibold text-[14px] transition-all duration-200 min-h-[44px]"
                style={
                  isActive
                    ? { background: "#FFFFFF", color: "#0A0F1A", border: "1px solid #FFFFFF" }
                    : { background: "transparent", color: "#FFFFFF", border: "1px solid rgba(255,255,255,0.5)" }
                }
              >
                {t.label}
              </button>
            );
          })}
        </div>

        <p className="text-center font-sans text-[13px] text-white/60 mb-6">
          {current.subtitle}
        </p>

        {/* Holdings grid */}
        <div key={current.key} className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in">
          {current.holdings.map((h) => (
            <div
              key={h.ticker}
              className="rounded-[8px] p-[14px] transition-all duration-200"
              style={{
                background: "#0E1628",
                border: "1px solid rgba(68,123,190,0.4)",
                borderLeft: "3px solid #447BBE",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#447BBE";
                e.currentTarget.style.borderLeftColor = "#447BBE";
                e.currentTarget.style.boxShadow = "0 0 14px rgba(68,123,190,0.25)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(68,123,190,0.4)";
                e.currentTarget.style.borderLeftColor = "#447BBE";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div className="font-sans font-bold text-[15px]">
                <span style={{ color: "#E9E4A6" }}>{h.ticker}</span>
                <span className="text-white font-medium"> · {h.name}</span>
              </div>
              <p className="font-sans text-[13px] text-[#94a3b8] mt-1">{h.thesis}</p>
            </div>
          ))}
        </div>

        <p className="text-center font-sans text-[12px] text-white/50 mt-6">
          {current.footer}
        </p>

        {/* Philosophy box */}
        <div
          className="mt-10 rounded-[12px] p-4 max-w-3xl mx-auto"
          style={{ background: "#0E1628", borderLeft: "4px solid #447BBE", border: "1px solid #1a2a45", borderLeftWidth: "4px", borderLeftColor: "#447BBE" }}
        >
          <p className="font-sans text-[11px] font-semibold tracking-widest uppercase text-[#DD5013]">
            Z's Philosophy
          </p>
          <p className="font-sans text-[14px] text-white mt-2 leading-relaxed">
            The strategy: boring ETFs for the base, individual stocks for the thesis. DCA weekly regardless of what the market does. Time beats timing every time.
          </p>
        </div>

        {/* Start investing row */}
        <div className="pt-8 pb-4 text-center">
          <p
            className="font-sans text-[10px] uppercase tracking-[1.5px] mb-4"
            style={{ color: "#6b7a99" }}
          >
            Want to start? Here's where I actually invest.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="https://join.robinhood.com/zaina113"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-[18px] py-2 font-sans text-[12px] text-white no-underline transition-all duration-200 hover:border-[#447BBE]"
              style={{
                background: "#0E1628",
                border: "1px solid #1a2a45",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 0 12px rgba(68,123,190,0.25)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <span>↗</span>
              Start on Robinhood
            </a>
            <a
              href="https://fidelity.app.link/e/99W3Yr8vJ3b"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-[18px] py-2 font-sans text-[12px] text-white no-underline transition-all duration-200 hover:border-[#447BBE]"
              style={{
                background: "#0E1628",
                border: "1px solid #1a2a45",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 0 12px rgba(68,123,190,0.25)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <span>↗</span>
              Start on Fidelity
            </a>
            <a
              href="https://investor.vanguard.com/investor-resources-education/article/open-an-account"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-[18px] py-2 font-sans text-[12px] text-white no-underline transition-all duration-200 hover:border-[#447BBE]"
              style={{
                background: "#0E1628",
                border: "1px solid #1a2a45",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 0 12px rgba(68,123,190,0.25)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <span>↗</span>
              Start on Vanguard
            </a>
          </div>

          <p
            className="font-sans text-[10px] mt-4"
            style={{ color: "#6b7a99" }}
          >
            These are affiliate or referral links. I use all three. Never invest more than you can afford to lose.
          </p>
        </div>

        <p className="text-center font-sans text-[12px] text-[#6B7280] mt-10 max-w-2xl mx-auto">
          This is not financial advice. These are my personal holdings for educational purposes only.
        </p>
      </div>
    </section>
  );
}
