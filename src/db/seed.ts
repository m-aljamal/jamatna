import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { categoryTable } from "./schema";
import { Event } from "./types";

const db = drizzle(process.env.DATABASE_URL!);

async function main() {
  const categories = [
    {
      name: "Technology",
    },
    {
      name: "Health",
    },
    {
      name: "Finance",
    },
    {
      name: "Education",
    },
  ];

  const categoriesInDB = await db.select().from(categoryTable);

  if (categoriesInDB.length > 0) {
    await db.insert(categoryTable).values(categories);
    console.log("New  categories added to the database!");
  }

  const events:Event[] = [
    {
   
    }
  ]

 
}

main();
