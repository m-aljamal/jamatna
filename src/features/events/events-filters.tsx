import { Badge } from "@/components/ui/badge";
import { SlidersHorizontal } from "lucide-react";
import React from "react";

export default function EventFilters() {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center space-x-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {/* {selectedCategory === "all"
              ? "All Events"
              : categories.find((c) => c.id === selectedCategory)?.name} */}
          All
        </h2>
        <Badge variant="secondary" className="text-sm">
          {8} events
        </Badge>
      </div>

      <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
        <SlidersHorizontal className="h-5 w-5" />
        <span className="text-sm">Filtered & Sorted</span>
      </div>
    </div>
  );
}
