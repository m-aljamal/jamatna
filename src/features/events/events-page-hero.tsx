"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React, { Suspense } from "react";
import CategoriesSection from "../categories/categories-section";
import FiltersContainer from "../filters/filters-container";
import SearchFilter from "../filters/search-filter";
import CategoryFilter from "../filters/category-filter";

export default function EventsPageHero() {
  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <HeroDetails />
        {/* Search and Filters */}
        <FiltersContainer>
          <SearchFilter />
          <Suspense fallback={<div>Loading categories...</div>}>
            <CategoryFilter />
          </Suspense>
        </FiltersContainer>

        {/* Price Filter */}
        <Select
        //   value={priceFilter} onValueChange={setPriceFilter}
        >
          <SelectTrigger>
            <SelectValue placeholder="Price" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Prices</SelectItem>
            <SelectItem value="free">Free Events</SelectItem>
            <SelectItem value="paid">Paid Events</SelectItem>
          </SelectContent>
        </Select>

        {/* Sort */}
        <Select
        //    value={sortBy} onValueChange={setSortBy}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date">Date</SelectItem>
            <SelectItem value="popularity">Popularity</SelectItem>
            <SelectItem value="price">Price</SelectItem>
          </SelectContent>
        </Select>

        {/* Categories Pills */}
        <CategoriesSection />
      </div>
    </section>
  );
}

const HeroDetails = () => {
  return (
    <div className="text-center mb-12">
      <Link
        href="/"
        className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Home
      </Link>

      <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
        Discover{" "}
        <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
          Events
        </span>
      </h1>
      <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
        Explore thousands of events happening around you. From tech meetups to
        art exhibitions, find your next adventure.
      </p>
    </div>
  );
};
