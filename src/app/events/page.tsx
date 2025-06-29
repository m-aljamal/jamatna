import { Header } from "@/components/Header";
import EventsPageHero from "@/features/events/events-page-hero";
import EventsSection from "@/features/events/events-section";
import { HydrateClient, prefetch, trpc } from "@/trpc/server";

export default function EventsPage() {
  prefetch(trpc.events.getAll.infiniteQueryOptions({}));
  prefetch(trpc.categories.getAll.queryOptions());

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 transition-colors">
      <Header />
      <HydrateClient>
        <EventsPageHero />
        <EventsSection />
      </HydrateClient>
    </div>
  );
}
