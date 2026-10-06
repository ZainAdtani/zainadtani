import { Helmet } from "react-helmet-async";
import { useMemo, useState } from "react";

const CALENDLY_URL = "https://calendly.com/zkadtani";

interface QuizOption {
  text: string;
  val: string;
  score: { term: number; whole: number; blend: number };
}

interface QuizQuestion {
  id: number;
  title: string;
  hint: string;
  options: QuizOption[];
}

const QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    title: "How long do you need coverage?",
    hint: "Pick the timeline that aligns with your family obligations or debts.",
    options: [
      { text: "10 to 20 years", val: "10-20", score: { term: 3, whole: 0, blend: 1 } },
      { text: "30 years", val: "30", score: { term: 2, whole: 1, blend: 2 } },
      { text: "Forever", val: "forever", score: { term: 0, whole: 3, blend: 2 } },
    ],
  },
  {
    id: 2,
    title: "What is your main financial goal?",
    hint: "What matters most to your household if something happens to you?",
    options: [
      { text: "Income protection", val: "income", score: { term: 3, whole: 0, blend: 1 } },
      { text: "Legacy for family or charity", val: "legacy", score: { term: 0, whole: 3, blend: 2 } },
      { text: "Cash growth and accumulation", val: "cash", score: { term: 0, whole: 3, blend: 1 } },
    ],
  },
  {
    id: 3,
    title: "How does your monthly budget look?",
    hint: "Be realistic about the monthly premium you want to commit to long term.",
    options: [
      { text: "Lowest possible", val: "lowest", score: { term: 3, whole: 0, blend: 0 } },
      { text: "Moderate", val: "moderate", score: { term: 1, whole: 1, blend: 3 } },
      { text: "Flexible", val: "flexible", score: { term: 0, whole: 3, blend: 2 } },
    ],
  },
  {
    id: 4,
    title: "How is your current health?",
    hint: "Underwriting rates depend directly on your current wellness profile.",
    options: [
      { text: "Great", val: "great", score: { term: 2, whole: 2, blend: 2 } },
      { text: "Okay", val: "okay", score: { term: 1, whole: 2, blend: 2 } },
      { text: "Health issues present", val: "issues", score: { term: 0, whole: 3, blend: 2 } },
    ],
  },
  {
    id: 5,
    title: "Do you want money back if you outlive the policy?",
    hint: "Some policies build cash value or refund premiums, while pure term pays out only upon death.",
    options: [
      { text: "Yes", val: "yes", score: { term: 0, whole: 3, blend: 2 } },
      { text: "No", val: "no", score: { term: 3, whole: 0, blend: 0 } },
    ],
  },
];

type Recommendation = "term" | "whole" | "blend";

const RESULTS: Record<
  Recommendation,
  { badge: string; headline: string; tagline: string; reasons: string[] }
> = {
  term: {
    badge: "Recommended Strategy: Term Life",
    headline: "Term Life Insurance",
    tagline: "Maximum dollar protection for your critical income earning years at the lowest monthly cost.",
    reasons: [
      "You get maximum coverage for every dollar, keeping your monthly premiums low while protecting your household.",
      "It covers your major temporary milestones such as your mortgage, children growing up, and student debts.",
      "You do not pay extra fees for complex cash accumulation features that you do not need right now.",
    ],
  },
  whole: {
    badge: "Recommended Strategy: Whole Life",
    headline: "Whole Life (Permanent Protection)",
    tagline: "Guaranteed lifelong protection that never expires, with guaranteed cash value you can tap into.",
    reasons: [
      "Your coverage never expires as long as premiums are paid, guaranteeing a permanent financial legacy.",
      "Your policy builds dependable cash savings over time that you can borrow against or access down the road.",
      "Your monthly premium is locked in permanently, so getting older will never increase your payment.",
    ],
  },
  blend: {
    badge: "Recommended Strategy: Blended Approach",
    headline: "Blended Strategy (Term + Permanent)",
    tagline: "The best of both worlds: big affordable income replacement now, plus a permanent foundation for life.",
    reasons: [
      "A large affordable Term policy protects your high income years while your children and debts are at their peak.",
      "A smaller permanent Whole Life policy runs alongside it to guarantee funeral expenses and lifelong legacy.",
      "This customized mix keeps your total monthly bill realistic without leaving your retirement years uncovered.",
    ],
  },
};

