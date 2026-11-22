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
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Wallet, CalendarClock, TrendingDown, ArrowRight, ShieldCheck, Database } from "lucide-react";

export default function DashboardPage() {
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
        <Card className="border-zinc-800 bg-zinc-900/40">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">
              Liquid Cash Balance
            </CardTitle>
            <Wallet className="h-4 w-4 text-amber-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-zinc-100">$0.00</div>
            <p className="text-xs text-zinc-500 mt-1">
              Connect accounts in Phase 2
            </p>
          </CardContent>
        </Card>

        <Card className="border-zinc-800 bg-zinc-900/40">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">
              Committed Monthly Burn
            </CardTitle>
            <CalendarClock className="h-4 w-4 text-amber-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-zinc-100">$0.00</div>
            <p className="text-xs text-zinc-500 mt-1">
              Register recurring EMIs in Phase 2
            </p>
          </CardContent>
        </Card>

        <Card className="border-zinc-800 bg-zinc-900/40">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">
              Discretionary Daily Limit
            </CardTitle>
            <TrendingDown className="h-4 w-4 text-amber-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-zinc-100">$0.00 / day</div>
            <p className="text-xs text-zinc-500 mt-1">
              Awaiting account balances
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Phase 1 Verification Callout */}
      <Card className="border-zinc-800 bg-zinc-900/30">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Database className="h-5 w-5 text-amber-400" />
            <CardTitle className="text-lg">Phase 1 Database and Auth Foundation: Verified</CardTitle>
          </div>
          <CardDescription>
            Multi-tenant infrastructure is operational.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-zinc-300">
            <div className="p-3 rounded-md bg-zinc-950 border border-zinc-800">
              <span className="font-semibold text-amber-400 block mb-1">Supabase SSR Cookies</span>
              Session tokens managed securely via HTTP-only cookies in server components and middleware.
            </div>
            <div className="p-3 rounded-md bg-zinc-950 border border-zinc-800">
              <span className="font-semibold text-amber-400 block mb-1">PostgreSQL RLS</span>
              Schema configured with Row Level Security isolating records by authenticated user ID.
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center text-xs text-zinc-500">
          <span>Ready for Phase 2: Accounts and Fixed Commitments.</span>
        </CardFooter>
      </Card>
    </div>
  );
}
