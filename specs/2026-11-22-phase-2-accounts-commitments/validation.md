# Validation Plan: Phase 2 — Accounts & Fixed Commitments (Loans, EMIs, Rent)

This document defines the automated commands, expected results, manual acceptance checks, and non-required items to declare Phase 2 complete.

---

## 1. Automated Verification Commands

| Command | Expected Output / Exit Code | Purpose |
| :--- | :--- | :--- |
| `npm run typecheck` | Exit code `0`<br>Clean completion with zero TypeScript diagnostics. | Verifies strict typing across Drizzle schema, calculations, and Server Actions. |
| `npm run lint` | Exit code `0`<br>`✔ No ESLint warnings or errors` | Enforces code hygiene and Next.js best practices. |
| `npm run build` | Exit code `0`<br>Optimized production bundle including `/dashboard/accounts` and `/dashboard/commitments`. | Verifies Server Components, Route Handlers, and UI compilation. |

---

## 2. Manual Verification Checklist

- [ ] **Accounts Management (`/dashboard/accounts`)**:
  - Displays total liquid assets.
  - Add Account form creates an account (Bank, Cash, or Credit).
  - Empty state renders gracefully with action prompt if no accounts exist.
- [ ] **Commitments Management (`/dashboard/commitments`)**:
  - Displays monthly committed burn correctly normalized.
  - Add Commitment form creates recurring item (Loan EMI, Rent, Subscription).
  - Active toggle updates status and recalculates monthly burn.
  - Due dates within 7 days display high-contrast alerts.
- [ ] **Deterministic Math Validation**:
  - Liquid balances exclude credit liabilities from uncommitted liquidity.
  - Quarterly and Annual commitments are mathematically divided into 30-day burn equivalents without precision loss.
- [ ] **Anti-Slop Quality Gate**:
  - Zero em dashes (`—`) in copy or labels.
  - Zero AI buzzwords.
  - Action-specific CTAs: "Add Account", "Save Commitment", "Update Balance".
  - Full keyboard accessibility and WCAG AA contrast.

---

## 3. "Not Required" in Phase 2

- Automated bank SMS scraping or Plaid / Account Aggregator integration.
- Daily expense transaction history (tested in Phase 3).
- Visual charts and graphs via Recharts (tested in Phase 4).
