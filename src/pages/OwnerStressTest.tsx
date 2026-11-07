import { Helmet } from "react-helmet-async";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Check, Copy, Mail, PhoneOff, ShieldCheck } from "lucide-react";
import {
  AI_CHECKUP_PATH,
  CALENDLY_URL,
  DEFAULT_INPUTS,
  DISCLAIMER,
  buildReportLead,
  checkReportRateLimit,
  isHoneypotTripped,
  isValidEmail,
  REPORT_HONEYPOT_FIELD,
  shareText,
  methodSteps,
  clampInputs,
  familyRunwayMonths,
  findings,
  grade,
  leakScore,
  monthlyLeak,
  overallScore,
  protectionScore,
  sickRunwayMonths,
  yearlyLeak,
  type StressInputs,
} from "@/data/owner-stress-test";

const TITLE = "Owner Stress Test | Zain Adtani";
const DESCRIPTION =
  "If you stopped working tomorrow, what breaks first? A free 2 minute test for local business owners. See your missed call leak and your safety net in one grade. Educational only.";
const CANONICAL = "https://zainadtani.com/owner-stress-test";

const LUCKIEST = { fontFamily: "'Luckiest Guy', cursive", letterSpacing: "0.02em" };

function money(n: number): string {
  return "$" + Math.round(n).toLocaleString("en-US");
}

function months(n: number): string {
  if (n >= 120) return "120+";
  return n.toLocaleString("en-US", { maximumFractionDigits: 1 });
}

const GRADE_COLOR: Record<string, string> = {
  A: "#447BBE",
  B: "#447BBE",
  C: "#D97706",
  D: "#DD5013",
  F: "#DD5013",
};

type NumberKey = {
  [K in keyof StressInputs]: StressInputs[K] extends number ? K : never;
}[keyof StressInputs];
type BoolKey = {
  [K in keyof StressInputs]: StressInputs[K] extends boolean ? K : never;
}[keyof StressInputs];

type SliderSpec = {
  key: NumberKey;
  label: string;
  helper: string;
  min: number;
  max: number;
  step: number;
  kind: "money" | "percent" | "count";
};

const PHONE_SLIDERS: SliderSpec[] = [
  { key: "callsPerWeek", label: "Calls each week", helper: "All the calls that come in. Count the ones you miss too.", min: 0, max: 500, step: 5, kind: "count" },
  { key: "missedCallPercent", label: "Calls you miss", helper: "Rings out, hits voicemail, or comes after hours. Be honest.", min: 0, max: 100, step: 1, kind: "percent" },
  { key: "avgJobValue", label: "What one job is worth", helper: "Your average job or sale, in dollars.", min: 0, max: 10000, step: 25, kind: "money" },
  { key: "closeRatePercent", label: "Calls that turn into jobs", helper: "Out of the calls you answer, how many book?", min: 0, max: 100, step: 1, kind: "percent" },
];

const SAFETY_SLIDERS: SliderSpec[] = [
  { key: "monthlyHouseholdExpenses", label: "Home bills each month", helper: "Rent or mortgage, food, car, kids. What your family spends.", min: 0, max: 20000, step: 250, kind: "money" },
  { key: "monthlyBusinessFixedCosts", label: "Business bills each month", helper: "Rent, payroll, loans, trucks. Bills that come no matter what.", min: 0, max: 50000, step: 500, kind: "money" },
  { key: "emergencySavings", label: "Savings you can reach fast", helper: "Cash in the bank you could use this month.", min: 0, max: 250000, step: 1000, kind: "money" },
  { key: "lifeCoverage", label: "Life insurance payout", helper: "The total your family would get. Pick $0 if you have none.", min: 0, max: 2000000, step: 25000, kind: "money" },
];

const TOGGLES: { key: BoolKey; label: string; helper: string }[] = [
  { key: "hasDisabilityCoverage", label: "Do you have disability coverage?", helper: "It may replace part of your income if you are hurt or sick and cannot work." },
  { key: "businessRunsWithoutOwner", label: "Does the business still earn if you are out?", helper: "Could your team keep jobs coming in for a month without you?" },
];

function formatValue(kind: SliderSpec["kind"], n: number): string {
  if (kind === "money") return money(n);
  if (kind === "percent") return `${n}%`;
  return n.toLocaleString("en-US");
}

