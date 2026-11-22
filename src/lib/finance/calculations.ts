import type { Account, Commitment } from "@/lib/db/schema";

/**
 * Pure deterministic calculation engine for Spend Control.
 * All arithmetic is performed without external dependencies or LLM approximation.
 */

/**
 * Calculates total available liquid assets.
 * Excludes credit lines/liabilities from uncommitted liquidity.
 */
export function calculateTotalLiquidBalance(accountsList: Account[]): number {
  return accountsList
    .filter((acc) => acc.type === "bank" || acc.type === "cash")
    .reduce((sum, acc) => {
      const balance = parseFloat(acc.balance);
      return sum + (isNaN(balance) ? 0 : balance);
    }, 0);
}

/**
 * Calculates total credit liabilities across all accounts.
 */
export function calculateTotalCreditDebt(accountsList: Account[]): number {
  return accountsList
    .filter((acc) => acc.type === "credit")
    .reduce((sum, acc) => {
      const balance = parseFloat(acc.balance);
      return sum + (isNaN(balance) ? 0 : balance);
    }, 0);
}

/**
 * Normalizes all active recurring commitments to a standard 30-day monthly burn rate.
 * - Monthly: amount * 1
 * - Quarterly: amount / 3
 * - Annual: amount / 12
 */
export function calculateMonthlyCommittedBurn(commitmentsList: Commitment[]): number {
  return commitmentsList
    .filter((item) => item.isActive)
    .reduce((totalBurn, item) => {
      const amount = parseFloat(item.amount);
      if (isNaN(amount) || amount <= 0) return totalBurn;

      switch (item.frequency) {
        case "quarterly":
          return totalBurn + amount / 3;
        case "annual":
          return totalBurn + amount / 12;
        case "monthly":
        default:
          return totalBurn + amount;
      }
    }, 0);
}

/**
 * Identifies commitments due within the next N days.
 */
export function getUpcomingCommitments(
  commitmentsList: Commitment[],
  daysHorizon: number = 7
): (Commitment & { daysUntilDue: number })[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const horizonDate = new Date(today);
  horizonDate.setDate(today.getDate() + daysHorizon);

  return commitmentsList
    .filter((item) => item.isActive)
    .map((item) => {
      const dueDate = new Date(item.nextDueDate);
      dueDate.setHours(0, 0, 0, 0);
      const diffTime = dueDate.getTime() - today.getTime();
      const daysUntilDue = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return {
        ...item,
        daysUntilDue,
      };
    })
    .filter((item) => item.daysUntilDue >= 0 && item.daysUntilDue <= daysHorizon)
    .sort((a, b) => a.daysUntilDue - b.daysUntilDue);
}

/**
 * Computes discretionary daily spending buffer after accounting for monthly fixed commitments.
 * Formula: (Liquid Balance - Monthly Committed Burn) / 30
 */
export function calculateDiscretionaryDailyBuffer(
  liquidBalance: number,
  monthlyCommittedBurn: number,
  reserveSafetyMarginMonths: number = 1
): number {
  const protectedReserves = monthlyCommittedBurn * reserveSafetyMarginMonths;
  const surplusLiquidity = liquidBalance - protectedReserves;

  if (surplusLiquidity <= 0) {
    return 0;
  }

  // Safe daily discretionary allocation over 30 days
  return Math.max(0, surplusLiquidity / 30);
}
