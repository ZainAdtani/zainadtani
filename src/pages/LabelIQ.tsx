import { Helmet } from "react-helmet-async";

const villains = [
  {
    title: "Hidden Sugars",
    color: "#DD5013",
    items: "High-fructose corn syrup, corn syrup, dextrose, maltose, agave, juice concentrate, brown rice syrup.",
  },
  {
    title: "Hidden Starches",
    color: "#D97706",
    items: "Modified corn starch, maltodextrin, dextrin, tapioca flour, potato flour.",
  },
  {
    title: "Seed Oils",
    color: "#447BBE",
    items: "Canola, soybean, corn, cottonseed, sunflower, safflower oil, margarine, hydrogenated oils.",
  },
  {
    title: "Fake Proteins",
    color: "#E9E4A6",
    items: "Soy protein isolate, textured vegetable protein, sodium caseinate, milk protein isolate.",
  },
];

export default function LabelIQ() {
  const handlePrint = () => window.print();

  return (
    <div className="min-h-screen bg-[#0A0F1A] text-[#F1F5F9]">
      <Helmet>
        <title>Label IQ: Read Any Food Label in 10 Seconds</title>
        <meta
          name="description"
          content="Food brands hide junk behind fancy words. Learn the one rule, the serving size trick, and the 4 villains. Free cheat sheet from Zain Adtani."
        />
        <link rel="canonical" href="https://zainadtani.com/label-iq" />
        <meta property="og:title" content="Label IQ: Read Any Food Label in 10 Seconds" />
        <meta
          property="og:description"
          content="The one rule, the serving size trick, and the 4 villains hiding in your pantry."
        />
        <meta property="og:url" content="https://zainadtani.com/label-iq" />
      </Helmet>

      <style>{`
        @media print {
          header, footer, nav, .no-print { display: none !important; }
          html, body { background: #ffffff !important; color: #000000 !important; }
          .label-iq-page, .label-iq-page * {
            background: #ffffff !important;
            color: #000000 !important;
            box-shadow: none !important;
            border-color: #000000 !important;
          }
          .label-iq-page section { page-break-inside: avoid; }
          .label-iq-page h1, .label-iq-page h2, .label-iq-page h3 { color: #000 !important; }
        }
      `}</style>

      <main className="label-iq-page max-w-4xl mx-auto px-6 py-16 md:py-20">
        {/* Hero */}
        <section className="text-center">
          <h1
            className="text-[#E9E4A6] text-[56px] md:text-[88px] leading-none"
            style={{ fontFamily: "'Luckiest Guy', cursive", letterSpacing: "0.04em" }}
          >
            LABEL IQ
          </h1>
          <p className="mt-4 font-sans text-[18px] md:text-[22px] text-[#F1F5F9]/85 max-w-2xl mx-auto">
            Read any food label like a pro in 10 seconds.
          </p>
        </section>

        {/* Callout band */}
        <section className="mt-12">
          <div
            className="rounded-2xl px-6 py-6 md:px-10 md:py-8 border-2 text-center"
            style={{ borderColor: "#DD5013", background: "rgba(221,80,19,0.08)" }}
          >
            <p className="font-sans text-[16px] md:text-[20px] leading-relaxed">
              <span className="font-bold text-[#E9E4A6]">The one rule:</span>{" "}
              skip the numbers, read the ingredients. The Nutrition Facts box can be gamed.
              The ingredients list cannot.
            </p>
          </div>
        </section>

        {/* Two cards */}
        <section className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-[#1E3A5F] bg-[#0F2340] p-6 md:p-8">
            <h3 className="text-[#E9E4A6] text-[22px] md:text-[24px] font-extrabold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Spot junk in 5 seconds
            </h3>
            <ol className="mt-4 space-y-3 font-sans text-[15px] md:text-[16px] text-[#F1F5F9]/90 list-decimal pl-5">
              <li>A long list of words you can't pronounce is a red flag.</li>
              <li>Ingredients are ranked by amount. If sugar, starch, or oil is near the top, the food is mostly that.</li>
              <li>Ignore buzzwords like "natural," "heart-healthy," and "plant-based." They are not regulated.</li>
            </ol>
          </div>

          <div className="rounded-2xl border border-[#1E3A5F] bg-[#0F2340] p-6 md:p-8">
            <h3 className="text-[#E9E4A6] text-[22px] md:text-[24px] font-extrabold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              The serving size trick
            </h3>
            <p className="mt-4 font-sans text-[15px] md:text-[16px] text-[#F1F5F9]/90 leading-relaxed">
              Brands shrink the serving so numbers look small. A cereal box says 36g. Nobody eats 36g —
              you eat double. So every number on the label is secretly doubled.
              <span className="block mt-3 font-bold text-[#DD5013]">Always do the math.</span>
            </p>
          </div>
        </section>

        {/* Villains */}
        <section className="mt-16">
          <h2
            className="text-center text-[#E9E4A6] text-[40px] md:text-[56px] leading-none"
            style={{ fontFamily: "'Luckiest Guy', cursive", letterSpacing: "0.04em" }}
          >
            THE 4 VILLAINS
          </h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {villains.map((v) => (
              <div
                key={v.title}
                className="rounded-2xl border border-[#1E3A5F] bg-[#0F2340] overflow-hidden"
              >
                <div className="h-2" style={{ background: v.color }} />
                <div className="p-6">
                  <h3
                    className="text-[20px] md:text-[22px] font-extrabold"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: v.color }}
                  >
                    {v.title}
                  </h3>
                  <p className="mt-3 font-sans text-[15px] text-[#F1F5F9]/85 leading-relaxed">
                    {v.items}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Soft close */}
        <section className="mt-16">
          <div
            className="rounded-2xl px-6 py-7 md:px-10 md:py-9 border"
            style={{ borderColor: "#447BBE", background: "rgba(68,123,190,0.08)" }}
          >
            <p className="font-sans text-[16px] md:text-[18px] leading-relaxed text-[#F1F5F9]/95">
              <span className="font-bold text-[#E9E4A6]">Protect your body. Protect your family.</span>{" "}
              Reading the fine print on a food label is the same habit that protects your family on a
              bigger label — your finances. Most families are not protected. They just don't know it yet.
            </p>
          </div>
        </section>

        {/* Download */}
        <section className="no-print mt-12 text-center">
          <button
            onClick={handlePrint}
            className="font-sans font-bold text-white rounded-full transition-transform duration-200 hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #DD5013, #D97706)",
              padding: "16px 32px",
              boxShadow: "0 0 24px rgba(221, 80, 19, 0.45)",
            }}
          >
            ⬇ Download / Save as PDF
          </button>
          <p className="mt-3 font-sans text-[12px] text-[#94A3B8]">
            Opens your browser's print dialog — choose "Save as PDF".
          </p>
        </section>

        {/* CTA Row */}
        <section className="no-print mt-12 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="https://calendly.com/zkadtani"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto text-center font-sans font-semibold rounded-full px-6 py-3 border-2 transition-colors"
            style={{ borderColor: "#DD5013", color: "#E9E4A6" }}
          >
            Book a free chat
          </a>
          <a
            href="https://the-z-letter.beehiiv.com/subscribe"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto text-center font-sans font-semibold rounded-full px-6 py-3 border-2 transition-colors"
            style={{ borderColor: "#447BBE", color: "#E9E4A6" }}
          >
            Get The Z Letter
          </a>
          <a
            href="/"
            className="w-full sm:w-auto text-center font-sans font-semibold rounded-full px-6 py-3 border-2 transition-colors"
            style={{ borderColor: "#E9E4A6", color: "#E9E4A6" }}
          >
            Visit zainadtani.com
          </a>
        </section>
      </main>
    </div>
  );
}
