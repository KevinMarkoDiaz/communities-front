export default function CardEvento({ evento, onSelect }) {
  const { _id, title = "Sin título", date, featuredImage } = evento;

  const imagenUrl =
    featuredImage || `https://cdn.usegalileo.ai/sdxl10/${_id || "default"}.png`;

  return (
    <div
      onClick={() => onSelect(evento)}
      className="
        group relative bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden border border-gray-200 h-50 flex flex-col cursor-pointer
      "
    >
      {/* Imagen */}
      <div className="w-full min-h-28 overflow-hidden bg-gray-50">
        <img
          src={imagenUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Contenido */}
      <div className="flex flex-col gap-2 justify-between p-2 h-[9rem] flex-grow">
        {/* Título */}
        <h3 className="text-sm font-semibold text-gray-700 line-clamp-2">
          {title}
        </h3>

        {/* Fecha */}
        <span className="text-[0.65rem] font-mediumpy-0.5 rounded bg-white text-gray-500 w-fit">
          {date ? new Date(date).toLocaleDateString() : "Sin fecha"}
        </span>
      </div>
    </div>
  );
}
