import { relations } from "drizzle-orm";
import { categoryTable, eventTable } from "./schema";

export const eventsRelations = relations(eventTable, ({ one }) => ({
  category: one(categoryTable, {
    fields: [eventTable.categoryId],
    references: [categoryTable.id],
  }),
}));

export const categoriesRelations = relations(categoryTable, ({ many }) => ({
  events: many(eventTable),
}));