import { parseCsvStatement } from "./parser";

export function runStatementParserSanityCheck(): boolean {
  const sampleBankCsv = `Date,Description,Amount
2026-11-15,Whole Foods Market Organic,-64.20
2026-11-16,Uber Trip San Francisco,-22.50
2026-11-17,Amazon Online Retail Goods,-115.00
2026-11-18,Netflix Monthly Subscription,-19.99
2026-11-19,City Municipal Electric Bill,-78.40
`;

  const parsed = parseCsvStatement(sampleBankCsv);

  if (parsed.length !== 5) {
    throw new Error(`Expected 5 transactions, got ${parsed.length}`);
  }

  if (parsed[0].category !== "food" || parsed[0].amount !== 64.2) {
    throw new Error(`Row 0 mismatch: category=${parsed[0].category}, amount=${parsed[0].amount}`);
  }

  if (parsed[1].category !== "transport" || parsed[1].amount !== 22.5) {
    throw new Error(`Row 1 mismatch: category=${parsed[1].category}`);
  }

  if (parsed[2].category !== "shopping" || parsed[2].amount !== 115) {
    throw new Error(`Row 2 mismatch: category=${parsed[2].category}`);
  }

  if (parsed[3].category !== "entertainment" || parsed[3].amount !== 19.99) {
    throw new Error(`Row 3 mismatch: category=${parsed[3].category}`);
  }

  if (parsed[4].category !== "utilities" || parsed[4].amount !== 78.4) {
    throw new Error(`Row 4 mismatch: category=${parsed[4].category}`);
  }

  return true;
}
