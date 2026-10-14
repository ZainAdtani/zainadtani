import { describe, expect, test } from "bun:test";
import { CHECKUP_DELIVERY_BUSINESS_DAYS, PARTNER_PLAN, SAMPLE_REPORTS } from "./ai-checkup";

describe("AI checkup business rules", () => {
  test("partner plan costs $250 per month", () => expect(PARTNER_PLAN.monthlyPrice).toBe(250));
  test("plan includes one website page", () => expect(PARTNER_PLAN.websitePages).toBe(1));
  test("plan includes four monthly social posts", () => expect(PARTNER_PLAN.socialPosts).toBe(4));
  test("plan includes one monthly Reel", () => expect(PARTNER_PLAN.reels).toBe(1));
  test("plan includes one monthly graphic", () => expect(PARTNER_PLAN.graphics).toBe(1));
  test("plan includes two monthly website updates", () => expect(PARTNER_PLAN.websiteUpdates).toBe(2));
  test("plan includes one monthly Google profile update", () => expect(PARTNER_PLAN.googleProfileUpdates).toBe(1));
  test("monthly check-in is 30 minutes", () => expect(PARTNER_PLAN.checkInMinutes).toBe(30));
  test("report delivery is within one business day", () => expect(CHECKUP_DELIVERY_BUSINESS_DAYS).toBe(1));
  test("Epic Electrical scores are 70, 92, 25, 80", () => expect(SAMPLE_REPORTS[0].scores.map(row => row.value)).toEqual([70, 92, 25, 80]));
  test("S.W.A.T. Plumbing scores are 90, 68, 45, 85", () => expect(SAMPLE_REPORTS[1].scores.map(row => row.value)).toEqual([90, 68, 45, 85]));
  test("Legacy Cakes scores are 45, 75, 80, 60", () => expect(SAMPLE_REPORTS[2].scores.map(row => row.value)).toEqual([45, 75, 80, 60]));
});