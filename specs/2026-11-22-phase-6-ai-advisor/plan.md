# Implementation Plan: Phase 6 — AI Financial Advisor ("Can I / When Can I Buy This?")

This plan is structured into small, self-contained task groups. Each group can be implemented, verified, and committed independently.

---

## Group 1: Drizzle Schema & Migration Pipeline
**Goal**: Declare `wishlist_items` table in Drizzle ORM and generate PostgreSQL RLS migration scripts.

- [x] Task 1.1: Update `src/lib/db/schema.ts` with `wishlist_items` table and types.
- [x] Task 1.2: Create migration script `drizzle/0004_wishlist_items_rls.sql` with RLS policies:
  - `ALTER TABLE wishlist_items ENABLE ROW LEVEL SECURITY;`
  - `CREATE POLICY "wishlist_items_isolation" ON wishlist_items FOR ALL USING (auth.uid() = user_id);`
- [x] Checkpoint: Verify Drizzle schema types pass `npm run typecheck`.

---

## Group 2: Deterministic Snapshot & AI Reasoning Engine
**Goal**: Implement mathematical affordability evaluator and AI guidance generator.

- [x] Task 2.1: Implement `src/lib/ai/advisor.ts`:
  - `evaluateAffordabilityMath(targetCost, liquidBalance, monthlyCommittedBurn, averageDailySpend)`
  - `generatePurchaseAdvice(itemTitle, itemCost, mathSnapshot)`
  - Zod schema for structured advisory response.
- [x] Task 2.2: Implement test sanity check `src/lib/ai/advisor.test.ts`.
- [x] Checkpoint: Verify mathematical evaluations return exact dates and margins.

---

## Group 3: Server Actions & Wishlist Mutations
**Goal**: Implement type-safe Server Actions for running evaluations and saving wishlist items.

- [x] Task 3.1: Implement `src/app/dashboard/advisor/actions.ts`:
  - `evaluatePurchaseAction(formData)`
  - `saveWishlistItemAction(formData)`
  - `deleteWishlistItemAction(id)`
- [x] Checkpoint: Verify Server Actions compile with strict typing.

---

## Group 4: Advisor Interface & Wishlist Tracker
**Goal**: Build `/dashboard/advisor` view with interactive evaluator, decision card, and wishlist queue.

- [x] Task 4.1: Create `src/app/dashboard/advisor/page.tsx`:
  - Purchase evaluation input form (Item, Price, Priority, Desired Timeline).
  - Decision card displaying Verdict Badge, mathematical breakdown, and advisory guidance.
  - Wishlist management list.
- [x] Task 4.2: Update `src/app/dashboard/layout.tsx` with "AI Advisor" navigation tab.
- [x] Task 4.3: Update `src/app/dashboard/page.tsx` with quick access to the AI purchase evaluator.
- [x] Checkpoint: Verify evaluation reactivity, zero em dashes, and mobile responsiveness.

---

## Group 5: Quality Gates, Static Verification & Roadmap Sync
**Goal**: Verify build, run Anti-Slop audit, and check off Phase 6 in `specs/roadmap.md`.

- [x] Task 5.1: Run `npm run typecheck` (`tsc --noEmit`) and verify 0 errors.
- [x] Task 5.2: Run `npm run lint` and verify 0 warnings/errors.
- [x] Task 5.3: Run `npm run build` and ensure Next.js outputs a production bundle.
- [x] Task 5.4: Conduct Anti-Slop Audit (no em dashes, action-specific CTAs, WCAG AA contrast).
- [x] Task 5.5: Update `specs/roadmap.md` with checked boxes `[x]` for Phase 6.
- [x] Checkpoint: All quality checks green and ready for Phase 7.
