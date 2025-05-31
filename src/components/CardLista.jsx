export default function CardLista({
  title,
  image,
  description,
  isVerified = false,
  isNew = false,
  hasDiscount = false,
}) {
  const hasImage = Boolean(image);

  return (
    <div
      className={`w-full flex items-center
          rounded-sm border border-gray-200 bg-white
          shadow-md hover:shadow-lg transition
          px-4 py-4 gap-4 sm:gap-6`}
    >
      {/* Imagen a la izquierda */}
      <div className="flex-shrink-0">
        {hasImage ? (
          <div
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-sm bg-cover bg-center"
            style={{
              backgroundImage: `url("${image}")`,
              marginRight: "1rem", // 16px
            }}
          />
        ) : (
          <div
            className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 flex items-center justify-center rounded-md"
            style={{ marginRight: "1rem" }}
          >
            <svg
              className="w-6 h-6 text-gray-300"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10
                    10-4.48 10-10S17.52 2 12 2zm0 18c-1.85 0-3.55-.63-4.9-1.69.01-2.5 3.27-3.88 4.9-3.88
                    1.63 0 4.89 1.38 4.9 3.88C15.55 19.37 13.85 20 12 20zm0-8a3 3 0 100-6 3 3 0 000 6z"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="flex flex-col justify-between flex-grow min-w-0">
        {/* Badges */}
        <div className="flex gap-2 mb-1">
          {hasDiscount && (
            <span className="text-[10px] px-2 py-[1px] bg-yellow-300 text-yellow-900 font-bold rounded uppercase tracking-wide">
              20% OFF
            </span>
          )}
          {isNew && (
            <span className="text-[10px] px-2 py-[1px] bg-purple-200 text-purple-800 font-bold rounded uppercase tracking-wide">
              Nuevo
            </span>
          )}
        </div>

        {/* Título + verificación */}
        <div className="flex items-center gap-1">
          <p className="text-sm sm:text-base font-bold text-gray-900 truncate">
            {title}
          </p>
          {isVerified && (
            <svg
              className="w-4 h-4 text-sky-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path d="M3 12.5c1.5 2 4 4.5 4 4.5s6-8.5 14-12" />
            </svg>
          )}
        </div>

        {/* Descripción */}
        <p className="text-sm text-gray-600 leading-tight truncate">
          {description}
        </p>
      </div>
    </div>
  );
}
