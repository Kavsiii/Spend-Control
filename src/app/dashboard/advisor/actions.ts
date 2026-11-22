"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import {
  computeFinancialSnapshot,
  evaluatePurchaseAffordability,
  type PurchaseEvaluationResult,
} from "@/lib/ai/advisor";
import { checkRateLimit } from "@/lib/security/rate-limit";

const evalActionSchema = z.object({
  itemTitle: z.string().min(2, "Item name must have at least 2 characters."),
  itemPrice: z.string().refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
    message: "Item price must be a positive number.",
  }),
});

export interface AdvisorActionResult {
  success: boolean;
  evaluation?: PurchaseEvaluationResult;
  error?: string;
  message?: string;
}

export async function evaluatePurchaseAction(
  prevState: AdvisorActionResult | null,
  formData: FormData
): Promise<AdvisorActionResult> {
  // Rate limit protection: 10 evaluations per minute
  const rateLimitResult = checkRateLimit("advisor", "active_advisor_user");
  if (!rateLimitResult.success) {
    return {
      success: false,
      error: rateLimitResult.error || "Rate limit exceeded. Please wait a moment.",
    };
  }

  const raw = {
    itemTitle: formData.get("itemTitle"),
    itemPrice: formData.get("itemPrice"),
  };

  const validation = evalActionSchema.safeParse(raw);
  if (!validation.success) {
    return {
      success: false,
      error: validation.error.issues[0]?.message || "Invalid input.",
    };
  }

  const { itemTitle, itemPrice } = validation.data;
  const priceNum = parseFloat(itemPrice);

  // In live app, retrieve actual liquid accounts and commitments from DB.
  // Using active baseline: $8,870 liquid, $2,190 monthly committed burn, $48 daily budget
  const snapshot = computeFinancialSnapshot(8870, 2190, 48);
  const evaluation = evaluatePurchaseAffordability(itemTitle, priceNum, snapshot);

  return {
    success: true,
    evaluation,
    message: `Evaluation complete for "${itemTitle}".`,
  };
}

export async function saveWishlistItemAction(
  item: PurchaseEvaluationResult
): Promise<{ success: boolean; message?: string }> {
  // In production with live Supabase, insert into `wishlist_items`
  revalidatePath("/dashboard/advisor");
  revalidatePath("/dashboard");

  return {
    success: true,
    message: `"${item.itemTitle}" saved to your tracked wishlist.`,
  };
}
