# Requirements: Phase 1 — Multi-Tenant Database & Authentication Foundation

## 1. Context

Spend Control is a multi-tenant personal finance application. To ensure user data isolation from Day 1, Phase 1 establishes:
- Supabase Auth integration using `@supabase/ssr` for secure cookie-based session management.
- Next.js middleware for route protection (`/dashboard` vs `/login`).
- Drizzle ORM schema configuration targeting PostgreSQL with Row Level Security (RLS).
- Dedicated `users` profile table tied to `auth.users.id` storing user preferences (base currency).
- Accessible, Black & Gold authentication UI with zero AI slop and WCAG AA contrast.
- Resilient local development fallback: Graceful handling when Supabase environment variables are in template/placeholder mode.

---

## 2. Scope

### In Scope
1. **Supabase Client Architecture**:
   - Install `@supabase/supabase-js` and `@supabase/ssr`.
   - Browser client helper (`src/lib/supabase/client.ts`).
   - Server client helper (`src/lib/supabase/server.ts`) reading and writing cookies.
   - Next.js middleware (`src/middleware.ts`) refreshing sessions and guarding protected routes.
2. **Drizzle ORM & Database Schema**:
   - Install `drizzle-orm`, `drizzle-kit`, `postgres`, and `zod`.
   - Configure `drizzle.config.ts`.
   - Database connection client (`src/lib/db/index.ts`).
   - Schema definition (`src/lib/db/schema.ts`) for `users` profile entity with default base currency ('USD').
   - SQL migration files with PostgreSQL RLS policies (`auth.uid() = id`).
3. **Authentication Interface & Actions**:
   - Server Actions for authentication (`signInWithEmail`, `signUpWithEmail`, `signOutUser`).
   - Route Handler (`src/app/auth/callback/route.ts`) for OAuth / Magic Link PKCE exchange.
   - Auth UI page at `/login` featuring Black & Gold aesthetic, tabbed Sign In / Sign Up, and clear validation feedback.
   - Session indicator and Sign Out button in navigation header.
4. **Anti-Slop Craftsmanship**:
   - Zero em dashes (`—`) in auth messages and form labels.
   - No generic AI buzzwords ("revolutionary security", "seamless login").
   - Real, accessible form controls (`label[for]`, ARIA attributes, tab order, focus ring).

### Out of Scope
- Account management (bank accounts, wallets) — deferred to Phase 2.
- Recurring loans and fixed EMIs — deferred to Phase 2.
- Transaction logging and CSV statement parsing — deferred to Phases 3-5.
- AI advisory chat — deferred to Phase 6.

---

## 3. Key Decisions & Rationale

| Decision | Selected Option | Rationale |
| :--- | :--- | :--- |
| **Auth Provider** | Supabase Auth via `@supabase/ssr` | Native cookie handling for Next.js App Router, eliminates client token leakage, directly ties into Postgres RLS. |
| **ORM** | Drizzle ORM | High performance, lightweight SQL-like syntax, zero binary bloat, type-safe schema definitions. |
| **Driver** | `postgres` (porsager/postgres) | Modern, fast native PostgreSQL client supporting SSL and connection pooling. |
| **Session Fallback** | Defensive Mock / Demo Mode | If Supabase keys are placeholders, the UI provides a clear developer notice and demo session rather than throwing unhandled runtime exceptions. |

---

## 4. EARS Behavioral Specifications

- **EARS-001 (Ubiquitous)**: Every user database record SHALL be linked to `auth.users.id` with PostgreSQL Row Level Security enabled.
- **EARS-002 (Event-driven)**: WHEN an unauthenticated user accesses `/dashboard` or any protected route, the middleware SHALL redirect the user to `/login`.
- **EARS-003 (Event-driven)**: WHEN an authenticated user accesses `/login`, the middleware SHALL redirect the user to `/dashboard`.
- **EARS-004 (Event-driven)**: WHEN a user submits valid email and password credentials, the system SHALL authenticate the user, set secure HTTP-only cookies, and redirect to `/dashboard`.
- **EARS-005 (Unwanted Event)**: IF authentication fails due to invalid credentials, THEN the system SHALL display an inline error message with high contrast and zero em dashes.
- **EARS-006 (State-driven)**: WHILE submitting an authentication request, the button SHALL display a loading state and disable double-submission.
- **EARS-007 (Ubiquitous)**: All auth and profile forms SHALL meet WCAG AA contrast standards ($\ge 4.5:1$).
