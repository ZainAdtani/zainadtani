import { describe, it as test } from "node:test";
import assert from "node:assert/strict";
import {
  ALL_CLEAR_FINDING,
  DEFAULT_INPUTS,
  DISABILITY_BONUS_MONTHS,
  DISCLAIMER,
  type StressInputs,
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
  REPORT_DEFAULT_NAME,
  REPORT_LEAD_TYPE,
  buildReportLead,
  isValidEmail,
  reportSummary,
  SHARE_MAX_LENGTH,
  SHARE_URL,
  shareText,
  methodSteps,
} from "./owner-stress-test.ts";

function expect(actual: unknown) {
  return {
    toBe: (expected: unknown) => assert.strictEqual(actual, expected),
    toEqual: (expected: unknown) => assert.deepStrictEqual(actual, expected),
  };
}

const withInputs = (patch: Partial<StressInputs>): StressInputs => ({ ...DEFAULT_INPUTS, ...patch });

// A well protected owner who misses no calls.
const STRONG: StressInputs = withInputs({
  missedCallPercent: 0,
  emergencySavings: 300000,
  lifeCoverage: 1000000,
  hasDisabilityCoverage: true,
  businessRunsWithoutOwner: true,
});

describe("Owner stress test: default inputs", () => {
  // 40 calls * 4.3333 = 173.332 calls/mo; * 25% missed = 43.333; * 40% close = 17.3332 jobs; * $350 = $6,066.62 -> $6,067
  test("monthly leak is $6,067", () => expect(monthlyLeak(DEFAULT_INPUTS)).toBe(6067));
  // 6,067 * 12 = 72,804
  test("yearly leak is 12 times the monthly leak", () => expect(yearlyLeak(DEFAULT_INPUTS)).toBe(72804));
  // burn = 5,000 household + 6,000 business = 11,000; 15,000 / 11,000 = 1.3636 -> 1.4
  test("sick runway is 1.4 months", () => expect(sickRunwayMonths(DEFAULT_INPUTS)).toBe(1.4));
  // (15,000 savings + 0 life) / 5,000 = 3
  test("family runway is 3 months", () => expect(familyRunwayMonths(DEFAULT_INPUTS)).toBe(3));
  // 100 - 25 = 75
  test("leak score is 75", () => expect(leakScore(DEFAULT_INPUTS)).toBe(75));
  // min(1.4, 3) = 1.4; 1.4 / 24 * 100 = 5.83 -> 6
  test("protection score is 6", () => expect(protectionScore(DEFAULT_INPUTS)).toBe(6));
  // (75 + 6) / 2 = 40.5 -> 41
  test("overall score is 41 and grades F", () => {
    expect(overallScore(DEFAULT_INPUTS)).toBe(41);
    expect(grade(overallScore(DEFAULT_INPUTS))).toBe("F");
  });
});

describe("Owner stress test: runway rules", () => {
  test("disability coverage adds six months to the sick runway", () => {
    expect(DISABILITY_BONUS_MONTHS).toBe(6);
    // 1.3636 + 6 = 7.3636 -> 7.4
    expect(sickRunwayMonths(withInputs({ hasDisabilityCoverage: true }))).toBe(7.4);
  });
  test("disability coverage does not change the family runway", () =>
    expect(familyRunwayMonths(withInputs({ hasDisabilityCoverage: true }))).toBe(3));
  test("a business that runs without the owner drops business costs from the burn", () => {
    // burn = 5,000 only; 15,000 / 5,000 = 3
    expect(sickRunwayMonths(withInputs({ businessRunsWithoutOwner: true }))).toBe(3);
    // min(3, 3) = 3; 3 / 24 * 100 = 12.5 -> 13
    expect(protectionScore(withInputs({ businessRunsWithoutOwner: true }))).toBe(13);
  });
  test("life coverage extends the family runway", () =>
    // (15,000 + 485,000) / 5,000 = 100
    expect(familyRunwayMonths(withInputs({ lifeCoverage: 485000 }))).toBe(100));
  test("zero total burn returns the 120 month cap", () =>
    expect(sickRunwayMonths(withInputs({ monthlyHouseholdExpenses: 0, monthlyBusinessFixedCosts: 0 }))).toBe(120));
  test("zero household expenses with business costs still uses the business burn", () =>
    // 15,000 / 6,000 = 2.5
    expect(sickRunwayMonths(withInputs({ monthlyHouseholdExpenses: 0 }))).toBe(2.5));
  test("zero household expenses returns the 120 month family cap", () =>
    expect(familyRunwayMonths(withInputs({ monthlyHouseholdExpenses: 0 }))).toBe(120));
  test("huge savings cap both runways at 120 months", () => {
    const rich = withInputs({ emergencySavings: 50000000, hasDisabilityCoverage: true });
    expect(sickRunwayMonths(rich)).toBe(120);
    expect(familyRunwayMonths(rich)).toBe(120);
  });
  test("24 or more months on both runways scores 100 protection", () => {
    // sick = 300,000 / 5,000 + 6 = 66; family = 1,300,000 / 5,000 = 260 -> 120
    expect(protectionScore(STRONG)).toBe(100);
  });
});

