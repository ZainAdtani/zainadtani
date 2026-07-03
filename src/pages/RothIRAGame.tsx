import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";

const BG = "#0A0F1A";
const BLUE = "#447BBE";
const ORANGE_ACCENT = "#D97706";
const CTA = "#DD5013";
const HAY = "#E9E4A6";

type ETF = {
  ticker: string;
  name: string;
  desc: string;
  job: string;
};

const ETFS: ETF[] = [
  { ticker: "VOO", name: "Vanguard S&P 500 ETF", desc: "Owns the 500 biggest US companies in one fund.", job: "The steady core. The engine room." },
  { ticker: "QQQM", name: "Invesco NASDAQ 100 ETF", desc: "Owns the biggest tech and growth companies.", job: "Growth boost." },
  { ticker: "SPMO", name: "Invesco S&P 500 Momentum ETF", desc: "Automatically buys whatever stocks are moving up the fastest right now.", job: "Ride the hot hand." },
  { ticker: "VGT", name: "Vanguard Information Technology ETF", desc: "Pure tech sector, nothing else.", job: "Double down on tech." },
  { ticker: "VXUS", name: "Vanguard Total International ETF", desc: "Everything outside the US in one fund.", job: "Don't put all your eggs in one country." },
  { ticker: "SCHD", name: "Schwab US Dividend Equity ETF", desc: "Stable companies that pay you cash dividends.", job: "The calm, steady payer." },
  { ticker: "FBTC", name: "Fidelity Wise Origin Bitcoin Fund", desc: "Gives you Bitcoin exposure inside a retirement account.", job: "The moonshot." },
];

type Question = { q: string; correct: string; choices: string[]; why: string };

const QUESTIONS: Question[] = [
  { q: "Which ETF gives you Bitcoin exposure inside a retirement account?", correct: "FBTC", choices: ["FBTC", "VOO", "SCHD", "VGT"], why: "FBTC is the Fidelity Wise Origin Bitcoin Fund. It's the moonshot piece." },
  { q: "Which one is the steady S&P 500 core?", correct: "VOO", choices: ["QQQM", "VOO", "VXUS", "SPMO"], why: "VOO holds the 500 biggest US companies. The engine room." },
  { q: "Which ETF chases the fastest moving stocks?", correct: "SPMO", choices: ["SCHD", "VGT", "SPMO", "VXUS"], why: "SPMO is a momentum fund. It rides whatever is hot right now." },
  { q: "Which one is pure tech sector only?", correct: "VGT", choices: ["QQQM", "VGT", "VOO", "FBTC"], why: "VGT is 100% tech. QQQM is tech-heavy but has other names too." },
  { q: "Which ETF covers everything outside the US?", correct: "VXUS", choices: ["VXUS", "VOO", "SCHD", "SPMO"], why: "VXUS is total international. It keeps your eggs in more than one country." },
  { q: "Which one is known as the calm, steady dividend payer?", correct: "SCHD", choices: ["SCHD", "QQQM", "VGT", "FBTC"], why: "SCHD holds stable US companies that pay regular cash dividends." },
  { q: "Which ETF is meant as a growth boost with big tech and growth names?", correct: "QQQM", choices: ["VOO", "SCHD", "QQQM", "VXUS"], why: "QQQM tracks the NASDAQ 100. Heavy in growth and tech leaders." },
];

type Step = 1 | 2 | 3 | 4;

