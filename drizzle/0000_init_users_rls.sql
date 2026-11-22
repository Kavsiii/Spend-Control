CREATE TABLE IF NOT EXISTS "users" (
  "id" uuid PRIMARY KEY NOT NULL,
  "email" varchar(255) NOT NULL,
  "display_name" varchar(255),
  "base_currency" varchar(3) DEFAULT 'USD' NOT NULL,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL
);

-- Enable PostgreSQL Row Level Security (RLS)
ALTER TABLE "users" ENABLE ROW LEVEL SECURITY;

-- User isolation policy: each user can only read and mutate their own profile
CREATE POLICY "users_isolation_policy"
  ON "users"
  FOR ALL
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);
