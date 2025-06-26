"use client"

import { Calendar, Filter } from "lucide-react";
import React from "react";
import EventCard from "./EventCard";

export default function EventList({
  events,
  categories,
}: {
  events: {
    id: string;
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    members: number;
    maxMembers: number;
    price: string;
    category: string;
    image?: string;
    slug: string;
    organizer: {
      name: string;
      avatar?: string;
    };
  }[];
  categories: { id: string; name: string; color?: string }[];
}) {
  const [selectedCategory, setSelectedCategory] = React.useState("all");
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredEvents = events.filter((event) => {
    const matchesCategory =
      selectedCategory === "all" || event.category === selectedCategory;
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="px-4 sm:px-6 lg:px-8 pb-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            {selectedCategory === "all"
              ? "All Events"
              : categories.find((c) => c.id === selectedCategory)?.name}
          </h2>
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <span className="text-gray-600 dark:text-gray-400">
              {filteredEvents.length} events found
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} categories={categories} />
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Calendar className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No events found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search or category filter.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
