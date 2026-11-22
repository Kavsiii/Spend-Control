# Implementation Plan: Phase 3 — Daily Expense Ingestion (Manual Quick Entry)

This plan is structured into small, self-contained task groups. Each group can be implemented, verified, and committed independently.

---

## Group 1: Drizzle Schema & Migration Pipeline
**Goal**: Declare `transactions` table in Drizzle ORM and generate PostgreSQL RLS migration scripts.

- [x] Task 1.1: Update `src/lib/db/schema.ts` with `transactions` table and relations.
- [x] Task 1.2: Create migration script `drizzle/0002_transactions_rls.sql` with RLS policies:
  - `ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;`
  - `CREATE POLICY "transactions_isolation" ON transactions FOR ALL USING (auth.uid() = user_id);`
- [x] Checkpoint: Verify Drizzle schema types pass `npm run typecheck`.

---

## Group 2: Server Actions & Validation Pipeline
**Goal**: Implement type-safe Server Actions for logging, editing, and deleting daily transactions with Zod validation.

- [x] Task 2.1: Implement `src/app/dashboard/transactions/actions.ts`:
  - `createTransactionAction(formData)`
  - `deleteTransactionAction(transactionId)`
  - Multi-currency normalization helper.
- [x] Checkpoint: Verify Server Actions compile with strict typing.

---

## Group 3: Transactions UI & Filterable History View
**Goal**: Build `/dashboard/transactions` view with quick log form, category filters, and search bar.

- [x] Task 3.1: Create `src/app/dashboard/transactions/page.tsx`:
  - Monthly variable spend summary card.
  - Quick Log Expense form (Amount, Category, Date, Account, Description).
  - Category filter pills (All, Food, Transport, Shopping, Entertainment, Utilities, Health, Other).
  - Search bar with instant client-side filtering.
  - Paginated / styled transaction items with delete action.
- [x] Task 3.2: Update `src/app/dashboard/layout.tsx` to include "Transactions" navigation link.
- [x] Task 3.3: Update `src/app/dashboard/page.tsx` with quick links and variable spend KPI.
- [x] Checkpoint: Verify navigation, search reactivity, zero em dashes, and mobile responsiveness.

---

## Group 4: Quality Gates, Static Verification & Roadmap Sync
**Goal**: Verify build, run Anti-Slop audit, and check off Phase 3 in `specs/roadmap.md`.

- [x] Task 4.1: Run `npm run typecheck` (`tsc --noEmit`) and verify 0 errors.
- [x] Task 4.2: Run `npm run lint` and verify 0 warnings/errors.
- [x] Task 4.3: Run `npm run build` and ensure Next.js outputs a production bundle.
- [x] Task 4.4: Conduct Anti-Slop Audit (no em dashes, action-specific CTAs, WCAG AA contrast).
- [x] Task 4.5: Update `specs/roadmap.md` with checked boxes `[x]` for Phase 3.
- [x] Checkpoint: All quality checks green and ready for Phase 4.
