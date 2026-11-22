# Spend Control — Tech Stack & Technical Constraints

## 1. Architecture Philosophy

Spend Control is architected as a modern, high-performance, full-stack web application designed for responsive desktop and mobile use. It prioritizes:
- **Multi-Tenancy from Day 1**: Strict data isolation per user via database-level policies.
- **Frictionless Developer Experience**: Type-safe end-to-end TypeScript.
- **Cost-Efficiency**: Generous zero-cost initial tiers with scalable cloud deployment paths.
- **Robust AI Integration**: Decoupled AI advisory layer backed by structured schemas.

---

## 2. Core Technology Choices

### Frontend & Client Tier
- **Framework**: [Next.js 15](https://nextjs.org/) (React 19, App Router, Server Components).
- **Language**: TypeScript (strict mode enabled).
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) for utility-first styling.
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) (accessible Radix UI primitives, copy-paste ownership, dark-mode native).
- **Icons**: [Lucide React](https://lucide.dev/).
- **Data Visualizations & Charts**: [Recharts](https://recharts.org/) / [Tremor](https://tremor.so/) for responsive financial analytics (burn rate area charts, category donuts, cash flow bar graphs).
- **Form Handling & Validation**: React Hook Form with [Zod](https://zod.dev/) schemas.

### Backend & API Tier
- **Execution Model**: Next.js Server Actions (mutations) and Route Handlers (REST endpoints for webhooks/file uploads).
- **Authentication**: [Supabase Auth](https://supabase.com/docs/guides/auth) (Email/Password, Magic Link, Google OAuth) supporting JWT sessions.

### Database & Storage
- **Database**: [PostgreSQL](https://www.postgresql.org/) hosted on [Supabase](https://supabase.com/).
- **Multi-Tenancy Security**: PostgreSQL Row-Level Security (RLS) enforcing `user_id = auth.uid()` on all user-owned tables.
- **ORM / Query Builder**: [Drizzle ORM](https://orm.drizzle.team/) (lightweight, type-safe, SQL-like query builder with zero overhead).
- **Migrations**: Drizzle Kit.
- **Object Storage**: Supabase Storage buckets for uploaded bank statement files (PDF/CSV) and receipts.

### AI Engine & Ingestion Pipeline
- **AI Framework**: [Vercel AI SDK](https://sdk.vercel.ai/docs) (`ai`, `@ai-sdk/google`).
- **Primary LLM**: Google Gemini 2.0 Flash (high speed, cost-effective, expansive context window for PDF/statement parsing and advisory reasoning).
- **Statement Extraction**: Node-based text parser (`pdf-parse`, `papaparse`) combined with Gemini structured output (`generateObject` with Zod schema) for deterministic transaction extraction.

### Hosting & Infrastructure
- **Web App & APIs**: [Vercel](https://vercel.com/) (global edge routing, automatic branch preview deployments).
- **Database & Auth Services**: [Supabase](https://supabase.com/) cloud instance.
- **CI / CD**: GitHub Actions / Vercel automated deployment.

---

## 3. Technical Constraints & Invariants

1. **Zero Raw Secrets in Code**: All API keys (`SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `GOOGLE_GENERATIVE_AI_API_KEY`) must reside in `.env.local` and `.env.example`.
2. **Client-Server Boundary**: Database credentials and ORM instances must never leak into client bundles. Only Server Actions and Route Handlers interact with the database.
3. **Multi-Currency Normalization**: Every transaction records its original `amount` and `currency`, alongside a normalized `base_amount` converted to the user's preferred display currency.
4. **Deterministic Finance Calculations**: Formulas for net balance, monthly commitments, daily average spend, and available liquidity must be computed via pure functions in TypeScript, never delegated to LLM guesswork.
