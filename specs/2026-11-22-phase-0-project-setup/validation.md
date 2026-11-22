# Validation Plan: Phase 0 — Project Setup & Baseline Tooling

This document defines the automated commands, expected results, manual acceptance checks, and non-required items to declare Phase 0 complete.

---

## 1. Automated Verification Commands

| Command | Expected Output / Exit Code | Purpose |
| :--- | :--- | :--- |
| `npm run typecheck` | Exit code `0`<br>Output: Clean completion with zero TypeScript diagnostics. | Verifies strict typing, `@/*` path aliases, and component props. |
| `npm run lint` | Exit code `0`<br>Output: `✔ No ESLint warnings or errors` | Enforces code hygiene and Next.js best practices. |
| `npm run build` | Exit code `0`<br>Output: Next.js production build artifacts generated in `.next/` with zero build errors. | Verifies Server Components, CSS compilation, and bundle integrity. |

---

## 2. Manual Verification Checklist

- [ ] **Initial Page Load & Visual Theme**:
  - Open `http://localhost:3000`.
  - Page renders immediately with a sleek **Black & Gold** aesthetic.
  - Background is deep carbon black (`#09090b`) and primary accents are metallic gold (`#d4af37` / `#eab308`).
  - No hydration errors, flashing unstyled content (FOUC), or console errors.
- [ ] **Theme Switching**:
  - Click the `ThemeToggle` in the header.
  - Page smoothly toggles to light mode (light background, refined gold/charcoal accents).
  - Click again to return to dark mode.
  - Reloading the page persists the selected theme without flicker.
- [ ] **Component Functionality & Accessibility**:
  - `Button` variants (`gold`, `outline`, `secondary`, `ghost`) render with visible keyboard focus indicators and tap targets $\ge 44\text{px}$.
  - `Card` components display crisp borders and correct spacing without floating heavy shadows.
  - `Badge` component displays active phase status clearly.
  - Keyboard navigation (`Tab`, `Enter`, `Space`) works cleanly across all controls.
- [ ] **Anti-Slop Quality Gate Audit**:
  - **No Em Dashes**: Zero `—` characters in UI text; commas, colons, or parentheses used instead.
  - **No AI Buzzwords**: No "seamless", "revolutionary", "game-changer", "cutting-edge", or "elevate".
  - **No Fabricated Data**: No fake "+12%" deltas or fabricated user stats; placeholders labeled explicitly as `[PLACEHOLDER]`.
  - **No Dead Controls**: Every button and link triggers an action or displays an honest "Coming soon" state.
  - **No Decorative Emoji**: No emojis in titles, badges, or button labels.
  - **Color & Glow Restraint**: No generic blue-purple gradients, no full-page blurred orbs, and no glow-everywhere effect.
  - **WCAG AA Contrast**: All gold text and accents on dark backgrounds maintain $\ge 4.5:1$ contrast ratio.
- [ ] **Responsive Viewport Test**:
  - Resize browser window to mobile width (375px - 414px).
  - Layout reflows cleanly without horizontal overflow or overlapping text.
- [ ] **Environment Template**:
  - Verify `.env.example` exists and contains all required keys for upcoming Supabase and Gemini integrations.

---

## 3. "Not Required" in Phase 0

The following are explicitly **NOT required** for Phase 0 sign-off:
- Live database connection or valid Supabase credentials (tested in Phase 1).
- Working user login / registration flows (tested in Phase 1).
- Real financial data calculations or transaction persistence (tested in Phases 2-4).
- External Gemini API responses or PDF statement extraction (tested in Phases 5-6).
- End-to-end Cypress or Playwright test suites (baseline typecheck and unit linting sufficient for setup phase).