describe("Owner stress test: clamping", () => {
  test("NaN becomes zero", () => {
    const x = clampInputs(withInputs({ callsPerWeek: NaN, avgJobValue: NaN }));
    expect(x.callsPerWeek).toBe(0);
    expect(x.avgJobValue).toBe(0);
    expect(monthlyLeak(withInputs({ callsPerWeek: NaN }))).toBe(0);
  });
  test("negatives become zero", () => {
    const x = clampInputs(withInputs({ emergencySavings: -500, lifeCoverage: -1, monthlyHouseholdExpenses: -10 }));
    expect([x.emergencySavings, x.lifeCoverage, x.monthlyHouseholdExpenses]).toEqual([0, 0, 0]);
  });
  test("numbers above the limits are capped", () => {
    const x = clampInputs(withInputs({ callsPerWeek: 9999, missedCallPercent: 150, closeRatePercent: 101, avgJobValue: 99999 }));
    expect([x.callsPerWeek, x.missedCallPercent, x.closeRatePercent, x.avgJobValue]).toEqual([500, 100, 100, 50000]);
  });
  test("Infinity is capped instead of breaking the math", () =>
    expect(clampInputs(withInputs({ callsPerWeek: Infinity })).callsPerWeek).toBe(500));
  test("leak score stays inside 0 to 100", () => {
    expect(leakScore(withInputs({ missedCallPercent: 150 }))).toBe(0);
    expect(leakScore(withInputs({ missedCallPercent: -20 }))).toBe(100);
  });
  test("zero missed calls means no leak", () => expect(monthlyLeak(withInputs({ missedCallPercent: 0 }))).toBe(0));
  test("clamping keeps valid defaults unchanged", () => expect(clampInputs(DEFAULT_INPUTS)).toEqual(DEFAULT_INPUTS));
});

describe("Owner stress test: grades", () => {
  test("grade boundaries", () => {
    const cases: Array<[number, string]> = [
      [100, "A"], [90, "A"], [89, "B"], [80, "B"], [79, "C"],
      [70, "C"], [69, "D"], [60, "D"], [59, "F"], [0, "F"],
    ];
    for (const [score, letter] of cases) expect(grade(score)).toBe(letter);
  });
  test("a strong owner scores 100 and grades A", () => {
    expect(overallScore(STRONG)).toBe(100);
    expect(grade(overallScore(STRONG))).toBe("A");
  });
});

describe("Owner stress test: findings", () => {
  test("defaults return at most 3 findings, most urgent first", () => {
    const f = findings(DEFAULT_INPUTS);
    expect(f.length).toBe(3);
    assert.match(f[0], /could not work/);
    assert.match(f[0], /1\.4 months/);
    assert.match(f[1], /\$6,067 a month/);
    assert.match(f[2], /savings alone would cover about 3 months/);
  });
  test("business stopping without the owner shows when there is room", () => {
    const f = findings(withInputs({ missedCallPercent: 0, hasDisabilityCoverage: true }));
    // sick = 7.4 (no alert), leak = 0, no life coverage, business stops
    expect(f.length).toBe(2);
    assert.match(f[0], /savings alone/);
    assert.match(f[1], /stops earning when you stop working/);
  });
  test("a leak of $1,000 or less is not flagged", () => {
    // 10 * 4.3333 * 0.10 * 0.40 * 500 = 86.67 -> $87
    const f = findings({ ...STRONG, callsPerWeek: 10, missedCallPercent: 10, avgJobValue: 500 });
    expect(f).toEqual([ALL_CLEAR_FINDING]);
  });
  test("a strong owner gets one positive line", () => expect(findings(STRONG)).toEqual([ALL_CLEAR_FINDING]));
  test("copy has no dashes as punctuation and no product names", () => {
    const samples = [
      DEFAULT_INPUTS, STRONG,
      withInputs({ missedCallPercent: 0, hasDisabilityCoverage: true }),
      withInputs({ emergencySavings: 5000, monthlyHouseholdExpenses: 5000, businessRunsWithoutOwner: true }),
    ];
    const text = samples.flatMap(findings).join(" ");
    assert.doesNotMatch(text, /[–—]| - /);
    assert.doesNotMatch(text, /\b(term|whole life|universal|annuity|policy|premium|guarantee)/i);
    assert.doesNotMatch(text, /\b(die|dies|dead|not much time)\b/i);
  });
  test("one month reads as singular", () =>
    assert.match(findings(withInputs({ emergencySavings: 11000 }))[0], /about 1 month of bills/));
});

