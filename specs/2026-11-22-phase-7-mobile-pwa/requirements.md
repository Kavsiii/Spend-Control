# Requirements: Phase 7 — Mobile Optimization & PWA Readiness

## 1. Context

Daily expense tracking demands instant convenience on smartphones. A user finishing dinner or getting off transit should be able to tap an icon on their home screen, view their daily remaining buffer, and log a transaction in 5 seconds. Phase 7 delivers:
- Mobile bottom navigation bar with $\ge 44\text{px}$ touch targets and iOS safe-area insets.
- Native Next.js 15 Web App Manifest (`manifest.ts`) supporting "Add to Home Screen" standalone PWA installation.
- iOS home screen web app optimization (status bar styling, splash background, disabled callout highlights).
- Zero-slop mobile layout without horizontal overflow or hidden controls.

---

## 2. Scope

### In Scope
1. **Mobile Bottom Navigation Bar**:
   - Fixed bottom dock on mobile screens (`< sm`).
   - 5 accessible touch tabs: Overview, Accounts, Expenses, Advisor, Import.
   - Active state indicator with Black & Gold styling.
   - Bottom padding compensation (`pb-24 sm:pb-8`) preventing content occlusion.
2. **Web App Manifest (`src/app/manifest.ts`)**:
   - Native App Router manifest configuration (standalone display, theme colors `#09090b`, icons).
3. **iOS Web App Integration**:
   - `apple-mobile-web-app-capable`, `apple-mobile-web-app-status-bar-style: black-translucent`.
   - Viewport configuration with `viewport-fit=cover`.
4. **Anti-Slop Craftsmanship**:
   - Touch targets $\ge 44\text{px}$.
   - No horizontal scrollbars.
   - Zero em dashes (`—`).

### Out of Scope
- Native iOS Swift / Android Kotlin compilation (PWA web standard chosen per `specs/tech-stack.md`).

---

## 3. Key Decisions & Rationale

| Decision | Selected Option | Rationale |
| :--- | :--- | :--- |
| **PWA over App Store binary** | Standalone Progressive Web App | Immediate deployment, zero app-store review delays, seamless cross-platform desktop/mobile parity. |
| **Mobile Bottom Bar** | Persistent 5-tab bar | Human thumb ergonomics; bottom navigation allows 1-handed operation on mobile. |
| **Next.js Manifest Route** | Type-safe `manifest.ts` | Uses Next.js native metadata generation rather than stale static JSON. |

---

## 4. EARS Behavioral Specifications

- **EARS-001 (Ubiquitous)**: On mobile viewports (< 640px), the application SHALL display a persistent bottom navigation dock with $\ge 44\text{px}$ touch targets.
- **EARS-002 (State-driven)**: WHILE running as an installed PWA or bookmarked home screen app, the system SHALL launch directly into `/dashboard` in standalone mode with black-translucent status bar styling.
- **EARS-003 (Ubiquitous)**: The layout SHALL adapt to notch safe areas using `env(safe-area-inset-bottom)`.
- **EARS-004 (Unwanted Event)**: IF a user rotates their device or views on narrow screens (375px), THEN no horizontal overflow SHALL occur.
- **EARS-005 (Ubiquitous)**: All mobile touch elements SHALL meet WCAG AA contrast standards and contain zero em dashes.
