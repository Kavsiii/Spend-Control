# Spend Control — Implementation Roadmap

This roadmap breaks down the build into small, verifiable, sequential phases. Each phase has a clear goal, tangible deliverables, and checkboxes for tracking progress.

---

## Phase 0: Project Setup & Baseline Tooling
**Goal**: Initialize repository, establish clean code hygiene, configure full-stack Next.js environment, and verify build.

- [x] Initialize Next.js 15 project with TypeScript, ESLint, and Tailwind CSS.
- [x] Configure `shadcn/ui` component primitives and layout foundations.
- [x] Setup Lucide icons and dark-mode styling infrastructure.
- [x] Configure environment variables structure (`.env.example` and `.env.local`).
- [x] Verify build, linting, and TypeScript compilation scripts pass without errors.

---

## Phase 1: Multi-Tenant Database & Authentication Foundation
**Goal**: Implement Supabase Auth, database connection via Drizzle ORM, and enforce Row-Level Security (RLS).

- [x] Setup Supabase project client configuration and Auth helpers.
- [x] Configure Drizzle ORM and Drizzle Kit migration pipeline.
- [x] Create `users` profile table tied to `auth.users` with default currency preference.
- [x] Implement Row-Level Security (RLS) policies guaranteeing tenant isolation.
- [x] Build Authentication UI (Sign Up, Sign In, Magic Link, Logout) with protected route middleware.

---

## Phase 2: Accounts & Fixed Commitments (Loans, EMIs, Rent)
**Goal**: Enable users to register bank accounts/wallets and track recurring debt, loan EMIs, and monthly fixed dependencies.

- [x] Define Drizzle schema for `accounts` (bank, cash, card) with RLS.
- [x] Define Drizzle schema for `commitments` (EMIs, rent, utilities, subscriptions).
- [x] Build Accounts management UI (Create, Edit, View balances).
- [x] Build Commitments / Loans dashboard widget (Monthly fixed burden, upcoming due dates, active status toggle).
- [x] Write unit functions for calculating Total Monthly Committed Burn.

---

## Phase 3: Daily Expense Ingestion (Manual Quick Entry)
**Goal**: Deliver a frictionless daily expenditure logging interface with multi-currency and categorization support.

- [x] Define Drizzle schema for `transactions` with multi-currency fields (`amount`, `currency`, `base_amount`).
- [x] Build quick-entry transaction modal and mobile-first floating action button (FAB).
- [x] Implement category selection (Food, Transport, Utilities, Shopping, Entertainment, etc.).
- [x] Build paginated/searchable transaction history list with date and category filters.
- [x] Implement instant edit/delete with optimistic UI updates.

---

## Phase 4: Visual Dashboard & Financial Analytics
**Goal**: Build comprehensive, interactive visualizations showcasing spending velocity, category breakdown, and cash-flow health.

- [x] Implement Key Financial KPI cards (Total Balance, This Month's Spend, Upcoming Commitments, Discretionary Buffer).
- [x] Build Daily Spend Velocity & Burn Rate Chart (Recharts Area/Line chart).
- [x] Build Expense Breakdown by Category (Donut/Pie chart).
- [x] Build Monthly Cash Flow Comparison (Income vs. Fixed Commitments vs. Discretionary Spend).
- [x] Add date-range filtering (Last 7 days, Current Month, Last 90 days).

---

## Phase 5: Automated Ingestion & Statement Parser
**Goal**: Allow users to drag-and-drop bank statements (PDF/CSV) and leverage AI to extract, categorize, and batch-import transactions.

- [x] Create Supabase Storage bucket for user statement documents.
- [x] Build drag-and-drop file upload UI with progress indicators.
- [x] Implement statement text extraction pipeline (`pdf-parse`, `papaparse`).
- [x] Integrate Gemini 2.0 Flash via Vercel AI SDK to extract structured transactions into a typed Zod schema.
- [x] Build Transaction Review & Reconciliation UI (Users inspect parsed rows, confirm or tweak before batch inserting).

---

## Phase 6: AI Financial Advisor ("Can I / When Can I Buy This?")
**Goal**: Empower users with an intelligent financial advisor that evaluates wishlist purchases against actual financial health and upcoming commitments.

- [x] Define Drizzle schema for `wishlist_items` (title, target amount, currency, target date, evaluation payload).
- [x] Build deterministic financial snapshot calculator (Current Liquid Assets - Upcoming 60-day Commitments - Projected Daily Burn).
- [x] Build "Evaluate Purchase" modal (User enters: item name, price, desired timeline).
- [x] Implement AI Advisor reasoning engine with Gemini 2.0 (Produces concrete verdict: BUY NOW, DEFER, or TARGET DATE, plus tailored savings pace).
- [x] Build Advisor results card displaying mathematical surplus/deficit, projected safety runway, and recommendations.

---

## Phase 7: Mobile Optimization & PWA Readiness
**Goal**: Ensure a native-app-like experience on iOS and Android browsers for instant daily logging on the go.

- [x] Optimize mobile bottom navigation bar and touch targets.
- [x] Add Web App Manifest and PWA service worker icons.
- [x] Configure iOS home screen bookmarking styling (safe area padding, touch callouts).
- [x] Test and polish responsive layout across phone, tablet, and desktop viewports.

---

## Phase 8: Public Beta Hardening & Multi-User Launch
**Goal**: Prepare the platform for public sign-ups with onboarding, rate limiting, and performance audits.

- [x] Implement user onboarding flow (Currency selection, first account setup, first recurring commitment).
- [x] Add rate limiting on AI statement parsing and advisor endpoints.
- [x] Conduct end-to-end security review of Supabase RLS policies.
- [x] Run Lighthouse performance audit and optimize bundle sizes.
- [x] Deploy production build on Vercel connected to production Supabase database.
