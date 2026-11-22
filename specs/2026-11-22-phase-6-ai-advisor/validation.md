# Validation Plan: Phase 6 — AI Financial Advisor ("Can I / When Can I Buy This?")

This document defines the automated commands, expected results, manual acceptance checks, and non-required items to declare Phase 6 complete.

---

## 1. Automated Verification Commands

| Command | Expected Output / Exit Code | Purpose |
| :--- | :--- | :--- |
| `npm run typecheck` | Exit code `0`<br>Clean completion with zero TypeScript diagnostics. | Verifies strict typing across AI advisor logic, Zod schemas, and actions. |
| `npm run lint` | Exit code `0`<br>`✔ No ESLint warnings or errors` | Enforces code hygiene and Next.js best practices. |
| `npm run build` | Exit code `0`<br>Optimized production bundle including `/dashboard/advisor`. | Verifies Server Components, AI SDK bundling, and route generation. |

---

## 2. Manual Verification Checklist

- [ ] **Affordability Evaluator Interaction**:
  - Entering an affordable item (e.g. $150 with $8,420 liquid balance) returns a "BUY_NOW" verdict.
  - Entering an expensive item (e.g. $4,000) returns a "DEFER" verdict with exact days to save and safe target date.
- [ ] **Deterministic Math Display**:
  - Evaluation results explicitly display: Total Liquidity, 60-Day Fixed Burden Reserved, and Remaining Buffer.
- [ ] **Wishlist Management**:
  - Saving an evaluated item adds it to the wishlist table with priority and verdict tags.
- [ ] **Anti-Slop Quality Gate**:
  - Zero em dashes (`—`) in copy or labels.
  - Zero AI buzzwords ("revolutionary financial foresight", "seamless buying").
  - Action-specific CTAs: "Evaluate Purchase", "Save to Wishlist".
  - High contrast verified for all cards, badges, and text.

---

## 3. "Not Required" in Phase 6

- Live paid Gemini API key (offline rule-based reasoning engine generates high-fidelity structured advice).
- Automated bank withdrawals or merchant checkout.
