"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Search, X } from "lucide-react";
import { useQueryState } from "nuqs";

const Filters = () => {
  const [selectedCategory, setSelectedCategory] = useQueryState("category", {
    shallow: false,
  });

  const [priceFilter, setPriceFilter] = useQueryState("price", {
    shallow: false,
  });

  const [sortBy, setSortBy] = useQueryState("sort", {
    shallow: false,
  });

  const trpc = useTRPC();
  const categories = useSuspenseQuery(trpc.categories.getAll.queryOptions());

  const onClearFilters = () => {
    setSelectedCategory("all");
    setPriceFilter("all");
    setSortBy("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          Search
        </h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            type="text"
            placeholder="Search events..."
            // value={searchQuery}
            // onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 border-gray-200 dark:border-gray-700 focus:border-emerald-500 focus:ring-emerald-500"
          />
        </div>
      </div>

      <Separator />

      {/* Categories */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Categories
          </h3>
          {selectedCategory !== "all" && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedCategory("all")}
              className="text-xs"
            >
              Clear
            </Button>
          )}
        </div>
        <div className="space-y-2">
          {categories.data.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.name ? "default" : "ghost"}
              onClick={() => setSelectedCategory(category.name)}
              className={`w-full justify-start text-left h-auto py-3 px-3 ${
                selectedCategory === category.name
                  ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span>{category.name}</span>
                {selectedCategory === category.name && (
                  <Badge variant="secondary" className="bg-white/20 text-white">
                    Active
                  </Badge>
                )}
              </div>
            </Button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Price Filter */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Price
          </h3>
          {priceFilter !== "all" && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setPriceFilter("all")}
              className="text-xs"
            >
              Clear
            </Button>
          )}
        </div>
        <Select value={priceFilter || ""} onValueChange={setPriceFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Select price range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Prices</SelectItem>
            <SelectItem value="free">Free Events</SelectItem>
            <SelectItem value="paid">Paid Events</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Separator />

      {/* Sort */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          Sort By
        </h3>
        <Select value={sortBy || ""} onValueChange={setSortBy}>
          <SelectTrigger>
            <SelectValue placeholder="Sort events by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date">Date</SelectItem>
            <SelectItem value="popularity">Popularity</SelectItem>
            <SelectItem value="price">Price</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Separator />

      {/* Clear All Filters */}
      <Button
        variant="outline"
        onClick={onClearFilters}
        className="w-full bg-transparent"
      >
        <X className="h-4 w-4 mr-2" />
        Clear All Filters
      </Button>
    </div>
  );
};

export function FilterSidebar() {
  return (
    <aside className="hidden lg:block w-70 flex-shrink-0">
      <div className="sticky top-24 ">
        <Card className="p-6 shadow-xl bg-white dark:bg-slate-800 border-0">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Filters
            </h2>
            {true && (
              <Badge
                variant="secondary"
                className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200"
              >
                Active
              </Badge>
            )}
          </div>
          <Filters />
        </Card>
      </div>
    </aside>
  );
}
