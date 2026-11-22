# Spend Control — Agent Guidelines & Operating Rules

This document defines the non-negotiable operating rules, coding standards, and execution workflow for any AI Agent working in this repository.

---

## 1. Golden Rule: Specs Are the Source of Truth ("Specs-First")

1. **Check Before Acting**: Always consult the specifications in `specs/` before creating files, adding dependencies, modifying schemas, or implementing features:
   - `specs/mission.md`: Goals, audience, scope boundaries, and non-goals.
   - `specs/tech-stack.md`: Approved libraries, tools, database, and constraints.
   - `specs/Overall_Architecture-Flow.md`: System design, data models, and logic flows.
   - `specs/roadmap.md`: Current phase, implementation sequence, and milestones.
2. **Synchronize On Every Change**:
   - Whenever an architectural change, new entity, modified flow, or completed task occurs, **update the corresponding specification document immediately**.
   - Check off items in `specs/roadmap.md` as they are implemented and verified.
   - Never let code and specifications drift.

---

## 2. Multi-Tenancy & Data Isolation

1. **Strict User Scoping**: This application is multi-tenant from Day 1.
   - Every database table holding user data must have a `user_id` foreign key referencing the authenticated user.
   - PostgreSQL Row Level Security (RLS) must be enabled and enforced on every user table.
   - Every backend query and mutation (Server Actions, Route Handlers) must verify session identity and enforce tenant isolation. Never query by record ID alone without verifying `user_id`.

---

## 3. Financial Logic & AI Separation of Concerns

1. **Deterministic Calculations First**:
   - All financial math (burn rate, cash flow surplus, loan/EMI obligations, account balances) must be calculated using deterministic, tested TypeScript/SQL logic.
   - Never rely on an LLM to perform basic arithmetic or calculate net savings.
2. **AI as Advisor, Not Accountant**:
   - The AI engine consumes pre-calculated, deterministic financial summaries and provides qualitative advice, scenario evaluation ("Can I afford X?"), trade-off analysis, and parsing of unstructured inputs.
   - Always validate and sanitize AI-extracted data (e.g. statement parsing) through Zod schemas before persisting to the database.

---

## 4. Code Standards & Architecture

1. **TypeScript Strictness**:
   - Strict mode enabled. No `any` types allowed. Use explicit types, interfaces, or Zod-inferred types.
2. **Component Architecture**:
   - Server Components by default in Next.js App Router.
   - Add `"use client"` only when client interactivity, local state, or browser APIs are required.
   - Keep UI components clean, reusable, and accessible using `shadcn/ui` and Tailwind CSS.
3. **Data Validation**:
   - All incoming requests, form submissions, and external API responses must be validated with Zod schemas.
4. **Defensive Error Handling**:
   - Handle loading states, empty states, and error states gracefully in every view.
   - Provide informative user feedback (toasts, alerts) instead of silent failures.

---

## 5. Verification Protocol

Before declaring any phase, feature, or bug fix complete:
1. Run static type checking (`npm run typecheck` or `npx tsc --noEmit`).
2. Run linting (`npm run lint`).
3. Ensure the project builds cleanly without runtime errors or broken links.
4. Update `specs/roadmap.md` with checked boxes `[x]` corresponding to completed work.

---

## 6. Anti-Slop & Craftsmanship Standards (UI & Copy Filter)

Every interface and line of copy must look and feel crafted with deliberate human intent, avoiding recognizable "AI slop":

1. **Craftsmanship Standard**:
   - **Intentionality**: Every visual and copy decision must have an articulable reason. If the only reason is "it's the AI default", discard or rework it.
   - **Functional Completeness**: Every button, link, and interactive element must work or not exist. No dead controls.
   - **Content-Driven Composition**: Structure layouts around actual financial data needs, not generic landing templates or bento grids.
   - **Resilience**: Every view displaying data must have three complete states: Empty state, Loading state, and Error state.
   - **Evidence Over Claims**: Never invent metrics, testimonials, or fake delta percentages (+12%). Real data or honest labeled placeholders (`[REAL DATA]`, "Coming soon") only.

2. **Visual & Styling Hygiene**:
   - **Palette Restraint**: Strictly adhere to the Black & Gold palette (deep carbon black surfaces, charcoal borders, and deliberate warm gold accents). No generic blue/purple/rainbow gradients, and no full-page blurred orbs.
   - **No Glow/Shadow Everywhere**: Shadows and glow are reserved strictly for 1-2 focused elevation points.
   - **Radius Variation**: Do not make every card, input, and badge pill-shaped. Use consistent border-radius tokens for clear hierarchy.
   - **High Contrast**: Ensure all text and gold accents meet WCAG AA contrast standards (minimum 4.5:1 for normal text, 3:1 for large text).

3. **Copywriting Hygiene**:
   - **No Em Dashes (`—`)**: Never use em dashes in generated UI copy. Use commas, colons, or parentheses instead.
   - **No AI Buzzwords**: Ban empty fluff ("seamless", "revolutionary", "game-changer", "cutting-edge", "elevate", "unlock"). Use precise, plain English explaining concrete actions.
   - **Action-Specific CTAs**: Label buttons with their exact function (e.g. "Log Expense", "Evaluate Purchase", "Connect Account") rather than generic prompts ("Get Started", "Learn More", "Explore").

