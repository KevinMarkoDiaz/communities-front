export default function DetalleSkeleton() {
  return (
    <div className="w-full animate-pulse flex flex-col gap-16">
      {/* Imagen destacada */}
      <div className="w-full h-56 sm:h-72 bg-gray-200 rounded-xs" />

      {/* Encabezado */}
      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <div className="h-6 bg-gray-300 rounded w-2/3" />
          <div className="h-4 bg-gray-300 rounded w-16" />
        </div>
        <div className="h-4 bg-gray-200 rounded w-1/2" />
        <div className="h-4 bg-gray-200 rounded w-1/4" />
        <div className="h-3 bg-gray-100 rounded w-1/3" />
      </div>

      {/* Botones */}
      <div className="flex flex-col gap-3">
        <div className="h-8 bg-gray-300 rounded w-40" />
        <div className="h-8 bg-gray-200 rounded w-48" />
        <div className="h-8 bg-gray-200 rounded w-32" />
      </div>

      <hr className="border-t border-gray-200" />

      {/* Descripción */}
      <div className="border-l-4 border-gray-200 pl-4 space-y-2">
        <div className="h-3 bg-gray-200 rounded w-full" />
        <div className="h-3 bg-gray-200 rounded w-5/6" />
        <div className="h-3 bg-gray-200 rounded w-4/6" />
        <div className="h-3 bg-gray-200 rounded w-2/3" />
        <div className="h-3 bg-gray-200 rounded w-3/4" />
      </div>

      {/* Galería */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="w-full h-40 bg-gray-200 rounded-xl" />
        ))}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-6 bg-gray-200 rounded-full w-20" />
        ))}
      </div>

      <hr className="border-t border-gray-200" />

      {/* Sponsors */}
      <div className="space-y-2">
        <div className="h-5 bg-gray-300 rounded w-32" />
        <div className="flex gap-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col items-center space-y-1 w-24">
              <div className="w-20 h-20 bg-gray-200 rounded-xl" />
              <div className="h-3 bg-gray-200 rounded w-3/4" />
            </div>
          ))}
        </div>
      </div>

      {/* Comunidades */}
      <div className="space-y-2">
        <div className="h-5 bg-gray-300 rounded w-48" />
        <div className="flex gap-2 flex-wrap">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-3 py-1 bg-gray-200 rounded-full w-36 h-8"
            />
          ))}
        </div>
      </div>

      <hr className="border-t border-gray-200" />

      {/* Mapa */}
      <div className="w-full h-64 bg-gray-200 rounded-xl" />
    </div>
  );
}
