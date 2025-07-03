"use client";

import React from "react";
import { Button } from "./ui/button";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export default function Categories() {
  const trpc = useTRPC();
  const categories = useQuery(trpc.categories.getAll.queryOptions());
  if (!categories.data) {
    return <div>Loading categories...</div>;
  }
  return (
    <section className="px-4 sm:px-6 lg:px-8 mb-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap gap-3 justify-center">
          {categories.data.map((category) => (
            <Button
              asChild
              key={category.id}
              variant={"outline"}
              className={`rounded-full px-6 py-2 transition-all ${"hover:bg-emerald-50 dark:hover:bg-emerald-950 hover:border-emerald-300 dark:hover:border-emerald-700"}`}
            >
              <Link href={`/events?category=${category.name}`}>
                {category.name}
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}
