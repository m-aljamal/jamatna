"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { X } from "lucide-react";
import { useQueryStates } from "nuqs";
import CategoryFilter from "./category-filter";
import PriceFilter from "./price-filter";
import SearchFilter from "./search-filter";
import { searchParams } from "./searchParams";
import Sort from "./sort";

export const FilterSidebar = () => {
  const [{ category, price, search, sort }, setFilters] = useQueryStates(
    searchParams,
    {
      shallow: false,
    }
  );

  const onClearFilters = () => {
    setFilters({
      category: "",
      price: "all",
      search: "",
      sort: "date",
    });
  };
  const isActive = category || price !== "all" || sort !== "date" || search;
  return (
    <aside className="hidden lg:block w-70 flex-shrink-0">
      <div className="sticky top-24 ">
        <Card className="p-6 shadow-xl bg-white dark:bg-slate-800 border-0">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Filters
            </h2>
            {isActive && (
              <Badge
                variant="secondary"
                className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200"
              >
                Active
              </Badge>
            )}
          </div>

          <div className="space-y-6">
            <SearchFilter />

            <Separator />

            <CategoryFilter />

            <Separator />

            <PriceFilter />

            <Separator />

            <Sort />

            <Separator />

            <Button
              variant="outline"
              onClick={onClearFilters}
              className="w-full bg-transparent"
            >
              <X className="h-4 w-4 mr-2" />
              Clear All Filters
            </Button>
          </div>
        </Card>
      </div>
    </aside>
  );
};
