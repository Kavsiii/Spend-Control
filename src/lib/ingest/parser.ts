import { z } from "zod";
import Papa from "papaparse";

export const parsedTransactionSchema = z.object({
  date: z.string(),
  description: z.string(),
  amount: z.number().positive(),
  category: z.enum([
    "food",
    "transport",
    "shopping",
    "entertainment",
    "health",
    "utilities",
    "other",
  ]),
});

export type ParsedTransaction = z.infer<typeof parsedTransactionSchema>;

/**
 * Intelligent categorization heuristic based on common bank merchant keywords.
 */
export function inferCategory(description: string): ParsedTransaction["category"] {
  const d = description.toLowerCase();
  if (
    d.includes("market") ||
    d.includes("grocery") ||
    d.includes("supermarket") ||
    d.includes("restaurant") ||
    d.includes("cafe") ||
    d.includes("coffee") ||
    d.includes("bistro") ||
    d.includes("food") ||
    d.includes("burger") ||
    d.includes("pizza")
  ) {
    return "food";
  }
  if (
    d.includes("uber") ||
    d.includes("lyft") ||
    d.includes("metro") ||
    d.includes("transit") ||
    d.includes("gas") ||
    d.includes("fuel") ||
    d.includes("parking") ||
    d.includes("train")
  ) {
    return "transport";
  }
  if (
    d.includes("amazon") ||
    d.includes("target") ||
    d.includes("walmart") ||
    d.includes("clothing") ||
    d.includes("zara") ||
    d.includes("apple store") ||
    d.includes("mall")
  ) {
    return "shopping";
  }
  if (
    d.includes("netflix") ||
    d.includes("spotify") ||
    d.includes("cinema") ||
    d.includes("theatre") ||
    d.includes("hulu") ||
    d.includes("steam") ||
    d.includes("game")
  ) {
    return "entertainment";
  }
  if (
    d.includes("pharmacy") ||
    d.includes("cvs") ||
    d.includes("walgreens") ||
    d.includes("doctor") ||
    d.includes("hospital") ||
    d.includes("dental")
  ) {
    return "health";
  }
  if (
    d.includes("electric") ||
    d.includes("water") ||
    d.includes("utility") ||
    d.includes("internet") ||
    d.includes("verizon") ||
    d.includes("at&t") ||
    d.includes("telecom")
  ) {
    return "utilities";
  }
  return "other";
}

/**
 * Parses raw CSV bank statement text into typed, validated transactions.
 */
export function parseCsvStatement(csvString: string): ParsedTransaction[] {
  const parsed = Papa.parse<Record<string, string>>(csvString.trim(), {
    header: true,
    skipEmptyLines: true,
  });

  const results: ParsedTransaction[] = [];

  for (const row of parsed.data) {
    // Find keys matching common bank column naming patterns
    const keys = Object.keys(row);
    const dateKey = keys.find((k) => /date|time/i.test(k));
    const descKey = keys.find((k) => /desc|memo|merchant|payee|name|particulars/i.test(k));
    const amountKey = keys.find((k) => /amount|debit|outflow|sum/i.test(k));

    if (!dateKey || !descKey || !amountKey) {
      continue;
    }

    const rawDate = row[dateKey]?.trim();
    const rawDesc = row[descKey]?.trim();
    const rawAmountStr = row[amountKey]?.replace(/[^0-9.-]/g, "").trim();

    if (!rawDate || !rawDesc || !rawAmountStr) {
      continue;
    }

    const amount = Math.abs(parseFloat(rawAmountStr));
    if (isNaN(amount) || amount <= 0) {
      continue;
    }

    // Standardize ISO date YYYY-MM-DD
    let isoDate = new Date().toISOString().split("T")[0];
    try {
      const parsedDate = new Date(rawDate);
      if (!isNaN(parsedDate.getTime())) {
        isoDate = parsedDate.toISOString().split("T")[0];
      }
    } catch {
      // keep fallback
    }

    results.push({
      date: isoDate,
      description: rawDesc,
      amount,
      category: inferCategory(rawDesc),
    });
  }

  return results;
}
