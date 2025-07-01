"use client";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useQueryState } from "nuqs";
import React from "react";

export default function SearchFilter() {
  const [searchQuery, setSearchQuery] = useQueryState("search", {
    shallow: false,
  });
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
      <Input
        type="text"
        placeholder="Search events..."
        value={searchQuery || ""}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pl-10 border-gray-200 dark:border-gray-700 focus:border-emerald-500 focus:ring-emerald-500"
      />
    </div>
  );
}
