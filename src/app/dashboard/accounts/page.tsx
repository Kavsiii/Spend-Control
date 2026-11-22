"use client";

import * as React from "react";
import { useActionState } from "react";
import { createAccountAction } from "./actions";
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
import { Wallet, Plus, Building2, Banknote, CreditCard, CheckCircle2, AlertCircle } from "lucide-react";
import type { Account } from "@/lib/db/schema";
import { calculateTotalLiquidBalance } from "@/lib/finance/calculations";

const initialAccounts: Account[] = [
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
  {
    id: "acc-4",
    userId: "usr-demo",
    name: "Reserve Card",
    type: "credit",
    balance: "320.00",
    currency: "USD",
    isPrimary: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default function AccountsPage() {
  const [accountsList, setAccountsList] = React.useState<Account[]>(initialAccounts);
  const [formState, formAction, isPending] = useActionState(createAccountAction, null);

  const totalLiquidity = calculateTotalLiquidBalance(accountsList);

  const getAccountIcon = (type: string) => {
    switch (type) {
      case "bank":
        return <Building2 className="h-4 w-4 text-amber-400" />;
      case "cash":
        return <Banknote className="h-4 w-4 text-emerald-400" />;
      case "credit":
        return <CreditCard className="h-4 w-4 text-rose-400" />;
      default:
        return <Wallet className="h-4 w-4 text-zinc-400" />;
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Page Title & Total Liquidity */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100">
            Accounts & Liquidity
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Manage your bank accounts, cash wallets, and credit cards.
          </p>
        </div>
        <Card className="border-zinc-800 bg-zinc-900/40 px-5 py-3 flex items-center gap-4">
          <div>
            <span className="text-xs uppercase tracking-wider text-zinc-400 font-semibold block">
              Total Uncommitted Liquidity
            </span>
            <span className="text-2xl font-bold text-amber-400">
              ${totalLiquidity.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </span>
          </div>
          <Wallet className="h-7 w-7 text-amber-500/80" />
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Accounts List (2 Columns) */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <h2 className="text-base font-semibold text-zinc-200">Registered Accounts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {accountsList.map((account) => (
              <Card key={account.id} className="border-zinc-800 bg-zinc-900/30">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div className="flex items-center gap-2">
                    {getAccountIcon(account.type)}
                    <CardTitle className="text-sm font-medium">{account.name}</CardTitle>
                  </div>
                  <Badge variant={account.type === "credit" ? "outline" : "gold"}>
                    {account.type.toUpperCase()}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="text-xl font-bold text-zinc-100">
                    ${parseFloat(account.balance).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </div>
                  <p className="text-xs text-zinc-500 mt-1">
                    Currency: {account.currency}
                    {account.isPrimary && " (Default)"}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Add Account Form (1 Column) */}
        <div>
          <Card className="border-zinc-800 bg-zinc-900/40 sticky top-24">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Plus className="h-4 w-4 text-amber-400" />
                <CardTitle className="text-base">Register Account</CardTitle>
              </div>
              <CardDescription>
                Add a new funding source or credit account.
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
                  <label htmlFor="name" className="text-xs font-semibold text-zinc-300">
                    Account Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    required
                    placeholder="e.g. Chase Checking"
                    className="h-10 px-3 rounded-md bg-zinc-950 border border-zinc-800 text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="type" className="text-xs font-semibold text-zinc-300">
                    Account Type
                  </label>
                  <select
                    id="type"
                    name="type"
                    className="h-10 px-3 rounded-md bg-zinc-950 border border-zinc-800 text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="bank">Bank Account</option>
                    <option value="cash">Cash Wallet</option>
                    <option value="credit">Credit Card</option>
                    <option value="investment">Investment / Brokerage</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="balance" className="text-xs font-semibold text-zinc-300">
                    Current Balance ($ USD)
                  </label>
                  <input
                    id="balance"
                    name="balance"
                    type="number"
                    step="0.01"
                    min="0"
                    required
                    placeholder="0.00"
                    className="h-10 px-3 rounded-md bg-zinc-950 border border-zinc-800 text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <Button type="submit" variant="gold" className="w-full mt-2" disabled={isPending}>
                  {isPending ? "Saving..." : "Add Account"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
