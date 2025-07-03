"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import EventCard from "./event-card";
import { NoEventsFound } from "./not-found";

export default function LatestEvents() {
  const trpc = useTRPC();
  const events = useSuspenseQuery(trpc.events.getLatest.queryOptions());

  if (events.data.length === 0) {
    return <NoEventsFound />;
  }

  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {events.data.map((event) => (
            <EventCard event={event} key={event.id} />
          ))}
        </div>
      </div>
    </section>
  );
}
