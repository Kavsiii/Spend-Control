# Phase 8: Public Beta Hardening & Multi-User Launch — Validation Protocol

## Definition of Done (DoD) Commands

```bash
# 1. Static Typecheck (must pass with 0 errors)
npm run typecheck

# 2. ESLint (must pass with 0 warnings or errors)
npm run lint

# 3. Unit Sanity Tests (calculations, advisor, parser, rate-limit, rls-audit)
npx tsx src/lib/finance/calculations.test.ts
npx tsx src/lib/ai/advisor.test.ts
npx tsx src/lib/ingest/parser.test.ts
npx tsx src/lib/security/rate-limit.test.ts
npx tsx src/lib/security/rls-audit.test.ts

# 4. Anti-Slop Verification (Zero em dashes across all source code)
grep -rn "—" src/ || echo "PASS: Zero em dashes detected"

# 5. Full Production Build (must generate all static & dynamic routes cleanly)
npm run build
```

---

## Manual Verification Checks
1. **Onboarding Wizard**:
   - Access `/dashboard` with empty state.
   - Click "Launch Setup Guide" or trigger the onboarding wizard.
   - Advance through Step 1 (Currency: USD/EUR/GBP/INR), Step 2 (Account: checking $5,000), Step 3 (Commitment: Rent $1,500).
   - Observe real-time calculation preview and successful dismissal.
2. **Rate Limiting**:
   - Verify that rapid successive purchase evaluations or statement calls trigger a clean rate limit message without crashing the server.
3. **RLS Multi-Tenancy**:
   - Verify all 6 tables enforce strict PostgreSQL RLS policies ensuring users cannot view or mutate another tenant's records.
4. **Landing Page Navigation**:
   - Navigate to `/`.
   - Confirm all buttons ("Go to Dashboard", "Sign In", "Launch Advisor", "Import Statement") navigate cleanly without dead links.
5. **Aesthetic & Anti-Slop**:
   - Black carbon background (`#09090b`), gold accents (`#d4af37`), crisp typography, no fuzzy blue gradients.

---

## Not Required
- Live third-party banking OAuth connections (Plaid/Yodlee).
- Live payment gateway processing (Stripe).
- Third-party SaaS monitoring integrations (Sentry/Datadog) for initial beta.
