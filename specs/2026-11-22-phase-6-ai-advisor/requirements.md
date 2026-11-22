# Requirements: Phase 6 — AI Financial Advisor ("Can I / When Can I Buy This?")

## 1. Context

The primary differentiator of Spend Control (per brief.md) is proactive decision support: answering *"Can I afford this product?"* and *"When should I buy it without missing upcoming loan or living commitments?"*

Adhering strictly to Rule 3 in `Agents.md` (Financial Logic & AI Separation of Concerns):
- All financial balances, net surplus, debt obligations, and target dates are calculated **deterministically** in TypeScript.
- The AI Advisor interprets the pre-computed mathematical snapshot to provide structured qualitative guidance, trade-off analysis, and customized savings pacing.

---

## 2. Scope

### In Scope
1. **Drizzle Schema & Multi-Tenancy**:
   - `wishlist_items` entity (`id`, `user_id`, `title`, `target_amount`, `currency`, `priority`, `target_date`, `status`, `verdict`, `surplus_deficit`, `safe_purchase_date`, `advice_rationale`, `created_at`, `updated_at`).
   - PostgreSQL Row Level Security (RLS) enforcing `user_id = auth.uid()`.
2. **Deterministic Financial Evaluation Engine**:
   - `evaluatePurchaseAffordability(itemPrice, liquidBalance, monthlyCommittedBurn, averageDailySpend, targetDays)`
   - Protects 60-day committed burn + living expenses as a safety reserve before declaring an item affordable.
   - Calculates exact savings timeline required if an item exceeds current uncommitted liquidity.
3. **AI Advisory Reasoning Engine**:
   - Structured recommendation generator using Gemini 2.0 Flash (`generateObject` via Vercel AI SDK).
   - High-fidelity offline rule-based reasoning engine ensuring 100% testable uptime without API keys.
4. **User Interface (`/dashboard/advisor`)**:
   - Interactive Purchase Evaluator form.
   - Evaluation Result Card with high-contrast Verdict Badge, mathematical breakdown, and qualitative guidance.
   - Saved Wishlist tracker with status badges.
5. **Anti-Slop Craftsmanship**:
   - Zero em dashes (`—`).
   - Honest math over vague affirmations; no fake certainty or empty buzzwords.
   - Action-specific CTAs ("Evaluate Purchase", "Save to Wishlist").

### Out of Scope
- Automated checkout or shopping cart integrations.
- Stock/crypto asset liquidation.

---

## 3. Key Decisions & Rationale

| Decision | Selected Option | Rationale |
| :--- | :--- | :--- |
| **Separation of Concerns** | Pre-calculated Deterministic Math + AI Guidance | Mathematical hallucinations in financial advice are completely unacceptable. Pure functions handle numbers; AI handles prose and reasoning. |
| **60-Day Debt Shield** | 2-month committed reserve protection | Guarantees that purchasing a luxury or desire does not compromise upcoming loan EMIs, rent, or recurring bills. |
| **Hybrid AI Engine** | Vercel AI SDK + Heuristic Generator | Guarantees instant local responses and complete offline testing while supporting live Gemini intelligence. |

---

## 4. EARS Behavioral Specifications

- **EARS-001 (Ubiquitous)**: The evaluation engine SHALL compute liquidity surplus or deficit using deterministic arithmetic before generating advisory commentary.
- **EARS-002 (Event-driven)**: WHEN a user enters an item cost below uncommitted surplus, the system SHALL output a "BUY_NOW" verdict with remaining cushion.
- **EARS-003 (Event-driven)**: WHEN a user enters an item cost exceeding uncommitted surplus, the system SHALL output a "DEFER" verdict with a calculated target date and recommended daily savings rate.
- **EARS-004 (State-driven)**: WHILE evaluating an item, the safety reserve calculation SHALL reserve at least 60 days of fixed commitments and living expenses.
- **EARS-005 (Ubiquitous)**: All evaluation cards, status pills, and advisor rationale SHALL satisfy WCAG AA contrast standards and contain zero em dashes.
