# Validation Plan: Phase 7 — Mobile Optimization & PWA Readiness

This document defines the automated commands, expected results, manual acceptance checks, and non-required items to declare Phase 7 complete.

---

## 1. Automated Verification Commands

| Command | Expected Output / Exit Code | Purpose |
| :--- | :--- | :--- |
| `npm run typecheck` | Exit code `0`<br>Clean completion with zero TypeScript diagnostics. | Verifies strict typing across manifest and mobile nav components. |
| `npm run lint` | Exit code `0`<br>`✔ No ESLint warnings or errors` | Enforces code hygiene and Next.js best practices. |
| `npm run build` | Exit code `0`<br>Optimized production bundle including manifest route. | Verifies Next.js PWA manifest generation and route compilation. |

---

## 2. Manual Verification Checklist

- [ ] **PWA Manifest Route**:
  - Requesting `/manifest.webmanifest` returns valid JSON with `start_url: "/dashboard"` and `display: "standalone"`.
- [ ] **Mobile Bottom Navigation**:
  - On viewports $< 640\text{px}$, bottom bar is visible with 5 tabs.
  - Active tab is highlighted with amber/gold styling.
  - Tapping each tab navigates to the respective view.
  - Content on all pages has adequate bottom padding so elements are never covered by the dock.
- [ ] **Responsive Viewport Verification**:
  - Screen widths at 375px (iPhone SE / iPhone 13 mini) render cleanly with zero horizontal scrollbar.
- [ ] **Anti-Slop Quality Gate**:
  - Zero em dashes (`—`) in copy or labels.
  - Minimum tap target $\ge 44\text{px}$ on all mobile buttons.
  - High contrast verified.

---

## 3. "Not Required" in Phase 7

- App Store binary package (.ipa / .apk).
- Native push notifications (tested in future enhancement).
