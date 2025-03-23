import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";

// export const usersTable = pgTable("users", {
//   id: integer().primaryKey().generatedAlwaysAsIdentity(),
//   name: varchar({ length: 255 }).notNull(),
//   age: integer().notNull(),
//   email: varchar({ length: 255 }).notNull().unique(),
// });

export const chatTable = pgTable("chat", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  title: text("title").notNull(),
  model: text("model").notNull(),
});

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  chatId: integer("chat_id").references(() => chatTable.id),
  role: text("role").notNull(),
  content: text("content").notNull(),
  // createdAt: integer("created_at").notNull(),
});

export type ChatModel = typeof chatTable.$inferSelect;
export type MessageModel = typeof messages.$inferSelect;
