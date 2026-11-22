"use client";

import * as React from "react";
import { useActionState } from "react";
import { createCommitmentAction, toggleCommitmentAction } from "./actions";
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
  CalendarClock,
  Plus,
  Clock,
  Car,
  Home,
  Zap,
  Repeat,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import type { Commitment } from "@/lib/db/schema";
import {
  calculateMonthlyCommittedBurn,
  getUpcomingCommitments,
} from "@/lib/finance/calculations";

const initialCommitments: Commitment[] = [
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
    title: "Annual Cloud Infrastructure",
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
  {
    id: "com-4",
    userId: "usr-demo",
    title: "High-Speed Internet",
    category: "utility",
    amount: "80.00",
    currency: "USD",
    frequency: "monthly",
    nextDueDate: "2026-11-28",
    endDate: null,
    isActive: true,
    autoDebit: true,
    notes: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default function CommitmentsPage() {
  const [commitmentsList, setCommitmentsList] = React.useState<Commitment[]>(initialCommitments);
  const [formState, formAction, isPending] = useActionState(createCommitmentAction, null);

  const monthlyBurn = calculateMonthlyCommittedBurn(commitmentsList);
  const upcomingCommitments = getUpcomingCommitments(commitmentsList, 14);

  const handleToggle = (id: string) => {
    setCommitmentsList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isActive: !item.isActive } : item))
    );
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "loan_emi":
        return <Car className="h-4 w-4 text-amber-400" />;
      case "rent":
        return <Home className="h-4 w-4 text-amber-400" />;
      case "utility":
        return <Zap className="h-4 w-4 text-amber-400" />;
      case "subscription":
      default:
        return <Repeat className="h-4 w-4 text-amber-400" />;
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Title & Monthly Burn */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100">
            Fixed Commitments & Debt
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Map out loan EMIs, rent, utilities, and recurring dependencies.
          </p>
        </div>
        <Card className="border-zinc-800 bg-zinc-900/40 px-5 py-3 flex items-center gap-4">
          <div>
            <span className="text-xs uppercase tracking-wider text-zinc-400 font-semibold block">
              Committed Monthly Burn
            </span>
            <span className="text-2xl font-bold text-amber-400">
              ${monthlyBurn.toLocaleString("en-US", { minimumFractionDigits: 2 })} / mo
            </span>
          </div>
          <CalendarClock className="h-7 w-7 text-amber-500/80" />
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Commitments Table / Cards */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Upcoming Due Alert */}
          {upcomingCommitments.length > 0 && (
            <div className="p-4 rounded-lg border border-amber-500/30 bg-amber-500/10 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-sm font-semibold text-amber-300">
                <Clock className="h-4 w-4" />
                <span>Upcoming Obligations Due Soon</span>
              </div>
              <ul className="text-xs text-zinc-300 flex flex-col gap-1.5">
                {upcomingCommitments.map((item) => (
                  <li key={item.id} className="flex justify-between items-center">
                    <span>
                      {item.title} ({item.category.replace("_", " ").toUpperCase()})
                    </span>
                    <span className="font-semibold text-amber-400">
                      ${parseFloat(item.amount).toFixed(2)} in {item.daysUntilDue} day(s)
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex flex-col gap-3">
            <h2 className="text-base font-semibold text-zinc-200">Active Commitments</h2>
            {commitmentsList.map((item) => (
              <Card key={item.id} className="border-zinc-800 bg-zinc-900/30">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-md bg-zinc-800/60">
                      {getCategoryIcon(item.category)}
                    </div>
                    <div>
                      <div className="font-medium text-zinc-100 text-sm flex items-center gap-2">
                        <span>{item.title}</span>
                        <Badge variant="outline" className="text-[10px] py-0 px-1.5">
                          {item.frequency}
                        </Badge>
                      </div>
                      <p className="text-xs text-zinc-500 mt-0.5">
                        Due Date: {item.nextDueDate} {item.autoDebit && "(Auto-debit)"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="font-bold text-zinc-100 text-base">
                        ${parseFloat(item.amount).toFixed(2)}
                      </div>
                      <span className="text-[11px] text-zinc-400">
                        {item.isActive ? "Active" : "Paused"}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleToggle(item.id)}
                      className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                        item.isActive
                          ? "bg-amber-500 text-zinc-950 hover:bg-amber-400"
                          : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                      }`}
                    >
                      {item.isActive ? "Pause" : "Resume"}
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Add Commitment Form */}
        <div>
          <Card className="border-zinc-800 bg-zinc-900/40 sticky top-24">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Plus className="h-4 w-4 text-amber-400" />
                <CardTitle className="text-base">Record Commitment</CardTitle>
              </div>
              <CardDescription>
                Track a loan EMI, rent, or recurring payment.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {formState?.error && (
                <div className="mb-4 p-2.5 rounded-md bg-red-950/40 border border-red-500/40 flex items-start gap-2 text-xs text-red-200">
                  <AlertCircle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                  <span>{formState.error}</span>
                </div>
              )}
              {formState?.success && formState?.message && (
                <div className="mb-4 p-2.5 rounded-md bg-emerald-950/40 border border-emerald-500/40 flex items-start gap-2 text-xs text-emerald-200">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{formState.message}</span>
                </div>
              )}
              <form action={formAction} className="flex flex-col gap-3.5">
                <div className="flex flex-col gap-1">
                  <label htmlFor="title" className="text-xs font-semibold text-zinc-300">
                    Obligation Title
                  </label>
                  <input
                    id="title"
                    name="title"
                    required
                    placeholder="e.g. Home Loan EMI"
                    className="h-10 px-3 rounded-md bg-zinc-950 border border-zinc-800 text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="category" className="text-xs font-semibold text-zinc-300">
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    className="h-10 px-3 rounded-md bg-zinc-950 border border-zinc-800 text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="loan_emi">Loan / Debt EMI</option>
                    <option value="rent">Apartment / House Rent</option>
                    <option value="utility">Utility Bill</option>
                    <option value="subscription">Software / Media Subscription</option>
                    <option value="other">Other Recurring</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="amount" className="text-xs font-semibold text-zinc-300">
                      Amount ($)
                    </label>
                    <input
                      id="amount"
                      name="amount"
                      type="number"
                      step="0.01"
                      min="0.01"
                      required
                      placeholder="0.00"
                      className="h-10 px-3 rounded-md bg-zinc-950 border border-zinc-800 text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label htmlFor="frequency" className="text-xs font-semibold text-zinc-300">
                      Frequency
                    </label>
                    <select
                      id="frequency"
                      name="frequency"
                      className="h-10 px-3 rounded-md bg-zinc-950 border border-zinc-800 text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="monthly">Monthly</option>
                      <option value="quarterly">Quarterly</option>
                      <option value="annual">Annual</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="nextDueDate" className="text-xs font-semibold text-zinc-300">
                    Next Due Date
                  </label>
                  <input
                    id="nextDueDate"
                    name="nextDueDate"
                    type="date"
                    required
                    className="h-10 px-3 rounded-md bg-zinc-950 border border-zinc-800 text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <Button type="submit" variant="gold" className="w-full mt-2" disabled={isPending}>
                  {isPending ? "Recording..." : "Record Fixed Commitment"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
