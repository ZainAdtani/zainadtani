import { Helmet } from "react-helmet-async";
import { useForm, ValidationError } from "@formspree/react";

const WHATSAPP_URL = "https://wa.me/14698447354";
const CALENDLY_URL = "https://calendly.com/zkadtani";

const inputClass =
  "w-full bg-[#0E1628] border border-[#2C4A73] focus:border-[#447BBE] focus:outline-none rounded-[10px] px-4 py-3.5 text-[15px] text-white placeholder:text-white/40 font-sans transition-colors";

const labelClass = "block text-[13px] font-semibold text-white/90 mb-1.5 font-sans";

const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

const Connect = () => {
  const [oppState, oppHandleSubmit] = useForm("mlgkqyoq");
  const [protState, protHandleSubmit] = useForm("mnjyeeyj");

  return (
    <div className="min-h-screen bg-[#0A0F1A] text-white">
      <Helmet>
        <title>Connect with Zain Adtani | Income Opportunity & Family Protection</title>
        <meta
          name="description"
          content="Talk to Zain about a second income opportunity in financial education or about protecting your family with life insurance, wills, and trusts."
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
            className="text-left bg-[#0E1628] border-2 border-[#DD5013] rounded-[16px] p-7 pb-12 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(221,80,19,0.25)] transition-all duration-300"
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
          I'm a licensed financial services agent and educator. I help people from all backgrounds start a part-time business helping families protect themselves financially. No sales background needed. Mentor-led. Legit.
        </p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { t: "Part-time start", d: "Keep your current job while you build" },
            { t: "Licensed & legit", d: "State-licensed financial services" },
            { t: "Mentor-led", d: "You are not doing this alone" },
          ].map((b) => (
            <div key={b.t} className="bg-[#0E1628] border border-[#447BBE]/40 rounded-[12px] p-5">
              <div className="font-display-sans font-extrabold text-[18px] text-[#E9E4A6] mb-1">{b.t}</div>
              <div className="font-sans text-[14px] text-white/70 leading-snug">{b.d}</div>
            </div>
          ))}
        </div>

        {/* FORM */}
        <div className="mt-12 bg-[#0E1628] border border-[#2C4A73] rounded-[16px] p-6 md:p-8">
          {oppState.succeeded ? (
            <div className="py-8 text-center">
              <div className="font-display-sans font-extrabold text-[22px] text-[#E9E4A6] mb-2">Got it.</div>
              <p className="font-sans text-[16px] text-white/85">
                I'll reach out personally within 24 hours. — Zain
              </p>
            </div>
          ) : (
            <form onSubmit={oppHandleSubmit} className="grid gap-4">
              <div>
                <label className={labelClass} htmlFor="fullName">Full Name</label>
                <input id="fullName" name="fullName" className={inputClass} placeholder="Your name" required />
                <ValidationError prefix="Name" field="fullName" errors={oppState.errors} className="text-[14px] text-[#DD5013] font-sans mt-1" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass} htmlFor="phone">Phone Number</label>
                  <input id="phone" name="phone" className={inputClass} placeholder="(555) 555-5555" required />
                  <ValidationError prefix="Phone" field="phone" errors={oppState.errors} className="text-[14px] text-[#DD5013] font-sans mt-1" />
                </div>
                <div>
                  <label className={labelClass} htmlFor="email">Email Address</label>
                  <input id="email" name="email" type="email" className={inputClass} placeholder="you@email.com" required />
                  <ValidationError prefix="Email" field="email" errors={oppState.errors} className="text-[14px] text-[#DD5013] font-sans mt-1" />
                </div>
              </div>
              <div>
                <label className={labelClass} htmlFor="interest">What best describes you?</label>
                <select id="interest" name="interest" className={inputClass} required defaultValue="">
                  <option value="" disabled>Choose one...</option>
                  <option>I want more income</option>
                  <option>I'm curious about financial services</option>
                  <option>I want to learn more first</option>
                  <option>I know someone who might be interested</option>
                </select>
                <ValidationError prefix="Interest" field="interest" errors={oppState.errors} className="text-[14px] text-[#DD5013] font-sans mt-1" />
              </div>
              <button
                type="submit"
                disabled={oppState.submitting}
                className="mt-2 bg-[#DD5013] text-white font-display-sans font-extrabold text-[15px] tracking-wide px-6 py-4 rounded-[10px] hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-60"
              >
                {oppState.submitting ? "Sending..." : "I'm Interested — Reach Out to Me"}
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
        <h2
          className="font-display text-[40px] md:text-[56px] leading-[1] text-white"
          style={{ letterSpacing: "-0.5px", textShadow: "0 2px 16px rgba(0,0,0,0.35)" }}
        >
          Is your family covered if life gets hard?
        </h2>
        <p className="mt-6 font-sans text-[17px] text-white/80 max-w-2xl" style={{ lineHeight: 1.75 }}>
          Most families are one unexpected moment from financial chaos. A simple plan — term life insurance, a will, and a trust — can change everything. I walk you through it, no jargon, no pressure.
        </p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { t: "Term Life Insurance", d: "Income replacement if something happens to you" },
            { t: "Wills & Trusts", d: "Make sure your wishes are honored" },
            { t: "Critical Illness Coverage", d: "Protection while you're still alive" },
          ].map((b) => (
            <div key={b.t} className="bg-[#0E1628] border border-[#DD5013]/40 rounded-[12px] p-5">
              <div className="font-display-sans font-extrabold text-[18px] text-[#E9E4A6] mb-1">{b.t}</div>
              <div className="font-sans text-[14px] text-white/70 leading-snug">{b.d}</div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-[#0E1628] border border-[#2C4A73] rounded-[16px] p-6 md:p-8">
          {protState.succeeded ? (
            <div className="py-8 text-center">
              <div className="font-display-sans font-extrabold text-[22px] text-[#E9E4A6] mb-2">Perfect.</div>
              <p className="font-sans text-[16px] text-white/85">
                I'll be in touch within 24 hours to walk you through your options. — Zain
              </p>
            </div>
          ) : (
            <form onSubmit={protHandleSubmit} className="grid gap-4">
              <div>
                <label className={labelClass} htmlFor="prot-fullName">Full Name</label>
                <input id="prot-fullName" name="fullName" className={inputClass} placeholder="Your name" required />
                <ValidationError prefix="Name" field="fullName" errors={protState.errors} className="text-[14px] text-[#DD5013] font-sans mt-1" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass} htmlFor="prot-phone">Phone Number</label>
                  <input id="prot-phone" name="phone" className={inputClass} placeholder="(555) 555-5555" required />
                  <ValidationError prefix="Phone" field="phone" errors={protState.errors} className="text-[14px] text-[#DD5013] font-sans mt-1" />
                </div>
                <div>
                  <label className={labelClass} htmlFor="prot-email">Email Address</label>
                  <input id="prot-email" name="email" type="email" className={inputClass} placeholder="you@email.com" required />
                  <ValidationError prefix="Email" field="email" errors={protState.errors} className="text-[14px] text-[#DD5013] font-sans mt-1" />
                </div>
              </div>
              <div>
                <label className={labelClass} htmlFor="prot-concern">What are you most concerned about?</label>
                <select id="prot-concern" name="concern" className={inputClass} required defaultValue="">
                  <option value="" disabled>Choose one...</option>
                  <option>I don't have life insurance yet</option>
                  <option>I need a will or trust</option>
                  <option>I want to review my current coverage</option>
                  <option>I'm not sure where to start</option>
                </select>
                <ValidationError prefix="Concern" field="concern" errors={protState.errors} className="text-[14px] text-[#DD5013] font-sans mt-1" />
              </div>
              <button
                type="submit"
                disabled={protState.submitting}
                className="mt-2 bg-[#DD5013] text-white font-display-sans font-extrabold text-[15px] tracking-wide px-6 py-4 rounded-[10px] hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-60"
              >
                {protState.submitting ? "Sending..." : "Get My Free Needs Review"}
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

      <div className="max-w-4xl mx-auto border-t border-white/10" />

      {/* WHERE TO FIND ME + FOCUS */}
      <section className="container mx-auto px-4 py-20 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left: Websites & Social */}
          <div className="bg-[#0E1628] border border-[#2C4A73] rounded-[16px] p-7">
            <h2 className="font-display text-[28px] md:text-[32px] leading-none text-white mb-6">
              Websites &amp; Social
            </h2>
            <ul className="space-y-3.5 font-sans text-[15px]">
              {[
                { label: "Website", value: "zainadtani.com", href: "https://zainadtani.com" },
                { label: "Instagram", value: "@zainadtani", href: "https://instagram.com/zainadtani" },
                { label: "LinkedIn", value: "Zain Adtani", href: "https://linkedin.com/in/zainadtani" },
                { label: "LinkedIn Page", value: "Adtani Education Ventures", href: "https://www.linkedin.com/company/adtani-education-ventures" },
                { label: "YouTube", value: "Build Then Protect", href: "https://youtube.com/@zainadtani" },
                { label: "Newsletter", value: "The Z Letter (Beehiiv)", href: "https://the-z-letter.beehiiv.com" },
              ].map((row) => (
                <li key={row.label} className="flex flex-col sm:flex-row sm:items-baseline sm:gap-3">
                  <span className="font-display-sans font-extrabold text-[13px] uppercase tracking-wider text-[#E9E4A6] min-w-[130px]">
                    {row.label}
                  </span>
                  <a
                    href={row.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/90 hover:text-[#447BBE] underline-offset-4 hover:underline transition-colors"
                  >
                    {row.value}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Focus */}
          <div className="bg-[#0E1628] border border-[#DD5013]/50 rounded-[16px] p-7">
            <h2 className="font-display text-[28px] md:text-[32px] leading-none text-white mb-6">
              Focus
            </h2>
            <ul className="space-y-3.5 font-sans text-[15px] text-white/90">
              {[
                "AI Consulting for small businesses",
                "Websites, automations & AI workflows",
                "Author / Publishing",
                "Financial Education & Family Protection",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#DD5013] shrink-0" />
                  <span className="font-display-sans font-extrabold text-[15px] leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>


      {/* PAGE FOOTER STRIP */}
      <footer className="border-t border-white/10">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="font-sans text-[13px] text-white/60">
            Zain Adtani · Licensed Financial Professional · TX Life #2787686 · Adtani Education Ventures LLC
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Connect;
