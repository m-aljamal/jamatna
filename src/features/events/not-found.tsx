import { Calendar } from "lucide-react";

export const NoEventsFound = () => {
  return (
    <div className="text-center py-12">
      <div className="text-gray-400 mb-4">
        <Calendar className="h-10 w-10 mx-auto" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        No events found
      </h3>
      <p className="text-gray-600 dark:text-gray-400">
        Try adjusting your search or filter criteria.
      </p>
    </div>
  );
};