function SliderRow({ spec, value, onChange }: { spec: SliderSpec; value: number; onChange: (n: number) => void }) {
  const id = `ost-${spec.key}`;
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="font-sans font-bold text-[16px] text-[#0A0F1A]">
          {spec.label}
        </label>
        <span className="font-sans font-bold text-[18px] text-[#DD5013] whitespace-nowrap tabular-nums">
          {formatValue(spec.kind, value)}
        </span>
      </div>
      <span className="block font-sans text-[13px] text-[#0A0F1A]/60 mt-0.5">{spec.helper}</span>
      <input
        id={id}
        type="range"
        min={spec.min}
        max={spec.max}
        step={spec.step}
        value={Math.min(value, spec.max)}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 w-full accent-[#447BBE]"
      />
    </div>
  );
}

function YesNo({ label, helper, value, onChange }: { label: string; helper: string; value: boolean; onChange: (v: boolean) => void }) {
  const base = "flex-1 rounded-full border-2 px-4 py-2 font-sans font-bold text-[15px] transition-colors";
  const on = "border-[#447BBE] bg-[#447BBE] text-white";
  const off = "border-[#0A0F1A]/15 bg-white text-[#0A0F1A] hover:border-[#447BBE]";
  return (
    <div role="group" aria-label={label}>
      <p className="font-sans font-bold text-[16px] text-[#0A0F1A]">{label}</p>
      <p className="font-sans text-[13px] text-[#0A0F1A]/60 mt-0.5">{helper}</p>
      <div className="mt-3 flex gap-3">
        <button type="button" aria-pressed={value} onClick={() => onChange(true)} className={`${base} ${value ? on : off}`}>
          Yes
        </button>
        <button type="button" aria-pressed={!value} onClick={() => onChange(false)} className={`${base} ${!value ? on : off}`}>
          No
        </button>
      </div>
    </div>
  );
}

/** Phone only: shows the live grade and leak while the results panel is off screen. */
function StickyGradeBar({ letter, score, monthly, visible, onJump }: { letter: string; score: number; monthly: number; visible: boolean; onJump: () => void }) {
  return (
    <div
      aria-hidden={!visible}
      className={`lg:hidden fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#0A0F1A] text-white shadow-[0_-6px_20px_rgba(10,15,26,0.25)] transition-transform duration-200 ${visible ? "translate-y-0" : "translate-y-full"}`}
    >
      <button
        type="button"
        onClick={onJump}
        tabIndex={visible ? 0 : -1}
        className="flex w-full items-center gap-3 py-3 pl-4 pr-24 text-left"
      >
        <span
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-[3px] text-[26px] leading-none"
          style={{ ...LUCKIEST, borderColor: GRADE_COLOR[letter], color: GRADE_COLOR[letter] }}
        >
          {letter}
        </span>
        <span className="min-w-0 font-sans leading-tight">
          <span className="block text-[13px] text-white/70">
            Grade {letter}, <span className="tabular-nums">{score}/100</span>
          </span>
          <span className="block text-[16px] font-bold">
            Leaking <span className="text-[#DD5013] tabular-nums">{money(monthly)}</span> a month
          </span>
        </span>
      </button>
    </div>
  );
}

const SUBMIT_HISTORY_KEY = "ost-report-submits";

