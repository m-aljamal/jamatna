import { Header } from "@/components/Header";
import EventsDetails from "@/features/events/events-details";
import EventList from "@/features/events/events-list";
import { FilterSidebar } from "@/features/filters/filterSidebar";
import { searchParamsCache } from "@/features/filters/searchParams";
import { HydrateClient, prefetch, trpc } from "@/trpc/server";
import { SearchParams } from "nuqs/server";

type PageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function EventsPage({ searchParams }: PageProps) {
  await searchParamsCache.parse(searchParams);

  const { category, search } = searchParamsCache.all();

  prefetch(
    trpc.events.getAll.infiniteQueryOptions({
      category: category ?? null,
      search: search ?? null,
      limit: 10,
    })
  );
  prefetch(trpc.categories.getAll.queryOptions());

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 transition-colors">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <HydrateClient>
            <FilterSidebar />

            <main className="flex-1 min-w-0">
              <EventsDetails />
              <EventList />
            </main>
          </HydrateClient>
        </div>
      </div>
    </div>
  );
}
