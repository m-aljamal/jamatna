"use client";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useQueryStates } from "nuqs";
import React from "react";
import { searchParams } from "./searchParams";

export default function SearchFilter() {
  const [searchQuery, setSearchQuery] = useQueryStates(searchParams, {
    shallow: false,
  });
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
        Search
      </h3>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <Input
          type="text"
          placeholder="Search events..."
          value={searchQuery.search}
          onChange={(e) =>
            setSearchQuery(
              e.target.value ? { search: e.target.value } : { search: "" }
            )
          }
          className="pl-10 border-gray-200 dark:border-gray-700 focus:border-emerald-500 focus:ring-emerald-500"
        />
      </div>
    </div>
  );
}
