import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Filter } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function EventsDetails() {
  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <Link
            href="/"
            className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Discover{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Events
            </span>
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Explore thousands of events happening around you
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {/* {category === "all"
                    ? "All Events"
                    : categories.find((c) => c.id === selectedCategory)?.name} */}
          </h2>
          <Badge variant="secondary" className="text-sm">
            {4} events
            {/* {sortedEvents.length} events */}
          </Badge>
        </div>

        <div className="hidden sm:flex items-center space-x-2 text-gray-600 dark:text-gray-400">
          <Filter className="h-4 w-4" />
          <span className="text-sm">
            {/* {hasActiveFilters ? "Filtered & Sorted" : "All Events"} */}
            {true ? "Filtered & Sorted" : "All Events"}
          </span>
        </div>
      </div>
    </>
  );
}
