import { sql } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export enum Role {
  client = "CLIENT",
  admin = "ADMIN",
}

export const accounts = sqliteTable("accounts", {
  id: text("id", { length: 36 })
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  role: text("role", { enum: [Role.admin, Role.client] }).default(Role.client),
  email: text("email").unique().notNull(),
  password: text("password").notNull(),
  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
  updateAt: text("updated_at").$onUpdate(() => sql`(CURRENT_TIMESTAMP)`),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});

export const users = sqliteTable("users", {
  id: text("id", { length: 36 })
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  img: text("img").unique(),
  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
  updateAt: text("updated_at").$onUpdate(() => sql`(CURRENT_TIMESTAMP)`),
});

export type InsertAccount = typeof accounts.$inferInsert;
export type SelectAccount = typeof accounts.$inferSelect;

export type InsertContact = typeof users.$inferInsert;
export type SelectContact = typeof users.$inferSelect;
