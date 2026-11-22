"use client";

import * as React from "react";
import { useActionState } from "react";
import { createTransactionAction, deleteTransactionAction } from "./actions";
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
  Receipt,
  Plus,
  Search,
  Trash2,
  Utensils,
  Car,
  ShoppingBag,
  Film,
  HeartPulse,
  Zap,
  Tag,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import type { Transaction } from "@/lib/db/schema";

const initialTransactions: Transaction[] = [
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

const categories = [
  { id: "all", label: "All" },
  { id: "food", label: "Food & Dining" },
  { id: "transport", label: "Transport" },
  { id: "shopping", label: "Shopping" },
  { id: "entertainment", label: "Entertainment" },
  { id: "health", label: "Health" },
  { id: "utilities", label: "Utilities" },
  { id: "other", label: "Other" },
];

export default function TransactionsPage() {
  const [transactionsList, setTransactionsList] = React.useState<Transaction[]>(initialTransactions);
  const [selectedCategory, setSelectedCategory] = React.useState("all");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [formState, formAction, isPending] = useActionState(createTransactionAction, null);

  const handleDelete = (id: string) => {
    setTransactionsList((prev) => prev.filter((item) => item.id !== id));
  };

  const filteredTransactions = transactionsList.filter((item) => {
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch = item.description
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalVariableSpend = transactionsList.reduce(
    (sum, item) => sum + parseFloat(item.baseAmount),
    0
  );

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "food":
        return <Utensils className="h-4 w-4 text-amber-400" />;
      case "transport":
        return <Car className="h-4 w-4 text-amber-400" />;
      case "shopping":
        return <ShoppingBag className="h-4 w-4 text-amber-400" />;
      case "entertainment":
        return <Film className="h-4 w-4 text-amber-400" />;
      case "health":
        return <HeartPulse className="h-4 w-4 text-amber-400" />;
      case "utilities":
        return <Zap className="h-4 w-4 text-amber-400" />;
      default:
        return <Tag className="h-4 w-4 text-amber-400" />;
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Title & Variable Spend KPI */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100">
            Daily Expense Tracking
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Log, categorize, and monitor daily living expenses.
          </p>
        </div>
        <Card className="border-zinc-800 bg-zinc-900/40 px-5 py-3 flex items-center gap-4">
          <div>
            <span className="text-xs uppercase tracking-wider text-zinc-400 font-semibold block">
              Variable Spend This Month
            </span>
            <span className="text-2xl font-bold text-amber-400">
              ${totalVariableSpend.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </span>
          </div>
          <Receipt className="h-7 w-7 text-amber-500/80" />
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Transaction History & Filters (2 Columns) */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {/* Search & Category Pills */}
          <div className="flex flex-col gap-3">
            <div className="relative">
              <Search className="h-4 w-4 absolute left-3.5 top-3.5 text-zinc-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search transactions by note..."
                className="w-full h-10 pl-10 pr-4 rounded-md bg-zinc-900/40 border border-zinc-800 text-sm text-zinc-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-md whitespace-nowrap transition-colors font-medium ${
                    selectedCategory === cat.id
                      ? "bg-amber-500 text-zinc-950"
                      : "bg-zinc-900/40 border border-zinc-800 text-zinc-300 hover:bg-zinc-800"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Transaction Cards List */}
          <div className="flex flex-col gap-2.5">
            {filteredTransactions.length === 0 ? (
              <div className="p-8 text-center rounded-lg border border-zinc-800 bg-zinc-900/20 text-zinc-400 text-sm">
                No matching transactions found for this filter.
              </div>
            ) : (
              filteredTransactions.map((tx) => (
                <Card key={tx.id} className="border-zinc-800 bg-zinc-900/30">
                  <CardContent className="p-3.5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-md bg-zinc-800/60">
                        {getCategoryIcon(tx.category)}
                      </div>
                      <div>
                        <div className="font-medium text-zinc-100 text-sm">
                          {tx.description}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-zinc-500 mt-0.5">
                          <span>{tx.transactionDate}</span>
                          <span>•</span>
                          <span className="capitalize">{tx.category}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-bold text-zinc-100 text-base">
                        -${parseFloat(tx.amount).toFixed(2)}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleDelete(tx.id)}
                        className="text-zinc-500 hover:text-red-400 p-1.5 rounded transition-colors"
                        aria-label="Delete Transaction"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>

        {/* Quick Log Expense Form (1 Column) */}
        <div>
          <Card className="border-zinc-800 bg-zinc-900/40 sticky top-24">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Plus className="h-4 w-4 text-amber-400" />
                <CardTitle className="text-base">Log Daily Expense</CardTitle>
              </div>
              <CardDescription>
                Record an expenditure to track against your daily limit.
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
                  <label htmlFor="description" className="text-xs font-semibold text-zinc-300">
                    Expense Description
                  </label>
                  <input
                    id="description"
                    name="description"
                    required
                    placeholder="e.g. Supermarket Groceries"
                    className="h-10 px-3 rounded-md bg-zinc-950 border border-zinc-800 text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
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
                    <label htmlFor="category" className="text-xs font-semibold text-zinc-300">
                      Category
                    </label>
                    <select
                      id="category"
                      name="category"
                      className="h-10 px-3 rounded-md bg-zinc-950 border border-zinc-800 text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="food">Food & Dining</option>
                      <option value="transport">Transport</option>
                      <option value="shopping">Shopping</option>
                      <option value="entertainment">Entertainment</option>
                      <option value="health">Health</option>
                      <option value="utilities">Utilities</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="transactionDate" className="text-xs font-semibold text-zinc-300">
                    Date of Expenditure
                  </label>
                  <input
                    id="transactionDate"
                    name="transactionDate"
                    type="date"
                    required
                    defaultValue={new Date().toISOString().split("T")[0]}
                    className="h-10 px-3 rounded-md bg-zinc-950 border border-zinc-800 text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <Button type="submit" variant="gold" className="w-full mt-2" disabled={isPending}>
                  {isPending ? "Logging..." : "Log Expense"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
