# Phase 8: Public Beta Hardening & Multi-User Launch — Requirements

## Context & Purpose
Phase 8 represents the culmination of the Spend Control system: hardening the platform for multi-user public beta access. It delivers a guided onboarding experience for new users, rate-limiting safeguards on generative AI operations, formal automated RLS security validation, landing page feature alignment, and production bundle optimization.

---

## Scope & Functional Goals
1. **User Onboarding Flow**:
   - Provide a guided 3-step setup modal/banner accessible immediately upon sign-up or on-demand:
     - Step 1: Base Currency selection (USD, EUR, GBP, INR, CAD, AUD, JPY).
     - Step 2: First liquid asset account setup (Account name, account type, starting balance).
     - Step 3: First recurring obligation/commitment setup (Title, category, monthly amount, next due date).
   - Instant calculation preview and seamless transition into the active financial dashboard.
2. **AI & Mutation Rate Limiting**:
   - Implement an in-memory/sliding-window rate limiter utility to safeguard expensive operations (Gemini advisor queries and statement ingestion).
   - Graceful rejection with informative error messages when quota thresholds are exceeded (e.g. 10 evaluations per minute).
3. **Multi-Tenant Security Audit**:
   - Automated unit test verifying that 100% of database tables have RLS enabled and strictly enforce `auth.uid() = user_id` tenant isolation.
   - Zero data leaks between concurrent tenant sessions.
4. **Landing Page & Product Polish**:
   - Update `src/app/page.tsx` with production navigation linking directly to all active capabilities: Overview Dashboard, Transaction Logger, Financial Commitments, Statement Ingestion, and AI Purchase Advisor.
   - Strict Anti-Slop verification: zero em dashes, zero AI fluff words, deliberate Black & Gold palette, WCAG AA contrast.
5. **Production Build & Bundle Optimization**:
   - Full Next.js production build (`npm run build`) passing with zero lint warnings or type errors.

---

## Out of Scope
- Direct Open Banking API / Plaid integration (deferred to post-beta roadmaps; CSV statement ingestion is the production-ready engine).
- Paid Stripe subscription billing (public beta is free tier during initial launch).
- Native iOS Swift or Android Kotlin wrappers (covered via PWA manifest and mobile browser optimization in Phase 7).

---

## Architectural Decisions & Rationale
1. **Client-Side/Server-Action Guided Onboarding**:
   - *Decision*: Build the onboarding flow as an interactive client component `<OnboardingWizard />` that can be dismissed or accessed from the dashboard header, triggering standard typed Server Actions for atomic updates.
   - *Rationale*: Allows both brand new sign-ups with empty accounts to get running in under 60 seconds, while existing users can revisit to calibrate base currency or review baseline parameters.
2. **Sliding-Window Rate Limiter Utility**:
   - *Decision*: Implement `src/lib/security/rate-limit.ts` using an in-memory timestamp store keyed by user ID or IP, with pluggable limits per action.
   - *Rationale*: Protects against rapid-fire API hammering and Gemini quota exhaustion without introducing external Redis dependencies at initial beta scale.
3. **Automated RLS Migration Static Security Audit**:
   - *Decision*: Write a comprehensive test script `src/lib/security/rls-audit.test.ts` that inspects all SQL migrations in `drizzle/` and verifies RLS activation and tenant scoping on every table.
   - *Rationale*: Prevents future regressions and provides provable compliance with Rule 2 (Multi-Tenancy & Data Isolation).

---

## Behavioral Requirements (EARS Format)
- **EARS-1**: WHEN a new user accesses the dashboard with zero accounts, THE SYSTEM SHALL display the guided onboarding wizard prompting for base currency, initial account, and first recurring commitment.
- **EARS-2**: WHEN a user completes the onboarding wizard, THE SYSTEM SHALL persist the chosen base currency, create the account, insert the commitment, and recalculate liquid surplus immediately.
- **EARS-3**: WHEN a user triggers more than 10 purchase evaluations or 5 statement imports within 60 seconds, THE SYSTEM SHALL return an HTTP 429 / rate limit error with a descriptive wait message.
- **EARS-4**: WHEN the automated security audit runs, THE SYSTEM SHALL assert that all schema tables (`users`, `accounts`, `commitments`, `transactions`, `statement_uploads`, `wishlist_items`) enable RLS and contain tenant isolation policies.
- **EARS-5**: WHEN a user views the homepage, THE SYSTEM SHALL present real product navigation to Dashboard, Ingestion, Commitments, and Advisor, with zero em dashes and full Black & Gold styling.
