export function BusinessCard({
  imageUrl,
  categoryName,
  businessName,
  businessDescription,
  highlightText,
}) {
  return (
    <div className="">
      <div className="flex flex-row items-stretch bg-white rounded-2xl shadow-lg  transition-all overflow-hidden">
        {/* Imagen cuadrada a la izquierda */}
        <div
          className="w-[30vw] md:w-40 aspect-square bg-center bg-cover bg-no-repeat shrink-0"
          style={{ backgroundImage: `url("${imageUrl}")` }}
        ></div>

        {/* Contenido */}
        <div className="flex flex-col justify-between flex-grow gap-2 px-4 py-3">
          <p className="text-xs md:  text-xs text-gray-500 font-medium">
            {categoryName}
          </p>
          <p className="  text-xs md:text-lg font-semibold text-gray-900">
            {businessName}
          </p>

          <div className="flex flex-col gap-1 text-xs text-gray-600">
            <p className="line-clamp-2">{businessDescription}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