export default function RothIRAGame() {
  const [step, setStep] = useState<Step>(1);
  const [opened, setOpened] = useState<Set<string>>(new Set());
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);

  const allOpened = opened.size === ETFS.length;

  const currentQ = QUESTIONS[qIndex];
  const progress = useMemo(() => ((qIndex + (answered ? 1 : 0)) / QUESTIONS.length) * 100, [qIndex, answered]);

  const scoreMsg = (s: number) => {
    if (s === 7) return "Perfect. You just leveled up. 🎯";
    if (s >= 5) return "Nice work. You've got the core idea. 💪";
    if (s >= 3) return "Solid start. Skim the cards and you'll nail it next time. 📘";
    return "That's okay. First pass is always the hardest. Try again anytime. 🌱";
  };

  const answer = (choice: string) => {
    if (answered) return;
    setSelected(choice);
    setAnswered(true);
    if (choice === currentQ.correct) setScore((s) => s + 1);
  };

  const next = () => {
    if (qIndex + 1 >= QUESTIONS.length) {
      setStep(4);
      return;
    }
    setQIndex((i) => i + 1);
    setSelected(null);
    setAnswered(false);
  };

  const downloadCheatSheet = () => {
    const doc = new jsPDF({ unit: "pt", format: "letter" });
    const W = doc.internal.pageSize.getWidth();
    const H = doc.internal.pageSize.getHeight();

    // Background
    doc.setFillColor(BG);
    doc.rect(0, 0, W, H, "F");

    // Title
    doc.setTextColor(HAY);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(26);
    doc.text("The Roth IRA Cheat Sheet", W / 2, 70, { align: "center" });

    doc.setTextColor(BLUE);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text("7 ETFs. One tax-free portfolio. Built to hold forever.", W / 2, 92, { align: "center" });

    // Divider
    doc.setDrawColor(ORANGE_ACCENT);
    doc.setLineWidth(1);
    doc.line(60, 110, W - 60, 110);

    let y = 140;
    ETFS.forEach((e, i) => {
      doc.setTextColor(CTA);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.text(`${i + 1}. ${e.ticker}`, 60, y);

      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.text(e.name, 130, y);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(200, 200, 200);
      const descLines = doc.splitTextToSize(e.desc, W - 190);
      doc.text(descLines, 130, y + 14);

      doc.setTextColor(HAY);
      doc.setFont("helvetica", "italic");
      doc.text(`Job: ${e.job}`, 130, y + 14 + descLines.length * 12 + 4);

      y += 14 + descLines.length * 12 + 26;
    });

    // Footer
    doc.setDrawColor(BLUE);
    doc.line(60, H - 90, W - 60, H - 90);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(HAY);
    doc.text("Made by Zain Adtani  ·  zainadtani.com", W / 2, H - 68, { align: "center" });

    doc.setFont("helvetica", "italic");
    doc.setFontSize(9);
    doc.setTextColor(160, 160, 160);
    const disc = "This is for education only. Not financial advice. Always do your own research.";
    doc.text(disc, W / 2, H - 50, { align: "center" });

    doc.save("Roth-IRA-Cheat-Sheet.pdf");
  };

  return (
    <div className="min-h-screen" style={{ background: BG, color: "#FFFFFF" }}>
      <Helmet>
        <title>The Roth IRA Game | Zain Adtani</title>
        <meta name="description" content="A fun 3-minute game that teaches how a Roth IRA works and walks through 7 ETFs. Education only." />
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="max-w-4xl mx-auto px-6 pt-8 pb-16">
        <Link to="/resources" className="text-sm hover:underline" style={{ color: BLUE, fontFamily: "'DM Sans', sans-serif" }}>
          ← Back to Resources
        </Link>

        {/* STEP 1 */}
        {step === 1 && (
          <div className="mt-16 text-center animate-fade-in">
            <h1 className="text-5xl md:text-7xl mb-6" style={{ fontFamily: "'Luckiest Guy', cursive", color: HAY, letterSpacing: "1px" }}>
              The Roth IRA Game
            </h1>
            <p className="text-lg md:text-xl mb-8" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, color: "#FFFFFF" }}>
              Learn how one retirement account can grow tax free forever. Takes 3 minutes.
            </p>
            <p className="max-w-2xl mx-auto text-base md:text-[17px] leading-relaxed mb-10" style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.85)" }}>
              A Roth IRA is a retirement account with a superpower. You put in money you already paid tax on. It grows completely tax free. And when you retire, you never pay tax on it again. Not on the growth. Not on the dividends. Nothing.
            </p>
            <button
              onClick={() => setStep(2)}
              className="rounded-full font-bold transition-transform duration-200 hover:scale-105"
              style={{
                background: `linear-gradient(135deg, ${CTA}, ${ORANGE_ACCENT})`,
                color: "#FFFFFF",
                padding: "16px 36px",
                fontSize: "17px",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                boxShadow: `0 0 24px rgba(221,80,19,0.4)`,
              }}
            >
              Start the Game →
            </button>
            <p className="mt-12 text-xs" style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'DM Sans', sans-serif" }}>
              This is for education only. Not financial advice. Always do your own research.
            </p>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="mt-10 animate-fade-in">
            <h2 className="text-3xl md:text-5xl text-center mb-3" style={{ fontFamily: "'Luckiest Guy', cursive", color: HAY }}>
              Meet the 7 ETFs
            </h2>
            <p className="text-center mb-8" style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.7)" }}>
              Tap each card to flip it. Open all 7 to unlock the quiz.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {ETFS.map((e) => {
                const isOpen = opened.has(e.ticker);
                return (
                  <button
                    key={e.ticker}
                    onClick={() => setOpened((s) => new Set(s).add(e.ticker))}
                    className="text-left rounded-2xl p-5 min-h-[180px] transition-all duration-200 hover:scale-[1.03]"
                    style={{
                      background: isOpen ? "rgba(68,123,190,0.08)" : "rgba(255,255,255,0.03)",
                      border: `1px solid ${isOpen ? BLUE : "rgba(255,255,255,0.1)"}`,
                      boxShadow: isOpen ? `0 0 20px rgba(68,123,190,0.25)` : "none",
                    }}
                  >
                    {!isOpen ? (
                      <div className="h-full flex items-center justify-center">
                        <span className="text-3xl md:text-4xl" style={{ fontFamily: "'Luckiest Guy', cursive", color: HAY }}>
                          {e.ticker}
                        </span>
                      </div>
                    ) : (
                      <div>
                        <div className="text-2xl mb-1" style={{ fontFamily: "'Luckiest Guy', cursive", color: HAY }}>{e.ticker}</div>
                        <div className="text-sm mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, color: "#FFFFFF" }}>{e.name}</div>
                        <div className="text-[13px] leading-relaxed mb-2" style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.8)" }}>{e.desc}</div>
                        <div className="text-[12px]" style={{ color: ORANGE_ACCENT, fontFamily: "'DM Sans', sans-serif" }}>
                          Job: <span style={{ color: HAY }}>{e.job}</span>
                        </div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="mt-10 text-center">
              <button
                disabled={!allOpened}
                onClick={() => setStep(3)}
                className="rounded-full font-bold transition-transform duration-200"
                style={{
                  background: allOpened ? `linear-gradient(135deg, ${CTA}, ${ORANGE_ACCENT})` : "rgba(255,255,255,0.08)",
                  color: allOpened ? "#FFFFFF" : "rgba(255,255,255,0.4)",
                  padding: "14px 30px",
                  fontSize: "16px",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  cursor: allOpened ? "pointer" : "not-allowed",
                  boxShadow: allOpened ? `0 0 24px rgba(221,80,19,0.4)` : "none",
                }}
              >
                {allOpened ? "Got it, quiz me →" : `Open all cards (${opened.size}/7)`}
              </button>
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div className="mt-10 animate-fade-in">
            <div className="mb-6">
              <div className="flex justify-between text-xs mb-2" style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.6)" }}>
                <span>Question {qIndex + 1} of {QUESTIONS.length}</span>
                <span>Score: {score}</span>
              </div>
              <div className="w-full h-2 rounded-full" style={{ background: "rgba(255,255,255,0.08)" }}>
                <div className="h-full rounded-full transition-all duration-300" style={{ width: `${progress}%`, background: `linear-gradient(90deg, ${BLUE}, ${CTA})` }} />
              </div>
            </div>

            <div className="rounded-2xl p-6 md:p-8" style={{ background: "rgba(255,255,255,0.03)", border: `1px solid rgba(68,123,190,0.25)` }}>
              <h3 className="text-xl md:text-2xl mb-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, color: HAY }}>
                {currentQ.q}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {currentQ.choices.map((c) => {
                  const isCorrect = c === currentQ.correct;
                  const isPicked = selected === c;
                  let bg = "rgba(255,255,255,0.05)";
                  let border = "rgba(255,255,255,0.15)";
                  if (answered) {
                    if (isCorrect) { bg = "rgba(68,123,190,0.2)"; border = BLUE; }
                    else if (isPicked) { bg = "rgba(221,80,19,0.15)"; border = CTA; }
                  }
                  return (
                    <button
                      key={c}
                      onClick={() => answer(c)}
                      disabled={answered}
                      className="rounded-xl p-4 text-left font-bold transition-all duration-150 hover:scale-[1.02] disabled:hover:scale-100"
                      style={{
                        background: bg,
                        border: `1px solid ${border}`,
                        color: "#FFFFFF",
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                      }}
                    >
                      {c}
                    </button>
                  );
                })}
              </div>

              {answered && (
                <div className="mt-6 rounded-xl p-4" style={{ background: "rgba(233,228,166,0.06)", border: `1px solid rgba(233,228,166,0.2)` }}>
                  <div className="text-sm font-bold mb-1" style={{ color: selected === currentQ.correct ? BLUE : CTA, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {selected === currentQ.correct ? "✓ Correct" : `✗ The answer was ${currentQ.correct}`}
                  </div>
                  <div className="text-sm" style={{ color: "rgba(255,255,255,0.85)", fontFamily: "'DM Sans', sans-serif" }}>
                    {currentQ.why}
                  </div>
                  <button
                    onClick={next}
                    className="mt-4 rounded-full font-bold transition-transform duration-200 hover:scale-105"
                    style={{
                      background: `linear-gradient(135deg, ${CTA}, ${ORANGE_ACCENT})`,
                      color: "#FFFFFF",
                      padding: "10px 24px",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      boxShadow: `0 0 18px rgba(221,80,19,0.35)`,
                    }}
                  >
                    {qIndex + 1 >= QUESTIONS.length ? "See my score →" : "Next question →"}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* STEP 4 */}
        {step === 4 && (
          <div className="mt-16 text-center animate-fade-in">
            <h2 className="text-4xl md:text-6xl mb-4" style={{ fontFamily: "'Luckiest Guy', cursive", color: HAY }}>
              You scored {score} / 7
            </h2>
            <p className="text-lg mb-10" style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.85)" }}>
              {scoreMsg(score)}
            </p>

            <button
              onClick={downloadCheatSheet}
              className="rounded-full font-bold transition-transform duration-200 hover:scale-105"
              style={{
                background: `linear-gradient(135deg, ${CTA}, ${ORANGE_ACCENT})`,
                color: "#FFFFFF",
                padding: "18px 40px",
                fontSize: "18px",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                boxShadow: `0 0 28px rgba(221,80,19,0.5)`,
              }}
            >
              Get Your Free Roth IRA Cheat Sheet
            </button>

            <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-6">
              <Link to="/resources" className="text-sm hover:underline" style={{ color: BLUE, fontFamily: "'DM Sans', sans-serif" }}>
                ← Back to Resources Hub
              </Link>
              <Link to="/connect" className="text-sm hover:underline" style={{ color: HAY, fontFamily: "'DM Sans', sans-serif" }}>
                Want help setting up your own Roth IRA? Let's talk →
              </Link>
            </div>

            <p className="mt-12 text-xs" style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'DM Sans', sans-serif" }}>
              This is for education only. Not financial advice. Always do your own research.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
