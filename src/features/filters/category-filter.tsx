"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useQueryState } from "nuqs";
import React from "react";

export default function CategoryFilter() {
  const [selectedCategory, setSelectedCategory] = useQueryState("category", {
    shallow: false,
  });

  const trpc = useTRPC();
  const categories = useSuspenseQuery(trpc.categories.getAll.queryOptions());

  return (
    <Select
      value={selectedCategory || "all"}
      onValueChange={setSelectedCategory}
    >
      <SelectTrigger>
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Categories</SelectItem>
        {categories.data.map((category) => (
          <SelectItem key={category.id} value={category.name.toLowerCase()}>
            {category.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
