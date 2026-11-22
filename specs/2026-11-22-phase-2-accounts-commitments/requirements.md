# Requirements: Phase 2 — Accounts & Fixed Commitments (Loans, EMIs, Rent)

## 1. Context

To evaluate whether a user can afford a purchase, the system must know:
1. Current liquid assets across bank accounts, wallets, and cash reserves.
2. Fixed recurring obligations: loan EMIs, rent, utilities, and subscriptions that drain cash flow every month.

Phase 2 establishes the data structures, deterministic calculation engine, and user interfaces to register, update, and manage accounts and fixed financial commitments.

---

## 2. Scope

### In Scope
1. **Drizzle Schema & Multi-Tenancy**:
   - `accounts` entity (`id`, `user_id`, `name`, `type`, `balance`, `currency`, `is_primary`, `created_at`, `updated_at`).
   - `commitments` entity (`id`, `user_id`, `title`, `category`, `amount`, `currency`, `frequency`, `next_due_date`, `end_date`, `is_active`, `auto_debit`, `notes`, `created_at`, `updated_at`).
   - PostgreSQL Row Level Security (RLS) policies enforcing `user_id = auth.uid()` for both tables.
2. **Deterministic Financial Math**:
   - Pure TypeScript calculation module (`src/lib/finance/calculations.ts`):
     - `calculateTotalLiquidBalance`: sums cash, bank, and non-credit balances.
     - `calculateMonthlyCommittedBurn`: normalizes monthly, quarterly, and annual commitments into a precise monthly cash requirement.
     - `calculateUpcomingCommitments`: identifies debts/bills due within an $N$-day horizon.
3. **Server Actions & Mutations**:
   - `createAccount`, `updateAccountBalance`, `deleteAccount` with Zod validation.
   - `createCommitment`, `toggleCommitmentActive`, `deleteCommitment` with Zod validation.
   - Resilient development fallback for local testing.
4. **Dashboard Interfaces**:
   - Sub-navigation for `/dashboard`:
     - `/dashboard/accounts`: List accounts, total liquidity counter, Add Account form.
     - `/dashboard/commitments`: List recurring debts/EMIs, due date indicators, Add Commitment form, monthly burden summary.
   - Updated main `/dashboard` page dynamically showing live/mocked balances and committed burn calculations.
5. **Anti-Slop Craftsmanship**:
   - Zero em dashes (`—`) in UI copy or validation errors.
   - Action-specific CTAs ("Save Account", "Add Fixed Commitment").
   - Clear empty states explaining how to add an account or recurring loan.

### Out of Scope
- Daily variable transactions (groceries, dining, transit) — deferred to Phase 3.
- Automated bank feeds / CSV uploads — deferred to Phase 5.
- AI purchase recommendation engine — deferred to Phase 6.

---

## 3. Key Decisions & Rationale

| Decision | Selected Option | Rationale |
| :--- | :--- | :--- |
| **Commitment Frequency Normalization** | Monthly base equivalence | Quarterly ($/3$) and Annual ($/12$) commitments are normalized to monthly burn to provide an accurate monthly cash flow baseline. |
| **Liquid vs Debt Distinction** | Account types (`bank`, `cash`, `credit`) | Credit accounts represent liabilities; only asset accounts (`bank`, `cash`) contribute to uncommitted liquidity. |
| **Deterministic Math First** | Pure TypeScript functions | Adheres to Rule 3 in `Agents.md`: financial arithmetic must never be delegated to an LLM. |

---

## 4. EARS Behavioral Specifications

- **EARS-001 (Ubiquitous)**: Every account and commitment record SHALL include a foreign key `user_id` referencing the authenticated user with RLS enabled.
- **EARS-002 (Ubiquitous)**: The system SHALL compute total monthly committed burn deterministically by summing active commitments normalized to 30-day equivalents.
- **EARS-003 (Event-driven)**: WHEN a user toggles a commitment's active status, the system SHALL recalculate the total monthly committed burn immediately.
- **EARS-004 (Event-driven)**: WHEN a user creates a new account, the system SHALL validate the balance format using Zod before persisting.
- **EARS-005 (State-driven)**: WHILE viewing the commitments list, overdue or upcoming commitments within 7 days SHALL display a high-contrast alert badge.
- **EARS-006 (Ubiquitous)**: When no accounts or commitments exist, the system SHALL display an actionable empty state with an immediate creation action (satisfying Resilience / C-4).
