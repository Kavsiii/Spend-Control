import * as fs from "fs";
import * as path from "path";

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(`Security Audit Failure: ${message}`);
  }
}

console.log("Running Multi-Tenant RLS Security Audit...");

const requiredTables = [
  "users",
  "accounts",
  "commitments",
  "transactions",
  "statement_uploads",
  "wishlist_items",
];

const drizzleDir = path.join(process.cwd(), "drizzle");
assert(fs.existsSync(drizzleDir), `Drizzle directory missing at ${drizzleDir}`);

const sqlFiles = fs
  .readdirSync(drizzleDir)
  .filter((f) => f.endsWith(".sql"))
  .map((f) => fs.readFileSync(path.join(drizzleDir, f), "utf-8"));

const fullMigrationSql = sqlFiles.join("\n\n");

// Audit each required table
for (const table of requiredTables) {
  // 1. Table creation check
  const tableCreateRegex = new RegExp(`CREATE TABLE (IF NOT EXISTS )?"?${table}"?`, "i");
  assert(
    tableCreateRegex.test(fullMigrationSql),
    `Table "${table}" must be declared in migration SQL.`
  );

  // 2. RLS activation check
  const rlsEnableRegex = new RegExp(`ALTER TABLE "?${table}"? ENABLE ROW LEVEL SECURITY;`, "i");
  assert(
    rlsEnableRegex.test(fullMigrationSql),
    `Table "${table}" MUST have "ENABLE ROW LEVEL SECURITY" enabled.`
  );

  // 3. User isolation policy check
  const policyRegex = new RegExp(
    `CREATE POLICY "[^"]+"\\s+ON "?${table}"?[^;]+USING \\((auth\\.uid\\(\\)\\s*=\\s*(user_id|id))\\)`,
    "i"
  );
  assert(
    policyRegex.test(fullMigrationSql),
    `Table "${table}" MUST enforce strict tenant policy (auth.uid() = user_id or auth.uid() = id).`
  );

  console.log(`  ✓ Table "${table}": Row Level Security & Tenant Policy verified.`);
}

console.log("PASS: 100% of tables verified with PostgreSQL Row Level Security tenant isolation.");
