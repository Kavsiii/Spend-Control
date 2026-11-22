CREATE TABLE IF NOT EXISTS "statement_uploads" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "user_id" uuid NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "file_name" varchar(255) NOT NULL,
  "file_url" varchar(512),
  "file_type" varchar(50) NOT NULL,
  "status" varchar(50) DEFAULT 'pending' NOT NULL,
  "extracted_count" numeric DEFAULT '0' NOT NULL,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE "statement_uploads" ENABLE ROW LEVEL SECURITY;

-- Tenant Isolation Policy
CREATE POLICY "statement_uploads_isolation_policy"
  ON "statement_uploads"
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