function readSubmitHistory(): number[] {
  try {
    const raw = window.localStorage.getItem(SUBMIT_HISTORY_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((n): n is number => typeof n === "number") : [];
  } catch {
    return [];
  }
}

function writeSubmitHistory(history: number[]) {
  try {
    window.localStorage.setItem(SUBMIT_HISTORY_KEY, JSON.stringify(history));
  } catch {
    // Private mode or blocked storage: the database limit still applies.
  }
}

/** Optional: saves the email and scores to the private leads list. Nothing is sent automatically. */
function ReportCapture({ inputs }: { inputs: StressInputs }) {
  const [email, setEmail] = useState("");
  const [business, setBusiness] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "done" | "error" | "limited">("idle");
  const [touched, setTouched] = useState(false);
  const [trap, setTrap] = useState("");
  const bad = touched && !isValidEmail(email);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    const lead = buildReportLead(email, business, inputs);
    if (!lead) return;
    // Bot filled the hidden field: act like it worked, save nothing.
    if (isHoneypotTripped(trap)) {
      setStatus("done");
      return;
    }
    const limit = checkReportRateLimit(readSubmitHistory(), Date.now());
    if (!limit.allowed) {
      setStatus("limited");
      return;
    }
    writeSubmitHistory(limit.history);
    setStatus("saving");
    try {
      // Loaded on submit so the calculator never depends on the database being reachable.
      const { supabase } = await import("@/integrations/supabase/client");
      const { error } = await supabase.from("leads").insert(lead);
      setStatus(error ? "error" : "done");
    } catch {
      setStatus("error");
    }
  };

  if (status === "done") {
    return (
      <div className="rounded-3xl border-2 border-[#447BBE]/30 bg-[#447BBE]/5 p-5 md:p-6" role="status">
        <p className="flex items-center gap-2 font-sans font-bold text-[16px] text-[#0A0F1A]">
          <Check className="h-5 w-5 text-[#447BBE]" aria-hidden="true" /> Got it. Your report is on the way.
        </p>
        <p className="mt-1 font-sans text-[14px] text-[#0A0F1A]/70">Zain will email it to you by hand. No spam, no list selling.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="relative rounded-3xl border-2 border-[#0A0F1A]/10 bg-white p-5 md:p-6">
      <p className="flex items-center gap-2 font-sans font-bold text-[17px] text-[#0A0F1A]">
        <Mail className="h-5 w-5 text-[#DD5013]" aria-hidden="true" /> Email me my full report
      </p>
      <p className="mt-1 font-sans text-[14px] text-[#0A0F1A]/70">Optional. Get your numbers plus what to fix first, written for your business.</p>
      <label htmlFor="ost-email" className="sr-only">Email</label>
      <input
        id="ost-email"
        type="email"
        inputMode="email"
        autoComplete="email"
        required
        placeholder="you@yourbusiness.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={() => setTouched(true)}
        aria-invalid={bad}
        aria-describedby={bad ? "ost-email-err" : undefined}
        className={`mt-4 w-full rounded-xl border-2 px-4 py-3 font-sans text-[16px] text-[#0A0F1A] outline-none focus:border-[#447BBE] ${bad ? "border-[#DD5013]" : "border-[#0A0F1A]/15"}`}
      />
      {bad && <p id="ost-email-err" className="mt-1 font-sans text-[13px] text-[#DD5013]">Please enter a real email.</p>}
      {/* Honeypot: hidden from people and screen readers. Bots that fill it get skipped. */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }}>
        <label htmlFor="ost-hp">Company website</label>
        <input
          id="ost-hp"
          name={REPORT_HONEYPOT_FIELD}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={trap}
          onChange={(e) => setTrap(e.target.value)}
        />
      </div>
      <label htmlFor="ost-business" className="sr-only">Business name</label>
      <input
        id="ost-business"
        type="text"
        autoComplete="organization"
        maxLength={200}
        placeholder="Business name (optional)"
        value={business}
        onChange={(e) => setBusiness(e.target.value)}
        className="mt-3 w-full rounded-xl border-2 border-[#0A0F1A]/15 px-4 py-3 font-sans text-[16px] text-[#0A0F1A] outline-none focus:border-[#447BBE]"
      />
      <button
        type="submit"
        disabled={status === "saving"}
        className="mt-4 w-full rounded-full bg-[#0A0F1A] px-6 py-3 font-sans font-bold text-[16px] text-white transition-colors hover:bg-[#447BBE] disabled:opacity-60"
      >
        {status === "saving" ? "Saving..." : "Send me my report"}
      </button>
      {status === "limited" && (
        <p className="mt-2 font-sans text-[13px] text-[#DD5013]" role="alert">You just sent one. Give it a minute, then try again.</p>
      )}
      {status === "error" && (
        <p className="mt-2 font-sans text-[13px] text-[#DD5013]" role="alert">That did not go through. Try again in a minute.</p>
      )}
      <p className="mt-3 font-sans text-[12px] leading-5 text-[#0A0F1A]/55">
        We save your email and these scores so Zain can send your report. That is it. No auto emails, no list selling.
      </p>
    </form>
  );
}

async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // fall through to the old way
  }
  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}

