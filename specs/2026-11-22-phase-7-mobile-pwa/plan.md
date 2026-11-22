# Implementation Plan: Phase 7 — Mobile Optimization & PWA Readiness

This plan is structured into small, self-contained task groups. Each group can be implemented, verified, and committed independently.

---

## Group 1: Web App Manifest & iOS Metadata
**Goal**: Configure type-safe PWA manifest and viewport headers.

- [x] Task 1.1: Implement `src/app/manifest.ts`:
  - Name, short_name, description, start_url, theme_color, background_color, display.
- [x] Task 1.2: Update `src/app/layout.tsx` with iOS standalone metadata and appleWebApp settings.
- [x] Checkpoint: Verify `/manifest.webmanifest` route compiles.

---

## Group 2: Mobile Bottom Navigation Bar Component
**Goal**: Build an ergonomic, accessible mobile bottom dock with safe-area padding.

- [x] Task 2.1: Implement `src/components/mobile-bottom-nav.tsx`:
  - 5 accessible tabs: Command Center, Accounts, Expenses, Advisor, Import.
  - Active route highlighting with Gold accents.
  - Visible labels and touch targets $\ge 44\text{px}$.
- [x] Task 2.2: Embed bottom navigation into `src/app/dashboard/layout.tsx`.
- [x] Task 2.3: Adjust page padding (`pb-24 sm:pb-8`) to eliminate content overlap.
- [x] Checkpoint: Verify mobile bottom nav renders on mobile viewports.

---

## Group 3: Viewport Testing & CSS Safe-Area Polish
**Goal**: Test responsive reflow across mobile breakpoints (375px to 414px) and polish touch active states.

- [x] Task 3.1: Verify table containers have horizontal scrolling wrappers on mobile.
- [x] Task 3.2: Verify touch active states (`active:scale-95` or `active:bg-amber-600`) across all mobile buttons.
- [x] Checkpoint: Validate layout passes 375px viewport inspection without overflow.

---

## Group 4: Quality Gates, Static Verification & Roadmap Sync
**Goal**: Verify build, run Anti-Slop audit, and check off Phase 7 in `specs/roadmap.md`.

- [x] Task 4.1: Run `npm run typecheck` (`tsc --noEmit`) and verify 0 errors.
- [x] Task 4.2: Run `npm run lint` and verify 0 warnings/errors.
- [x] Task 4.3: Run `npm run build` and ensure Next.js outputs a production bundle.
- [x] Task 4.4: Conduct Anti-Slop Audit (no em dashes, action-specific CTAs, WCAG AA contrast).
- [x] Task 4.5: Update `specs/roadmap.md` with checked boxes `[x]` for Phase 7.
- [x] Checkpoint: All quality checks green and ready for Phase 8.
