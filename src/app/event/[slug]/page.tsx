import EventContent from "@/features/events/event-content";
import EventSkeleton from "@/features/events/skeleton";
import { HydrateClient, prefetch, trpc } from "@/trpc/server";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface EventPageProps {
  params: Promise<{ slug: string }>;
}

export default async function EventPage({ params }: EventPageProps) {
  const { slug } = await params;

  prefetch(trpc.events.getBySlug.queryOptions({ slug }));

  return (
    <HydrateClient>
      <ErrorBoundary fallback={<div>Error loading event</div>}>
        <Suspense fallback={<EventSkeleton />}>
          <EventContent />
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  );
}
