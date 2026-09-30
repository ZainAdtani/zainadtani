import { Helmet } from "react-helmet-async";
import { useMemo, useState } from "react";

const SUBSCRIBE_URL = "https://the-z-letter.beehiiv.com/subscribe";

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

const DIME = [
  {
    letter: "D",
    title: "Debt",
    text: "Everything you owe besides the mortgage. Car loans, credit cards, student loans. Your family should not inherit your bills.",
  },
  {
    letter: "I",
    title: "Income",
    text: "Your take-home pay times the years your family would need it. Ten years is the most common starting point.",
  },
  {
    letter: "M",
    title: "Mortgage",
    text: "What is still owed on the house. This lets your family stay in the home, not sell it under pressure.",
  },
  {
    letter: "E",
    title: "Education",
    text: "Future college costs for the kids. Rough is fine. Skip it if it does not apply to you.",
  },
];

const FAQS = [
  {
    q: "Is this financial advice?",
    a: "No. This is an educational starting point, the same simple math many educators use. A licensed agent looks at your full picture before recommending anything.",
  },
  {
    q: "Why take-home pay instead of salary?",
    a: "Your family spends what actually hits the bank account. Take-home pay keeps the number honest.",
  },
  {
    q: "Should I count the policy from my job?",
    a: "Yes, enter it above. Just remember it usually ends when you leave the job, so most families do not rely on it alone.",
  },
  {
    q: "What do I do with this number?",
    a: "Use it as a conversation starter. Bring it to a licensed life insurance agent and ask what type of policy fits your budget and timeline.",
  },
];

