# Spend Control — Overall Architecture & Execution Flow

This document details the system design, data architecture, and end-to-end execution flows for Spend Control.

---

## 1. System Architecture

```mermaid
flowchart TD
    subgraph ClientLayer ["Client Tier (Browser & Mobile Responsive PWA)"]
        UI_Dash["Dashboard & Visual Charts"]
        UI_Entry["Quick Expense Ingestion"]
        UI_Upload["Statement Importer (PDF/CSV)"]
        UI_Commit["Commitments & Loans Tracker"]
        UI_Advisor["AI Advisor Interface ('Can I Buy This?')"]
    end

    subgraph AppLayer ["Application Tier (Next.js 15 App Router)"]
        AuthMiddleware["Auth & Session Middleware"]
        ServerActions["Server Actions (CRUD & Mutations)"]
        IngestService["Ingestion & Parsing Pipeline"]
        CalcEngine["Deterministic Financial Engine"]
        AdvisorService["AI Financial Advisor Service"]
    end

    subgraph ExternalAI ["External AI Services"]
        LLM["Google Gemini 2.0 Flash (Vercel AI SDK)"]
    end

    subgraph DataLayer ["Data & Storage Tier (Supabase)"]
        Postgres[("PostgreSQL Database (RLS Enforced)")]
        FileStore[("Supabase Storage (Statements & Docs)")]
        SupabaseAuth["Supabase Auth Service"]
    end

    ClientLayer -->|HTTPS / JWT| AuthMiddleware
    AuthMiddleware --> ServerActions
    ServerActions --> CalcEngine
    ServerActions --> IngestService
    ServerActions --> AdvisorService

    IngestService -->|Document Text & Schema| LLM
    AdvisorService -->|Financial Context & Prompts| LLM
    IngestService -->|Store Uploaded File| FileStore

    ServerActions -->|Drizzle ORM / SQL| Postgres
    AuthMiddleware -->|Verify Token| SupabaseAuth
    CalcEngine -->|Read Verified Financial Records| Postgres
```

---

## 2. Data Model & Entity Relationships

```mermaid
erDiagram
    USERS ||--o{ ACCOUNTS : owns
    USERS ||--o{ TRANSACTIONS : logs
    USERS ||--o{ COMMITMENTS : manages
    USERS ||--o{ WISHLIST_ITEMS : evaluates
    USERS ||--o{ STATEMENT_UPLOADS : uploads
    ACCOUNTS ||--o{ TRANSACTIONS : contains

    USERS {
        uuid id PK
        string email
        string display_name
        string base_currency
        timestamp created_at
        timestamp updated_at
    }

    ACCOUNTS {
        uuid id PK
        uuid user_id FK
        string name
        string type "bank | cash | credit | investment"
        numeric balance
        string currency
        timestamp created_at
    }

    TRANSACTIONS {
        uuid id PK
        uuid user_id FK
        uuid account_id FK
        numeric amount
        string currency
        numeric base_amount
        string type "expense | income | transfer"
        string category
        date transaction_date
        string description
        string raw_source "manual | statement | ai_parsed"
        timestamp created_at
    }

    COMMITMENTS {
        uuid id PK
        uuid user_id FK
        string title
        string category "loan_emi | rent | utility | subscription"
        numeric amount
        string currency
        numeric base_amount
        string frequency "monthly | quarterly | annual"
        date next_due_date
        date end_date "nullable for indefinite"
        boolean is_active
        timestamp created_at
    }

    WISHLIST_ITEMS {
        uuid id PK
        uuid user_id FK
        string title
        numeric target_amount
        string currency
        string priority "low | medium | high"
        date target_date
        string status "evaluating | approved | purchased | deferred"
        jsonb last_advice_payload
        timestamp created_at
    }

    STATEMENT_UPLOADS {
        uuid id PK
        uuid user_id FK
        string file_name
        string file_url
        string status "pending | processing | completed | failed"
        int extracted_count
        timestamp created_at
    }
```

---

## 3. End-to-End Execution Flows

### 3.1 Daily Expense Ingestion Flow (Manual & Statement Upload)

```mermaid
sequenceDiagram
    autonumber
    actor User
    participant WebUI as Web/Mobile Client
    participant API as Next.js Server Action
    participant AI as Gemini 2.0 (AI SDK)
    participant Storage as Supabase Storage
    participant DB as Postgres (RLS)

    alt Manual Quick Entry
        User->>WebUI: Enters Amount, Category, Note, Currency
        WebUI->>API: submitExpense(payload)
        API->>DB: INSERT into TRANSACTIONS (user_id = auth.uid())
        DB-->>API: Success
        API-->>WebUI: Revalidate path & Update Dashboard
    else Bank Statement Upload
        User->>WebUI: Uploads Statement (PDF/CSV)
        WebUI->>API: uploadStatement(file)
        API->>Storage: Store statement file in user bucket
        API->>API: Extract raw text / parse rows
        API->>AI: generateObject(rawText, TransactionSchema)
        AI-->>API: Structured transaction array
        API-->>WebUI: Return candidate transactions for user review
        User->>WebUI: Confirms / edits extracted entries
        WebUI->>API: commitTransactions(confirmedItems)
        API->>DB: Batch INSERT into TRANSACTIONS
        API-->>WebUI: Ingestion completed
    end
```

### 3.2 AI Financial Advisor: "Can I Buy This Product?" Flow

```mermaid
sequenceDiagram
    autonumber
    actor User
    participant WebUI as Advisor UI
    participant Advisor as Advisor Service (Next.js)
    participant Engine as Deterministic Financial Engine
    participant DB as Postgres (RLS)
    participant AI as Gemini 2.0 Flash

    User->>WebUI: Submits wishlist question ("Can I buy MacBook Pro for $2,000 next month?")
    WebUI->>Advisor: evaluatePurchase(targetAmount, currency, timeHorizon)
    Advisor->>DB: Fetch user's current liquid balances
    Advisor->>DB: Fetch active commitments (EMIs, rent, subscriptions) for next 30-90 days
    Advisor->>DB: Fetch trailing 30-day average daily expense
    DB-->>Engine: Raw financial figures
    Engine->>Engine: Calculate Discretionary Surplus = Liquid Balances + Expected Income - Upcoming Commitments - Projected Daily Living Expenses
    Engine-->>Advisor: Verified Financial Snapshot { surplus: $1,400, deficit: $600, safePurchaseDate: "2026-03-15" }
    Advisor->>AI: Prompt with { Question, VerifiedFinancialSnapshot, UserGoals }
    AI-->>Advisor: Structured recommendation (Decision: DEFER, Safe Date: 2.5 months, Savings Plan: $300/mo)
    Advisor->>DB: Save evaluation to WISHLIST_ITEMS
    Advisor-->>WebUI: Display clear visual decision card + conversational rationale
```