const FAQS = [
  {
    q: "Is this financial advice?",
    a: "No. This is an educational starting point. A licensed agent looks at your full picture, your health, your budget, and your family, before recommending anything.",
  },
  {
    q: "What if I am torn between two answers?",
    a: "Pick the one that feels most true today. The quiz scores the overall pattern, so one close call will not flip your result.",
  },
  {
    q: "What do I do with my result?",
    a: "Use it as a conversation starter. Bring it to a licensed life insurance agent and ask what type of policy fits your budget and timeline.",
  },
];

export default function TermVsWholeLifeQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [done, setDone] = useState(false);

  const question = QUESTIONS[step];
  const progress = ((step + 1) / QUESTIONS.length) * 100;

  const recommendation: Recommendation | null = useMemo(() => {
    if (!done) return null;
    let termScore = 0;
    let wholeScore = 0;
    QUESTIONS.forEach((q) => {
      const opt = q.options.find((o) => o.val === answers[q.id]);
      if (opt) {
        termScore += opt.score.term;
        wholeScore += opt.score.whole;
      }
    });
    if (termScore >= wholeScore + 3) return "term";
    if (wholeScore >= termScore + 3) return "whole";
    return "blend";
  }, [done, answers]);

  const result = recommendation ? RESULTS[recommendation] : null;

  function restart() {
    setStep(0);
    setAnswers({});
    setDone(false);
  }

  return (
    <div className="min-h-screen bg-white text-[#0A0F1A]">
      <Helmet>
        <title>Term vs. Whole Life Quiz | Zain Adtani</title>
        <meta
          name="description"
          content="Five questions, sixty seconds. Find the life insurance strategy that fits your real life. Free from Zain Adtani, no email required."
        />
        <link
          rel="canonical"
          href="https://zainadtani.com/resources/term-vs-whole-life-quiz"
        />
        <meta property="og:title" content="Term vs. Whole Life Quiz | Zain Adtani" />
        <meta
          property="og:description"
          content="Five questions, sixty seconds. Find the life insurance strategy that fits your real life."
        />
        <meta
          property="og:url"
          content="https://zainadtani.com/resources/term-vs-whole-life-quiz"
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
            TERM OR
            <br />
            WHOLE LIFE?
          </h1>
          <p className="mt-4 font-sans text-[18px] md:text-[22px] text-[#0A0F1A]/75 max-w-2xl mx-auto">
            Five questions, sixty seconds, and you will know which one actually fits your life.
          </p>
        </section>

        {/* Quiz card */}
        <section className="mt-12 max-w-3xl mx-auto">
          <div className="rounded-3xl border-2 border-[#0A0F1A]/10 bg-white overflow-hidden shadow-[0_10px_25px_-5px_rgba(10,15,26,0.12)]">
            {!done ? (
              <>
                <div className="h-2 bg-[#0A0F1A]/10 w-full">
                  <div
                    className="h-full bg-emerald-500 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="bg-[#F8FAF6] border-b-2 border-[#0A0F1A]/10 px-6 md:px-8 py-4 flex justify-between items-center">
                  <span className="font-sans text-[13px] font-bold uppercase tracking-[0.1em] text-emerald-600">
                    Question {step + 1} of {QUESTIONS.length}
                  </span>
                  <span className="font-sans text-[13px] text-[#0A0F1A]/50">
                    No jargon, simple score
                  </span>
                </div>
                <div className="p-6 md:p-8">
                  <h2 className="font-sans font-bold text-[22px] text-[#0A0F1A]">
                    {question.title}
                  </h2>
                  <p className="mt-1 font-sans text-[14px] text-[#0A0F1A]/60">
                    {question.hint}
                  </p>
                  <div className="mt-6 space-y-3">
                    {question.options.map((opt) => {
                      const selected = answers[question.id] === opt.val;
                      return (
                        <button
                          key={opt.val}
                          type="button"
                          onClick={() =>
                            setAnswers((a) => ({ ...a, [question.id]: opt.val }))
                          }
                          className={`w-full flex items-center text-left font-sans font-semibold text-[15px] rounded-2xl border-2 px-5 py-4 transition-colors ${
                            selected
                              ? "bg-[#0A0F1A] text-white border-[#0A0F1A]"
                              : "bg-[#F8FAF6] text-[#0A0F1A] border-[#0A0F1A]/10 hover:border-emerald-500"
                          }`}
                        >
                          <span
                            className={`w-5 h-5 rounded-full border-2 mr-4 flex-shrink-0 flex items-center justify-center ${
                              selected ? "border-white" : "border-[#0A0F1A]/30"
                            }`}
                          >
                            {selected && (
                              <span className="w-2 h-2 rounded-full bg-white" />
                            )}
                          </span>
                          {opt.text}
                        </button>
                      );
                    })}
                  </div>
                  <div className="mt-6 flex justify-between items-center border-t-2 border-[#0A0F1A]/10 pt-5">
                    <button
                      type="button"
                      onClick={() => setStep((s) => Math.max(0, s - 1))}
                      disabled={step === 0}
                      className="font-sans font-bold text-[15px] rounded-full px-6 py-3 bg-[#0A0F1A]/5 text-[#0A0F1A]/70 hover:bg-[#0A0F1A]/10 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      disabled={!answers[question.id]}
                      onClick={() => {
                        if (step < QUESTIONS.length - 1) setStep((s) => s + 1);
                        else setDone(true);
                      }}
                      className="font-sans font-bold text-[15px] rounded-full px-6 py-3 bg-[#0A0F1A] text-white hover:bg-emerald-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {step === QUESTIONS.length - 1 ? "See Recommendation" : "Next"}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              result && (
                <div className="p-6 md:p-8 text-center">
                  <span className="inline-block font-sans text-[12px] font-bold uppercase tracking-[0.15em] rounded-full px-4 py-2 bg-emerald-500/10 text-emerald-700 border border-emerald-500/30">
                    {result.badge}
                  </span>
                  <div className="mt-6 rounded-3xl bg-[#0A0F1A] text-white p-8 md:p-10">
                    <h2
                      className="text-[32px] md:text-[44px] leading-tight text-emerald-300"
                      style={{ fontFamily: "'Luckiest Guy', cursive", letterSpacing: "0.02em" }}
                    >
                      {result.headline.toUpperCase()}
                    </h2>
                    <p className="mt-3 font-sans text-[15px] md:text-[16px] text-white/70 max-w-xl mx-auto">
                      {result.tagline}
                    </p>
                  </div>
                  <div className="mt-6 rounded-3xl border-2 border-[#0A0F1A]/10 bg-[#F8FAF6] p-6 md:p-8 text-left">
                    <p className="font-sans text-[13px] font-bold uppercase tracking-[0.15em] text-[#0A0F1A]/60 border-b-2 border-[#0A0F1A]/10 pb-3">
                      Why this makes sense for you
                    </p>
                    <div className="mt-4 space-y-3">
                      {result.reasons.map((r) => (
                        <div key={r} className="flex items-start gap-3">
                          <span className="font-sans font-bold text-emerald-600 text-[18px] leading-none mt-0.5">
                            ✓
                          </span>
                          <span className="font-sans text-[15px] text-[#0A0F1A]/80">
                            {r}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-6 rounded-3xl border-2 border-emerald-500/30 bg-emerald-500/5 p-6 text-center">
                    <p className="font-sans font-semibold text-[15px] text-[#0A0F1A]">
                      Want a licensed agent to walk you through this? Talk to Zain.
                    </p>
                    <a
                      href={CALENDLY_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-block font-sans font-bold text-white rounded-full bg-[#0A0F1A] hover:bg-emerald-600 transition-colors px-8 py-3.5 text-[15px]"
                    >
                      Talk to Zain
                    </a>
                  </div>
                  <button
                    type="button"
                    onClick={restart}
                    className="mt-6 font-sans font-bold text-[14px] text-[#0A0F1A]/60 hover:text-[#0A0F1A] underline underline-offset-4 transition-colors"
                  >
                    Retake quiz
                  </button>
                </div>
              )
            )}
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
            Educational only. Not financial advice. This quiz gives a starting
            direction, not a recommendation. Talk to a licensed life insurance
            agent about your situation.
          </p>
          <p className="mt-2 font-sans text-[13px] text-[#0A0F1A]/55">
            Made by Zain Adtani, Financial Educator. Runs entirely in your browser, no data captured.
          </p>
        </section>
      </main>
    </div>
  );
}
