"use client";

import * as React from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Wallet,
  CalendarClock,
  TrendingDown,
  Calculator,
  ShieldCheck,
  Receipt,
  FileSpreadsheet,
  Sparkles,
  Smartphone,
  ArrowRight,
} from "lucide-react";

export default function HomePage() {
  const [calculatorState, setCalculatorState] = React.useState<{
    amount: string;
    evaluated: boolean;
    result: string | null;
  }>({
    amount: "1200",
    evaluated: false,
    result: null,
  });

  const handleSimulate = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(calculatorState.amount);
    if (isNaN(val) || val <= 0) return;

    // Deterministic simulation logic
    const currentUncommittedLiquidity = 3200;
    const monthlyLivingCost = 1500;
    const safeBuffer = currentUncommittedLiquidity - monthlyLivingCost;

    if (val <= safeBuffer) {
      setCalculatorState((prev) => ({
        ...prev,
        evaluated: true,
        result: `Affordable now. Discretionary liquidity remaining: $${(
          safeBuffer - val
        ).toFixed(2)}.`,
      }));
    } else {
      const deficit = val - safeBuffer;
      const daysToSave = Math.ceil(deficit / 45); // Assuming $45/day savings velocity
      setCalculatorState((prev) => ({
        ...prev,
        evaluated: true,
        result: `Advise deferral. Safe purchase target date in approximately ${daysToSave} days.`,
      }));
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100 selection:bg-amber-500 selection:text-zinc-950">
      {/* Top Navigation */}
      <header className="border-b border-zinc-800/80 bg-zinc-950/60 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-md bg-amber-500 flex items-center justify-center text-zinc-950 font-black text-lg">
              $
            </div>
            <div>
              <span className="font-semibold text-zinc-100 text-base tracking-tight">
                Spend Control
              </span>
              <span className="hidden sm:inline-block text-xs text-zinc-400 ml-2 border-l border-zinc-800 pl-2">
                Financial Decision Engine
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-xs font-medium text-zinc-300 hover:text-amber-400 transition-colors px-2 py-1"
            >
              Sign In
            </Link>
            <Link
              href="/dashboard"
              className="text-xs font-semibold bg-amber-500 text-zinc-950 px-3.5 py-1.5 rounded-md hover:bg-amber-400 transition-colors"
            >
              Command Center
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12 flex flex-col gap-10">
        {/* Hero Section */}
        <div className="flex flex-col gap-4 max-w-3xl">
          <div className="flex items-center gap-2">
            <Badge variant="gold" className="text-xs">
              Public Beta
            </Badge>
            <span className="text-xs text-zinc-400">
              Multi-Tenant Architecture with Row Level Security
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-100 leading-tight">
            Know what you can afford before you commit.
          </h1>
          <p className="text-zinc-400 text-base sm:text-lg leading-relaxed">
            Spend Control connects daily expense tracking with recurring debt obligations,
            giving you forward-looking purchase decision advice rather than retrospective ledgers.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link href="/dashboard">
              <Button variant="gold" className="gap-2">
                <span>Open Command Center</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/dashboard/advisor">
              <Button variant="outline" className="border-zinc-800 hover:border-amber-500/50">
                <span>Evaluate a Purchase</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Financial Metrics Overview */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/dashboard/accounts">
            <Card className="border-zinc-800 bg-zinc-900/40 hover:border-amber-500/40 transition-colors">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-zinc-400">
                  Liquid Cash Balance
                </CardTitle>
                <Wallet className="h-4 w-4 text-amber-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-zinc-100">$8,870.00</div>
                <p className="text-xs text-zinc-500 mt-1">
                  Liquid funds across checking, savings, and cash
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/dashboard/commitments">
            <Card className="border-zinc-800 bg-zinc-900/40 hover:border-amber-500/40 transition-colors">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-zinc-400">
                  Committed Monthly Burn
                </CardTitle>
                <CalendarClock className="h-4 w-4 text-amber-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-zinc-100">$2,190.00</div>
                <p className="text-xs text-zinc-500 mt-1">
                  Active rent, loan EMIs, and utility obligations
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/dashboard/transactions">
            <Card className="border-zinc-800 bg-zinc-900/40 hover:border-amber-500/40 transition-colors">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-zinc-400">
                  Discretionary Daily Limit
                </CardTitle>
                <TrendingDown className="h-4 w-4 text-amber-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-zinc-100">$71.40 / day</div>
                <p className="text-xs text-zinc-500 mt-1">
                  Calculated safe velocity after 60-day debt shield
                </p>
              </CardContent>
            </Card>
          </Link>
        </section>

        {/* Core Platform Capabilities Grid */}
        <section className="flex flex-col gap-4">
          <div>
            <h2 className="text-xl font-bold text-zinc-100 tracking-tight">
              Engineered Financial Intelligence
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              Deterministic calculations paired with generative guidance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="border-zinc-800 bg-zinc-900/30">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2 text-amber-400 mb-1">
                  <ShieldCheck className="h-4 w-4" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                    Debt Shield
                  </span>
                </div>
                <CardTitle className="text-base">Fixed Commitments Guard</CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-zinc-400 leading-relaxed">
                Prioritizes loan EMIs, apartment rent, and insurance due dates before calculating
                available purchasing power.
              </CardContent>
              <CardFooter className="pt-0">
                <Link
                  href="/dashboard/commitments"
                  className="text-xs text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1"
                >
                  <span>Manage Commitments</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </CardFooter>
            </Card>

            <Card className="border-zinc-800 bg-zinc-900/30">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2 text-amber-400 mb-1">
                  <Receipt className="h-4 w-4" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                    Tracking
                  </span>
                </div>
                <CardTitle className="text-base">Daily Expense Ledger</CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-zinc-400 leading-relaxed">
                Log purchases in multiple currencies with instant base-currency conversion and
                category distribution analytics.
              </CardContent>
              <CardFooter className="pt-0">
                <Link
                  href="/dashboard/transactions"
                  className="text-xs text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1"
                >
                  <span>Log Expense</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </CardFooter>
            </Card>

            <Card className="border-zinc-800 bg-zinc-900/30">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2 text-amber-400 mb-1">
                  <FileSpreadsheet className="h-4 w-4" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                    Ingestion
                  </span>
                </div>
                <CardTitle className="text-base">Bank Statement Reconciliation</CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-zinc-400 leading-relaxed">
                Upload CSV bank records with automated column mapping, heuristic categorization,
                and staged row editing.
              </CardContent>
              <CardFooter className="pt-0">
                <Link
                  href="/dashboard/import"
                  className="text-xs text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1"
                >
                  <span>Import Statement</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </CardFooter>
            </Card>

            <Card className="border-zinc-800 bg-zinc-900/30">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2 text-amber-400 mb-1">
                  <Sparkles className="h-4 w-4" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                    Advisory
                  </span>
                </div>
                <CardTitle className="text-base">AI Purchase Evaluator</CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-zinc-400 leading-relaxed">
                Evaluates wishlist items with concrete verdicts (BUY NOW, DEFER, or TARGET DATE)
                supported by mathematical runway proofs.
              </CardContent>
              <CardFooter className="pt-0">
                <Link
                  href="/dashboard/advisor"
                  className="text-xs text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1"
                >
                  <span>Consult Advisor</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </CardFooter>
            </Card>

            <Card className="border-zinc-800 bg-zinc-900/30">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2 text-amber-400 mb-1">
                  <Smartphone className="h-4 w-4" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                    Mobile
                  </span>
                </div>
                <CardTitle className="text-base">PWA and Touch Optimized</CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-zinc-400 leading-relaxed">
                Install directly to iOS or Android home screens with a dedicated bottom navigation
                dock and 44px touch targets.
              </CardContent>
              <CardFooter className="pt-0">
                <Link
                  href="/dashboard"
                  className="text-xs text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1"
                >
                  <span>View Mobile UI</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </CardFooter>
            </Card>

            <Card className="border-zinc-800 bg-zinc-900/30">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2 text-amber-400 mb-1">
                  <Wallet className="h-4 w-4" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                    Multi-Tenant
                  </span>
                </div>
                <CardTitle className="text-base">Row Level Security</CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-zinc-400 leading-relaxed">
                Every record is partitioned by user ID and enforced in PostgreSQL with database-level
                security policies.
              </CardContent>
              <CardFooter className="pt-0">
                <Link
                  href="/login"
                  className="text-xs text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1"
                >
                  <span>Create Account</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* Interactive Feature Demo: Purchase Evaluator Simulator */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <Card className="border-zinc-800 bg-zinc-900/30">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-amber-400" />
                <CardTitle className="text-lg">Purchase Evaluator Simulator</CardTitle>
              </div>
              <CardDescription>
                Test how an upcoming expenditure impacts your liquidity and obligations.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSimulate} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="amount" className="text-sm font-medium text-zinc-300">
                    Target Item Price ($ USD)
                  </label>
                  <input
                    id="amount"
                    type="number"
                    value={calculatorState.amount}
                    onChange={(e) =>
                      setCalculatorState({
                        ...calculatorState,
                        amount: e.target.value,
                        evaluated: false,
                      })
                    }
                    className="h-11 px-3 rounded-md bg-zinc-950 border border-zinc-800 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                    placeholder="Enter target purchase price"
                    required
                  />
                </div>
                <Button type="submit" variant="gold">
                  Evaluate Affordability
                </Button>
              </form>

              {calculatorState.evaluated && calculatorState.result && (
                <div className="mt-4 p-3 rounded-md border border-amber-500/30 bg-amber-500/10 text-zinc-200 text-sm leading-relaxed">
                  <div className="font-semibold text-amber-300 mb-1">Evaluation Output:</div>
                  {calculatorState.result}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-zinc-800 bg-zinc-900/30">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-amber-400" />
                <CardTitle className="text-lg">Ready for Multi-User Launch</CardTitle>
              </div>
              <CardDescription>
                All 8 implementation phases completed and verified.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="flex flex-col gap-2.5 text-sm text-zinc-300">
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-amber-400" />
                  <span>Next.js 15 App Router with TypeScript strict mode</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-amber-400" />
                  <span>PostgreSQL Row Level Security across 100% of tables</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-amber-400" />
                  <span>Deterministic financial math and safety reserves</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-amber-400" />
                  <span>AI Advisor with rate limiting and abuse protection</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-amber-400" />
                  <span>PWA manifest, touch targets, and offline readiness</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Link href="/login" className="w-full">
                <Button variant="outline" className="w-full border-zinc-800 hover:border-amber-500/50">
                  Access Platform
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800/80 bg-zinc-950 py-6 mt-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>Spend Control: Personal Financial Decision Support</p>
          <p>Phase 8: Public Beta Hardening and Multi-User Launch</p>
        </div>
      </footer>
    </div>
  );
}
