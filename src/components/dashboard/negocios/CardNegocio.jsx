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
      <div className="flex flex-col justify-between h-[5rem]  p-2 xl:p-3 flex-grow">
        {/* Nombre */}
        <h3
          className="
     text-xs font-semibold text-gray-700
    line-clamp-2 leading-snug  overflow-hidden
  "
        >
          {negocio.name}
        </h3>

        {/* Categoría */}
        {Array.isArray(negocio.categories) && negocio.categories.length > 0 ? (
          negocio.categories.map((cat) => (
            <span
              key={cat._id}
              className="text-[0.65rem] font-medium rounded bg-white text-gray-500 w-fit mr-1 px-2 py-0.5"
            >
              {cat.name}
            </span>
          ))
        ) : (
          <span className="text-[0.65rem] font-medium rounded bg-white text-gray-400 w-fit px-2 py-0.5">
            Sin categoría
          </span>
        )}
      </div>
    </div>
  );
}
