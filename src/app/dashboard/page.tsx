import * as React from "react";
import Link from "next/link";
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
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Building2,
  Car,
} from "lucide-react";
import {
  calculateTotalLiquidBalance,
  calculateMonthlyCommittedBurn,
  calculateDiscretionaryDailyBuffer,
} from "@/lib/finance/calculations";
import type { Account, Commitment } from "@/lib/db/schema";

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
    frequency: "annual", // $20/mo
    nextDueDate: "2027-04-15",
    endDate: null,
    isActive: true,
    autoDebit: false,
    notes: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default function DashboardPage() {
  const totalLiquidity = calculateTotalLiquidBalance(demoAccounts);
  const monthlyBurn = calculateMonthlyCommittedBurn(demoCommitments);
  const dailyBuffer = calculateDiscretionaryDailyBuffer(totalLiquidity, monthlyBurn, 1);

  return (
    <div className="flex flex-col gap-8">
      {/* Welcome Hero */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100">
            Financial Command Center
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Scoped to your tenant session. All queries filtered by PostgreSQL Row Level Security.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="gold">Base Currency: USD</Badge>
          <Badge variant="secondary">RLS: Active</Badge>
        </div>
      </div>

      {/* Financial Snapshot Cards */}
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

        <Card className="border-zinc-800 bg-zinc-900/40">
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
            <p className="text-xs text-zinc-500 mt-1">
              Calculated safe daily runway
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Access Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link href="/dashboard/accounts">
          <Card className="border-zinc-800 bg-zinc-900/30 hover:border-zinc-700 transition-colors cursor-pointer p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-400">
                <Building2 className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-zinc-200">Bank Accounts & Wallets</h3>
                <p className="text-xs text-zinc-400">Register new liquid sources or credit limits</p>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-zinc-400" />
          </Card>
        </Link>

        <Link href="/dashboard/commitments">
          <Card className="border-zinc-800 bg-zinc-900/30 hover:border-zinc-700 transition-colors cursor-pointer p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-400">
                <Car className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-zinc-200">Loans, Rent & EMIs</h3>
                <p className="text-xs text-zinc-400">Track recurring debt obligations and upcoming due dates</p>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-zinc-400" />
          </Card>
        </Link>
      </div>
    </div>
  );
}
