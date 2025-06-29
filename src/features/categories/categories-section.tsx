import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import CategoriesList from "./categories-list";

export default function CategoriesSection() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 mb-12">
      <div className="max-w-7xl mx-auto">
        <ErrorBoundary fallback={<div>Error loading events</div>}>
          <Suspense fallback={<div>Loading events...</div>}>
            <CategoriesList />
          </Suspense>
        </ErrorBoundary>
      </div>
    </section>
  );
}
