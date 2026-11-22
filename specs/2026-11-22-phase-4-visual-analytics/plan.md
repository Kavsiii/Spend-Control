# Implementation Plan: Phase 4 — Visual Dashboard & Financial Analytics

This plan is structured into small, self-contained task groups. Each group can be implemented, verified, and committed independently.

---

## Group 1: Chart Infrastructure & Transformation Helpers
**Goal**: Implement data transformation utilities mapping raw accounts, commitments, and transactions into chart series.

- [x] Task 1.1: Implement `src/lib/finance/chart-data.ts`:
  - `getDailyVelocitySeries(transactions, daysHorizon, dailyLimit)`
  - `getCategoryDistributionSeries(transactions)`
  - `getCashFlowComparisonSeries(liquidAssets, monthlyCommitments, variableSpend)`
- [x] Task 1.2: Checkpoint: Verify transformation utilities return typed datasets.

---

## Group 2: Recharts Component Suite (Anti-Slop Aligned)
**Goal**: Build reusable, accessible chart components with custom Black & Gold styling.

- [x] Task 2.1: Create `src/components/charts/daily-burn-chart.tsx`:
  - Responsive Area chart with gradient gold fill and daily threshold reference line.
- [x] Task 2.2: Create `src/components/charts/category-donut-chart.tsx`:
  - Responsive Donut chart with category legend and high-contrast color palette.
- [x] Task 2.3: Create `src/components/charts/cash-flow-bar-chart.tsx`:
  - Responsive Bar chart comparing Inflow / Assets vs Fixed Burn vs Variable Spend.
- [x] Checkpoint: Verify chart components handle empty states cleanly.

---

## Group 3: Dashboard Integration & Time Horizon Controls
**Goal**: Embed visual analytics into `/dashboard` with interactive time range filtering.

- [x] Task 3.1: Create dedicated analytics section or update `/dashboard/page.tsx` with:
  - Time range toggle pills (7 Days, 30 Days, 90 Days).
  - Daily spend velocity chart grid.
  - Category breakdown donut and Cash Flow bars.
- [x] Task 3.2: Verify mobile responsive layout and touch tooltip behavior.
- [x] Checkpoint: Verify navigation, interactive range changes, and zero em dashes.

---

## Group 4: Quality Gates, Static Verification & Roadmap Sync
**Goal**: Verify build, run Anti-Slop audit, and check off Phase 4 in `specs/roadmap.md`.

- [x] Task 4.1: Run `npm run typecheck` (`tsc --noEmit`) and verify 0 errors.
- [x] Task 4.2: Run `npm run lint` and verify 0 warnings/errors.
- [x] Task 4.3: Run `npm run build` and ensure Next.js outputs a production bundle.
- [x] Task 4.4: Conduct Anti-Slop Audit (question in every chart title, zero em dashes, WCAG AA contrast).
- [x] Task 4.5: Update `specs/roadmap.md` with checked boxes `[x]` for Phase 4.
- [x] Checkpoint: All quality checks green and ready for Phase 5.
