import { db } from "@/db";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { eventTable } from "./models";
import { z } from "zod";
import { DEFAULT_DATA_LIMIT } from "@/lib/constants";
import { categoryTable } from "../category/models";
import { and, desc, eq, getTableColumns, gt, ilike } from "drizzle-orm";
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
          )
        )
        .leftJoin(categoryTable, eq(categoryTable.id, eventTable.categoryId))
        .limit(limit)
        .offset(cursor);

      return {
        events,
        nextCursor: events.length === limit ? cursor + limit : undefined,
      };
    }),
});
