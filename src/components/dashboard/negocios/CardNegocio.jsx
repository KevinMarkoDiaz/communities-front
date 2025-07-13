export default function CardNegocio({ negocio, onSelect }) {
  const imagenUrl =
    negocio.featuredImage ||
    `https://cdn.usegalileo.ai/sdxl10/${negocio._id || "default"}.png`;

  return (
    <div
      onClick={() => onSelect(negocio)}
      className="
        group relative bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden border border-gray-200 min-h-[10rem] flex flex-col cursor-pointer
      "
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
      <div className="flex flex-col gap-2 p-2 md:p-4 flex-grow">
        {/* Nombre */}
        <h3
          className="
            text-sm font-semibold text-gray-700
            min-h-[2rem]
            flex items-start md:items-center
          "
        >
          {negocio.name}
        </h3>

        {/* Categoría */}
        {negocio.category && (
          <span className="text-[0.65rem] font-medium py-0.5 rounded bg-white text-gray-500 w-fit">
            {negocio.category.name}
          </span>
        )}
      </div>
    </div>
  );
}
