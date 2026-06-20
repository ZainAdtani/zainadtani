import { useState, FormEvent } from "react";
import { Helmet } from "react-helmet-async";

const WHATSAPP_URL = "https://wa.me/19725551234";
const CALENDLY_URL = "https://calendly.com/zkadtani";

type OppForm = { name: string; phone: string; email: string; describe: string };
type ProtForm = { name: string; phone: string; email: string; concern: string };

const inputClass =
  "w-full bg-[#0E1628] border border-[#1E3A5F] focus:border-[#447BBE] focus:outline-none rounded-[10px] px-4 py-3.5 text-[15px] text-white placeholder:text-white/40 font-sans transition-colors";

const labelClass = "block text-[13px] font-semibold text-white/90 mb-1.5 font-sans";

const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

const Connect = () => {
  const [opp, setOpp] = useState<OppForm>({ name: "", phone: "", email: "", describe: "" });
  const [oppSent, setOppSent] = useState(false);
  const [oppError, setOppError] = useState("");

  const [prot, setProt] = useState<ProtForm>({ name: "", phone: "", email: "", concern: "" });
  const [protSent, setProtSent] = useState(false);
  const [protError, setProtError] = useState("");

  const submitOpp = (e: FormEvent) => {
    e.preventDefault();
    if (!opp.name || !opp.phone || !opp.email || !opp.describe) {
      setOppError("Please fill in all fields.");
      return;
    }
    setOppError("");
    setOppSent(true);
    setOpp({ name: "", phone: "", email: "", describe: "" });
  };

  const submitProt = (e: FormEvent) => {
    e.preventDefault();
    if (!prot.name || !prot.phone || !prot.email || !prot.concern) {
      setProtError("Please fill in all fields.");
      return;
    }
    setProtError("");
    setProtSent(true);
    setProt({ name: "", phone: "", email: "", concern: "" });
  };

  return (
    <div className="min-h-screen bg-[#0A0F1A] text-white">
      <Helmet>
        <title>Connect with Zain Adtani | Income Opportunity & Family Protection</title>
        <meta
          name="description"
          content="Talk to Zain about an HGI second income opportunity or about protecting your family with life insurance, wills, and trusts."
        />
      </Helmet>

      {/* HERO */}
      <section className="container mx-auto px-4 pt-20 pb-16 max-w-5xl">
        <h1
          className="font-display text-[56px] md:text-[88px] leading-[0.95] text-white text-center"
          style={{ textShadow: "0 2px 20px rgba(255,255,255,0.08)" }}
        >
          Let's Talk.
        </h1>
        <p className="mt-6 font-sans text-[17px] md:text-[19px] text-white/80 text-center max-w-2xl mx-auto" style={{ lineHeight: 1.75 }}>
          Whether you're looking for a second income or want to protect what your family has built — you're in the right place. Pick what fits you.
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-5">
          <button
            type="button"
            onClick={() => scrollTo("opportunity")}
            className="text-left bg-[#0E1628] border-2 border-[#447BBE] rounded-[16px] p-7 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(68,123,190,0.25)] transition-all duration-300"
          >
            <div className="text-[12px] tracking-[0.18em] font-semibold text-[#447BBE] mb-3">OPTION 1</div>
            <h3 className="font-display-sans font-extrabold text-[24px] text-white mb-2">
              I Want a Second Income
            </h3>
            <p className="font-sans text-[15px] text-white/70 leading-relaxed">
              Learn how to build a licensed financial services business part-time. No experience required.
            </p>
          </button>

          <button
            type="button"
            onClick={() => scrollTo("protection")}
            className="text-left bg-[#0E1628] border-2 border-[#DD5013] rounded-[16px] p-7 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(221,80,19,0.25)] transition-all duration-300"
          >
            <div className="text-[12px] tracking-[0.18em] font-semibold text-[#DD5013] mb-3">OPTION 2</div>
            <h3 className="font-display-sans font-extrabold text-[24px] text-white mb-2">
              I Want to Protect My Family
            </h3>
            <p className="font-sans text-[15px] text-white/70 leading-relaxed">
              Life insurance, wills, and trusts. Simple education, no pressure.
            </p>
          </button>
        </div>
      </section>

      <div className="max-w-4xl mx-auto border-t border-white/10" />

      {/* OPPORTUNITY */}
      <section id="opportunity" className="container mx-auto px-4 py-20 max-w-4xl scroll-mt-24">
        <div className="text-[12px] tracking-[0.22em] font-semibold text-[#447BBE] mb-4">INCOME OPPORTUNITY</div>
        <h2
          className="font-display text-[40px] md:text-[56px] leading-[1] text-white"
          style={{ letterSpacing: "-0.5px", textShadow: "0 2px 16px rgba(0,0,0,0.35)" }}
        >
          Build something of your own. On your terms.
        </h2>
        <p className="mt-6 font-sans text-[17px] text-white/80 max-w-2xl" style={{ lineHeight: 1.75 }}>
          I'm a licensed financial services agent with HGI. I help people from all backgrounds start a part-time business helping families protect themselves financially. No sales background needed. Mentor-led. Legit.
        </p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { t: "Part-time start", d: "Keep your current job while you build" },
            { t: "Licensed & legit", d: "State-licensed financial services" },
            { t: "Mentor-led", d: "You are not doing this alone" },
          ].map((b) => (
            <div key={b.t} className="bg-[#0E1628] border border-[#447BBE]/40 rounded-[12px] p-5">
              <div className="font-display-sans font-extrabold text-[17px] text-[#E9E4A6] mb-1">{b.t}</div>
              <div className="font-sans text-[14px] text-white/70 leading-snug">{b.d}</div>
            </div>
          ))}
        </div>

        {/* FORM */}
        <div className="mt-12 bg-[#0E1628] border border-[#1E3A5F] rounded-[16px] p-6 md:p-8">
          {oppSent ? (
            <div className="py-8 text-center">
              <div className="font-display-sans font-extrabold text-[22px] text-[#E9E4A6] mb-2">Got it.</div>
              <p className="font-sans text-[16px] text-white/85">
                I'll reach out personally within 24 hours. — Zain
              </p>
            </div>
          ) : (
            <form onSubmit={submitOpp} className="grid gap-4">
              <div>
                <label className={labelClass}>Full Name</label>
                <input className={inputClass} value={opp.name} onChange={(e) => setOpp({ ...opp, name: e.target.value })} placeholder="Your name" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Phone Number</label>
                  <input className={inputClass} value={opp.phone} onChange={(e) => setOpp({ ...opp, phone: e.target.value })} placeholder="(555) 555-5555" />
                </div>
                <div>
                  <label className={labelClass}>Email Address</label>
                  <input type="email" className={inputClass} value={opp.email} onChange={(e) => setOpp({ ...opp, email: e.target.value })} placeholder="you@email.com" />
                </div>
              </div>
              <div>
                <label className={labelClass}>What best describes you?</label>
                <select className={inputClass} value={opp.describe} onChange={(e) => setOpp({ ...opp, describe: e.target.value })}>
                  <option value="">Choose one...</option>
                  <option>I want more income</option>
                  <option>I'm curious about financial services</option>
                  <option>I want to learn more first</option>
                  <option>I know someone who might be interested</option>
                </select>
              </div>
              {oppError && <div className="text-[14px] text-[#DD5013] font-sans">{oppError}</div>}
              <button
                type="submit"
                className="mt-2 bg-[#DD5013] text-white font-display-sans font-extrabold text-[15px] tracking-wide px-6 py-4 rounded-[10px] hover:opacity-90 active:scale-[0.98] transition-all"
              >
                I'm Interested — Reach Out to Me
              </button>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-center font-sans font-semibold text-[14px] text-white border border-[#447BBE] px-5 py-3 rounded-[10px] hover:bg-[#447BBE]/10 transition-colors"
                >
                  💬 Text Me on WhatsApp
                </a>
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-center font-sans font-semibold text-[14px] text-white border border-[#447BBE] px-5 py-3 rounded-[10px] hover:bg-[#447BBE]/10 transition-colors"
                >
                  📅 Book a Call Instead
                </a>
              </div>
            </form>
          )}
        </div>
      </section>

      <div className="max-w-4xl mx-auto border-t border-white/10" />

      {/* PROTECTION */}
      <section id="protection" className="container mx-auto px-4 py-20 max-w-4xl scroll-mt-24">
        <div className="text-[12px] tracking-[0.22em] font-semibold text-[#DD5013] mb-4">FAMILY PROTECTION</div>
        <h2 className="font-display text-[40px] md:text-[56px] leading-[1] text-white">
          Is your family covered if life gets hard?
        </h2>
        <p className="mt-6 font-sans text-[16px] md:text-[17px] text-white/80 leading-relaxed max-w-2xl">
          Most families are one unexpected moment from financial chaos. A simple plan — term life insurance, a will, and a trust — can change everything. I walk you through it, no jargon, no pressure.
        </p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { t: "Term Life Insurance", d: "Income replacement if something happens to you" },
            { t: "Wills & Trusts", d: "Make sure your wishes are honored" },
            { t: "Critical Illness Coverage", d: "Protection while you're still alive" },
          ].map((b) => (
            <div key={b.t} className="bg-[#0E1628] border border-[#DD5013]/40 rounded-[12px] p-5">
              <div className="font-display-sans font-extrabold text-[17px] text-[#E9E4A6] mb-1">{b.t}</div>
              <div className="font-sans text-[14px] text-white/70 leading-snug">{b.d}</div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-[#0E1628] border border-[#1E3A5F] rounded-[16px] p-6 md:p-8">
          {protSent ? (
            <div className="py-8 text-center">
              <div className="font-display-sans font-extrabold text-[22px] text-[#E9E4A6] mb-2">Perfect.</div>
              <p className="font-sans text-[16px] text-white/85">
                I'll be in touch within 24 hours to walk you through your options. — Zain
              </p>
            </div>
          ) : (
            <form onSubmit={submitProt} className="grid gap-4">
              <div>
                <label className={labelClass}>Full Name</label>
                <input className={inputClass} value={prot.name} onChange={(e) => setProt({ ...prot, name: e.target.value })} placeholder="Your name" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Phone Number</label>
                  <input className={inputClass} value={prot.phone} onChange={(e) => setProt({ ...prot, phone: e.target.value })} placeholder="(555) 555-5555" />
                </div>
                <div>
                  <label className={labelClass}>Email Address</label>
                  <input type="email" className={inputClass} value={prot.email} onChange={(e) => setProt({ ...prot, email: e.target.value })} placeholder="you@email.com" />
                </div>
              </div>
              <div>
                <label className={labelClass}>What are you most concerned about?</label>
                <select className={inputClass} value={prot.concern} onChange={(e) => setProt({ ...prot, concern: e.target.value })}>
                  <option value="">Choose one...</option>
                  <option>I don't have life insurance yet</option>
                  <option>I need a will or trust</option>
                  <option>I want to review my current coverage</option>
                  <option>I'm not sure where to start</option>
                </select>
              </div>
              {protError && <div className="text-[14px] text-[#DD5013] font-sans">{protError}</div>}
              <button
                type="submit"
                className="mt-2 bg-[#DD5013] text-white font-display-sans font-extrabold text-[15px] tracking-wide px-6 py-4 rounded-[10px] hover:opacity-90 active:scale-[0.98] transition-all"
              >
                Get My Free Needs Review
              </button>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-center font-sans font-semibold text-[14px] text-white border border-[#DD5013] px-5 py-3 rounded-[10px] hover:bg-[#DD5013]/10 transition-colors"
                >
                  💬 Text Me on WhatsApp
                </a>
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-center font-sans font-semibold text-[14px] text-white border border-[#DD5013] px-5 py-3 rounded-[10px] hover:bg-[#DD5013]/10 transition-colors"
                >
                  📅 Book a Call Instead
                </a>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* PAGE FOOTER STRIP */}
      <footer className="border-t border-white/10">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="font-sans text-[13px] text-white/60">
            Zain Adtani · HGI Licensed Agent · TX Life #2787686 · Adtani Education Ventures LLC
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Connect;
