CREATE TABLE IF NOT EXISTS "wishlist_items" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "user_id" uuid NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "title" varchar(255) NOT NULL,
  "target_amount" numeric(12, 2) NOT NULL,
  "currency" varchar(3) DEFAULT 'USD' NOT NULL,
  "priority" varchar(20) DEFAULT 'medium' NOT NULL,
  "target_date" date,
  "status" varchar(30) DEFAULT 'evaluating' NOT NULL,
  "verdict" varchar(30),
  "surplus_deficit" numeric(12, 2),
  "safe_purchase_date" date,
  "advice_rationale" text,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE "wishlist_items" ENABLE ROW LEVEL SECURITY;

-- Tenant Isolation Policy
CREATE POLICY "wishlist_items_isolation_policy"
  ON "wishlist_items"
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
