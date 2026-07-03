import { Helmet } from "react-helmet-async";
import cheatSheetPdf from "@/assets/label-iq-cheatsheet.pdf.asset.json";

export default function LabelIQ() {


  return (
    <div className="min-h-screen bg-[#0F1D2E] text-[#F1F5F9]">
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
        {/* Heading */}
        <section className="text-center">
          <h1
            className="text-[#E9E4A6] text-[56px] md:text-[88px] leading-none"
            style={{ fontFamily: "'Luckiest Guy', cursive", letterSpacing: "0.04em" }}
          >
            LABEL IQ
          </h1>
          <p className="mt-4 font-sans text-[18px] md:text-[22px] text-[#F1F5F9]/85 max-w-2xl mx-auto">
            Read any food label in 10 seconds. Free one-page cheat sheet.
          </p>
        </section>

        {/* Download CTA */}
        <section className="no-print mt-10 text-center">
          <a
            href={cheatSheetPdf.url}
            download="label-iq-cheatsheet.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-sans font-bold text-white rounded-full transition-transform duration-200 hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #DD5013, #D97706)",
              padding: "16px 32px",
              boxShadow: "0 0 24px rgba(221, 80, 19, 0.45)",
            }}
          >
            ⬇ Download the Free Cheat Sheet
          </a>
          <p className="mt-3 font-sans text-[13px] text-[#94A3B8]">
            One page. No email needed.
          </p>
        </section>


        {/* What's inside */}
        <section className="mt-14 max-w-xl mx-auto">
          <h2
            className="text-center text-[#E9E4A6] text-[28px] md:text-[36px] leading-tight"
            style={{ fontFamily: "'Luckiest Guy', cursive", letterSpacing: "0.02em" }}
          >
            What is inside
          </h2>
          <ul className="mt-6 space-y-3 font-sans text-[16px] md:text-[17px] text-[#F1F5F9]/90">
            <li className="flex items-start gap-3">
              <span className="text-[#DD5013] mt-0.5">•</span>
              <span>The one rule that beats every label</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#DD5013] mt-0.5">•</span>
              <span>The serving size trick brands use on you</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#DD5013] mt-0.5">•</span>
              <span>The 4 villains hiding in your food</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#DD5013] mt-0.5">•</span>
              <span>How to spot junk in 5 seconds</span>
            </li>
          </ul>
        </section>

        {/* Soft close */}
        <section className="mt-16 text-center">
          <p className="font-sans text-[14px] md:text-[15px] text-[#94A3B8] max-w-lg mx-auto leading-relaxed">
            P.S. Reading the fine print on your food is the same habit that protects your family on your finances.{" "}
            <a
              href="https://calendly.com/zkadtani"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#447BBE] hover:text-[#E9E4A6] transition-colors underline underline-offset-2"
            >
              Learn more
            </a>
          </p>
        </section>

        {/* Newsletter footer */}
        <section className="no-print mt-10 text-center">
          <a
            href="https://the-z-letter.beehiiv.com/subscribe"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-[13px] text-[#94A3B8] hover:text-[#E9E4A6] transition-colors"
          >
            Like this? Get The Z Letter
          </a>
        </section>
      </main>
    </div>
  );
}
