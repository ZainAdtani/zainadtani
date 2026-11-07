export const CALENDLY_URL = "https://calendly.com/zkadtani";
export const AI_CHECKUP_PATH = "/ai-checkup";
export const MISSED_CALL_CALCULATOR_PATH = "/missed-call-calculator";
export const WEEKS_PER_MONTH = 4.3333;
export const DISABILITY_BONUS_MONTHS = 6;
export const MAX_RUNWAY_MONTHS = 120;
export const FULL_PROTECTION_MONTHS = 24;
export const LEAK_ALERT_MONTHLY = 1000;
export const SICK_RUNWAY_ALERT_MONTHS = 3;
export const MAX_FINDINGS = 3;

export type StressInputs = {
  callsPerWeek: number;
  missedCallPercent: number;
  avgJobValue: number;
  closeRatePercent: number;
  monthlyHouseholdExpenses: number;
  monthlyBusinessFixedCosts: number;
  emergencySavings: number;
  lifeCoverage: number;
  hasDisabilityCoverage: boolean;
  businessRunsWithoutOwner: boolean;
};

export type Grade = "A" | "B" | "C" | "D" | "F";

export const DEFAULT_INPUTS: StressInputs = {
  callsPerWeek: 40,
  missedCallPercent: 25,
  avgJobValue: 350,
  closeRatePercent: 40,
  monthlyHouseholdExpenses: 5000,
  monthlyBusinessFixedCosts: 6000,
  emergencySavings: 15000,
  lifeCoverage: 0,
  hasDisabilityCoverage: false,
  businessRunsWithoutOwner: false,
};

export const INPUT_LIMITS = {
  callsPerWeek: { min: 0, max: 500 },
  missedCallPercent: { min: 0, max: 100 },
  avgJobValue: { min: 0, max: 50000 },
  closeRatePercent: { min: 0, max: 100 },
  monthlyHouseholdExpenses: { min: 0, max: 1000000 },
  monthlyBusinessFixedCosts: { min: 0, max: 1000000 },
  emergencySavings: { min: 0, max: 100000000 },
  lifeCoverage: { min: 0, max: 100000000 },
} as const;

export const DISCLAIMER = "Educational estimate only. Not financial, tax, or legal advice, and not a quote or offer of insurance. Real numbers depend on your situation. Booking a call does not obligate you to buy anything. Zain Adtani is a licensed life and health insurance agent in Texas.";

function clampNumber(value: unknown, min: number, max: number): number {
  const n = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(n)) return Number.isNaN(n) ? min : n > 0 ? max : min;
  return Math.min(max, Math.max(min, n));
}

function roundTo(value: number, places: number): number {
  const f = 10 ** places;
  return Math.round(value * f) / f;
}

export function clampInputs(i: StressInputs): StressInputs {
  const src = (i ?? {}) as Partial<StressInputs>;
  const c = (key: keyof typeof INPUT_LIMITS) => clampNumber(src[key], INPUT_LIMITS[key].min, INPUT_LIMITS[key].max);
  return {
    callsPerWeek: c("callsPerWeek"),
    missedCallPercent: c("missedCallPercent"),
    avgJobValue: c("avgJobValue"),
    closeRatePercent: c("closeRatePercent"),
    monthlyHouseholdExpenses: c("monthlyHouseholdExpenses"),
    monthlyBusinessFixedCosts: c("monthlyBusinessFixedCosts"),
    emergencySavings: c("emergencySavings"),
    lifeCoverage: c("lifeCoverage"),
    hasDisabilityCoverage: Boolean(src.hasDisabilityCoverage),
    businessRunsWithoutOwner: Boolean(src.businessRunsWithoutOwner),
  };
}

/** Dollars lost per month to missed calls, rounded to the nearest dollar. */
export function monthlyLeak(i: StressInputs): number {
  const x = clampInputs(i);
  return Math.round(
    x.callsPerWeek * WEEKS_PER_MONTH * (x.missedCallPercent / 100) * (x.closeRatePercent / 100) * x.avgJobValue,
  );
}

export function yearlyLeak(i: StressInputs): number {
  return monthlyLeak(i) * 12;
}

