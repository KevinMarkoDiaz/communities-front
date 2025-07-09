export default function PerfilSkeleton() {
  return (
    <div className="max-w-[1200px] w-full mx-auto flex flex-col gap-6 animate-pulse">
      {/* Caja superior */}
      <div className="w-full h-40 bg-gray-100 rounded-md" />

      {/* Dos cajas lado a lado */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-[30%] h-118 bg-gray-100 rounded-md" />
        <div className="w-full md:w-[70%] h-118 bg-gray-100 rounded-md" />
      </div>

      {/* Dos cajas grandes lado a lado */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/2 h-[200px] bg-gray-100 rounded-md" />
        <div className="w-full md:w-1/2 h-[200px] bg-gray-100 rounded-md" />
      </div>
    </div>
  );
}
