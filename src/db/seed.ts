import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { categoryTable, eventTable } from "./schema";
import { faker } from "@faker-js/faker";

const db = drizzle(process.env.DATABASE_URL!);

async function main() {
  const categories = [
    { name: "Technology" },
    { name: "Health" },
    { name: "Finance" },
    { name: "Education" },
  ];

  const categoriesInDB = await db.select().from(categoryTable);

  if (categoriesInDB.length === 0) {
    await db.insert(categoryTable).values(categories);
    console.log("New categories added to the database!");
  }

  // Get the latest categories after inserting (if needed)
  const allCategories = await db.select().from(categoryTable);

  await generateRandomEvents(allCategories, 100);
  console.log("Finished seeding successfully!");
}

main().catch((err) => console.error("Error seeding database:", err));

async function generateRandomEvents(
  categories: { id: number; name: string }[],
  count: number
) {
  const existingEvents = await db.select().from(eventTable);
  if (existingEvents.length > 0) {
    await db.delete(eventTable);
    console.log("Existing events deleted.");
  }

  if (categories.length === 0) {
    console.error("No categories provided.");
    return;
  }

  const events = [];
  for (let i = 0; i < count; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];

    const startDate = faker.date.soon();
    const endDate = faker.date.soon({ days: 5, refDate: startDate });

    const startTimeObj = faker.date.between({
      from: new Date(startDate.setHours(8, 0, 0, 0)), // starting from 8:00 AM
      to: new Date(startDate.setHours(15, 0, 0, 0)), // up to 3:00 PM
    });

    const endTimeObj = faker.date.between({
      from: new Date(startTimeObj.getTime() + 30 * 60 * 1000), // at least 30 mins after start
      to: new Date(startDate.setHours(23, 0, 0, 0)), // up to 11:00 PM
    });

    events.push({
      categoryId: category.id,
      slug: faker.lorem.slug(),
      title: faker.lorem.sentence(5),
      description: faker.lorem.paragraph(3),
      fullDescription: faker.lorem.paragraphs(5),
      startDate: startDate,
      endDate: endDate,
      location: faker.location.streetAddress(),
      image: faker.image.url(),
      startTime: startTimeObj.toISOString().substring(11, 16), // "HH:MM"
      endTime: endTimeObj.toISOString().substring(11, 16), // "HH:MM"
      maxMembers: faker.number.int({ min: 10, max: 100 }),
      price: faker.number.int({ min: 0, max: 100 }),
    });
  }

  await db.insert(eventTable).values(events);
  console.log(`${count} random events generated.`);
}
