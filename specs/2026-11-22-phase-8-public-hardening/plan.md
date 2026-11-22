# Phase 8: Public Beta Hardening & Multi-User Launch — Implementation Plan

## Task Groups

### Group 1: Rate Limiting & Abuse Prevention Engine
- [x] Create `src/lib/security/rate-limit.ts` providing an in-memory sliding-window rate limiter with configurable limits per action (e.g. `advisor`: 10/min, `statement_parser`: 5/min, `mutation`: 30/min).
- [x] Integrate rate limit guards into `src/app/dashboard/advisor/actions.ts` (`evaluatePurchaseAction`).
- [x] Write unit test `src/lib/security/rate-limit.test.ts` to verify window expiry and rejection when exceeding quota thresholds.

### Group 2: End-to-End RLS Security Audit Verification
- [x] Create `src/lib/security/rls-audit.test.ts` to statically inspect and test all SQL migration scripts in `drizzle/`.
- [x] Validate that all 6 tables (`users`, `accounts`, `commitments`, `transactions`, `statement_uploads`, `wishlist_items`) have `ENABLE ROW LEVEL SECURITY;` and policies checking `auth.uid() = user_id` (or `auth.uid() = id`).
- [x] Run test suite via `npx tsx src/lib/security/rls-audit.test.ts`.

### Group 3: Guided User Onboarding Wizard
- [x] Build `src/components/onboarding-wizard.tsx` featuring:
  - Step 1: Base Currency Selection (USD, EUR, GBP, INR, CAD, AUD, JPY).
  - Step 2: Primary Account Setup (Account name, type: bank/cash/credit, initial balance).
  - Step 3: First Recurring Commitment (Title, category: rent/loan/utility, amount, next due date).
  - Completion step: Instant calculation preview and dismissal.
- [x] Integrate `<OnboardingWizard />` into `/dashboard` with banner trigger or auto-popup when no accounts exist.
- [x] Create server action for onboarding submission or reuse existing typed actions (`createAccountAction`, `createCommitmentAction`).

### Group 4: Landing Page Polish & Anti-Slop Verification
- [x] Update `src/app/page.tsx` with complete product feature sections:
  - Feature showcase: Liquidity & Velocity Dashboard, Fixed Commitment Shields, Daily Expense Tracking, AI Purchase Evaluator, and Statement Import.
  - Interactive simulator linked to real evaluation logic.
  - Action-specific CTAs leading to `/login` and `/dashboard`.
- [x] Audit all strings in `src/app/page.tsx` and components to guarantee zero em dashes (`—`), zero AI hype buzzwords, and full Black & Gold design compliance.

### Group 5: Production Build & Roadmap Completion
- [x] Run static typecheck (`npm run typecheck`).
- [x] Run linter (`npm run lint`).
- [x] Run full Next.js production build (`npm run build`).
- [x] Mark Phase 8 tasks as complete `[x]` in `specs/roadmap.md`.
