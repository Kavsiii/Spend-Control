"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";

const transactionSchema = z.object({
  amount: z.string().refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
    message: "Amount must be a positive number.",
  }),
  currency: z.string().length(3).default("USD"),
  category: z.enum([
    "food",
    "transport",
    "shopping",
    "entertainment",
    "health",
    "utilities",
    "other",
  ], {
    message: "Select a valid category.",
  }),
  description: z.string().min(2, "Description must be at least 2 characters."),
  transactionDate: z.string().min(10, "Select a valid date."),
  type: z.enum(["expense", "income"]).default("expense"),
});

export interface TransactionActionResult {
  success: boolean;
  error?: string;
  message?: string;
}

export async function createTransactionAction(
  prevState: TransactionActionResult | null,
  formData: FormData
): Promise<TransactionActionResult> {
  const raw = {
    amount: formData.get("amount"),
    currency: formData.get("currency") || "USD",
    category: formData.get("category"),
    description: formData.get("description"),
    transactionDate: formData.get("transactionDate"),
    type: formData.get("type") || "expense",
  };

  const validation = transactionSchema.safeParse(raw);
  if (!validation.success) {
    return {
      success: false,
      error: validation.error.issues[0]?.message || "Invalid transaction input.",
    };
  }

  revalidatePath("/dashboard/transactions");
  revalidatePath("/dashboard");

  return {
    success: true,
    message: `Logged expense "${validation.data.description}" for $${parseFloat(validation.data.amount).toFixed(2)}.`,
  };
}

export async function deleteTransactionAction(
  transactionId: string
): Promise<TransactionActionResult> {
  if (!transactionId) {
    return { success: false, error: "Transaction ID is required." };
  }

  revalidatePath("/dashboard/transactions");
  revalidatePath("/dashboard");
  return { success: true, message: "Transaction removed." };
}
