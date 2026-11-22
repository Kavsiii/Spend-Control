"use client";

import * as React from "react";
import { useActionState } from "react";
import { evaluatePurchaseAction, saveWishlistItemAction } from "./actions";
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
  Sparkles,
  Calculator,
  ShieldCheck,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  BookmarkPlus,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import type { PurchaseEvaluationResult } from "@/lib/ai/advisor";

const sampleWishlist = [
  {
    id: "w-1",
    title: "MacBook Pro M4 14-inch",
    amount: 1999.0,
    verdict: "DEFER",
    safeDate: "2027-01-15",
    priority: "high",
  },
  {
    id: "w-2",
    title: "Ergonomic Office Chair",
    amount: 380.0,
    verdict: "BUY_NOW",
    safeDate: "2026-11-22",
    priority: "medium",
  },
  {
    id: "w-3",
    title: "Noise-Cancelling Headphones",
    amount: 349.0,
    verdict: "BUY_NOW",
    safeDate: "2026-11-22",
    priority: "low",
  },
];

export default function AdvisorPage() {
  const [formState, formAction, isEvaluating] = useActionState(evaluatePurchaseAction, null);
  const [savedMessage, setSavedMessage] = React.useState<string | null>(null);
  const [activeEvaluation, setActiveEvaluation] = React.useState<PurchaseEvaluationResult | null>(null);

  React.useEffect(() => {
    if (formState?.evaluation) {
      setActiveEvaluation(formState.evaluation);
      setSavedMessage(null);
    }
  }, [formState]);

  const handleSaveToWishlist = async () => {
    if (!activeEvaluation) return;
    const res = await saveWishlistItemAction(activeEvaluation);
    if (res.success) {
      setSavedMessage(res.message || "Item saved to wishlist.");
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Title */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="h-5 w-5 text-amber-400" />
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100">
            AI Financial Advisor
          </h1>
        </div>
        <p className="text-sm text-zinc-400">
          Evaluate whether and when you can afford desired products without compromising upcoming loan EMIs or living safety buffers.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Purchase Evaluator Form (1 Column) */}
        <div>
          <Card className="border-zinc-800 bg-zinc-900/40 sticky top-24">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Calculator className="h-4 w-4 text-amber-400" />
                <CardTitle className="text-base">Evaluate Purchase</CardTitle>
              </div>
              <CardDescription>
                Simulate affordability against your real cash flow.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {formState?.error && (
                <div className="mb-4 p-2.5 rounded-md bg-red-950/40 border border-red-500/40 flex items-start gap-2 text-xs text-red-200">
                  <AlertTriangle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                  <span>{formState.error}</span>
                </div>
              )}

              <form action={formAction} className="flex flex-col gap-3.5">
                <div className="flex flex-col gap-1">
                  <label htmlFor="itemTitle" className="text-xs font-semibold text-zinc-300">
                    Product / Desired Item
                  </label>
                  <input
                    id="itemTitle"
                    name="itemTitle"
                    required
                    placeholder="e.g. Sony Mirrorless Camera"
                    className="h-10 px-3 rounded-md bg-zinc-950 border border-zinc-800 text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="itemPrice" className="text-xs font-semibold text-zinc-300">
                    Cost ($ USD)
                  </label>
                  <input
                    id="itemPrice"
                    name="itemPrice"
                    type="number"
                    step="0.01"
                    min="1"
                    required
                    placeholder="1200.00"
                    className="h-10 px-3 rounded-md bg-zinc-950 border border-zinc-800 text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <Button type="submit" variant="gold" className="w-full mt-2" disabled={isEvaluating}>
                  {isEvaluating ? "Analyzing..." : "Evaluate Affordability"}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="text-xs text-zinc-500 border-t border-zinc-800/50 pt-3 flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-amber-500" />
              <span>60-Day Fixed Commitment Shield active</span>
            </CardFooter>
          </Card>
        </div>

        {/* Results & Wishlist (2 Columns) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Active Evaluation Result Card */}
          {activeEvaluation ? (
            <Card className="border-amber-500/40 bg-zinc-900/60 shadow-lg">
              <CardHeader className="pb-3 border-b border-zinc-800/60">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <span className="text-xs text-zinc-400 block">Advisory Decision</span>
                    <CardTitle className="text-xl text-zinc-100 font-bold">
                      {activeEvaluation.itemTitle}
                    </CardTitle>
                  </div>
                  <Badge
                    variant={activeEvaluation.verdict === "BUY_NOW" ? "gold" : "outline"}
                    className="text-xs px-3 py-1 font-semibold"
                  >
                    {activeEvaluation.verdictLabel}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-4 flex flex-col gap-4">
                {/* Rationale Prose */}
                <p className="text-sm text-zinc-200 leading-relaxed bg-zinc-950/60 p-4 rounded-md border border-zinc-800/80">
                  {activeEvaluation.rationale}
                </p>

                {/* Mathematical Safeguards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-md bg-zinc-950 border border-zinc-800">
                    <span className="text-zinc-500 block mb-0.5">Liquid Assets</span>
                    <span className="font-bold text-zinc-200 text-sm">
                      ${activeEvaluation.math.liquidCapital.toFixed(2)}
                    </span>
                  </div>
                  <div className="p-3 rounded-md bg-zinc-950 border border-zinc-800">
                    <span className="text-zinc-500 block mb-0.5">60-Day Safety Shield</span>
                    <span className="font-bold text-amber-400 text-sm">
                      ${activeEvaluation.math.twoMonthSafetyReserve.toFixed(2)}
                    </span>
                  </div>
                  <div className="p-3 rounded-md bg-zinc-950 border border-zinc-800">
                    <span className="text-zinc-500 block mb-0.5">
                      {activeEvaluation.surplusDeficit >= 0 ? "Surplus Margin" : "Deficit to Target"}
                    </span>
                    <span
                      className={`font-bold text-sm ${
                        activeEvaluation.surplusDeficit >= 0 ? "text-emerald-400" : "text-rose-400"
                      }`}
                    >
                      ${Math.abs(activeEvaluation.surplusDeficit).toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Savings Target Advice if Deferred */}
                {activeEvaluation.verdict === "DEFER" && (
                  <div className="flex items-center gap-3 p-3 rounded-md bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200">
                    <TrendingUp className="h-4 w-4 shrink-0 text-amber-400" />
                    <span>
                      Recommended savings pace: Set aside <strong>${activeEvaluation.recommendedDailySavings.toFixed(2)} / day</strong> to reach your purchase goal by <strong>{activeEvaluation.safePurchaseDate}</strong>.
                    </span>
                  </div>
                )}

                {savedMessage && (
                  <div className="p-2.5 rounded-md bg-emerald-950/40 border border-emerald-500/40 text-xs text-emerald-200 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span>{savedMessage}</span>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-end gap-3 pt-2">
                <Button variant="outline" size="sm" onClick={() => setActiveEvaluation(null)}>
                  Dismiss
                </Button>
                <Button variant="gold" size="sm" onClick={handleSaveToWishlist} className="gap-1.5">
                  <BookmarkPlus className="h-4 w-4" />
                  <span>Save to Wishlist</span>
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <Card className="border-zinc-800 bg-zinc-900/20 p-6 text-center flex flex-col items-center gap-2">
              <Calculator className="h-8 w-8 text-zinc-600 mb-1" />
              <div className="text-sm font-medium text-zinc-300">
                Awaiting Product Simulation
              </div>
              <p className="text-xs text-zinc-500 max-w-sm">
                Enter an item on the left to evaluate whether you can purchase it now without risking your upcoming loans or commitments.
              </p>
            </Card>
          )}

          {/* Tracked Wishlist Items */}
          <div className="flex flex-col gap-3">
            <h2 className="text-base font-semibold text-zinc-200">Tracked Wishlist Queue</h2>
            <div className="flex flex-col gap-2.5">
              {sampleWishlist.map((item) => (
                <Card key={item.id} className="border-zinc-800 bg-zinc-900/30">
                  <CardContent className="p-3.5 flex items-center justify-between">
                    <div>
                      <div className="font-medium text-zinc-100 text-sm flex items-center gap-2">
                        <span>{item.title}</span>
                        <Badge
                          variant={item.verdict === "BUY_NOW" ? "gold" : "outline"}
                          className="text-[10px]"
                        >
                          {item.verdict === "BUY_NOW" ? "Affordable" : "Target: " + item.safeDate}
                        </Badge>
                      </div>
                      <p className="text-xs text-zinc-500 mt-0.5">
                        Priority: {item.priority.toUpperCase()}
                      </p>
                    </div>

                    <div className="text-right">
                      <div className="font-bold text-zinc-100 text-base">
                        ${item.amount.toFixed(2)}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
