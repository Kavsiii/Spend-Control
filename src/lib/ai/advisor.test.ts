import {
  computeFinancialSnapshot,
  evaluatePurchaseAffordability,
} from "./advisor";

export function runAdvisorSanityCheck(): boolean {
  // Test case 1: Affordable item
  const snapshot1 = computeFinancialSnapshot(10000, 2000, 50);
  // twoMonthSafetyReserve = (2000 * 2) + (50 * 60) = 4000 + 3000 = 7000
  // uncommittedSurplus = 10000 - 7000 = 3000

  if (snapshot1.twoMonthSafetyReserve !== 7000) {
    throw new Error(`Safety reserve mismatch: expected 7000, got ${snapshot1.twoMonthSafetyReserve}`);
  }
  if (snapshot1.uncommittedSurplus !== 3000) {
    throw new Error(`Surplus mismatch: expected 3000, got ${snapshot1.uncommittedSurplus}`);
  }

  // Evaluate $1200 item
  const res1 = evaluatePurchaseAffordability("Espresso Machine", 1200, snapshot1);
  if (res1.verdict !== "BUY_NOW") {
    throw new Error(`Expected BUY_NOW, got ${res1.verdict}`);
  }
  if (res1.surplusDeficit !== 1800) {
    throw new Error(`Expected surplus of 1800, got ${res1.surplusDeficit}`);
  }

  // Test case 2: Deferral item
  const res2 = evaluatePurchaseAffordability("Luxury Watch", 4500, snapshot1);
  if (res2.verdict !== "DEFER") {
    throw new Error(`Expected DEFER, got ${res2.verdict}`);
  }
  if (res2.daysToSave <= 0) {
    throw new Error(`Expected positive daysToSave, got ${res2.daysToSave}`);
  }

  return true;
}
