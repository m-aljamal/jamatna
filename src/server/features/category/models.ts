import { pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";

export const categoryTable = pgTable("category", {
  id: serial("id").primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
