# Implementation Plan: Phase 2 — Accounts & Fixed Commitments (Loans, EMIs, Rent)

This plan is structured into small, self-contained task groups. Each group can be implemented, verified, and committed independently.

---

## Group 1: Drizzle Schemas & Migration Pipeline
**Goal**: Declare `accounts` and `commitments` tables in Drizzle ORM and generate PostgreSQL RLS migration scripts.

- [x] Task 1.1: Update `src/lib/db/schema.ts` with `accounts` and `commitments` tables.
- [x] Task 1.2: Create migration script `drizzle/0001_accounts_and_commitments_rls.sql` with RLS policies:
  - `ALTER TABLE accounts ENABLE ROW LEVEL SECURITY;`
  - `CREATE POLICY "accounts_isolation" ON accounts FOR ALL USING (auth.uid() = user_id);`
  - `ALTER TABLE commitments ENABLE ROW LEVEL SECURITY;`
  - `CREATE POLICY "commitments_isolation" ON commitments FOR ALL USING (auth.uid() = user_id);`
- [x] Checkpoint: Verify Drizzle schema types pass `npm run typecheck`.

---

## Group 2: Deterministic Financial Engine
**Goal**: Implement pure TypeScript arithmetic functions for balance summation, commitment normalization, and due date projections.

- [x] Task 2.1: Implement `src/lib/finance/calculations.ts`:
  - `calculateTotalLiquidBalance(accounts)`
  - `calculateMonthlyCommittedBurn(commitments)`
  - `getUpcomingCommitments(commitments, daysHorizon)`
  - `calculateDiscretionaryDailyBuffer(totalLiquidity, monthlyCommittedBurn, estimatedDailyLiving)`
- [x] Task 2.2: Implement comprehensive deterministic tests / sanity checks in `src/lib/finance/calculations.test.ts`.
- [x] Checkpoint: Verify calculations return exact decimals with zero rounding artifacts.

---

## Group 3: Server Actions & State Mutations
**Goal**: Create type-safe Server Actions for managing accounts and fixed commitments with Zod validation.

- [x] Task 3.1: Implement `src/app/dashboard/accounts/actions.ts`:
  - `createAccountAction(formData)`
  - `deleteAccountAction(accountId)`
  - `updateAccountBalanceAction(accountId, newBalance)`
- [x] Task 3.2: Implement `src/app/dashboard/commitments/actions.ts`:
  - `createCommitmentAction(formData)`
  - `toggleCommitmentAction(commitmentId, isActive)`
  - `deleteCommitmentAction(commitmentId)`
- [x] Checkpoint: Verify Server Actions compile with strict typing and error responses.

---

## Group 4: UI Management Views & Dashboard Integration
**Goal**: Build the Accounts management view, Commitments view, and wire live figures into the command center.

- [x] Task 4.1: Create `src/app/dashboard/accounts/page.tsx`:
  - Total liquid balance KPI header.
  - Accounts list with account type badges (Bank, Cash, Credit).
  - Quick "Add Account" form with clean Black & Gold styling.
- [x] Task 4.2: Create `src/app/dashboard/commitments/page.tsx`:
  - Total monthly committed burn KPI header.
  - Commitments table/cards with due date badges and active toggles.
  - Quick "Add Commitment" form (Category: Loan EMI, Rent, Utility, Subscription).
- [x] Task 4.3: Update `src/app/dashboard/layout.tsx` with navigation tabs (Overview, Accounts, Commitments).
- [x] Task 4.4: Update `src/app/dashboard/page.tsx` to display live summaries from registered accounts and commitments.
- [x] Checkpoint: Verify smooth navigation, zero em dashes, and mobile responsiveness.

---

## Group 5: Quality Gates, Static Verification & Roadmap Sync
**Goal**: Verify build, run Anti-Slop audit, and check off Phase 2 in `specs/roadmap.md`.

- [x] Task 5.1: Run `npm run typecheck` (`tsc --noEmit`) and verify 0 errors.
- [x] Task 5.2: Run `npm run lint` and verify 0 warnings/errors.
- [x] Task 5.3: Run `npm run build` and ensure Next.js outputs a production bundle.
- [x] Task 5.4: Conduct Anti-Slop Audit (no em dashes, action-specific CTAs, WCAG AA contrast).
- [x] Task 5.5: Update `specs/roadmap.md` with checked boxes `[x]` for Phase 2.
- [x] Checkpoint: All quality checks green and ready for Phase 3.
