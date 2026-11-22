"use client";

import * as React from "react";
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
import {
  Wallet,
  CalendarClock,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  X,
  Coins,
} from "lucide-react";

interface OnboardingWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete?: (data: OnboardingData) => void;
}

export interface OnboardingData {
  baseCurrency: string;
  accountName: string;
  accountType: string;
  accountBalance: string;
  commitmentTitle: string;
  commitmentCategory: string;
  commitmentAmount: string;
  commitmentDueDate: string;
}

const SUPPORTED_CURRENCIES = [
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GBP", symbol: "£", name: "British Pound" },
  { code: "INR", symbol: "₹", name: "Indian Rupee" },
  { code: "CAD", symbol: "$", name: "Canadian Dollar" },
  { code: "AUD", symbol: "$", name: "Australian Dollar" },
  { code: "JPY", symbol: "¥", name: "Japanese Yen" },
];

export function OnboardingWizard({
  isOpen,
  onClose,
  onComplete,
}: OnboardingWizardProps) {
  const [step, setStep] = React.useState<1 | 2 | 3 | 4>(1);

  // Form state
  const [formData, setFormData] = React.useState<OnboardingData>({
    baseCurrency: "USD",
    accountName: "Primary Checking",
    accountType: "bank",
    accountBalance: "5000.00",
    commitmentTitle: "Apartment Rent",
    commitmentCategory: "rent",
    commitmentAmount: "1400.00",
    commitmentDueDate: "2026-12-01",
  });

  if (!isOpen) return null;

  const currentCurrency =
    SUPPORTED_CURRENCIES.find((c) => c.code === formData.baseCurrency) ||
    SUPPORTED_CURRENCIES[0];

  const balanceNum = parseFloat(formData.accountBalance) || 0;
  const commitmentNum = parseFloat(formData.commitmentAmount) || 0;
  const uncommittedSurplus = Math.max(0, balanceNum - commitmentNum);
  const dailyBuffer = (uncommittedSurplus / 31).toFixed(2);

  const handleFinish = () => {
    if (onComplete) {
      onComplete(formData);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
      <Card className="w-full max-w-xl border-zinc-800 bg-zinc-950 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-100 transition-colors p-1"
          aria-label="Close setup guide"
        >
          <X className="h-5 w-5" />
        </button>

        <CardHeader className="border-b border-zinc-800/80 pb-4">
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="gold" className="text-xs">
              Step {step} of 4
            </Badge>
            <span className="text-xs text-zinc-400">Onboarding Configuration</span>
          </div>
          <CardTitle className="text-xl text-zinc-100">
            {step === 1 && "Choose Your Base Currency"}
            {step === 2 && "Configure Starting Liquid Account"}
            {step === 3 && "Record First Fixed Commitment"}
            {step === 4 && "Review & Initialize Financial Baseline"}
          </CardTitle>
          <CardDescription className="text-xs text-zinc-400">
            {step === 1 &&
              "All multi-currency transactions and commitments will normalize to this currency."}
            {step === 2 &&
              "Add your main bank checking or cash reserve to establish liquid availability."}
            {step === 3 &&
              "Add your largest fixed recurring obligation (such as rent or loan EMI) to protect your liquidity."}
            {step === 4 &&
              "Your initial metrics are calculated deterministically. Review before finalizing."}
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-6">
          {/* Step 1: Base Currency */}
          {step === 1 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SUPPORTED_CURRENCIES.map((curr) => {
                const isSelected = formData.baseCurrency === curr.code;
                return (
                  <button
                    key={curr.code}
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, baseCurrency: curr.code })
                    }
                    className={`flex items-center justify-between p-3.5 rounded-lg border text-left transition-all ${
                      isSelected
                        ? "border-amber-500 bg-amber-500/10 text-zinc-100"
                        : "border-zinc-800 bg-zinc-900/40 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-900/70"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-9 w-9 rounded-md flex items-center justify-center font-bold text-sm ${
                          isSelected
                            ? "bg-amber-500 text-zinc-950"
                            : "bg-zinc-800 text-zinc-200"
                        }`}
                      >
                        {curr.symbol}
                      </div>
                      <div>
                        <div className="font-semibold text-sm">{curr.code}</div>
                        <div className="text-xs text-zinc-500">{curr.name}</div>
                      </div>
                    </div>
                    {isSelected && (
                      <CheckCircle2 className="h-4 w-4 text-amber-400" />
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* Step 2: Primary Account */}
          {step === 2 && (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-zinc-300">
                  Account Name
                </label>
                <input
                  type="text"
                  value={formData.accountName}
                  onChange={(e) =>
                    setFormData({ ...formData, accountName: e.target.value })
                  }
                  placeholder="e.g. Main Checking, Savings, Cash Reserve"
                  className="h-10 px-3 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-100 text-sm focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-zinc-300">
                    Account Type
                  </label>
                  <select
                    value={formData.accountType}
                    onChange={(e) =>
                      setFormData({ ...formData, accountType: e.target.value })
                    }
                    className="h-10 px-3 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-100 text-sm focus:outline-none focus:ring-1 focus:ring-amber-500"
                  >
                    <option value="bank">Bank Checking / Savings</option>
                    <option value="cash">Physical Cash</option>
                    <option value="credit">Credit Line</option>
                    <option value="investment">Liquid Investment</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-zinc-300">
                    Current Liquid Balance ({formData.baseCurrency})
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.accountBalance}
                    onChange={(e) =>
                      setFormData({ ...formData, accountBalance: e.target.value })
                    }
                    placeholder="5000.00"
                    className="h-10 px-3 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-100 text-sm focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Fixed Commitment */}
          {step === 3 && (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-zinc-300">
                  Commitment Title
                </label>
                <input
                  type="text"
                  value={formData.commitmentTitle}
                  onChange={(e) =>
                    setFormData({ ...formData, commitmentTitle: e.target.value })
                  }
                  placeholder="e.g. Apartment Rent, Auto Loan EMI, Health Insurance"
                  className="h-10 px-3 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-100 text-sm focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-zinc-300">
                    Category
                  </label>
                  <select
                    value={formData.commitmentCategory}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        commitmentCategory: e.target.value,
                      })
                    }
                    className="h-10 px-2 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-100 text-xs focus:outline-none focus:ring-1 focus:ring-amber-500"
                  >
                    <option value="rent">Rent / Housing</option>
                    <option value="loan_emi">Loan / EMI</option>
                    <option value="utility">Utilities</option>
                    <option value="subscription">Subscription</option>
                    <option value="other">Other Obligation</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-zinc-300">
                    Amount ({formData.baseCurrency})
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.commitmentAmount}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        commitmentAmount: e.target.value,
                      })
                    }
                    placeholder="1400.00"
                    className="h-10 px-3 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-100 text-xs focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-zinc-300">
                    Next Due Date
                  </label>
                  <input
                    type="date"
                    value={formData.commitmentDueDate}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        commitmentDueDate: e.target.value,
                      })
                    }
                    className="h-10 px-2 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-100 text-xs focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Review Baseline */}
          {step === 4 && (
            <div className="flex flex-col gap-4">
              <div className="p-4 rounded-lg border border-amber-500/30 bg-amber-500/10 flex flex-col gap-3">
                <div className="flex items-center gap-2 text-amber-300 font-semibold text-sm">
                  <Sparkles className="h-4 w-4" />
                  <span>Calculated Financial Snapshot</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-amber-500/20 text-xs">
                  <div>
                    <span className="text-zinc-400 block">Liquid Reserve:</span>
                    <span className="text-base font-bold text-zinc-100">
                      {currentCurrency.symbol}
                      {balanceNum.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                  <div>
                    <span className="text-zinc-400 block">Monthly Committed:</span>
                    <span className="text-base font-bold text-zinc-100">
                      {currentCurrency.symbol}
                      {commitmentNum.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                  <div>
                    <span className="text-zinc-400 block">Daily Spending Buffer:</span>
                    <span className="text-base font-bold text-amber-400">
                      {currentCurrency.symbol}
                      {dailyBuffer} / day
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 text-xs text-zinc-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-amber-400" />
                  <span>
                    Primary account <strong>{formData.accountName}</strong> ready
                    with {currentCurrency.symbol}
                    {balanceNum.toFixed(2)}.
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-amber-400" />
                  <span>
                    Fixed commitment <strong>{formData.commitmentTitle}</strong> of{" "}
                    {currentCurrency.symbol}
                    {commitmentNum.toFixed(2)} due on {formData.commitmentDueDate}.
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-amber-400" />
                  <span>
                    Tenant data isolation enforced via PostgreSQL Row Level Security.
                  </span>
                </div>
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter className="border-t border-zinc-800/80 pt-4 flex items-center justify-between">
          {step > 1 ? (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setStep((s) => (s - 1) as 1 | 2 | 3 | 4)}
              className="gap-1.5"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </Button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <Button
              type="button"
              variant="gold"
              size="sm"
              onClick={() => setStep((s) => (s + 1) as 1 | 2 | 3 | 4)}
              className="gap-1.5"
            >
              <span>Continue</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              type="button"
              variant="gold"
              size="sm"
              onClick={handleFinish}
              className="gap-1.5"
            >
              <CheckCircle2 className="h-4 w-4" />
              <span>Initialize Command Center</span>
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