/** Months the household and business keep going if the owner is alive but cannot work. One decimal, capped at 120. */
export function sickRunwayMonths(i: StressInputs): number {
  const x = clampInputs(i);
  const burn = x.monthlyHouseholdExpenses + (x.businessRunsWithoutOwner ? 0 : x.monthlyBusinessFixedCosts);
  if (burn <= 0) return MAX_RUNWAY_MONTHS;
  const months = x.emergencySavings / burn + (x.hasDisabilityCoverage ? DISABILITY_BONUS_MONTHS : 0);
  return roundTo(Math.min(MAX_RUNWAY_MONTHS, months), 1);
}

/** Months the family keeps going if the owner dies. One decimal, capped at 120. */
export function familyRunwayMonths(i: StressInputs): number {
  const x = clampInputs(i);
  if (x.monthlyHouseholdExpenses <= 0) return MAX_RUNWAY_MONTHS;
  const months = (x.emergencySavings + x.lifeCoverage) / x.monthlyHouseholdExpenses;
  return roundTo(Math.min(MAX_RUNWAY_MONTHS, months), 1);
}

/** 0..100, where 100 means no calls are missed. */
export function leakScore(i: StressInputs): number {
  const x = clampInputs(i);
  return Math.round(100 - x.missedCallPercent);
}

/** 0..100, from the weaker of the two runways. 24+ months scores 100. */
export function protectionScore(i: StressInputs): number {
  const months = Math.min(sickRunwayMonths(i), familyRunwayMonths(i));
  return Math.round((Math.min(months, FULL_PROTECTION_MONTHS) / FULL_PROTECTION_MONTHS) * 100);
}

export function overallScore(i: StressInputs): number {
  return Math.round((leakScore(i) + protectionScore(i)) / 2);
}

export function grade(score: number): Grade {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 60) return "D";
  return "F";
}

function dollars(n: number): string {
  return "$" + Math.round(n).toLocaleString("en-US");
}

function months(n: number): string {
  return n === 1 ? "1 month" : `${n} months`;
}

export const ALL_CLEAR_FINDING = "Your numbers look strong. Run this test again once a year or when life changes.";

/** Up to 3 plain findings, most urgent first. */
export function findings(i: StressInputs): string[] {
  const x = clampInputs(i);
  const out: string[] = [];
  const sick = sickRunwayMonths(x);
  const leak = monthlyLeak(x);

  if (sick < SICK_RUNWAY_ALERT_MONTHS) {
    out.push(`If you got hurt and could not work, your savings would cover about ${months(sick)} of bills. That is worth a closer look.`);
  }
  if (leak > LEAK_ALERT_MONTHLY) {
    out.push(`Missed calls may cost you about ${dollars(leak)} a month. That is ${dollars(leak * 12)} a year walking out the door.`);
  }
  if (x.lifeCoverage <= 0 && x.monthlyHouseholdExpenses > 0) {
    out.push(`If you passed away, savings alone would cover about ${months(familyRunwayMonths(x))} of your family's bills.`);
  }
  if (!x.businessRunsWithoutOwner) {
    out.push("Your business stops earning when you stop working. It helps to plan how bills get paid while you are out.");
  }

  if (out.length === 0) return [ALL_CLEAR_FINDING];
  return out.slice(0, MAX_FINDINGS);
}

// ---------------------------------------------------------------------------
// Email capture: "Email me my full report"
// Saved to the existing private `leads` table (public insert, no public reads).
// No emails are sent automatically. Zain exports the list and follows up by hand.
// ---------------------------------------------------------------------------

export const REPORT_LEAD_TYPE = "owner-stress-test";
export const REPORT_DEFAULT_NAME = "Owner Stress Test visitor";
export const REPORT_MAX_FIELD = 200;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isValidEmail(email: string): boolean {
  const e = (email ?? "").trim();
  return e.length > 0 && e.length <= REPORT_MAX_FIELD && EMAIL_PATTERN.test(e);
}

export type ReportLead = {
  name: string;
  email: string;
  lead_type: string;
  business_name: string | null;
  message: string;
};

