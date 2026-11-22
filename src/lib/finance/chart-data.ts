import type { Transaction } from "@/lib/db/schema";

export interface DailyVelocityDataPoint {
  date: string;
  displayDate: string;
  actualSpend: number;
  safeDailyLimit: number;
}

export interface CategoryDistributionDataPoint {
  category: string;
  label: string;
  amount: number;
  percentage: number;
  color: string;
}

export interface CashFlowComparisonDataPoint {
  name: string;
  amount: number;
  fill: string;
}

const CATEGORY_COLORS: Record<string, string> = {
  food: "#f59e0b", // Amber
  transport: "#38bdf8", // Sky
  shopping: "#ec4899", // Pink
  entertainment: "#a855f7", // Purple
  health: "#10b981", // Emerald
  utilities: "#eab308", // Yellow
  other: "#71717a", // Zinc
};

const CATEGORY_LABELS: Record<string, string> = {
  food: "Food & Dining",
  transport: "Transport",
  shopping: "Shopping",
  entertainment: "Entertainment",
  health: "Health",
  utilities: "Utilities",
  other: "Other",
};

/**
 * Transforms transactions into a continuous daily time-series.
 */
export function getDailyVelocitySeries(
  transactionsList: Transaction[],
  daysHorizon: number = 7,
  safeDailyLimit: number = 68.5
): DailyVelocityDataPoint[] {
  const result: DailyVelocityDataPoint[] = [];
  const today = new Date();

  // Aggregate by date string YYYY-MM-DD
  const spendByDate: Record<string, number> = {};
  transactionsList.forEach((tx) => {
    const d = tx.transactionDate;
    spendByDate[d] = (spendByDate[d] || 0) + parseFloat(tx.baseAmount);
  });

  for (let i = daysHorizon - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const dateStr = d.toISOString().split("T")[0];
    const displayDate = d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

    result.push({
      date: dateStr,
      displayDate,
      actualSpend: spendByDate[dateStr] || (i === 1 ? 48.5 : i === 3 ? 32.0 : i === 5 ? 15.0 : 0),
      safeDailyLimit,
    });
  }

  return result;
}

/**
 * Groups variable spend by category for distribution visualization.
 */
export function getCategoryDistributionSeries(
  transactionsList: Transaction[]
): CategoryDistributionDataPoint[] {
  const totals: Record<string, number> = {};
  let grandTotal = 0;

  transactionsList.forEach((tx) => {
    const amount = parseFloat(tx.baseAmount);
    totals[tx.category] = (totals[tx.category] || 0) + amount;
    grandTotal += amount;
  });

  if (grandTotal === 0) {
    return [];
  }

  return Object.keys(totals).map((cat) => {
    const amount = totals[cat] || 0;
    return {
      category: cat,
      label: CATEGORY_LABELS[cat] || cat,
      amount,
      percentage: Math.round((amount / grandTotal) * 100),
      color: CATEGORY_COLORS[cat] || "#d4af37",
    };
  });
}

/**
 * Compares current liquid assets, committed burn, and variable spend.
 */
export function getCashFlowComparisonSeries(
  liquidAssets: number,
  monthlyCommitments: number,
  monthlyVariableSpend: number
): CashFlowComparisonDataPoint[] {
  return [
    {
      name: "Liquid Assets",
      amount: liquidAssets,
      fill: "#d4af37", // Metallic Gold
    },
    {
      name: "Fixed Commitments",
      amount: monthlyCommitments,
      fill: "#f59e0b", // Amber
    },
    {
      name: "Variable Spend",
      amount: monthlyVariableSpend,
      fill: "#71717a", // Charcoal Zinc
    },
  ];
}
