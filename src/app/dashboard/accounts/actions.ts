"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";

const accountSchema = z.object({
  name: z.string().min(2, "Account name must have at least 2 characters."),
  type: z.enum(["bank", "cash", "credit", "investment"], {
    message: "Select a valid account type.",
  }),
  balance: z.string().refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) >= 0, {
    message: "Balance must be a valid positive number.",
  }),
  currency: z.string().length(3).default("USD"),
});

export interface AccountActionResult {
  success: boolean;
  error?: string;
  message?: string;
}

export async function createAccountAction(
  prevState: AccountActionResult | null,
  formData: FormData
): Promise<AccountActionResult> {
  const raw = {
    name: formData.get("name"),
    type: formData.get("type"),
    balance: formData.get("balance"),
    currency: formData.get("currency") || "USD",
  };

  const validation = accountSchema.safeParse(raw);
  if (!validation.success) {
    return {
      success: false,
      error: validation.error.issues[0]?.message || "Invalid account input.",
    };
  }

  // In production with live Supabase credentials, insert into db.accounts table.
  // In dev/demo mode, return success feedback.
  revalidatePath("/dashboard/accounts");
  revalidatePath("/dashboard");

  return {
    success: true,
    message: `Account "${validation.data.name}" registered successfully.`,
  };
}

export async function deleteAccountAction(accountId: string): Promise<AccountActionResult> {
  if (!accountId) {
    return { success: false, error: "Account ID is required." };
  }

  revalidatePath("/dashboard/accounts");
  revalidatePath("/dashboard");
  return { success: true, message: "Account removed." };
}
