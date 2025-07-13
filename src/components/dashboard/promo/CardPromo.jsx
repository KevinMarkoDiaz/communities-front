export default function CardPromo({ promo, onSelect }) {
  const { _id, name, featuredImage, type } = promo;

  const imagenUrl =
    featuredImage || "https://cdn.usegalileo.ai/sdxl10/placeholder.png";

  return (
    <div
      onClick={() => onSelect(promo)}
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

      <div className="flex flex-col gap-2 p-2 md:p-4 flex-grow">
        {/* Nombre */}
        <h3
          className="
            text-sm font-semibold text-gray-700
            min-h-[2rem]
            flex items-start md:items-center
          "
        >
          {name}
        </h3>

        {/* Tipo */}
        {type && (
          <span className="text-[0.65rem] font-medium py-0.5 rounded bg-white text-gray-500 w-fit capitalize">
            {type.replace(/_/g, " ")}
          </span>
        )}
      </div>
    </div>
  );
}
