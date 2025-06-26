import { createTRPCRouter } from "../init";
import { categoryRouter } from "@/server/features/category/router";
export const appRouter = createTRPCRouter({
  categories: categoryRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
