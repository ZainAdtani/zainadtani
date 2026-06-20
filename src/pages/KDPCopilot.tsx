import { useState } from "react";
import { Helmet } from "react-helmet-async";

const inputClass = "w-full bg-[#0A0F1A] border border-[#1E3A5F] focus:border-[#447BBE] focus:outline-none rounded-[10px] px-4 py-3 text-[16px] text-white placeholder:text-white/50 transition-colors font-sans";
const labelClass = "block text-[13px] font-bold text-[#E9E4A6] mb-1.5 tracking-widest";

export default function KDPCopilot() {
  const [topic, setTopic] = useState("");
  const [audience, setAudience] = useState("");
  const [genre, setGenre] = useState("nonfiction");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState("");

  const generate = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    setResult(null);
    setError("");

    const prompt = `You are a KDP publishing expert. Generate a complete Amazon KDP Launch Kit for the following book.

Book Topic: ${topic}
Target Audience: ${audience || "general readers"}
Genre: ${genre}

Return ONLY valid JSON (no markdown, no backticks, no explanation) in this exact structure:
{
  "titles": [
    {"title": "...", "subtitle": "..."},
    {"title": "...", "subtitle": "..."},
    {"title": "...", "subtitle": "..."},
    {"title": "...", "subtitle": "..."},
    {"title": "...", "subtitle": "..."}
  ],
  "description": "A 200-250 word Amazon book description that starts with a hook and ends with a strong call to action.",
  "keywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5", "keyword6", "keyword7"],
  "categories": [
    {"path": "Books > Category > Subcategory", "reason": "why this fits"},
    {"path": "Books > Category > Subcategory", "reason": "why this fits"},
    {"path": "Books > Category > Subcategory", "reason": "why this fits"},
    {"path": "Books > Category > Subcategory", "reason": "why this fits"},
    {"path": "Books > Category > Subcategory", "reason": "why this fits"},
    {"path": "Books > Category > Subcategory", "reason": "why this fits"},
    {"path": "Books > Category > Subcategory", "reason": "why this fits"}
  ],
  "backCover": "A 100-120 word back cover blurb that hooks the reader emotionally and ends with a call to action.",
  "pricingTip": "A one-sentence pricing recommendation for this book on Amazon."
}`;

    try {
      const endpoint = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/claude-proxy`;
      const anonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${anonKey}`,
          apikey: anonKey,
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-5",
          max_tokens: 2000,
          messages: [{ role: "user", content: prompt }],
        }),
      });
      const data = await response.json();
      console.log("[KDP] proxy status", response.status, "data", data);
      if (!response.ok) {
        const msg = data?.error?.message || data?.error || `HTTP ${response.status}`;
        throw new Error(typeof msg === "string" ? msg : JSON.stringify(msg));
      }
      const text = data.content?.find((b: any) => b.type === "text")?.text || "";
      const clean = text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      setResult(parsed);
    } catch (e: any) {
      console.error("[KDP] generate error", e);
      setError(e?.message || "Something went wrong. Try again.");
    }
    setLoading(false);
  };

  const copyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(""), 2000);
  };

  const buildFullKit = () => {
    if (!result) return "";
    const titles = result.titles?.map((t: any, i: number) => `${i + 1}. ${t.title}: ${t.subtitle}`).join("\n") || "";
    const keywords = result.keywords?.join(", ") || "";
    const categories = result.categories?.map((c: any, i: number) => `${i + 1}. ${c.path}\n   Why: ${c.reason}`).join("\n") || "";
    return `KDP LAUNCH KIT
==================

TITLE OPTIONS
-------------
${titles}

AMAZON DESCRIPTION
------------------
${result.description || ""}

7 KDP KEYWORDS
--------------
${keywords}

AMAZON CATEGORIES
-----------------
${categories}

BACK COVER BLURB
----------------
${result.backCover || ""}

PRICING TIP
-----------
${result.pricingTip || ""}
`;
  };

  const CopyBtn = ({ text, id }: { text: string; id: string }) => (
    <button
      onClick={() => copyText(text, id)}
      className="text-[11px] px-3 py-1 rounded-md border border-[#1E3A5F] transition-all"
      style={{
        background: copied === id ? "#447BBE" : "transparent",
        color: copied === id ? "#fff" : "rgba(255,255,255,0.5)",
      }}
    >
      {copied === id ? "✓ Copied" : "Copy"}
    </button>
  );

  return (
    <div className="min-h-screen bg-[#0A0F1A] text-white pb-20">
      <Helmet>
        <title>KDP Niche Finder | Zain Adtani</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {/* Header */}
      <div className="border-b border-[#1E3A5F] px-6 py-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#DD5013] rounded-lg flex items-center justify-center text-lg">📚</div>
          <div>
            <div className="font-extrabold text-[17px] leading-tight">KDP Niche Finder</div>
            <div className="text-[12px] text-white/50">AI-powered Amazon launch kit generator</div>
          </div>
        </div>
        <a
          href="https://zainadtani.com"
          className="text-[12px] text-white/50 hover:text-white transition-colors whitespace-nowrap"
        >
          ← Back to zainadtani.com
        </a>
      </div>

      <div className="max-w-2xl mx-auto px-4 pt-8">

        {/* Input Card */}
        <div className="bg-[#0E1628] border border-[#1E3A5F] rounded-2xl p-6 mb-8">
          <div className="mb-4">
            <label className={labelClass}>BOOK TOPIC OR IDEA *</label>
            <textarea
              value={topic}
              onChange={e => setTopic(e.target.value)}
              placeholder="e.g. Morning routines for busy parents who want to reduce anxiety and start the day with clarity"
              rows={3}
              className={inputClass}
              style={{ resize: "vertical" }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
            <div>
              <label className={labelClass}>TARGET READER</label>
              <input
                value={audience}
                onChange={e => setAudience(e.target.value)}
                placeholder="e.g. First-time authors, side hustlers"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>GENRE</label>
              <select
                value={genre}
                onChange={e => setGenre(e.target.value)}
                className={inputClass}
              >
                <option value="nonfiction">Non-Fiction</option>
                <option value="selfhelp">Self-Help</option>
                <option value="business">Business</option>
                <option value="fiction">Fiction</option>
                <option value="children">Children's</option>
                <option value="memoir">Memoir</option>
              </select>
            </div>
          </div>

          <button
            onClick={generate}
            disabled={loading || !topic.trim()}
            className="w-full py-4 rounded-xl font-extrabold text-[15px] tracking-wide text-white transition-all"
            style={{
              background: topic.trim() && !loading ? "#DD5013" : "rgba(221,80,19,0.35)",
              cursor: topic.trim() && !loading ? "pointer" : "not-allowed",
            }}
          >
            {loading ? "⚡ Generating your launch kit..." : "🚀 Generate My KDP Launch Kit"}
          </button>
        </div>

        {error && (
          <div className="bg-[#DD5013]/10 border border-[#DD5013] rounded-xl px-4 py-3 mb-6 text-[13px] text-[#DD5013] break-words">
            {error}
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="space-y-5">

            {/* Titles */}
            <div className="bg-[#0E1628] border border-[#447BBE] rounded-2xl p-5">
              <div className="text-[13px] font-bold tracking-[0.2em] text-[#447BBE] mb-4">5 TITLE + SUBTITLE OPTIONS</div>
              {result.titles?.map((t: any, i: number) => (
                <div key={i} className="bg-[#0A0F1A] rounded-lg px-4 py-3 mb-2 flex justify-between items-start gap-3">
                  <div>
                    <div className="font-bold text-[16px]">{t.title}</div>
                    <div className="text-[15px] text-white/60 mt-0.5">{t.subtitle}</div>
                  </div>
                  <CopyBtn text={`${t.title}: ${t.subtitle}`} id={`title-${i}`} />
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="bg-[#0E1628] border border-[#D97706] rounded-2xl p-5">
              <div className="text-[13px] font-bold tracking-[0.2em] text-[#D97706] mb-3">AMAZON BOOK DESCRIPTION</div>
              <p className="text-[16px] text-white/85 mb-3" style={{ lineHeight: 1.8 }}>{result.description}</p>
              <CopyBtn text={result.description} id="desc" />
            </div>

            {/* Keywords */}
            <div className="bg-[#0E1628] border border-[#447BBE] rounded-2xl p-5">
              <div className="text-[13px] font-bold tracking-[0.2em] text-[#447BBE] mb-3">7 KDP KEYWORDS</div>
              <div className="flex flex-wrap gap-2 mb-3">
                {result.keywords?.map((k: string, i: number) => (
                  <span key={i} className="bg-[#0A0F1A] border border-[#1E3A5F] text-[#E9E4A6] text-[14px] px-3 py-1 rounded-lg">{k}</span>
                ))}
              </div>
              <CopyBtn text={result.keywords?.join(", ")} id="keywords" />
            </div>

            {/* Categories */}
            <div className="bg-[#0E1628] border border-[#DD5013] rounded-2xl p-5">
              <div className="text-[13px] font-bold tracking-[0.2em] text-[#DD5013] mb-3">7 AMAZON CATEGORIES</div>
              {result.categories?.map((c: any, i: number) => (
                <div key={i} className="bg-[#0A0F1A] rounded-lg px-4 py-3 mb-2">
                  <div className="font-semibold text-[15px]">{c.path}</div>
                  <div className="text-[14px] text-white/55 mt-0.5">{c.reason}</div>
                </div>
              ))}
            </div>

            {/* Back Cover */}
            <div className="bg-[#0E1628] border border-[#E9E4A6] rounded-2xl p-5">
              <div className="text-[13px] font-bold tracking-[0.2em] text-[#E9E4A6] mb-3">BACK COVER BLURB</div>
              <p className="text-[16px] text-white/85 mb-3" style={{ lineHeight: 1.8 }}>{result.backCover}</p>
              <CopyBtn text={result.backCover} id="blurb" />
            </div>

            {/* Pricing Tip */}
            {result.pricingTip && (
              <div className="bg-[#447BBE]/10 border border-[#447BBE] rounded-xl px-5 py-4 flex gap-3 items-start">
                <span>💡</span>
                <span className="text-[16px] text-[#E9E4A6]">{result.pricingTip}</span>
              </div>
            )}

            {/* Copy Full Launch Kit */}
            <button
              onClick={() => copyText(buildFullKit(), "full-kit")}
              className="w-full py-4 rounded-xl font-extrabold text-[15px] tracking-wide text-white transition-all"
              style={{ background: copied === "full-kit" ? "#447BBE" : "#DD5013" }}
            >
              {copied === "full-kit" ? "✓ Full Launch Kit Copied" : "📋 Copy Full Launch Kit"}
            </button>

          </div>
        )}

        {!result && !loading && (
          <div className="text-center py-16 text-white/20">
            <div className="text-5xl mb-4">📖</div>
            <div className="text-[16px]">Enter your book idea above to get your full KDP launch kit.</div>
          </div>
        )}
      </div>

      <div className="text-center mt-16 text-[11px] text-white/20">
        KDP Niche Finder · Zain Adtani · Adtani Education Ventures LLC
      </div>
    </div>
  );
}
