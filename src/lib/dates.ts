// src/lib/dates.ts
export const monthYear = (d = new Date()) =>
  d.toLocaleString("en-US", { month: "long", year: "numeric" });
