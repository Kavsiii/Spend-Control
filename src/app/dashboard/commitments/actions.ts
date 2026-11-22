"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";

const commitmentSchema = z.object({
  title: z.string().min(2, "Commitment title must have at least 2 characters."),
  category: z.enum(["loan_emi", "rent", "utility", "subscription", "other"], {
    message: "Select a valid category.",
  }),
  amount: z.string().refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
    message: "Amount must be a valid positive number.",
  }),
  currency: z.string().length(3).default("USD"),
  frequency: z.enum(["monthly", "quarterly", "annual"]),
  nextDueDate: z.string().min(10, "Select a valid next due date."),
});

export interface CommitmentActionResult {
  success: boolean;
  error?: string;
  message?: string;
}

export async function createCommitmentAction(
  prevState: CommitmentActionResult | null,
  formData: FormData
): Promise<CommitmentActionResult> {
  const raw = {
    title: formData.get("title"),
    category: formData.get("category"),
    amount: formData.get("amount"),
    currency: formData.get("currency") || "USD",
    frequency: formData.get("frequency"),
    nextDueDate: formData.get("nextDueDate"),
  };

  const validation = commitmentSchema.safeParse(raw);
  if (!validation.success) {
    return {
      success: false,
      error: validation.error.issues[0]?.message || "Invalid commitment input.",
    };
  }

  revalidatePath("/dashboard/commitments");
  revalidatePath("/dashboard");

  return {
    success: true,
    message: `Commitment "${validation.data.title}" registered successfully.`,
  };
}

export async function toggleCommitmentAction(
  commitmentId: string,
  isActive: boolean
): Promise<CommitmentActionResult> {
  if (!commitmentId) {
    return { success: false, error: "Commitment ID is required." };
  }

  revalidatePath("/dashboard/commitments");
  revalidatePath("/dashboard");
  return {
    success: true,
    message: `Commitment marked as ${isActive ? "active" : "paused"}.`,
  };
}

export async function deleteCommitmentAction(
  commitmentId: string
): Promise<CommitmentActionResult> {
  if (!commitmentId) {
    return { success: false, error: "Commitment ID is required." };
  }

  revalidatePath("/dashboard/commitments");
  revalidatePath("/dashboard");
  return { success: true, message: "Commitment deleted." };
}
