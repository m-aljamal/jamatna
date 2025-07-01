"use client";

import React from "react";
import EventCard from "@/features/events/event-card";
import { Calendar } from "lucide-react";
import { useTRPC } from "@/trpc/client";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "@/lib/InfinitScroll";
import { useQueryStates } from "nuqs";
import { searchParams } from "../filters/searchParams";

export default function EventsPList() {
  const [{ category, search }] = useQueryStates(searchParams, {
    shallow: false,
  });

  const trpc = useTRPC();
  const events = useSuspenseInfiniteQuery(
    trpc.events.getAll.infiniteQueryOptions(
      { limit: 10, category: category ?? null, search: search ?? null },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      }
    )
  );

  const data = events.data.pages.flatMap((page) => page.events);

  if (data.length === 0) {
    return <NoEventsFound />;
  }

  return (
    <section className="pb-20">
      <div className="max-w-7xl mx-auto">
        <InfiniteScroll
          onLoadMore={events.fetchNextPage}
          hasMore={events.hasNextPage}
          loading={events.isFetchingNextPage}
        >
          <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.map((event) => (
              <EventCard event={event} key={event.id} />
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </section>
  );
}

const NoEventsFound = () => {
  return (
    <div className="text-center py-12">
      <div className="text-gray-400 mb-4">
        <Calendar className="h-10 w-10 mx-auto" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        No events found
      </h3>
      <p className="text-gray-600 dark:text-gray-400">
        Try adjusting your search or filter criteria.
      </p>
    </div>
  );
};
