// Gumroad store catalog for the Digital Product HQ page.
// Every product below is live and sold through Zain's Gumroad store.
// To add a product, append an entry to FREE_PRODUCTS or PAID_PRODUCTS —
// the page renders the two sections straight from these arrays.

export interface StoreProduct {
  id: string;
  name: string;
  blurb: string;
  /** 0 renders as a FREE chip; anything above 0 renders as $X. */
  price: number;
  url: string;
}

export const STORE_URL = "https://zainadtani.gumroad.com/";

export const FREE_PRODUCTS: StoreProduct[] = [
  {
    id: "10-ai-prompts",
    name: "10 AI Prompts Every Small Business Owner Should Steal",
    blurb: "Copy-paste prompts that save hours every week.",
    price: 0,
    url: "https://zainadtani.gumroad.com/l/10-ai-prompts-small-business",
  },
  {
    id: "ai-daily-checklist",
    name: "The 5-Minute AI Daily Checklist",
    blurb: "7 quick AI tasks to start your day in minutes.",
    price: 0,
    url: "https://zainadtani.gumroad.com/l/ai-daily-checklist",
  },
  {
    id: "monthly-budget-quick-start",
    name: "Monthly Budget Quick-Start",
    blurb: "A 20-minute budget worksheet plus 5 money rules.",
    price: 0,
    url: "https://zainadtani.gumroad.com/l/monthly-budget-quick-start",
  },
  {
    id: "family-protection-checklist",
    name: "Family Protection Checklist",
    blurb: "Wills, beneficiaries, wishes, contacts. One page.",
    price: 0,
    url: "https://zainadtani.gumroad.com/l/family-protection-checklist",
  },
  {
    id: "emergency-fund-starter-sheet",
    name: "Emergency Fund Starter Sheet",
    blurb: "Your first $500, then one month of bills.",
    price: 0,
    url: "https://zainadtani.gumroad.com/l/emergency-fund-starter-sheet",
  },
  {
    id: "ai-prompts-insurance-agents",
    name: "10 AI Prompts for Insurance Agents",
    blurb: "Follow-ups, objections, reminders, referrals.",
    price: 0,
    url: "https://zainadtani.gumroad.com/l/ai-prompts-insurance-agents",
  },
];

export const PAID_PRODUCTS: StoreProduct[] = [
  {
    id: "debt-payoff-tracker-pack",
    name: "Debt Payoff Tracker Pack",
    blurb: "List it, order it, kill it one debt at a time.",
    price: 7,
    url: "https://zainadtani.gumroad.com/l/debt-payoff-tracker-pack",
  },
  {
    id: "monthly-budget-planner",
    name: "86-Page Monthly Budget Planner",
    blurb: "12 months of worksheets, trackers, and bill checklists.",
    price: 9,
    url: "https://zainadtani.gumroad.com/l/monthly-budget-planner",
  },
  {
    id: "final-expense-wishes-organizer",
    name: "Final Expense Wishes Organizer",
    blurb: "Every wish, contact, and account in one place.",
    price: 17,
    url: "https://zainadtani.gumroad.com/l/final-expense-wishes-organizer",
  },
  {
    id: "life-insurance-instagram-templates",
    name: "30 Life Insurance Instagram Templates",
    blurb: "Ready-to-edit posts for agents.",
    price: 27,
    url: "https://zainadtani.gumroad.com/l/life-insurance-instagram-templates",
  },
];
