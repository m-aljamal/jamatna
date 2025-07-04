import { db } from "@/db";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { eventTable } from "./models";
import { z } from "zod";
import { DEFAULT_DATA_LIMIT } from "@/lib/constants";
import { categoryTable } from "../category/models";
import { and, count, desc, eq, getTableColumns, gt, ilike } from "drizzle-orm";
import { priceOptions, sortOptions } from "@/features/filters/searchParams";

export const eventRouter = createTRPCRouter({
  getAll: baseProcedure
    .input(
      z.object({
        limit: z.number().optional(),
        cursor: z.number().optional(),
        category: z.string().nullable().optional(),
        search: z.string().nullable().optional(),
        sortBy: z.enum(sortOptions).optional(),
        price: z.enum(priceOptions).optional(),
      })
    )

    .query(async ({ input }) => {
      const limit = input?.limit ?? DEFAULT_DATA_LIMIT;
      const cursor = input?.cursor ?? 0;
      const category = input?.category ?? null;
      const search = input?.search ?? null;

      const whereClauses = [
        category ? ilike(categoryTable.name, `%${category}%`) : undefined,
        search ? ilike(eventTable.title, `%${search}%`) : undefined,
        input.price === "free" ? eq(eventTable.price, 0) : undefined,
        input.price === "paid" ? gt(eventTable.price, 0) : undefined,
      ].filter(Boolean);

      const events = await db
        .select({
          ...getTableColumns(eventTable),
          categoryName: categoryTable.name,
        })
        .from(eventTable)
        .where(and(...whereClauses))
        .orderBy(
          desc(
            input.sortBy === "date"
              ? eventTable.startDate
              : input.sortBy === "price"
              ? eventTable.price
              : eventTable.updatedAt
          ),
          desc(eventTable.id)
        )
        .leftJoin(categoryTable, eq(categoryTable.id, eventTable.categoryId))
        .limit(limit)
        .offset(cursor);

      return {
        events,
        nextCursor: events.length === limit ? cursor + limit : undefined,
      };
    }),
  getCount: baseProcedure
    .input(
      z.object({
        category: z.string().nullable().optional(),
        search: z.string().nullable().optional(),
        price: z.enum(priceOptions).optional(),
      })
    )
    .query(async ({ input }) => {
      const { category, price, search } = input;

      const whereClauses = [
        category ? ilike(categoryTable.name, `%${category}%`) : undefined,
        search ? ilike(eventTable.title, `%${search}%`) : undefined,
        price === "free" ? eq(eventTable.price, 0) : undefined,
        price === "paid" ? gt(eventTable.price, 0) : undefined,
      ].filter(Boolean);

      const [result] = await db
        .select({
          count: count(),
        })
        .from(eventTable)
        .where(and(...whereClauses))
        .leftJoin(categoryTable, eq(categoryTable.id, eventTable.categoryId));

      return result;
    }),
  getBySlug: baseProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const { slug } = input;

      const [event] = await db
        .select({
          ...getTableColumns(eventTable),
          categoryName: categoryTable.name,
        })
        .from(eventTable)
        .where(eq(eventTable.slug, slug))
        .leftJoin(categoryTable, eq(categoryTable.id, eventTable.categoryId));

      return event;
    }),
  getLatest: baseProcedure.query(async () => {
    const events = await db
      .select({
        ...getTableColumns(eventTable),
        categoryName: categoryTable.name,
      })
      .from(eventTable)
      .leftJoin(categoryTable, eq(categoryTable.id, eventTable.categoryId))
      .orderBy(desc(eventTable.createdAt))
      .limit(6);

    return events;
  }),
});
