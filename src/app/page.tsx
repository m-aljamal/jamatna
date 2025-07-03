import Categories from "@/components/Categories";
import { Header } from "@/components/Header";
import Hero from "@/components/Hero";
import LatestEvents from "@/features/events/latest-events";
import { auth } from "@/lib/auth";
import { HydrateClient, prefetch, trpc } from "@/trpc/server";
import { headers } from "next/headers";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

prefetch(trpc.categories.getAll.queryOptions());

prefetch(trpc.events.getLatest.queryOptions());
export default async function HomePage() {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });
  console.log(session)
  
  return (
    <HydrateClient>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 transition-colors">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8"></div>
          <Hero />
          <ErrorBoundary fallback={<div>error</div>}>
            <Suspense fallback={<div>Loading categories...</div>}>
              <Categories />
            </Suspense>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Latest Events
            </h2>
            <Suspense fallback={<div>Loading events...</div>}>
              <LatestEvents />
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>
    </HydrateClient>
  );
}
