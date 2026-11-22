"use client";

import * as React from "react";
import { useActionState } from "react";
import { parseStatementAction, commitBatchTransactionsAction } from "./actions";
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
  UploadCloud,
  FileSpreadsheet,
  CheckCircle2,
  AlertCircle,
  Trash2,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import type { ParsedTransaction } from "@/lib/ingest/parser";

const SAMPLE_CSV = `Date,Description,Amount
2026-11-20,Trader Joes Organic Market,-72.40
2026-11-21,Bay Area Rapid Transit Rail,-8.50
2026-11-21,Apple App Store Subscription,-14.99
2026-11-22,Shell Gasoline Station,-45.00
2026-11-22,CVS Pharmacy Health Supplies,-26.80
`;

export default function StatementImportPage() {
  const [formState, formAction, isParsing] = useActionState(parseStatementAction, null);
  const [candidateList, setCandidateList] = React.useState<ParsedTransaction[]>([]);
  const [importStatus, setImportStatus] = React.useState<{
    success?: boolean;
    message?: string;
  } | null>(null);
  const [isCommitting, setIsCommitting] = React.useState(false);
  const [rawText, setRawText] = React.useState("");

  React.useEffect(() => {
    if (formState?.transactions && formState.transactions.length > 0) {
      setCandidateList(formState.transactions);
      setImportStatus(null);
    }
  }, [formState]);

  const handleLoadSample = () => {
    setRawText(SAMPLE_CSV);
  };

  const handleRemoveRow = (index: number) => {
    setCandidateList((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCategoryChange = (
    index: number,
    newCategory: ParsedTransaction["category"]
  ) => {
    setCandidateList((prev) =>
      prev.map((item, i) => (i === index ? { ...item, category: newCategory } : item))
    );
  };

  const handleCommit = async () => {
    if (candidateList.length === 0) return;
    setIsCommitting(true);
    try {
      const res = await commitBatchTransactionsAction(candidateList);
      if (res.success) {
        setImportStatus({ success: true, message: res.message });
        setCandidateList([]);
        setRawText("");
      } else {
        setImportStatus({ success: false, message: res.error });
      }
    } finally {
      setIsCommitting(false);
    }
  };

  const totalAmount = candidateList.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="flex flex-col gap-8">
      {/* Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100">
          Statement Ingestion & Parsing
        </h1>
        <p className="text-sm text-zinc-400 mt-1">
          Upload bank statements (CSV or text export) to batch extract and reconcile expenditures.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Upload Form (1 Column) */}
        <div>
          <Card className="border-zinc-800 bg-zinc-900/40 sticky top-24">
            <CardHeader>
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="h-5 w-5 text-amber-400" />
                <CardTitle className="text-base">Upload Statement</CardTitle>
              </div>
              <CardDescription>
                Upload CSV or paste transaction records.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {formState?.error && (
                <div className="mb-4 p-2.5 rounded-md bg-red-950/40 border border-red-500/40 flex items-start gap-2 text-xs text-red-200">
                  <AlertCircle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                  <span>{formState.error}</span>
                </div>
              )}

              <form action={formAction} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="statementFile" className="text-xs font-semibold text-zinc-300">
                    Bank Statement File (CSV)
                  </label>
                  <input
                    id="statementFile"
                    name="statementFile"
                    type="file"
                    accept=".csv,.txt"
                    className="text-xs text-zinc-400 file:mr-3 file:py-2 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-zinc-800 file:text-zinc-200 hover:file:bg-zinc-700"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center">
                    <label htmlFor="rawText" className="text-xs font-semibold text-zinc-300">
                      Or Paste CSV Text
                    </label>
                    <button
                      type="button"
                      onClick={handleLoadSample}
                      className="text-[11px] text-amber-400 hover:underline cursor-pointer"
                    >
                      Load Sample CSV
                    </button>
                  </div>
                  <textarea
                    id="rawText"
                    name="rawText"
                    rows={6}
                    value={rawText}
                    onChange={(e) => setRawText(e.target.value)}
                    placeholder="Date,Description,Amount&#10;2026-11-20,Supermarket,-54.20"
                    className="p-3 rounded-md bg-zinc-950 border border-zinc-800 text-zinc-100 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-amber-500 leading-relaxed"
                  />
                </div>

                <Button type="submit" variant="gold" className="w-full" disabled={isParsing}>
                  {isParsing ? "Extracting..." : "Parse Transactions"}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="text-xs text-zinc-500 border-t border-zinc-800/50 pt-3">
              Automated categorization pipeline active.
            </CardFooter>
          </Card>
        </div>

        {/* Candidate Transactions Review Table (2 Columns) */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h2 className="text-base font-semibold text-zinc-200">
                Extracted Transactions for Reconciliation
              </h2>
              <p className="text-xs text-zinc-400">
                Review parsed items, verify auto-assigned categories, and commit to history.
              </p>
            </div>
            {candidateList.length > 0 && (
              <Badge variant="gold">
                {candidateList.length} items (${totalAmount.toFixed(2)})
              </Badge>
            )}
          </div>

          {importStatus?.message && (
            <div
              className={`p-3 rounded-md border flex items-center gap-2 text-xs ${
                importStatus.success
                  ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-200"
                  : "bg-red-950/40 border-red-500/40 text-red-200"
              }`}
            >
              {importStatus.success ? (
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
              ) : (
                <AlertCircle className="h-4 w-4 text-red-400 shrink-0" />
              )}
              <span>{importStatus.message}</span>
            </div>
          )}

          {candidateList.length === 0 ? (
            <Card className="border-zinc-800 bg-zinc-900/20 p-8 text-center flex flex-col items-center gap-3">
              <UploadCloud className="h-8 w-8 text-zinc-600" />
              <div className="text-sm font-medium text-zinc-300">
                No statement parsed yet
              </div>
              <p className="text-xs text-zinc-500 max-w-sm">
                Upload your bank statement on the left, or click &quot;Load Sample CSV&quot; to test the ingestion flow.
              </p>
              <Button variant="outline" size="sm" onClick={handleLoadSample} className="mt-2">
                Load Sample Bank Statement
              </Button>
            </Card>
          ) : (
            <div className="flex flex-col gap-3">
              <div className="rounded-lg border border-zinc-800 bg-zinc-900/30 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left text-zinc-300">
                    <thead className="bg-zinc-950 border-b border-zinc-800 text-[11px] uppercase tracking-wider text-zinc-400 font-semibold">
                      <tr>
                        <th className="px-3.5 py-3">Date</th>
                        <th className="px-3.5 py-3">Merchant / Note</th>
                        <th className="px-3.5 py-3">Category</th>
                        <th className="px-3.5 py-3 text-right">Amount</th>
                        <th className="px-3.5 py-3 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/60 font-mono">
                      {candidateList.map((tx, idx) => (
                        <tr key={idx} className="hover:bg-zinc-800/30 transition-colors">
                          <td className="px-3.5 py-2.5 whitespace-nowrap">{tx.date}</td>
                          <td className="px-3.5 py-2.5 font-sans font-medium text-zinc-100">
                            {tx.description}
                          </td>
                          <td className="px-3.5 py-2.5 font-sans">
                            <select
                              value={tx.category}
                              onChange={(e) =>
                                handleCategoryChange(
                                  idx,
                                  e.target.value as ParsedTransaction["category"]
                                )
                              }
                              className="h-8 px-2 rounded bg-zinc-950 border border-zinc-800 text-xs text-zinc-200 focus:outline-none focus:ring-1 focus:ring-amber-500"
                            >
                              <option value="food">Food & Dining</option>
                              <option value="transport">Transport</option>
                              <option value="shopping">Shopping</option>
                              <option value="entertainment">Entertainment</option>
                              <option value="health">Health</option>
                              <option value="utilities">Utilities</option>
                              <option value="other">Other</option>
                            </select>
                          </td>
                          <td className="px-3.5 py-2.5 text-right font-bold text-amber-400">
                            ${tx.amount.toFixed(2)}
                          </td>
                          <td className="px-3.5 py-2.5 text-center">
                            <button
                              type="button"
                              onClick={() => handleRemoveRow(idx)}
                              className="text-zinc-500 hover:text-red-400 p-1 rounded"
                              aria-label="Remove Row"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCandidateList([])}
                  className="text-zinc-400"
                >
                  Clear Selection
                </Button>
                <Button
                  variant="gold"
                  onClick={handleCommit}
                  disabled={isCommitting}
                  className="gap-2"
                >
                  <span>Commit {candidateList.length} Transactions</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
