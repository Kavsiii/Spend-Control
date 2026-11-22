# Requirements: Phase 4 — Visual Dashboard & Financial Analytics

## 1. Context

Visualizing cash flow velocity, category concentrations, and committed burn transforms raw numbers into intuitive financial self-control. Phase 4 introduces:
- Daily Spend Velocity area chart tracking daily spending against the computed discretionary limit.
- Category distribution donut chart highlighting major expense drivers.
- Monthly Cash Flow comparison bar chart (Liquid Assets vs Committed Burn vs Discretionary Outflow).
- Responsive time-horizon toggles (Last 7 Days, Current Month, Last 90 Days).
- Anti-Slop chart standards: Every chart answers an explicit user decision question.

---

## 2. Scope

### In Scope
1. **Interactive Visualization Components**:
   - `DailyBurnChart`: Area chart comparing actual daily spending against the daily safe discretionary limit.
   - `CategoryDistributionChart`: Donut chart with category legend and monetary breakdowns.
   - `CashFlowHealthChart`: Bar chart contrasting Total Liquid Assets, Monthly Fixed Commitments, and Variable Spend.
2. **Time-Horizon Filtering**:
   - Filter state toggles ("7D", "30D / Month", "90D") dynamically updating chart datasets.
3. **Chart Tooltips & Accessibility**:
   - Custom Black & Gold tooltips with formatted currency and dates.
   - High contrast palette meeting WCAG AA requirements ($\ge 3:1$ for graphical objects).
4. **Anti-Slop Craftsmanship**:
   - Every chart includes a concrete header question ("Are daily expenses within your safety threshold?").
   - Zero em dashes (`—`).
   - Resilient empty states when zero transactions exist for a selected window.

### Out of Scope
- Direct bank statement PDF/CSV parsing (Phase 5).
- AI advisory chat recommendations (Phase 6).

---

## 3. Key Decisions & Rationale

| Decision | Selected Option | Rationale |
| :--- | :--- | :--- |
| **Chart Library** | Recharts | React-native SVG rendering, responsive container support, smooth animations without canvas overhead. |
| **Chart Purpose Rule** | Question-led titles | Follows Anti-Slop Rule: A chart without a question is mere wallpaper. Every visualization answers an actionable decision. |
| **Color Harmony** | Metallic Gold & Amber spectrum | Adheres to Black & Gold palette with distinct categorical accent hues. |

---

## 4. EARS Behavioral Specifications

- **EARS-001 (Ubiquitous)**: Every chart SHALL render inside a responsive container that resizes cleanly on mobile and desktop viewports.
- **EARS-002 (Event-driven)**: WHEN a user switches time-range filters (7D, 30D, 90D), the system SHALL update chart series data reactively without full page reloads.
- **EARS-003 (State-driven)**: WHILE hovering over chart data points, the system SHALL display an accessible tooltip showing date, category, and formatted currency amount.
- **EARS-004 (Unwanted Event)**: IF a selected date range contains no transactions, THEN the chart SHALL render an informative empty state instead of blank canvas.
- **EARS-005 (Ubiquitous)**: All charts and legends SHALL satisfy WCAG AA contrast standards and contain zero em dashes.
