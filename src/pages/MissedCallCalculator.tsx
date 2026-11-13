import { Helmet } from "react-helmet-async";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Mail, Bot, Gauge, Check, Share2 } from "lucide-react";
import { NEWSLETTER_NAME, newsletterWithCadence } from "@/data/newsletter";

const STRIPE_CHECKOUT_URL = "https://buy.stripe.com/8x27sLelAcHq76PfbDa3u01";

/** Average weeks per month. 4.3333 keeps the defaults at about $3,033 / $36,400. */
const WEEKS_PER_MONTH = 4.3333;

function money(n: number): string {
  return "$" + Math.round(n).toLocaleString("en-US");
}

function readSlider(params: URLSearchParams, key: string, fallback: number, min: number, max: number): number {
  if (!params.has(key)) return fallback;
  const n = Number(params.get(key));
  if (!Number.isFinite(n)) return fallback;
  return Math.min(max, Math.max(min, n));
}

function shareUrl(missedCalls: number, customerWorth: number, neverTryAgain: number, wouldBook: number): string {
  const q = new URLSearchParams({
    calls: String(missedCalls),
    worth: String(customerWorth),
    again: String(neverTryAgain),
    book: String(wouldBook),
  });
  return `https://zainadtani.com/missed-call-calculator?${q.toString()}`;
}

function summaryText(
  missedCalls: number,
  customerWorth: number,
  neverTryAgain: number,
  wouldBook: number,
  monthly: number,
  yearly: number,
): string {
  return [
    `Missed calls may be costing about ${money(monthly)} a month (${money(yearly)} a year).`,
    `${missedCalls} missed calls a week, ${money(customerWorth)} per new customer, ${neverTryAgain}% never try again, ${wouldBook}% would have booked.`,
    `Estimate from Zain Adtani: ${shareUrl(missedCalls, customerWorth, neverTryAgain, wouldBook)}`,
  ].join("\n");
}

type SliderRowProps = {
  label: string;
  helper: string;
  min: number;
  max: number;
  step: number;
  value: number;
  prefix?: string;
  suffix?: string;
  format?: (n: number) => string;
  onChange: (n: number) => void;
};

function SliderRow(props: SliderRowProps) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <span className="font-sans font-bold text-[16px] text-[#0A0F1A]">
          {props.label}
        </span>
        <span className="font-sans font-bold text-[18px] text-[#DD5013] whitespace-nowrap">
          {props.prefix}
          {props.format
            ? props.format(props.value)
            : props.value.toLocaleString("en-US")}
          {props.suffix}
        </span>
      </div>
      <span className="block font-sans text-[13px] text-[#0A0F1A]/60 mt-0.5">
        {props.helper}
      </span>
      <input
        type="range"
        min={props.min}
        max={props.max}
        step={props.step}
        value={props.value}
        onChange={(e) => props.onChange(Number(e.target.value))}
        className="mt-3 w-full accent-[#447BBE]"
        aria-label={props.label}
      />
    </div>
  );
}

const HELPFUL_THINGS = [
  {
    icon: Mail,
    title: newsletterWithCadence(),
    body: "Short notes on AI, money, and building things, every morning. Free forever.",
    to: "/#z-letter",
    cta: `Read ${NEWSLETTER_NAME}`,
  },
  {
    icon: BookOpen,
    title: "Zain's Books",
    body: "Real books on AI, publishing, and protecting what you build.",
    to: "/books",
    cta: "Browse the books",
  },
  {
    icon: Bot,
    title: "AI Services",
    body: "Practical AI systems, websites, and workflows for small businesses.",
    to: "/services",
    cta: "See how I help",
  },
  {
    icon: Gauge,
    title: "Owner Stress Test",
    body: "A short look at the missed-call leak and the safety net, in one grade.",
    to: "/owner-stress-test",
    cta: "Take the test",
  },
];

