# Validation Plan: Phase 1 — Multi-Tenant Database & Authentication Foundation

This document defines the automated commands, expected results, manual acceptance checks, and non-required items to declare Phase 1 complete.

---

## 1. Automated Verification Commands

| Command | Expected Output / Exit Code | Purpose |
| :--- | :--- | :--- |
| `npm run typecheck` | Exit code `0`<br>Clean completion with zero TypeScript diagnostics. | Verifies strict typing across Supabase client, Drizzle schema, and Server Actions. |
| `npm run lint` | Exit code `0`<br>`✔ No ESLint warnings or errors` | Enforces code hygiene and Next.js best practices. |
| `npm run build` | Exit code `0`<br>Optimized production bundle including `/login`, `/dashboard`, and `/auth/callback`. | Verifies Server Components, Route Handlers, and middleware compilation. |

---

## 2. Manual Verification Checklist

- [ ] **Auth Route Access**:
  - Visiting `/login` loads the Black & Gold authentication page.
  - Tabs toggle cleanly between "Sign In" and "Sign Up" without layout shift.
- [ ] **Form Validation & Accessibility**:
  - Inputs have visible focus rings and accessible labels (`label[for]`).
  - Submitting an empty form highlights validation errors.
  - Touch targets $\ge 44\text{px}$ on mobile viewports.
- [ ] **Anti-Slop Quality Gate**:
  - Zero em dashes (`—`) in auth messages and form copy.
  - Zero AI buzzwords ("seamless", "revolutionary").
  - Clear, action-specific button labels: "Sign In", "Create Account", "Sign Out".
  - WCAG AA contrast compliance verified for all inputs and text.
- [ ] **Graceful Development Fallback**:
  - If live Supabase credentials are not connected, the auth page displays a clear notice and allows demo progression without crashing.
- [ ] **Protected Dashboard Route**:
  - `/dashboard` renders the user header, currency badge, and working Sign Out action.

---

## 3. "Not Required" in Phase 1

- Live production database migration execution (Drizzle migration SQL files generated and verified).
- Bank account balances and transaction CRUD (tested in Phases 2-4).
- AI financial advisor integration (tested in Phase 6).