/** One plain line Zain can read in the export to know what to follow up on. */
export function reportSummary(i: StressInputs): string {
  const x = clampInputs(i);
  const score = overallScore(x);
  return [
    `Grade ${grade(score)} (${score}/100).`,
    `Leak ${dollars(monthlyLeak(x))}/mo, ${dollars(yearlyLeak(x))}/yr.`,
    `Sick runway ${sickRunwayMonths(x)} mo. Family runway ${familyRunwayMonths(x)} mo.`,
    `Inputs: ${x.callsPerWeek} calls/wk, ${x.missedCallPercent}% missed, ${dollars(x.avgJobValue)} job, ${x.closeRatePercent}% close,`,
    `${dollars(x.monthlyHouseholdExpenses)} home, ${dollars(x.monthlyBusinessFixedCosts)} business, ${dollars(x.emergencySavings)} savings,`,
    `${dollars(x.lifeCoverage)} life, disability ${x.hasDisabilityCoverage ? "yes" : "no"}, runs without owner ${x.businessRunsWithoutOwner ? "yes" : "no"}.`,
  ].join(" ");
}

/** Builds the row to save. Returns null when the email is not valid. */
export function buildReportLead(email: string, businessName: string, i: StressInputs): ReportLead | null {
  if (!isValidEmail(email)) return null;
  const business = (businessName ?? "").trim().slice(0, REPORT_MAX_FIELD);
  return {
    name: business || REPORT_DEFAULT_NAME,
    email: email.trim().toLowerCase(),
    lead_type: REPORT_LEAD_TYPE,
    business_name: business || null,
    message: reportSummary(i),
  };
}

// ---------------------------------------------------------------------------
// Share: "Copy my score"
// Only the grade and the phone leak go in the text. Never savings, coverage,
// or family numbers, since the owner is sending this to a friend.
// ---------------------------------------------------------------------------

export const SHARE_URL = "https://zainadtani.com/owner-stress-test";
export const SHARE_MAX_LENGTH = 280;

export function shareText(i: StressInputs, url: string = SHARE_URL): string {
  const x = clampInputs(i);
  const letter = grade(overallScore(x));
  const leak = monthlyLeak(x);
  const leakLine = leak > 0
    ? `My phone may be leaking about ${dollars(leak)} a month in missed calls.`
    : "My phone is not leaking jobs. Nice.";
  const article = letter === "A" || letter === "F" ? "an" : "a";
  return `I just took the Owner Stress Test and got ${article} ${letter}. ${leakLine} Takes 2 minutes, no email needed. Run yours: ${url}`;
}

// ---------------------------------------------------------------------------
// "How we got these numbers": plain words, built from the same constants the
// math uses, so the explanation can never drift from the real formula.
// ---------------------------------------------------------------------------

export type MethodStep = { title: string; body: string };

export function methodSteps(): MethodStep[] {
  const ex = clampInputs(DEFAULT_INPUTS);
  return [
    {
      title: "Missed call leak",
      body: `Calls each week, times ${WEEKS_PER_MONTH.toFixed(2)} weeks in a month, times the share you miss, times the share that turn into jobs, times what one job is worth. Example: ${ex.callsPerWeek} calls, ${ex.missedCallPercent}% missed, ${ex.closeRatePercent}% booked, ${dollars(ex.avgJobValue)} a job comes to about ${dollars(monthlyLeak(ex))} a month.`,
    },
    {
      title: "If you get hurt or sick",
      body: `Your savings divided by your monthly bills. If the business stops earning without you, business bills count too. If you have disability coverage, we add ${DISABILITY_BONUS_MONTHS} months as a simple stand in. It is not a promise of what any plan pays. Real coverage depends on your plan.`,
    },
    {
      title: "If you pass away",
      body: "Your savings plus any life insurance payout, divided by your home bills. This shows how many months your family could keep paying the bills.",
    },
    {
      title: "Your scores and grade",
      body: `Leak Score is 100 minus the share of calls you miss. Stopped Tomorrow Score uses the shorter of your two runways. ${FULL_PROTECTION_MONTHS} months or more scores 100. Your grade is the average of both: 90 and up is an A, 80 is a B, 70 is a C, 60 is a D, and below 60 is an F.`,
    },
    {
      title: "What this leaves out",
      body: "Taxes, debts, a spouse's income, other income, and how long any payout takes to arrive. Every number here is a rough estimate to start a conversation. It is not a plan.",
    },
  ];
}