export default function MissedCallCalculator() {
  const initial = typeof window === "undefined" ? null : new URLSearchParams(window.location.search);
  const [missedCalls, setMissedCalls] = useState(() => (initial ? readSlider(initial, "calls", 10, 0, 50) : 10));
  const [customerWorth, setCustomerWorth] = useState(() => (initial ? readSlider(initial, "worth", 250, 25, 2000) : 250));
  const [neverTryAgain, setNeverTryAgain] = useState(() => (initial ? readSlider(initial, "again", 70, 0, 100) : 70));
  const [wouldBook, setWouldBook] = useState(() => (initial ? readSlider(initial, "book", 40, 0, 100) : 40));
  const [shareState, setShareState] = useState<"idle" | "copied" | "shared" | "failed">("idle");

  const calc = useMemo(() => {
    const monthly =
      missedCalls *
      WEEKS_PER_MONTH *
      customerWorth *
      (neverTryAgain / 100) *
      (wouldBook / 100);
    return { monthly, yearly: monthly * 12 };
  }, [missedCalls, customerWorth, neverTryAgain, wouldBook]);

  return (
    <div className="min-h-screen bg-white text-[#0A0F1A]">
      <Helmet>
        <title>Missed Call Cost Calculator | Zain Adtani</title>
        <meta
          name="description"
          content="Move the sliders and see what missed calls cost your business every month and year. No email needed. From Zain Adtani."
        />
        <link
          rel="canonical"
          href="https://zainadtani.com/missed-call-calculator"
        />
        <meta
          property="og:title"
          content="Missed Call Cost Calculator | Zain Adtani"
        />
        <meta
          property="og:description"
          content="See what missed calls cost your business every month and year. No email needed."
        />
        <meta
          property="og:url"
          content="https://zainadtani.com/missed-call-calculator"
        />
      </Helmet>

      <main className="max-w-5xl mx-auto px-6 py-16 md:py-20">
        {/* Brand line + heading */}
        <section className="text-center">
          <p className="font-mono text-[12px] font-bold uppercase tracking-[0.3em] text-[#447BBE]">
            Adtani Education Ventures
          </p>
          <h1
            className="mt-4 text-[#0A0F1A] text-[38px] md:text-[64px] leading-[1.05]"
            style={{ fontFamily: "'Luckiest Guy', cursive", letterSpacing: "0.02em" }}
          >
            What are missed calls
            <br />
            costing your business?
          </h1>
          <p className="mt-4 font-sans text-[18px] md:text-[22px] text-[#0A0F1A]/75 max-w-2xl mx-auto">
            Move the sliders. See your number. No email needed to see it.
          </p>
        </section>

        {/* Calculator */}
        <section className="mt-12 grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="rounded-3xl border-2 border-[#0A0F1A]/10 bg-[#FDF6E3] p-6 md:p-8 space-y-8">
            <SliderRow
              label="Missed calls each week"
              helper="Calls that ring out, hit voicemail, or come in after hours."
              min={0}
              max={50}
              step={1}
              value={missedCalls}
              onChange={setMissedCalls}
            />
            <SliderRow
              label="What one new customer is worth"
              helper="Your average job, sale, or first visit, in dollars."
              min={25}
              max={2000}
              step={25}
              value={customerWorth}
              prefix="$"
              format={(n) => n.toLocaleString("en-US")}
              onChange={setCustomerWorth}
            />
            <SliderRow
              label="Callers who never try again"
              helper="Most people just call the next business on the list. Pick your honest guess."
              min={0}
              max={100}
              step={1}
              value={neverTryAgain}
              suffix="%"
              onChange={setNeverTryAgain}
            />
            <SliderRow
              label="Of those callers, how many would have booked you"
              helper="Not every caller buys. This keeps your number honest."
              min={0}
              max={100}
              step={1}
              value={wouldBook}
              suffix="%"
              onChange={setWouldBook}
            />
          </div>

          {/* Result */}
          <div className="lg:sticky lg:top-24 h-fit rounded-3xl bg-[#0A0F1A] text-white p-6 md:p-8">
            <p className="font-sans text-[13px] font-bold uppercase tracking-[0.2em] text-[#E9E4A6]">
              Every month you lose
            </p>
            <p
              className="mt-2 text-[52px] md:text-[60px] leading-none text-[#DD5013]"
              style={{ fontFamily: "'Luckiest Guy', cursive" }}
            >
              {money(calc.monthly)}
            </p>
            <p className="mt-6 font-sans text-[13px] font-bold uppercase tracking-[0.2em] text-[#E9E4A6]">
              Every year you lose
            </p>
            <p
              className="mt-2 text-[36px] md:text-[44px] leading-none text-white"
              style={{ fontFamily: "'Luckiest Guy', cursive" }}
            >
              {money(calc.yearly)}
            </p>
            <p className="mt-6 font-sans text-[14px] text-white/70 leading-relaxed">
              That is money walking past your shop every month. The good news:
              most of it is fixable, and the first step costs one dollar.
            </p>

            <a
              href={STRIPE_CHECKOUT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 block text-center font-sans font-bold text-white rounded-full bg-[#DD5013] hover:bg-[#c24410] transition-colors px-6 py-4 text-[16px]"
            >
              Get the AI Jumpstart Playbook + Missed Call Money Plan, $1
            </a>
            <p className="mt-3 text-center font-sans text-[12px] text-white/50">
              Pay a dollar on our secure checkout. Your download link lands in
              your email the same day.
            </p>

            <Link
              to="/services#ai-consulting"
              className="mt-4 block text-center font-sans font-bold text-[#447BBE] underline underline-offset-4 hover:text-[#DD5013] transition-colors px-6 py-2 text-[15px]"
            >
              Or start with a free AI checkup
            </Link>
          </div>
        </section>

        <section aria-label="Shareable summary" className="mt-8 rounded-3xl border-2 border-[#D97706]/35 bg-[#FDF6E3] p-6 md:p-8">
          <p className="font-sans text-[12px] font-bold uppercase tracking-[0.18em] text-[#A85B05]">Your summary</p>
          <h2 className="mt-2 text-[32px] md:text-[44px] leading-none text-[#0A0F1A]" style={{ fontFamily: "'Luckiest Guy', cursive" }}>
            About {money(calc.monthly)} a month
          </h2>
          <p className="mt-4 max-w-3xl font-sans text-[17px] leading-relaxed text-[#0A0F1A]/80">
            At {missedCalls} missed calls a week, if a new customer is worth {money(customerWorth)}, {neverTryAgain}% never try again, and {wouldBook}% of those would have booked, that is about {money(calc.monthly)} every month and {money(calc.yearly)} a year.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              className="btn-cta"
              onClick={async () => {
                const text = summaryText(missedCalls, customerWorth, neverTryAgain, wouldBook, calc.monthly, calc.yearly);
                try {
                  await navigator.clipboard.writeText(text);
                  setShareState("copied");
                } catch {
                  setShareState("failed");
                }
              }}
            >
              {shareState === "copied" ? <Check className="mr-2 h-4 w-4" aria-hidden="true" /> : null}
              {shareState === "copied" ? "Copied" : "Copy summary"}
            </button>
            <button
              type="button"
              className="btn-secondary-outline"
              onClick={async () => {
                const text = summaryText(missedCalls, customerWorth, neverTryAgain, wouldBook, calc.monthly, calc.yearly);
                const url = shareUrl(missedCalls, customerWorth, neverTryAgain, wouldBook);
                try {
                  if (navigator.share) {
                    await navigator.share({ title: "Missed call estimate", text, url });
                    setShareState("shared");
                    return;
                  }
                } catch (e) {
                  if ((e as Error)?.name === "AbortError") return;
                }
                try {
                  await navigator.clipboard.writeText(text);
                  setShareState("copied");
                } catch {
                  setShareState("failed");
                }
              }}
            >
              <Share2 className="mr-2 h-4 w-4" aria-hidden="true" />
              Share
            </button>
          </div>
          <p className="mt-3 font-sans text-[13px] text-[#0A0F1A]/70" role="status">
            {shareState === "failed"
              ? "Could not copy from this browser. The summary is on the card above."
              : "The shared link opens this page with the same sliders."}
          </p>
        </section>

        {/* More helpful things */}
        <section className="mt-20">
          <h2
            className="text-center text-[#0A0F1A] text-[32px] md:text-[44px]"
            style={{ fontFamily: "'Luckiest Guy', cursive", letterSpacing: "0.02em" }}
          >
            MORE HELPFUL THINGS
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {HELPFUL_THINGS.map((item) => (
              <Link
                key={item.title}
                to={item.to}
                className="group rounded-3xl border-2 border-[#0A0F1A]/10 bg-white p-6 transition-all hover:border-[#447BBE] hover:-translate-y-1"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#E9E4A6]">
                  <item.icon className="h-5 w-5 text-[#0A0F1A]" aria-hidden="true" />
                </span>
                <p className="mt-4 font-sans font-bold text-[17px] text-[#0A0F1A]">
                  {item.title}
                </p>
                <p className="mt-2 font-sans text-[15px] text-[#0A0F1A]/75 leading-relaxed">
                  {item.body}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 font-sans font-bold text-[14px] text-[#447BBE] group-hover:text-[#DD5013] transition-colors">
                  {item.cta}
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Disclaimer */}
        <section className="mt-16 max-w-3xl mx-auto text-center">
          <p className="font-sans text-[13px] text-[#0A0F1A]/55">
            This calculator is an educational estimate, not a guarantee. Your
            real number depends on your business, your market, and your answers.
          </p>
          <p className="mt-2 font-sans text-[13px] text-[#0A0F1A]/55">
            Made by Zain Adtani. Runs entirely in your browser, no data captured.
          </p>
        </section>
      </main>
    </div>
  );
}
