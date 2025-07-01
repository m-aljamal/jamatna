import { Event } from "@/db/types";

export interface EventWithDetails extends Event {
  categoryName: string | null;
}
