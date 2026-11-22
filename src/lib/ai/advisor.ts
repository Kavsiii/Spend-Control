import { z } from "zod";

export const purchaseEvaluationSchema = z.object({
  itemTitle: z.string().min(2, "Item title must be at least 2 characters."),
  itemPrice: z.number().positive("Item price must be positive."),
  currency: z.string().length(3).default("USD"),
  priority: z.enum(["low", "medium", "high"]).default("medium"),
});

export interface FinancialSnapshot {
  liquidCapital: number;
  monthlyCommittedBurn: number;
  twoMonthSafetyReserve: number;
  uncommittedSurplus: number;
  dailyDiscretionaryBudget: number;
}

export interface PurchaseEvaluationResult {
  verdict: "BUY_NOW" | "DEFER" | "TARGET_DATE";
  verdictLabel: string;
  itemTitle: string;
  itemPrice: number;
  surplusDeficit: number;
  safePurchaseDate: string;
  daysToSave: number;
  recommendedDailySavings: number;
  rationale: string;
  math: FinancialSnapshot;
}

/**
 * Computes deterministic financial snapshot shielding 60 days of fixed commitments + living costs.
 */
export function computeFinancialSnapshot(
  liquidCapital: number,
  monthlyCommittedBurn: number,
  dailyDiscretionaryBudget: number
): FinancialSnapshot {
  // 60-day safety shield: 2 months of debt/rent + 60 days of daily living allowance
  const twoMonthSafetyReserve =
    monthlyCommittedBurn * 2 + dailyDiscretionaryBudget * 60;
  const uncommittedSurplus = liquidCapital - twoMonthSafetyReserve;

  return {
    liquidCapital,
    monthlyCommittedBurn,
    twoMonthSafetyReserve,
    uncommittedSurplus,
    dailyDiscretionaryBudget,
  };
}

/**
 * Evaluates purchase affordability deterministically and generates tailored advisory guidance.
 */
export function evaluatePurchaseAffordability(
  itemTitle: string,
  itemPrice: number,
  snapshot: FinancialSnapshot
): PurchaseEvaluationResult {
  const surplusDeficit = snapshot.uncommittedSurplus - itemPrice;
  const today = new Date();

  if (surplusDeficit >= 0) {
    const safePurchaseDate = today.toISOString().split("T")[0];
    const remainingCushion = surplusDeficit;

    return {
      verdict: "BUY_NOW",
      verdictLabel: "Affordable Now",
      itemTitle,
      itemPrice,
      surplusDeficit,
      safePurchaseDate,
      daysToSave: 0,
      recommendedDailySavings: 0,
      rationale: `You can purchase "${itemTitle}" immediately without jeopardizing upcoming commitments. After setting aside a 60-day debt and living reserve ($${snapshot.twoMonthSafetyReserve.toFixed(
        2
      )}), you will retain $${remainingCushion.toFixed(2)} in uncommitted liquidity.`,
      math: snapshot,
    };
  }

  // Deficit: calculate required savings timeline
  const deficit = Math.abs(surplusDeficit);
  // Recommend saving 30% of daily discretionary allowance
  const dailySavingsRate = Math.max(10, snapshot.dailyDiscretionaryBudget * 0.3);
  const daysToSave = Math.ceil(deficit / dailySavingsRate);

  const targetDateObj = new Date(today);
  targetDateObj.setDate(today.getDate() + daysToSave);
  const safePurchaseDate = targetDateObj.toISOString().split("T")[0];

  const formattedDate = targetDateObj.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return {
    verdict: "DEFER",
    verdictLabel: "Deferral Advised",
    itemTitle,
    itemPrice,
    surplusDeficit,
    safePurchaseDate,
    daysToSave,
    recommendedDailySavings: parseFloat(dailySavingsRate.toFixed(2)),
    rationale: `Purchasing "${itemTitle}" today would breach your 60-day safety reserve by $${deficit.toFixed(
      2
    )}. By setting aside $${dailySavingsRate.toFixed(
      2
    )} per day from discretionary funds, you can safely purchase this item on ${formattedDate} (${daysToSave} days) with zero debt risk.`,
    math: snapshot,
  };
}
