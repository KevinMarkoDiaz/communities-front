export default function CardNegocio({ negocio, onSelect }) {
  const imagenUrl =
    negocio.featuredImage ||
    `https://cdn.usegalileo.ai/sdxl10/${negocio._id || "default"}.png`;

  return (
    <div
      onClick={() => onSelect(negocio)}
      className="group relative bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden border border-gray-200 flex flex-col cursor-pointer h-40"
    >
      {/* Imagen destacada */}
      <div className="w-full h-28 overflow-hidden bg-gray-50">
        <img
          src={imagenUrl}
          alt={negocio.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Contenido */}
      <div className="flex flex-col justify-between gap-2 p-2 xl:p-3 flex-grow">
        {/* Nombre */}
        <h3
          className="
    text-sm font-semibold text-gray-700
    line-clamp-2 leading-snug  overflow-hidden
  "
        >
          {negocio.name}
        </h3>

        {/* Categoría */}
        {negocio.category && (
          <span className="text-[0.65rem] font-medium  rounded bg-white text-gray-500 w-fit">
            {negocio.category.name}
          </span>
        )}
      </div>
    </div>
  );
}
