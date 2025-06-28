import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { categoryTable, eventTable } from "./schema";
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

  await db.delete(eventTable);

  const eventObject = {
    categoryId: categoriesInDB[0].id,
    slug: "React-Next-Developers-Meetup",
    title: "React & Next.js Developers Meetup",
    description:
      "Join us for an evening of learning about the latest in React and Next.js development.",
    fullDescription:
      "Join us for an evening of learning about the latest in React and Next.js development. We'll have talks from industry experts and networking opportunities. This event is perfect for developers looking to enhance their skills and network with like-minded individuals.",
    startDate: new Date("2024-02-15T18:00:00Z"),
    endDate: new Date("2024-02-15T21:00:00Z"),
    location: "Tech Hub, Downtown",
    image: "/placeholder.svg?height=200&width=400",
    startTime: "18:00",
    endTime: "21:00",
    maxMembers: 100,
    price: 0,
  };

  const events: Omit<Event, "id" | "createdAt" | "updatedAt">[] = [
    {
      categoryId: categoriesInDB[0].id,
      slug: "React-Next-Developers-Meetup",
      title: "React & Next.js Developers Meetup",
      description:
        "Join us for an evening of learning about the latest in React and Next.js development.",
      fullDescription:
        "Join us for an evening of learning about the latest in React and Next.js development. We'll have talks from industry experts and networking opportunities. This event is perfect for developers looking to enhance their skills and network with like-minded individuals.",
      startDate: new Date("2024-02-15T18:00:00Z"),
      endDate: new Date("2024-02-15T21:00:00Z"),
      location: "Tech Hub, Downtown",
      image: "/placeholder.svg?height=200&width=400",
      startTime: "18:00",
      endTime: "21:00",
      maxMembers: 100,
      price: 0,
    },
    {
      categoryId: categoriesInDB[0].id,
      slug: "startup-pitch-night",
      title: "Startup Pitch Night",
      description:
        "Watch innovative startups pitch their ideas to investors and fellow entrepreneurs. Great networking event for the business community.",
      fullDescription:
        "Join us for an evening of learning about the latest in React and Next.js development. We'll have talks from industry experts and networking opportunities. This event is perfect for developers looking to enhance their skills and network with like-minded individuals.",
      startDate: new Date("2024-02-18T18:00:00Z"),
      endDate: new Date("2024-02-19T21:00:00Z"),
      location: "Central Park",
      image: "/placeholder.svg?height=200&width=400",
      startTime: "18:00",
      endTime: "21:00",
      maxMembers: 28,
      price: 10,
    },
    ...Array(30).fill(eventObject),
  ];

  await db.insert(eventTable).values(events);
}

main();
