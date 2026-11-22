"use client";

import * as React from "react";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Wallet,
  CalendarClock,
  TrendingDown,
  ArrowRight,
  Building2,
  Car,
  Receipt,
  BarChart3,
  PieChart as PieIcon,
  Activity,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { OnboardingWizard, type OnboardingData } from "@/components/onboarding-wizard";
import {
  calculateTotalLiquidBalance,
  calculateMonthlyCommittedBurn,
  calculateDiscretionaryDailyBuffer,
} from "@/lib/finance/calculations";
import {
  getDailyVelocitySeries,
  getCategoryDistributionSeries,
  getCashFlowComparisonSeries,
} from "@/lib/finance/chart-data";
import { DailyBurnChart } from "@/components/charts/daily-burn-chart";
import { CategoryDonutChart } from "@/components/charts/category-donut-chart";
import { CashFlowBarChart } from "@/components/charts/cash-flow-bar-chart";
import type { Account, Commitment, Transaction } from "@/lib/db/schema";

const demoAccounts: Account[] = [
  {
    id: "acc-1",
    userId: "usr-demo",
    name: "Primary Checking",
    type: "bank",
    balance: "5420.00",
    currency: "USD",
    isPrimary: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "acc-2",
    userId: "usr-demo",
    name: "High-Yield Savings",
    type: "bank",
    balance: "3000.00",
    currency: "USD",
    isPrimary: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "acc-3",
    userId: "usr-demo",
    name: "Emergency Cash",
    type: "cash",
    balance: "450.00",
    currency: "USD",
    isPrimary: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const demoCommitments: Commitment[] = [
  {
    id: "com-1",
    userId: "usr-demo",
    title: "Vehicle Loan EMI",
    category: "loan_emi",
    amount: "420.00",
    currency: "USD",
    frequency: "monthly",
    nextDueDate: "2026-12-05",
    endDate: "2028-06-01",
    isActive: true,
    autoDebit: true,
    notes: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "com-2",
    userId: "usr-demo",
    title: "Apartment Rent",
    category: "rent",
    amount: "1450.00",
    currency: "USD",
    frequency: "monthly",
    nextDueDate: "2026-12-01",
    endDate: null,
    isActive: true,
    autoDebit: true,
    notes: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "com-3",
    userId: "usr-demo",
    title: "Annual Tech Subscriptions",
    category: "subscription",
    amount: "240.00",
    currency: "USD",
    frequency: "annual",
    nextDueDate: "2027-04-15",
    endDate: null,
    isActive: true,
    autoDebit: false,
    notes: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const demoTransactions: Transaction[] = [
  {
    id: "tx-1",
    userId: "usr-demo",
    accountId: "acc-1",
    amount: "48.50",
    currency: "USD",
    baseAmount: "48.50",
    type: "expense",
    category: "food",
    transactionDate: "2026-11-22",
    description: "Weekly Grocery Market",
    rawSource: "manual",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "tx-2",
    userId: "usr-demo",
    accountId: "acc-1",
    amount: "15.00",
    currency: "USD",
    baseAmount: "15.00",
    type: "expense",
    category: "transport",
    transactionDate: "2026-11-21",
    description: "Metro Train Card Reload",
    rawSource: "manual",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "tx-3",
    userId: "usr-demo",
    accountId: "acc-1",
    amount: "32.00",
    currency: "USD",
    baseAmount: "32.00",
    type: "expense",
    category: "food",
    transactionDate: "2026-11-20",
    description: "Dinner with Colleagues",
    rawSource: "manual",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "tx-4",
    userId: "usr-demo",
    accountId: "acc-1",
    amount: "85.00",
    currency: "USD",
    baseAmount: "85.00",
    type: "expense",
    category: "shopping",
    transactionDate: "2026-11-19",
    description: "Warm Winter Jacket",
    rawSource: "manual",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "tx-5",
    userId: "usr-demo",
    accountId: "acc-1",
    amount: "14.50",
    currency: "USD",
    baseAmount: "14.50",
    type: "expense",
    category: "entertainment",
    transactionDate: "2026-11-18",
    description: "Cinema Matinee Ticket",
    rawSource: "manual",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default function DashboardPage() {
  const [timeHorizon, setTimeHorizon] = React.useState<7 | 30 | 90>(7);
  const [showOnboarding, setShowOnboarding] = React.useState(false);
  const [baseCurrency, setBaseCurrency] = React.useState("USD");

  const totalLiquidity = calculateTotalLiquidBalance(demoAccounts);
  const monthlyBurn = calculateMonthlyCommittedBurn(demoCommitments);
  const dailyBuffer = calculateDiscretionaryDailyBuffer(totalLiquidity, monthlyBurn, 1);
  const totalVariableSpend = demoTransactions.reduce(
    (sum, t) => sum + parseFloat(t.baseAmount),
    0
  );

  const dailyVelocityData = getDailyVelocitySeries(demoTransactions, timeHorizon, dailyBuffer);
  const categoryData = getCategoryDistributionSeries(demoTransactions);
  const cashFlowData = getCashFlowComparisonSeries(
    totalLiquidity,
    monthlyBurn,
    totalVariableSpend
  );

  return (
    <div className="flex flex-col gap-8">
      {/* Onboarding Wizard Modal */}
      <OnboardingWizard
        isOpen={showOnboarding}
        onClose={() => setShowOnboarding(false)}
        onComplete={(data: OnboardingData) => {
          setBaseCurrency(data.baseCurrency);
        }}
      />

      {/* Welcome Hero */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100">
            Financial Command Center
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Visual intelligence tracking your liquidity, commitments, and daily burn velocity.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setShowOnboarding(true)}
            className="text-xs gap-1.5 border-zinc-800 hover:border-amber-500/50"
          >
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            <span>Setup Guide</span>
          </Button>
          <Badge variant="gold">Base Currency: {baseCurrency}</Badge>
          <Badge variant="secondary">RLS: Active</Badge>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/dashboard/accounts">
          <Card className="border-zinc-800 bg-zinc-900/40 hover:border-amber-500/40 transition-colors cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-zinc-400">
                Liquid Cash Balance
              </CardTitle>
              <Wallet className="h-4 w-4 text-amber-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-zinc-100">
                ${totalLiquidity.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </div>
              <p className="text-xs text-amber-400/90 mt-1 flex items-center gap-1">
                <span>Manage {demoAccounts.length} accounts</span>
                <ArrowRight className="h-3 w-3" />
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/commitments">
          <Card className="border-zinc-800 bg-zinc-900/40 hover:border-amber-500/40 transition-colors cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-zinc-400">
                Committed Monthly Burn
              </CardTitle>
              <CalendarClock className="h-4 w-4 text-amber-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-zinc-100">
                ${monthlyBurn.toLocaleString("en-US", { minimumFractionDigits: 2 })} / mo
              </div>
              <p className="text-xs text-amber-400/90 mt-1 flex items-center gap-1">
                <span>View {demoCommitments.length} fixed obligations</span>
                <ArrowRight className="h-3 w-3" />
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/transactions">
          <Card className="border-zinc-800 bg-zinc-900/40 hover:border-amber-500/40 transition-colors cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-zinc-400">
                Discretionary Daily Limit
              </CardTitle>
              <TrendingDown className="h-4 w-4 text-amber-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-zinc-100">
                ${dailyBuffer.toFixed(2)} / day
              </div>
              <p className="text-xs text-amber-400/90 mt-1 flex items-center gap-1">
                <span>Track variable expenses</span>
                <ArrowRight className="h-3 w-3" />
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Visual Analytics Section (Phase 4) */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-zinc-100 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-amber-400" />
              <span>Cash Flow Analytics</span>
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              Interactive visualizations answering key financial control questions.
            </p>
          </div>

          {/* Time Horizon Filter */}
          <div className="flex items-center gap-1 bg-zinc-900/60 border border-zinc-800 p-1 rounded-md text-xs">
            <button
              type="button"
              onClick={() => setTimeHorizon(7)}
              className={`px-2.5 py-1 rounded transition-colors font-medium ${
                timeHorizon === 7
                  ? "bg-amber-500 text-zinc-950"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Last 7 Days
            </button>
            <button
              type="button"
              onClick={() => setTimeHorizon(30)}
              className={`px-2.5 py-1 rounded transition-colors font-medium ${
                timeHorizon === 30
                  ? "bg-amber-500 text-zinc-950"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Current Month
            </button>
            <button
              type="button"
              onClick={() => setTimeHorizon(90)}
              className={`px-2.5 py-1 rounded transition-colors font-medium ${
                timeHorizon === 90
                  ? "bg-amber-500 text-zinc-950"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Last 90 Days
            </button>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Question 1: Daily Velocity vs Safe Limit */}
          <Card className="border-zinc-800 bg-zinc-900/30">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold text-zinc-200 flex items-center gap-2">
                  <Activity className="h-4 w-4 text-amber-400" />
                  <span>Are you spending within your daily safe allowance?</span>
                </CardTitle>
                <Badge variant="outline" className="text-[10px]">
                  Daily Velocity
                </Badge>
              </div>
              <CardDescription>
                Area curve shows actual outflow compared to your ${dailyBuffer.toFixed(2)} / day baseline.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DailyBurnChart data={dailyVelocityData} />
            </CardContent>
          </Card>

          {/* Question 2: Category Distribution */}
          <Card className="border-zinc-800 bg-zinc-900/30">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold text-zinc-200 flex items-center gap-2">
                  <PieIcon className="h-4 w-4 text-amber-400" />
                  <span>Where is your variable discretionary money going?</span>
                </CardTitle>
                <Badge variant="outline" className="text-[10px]">
                  Categories
                </Badge>
              </div>
              <CardDescription>
                Relative proportion of retail, dining, transport, and leisure expenses.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CategoryDonutChart data={categoryData} />
            </CardContent>
          </Card>

          {/* Question 3: Monthly Liquidity Cushion */}
          <Card className="border-zinc-800 bg-zinc-900/30 lg:col-span-2">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold text-zinc-200 flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-amber-400" />
                  <span>How much liquid cushion remains after fixed monthly obligations?</span>
                </CardTitle>
                <Badge variant="outline" className="text-[10px]">
                  Capital Overview
                </Badge>
              </div>
              <CardDescription>
                Comparing total liquid capital against committed debt burden and variable outflow.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CashFlowBarChart data={cashFlowData} />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Navigation Footer */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link href="/dashboard/accounts">
          <Card className="border-zinc-800 bg-zinc-900/20 hover:border-zinc-700 transition-colors cursor-pointer p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-400">
                <Building2 className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-zinc-200">Bank Accounts</h3>
                <p className="text-xs text-zinc-400">Manage cash balances</p>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-zinc-400" />
          </Card>
        </Link>

        <Link href="/dashboard/commitments">
          <Card className="border-zinc-800 bg-zinc-900/20 hover:border-zinc-700 transition-colors cursor-pointer p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-400">
                <Car className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-zinc-200">Loans & EMIs</h3>
                <p className="text-xs text-zinc-400">Manage debt payments</p>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-zinc-400" />
          </Card>
        </Link>

        <Link href="/dashboard/transactions">
          <Card className="border-zinc-800 bg-zinc-900/20 hover:border-zinc-700 transition-colors cursor-pointer p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-400">
                <Receipt className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-zinc-200">Daily Expenses</h3>
                <p className="text-xs text-zinc-400">Log retail transactions</p>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-zinc-400" />
          </Card>
        </Link>
      </div>
    </div>
  );
}