/** Copies a short, safe score message the owner can text to a friend who owns a business. */
function CopyScore({ inputs }: { inputs: StressInputs }) {
  const text = useMemo(() => shareText(clampInputs(inputs)), [inputs]);
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");
  useEffect(() => {
    if (state === "idle") return;
    const t = window.setTimeout(() => setState("idle"), 2500);
    return () => window.clearTimeout(t);
  }, [state]);

  return (
    <div className="mt-7 border-t border-white/15 pt-6">
      <p className="font-sans text-[13px] font-bold uppercase tracking-[0.2em] text-[#E9E4A6]">Know an owner who needs this?</p>
      <p className="mt-3 rounded-xl bg-white/5 p-3 font-sans text-[14px] leading-6 text-white/80">{text}</p>
      <button
        type="button"
        onClick={async () => setState((await copyToClipboard(text)) ? "copied" : "failed")}
        className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-[#E9E4A6] px-5 py-2.5 font-sans font-bold text-[15px] text-[#E9E4A6] transition-colors hover:bg-[#E9E4A6] hover:text-[#0A0F1A]"
      >
        {state === "copied" ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
        {state === "copied" ? "Copied. Paste it in a text." : "Copy my score"}
      </button>
      <p className="sr-only" role="status">{state === "copied" ? "Score copied to clipboard" : state === "failed" ? "Copy did not work. Select the text above and copy it." : ""}</p>
      {state === "failed" && (
        <p className="mt-2 font-sans text-[13px] text-[#E9E4A6]">Copy did not work here. Press and hold the text above to copy it.</p>
      )}
    </div>
  );
}

function GroupCard({ title, sub, children }: { title: string; sub: string; children: ReactNode }) {
  return (
    <div className="min-w-0 rounded-3xl border-2 border-[#0A0F1A]/10 bg-[#E9E4A6]/30 p-5 sm:p-6 md:p-8">
      <h2 className="text-[26px] md:text-[32px] text-[#0A0F1A]" style={LUCKIEST}>
        {title}
      </h2>
      <p className="font-sans text-[15px] text-[#0A0F1A]/70 mt-1">{sub}</p>
      <div className="mt-6 space-y-8">{children}</div>
    </div>
  );
}

export default function OwnerStressTest() {
  const [inputs, setInputs] = useState<StressInputs>(DEFAULT_INPUTS);

  const setField = <K extends keyof StressInputs>(key: K, value: StressInputs[K]) =>
    setInputs((prev) => ({ ...prev, [key]: value }));

  const result = useMemo(() => {
    const safe = clampInputs(inputs);
    const score = overallScore(safe);
    return {
      monthly: monthlyLeak(safe),
      yearly: yearlyLeak(safe),
      leak: leakScore(safe),
      protection: protectionScore(safe),
      sick: sickRunwayMonths(safe),
      family: familyRunwayMonths(safe),
      score,
      letter: grade(score),
      notes: findings(safe).slice(0, 3),
    };
  }, [inputs]);

  // Sticky bar shows while the visitor is on the inputs and the results panel is off screen.
  const inputsRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const [inputsInView, setInputsInView] = useState(false);
  const [resultsInView, setResultsInView] = useState(false);
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const watch = (el: HTMLElement | null, set: (v: boolean) => void, margin: string) => {
      if (!el) return null;
      const io = new IntersectionObserver(([entry]) => set(entry.isIntersecting), { rootMargin: margin });
      io.observe(el);
      return io;
    };
    const a = watch(inputsRef.current, setInputsInView, "0px 0px -20% 0px");
    const b = watch(resultsRef.current, setResultsInView, "0px 0px -30% 0px");
    return () => {
      a?.disconnect();
      b?.disconnect();
    };
  }, []);
  const showBar = inputsInView && !resultsInView;
  const jumpToResults = () => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-[#0A0F1A]">
      <Helmet>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={CANONICAL} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={CANONICAL} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
      </Helmet>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-14 md:py-20">
        {/* Hero */}
        <section className="text-center">
          <p className="font-mono text-[12px] font-bold uppercase tracking-[0.3em] text-[#447BBE]">
            The Owner Stress Test
          </p>
          <h1 className="mt-4 text-[#0A0F1A] text-[36px] sm:text-[48px] md:text-[64px] leading-[1.05]" style={LUCKIEST}>
            If you stopped working tomorrow,
            <br className="hidden sm:block" /> what breaks first?
          </h1>
          <p className="mt-4 font-sans text-[18px] md:text-[22px] text-[#0A0F1A]/75 max-w-2xl mx-auto">
            Two minutes. Ten questions. One grade. See the money your phone leaks and how long your savings could carry you if you could not work.
          </p>
          <p className="mt-2 font-sans text-[14px] text-[#0A0F1A]/55">No email needed. It all runs in your browser.</p>
        </section>

        <section className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
          {/* Inputs */}
          <div ref={inputsRef} className="min-w-0 space-y-8">
            <GroupCard title="Your phone" sub="Every missed call is a job that went to someone else.">
              {PHONE_SLIDERS.map((spec) => (
                <SliderRow key={spec.key} spec={spec} value={inputs[spec.key]} onChange={(n) => setField(spec.key, n)} />
              ))}
            </GroupCard>

            <GroupCard title="Your safety net" sub="What keeps the lights on if you cannot show up.">
              {SAFETY_SLIDERS.map((spec) => (
                <SliderRow key={spec.key} spec={spec} value={inputs[spec.key]} onChange={(n) => setField(spec.key, n)} />
              ))}
              {TOGGLES.map((t) => (
                <YesNo key={t.key} label={t.label} helper={t.helper} value={inputs[t.key]} onChange={(v) => setField(t.key, v)} />
              ))}
            </GroupCard>
          </div>

          {/* Results */}
          <div ref={resultsRef} className="min-w-0 scroll-mt-24 lg:sticky lg:top-24 h-fit space-y-5" aria-live="polite">
            <div className="rounded-3xl bg-[#0A0F1A] text-white p-6 md:p-8">
              <p className="font-sans text-[13px] font-bold uppercase tracking-[0.2em] text-[#E9E4A6]">Your Owner Stress Grade</p>
              <div className="mt-3 flex items-center gap-5">
                <span
                  aria-label={`Grade ${result.letter}`}
                  className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full border-4 text-[60px] leading-none"
                  style={{ ...LUCKIEST, borderColor: GRADE_COLOR[result.letter], color: GRADE_COLOR[result.letter] }}
                >
                  {result.letter}
                </span>
                <p className="font-sans text-[15px] text-white/75">
                  <span className="block text-[28px] font-bold text-white tabular-nums">{result.score}/100</span>
                  Your phone and your safety net, scored together.
                </p>
              </div>

              <div className="mt-7 border-t border-white/15 pt-6">
                <div className="flex items-baseline justify-between gap-3">
                  <p className="font-sans text-[13px] font-bold uppercase tracking-[0.2em] text-[#E9E4A6]">Leak Score</p>
                  <p className="font-sans font-bold text-[18px] tabular-nums">{result.leak}/100</p>
                </div>
                <p className="mt-3 font-sans text-[14px] text-white/70">Lost to missed calls each month</p>
                <p className="mt-1 text-[44px] md:text-[52px] leading-none text-[#DD5013] break-words" style={LUCKIEST}>
                  {money(result.monthly)}
                </p>
                <p className="mt-2 font-sans text-[15px] text-white/80">
                  That is <span className="font-bold text-white">{money(result.yearly)}</span> a year.
                </p>
              </div>

              <div className="mt-7 border-t border-white/15 pt-6">
                <div className="flex items-baseline justify-between gap-3">
                  <p className="font-sans text-[13px] font-bold uppercase tracking-[0.2em] text-[#E9E4A6]">Stopped Tomorrow Score</p>
                  <p className="font-sans font-bold text-[18px] tabular-nums">{result.protection}/100</p>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[36px] leading-none text-white" style={LUCKIEST}>{months(result.sick)}</p>
                    <p className="mt-1 font-sans text-[13px] text-white/70">months your savings cover if you cannot work</p>
                  </div>
                  <div>
                    <p className="text-[36px] leading-none text-white" style={LUCKIEST}>{months(result.family)}</p>
                    <p className="mt-1 font-sans text-[13px] text-white/70">months your family's bills are covered if you pass away</p>
                  </div>
                </div>
              </div>

              {result.notes.length > 0 && (
                <div className="mt-7 border-t border-white/15 pt-6">
                  <p className="font-sans text-[13px] font-bold uppercase tracking-[0.2em] text-[#E9E4A6]">What breaks first</p>
                  <ol className="mt-3 list-decimal space-y-2 pl-5 font-sans text-[15px] leading-6 text-white/85 marker:font-bold marker:text-[#D97706]">
                    {result.notes.map((note) => (
                      <li key={note} className="pl-1">{note}</li>
                    ))}
                  </ol>
                </div>
              )}

              <CopyScore inputs={inputs} />
            </div>

            <p className="font-sans text-[12px] leading-5 text-[#0A0F1A]/60">{DISCLAIMER}</p>

            <ReportCapture inputs={inputs} />
          </div>
        </section>

        {/* How we got these numbers */}
        <section className="mt-16 max-w-3xl mx-auto" aria-labelledby="ost-method">
          <h2 id="ost-method" className="text-center text-[#0A0F1A] text-[28px] md:text-[40px]" style={LUCKIEST}>
            How we got these numbers
          </h2>
          <p className="mt-2 text-center font-sans text-[16px] text-[#0A0F1A]/70">Simple math. No tricks. Here is every step.</p>
          <ol className="mt-8 space-y-4">
            {methodSteps().map((step, n) => (
              <li key={step.title} className="flex gap-4 rounded-2xl border-2 border-[#0A0F1A]/10 bg-white p-5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E9E4A6] font-sans font-bold text-[15px] text-[#0A0F1A]">
                  {n + 1}
                </span>
                <div className="min-w-0">
                  <h3 className="font-sans font-bold text-[17px] text-[#0A0F1A]">{step.title}</h3>
                  <p className="mt-1 font-sans text-[15px] leading-relaxed text-[#0A0F1A]/75">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* CTAs */}
        <section className="mt-16">
          <h2 className="text-center text-[#0A0F1A] text-[30px] md:text-[44px]" style={LUCKIEST}>
            Fix the weak spot
          </h2>
          <p className="mt-2 text-center font-sans text-[16px] text-[#0A0F1A]/70">Pick one. Both are free to start.</p>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <Link
              to={AI_CHECKUP_PATH}
              className="group flex min-w-0 flex-col rounded-3xl border-2 border-[#0A0F1A]/10 bg-white p-6 md:p-8 transition-all hover:border-[#447BBE] hover:-translate-y-1"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#E9E4A6]">
                <PhoneOff className="h-5 w-5 text-[#0A0F1A]" aria-hidden="true" />
              </span>
              <p className="mt-4 text-[26px] text-[#0A0F1A]" style={LUCKIEST}>Plug the leak</p>
              <p className="mt-2 flex-1 font-sans text-[15px] leading-relaxed text-[#0A0F1A]/75">
                Get a free AI checkup. See how customers find you and what to fix first so fewer calls slip away.
              </p>
              <span className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-[#DD5013] px-6 py-3 font-sans font-bold text-[16px] text-white transition-colors group-hover:bg-[#c24410]">
                Get my free AI checkup
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </Link>

            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex min-w-0 flex-col rounded-3xl border-2 border-[#0A0F1A]/10 bg-white p-6 md:p-8 transition-all hover:border-[#447BBE] hover:-translate-y-1"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#E9E4A6]">
                <ShieldCheck className="h-5 w-5 text-[#0A0F1A]" aria-hidden="true" />
              </span>
              <p className="mt-4 text-[26px] text-[#0A0F1A]" style={LUCKIEST}>Understand your safety net</p>
              <p className="mt-2 flex-1 font-sans text-[15px] leading-relaxed text-[#0A0F1A]/75">
                Book a free 15 minute educational call with Zain, a licensed life and health agent. Look at your numbers together and ask questions. No pressure, no obligation.
              </p>
              <span className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-[#447BBE] px-6 py-3 font-sans font-bold text-[16px] text-white transition-colors group-hover:bg-[#0A0F1A]">
                Book a free call
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </a>
          </div>
        </section>

        <section className="mt-14 max-w-3xl mx-auto text-center">
          <p className="font-sans text-[13px] text-[#0A0F1A]/55">
            Made by Zain Adtani. Runs in your browser. Nothing is saved unless you ask for your report.
          </p>
        </section>
      </main>

      <StickyGradeBar letter={result.letter} score={result.score} monthly={result.monthly} visible={showBar} onJump={jumpToResults} />
    </div>
  );
}
