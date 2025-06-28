import React from "react";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import EventsFilters from "./events-filters";
import EventsList from "./events-list";

export default function EventsSection() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 pb-20">
      <div className="max-w-7xl mx-auto">
        <EventsFilters />

        <ErrorBoundary fallback={<div>Error loading events</div>}>
          <Suspense fallback={<div>Loading events...</div>}>
            <EventsList />
          </Suspense>
        </ErrorBoundary>
      </div>
    </section>
  );
}
