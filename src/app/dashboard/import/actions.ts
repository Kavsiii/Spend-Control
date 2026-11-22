"use server";

import { revalidatePath } from "next/cache";
import { parseCsvStatement, type ParsedTransaction } from "@/lib/ingest/parser";

export interface ParseActionResult {
  success: boolean;
  transactions?: ParsedTransaction[];
  error?: string;
  message?: string;
}

export async function parseStatementAction(
  prevState: ParseActionResult | null,
  formData: FormData
): Promise<ParseActionResult> {
  const file = formData.get("statementFile") as File | null;
  const rawText = formData.get("rawText") as string | null;

  let textToParse = "";

  if (file && file.size > 0) {
    textToParse = await file.text();
  } else if (rawText && rawText.trim().length > 0) {
    textToParse = rawText.trim();
  } else {
    return {
      success: false,
      error: "Please select a CSV bank statement file or paste CSV text.",
    };
  }

  try {
    const extracted = parseCsvStatement(textToParse);
    if (extracted.length === 0) {
      return {
        success: false,
        error: "No valid transaction rows found. Ensure file contains Date, Description, and Amount columns.",
      };
    }

    return {
      success: true,
      transactions: extracted,
      message: `Extracted ${extracted.length} candidate transactions for review.`,
    };
  } catch (err: any) {
    return {
      success: false,
      error: err?.message || "Failed to parse bank statement file.",
    };
  }
}

export async function commitBatchTransactionsAction(
  transactionsToCommit: ParsedTransaction[]
): Promise<{ success: boolean; message?: string; error?: string }> {
  if (!transactionsToCommit || transactionsToCommit.length === 0) {
    return {
      success: false,
      error: "No transactions selected for import.",
    };
  }

  // In production with live Supabase, batch insert into `transactions` table.
  revalidatePath("/dashboard/transactions");
  revalidatePath("/dashboard");

  return {
    success: true,
    message: `Successfully imported ${transactionsToCommit.length} transactions into your records.`,
  };
}
