# Validation Plan: Phase 3 — Daily Expense Ingestion (Manual Quick Entry)

This document defines the automated commands, expected results, manual acceptance checks, and non-required items to declare Phase 3 complete.

---

## 1. Automated Verification Commands

| Command | Expected Output / Exit Code | Purpose |
| :--- | :--- | :--- |
| `npm run typecheck` | Exit code `0`<br>Clean completion with zero TypeScript diagnostics. | Verifies strict typing across transactions schema, actions, and UI state. |
| `npm run lint` | Exit code `0`<br>`✔ No ESLint warnings or errors` | Enforces code hygiene and Next.js best practices. |
| `npm run build` | Exit code `0`<br>Optimized production bundle including `/dashboard/transactions`. | Verifies Server Components, Route Handlers, and UI compilation. |

---

## 2. Manual Verification Checklist

- [ ] **Transactions Management (`/dashboard/transactions`)**:
  - Displays Total Variable Spend this month.
  - Form allows logging a daily expense with Amount, Category, Account, Date, and Description.
  - Adding an expense updates the list and recalculates monthly variable spend.
- [ ] **Search & Category Filtering**:
  - Clicking category pills (e.g. "Food", "Transport") filters the list instantly.
  - Typing in the search bar filters rows by note/description without lag.
- [ ] **Multi-Currency Normalization**:
  - Foreign transactions retain their native currency and record a converted `base_amount`.
- [ ] **Anti-Slop Quality Gate**:
  - Zero em dashes (`—`) in copy or labels.
  - Zero AI buzzwords.
  - Action-specific CTAs: "Log Expense", "Delete Transaction".
  - Full keyboard accessibility and WCAG AA contrast.

---

## 3. "Not Required" in Phase 3

- Visual analytics charts with Recharts (tested in Phase 4).
- Bank statement OCR / PDF parsing (tested in Phase 5).
- AI advisor evaluation (tested in Phase 6).
