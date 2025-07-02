"use client";

import { useQueryStates } from "nuqs";
import { searchParams, priceOptions } from "./searchParams";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function PriceFilter() {
  const [filters, setFilters] = useQueryStates(searchParams, {
    shallow: false,
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Price
        </h3>
        {filters.price && filters.price !== "all" && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setFilters({ price: "all" })}
            className="text-xs"
          >
            Clear
          </Button>
        )}
      </div>
      <Select
        value={filters.price ?? "all"}
        onValueChange={(value) =>
          setFilters({ price: value as (typeof priceOptions)[number] })
        }
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select price range" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="free">Free Events</SelectItem>
          <SelectItem value="paid">Paid Events</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
