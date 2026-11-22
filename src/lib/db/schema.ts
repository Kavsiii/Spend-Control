import {
  pgTable,
  uuid,
  varchar,
  numeric,
  boolean,
  date,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().notNull(), // maps to auth.users.id
  email: varchar("email", { length: 255 }).notNull(),
  displayName: varchar("display_name", { length: 255 }),
  baseCurrency: varchar("base_currency", { length: 3 })
    .default("USD")
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const accounts = pgTable("accounts", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 255 }).notNull(),
  type: varchar("type", { length: 50 }).notNull(), // "bank" | "cash" | "credit" | "investment"
  balance: numeric("balance", { precision: 12, scale: 2 })
    .default("0.00")
    .notNull(),
  currency: varchar("currency", { length: 3 }).default("USD").notNull(),
  isPrimary: boolean("is_primary").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const commitments = pgTable("commitments", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 255 }).notNull(),
  category: varchar("category", { length: 50 }).notNull(), // "loan_emi" | "rent" | "utility" | "subscription" | "other"
  amount: numeric("amount", { precision: 12, scale: 2 }).notNull(),
  currency: varchar("currency", { length: 3 }).default("USD").notNull(),
  frequency: varchar("frequency", { length: 50 }).default("monthly").notNull(), // "monthly" | "quarterly" | "annual"
  nextDueDate: date("next_due_date").notNull(),
  endDate: date("end_date"),
  isActive: boolean("is_active").default(true).notNull(),
  autoDebit: boolean("auto_debit").default(false).notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const transactions = pgTable("transactions", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  accountId: uuid("account_id").references(() => accounts.id, {
    onDelete: "set null",
  }),
  amount: numeric("amount", { precision: 12, scale: 2 }).notNull(),
  currency: varchar("currency", { length: 3 }).default("USD").notNull(),
  baseAmount: numeric("base_amount", { precision: 12, scale: 2 }).notNull(),
  type: varchar("type", { length: 20 }).default("expense").notNull(), // "expense" | "income"
  category: varchar("category", { length: 50 }).notNull(), // "food" | "transport" | "shopping" | "entertainment" | "health" | "utilities" | "other"
  transactionDate: date("transaction_date").notNull(),
  description: varchar("description", { length: 255 }).notNull(),
  rawSource: varchar("raw_source", { length: 50 }).default("manual").notNull(), // "manual" | "statement" | "ai_parsed"
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const statementUploads = pgTable("statement_uploads", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  fileName: varchar("file_name", { length: 255 }).notNull(),
  fileUrl: varchar("file_url", { length: 512 }),
  fileType: varchar("file_type", { length: 50 }).notNull(), // "csv" | "pdf" | "txt"
  status: varchar("status", { length: 50 }).default("pending").notNull(), // "pending" | "processing" | "completed" | "failed"
  extractedCount: numeric("extracted_count").default("0").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const wishlistItems = pgTable("wishlist_items", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 255 }).notNull(),
  targetAmount: numeric("target_amount", { precision: 12, scale: 2 }).notNull(),
  currency: varchar("currency", { length: 3 }).default("USD").notNull(),
  priority: varchar("priority", { length: 20 }).default("medium").notNull(), // "low" | "medium" | "high"
  targetDate: date("target_date"),
  status: varchar("status", { length: 30 }).default("evaluating").notNull(), // "evaluating" | "approved" | "purchased" | "deferred"
  verdict: varchar("verdict", { length: 30 }), // "BUY_NOW" | "DEFER" | "TARGET_DATE"
  surplusDeficit: numeric("surplus_deficit", { precision: 12, scale: 2 }),
  safePurchaseDate: date("safe_purchase_date"),
  adviceRationale: text("advice_rationale"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Account = typeof accounts.$inferSelect;
export type NewAccount = typeof accounts.$inferInsert;

export type Commitment = typeof commitments.$inferSelect;
export type NewCommitment = typeof commitments.$inferInsert;

export type Transaction = typeof transactions.$inferSelect;
export type NewTransaction = typeof transactions.$inferInsert;

export type StatementUpload = typeof statementUploads.$inferSelect;
export type NewStatementUpload = typeof statementUploads.$inferInsert;

export type WishlistItem = typeof wishlistItems.$inferSelect;
export type NewWishlistItem = typeof wishlistItems.$inferInsert;
