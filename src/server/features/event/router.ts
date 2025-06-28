import { db } from "@/db";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { eventTable } from "./models";
import { z } from "zod";
import { DEFAULT_DATA_LIMIT } from "@/lib/constants";
import { desc } from "drizzle-orm";
export const eventRouter = createTRPCRouter({
  getAll: baseProcedure
    .input(
      z.object({
        limit: z.number().optional(),
        cursor: z.number().optional(),
      })
    )
    .query(async ({ input }) => {
      const limit = input.limit ?? DEFAULT_DATA_LIMIT;
      const cursor = input.cursor ?? 0;

      const events = await db
        .select()
        .from(eventTable)
        .orderBy(desc(eventTable.startDate))
        .limit(limit)
        .offset(cursor);
      return {
        events,
        nextCursor: events.length === limit ? cursor + limit : undefined,
      };
    }),
});
