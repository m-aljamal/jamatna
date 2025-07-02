"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useQueryStates } from "nuqs";
import React from "react";
import { searchParams } from "./searchParams";

export default function CategoryFilter() {
  const [selectedCategory, setSelectedCategory] = useQueryStates(searchParams, {
    shallow: false,
  });

  const trpc = useTRPC();
  const categories = useSuspenseQuery(trpc.categories.getAll.queryOptions());

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Categories
        </h3>
        {selectedCategory.category  && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedCategory({ category: "" })}
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
            variant={
              selectedCategory.category === category.name ? "default" : "ghost"
            }
            onClick={() => setSelectedCategory({ category: category.name })}
            className={`w-full justify-start text-left h-auto py-3 px-3 ${
              selectedCategory.category === category.name
                ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white"
                : "hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            <div className="flex items-center justify-between w-full">
              <span>{category.name}</span>
              {selectedCategory.category === category.name && (
                <Badge variant="secondary" className="bg-white/20 text-white">
                  Active
                </Badge>
              )}
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
}
