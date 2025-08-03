export default function CardResultadoCuadrada({
  title,
  image,
  tipo,
  className = "",
}) {
  return (
    <div
      className={`rounded-2xl w-[160px] shadow-sm overflow-hidden bg-white group hover:shadow-xl transition-all duration-200 border border-gray-200
        flex flex-col aspect-square ${className}`}
    >
      {/* Imagen */}
      <div className="w-full h-2/3 bg-gray-100 relative">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="object-cover w-full h-full transition group-hover:scale-105"
        />
      </div>

      {/* Contenido */}
      <div className="p-2 flex flex-col justify-between h-1/3">
        <h3 className="text-sm font-medium text-gray-900 line-clamp-2 leading-tight truncate">
          {title}
        </h3>
        <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-wide">
          {tipo}
        </p>
      </div>
    </div>
  );
}
