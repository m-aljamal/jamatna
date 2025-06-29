"use client";

import React from "react";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";

export default function CategoriesList() {
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(
    null
  );
  const trpc = useTRPC();
  const categories = useSuspenseQuery(trpc.categories.getAll.queryOptions());

  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {categories.data.map((category) => (
        <Button
          key={category.id}
          variant={selectedCategory === category.id ? "default" : "outline"}
          onClick={() => setSelectedCategory(category.id)}
          className={`rounded-full px-6 py-2 transition-all ${
            selectedCategory === category.id
              ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg"
              : "hover:bg-emerald-50 dark:hover:bg-emerald-950 hover:border-emerald-300 dark:hover:border-emerald-700"
          }`}
        >
          {category.name}
        </Button>
      ))}
    </div>
  );
}
