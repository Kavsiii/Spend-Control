# Requirements: Phase 3 — Daily Expense Ingestion (Manual Quick Entry)

## 1. Context

To evaluate daily spending velocity and determine discretionary surplus, the system requires frictionless logging of variable everyday expenses (groceries, transport, coffee, dining, shopping). Phase 3 delivers:
- Multi-currency transaction schema with normalized `base_amount`.
- Fast, accessible expense logging interface with mobile floating action trigger.
- Category tagging, search, and date-range filtering.
- Optimistic, zero-slop UI with high contrast.

---

## 2. Scope

### In Scope
1. **Drizzle Schema & Multi-Tenancy**:
   - `transactions` entity (`id`, `user_id`, `account_id`, `amount`, `currency`, `base_amount`, `type`, `category`, `transaction_date`, `description`, `raw_source`, `created_at`, `updated_at`).
   - PostgreSQL Row Level Security (RLS) enforcing `user_id = auth.uid()`.
2. **Multi-Currency Normalization**:
   - Stores native transaction currency alongside normalized `base_amount` in user's default base currency.
3. **Server Actions & Mutations**:
   - `createTransactionAction(formData)` with Zod validation.
   - `deleteTransactionAction(id)`.
   - `updateTransactionAction(formData)`.
4. **User Interface (`/dashboard/transactions`)**:
   - Quick log expense form with category picker and account selector.
   - Mobile-optimized Quick Add modal with accessible keyboard triggers.
   - Searchable, filterable transaction history list.
   - Monthly variable spend summary card.
5. **Anti-Slop Craftsmanship**:
   - Zero em dashes (`—`) in UI copy or validation errors.
   - Action-specific CTAs ("Log Expense", "Delete Entry").
   - Semantic category badges without unearned neon gradients or pill spam.

### Out of Scope
- Visual charts (burn rate area charts, category donuts) — deferred to Phase 4.
- Automated bank statement PDF/CSV parsing — deferred to Phase 5.
- AI advisory chat — deferred to Phase 6.

---

## 3. Key Decisions & Rationale

| Decision | Selected Option | Rationale |
| :--- | :--- | :--- |
| **Dual Amount Columns** | `amount` and `base_amount` | Preserves raw transaction integrity (e.g. 50 EUR spent during travel) while providing seamless local calculations in base currency (e.g. USD). |
| **Optimistic Filtering** | Client-side reactive filter with server state | Guarantees instant search and category filtering response times without sluggish page reloads. |
| **Categories Hierarchy** | Curated standard categories (Food, Transport, Shopping, Entertainment, Utilities, Health, Other) | Prevents category fragmentation while covering 95%+ of daily retail expenditures. |

---

## 4. EARS Behavioral Specifications

- **EARS-001 (Ubiquitous)**: Every transaction record SHALL be linked to `user_id` with PostgreSQL Row Level Security enabled.
- **EARS-002 (Event-driven)**: WHEN a user submits a valid expense, the system SHALL record the transaction and update the monthly variable total immediately.
- **EARS-003 (Event-driven)**: WHEN a user types in the search field, the system SHALL filter transaction descriptions in real time without screen flicker.
- **EARS-004 (Event-driven)**: WHEN a user selects a category filter pill, the list SHALL display only transactions matching that category.
- **EARS-005 (Unwanted Event)**: IF amount is zero or negative, THEN the system SHALL reject the submission and display a clear inline error.
- **EARS-006 (Ubiquitous)**: All transaction amounts and category pills SHALL meet WCAG AA contrast standards ($\ge 4.5:1$).
