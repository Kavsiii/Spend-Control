# Requirements: Phase 0 — Project Setup & Baseline Tooling

## 1. Context

"Spend Control" is a proactive personal finance intelligence application. To ensure reliable execution across future phases (multi-tenant auth, expense tracking, visual dashboards, and AI advisory), Phase 0 establishes the technical bedrock:
- Next.js 15 App Router with TypeScript strict mode.
- Tailwind CSS v4 with a custom **Black & Gold** luxury/financial aesthetic.
- Component primitives (`shadcn/ui` style), Lucide React icons, and dark-mode infrastructure.
- Zero-drift hygiene: strict linting, typechecking, and environment templates.
- **Anti-Slop Craftsmanship Standard**: Guaranteed human-crafted quality, avoiding all recognizable "AI slop" visual and copywriting patterns.

---

## 2. Scope

### In Scope
1. **Next.js 15 Scaffolding**:
   - Initialize Next.js 15 in the repository root using TypeScript and the App Router (`src/app/`).
   - Configure `@/*` path aliases in `tsconfig.json`.
   - Setup `.gitignore` for Next.js, Node, and environment files.
2. **Styling & Theme Engine**:
   - Install and configure Tailwind CSS v4 and PostCSS.
   - Implement custom Black & Gold theme variables (`--background`, `--foreground`, `--primary`, `--gold`, `--border`, `--card`, etc.) in `src/app/globals.css`.
   - Implement `cn()` class merger utility in `src/lib/utils.ts`.
3. **UI Foundations & Icons**:
   - Install `lucide-react`, `clsx`, `tailwind-merge`, and `class-variance-authority`.
   - Setup `next-themes` dark mode provider defaulting to dark mode.
   - Implement foundational UI components: `Button`, `Card`, `Badge`, and `ThemeToggle`.
4. **Starter Shell & Environment Contracts**:
   - Create root `layout.tsx` and a starter `page.tsx` showcasing project identity, theme toggle, and Phase 0 completion status.
   - Create `.env.example` documenting anticipated environment variables (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `GOOGLE_GENERATIVE_AI_API_KEY`).
5. **Static Verification**:
   - Add and verify `npm run typecheck`, `npm run lint`, and `npm run build` scripts.
6. **Anti-Slop Craftsmanship & Copywriting Standards**:
   - **Intentionality**: Restrained 2-color base (Black/Charcoal) with 1 deliberate Gold accent; zero generic blue-purple gradients, background grids, or full-page blurred orbs.
   - **No Pill Overdose**: Preserve border-radius variation for clear hierarchy rather than making every card and input a pill.
   - **Accessible Contrast**: All text and gold accents meet WCAG AA standards (4.5:1 normal, 3:1 large).
   - **Copywriting Hygiene**: Zero em dashes (`—`) in UI copy; zero AI buzzwords ("seamless", "revolutionary", "cutting-edge"); no fabricated statistics or fake metrics.
   - **Functional Completeness**: Every button and control has a real behavior; no dead mockups.

### Out of Scope
- **Database & ORM**: No PostgreSQL connection, Drizzle schema, or migrations (deferred to Phase 1).
- **Authentication**: No Supabase Auth, login/signup forms, or route middleware (deferred to Phase 1).
- **Domain Logic**: No account balances, transaction logging, or loan/EMI calculations (deferred to Phases 2-4).
- **AI Integrations**: No Gemini API calls, Vercel AI SDK runtime, or statement parsers (deferred to Phases 5-6).

---

## 3. Key Decisions & Rationale

| Decision | Selected Option | Rationale |
| :--- | :--- | :--- |
| **Package Manager** | `npm` | User preference; universal compatibility, zero extra CLI installations. |
| **Directory Placement** | Project root with `src/app/` | Standard Next.js architecture; isolates application source code cleanly from root configuration and spec documents. |
| **Tailwind Version** | Tailwind CSS v4 | User selected Option A; modern CSS-first `@theme` configuration, zero-boilerplate setup, improved build performance. |
| **Visual Palette** | Black & Gold | User selected; deep carbon black surfaces (`#09090b` / `#000000`) paired with refined warm metallic gold accents (`#d4af37` / `#f59e0b`), establishing a distinctive, premium financial intelligence identity. |
| **Theme System** | `next-themes` | Eliminates SSR hydration flash; seamlessly supports dark mode as the primary default experience while allowing instant toggle. |
| **Anti-Slop Dials** | **ENERGY 2 / RHYTHM 2 / MOTION 1** | **ENERGY 2** (Balanced luxury financial aesthetic, confident and serious); **RHYTHM 2** (Structured financial cards with intentional layout variation); **MOTION 1** (Calm, purposeful hover/focus transitions without endless pulsing loops). |

---

## 4. EARS Behavioral Specifications

- **EARS-001 (Ubiquitous)**: The system SHALL compile and execute with TypeScript strict mode enabled and zero implicit `any` types.
- **EARS-002 (Ubiquitous)**: The system SHALL serve responsive web pages with dark mode active as the default visual state.
- **EARS-003 (Event-driven)**: WHEN a user clicks the theme toggle button, the system SHALL switch the color scheme between dark mode and light mode without reloading the page or causing hydration mismatch.
- **EARS-004 (State-driven)**: WHILE rendering interactive buttons and badges, the system SHALL apply Black & Gold high-contrast accent styling adhering to accessibility standards (WCAG AA).
- **EARS-005 (Event-driven)**: WHEN executing `npm run build`, the build pipeline SHALL produce an optimized production bundle without type errors, linting warnings, or missing dependencies.
- **EARS-006 (Unwanted Event)**: IF an unhandled error occurs within the client runtime, THEN the application SHALL render an error boundary displaying user-friendly feedback rather than crashing silently.
- **EARS-007 (Ubiquitous - Anti-Slop Copy)**: The system SHALL NOT render em dash characters (`—`) in any user-facing UI text, using commas, colons, or parentheses instead.
- **EARS-008 (Ubiquitous - Anti-Slop Data)**: The system SHALL NOT display fabricated statistics, unverified metrics, or simulated percentage deltas; any non-live figure must be explicitly marked as a labeled placeholder (`[PLACEHOLDER]`).
- **EARS-009 (Ubiquitous - Functional Completeness)**: Every interactive button, link, or toggle rendered on screen SHALL execute an accessible action or explicitly display a visible "Coming soon" state.
- **EARS-010 (Ubiquitous - No Decorative Emoji)**: The system SHALL NOT render decorative emojis in headings, badges, or buttons.

---

## 5. Unknowns & Clarifications

- [NEEDS CLARIFICATION: Default Typography] — Defaulting to Next.js bundled `Geist Sans` and `Geist Mono` variable fonts for modern legibility. Can be adjusted to custom fonts in future phases if desired.
- [NEEDS CLARIFICATION: Analytics Telemetry] — Zero tracking or telemetry configured in Phase 0; will clarify before Phase 8 public launch.
