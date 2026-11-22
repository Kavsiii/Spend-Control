# Validation Plan: Phase 5 — Automated Ingestion & Statement Parser

This document defines the automated commands, expected results, manual acceptance checks, and non-required items to declare Phase 5 complete.

---

## 1. Automated Verification Commands

| Command | Expected Output / Exit Code | Purpose |
| :--- | :--- | :--- |
| `npm run typecheck` | Exit code `0`<br>Clean completion with zero TypeScript diagnostics. | Verifies strict typing across parser schemas, AI SDK models, and batch actions. |
| `npm run lint` | Exit code `0`<br>`✔ No ESLint warnings or errors` | Enforces code hygiene and Next.js best practices. |
| `npm run build` | Exit code `0`<br>Optimized production bundle including `/dashboard/import`. | Verifies Server Components, AI SDK bundling, and route generation. |

---

## 2. Manual Verification Checklist

- [ ] **Dropzone & Upload Interaction**:
  - Dragging a statement file or clicking "Load Sample Bank Statement" triggers parsing.
  - Extracted transactions populate the reconciliation table with dates, descriptions, categories, and amounts.
- [ ] **Human-in-the-Loop Reconciliation**:
  - Categories can be changed in the table via dropdown.
  - Rows can be removed before committing.
- [ ] **Batch Commitment**:
  - Clicking "Commit Transactions" saves all selected items and refreshes transaction count.
- [ ] **Anti-Slop Quality Gate**:
  - Zero em dashes (`—`) in copy or labels.
  - Zero AI buzzwords ("revolutionary statement AI", "seamless import").
  - Action-specific CTAs: "Upload Statement", "Commit Transactions".
  - High contrast verified for table rows and buttons.

---

## 3. "Not Required" in Phase 5

- Live production Supabase Storage credentials (in-memory parsing and local uploads supported).
- Live Gemini API billing (robust deterministic heuristic fallback parses bank statements cleanly).
