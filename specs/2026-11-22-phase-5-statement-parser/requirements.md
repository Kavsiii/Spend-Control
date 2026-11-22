# Requirements: Phase 5 — Automated Ingestion & Statement Parser

## 1. Context

Manual expense entry is essential for immediate daily tracking, but retroactively importing bank statements (CSV / text) saves hours of data entry. Phase 5 delivers:
- Multi-tenant `statement_uploads` tracking table with PostgreSQL RLS.
- High-resilience parsing engine combining fast CSV parsing (`papaparse`) and structured LLM extraction (Gemini 2.0 Flash via Vercel AI SDK) with a deterministic heuristic fallback.
- User review and reconciliation UI allowing users to inspect, tweak categories, and batch-commit parsed transactions into their account.
- Zero-slop interface with accessible file dropzone and high contrast.

---

## 2. Scope

### In Scope
1. **Drizzle Schema & Multi-Tenancy**:
   - `statement_uploads` entity (`id`, `user_id`, `file_name`, `file_url`, `file_type`, `status`, `extracted_count`, `created_at`, `updated_at`).
   - PostgreSQL Row Level Security (RLS) enforcing `user_id = auth.uid()`.
2. **Ingestion Pipeline**:
   - `parseCsvStatement(csvText)` extracting dates, descriptions, categories, and amounts.
   - Gemini 2.0 Flash AI structured extraction (`generateObject` with Zod schema) when API key is available.
   - Pure TypeScript deterministic fallback parser for offline/demo operation.
3. **Server Actions & Mutations**:
   - `parseStatementAction(formData)` extracting candidate transactions.
   - `commitBatchTransactionsAction(items)` batch persisting confirmed rows to `transactions`.
4. **Reconciliation Interface (`/dashboard/import`)**:
   - Drag-and-drop file dropzone with sample bank statement loader.
   - Candidate transactions review table (editable category, amount, description).
   - "Import Confirmed Transactions" batch action.
5. **Anti-Slop Craftsmanship**:
   - Zero em dashes (`—`).
   - Clear action-specific CTAs ("Upload Statement", "Commit 5 Transactions").
   - Resilient empty and processing states with clear feedback.

### Out of Scope
- Direct bank OAuth connections (Plaid/Account Aggregator) — deferred to future enterprise sync.
- AI purchase recommendation engine — deferred to Phase 6.

---

## 3. Key Decisions & Rationale

| Decision | Selected Option | Rationale |
| :--- | :--- | :--- |
| **Hybrid Parser Architecture** | AI Structured Output + Heuristic Fallback | AI excels at messy narrative descriptions, while deterministic fallback guarantees 100% offline uptime even without an API key. |
| **Human-in-the-Loop Reconciliation** | Review table before DB insertion | Follows Financial Logic rule in `Agents.md`: never blindly persist unverified automated data. The user must review and approve. |
| **CSV & Structured Text First** | Universal bank export format | All financial institutions support CSV export, ensuring universal compatibility without proprietary PDF lock-in. |

---

## 4. EARS Behavioral Specifications

- **EARS-001 (Ubiquitous)**: Every statement upload record SHALL include `user_id` with PostgreSQL Row Level Security enabled.
- **EARS-002 (Event-driven)**: WHEN a user uploads a statement file, the system SHALL extract candidate transactions and render them in a review table.
- **EARS-003 (State-driven)**: WHILE reviewing extracted transactions, the user SHALL be able to edit categories and exclude unwanted rows.
- **EARS-004 (Event-driven)**: WHEN a user clicks "Import Confirmed Transactions", the system SHALL batch insert the validated rows into `transactions` and revalidate dashboard caches.
- **EARS-005 (Unwanted Event)**: IF a file contains malformed rows, THEN the system SHALL skip invalid rows with an informative warning rather than aborting the entire batch.
- **EARS-006 (Ubiquitous)**: All upload interfaces and reconciliation tables SHALL satisfy WCAG AA contrast standards and contain zero em dashes.
