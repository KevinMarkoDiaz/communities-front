export default function SkeletonDashboardList() {
  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Header */}
      <div className="w-full md:w-full lg:w-4/5 mx-auto h-112 bg-gray-100 rounded-md animate-pulse"></div>

      {/* Grid de Skeletons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:w-4/5 mx-auto">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col gap-2 bg-gray-50 border border-gray-200 rounded-xl p-4 animate-pulse"
          >
            <div className="w-full h-28 bg-gray-200 rounded-md"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:w-4/5 mx-auto">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col gap-2 bg-gray-50 border border-gray-200 rounded-xl p-4 animate-pulse"
          >
            <div className="w-full h-28 bg-gray-200 rounded-md"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:w-4/5 mx-auto">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col gap-2 bg-gray-50 border border-gray-200 rounded-xl p-4 animate-pulse"
          >
            <div className="w-full h-28 bg-gray-200 rounded-md"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
