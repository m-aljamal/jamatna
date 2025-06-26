import {
  pgTable,
  text,
  timestamp,
  varchar,
  time,
  integer,
} from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";
import { categoryTable } from "../category/models";

export const eventTable = pgTable("event", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid()),
  slug: varchar("slug", { length: 255 }).notNull(),
  categoryId: text("category_id")
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
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
