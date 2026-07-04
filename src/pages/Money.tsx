import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Copy, Check } from "lucide-react";

const PROMPT = `You are an AI business assistant for [Business Name], a [type of business] in [city]. Your job is to help the owner answer customer questions, summarize emails, draft responses, and save time on admin tasks. Always be professional, friendly, and brief. Never make up information. If you don't know something, say so.`;

export default function Money() {
  const [copied, setCopied] = useState(false);

  const cardStyle = {
    background: "linear-gradient(180deg, #0F1626 0%, #0A0F1A 100%)",
    border: "1px solid #1a2a45",
    boxShadow: "0 0 24px rgba(68,123,190,0.12), 0 12px 40px rgba(0,0,0,0.4)",
  } as const;

  const btnStyle = {
    background: "#447BBE",
    color: "#0A0F1A",
  } as const;

  return (
    <div className="min-h-screen bg-[#0A0F1A] py-20 px-6">
      <Helmet>
        <title>The Money Page · Zain Adtani</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      <div className="max-w-[700px] mx-auto">
        <div className="text-center">
          <p className="font-sans text-[12px] font-medium tracking-widest uppercase text-[#DD5013]">
            YOU FOUND IT
          </p>
          <h1
            className="mt-3 text-[#E9E4A6] text-[48px] md:text-[64px] leading-[1.05]"
            style={{ fontFamily: '"Luckiest Guy", cursive' }}
          >
            The Money Page.
          </h1>
          <p className="font-sans text-[16px] text-white/80 mt-4 max-w-[560px] mx-auto">
            This page is for people who actually want to understand how money works. No ads. No pitch. Just the stuff nobody teaches you.
          </p>
        </div>

        <div className="mt-12 space-y-6">
          {/* Card 1 */}
          <div className="rounded-2xl p-7" style={cardStyle}>
            <h2 className="font-display font-extrabold text-[22px] md:text-[26px] text-white">
              The 4 Situations That Break Families
            </h2>
            <p className="font-sans text-[15px] text-white/75 mt-3">
              Dying too soon. Living too long. Getting sick without dying. Having no will or trust. Most families have zero plan for any of these. Here's what each one means and what to do about it.
            </p>
            <a
              href="https://calendly.com/zkadtani"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 rounded-md font-sans font-semibold text-[14px] mt-5 transition-all duration-200 hover:scale-[1.02] active:scale-[0.97]"
              style={btnStyle}
            >
              Book a Free Education Session →
            </a>
          </div>

          {/* Card 2 */}
          <div className="rounded-2xl p-7" style={cardStyle}>
            <h2 className="font-display font-extrabold text-[22px] md:text-[26px] text-white">
              My Actual Investing Stack
            </h2>
            <p className="font-sans text-[15px] text-white/75 mt-3">
              I hold ETFs in Fidelity, Vanguard, and a Roth IRA. I DCA weekly and don't touch it. I also hold individual stocks for specific theses. Nothing here is financial advice. This is just what I personally do.
            </p>
            <Link
              to="/#investing"
              className="inline-flex items-center justify-center px-6 py-3 rounded-md font-sans font-semibold text-[14px] mt-5 transition-all duration-200 hover:scale-[1.02] active:scale-[0.97]"
              style={btnStyle}
            >
              See My Full Stack →
            </Link>
          </div>

          {/* Card 3 */}
          <div className="rounded-2xl p-7" style={cardStyle}>
            <h2 className="font-display font-extrabold text-[22px] md:text-[26px] text-white">
              The AI Prompt I Use Every Day
            </h2>
            <p className="font-sans text-[15px] text-white/75 mt-3">
              This is the single prompt I use to save 2 to 3 hours a week running my business with AI. Copy it, swap in your business name, and use it in any AI tool.
            </p>
            <div
              className="mt-5 rounded-[10px] p-4 relative"
              style={{ background: "#070B14", border: "1px solid #1a2a45" }}
            >
              <pre className="font-mono text-[12.5px] text-[#E9E4A6] whitespace-pre-wrap leading-relaxed">
{PROMPT}
              </pre>
              <button
                type="button"
                onClick={async () => {
                  await navigator.clipboard.writeText(PROMPT);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[12px] font-semibold transition-colors"
                style={{ background: "#447BBE", color: "#0A0F1A" }}
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </div>
        </div>

        <p className="text-center font-sans text-[11px] text-white/40 mt-14">
          Found this page? Share it with someone who needs it. — Z
        </p>
      </div>
    </div>
  );
}
