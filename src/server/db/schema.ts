// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  index,
  pgTableCreator,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `slx_${name}`);

export const posts = createTable(
  "post",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt"),
    content: text("content"),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
  }),
);

export const drawings = createTable("drawing", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 256 }),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  description: text("description"),
  url: text("url"),
  uv: text("uv"),
  productUrl: text("product_url"),
});

export const paintings = createTable("painting", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 256 }),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  description: text("description"),
  url: text("url"),
  uv: text("uv"),
  productUrl: text("product_url"),
});

export const digitalArt = createTable("digital", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 256 }),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  description: text("description"),
  url: text("url"),
  uv: text("uv"),
  productUrl: text("product_url"),
});

export const uvArt = createTable("uv", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 256 }),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  description: text("description"),
  url: text("url"),
  uv: text("uv"),
});

export const customers = createTable("customer", {
  userId: varchar("user_id", { length: 256 }).primaryKey(),
  email: varchar("email", { length: 256 }),
  accessToken: text("access_token"),
  cartId: varchar("cart_id", { length: 256 }),
});
