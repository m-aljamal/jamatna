
import { db } from "@/db";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { categoryTable } from "./models";
export const categoryRouter = createTRPCRouter({
    getAll: baseProcedure.query(async ()=>{
        const categories = await db.select().from(categoryTable)
        return categories;
    })
})