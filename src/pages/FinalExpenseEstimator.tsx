import { Helmet } from "react-helmet-async";
import { useMemo, useState } from "react";

const CALENDLY_URL = "https://calendly.com/zkadtani";

/** Parse a digits-only field into a safe non-negative number. */
function toNumber(raw: string): number {
  const n = parseFloat(raw.replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) && n >= 0 ? n : 0;
}

function money(n: number): string {
  return "$" + Math.round(n).toLocaleString("en-US");
}

function Field(props: {
  label: string;
  helper?: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="font-sans font-bold text-[16px] text-[#0A0F1A]">
        {props.label}
      </span>
      {props.helper && (
        <span className="block font-sans text-[13px] text-[#0A0F1A]/60 mt-0.5">
          {props.helper}
        </span>
      )}
      <div className="relative mt-2">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 font-sans text-[16px] text-[#0A0F1A]/50">
          $
        </span>
        <input
          type="text"
          inputMode="numeric"
          autoComplete="off"
          value={props.value}
          placeholder="0"
          onChange={(e) => props.onChange(e.target.value.replace(/[^0-9]/g, ""))}
          className="w-full font-sans text-[18px] rounded-2xl border-2 border-[#0A0F1A]/10 bg-white pl-9 pr-4 py-3 outline-none focus:border-emerald-500 transition-colors"
        />
      </div>
    </label>
  );
}

const FUNERAL_PRESETS = [8000, 12000, 15000, 20000];

const FAQS = [
  {
    q: "Is this financial advice?",
    a: "No. This is an educational starting point. A licensed agent looks at your full picture, your health, your budget, and your family, before recommending anything.",
  },
  {
    q: "What counts as a final expense?",
    a: "The funeral and burial, any medical bills or debts you want cleared, and anything you want to leave behind for the people you love. That is the whole list.",
  },
  {
    q: "What do I do with this number?",
    a: "Use it as a conversation starter. Bring it to a licensed life insurance agent and ask what type of final expense policy fits your budget.",
  },
];

export default function FinalExpenseEstimator() {
  const [age, setAge] = useState(65);
  const [funeral, setFuneral] = useState("12000");
  const [debts, setDebts] = useState("5000");
  const [legacy, setLegacy] = useState("5000");

  const calc = useMemo(() => {
    const funeralPart = toNumber(funeral);
    const debtsPart = toNumber(debts);
    const legacyPart = toNumber(legacy);
    const exact = funeralPart + debtsPart + legacyPart;
    const recommended = exact <= 0 ? 0 : Math.ceil(exact / 1000) * 1000;
    const parts = [
      { label: "Funeral and burial", value: funeralPart },
      { label: "Debts to clear", value: debtsPart },
      { label: "Legacy gift", value: legacyPart },
    ].filter((p) => p.value > 0);
    const maxPart = Math.max(1, ...parts.map((p) => p.value));
    const formula = `Burial (${money(funeralPart)}) + Debts (${money(debtsPart)}) + Legacy (${money(legacyPart)})`;
    return { exact, recommended, parts, maxPart, formula };
  }, [funeral, debts, legacy]);

  const funeralNum = toNumber(funeral);

  return (
    <div className="min-h-screen bg-white text-[#0A0F1A]">
      <Helmet>
        <title>Final Expense Estimator | Zain Adtani</title>
        <meta
          name="description"
          content="Free 30-second estimator for burial costs, debts, and legacy. See the full math, no email needed. From Zain Adtani."
        />
        <link
          rel="canonical"
          href="https://zainadtani.com/resources/final-expense-estimator"
        />
        <meta property="og:title" content="Final Expense Estimator | Zain Adtani" />
        <meta
          property="og:description"
          content="Free 30-second estimator for burial costs, debts, and legacy. No email needed."
        />
        <meta
          property="og:url"
          content="https://zainadtani.com/resources/final-expense-estimator"
        />
      </Helmet>

      <main className="max-w-5xl mx-auto px-6 py-16 md:py-20">
        {/* Heading */}
        <section className="text-center">
          <p className="font-sans text-[13px] font-bold uppercase tracking-[0.2em] text-emerald-600">
            Free tool
          </p>
          <h1
            className="mt-3 text-[#0A0F1A] text-[44px] md:text-[72px] leading-[1.02]"
            style={{ fontFamily: "'Luckiest Guy', cursive", letterSpacing: "0.02em" }}
          >
            FINAL EXPENSE
            <br />
            ESTIMATOR
          </h1>
          <p className="mt-4 font-sans text-[18px] md:text-[22px] text-[#0A0F1A]/75 max-w-2xl mx-auto">
            Burial costs, debts, and a little something to leave behind. Add it up in about 30 seconds.
          </p>
        </section>

        {/* Estimator */}
        <section className="mt-12 grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="rounded-3xl border-2 border-[#0A0F1A]/10 bg-[#F8FAF6] p-6 md:p-8 space-y-6">
            <div>
              <span className="font-sans font-bold text-[16px] text-[#0A0F1A]">
                Your age
              </span>
              <span className="block font-sans text-[13px] text-[#0A0F1A]/60 mt-0.5">
                Final expense planning usually starts around age 40.
              </span>
              <div className="mt-3 flex items-center gap-4">
                <input
                  type="range"
                  min={40}
                  max={85}
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full accent-emerald-600"
                  aria-label="Your age"
                />
                <span className="font-sans font-bold text-[18px] text-[#0A0F1A] whitespace-nowrap w-24 text-right">
                  {`${age} years old`}
                </span>
              </div>
            </div>

            <div>
              <Field
                label="Funeral and burial cost estimate"
                helper="Service, cemetery, memorial."
                value={funeral}
                onChange={setFuneral}
              />
              <div className="mt-3 grid grid-cols-4 gap-2">
                {FUNERAL_PRESETS.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setFuneral(String(p))}
                    className={`font-sans font-bold text-[14px] rounded-xl border-2 px-2 py-2 transition-colors ${
                      funeralNum === p
                        ? "bg-[#0A0F1A] text-white border-[#0A0F1A]"
                        : "bg-white text-[#0A0F1A] border-[#0A0F1A]/10 hover:border-emerald-500"
                    }`}
                  >
                    {money(p)}
                  </button>
                ))}
              </div>
            </div>

            <Field
              label="Debts to clear"
              helper="Medical bills, cards, personal notes."
              value={debts}
              onChange={setDebts}
            />
            <Field
              label="Legacy gift amount"
              helper="Gifts to children, family, or charity."
              value={legacy}
              onChange={setLegacy}
            />
          </div>

          {/* Sticky result */}
          <div className="lg:sticky lg:top-24 h-fit rounded-3xl bg-[#0A0F1A] text-white p-6 md:p-8">
            <p className="font-sans text-[13px] font-bold uppercase tracking-[0.2em] text-emerald-300">
              Your number
            </p>
            <p
              className="mt-2 text-[52px] md:text-[60px] leading-none text-emerald-300"
              style={{ fontFamily: "'Luckiest Guy', cursive" }}
            >
              {money(calc.recommended)}
            </p>
            <p className="mt-3 font-sans text-[14px] text-white/70">
              Recommended final expense coverage, rounded up to the nearest $1,000.
            </p>
            <p className="mt-2 font-sans text-[13px] text-white/50">{calc.formula}</p>

            {calc.parts.length > 0 && (
              <div className="mt-6 space-y-3">
                <p className="font-sans text-[13px] font-bold uppercase tracking-[0.15em] text-white/50">
                  What it covers
                </p>
                {calc.parts.map((p) => (
                  <div key={p.label}>
                    <div className="flex justify-between font-sans text-[13px] text-white/80">
                      <span>{p.label}</span>
                      <span>{money(p.value)}</span>
                    </div>
                    <div className="mt-1 h-2 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-emerald-400"
                        style={{ width: `${Math.max(4, (p.value / calc.maxPart) * 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
                <p className="font-sans text-[13px] text-white/60 pt-1">
                  Exact unrounded total: {money(calc.exact)}.
                </p>
              </div>
            )}

            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 block text-center font-sans font-bold text-[#0A0F1A] rounded-full bg-emerald-400 hover:bg-emerald-300 transition-colors px-6 py-4 text-[16px]"
            >
              Talk to Zain
            </a>
            <p className="mt-3 text-center font-sans text-[12px] text-white/50">
              Want a licensed agent to walk you through this? Schedule a quick call.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-20 max-w-3xl mx-auto">
          <h2
            className="text-center text-[#0A0F1A] text-[32px] md:text-[44px]"
            style={{ fontFamily: "'Luckiest Guy', cursive", letterSpacing: "0.02em" }}
          >
            QUICK ANSWERS
          </h2>
          <div className="mt-8 space-y-4">
            {FAQS.map((f) => (
              <div
                key={f.q}
                className="rounded-3xl border-2 border-[#0A0F1A]/10 bg-white p-6"
              >
                <p className="font-sans font-bold text-[17px]">{f.q}</p>
                <p className="mt-2 font-sans text-[15px] text-[#0A0F1A]/75">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Disclaimer */}
        <section className="mt-16 max-w-3xl mx-auto text-center">
          <p className="font-sans text-[13px] text-[#0A0F1A]/55">
            Educational only. Not financial advice. This estimator gives a rough
            starting number, not a recommendation. Talk to a licensed life
            insurance agent about your situation.
          </p>
          <p className="mt-2 font-sans text-[13px] text-[#0A0F1A]/55">
            Made by Zain Adtani, Financial Educator. Runs entirely in your browser, no data captured.
          </p>
        </section>
      </main>
    </div>
  );
}
