# Spend Control — Mission & Scope

## 1. Executive Summary & Purpose

**Spend Control** is a proactive financial intelligence application designed to give users complete visibility and conscious command over their daily finances.

Traditional personal finance tools act as passive retrospective ledgers—reporting where money went after it was already spent. **Spend Control** shifts the paradigm from passive bookkeeping to **forward-looking decision support**:
- It tracks daily expenditures effortlessly across diverse input streams.
- It maps fixed recurring obligations (loans, EMIs, rent, subscriptions).
- It provides an **AI Financial Advisor** capable of answering real-world purchasing questions: *"Can I afford this item right now?"*, *"When can I safely buy it without threatening my savings or upcoming loan payments?"*, and *"How will this affect my month-end cash flow?"*

---

## 2. Target Audience

### Phase 1: Creator Dogfooding (Immediate)
- **Primary User**: The creator.
- **Goal**: Rapid feedback loop, validating daily expense ingestion, testing the accuracy of the AI advisor, and refining visual dashboard utility.

### Phase 2: Public Launch (Multi-Tenant)
- **Audience**: Working professionals, freelancers, and everyday consumers who want to balance living comfortably with meeting financial commitments and savings targets.
- **Core Value Proposition**: Freedom from financial anxiety through clear visual charts, intelligent automation, and proactive purchase validation.

---

## 3. Scope & Key Capabilities

1. **Flexible Multi-Modal Expense Ingestion**:
   - **Manual Quick-Entry**: Rapid transaction logging on web and mobile with auto-categorization.
   - **Bank Statement Import**: Smart PDF/CSV upload with AI-assisted parsing into structured transactions.
   - **Automated Ingestion Hooks**: Future-ready endpoints for webhook/shortcut ingestion (e.g. iOS Shortcuts, SMS text prompts).
2. **Commitment & Dependency Tracking (Simple Phase 1)**:
   - Tracking recurring fixed commitments: EMIs, loan payments, house rent, insurance, and recurring utility bills.
   - Due date calendar alerts and monthly recurring burn calculation.
3. **Dynamic Visual Dashboard**:
   - High-impact visual analytics: daily spend velocity, monthly burn rate, category breakdowns, and net cash-flow curves.
4. **AI Financial Advisor ("Can I Buy This? / When Can I Buy It?")**:
   - Evaluates a desired purchase against current account balances, historical daily burn rate, and upcoming fixed obligations.
   - Provides concrete mathematical projections and conversational recommendations.
5. **Multi-Currency Support**:
   - Stores transactions in their native currency with real-time or user-defined conversion to the user's primary display currency.

---

## 4. Explicit Non-Goals (What We Will NOT Build)

To maintain sharp focus and rapid execution, the following are strictly out of scope for v1 and v2:
- **Direct Banking Transfers / Payment Execution**: Spend Control is an advisory and tracking intelligence platform, not a payment gateway or banking app. We do not initiate bank transfers.
- **Stock / Crypto Portfolio Trading**: No live brokerage trading, margin tracking, or speculative asset order placement.
- **Tax Filing & Formal Corporate Accounting**: Not an accounting ERP or tax compliance tool (no GST/IRS tax filing automation).
- **Complex Debt Restructuring / Loan Underwriting**: No complex loan refinancing or interest rate negotiation tools; loans are modeled strictly as recurring cash commitments.
