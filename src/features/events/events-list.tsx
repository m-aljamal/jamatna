"use client";

import React from "react";
import EventCard from "@/features/events/event-card";
import { useTRPC } from "@/trpc/client";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "@/lib/InfinitScroll";
import { useQueryStates } from "nuqs";
import { searchParams } from "../filters/searchParams";
import { NoEventsFound } from "./not-found";

export default function EventList() {
  const [{ category, search, price, sort }] = useQueryStates(searchParams, {
    shallow: false,
  });

  const trpc = useTRPC();
  const events = useSuspenseInfiniteQuery(
    trpc.events.getAll.infiniteQueryOptions(
      {
        limit: 10,
        category: category ?? null,
        search: search ?? null,
        price,
        sortBy: sort,
      },
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
          <div className=" grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {data.map((event) => (
              <EventCard event={event} key={event.id} />
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </section>
  );
}
