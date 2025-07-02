import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQueryStates } from "nuqs";
import { searchParams, sortOptions } from "./searchParams";
export default function Sort() {
  const [filters, setFilters] = useQueryStates(searchParams, {
    shallow: false,
  });
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
        Sort By
      </h3>
      <Select
        value={filters.sort}
        onValueChange={(value) =>
          setFilters({ sort: value as (typeof sortOptions)[number] })
        }
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Sort events by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="date">Date</SelectItem>
          <SelectItem value="latest">Latest</SelectItem>
          <SelectItem value="price">Price</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
