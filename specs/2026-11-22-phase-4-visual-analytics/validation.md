# Validation Plan: Phase 4 — Visual Dashboard & Financial Analytics

This document defines the automated commands, expected results, manual acceptance checks, and non-required items to declare Phase 4 complete.

---

## 1. Automated Verification Commands

| Command | Expected Output / Exit Code | Purpose |
| :--- | :--- | :--- |
| `npm run typecheck` | Exit code `0`<br>Clean completion with zero TypeScript diagnostics. | Verifies strict typing across Recharts components, series mappers, and props. |
| `npm run lint` | Exit code `0`<br>`✔ No ESLint warnings or errors` | Enforces code hygiene and Next.js best practices. |
| `npm run build` | Exit code `0`<br>Optimized production bundle including Recharts bundles. | Verifies client chart hydration, SSR boundaries, and bundle optimization. |

---

## 2. Manual Verification Checklist

- [ ] **Chart Interactivity & Responsiveness**:
  - Daily Burn Area chart displays daily expenses against safe threshold line.
  - Category Donut chart displays distribution with interactive hover slices.
  - Cash Flow Bar chart displays balance vs committed burn vs variable spend.
  - All charts resize fluidly when resizing browser window.
- [ ] **Time-Horizon Toggle**:
  - Switching between "7 Days", "30 Days", and "90 Days" updates data smoothly.
- [ ] **Anti-Slop Quality Gate**:
  - Every chart title states the exact financial question it answers.
  - Zero em dashes (`—`) in titles, axis labels, or tooltips.
  - Zero generic blue-purple gradients; warm metallic gold and amber palette used.
  - High contrast verified ($\ge 3:1$ for graphical shapes, $\ge 4.5:1$ for text).

---

## 3. "Not Required" in Phase 4

- Bank statement parsing / OCR (Phase 5).
- LLM purchase evaluation advice (Phase 6).
