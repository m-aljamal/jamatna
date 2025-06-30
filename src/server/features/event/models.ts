import {
  pgTable,
  text,
  timestamp,
  varchar,
  time,
  integer,
  serial,
} from "drizzle-orm/pg-core";
import { categoryTable } from "../category/models";

export const eventTable = pgTable("event", {
  id: serial('id').primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull(),
  categoryId: serial("category_id")
    .notNull()
    .references(() => categoryTable.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  fullDescription: text("full_description").notNull(),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  location: varchar("location", { length: 255 }).notNull(),
  image: varchar("image").notNull(),
  startTime: time("start_time").notNull(),
  endTime: time("end_time").notNull(),
  maxMembers: integer("max_members").notNull(),
  price: integer("price").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
