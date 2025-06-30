import { db } from "@/db";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { eventTable } from "./models";
import { z } from "zod";
import { DEFAULT_DATA_LIMIT } from "@/lib/constants";
import { categoryTable } from "../category/models";
import { desc, eq, ilike } from "drizzle-orm";
import { searchParamsCache } from "@/features/filters/searchParams";

export const eventRouter = createTRPCRouter({
  getAll: baseProcedure
    .input(
      z.object({
        limit: z.number().optional(),
        cursor: z.number().optional(),
      })
    )
    .query(async ({ input }) => {
      const limit = input?.limit ?? DEFAULT_DATA_LIMIT;
      const cursor = input?.cursor ?? 0;
      // const { category } = searchParamsCache.all();

      const events = await db
        .select()
        .from(eventTable)
        // .where(
        //   category ? ilike(categoryTable.name, `%${category}%`) : undefined
        // )
        .limit(limit)
        .orderBy(desc(eventTable.startDate), desc(eventTable.id))
        // .leftJoin(categoryTable, eq(categoryTable.id, eventTable.categoryId))
        .offset(cursor);

        const ids = events.map((event) => event.id);
        console.log(`Fetched ${events.length} events with IDs: ${ids.join(", ")} and category: ${"category"}`);
        

      return {
        events,
        nextCursor: events.length === limit ? cursor + limit : undefined,
      };
    }),
});