export default function LifeInsuranceCalculator() {
  const [income, setIncome] = useState("75000");
  const [years, setYears] = useState(10);
  const [mortgage, setMortgage] = useState("");
  const [debts, setDebts] = useState("");
  const [college, setCollege] = useState("");
  const [finalCosts, setFinalCosts] = useState("15000");
  const [savings, setSavings] = useState("");
  const [existing, setExisting] = useState("");

  const calc = useMemo(() => {
    const incomePart = toNumber(income) * years;
    const mortgagePart = toNumber(mortgage);
    const debtsPart = toNumber(debts);
    const collegePart = toNumber(college);
    const finalPart = toNumber(finalCosts);
    const need = incomePart + mortgagePart + debtsPart + collegePart + finalPart;
    const alreadyHave = toNumber(savings) + toNumber(existing);
    const gap = Math.max(0, need - alreadyHave);
    const recommended = Math.ceil(gap / 25000) * 25000;
    const parts = [
      { label: "Income replacement", value: incomePart },
      { label: "Mortgage", value: mortgagePart },
      { label: "Other debts", value: debtsPart },
      { label: "College", value: collegePart },
      { label: "Final costs", value: finalPart },
    ].filter((p) => p.value > 0);
    const maxPart = Math.max(1, ...parts.map((p) => p.value));
    return { need, alreadyHave, gap, recommended, parts, maxPart };
  }, [income, years, mortgage, debts, college, finalCosts, savings, existing]);

  const termTip =
    years <= 10
      ? "Most families with a number like this look at a 15 or 20 year term policy."
      : years <= 20
        ? "Most families with a number like this look at a 20 or 30 year term policy."
        : "Most families with a number like this look at a 30 year term policy.";

  return (
    <div className="min-h-screen bg-white text-[#0A0F1A]">
      <Helmet>
        <title>Life Insurance Calculator: How Much Coverage Do You Need?</title>
        <meta
          name="description"
          content="Answer 7 quick questions and get a plain-English estimate of how much life insurance your family might need. Free from Zain Adtani, no email required."
        />
        <link
          rel="canonical"
          href="https://zainadtani.com/resources/life-insurance-calculator"
        />
        <meta
          property="og:title"
          content="Life Insurance Calculator: How Much Coverage Do You Need?"
        />
        <meta
          property="og:description"
          content="Seven quick questions. One plain-English number. Free."
        />
        <meta
          property="og:url"
          content="https://zainadtani.com/resources/life-insurance-calculator"
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
            HOW MUCH LIFE
            <br />
            INSURANCE DO YOU NEED?
          </h1>
          <p className="mt-4 font-sans text-[18px] md:text-[22px] text-[#0A0F1A]/75 max-w-2xl mx-auto">
            Answer 7 quick questions. Get a plain-English number in about 60 seconds.
          </p>
        </section>

        {/* Calculator */}
        <section className="mt-12 grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="rounded-3xl border-2 border-[#0A0F1A]/10 bg-[#F8FAF6] p-6 md:p-8 space-y-6">
            <Field
              label="1. What is your yearly take-home pay?"
              helper="After taxes. Just your income, not the household total."
              value={income}
              onChange={setIncome}
            />

            <div>
              <span className="font-sans font-bold text-[16px] text-[#0A0F1A]">
                2. How many years should it replace?
              </span>
              <span className="block font-sans text-[13px] text-[#0A0F1A]/60 mt-0.5">
                How long would your family need your income if you were gone tomorrow?
              </span>
              <div className="mt-3 flex items-center gap-4">
                <input
                  type="range"
                  min={1}
                  max={30}
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="w-full accent-emerald-600"
                  aria-label="Years of income to replace"
                />
                <span className="font-sans font-bold text-[18px] text-[#0A0F1A] whitespace-nowrap w-20 text-right">
                  {years} {years === 1 ? "year" : "years"}
                </span>
              </div>
            </div>

            <Field
              label="3. How much is left on your mortgage?"
              helper="The payoff amount, not the home value."
              value={mortgage}
              onChange={setMortgage}
            />
            <Field
              label="4. Other debts?"
              helper="Car loans, credit cards, student loans. Rough total is fine."
              value={debts}
              onChange={setDebts}
            />
            <Field
              label="5. Kids' future college costs?"
              helper="Rough total for all kids. Leave it at 0 if it does not apply."
              value={college}
              onChange={setCollege}
            />
            <Field
              label="6. Final costs?"
              helper="Funeral and loose ends. $15,000 is a common guess."
              value={finalCosts}
              onChange={setFinalCosts}
            />
            <Field
              label="7. Savings your family could use?"
              helper="Emergency fund and investments they could tap into."
              value={savings}
              onChange={setSavings}
            />
            <Field
              label="Bonus: life insurance you already have?"
              helper="Work policy plus any personal policy. Face value total."
              value={existing}
              onChange={setExisting}
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
              Estimated coverage your family might need, rounded up to the nearest $25,000.
            </p>

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
                {calc.alreadyHave > 0 && (
                  <p className="font-sans text-[13px] text-white/60 pt-1">
                    Minus {money(calc.alreadyHave)} you already have in savings and coverage.
                  </p>
                )}
              </div>
            )}

            <p className="mt-6 font-sans text-[14px] text-white/80 border-t border-white/10 pt-5">
              {termTip}
            </p>

            <a
              href={SUBSCRIBE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 block text-center font-sans font-bold text-[#0A0F1A] rounded-full bg-emerald-400 hover:bg-emerald-300 transition-colors px-6 py-4 text-[16px]"
            >
              Get The Daily Z, free
            </a>
            <p className="mt-3 text-center font-sans text-[12px] text-white/50">
              One useful money idea every morning. Unsubscribe anytime.
            </p>
          </div>
        </section>

        {/* DIME explainer */}
        <section className="mt-20">
          <h2
            className="text-center text-[#0A0F1A] text-[32px] md:text-[44px]"
            style={{ fontFamily: "'Luckiest Guy', cursive", letterSpacing: "0.02em" }}
          >
            THE MATH BEHIND IT: DIME
          </h2>
          <p className="mt-3 text-center font-sans text-[16px] text-[#0A0F1A]/70 max-w-2xl mx-auto">
            Four letters. Add them up, subtract what you already have. That is the whole formula.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {DIME.map((d) => (
              <div
                key={d.letter}
                className="rounded-3xl border-2 border-[#0A0F1A]/10 bg-[#F8FAF6] p-6"
              >
                <p
                  className="text-[40px] text-emerald-600 leading-none"
                  style={{ fontFamily: "'Luckiest Guy', cursive" }}
                >
                  {d.letter}
                </p>
                <p className="mt-2 font-sans font-bold text-[17px]">{d.title}</p>
                <p className="mt-2 font-sans text-[14px] text-[#0A0F1A]/70">{d.text}</p>
              </div>
            ))}
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
            Educational only. Not financial advice. This calculator gives a rough
            starting estimate, not a recommendation. Talk to a licensed life
            insurance agent about your situation.
          </p>
          <p className="mt-2 font-sans text-[13px] text-[#0A0F1A]/55">
            Made by Zain Adtani, Financial Educator.
          </p>
        </section>
      </main>
    </div>
  );
}
