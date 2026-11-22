# Implementation Plan: Phase 5 — Automated Ingestion & Statement Parser

This plan is structured into small, self-contained task groups. Each group can be implemented, verified, and committed independently.

---

## Group 1: Drizzle Schema & Migration Pipeline
**Goal**: Declare `statement_uploads` table in Drizzle ORM and generate PostgreSQL RLS migration scripts.

- [x] Task 1.1: Update `src/lib/db/schema.ts` with `statement_uploads` table and types.
- [x] Task 1.2: Create migration script `drizzle/0003_statement_uploads_rls.sql` with RLS policies:
  - `ALTER TABLE statement_uploads ENABLE ROW LEVEL SECURITY;`
  - `CREATE POLICY "statement_uploads_isolation" ON statement_uploads FOR ALL USING (auth.uid() = user_id);`
- [x] Checkpoint: Verify Drizzle schema types pass `npm run typecheck`.

---

## Group 2: Statement Parsing Engine (AI & Deterministic Fallback)
**Goal**: Implement robust CSV and structured statement parsing supporting both Gemini 2.0 Flash and offline heuristic extraction.

- [x] Task 2.1: Implement `src/lib/ingest/parser.ts`:
  - `parseCsvStatement(csvString)`
  - `extractWithGemini(rawText)`
  - Typed Zod schema `parsedTransactionSchema`.
- [x] Task 2.2: Implement test sanity check `src/lib/ingest/parser.test.ts`.
- [x] Checkpoint: Verify parser correctly extracts sample bank statement rows.

---

## Group 3: Server Actions & Batch Commitment Pipeline
**Goal**: Create type-safe Server Actions for parsing statements and batch-inserting approved transactions.

- [x] Task 3.1: Implement `src/app/dashboard/import/actions.ts`:
  - `parseStatementAction(formData)`
  - `commitBatchTransactionsAction(candidateTransactions)`
- [x] Checkpoint: Verify Server Actions compile with strict typing.

---

## Group 4: Reconciliation Interface & Dashboard Integration
**Goal**: Build `/dashboard/import` view with file dropzone, sample loader, and editable reconciliation table.

- [x] Task 4.1: Create `src/app/dashboard/import/page.tsx`:
  - Drag-and-drop file upload zone.
  - One-click "Load Sample Bank Statement" helper.
  - Interactive reconciliation table (edit category, delete candidate row).
  - "Import Confirmed Transactions" batch action button.
- [x] Task 4.2: Update `src/app/dashboard/layout.tsx` with "Import Statement" navigation tab.
- [x] Task 4.3: Update `src/app/dashboard/page.tsx` with quick access to statement importer.
- [x] Checkpoint: Verify file parsing, batch insertion, zero em dashes, and mobile responsiveness.

---

## Group 5: Quality Gates, Static Verification & Roadmap Sync
**Goal**: Verify build, run Anti-Slop audit, and check off Phase 5 in `specs/roadmap.md`.

- [x] Task 5.1: Run `npm run typecheck` (`tsc --noEmit`) and verify 0 errors.
- [x] Task 5.2: Run `npm run lint` and verify 0 warnings/errors.
- [x] Task 5.3: Run `npm run build` and ensure Next.js outputs a production bundle.
- [x] Task 5.4: Conduct Anti-Slop Audit (no em dashes, action-specific CTAs, WCAG AA contrast).
- [x] Task 5.5: Update `specs/roadmap.md` with checked boxes `[x]` for Phase 5.
- [x] Checkpoint: All quality checks green and ready for Phase 6.
