const StatisticsSkeleton = () => {
  return (
    <div role="status" className="w-1/2 animate-pulse rounded-lg border-4 p-4">
      <div className="mb-4 h-2.5 w-3/4 rounded-full bg-gray-200 dark:bg-gray-700"></div>
      <div className="mb-2.5 h-2 w-1/2 rounded-full bg-gray-200 dark:bg-gray-700"></div>

      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default StatisticsSkeleton;
