export default function CardComunidad({ comunidad, onSelect }) {
  const {
    _id,
    name = "Nombre comunidad",
    flagImage,
    bannerImage,
    language = "es",
  } = comunidad;

  const imagenUrl =
    bannerImage ||
    flagImage ||
    `https://cdn.usegalileo.ai/sdxl10/${_id || "default"}.png`;

  return (
    <div
      onClick={() => onSelect(comunidad)}
      className="
        group relative bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden border border-gray-200 min-h-[10rem] flex flex-col cursor-pointer
      "
    >
      {/* Imagen */}
      <div className="w-full h-28 overflow-hidden bg-gray-50">
        <img
          src={imagenUrl}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Contenido */}
      <div className="flex flex-col gap-2 p-2 h-[3.2rem] flex-grow">
        {/* Nombre */}
        <h3
          className="
            text-sm font-semibold text-gray-700
            
            flex items-start md:items-center
          "
        >
          {name}
        </h3>
      </div>
    </div>
  );
}
