export default function SkeletonNegocioCard() {
  return (
    <div className="animate-pulse bg-gray-100 rounded-xl w-full h-[240px] flex flex-col overflow-hidden">
      <div className="bg-gray-300 h-[170px] w-full" />
      <div className="flex-1 flex flex-col gap-2 p-4">
        <div className="h-4 bg-gray-300 rounded w-3/4" />

        <div className="h-3 bg-gray-200 rounded w-2/3 mt-auto" />
      </div>
    </div>
  );
}
