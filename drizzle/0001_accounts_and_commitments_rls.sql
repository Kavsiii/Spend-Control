CREATE TABLE IF NOT EXISTS "accounts" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "user_id" uuid NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "name" varchar(255) NOT NULL,
  "type" varchar(50) NOT NULL,
  "balance" numeric(12, 2) DEFAULT '0.00' NOT NULL,
  "currency" varchar(3) DEFAULT 'USD' NOT NULL,
  "is_primary" boolean DEFAULT false NOT NULL,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "commitments" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "user_id" uuid NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "title" varchar(255) NOT NULL,
  "category" varchar(50) NOT NULL,
  "amount" numeric(12, 2) NOT NULL,
  "currency" varchar(3) DEFAULT 'USD' NOT NULL,
  "frequency" varchar(50) DEFAULT 'monthly' NOT NULL,
  "next_due_date" date NOT NULL,
  "end_date" date,
  "is_active" boolean DEFAULT true NOT NULL,
  "auto_debit" boolean DEFAULT false NOT NULL,
  "notes" text,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE "accounts" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "commitments" ENABLE ROW LEVEL SECURITY;

-- Tenant Isolation Policies
CREATE POLICY "accounts_isolation_policy"
  ON "accounts"
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "commitments_isolation_policy"
  ON "commitments"
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
