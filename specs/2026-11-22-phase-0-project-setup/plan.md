# Implementation Plan: Phase 0 — Project Setup & Baseline Tooling

This plan is structured into small, self-contained task groups. Each group can be implemented, verified, and committed independently.

---

## Group 1: Repository Baseline, Tooling & Package Scaffolding
**Goal**: Initialize `package.json`, configure TypeScript strict mode, ESLint, and Next.js 15 baseline dependencies.

- [x] Task 1.1: Initialize `package.json` with scripts:
  - `"dev": "next dev"`
  - `"build": "next build"`
  - `"start": "next start"`
  - `"lint": "next lint"`
  - `"typecheck": "tsc --noEmit"`
- [x] Task 1.2: Install approved core dependencies:
  - `next@latest`, `react@latest`, `react-dom@latest`
- [x] Task 1.3: Install approved developer dependencies:
  - `typescript`, `@types/node`, `@types/react`, `@types/react-dom`, `eslint`, `eslint-config-next`
- [x] Task 1.4: Configure `tsconfig.json` with strict mode, target ES2022, incremental compilation, and `@/*` path mapping to `./src/*`.
- [x] Task 1.5: Configure `.gitignore` for Next.js artifacts (`.next/`, `node_modules/`, `.env*.local`).
- [x] Checkpoint: Verify `npm run typecheck` runs without missing config errors.

---

## Group 2: Styling Engine & Black/Gold Theme Infrastructure (Anti-Slop Aligned)
**Goal**: Configure Tailwind CSS v4, PostCSS, custom theme tokens for the Black & Gold palette, and utility helpers adhering to Anti-Slop rules.

- [x] Task 2.1: Install approved styling dependencies:
  - `tailwindcss@next` (or v4), `@tailwindcss/postcss`, `postcss`, `autoprefixer`, `clsx`, `tailwind-merge`, `class-variance-authority`.
- [x] Task 2.2: Create `postcss.config.mjs` registering `@tailwindcss/postcss`.
- [x] Task 2.3: Configure `src/app/globals.css`:
  - Import Tailwind CSS.
  - Define custom `@theme` properties and CSS variables for the Black & Gold palette:
    - `--background`: Deep black (`#09090b`).
    - `--foreground`: Clean white-gold tinted ivory (`#fafaf9`).
    - `--primary`: Metallic gold (`#d4af37` / `#eab308`).
    - `--primary-foreground`: Deep black (`#09090b`).
    - `--card`: Carbon gray/black (`#121214`).
    - `--card-foreground`: Off-white (`#f4f4f5`).
    - `--border`: Subdued dark gold/charcoal (`#27272a`).
    - `--muted`: Charcoal (`#18181b`).
    - `--muted-foreground`: Muted gold/sand gray (`#a1a1aa`).
  - Enforce Anti-Slop: Zero rainbow gradients, zero full-page blurred orbs, zero background blueprint grids.
- [x] Task 2.4: Create `src/lib/utils.ts` with the standard `cn(...inputs)` class utility using `clsx` and `tailwind-merge`.
- [x] Checkpoint: Validate CSS syntax and utility functions compile.

---

## Group 3: UI Primitives & Dark Mode System (Anti-Slop Craftsmanship)
**Goal**: Install UI icons and theme management, and build foundational reusable UI components meeting craftsmanship standards.

- [x] Task 3.1: Install approved UI packages:
  - `lucide-react`, `next-themes`.
- [x] Task 3.2: Implement `src/components/theme-provider.tsx` wrapping `next-themes/ThemeProvider` with `attribute="class"` and `defaultTheme="dark"`.
- [x] Task 3.3: Implement `src/components/ui/button.tsx` using `cva` with variants:
  - `gold` (default: metallic gold background, dark text, subtle focus ring).
  - `outline` (gold border, subtle gold background on hover).
  - `secondary` (dark charcoal background, white text).
  - `ghost` (transparent background, gold text on hover).
  - Enforce: Clear visible keyboard focus rings, touch target minimum 44px on mobile, no dead click handlers.
- [x] Task 3.4: Implement `src/components/ui/card.tsx` with `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, and `CardFooter` (subtle border, no floating heavy shadows).
- [x] Task 3.5: Implement `src/components/ui/badge.tsx` with variant styles (functional labels, no decorative capsule glow spam).
- [x] Task 3.6: Implement `src/components/theme-toggle.tsx` allowing one-click toggle between dark and light modes with proper ARIA labels.
- [x] Checkpoint: Verify UI components export proper TypeScript interfaces and satisfy WCAG AA contrast.

---

## Group 4: Layout Shell, Starter Dashboard & Environment Setup
**Goal**: Assemble root layout, interactive starter view showcasing theme and components, and configure environment contracts without AI slop copy.

- [x] Task 4.1: Implement `src/app/layout.tsx`:
  - Include `ThemeProvider` with dark mode default.
  - Set viewport, metadata (title: "Spend Control: Proactive Financial Intelligence", description, icons).
  - Apply global font and background classes.
- [x] Task 4.2: Implement `src/app/page.tsx`:
  - Header with Spend Control brand title, subtitle, and `ThemeToggle`.
  - Status hero section highlighting Phase 0 completion.
  - Preview KPI cards (e.g., "Current Balance", "Committed Monthly Burn", "Discretionary Buffer") with honest placeholder labels (`[PLACEHOLDER]`) and zero fake percentage trends.
  - Quick action buttons with functional alerts or modal triggers (zero dead buttons).
  - Anti-Slop copy audit: Zero em dashes (`—`), zero buzzwords ("revolutionary", "seamless"), no decorative emoji.
- [x] Task 4.3: Create `.env.example` defining environment variables for upcoming phases:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `GOOGLE_GENERATIVE_AI_API_KEY`
- [x] Checkpoint: Launch dev build and verify clean visual rendering on desktop and mobile viewports.

---

## Group 5: Quality Gates, Static Verification & Roadmap Sync
**Goal**: Enforce quality gates, verify production build, run Anti-Slop audit, and check off Phase 0 in `specs/roadmap.md`.

- [x] Task 5.1: Run `npm run typecheck` (`tsc --noEmit`) and verify 0 errors.
- [x] Task 5.2: Run `npm run lint` and resolve any ESLint warnings or errors.
- [x] Task 5.3: Run `npm run build` and ensure Next.js outputs a production bundle successfully.
- [x] Task 5.4: Conduct Anti-Slop Audit (verify no em dashes, no dead buttons, no fake stats, WCAG AA contrast).
- [x] Task 5.5: Update `specs/roadmap.md` with checked boxes `[x]` for Phase 0 items.
- [x] Checkpoint: All quality checks green and ready for Phase 1.