describe("Owner stress test: disclaimer", () => {
  test("disclaimer says educational and names the license", () => {
    assert.match(DISCLAIMER, /^Educational estimate only\./);
    assert.match(DISCLAIMER, /licensed life and health insurance agent in Texas/);
  });
});

describe("email report capture", () => {
  test("accepts a normal email", () => assert.equal(isValidEmail("owner@shop.com"), true));
  test("rejects empty, spaces, and missing domain", () => {
    assert.equal(isValidEmail(""), false);
    assert.equal(isValidEmail("   "), false);
    assert.equal(isValidEmail("owner@shop"), false);
    assert.equal(isValidEmail("owner shop@x.com"), false);
  });
  test("returns null for a bad email so nothing is saved", () =>
    assert.equal(buildReportLead("nope", "Bob's Plumbing", DEFAULT_INPUTS), null));
  test("tags the row as owner-stress-test and lowercases the email", () => {
    const lead = buildReportLead("  Owner@Shop.COM ", "", DEFAULT_INPUTS);
    assert.ok(lead);
    assert.equal(lead.lead_type, REPORT_LEAD_TYPE);
    assert.equal(lead.lead_type, "owner-stress-test");
    assert.equal(lead.email, "owner@shop.com");
  });
  test("uses the business name when given, default name when blank", () => {
    assert.equal(buildReportLead("a@b.co", "  Bob's Plumbing ", DEFAULT_INPUTS)?.name, "Bob's Plumbing");
    assert.equal(buildReportLead("a@b.co", "  Bob's Plumbing ", DEFAULT_INPUTS)?.business_name, "Bob's Plumbing");
    assert.equal(buildReportLead("a@b.co", "", DEFAULT_INPUTS)?.name, REPORT_DEFAULT_NAME);
    assert.equal(buildReportLead("a@b.co", "", DEFAULT_INPUTS)?.business_name, null);
  });
  test("summary carries the grade, leak, and runways for follow up", () => {
    const msg = reportSummary(DEFAULT_INPUTS);
    assert.ok(msg.startsWith("Grade F (41/100)."), msg);
    assert.ok(msg.includes("$6,067/mo"), msg);
    assert.ok(msg.includes("Sick runway 1.4 mo"), msg);
    assert.ok(msg.includes("Family runway 3 mo"), msg);
  });
});

describe("share text", () => {
  const text = shareText(DEFAULT_INPUTS);
  test("includes the grade, the monthly leak, and the link", () => {
    assert.ok(text.includes("got an F"), text);
    assert.ok(text.includes("$6,067 a month"), text);
    assert.ok(text.endsWith(SHARE_URL), text);
  });
  test("fits in a text or tweet", () => assert.ok(text.length <= SHARE_MAX_LENGTH, String(text.length)));
  test("never shares savings, coverage, or family numbers", () => {
    const rich = { ...DEFAULT_INPUTS, emergencySavings: 87000, lifeCoverage: 750000 };
    const t = shareText(rich);
    assert.ok(!t.includes("87,000") && !t.includes("750,000") && !/famil|insur|die/i.test(t), t);
  });
  test("handles zero leak without a $0 line", () => {
    const t = shareText({ ...DEFAULT_INPUTS, missedCallPercent: 0 });
    assert.ok(!t.includes("$0"), t);
  });
  test("uses the right article for each grade", () => {
    assert.ok(shareText({ ...DEFAULT_INPUTS, missedCallPercent: 0, emergencySavings: 1000000 }).includes("got an A"));
    assert.ok(shareText({ ...DEFAULT_INPUTS, missedCallPercent: 60, emergencySavings: 1000000 }).includes("got a C"));
  });
  test("uses no dashes as punctuation", () => assert.ok(!/ [-\u2013\u2014] /.test(text), text));
});

describe("how we got these numbers", () => {
  const steps = methodSteps();
  const all = steps.map(s => s.title + " " + s.body).join(" ");
  test("explains all five parts", () => assert.equal(steps.length, 5));
  test("example leak matches the real math for the defaults", () => assert.ok(all.includes("about $6,067 a month"), all));
  test("states the real weeks per month, disability months, and full score months", () => {
    assert.ok(all.includes("4.33 weeks"));
    assert.ok(all.includes("add 6 months"));
    assert.ok(all.includes("24 months or more scores 100"));
  });
  test("grade cutoffs match grade()", () => {
    assert.equal(grade(90), "A"); assert.equal(grade(80), "B"); assert.equal(grade(70), "C"); assert.equal(grade(60), "D"); assert.equal(grade(59), "F");
    assert.ok(all.includes("90 and up is an A") && all.includes("below 60 is an F"));
  });
  test("says plainly it is an estimate, not a plan", () => assert.ok(all.includes("It is not a plan.")));
  test("uses no dashes as punctuation", () => assert.ok(!/ [-\u2013\u2014] /.test(all)));
});
