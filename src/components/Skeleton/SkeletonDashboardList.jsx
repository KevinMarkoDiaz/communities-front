export default function SkeletonDashboardList() {
  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Header */}
      <div className="w-full h-28 sm:h-32 md:h-40 bg-gray-100 rounded-md animate-pulse"></div>

      {/* Grid de Skeletons */}
      {Array.from({ length: 2 }).map((_, rowIdx) => (
        <div
          key={rowIdx}
          className="
            grid
            grid-cols-2
            md:grid-cols-2
            lg:grid-cols-4
            gap-y-5
            gap-x-3
            md:gap-6
            xl:gap-8
            w-full
          "
        >
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col gap-2 bg-gray-50 border border-gray-200 rounded-xl p-4 animate-pulse min-h-[10rem]"
            >
              <div className="w-full h-28 sm:h-32 bg-gray-200 rounded-md"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
