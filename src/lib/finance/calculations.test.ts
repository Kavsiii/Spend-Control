import {
  calculateTotalLiquidBalance,
  calculateMonthlyCommittedBurn,
  calculateDiscretionaryDailyBuffer,
} from "./calculations";
import type { Account, Commitment } from "@/lib/db/schema";

// Deterministic assertion test suite
export function runFinancialCalculationsSanityCheck() {
  const mockAccounts: Account[] = [
    {
      id: "1",
      userId: "u1",
      name: "Checking",
      type: "bank",
      balance: "5000.00",
      currency: "USD",
      isPrimary: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "2",
      userId: "u1",
      name: "Cash Safe",
      type: "cash",
      balance: "1200.50",
      currency: "USD",
      isPrimary: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "3",
      userId: "u1",
      name: "Credit Card",
      type: "credit",
      balance: "850.00",
      currency: "USD",
      isPrimary: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  // Liquidity should include Bank ($5000) + Cash ($1200.50) = $6200.50 (excluding credit liability)
  const totalLiquidity = calculateTotalLiquidBalance(mockAccounts);
  if (Math.abs(totalLiquidity - 6200.5) > 0.001) {
    throw new Error(`Total liquidity calculation failed: expected 6200.5, got ${totalLiquidity}`);
  }

  const mockCommitments: Commitment[] = [
    {
      id: "c1",
      userId: "u1",
      title: "Car Loan EMI",
      category: "loan_emi",
      amount: "450.00",
      currency: "USD",
      frequency: "monthly",
      nextDueDate: "2026-12-01",
      endDate: "2028-12-01",
      isActive: true,
      autoDebit: true,
      notes: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "c2",
      userId: "u1",
      title: "Car Insurance",
      category: "utility",
      amount: "300.00",
      currency: "USD",
      frequency: "quarterly", // 300 / 3 = $100 / month
      nextDueDate: "2027-01-15",
      endDate: null,
      isActive: true,
      autoDebit: false,
      notes: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "c3",
      userId: "u1",
      title: "Annual Tech Subscriptions",
      category: "subscription",
      amount: "240.00",
      currency: "USD",
      frequency: "annual", // 240 / 12 = $20 / month
      nextDueDate: "2027-08-01",
      endDate: null,
      isActive: true,
      autoDebit: false,
      notes: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  // Monthly burn: 450 + 100 + 20 = $570.00 / month
  const monthlyBurn = calculateMonthlyCommittedBurn(mockCommitments);
  if (Math.abs(monthlyBurn - 570) > 0.001) {
    throw new Error(`Monthly burn calculation failed: expected 570, got ${monthlyBurn}`);
  }

  // Daily buffer: (6200.50 - 570) / 30 = 5630.50 / 30 = 187.6833...
  const dailyBuffer = calculateDiscretionaryDailyBuffer(totalLiquidity, monthlyBurn, 1);
  if (dailyBuffer <= 0 || Math.abs(dailyBuffer - 187.68333) > 0.01) {
    throw new Error(`Daily buffer calculation failed: got ${dailyBuffer}`);
  }

  return true;
}
