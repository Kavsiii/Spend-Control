CREATE TABLE IF NOT EXISTS "transactions" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "user_id" uuid NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "account_id" uuid REFERENCES "accounts"("id") ON DELETE SET NULL,
  "amount" numeric(12, 2) NOT NULL,
  "currency" varchar(3) DEFAULT 'USD' NOT NULL,
  "base_amount" numeric(12, 2) NOT NULL,
  "type" varchar(20) DEFAULT 'expense' NOT NULL,
  "category" varchar(50) NOT NULL,
  "transaction_date" date NOT NULL,
  "description" varchar(255) NOT NULL,
  "raw_source" varchar(50) DEFAULT 'manual' NOT NULL,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE "transactions" ENABLE ROW LEVEL SECURITY;

-- Tenant Isolation Policy
CREATE POLICY "transactions_isolation_policy"
  ON "transactions"
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
