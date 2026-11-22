# Implementation Plan: Phase 1 — Multi-Tenant Database & Authentication Foundation

This plan is structured into small, self-contained task groups. Each group can be implemented, verified, and committed independently.

---

## Group 1: Package Dependencies & Supabase SSR Client
**Goal**: Install Supabase and database packages, and configure cookie-based SSR clients and middleware.

- [x] Task 1.1: Install approved packages:
  - `@supabase/supabase-js`, `@supabase/ssr`, `drizzle-orm`, `postgres`, `zod`
  - Dev dependencies: `drizzle-kit`, `@types/pg`
- [x] Task 1.2: Implement `src/lib/supabase/client.ts` for browser-side client.
- [x] Task 1.3: Implement `src/lib/supabase/server.ts` for server components and actions using Next.js `cookies()`.
- [x] Task 1.4: Implement `src/middleware.ts` for session refresh and route protection (`/dashboard` vs `/login`).
- [x] Checkpoint: Verify Next.js compiles with middleware.

---

## Group 2: Drizzle ORM Schema, RLS & Migration Pipeline
**Goal**: Configure Drizzle ORM, declare the `users` profile table, and generate PostgreSQL RLS migration scripts.

- [x] Task 2.1: Create `drizzle.config.ts` configured for PostgreSQL.
- [x] Task 2.2: Implement `src/lib/db/index.ts` initializing the database client with graceful connection handling.
- [x] Task 2.3: Implement `src/lib/db/schema.ts` defining:
  - `users` table (`id`, `email`, `displayName`, `baseCurrency`, `createdAt`, `updatedAt`).
- [x] Task 2.4: Create SQL migration script `drizzle/0000_init_users_rls.sql` with RLS policies:
  - `ALTER TABLE users ENABLE ROW LEVEL SECURITY;`
  - `CREATE POLICY "users_isolation" ON users FOR ALL USING (auth.uid() = id);`
- [x] Checkpoint: Verify Drizzle schema types pass `npm run typecheck`.

---

## Group 3: Server Actions & Auth Callback Pipeline
**Goal**: Implement type-safe Server Actions for Sign In, Sign Up, Sign Out, and OAuth callback handler.

- [x] Task 3.1: Implement `src/app/auth/actions.ts`:
  - `signInWithEmail(formData)`
  - `signUpWithEmail(formData)`
  - `signOutUser()`
  - Input validation with Zod schemas.
- [x] Task 3.2: Implement `src/app/auth/callback/route.ts` for PKCE code exchange.
- [x] Checkpoint: Verify Server Actions compile with proper types and error handling.

---

## Group 4: Authentication Interface & Dashboard Shell
**Goal**: Build accessible Black & Gold `/login` page and authenticated `/dashboard` shell.

- [x] Task 4.1: Implement `src/app/login/page.tsx`:
  - Tabbed interface (Sign In / Sign Up).
  - Form validation with accessible `<label>` and error alerts.
  - Zero em dashes, zero buzzwords, Black & Gold aesthetic.
  - Demo/preview mode indicator if Supabase keys are not yet configured.
- [x] Task 4.2: Implement `src/app/dashboard/layout.tsx` and `src/app/dashboard/page.tsx`:
  - Authenticated user header with user email and Sign Out action.
  - Protected layout shell with navigation bar.
- [x] Task 4.3: Update home page header to link to `/dashboard` (if logged in) or `/login`.
- [x] Checkpoint: Verify navigation flows between home, login, and dashboard.

---

## Group 5: Quality Gates, Static Verification & Roadmap Sync
**Goal**: Verify build, run Anti-Slop audit, and check off Phase 1 in `specs/roadmap.md`.

- [x] Task 5.1: Run `npm run typecheck` (`tsc --noEmit`) and verify 0 errors.
- [x] Task 5.2: Run `npm run lint` and verify 0 warnings/errors.
- [x] Task 5.3: Run `npm run build` and ensure Next.js outputs a production bundle.
- [x] Task 5.4: Conduct Anti-Slop Audit (no em dashes, no dead buttons, WCAG AA contrast).
- [x] Task 5.5: Update `specs/roadmap.md` with checked boxes `[x]` for Phase 1.
- [x] Checkpoint: All quality checks green and ready for Phase 2.
