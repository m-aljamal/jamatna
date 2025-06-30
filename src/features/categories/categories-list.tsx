"use client";

import React from "react";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { useQueryState } from "nuqs";

export default function CategoriesList() {
  const [selectedCategory, setSelectedCategory] = useQueryState("category", {
    shallow: false,
  });

  const trpc = useTRPC();
  const categories = useSuspenseQuery(trpc.categories.getAll.queryOptions());
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {categories.data.map((category) => {
        const isSlected = selectedCategory === category.name.toLowerCase();
        return (
          <Button
            key={category.id}
            variant={isSlected ? "default" : "outline"}
            onClick={() => setSelectedCategory(category.name.toLowerCase())}
            className={`rounded-full px-6 py-2 transition-all ${
              isSlected
                ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg"
                : "hover:bg-emerald-50 dark:hover:bg-emerald-950 hover:border-emerald-300 dark:hover:border-emerald-700"
            }`}
          >
            {category.name}
          </Button>
        );
      })}
    </div>
  );
}
