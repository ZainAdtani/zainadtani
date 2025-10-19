import { Subscription } from '@/types/subscription';

export function parseAmount(amount: string): number {
  // Handle unknown/empty amounts
  if (amount === '—' || amount.includes('$__') || !amount) return 0;

  // Extract numeric values
  const match = amount.match(/\$?([\d.]+)(?:[-–]([\d.]+))?/);
  if (!match) return 0;

  const first = parseFloat(match[1]);
  const second = match[2] ? parseFloat(match[2]) : null;

  // If range, use midpoint
  if (second) {
    return (first + second) / 2;
  }

  return first;
}

export function normalizeToMonthly(subscription: Subscription): number {
  const amount = parseAmount(subscription.amount);
  
  if (subscription.cadence === 'Yearly') {
    return amount / 12;
  }
  
  if (subscription.cadence === 'Unknown') {
    return 0;
  }
  
  return amount;
}

export function calculateTotals(subscriptions: Subscription[]) {
  const activeSubscriptions = subscriptions.filter(s => !s.paused);
  
  const monthly = activeSubscriptions.reduce(
    (sum, sub) => sum + normalizeToMonthly(sub),
    0
  );
  
  const yearly = monthly * 12;
  
  return {
    monthly: monthly.toFixed(2),
    yearly: yearly.toFixed(2),
    count: activeSubscriptions.length,
  };
}
