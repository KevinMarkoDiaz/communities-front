export default function CardPromoHome({
  title,
  image,
  isNew,
  hasDiscount,
  descuento, // Nuevo prop
  isVerified,
}) {
  return (
    <div className="relative w-[150px] sm:w-[180px] md:w-[200px] aspect-[4/2] rounded-[1.5rem] overflow-hidden shadow-md bg-gray-100 transition hover:scale-[1.02]">
      {/* Imagen de fondo */}
      {image && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url("${image}")` }}
        />
      )}

      {/* Capa oscura */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Contenido */}
      <div className="relative z-10 flex flex-col justify-between h-full p-3 text-white">
        {/* Badges */}
        {/* Badges */}
        <div className="flex gap-2 mb-1 text-[9px] sm:text-[10px] font-semibold uppercase italic">
          {hasDiscount && descuento && (
            <span
              className="flex items-center gap-1 px-2 py-[1px] tracking-tight"
              style={{
                background: "linear-gradient(to right, #fbbf24, #fde68a)",
                clipPath:
                  "polygon(0% 0%, 85% 0%, 100% 50%, 85% 100%, 0% 100%, 10% 50%)",
              }}
            >
              <span className="text-white font-bold drop-shadow-[1px_1px_1px_rgba(0,0,0,0.6)]">
                {descuento}
              </span>
              <span className="text-neutral-800 font-semibold">OFF</span>
            </span>
          )}

          {isNew && (
            <span
              className="flex items-center gap-1 px-2 py-[1px] text-black shadow-[1px_1px_2px_rgba(0,0,0,0.4)]"
              style={{
                background: "linear-gradient(to right, #d8b4fe, #f3e8ff)",
                clipPath:
                  "polygon(0% 0%, 85% 0%, 100% 50%, 85% 100%, 0% 100%, 10% 50%)",
              }}
            >
              <svg
                className="w-3 h-3 text-white drop-shadow-[1px_1px_1px_rgba(0,0,0,0.5)]"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M11.3 1.046a.75.75 0 011.255.794L10.805 7h3.445a.75.75 0 01.6 1.2l-6.5 8.5a.75.75 0 01-1.31-.684L8.695 11H5.25a.75.75 0 01-.6-1.2l6.65-8.754z" />
              </svg>
              Nuevo
            </span>
          )}
        </div>

        {/* Título y verificación */}
        <div className="flex items-center justify-between">
          <p className="text-xs sm:text-sm font-bold truncate">{title}</p>
          {isVerified && (
            <div
              className="w-4 h-4 p-[2px] ring-1 ring-sky-300 bg-sky-400 rounded-full flex items-center justify-center"
              title="Verificado"
            >
              <svg
                className="w-2.5 h-2.5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path d="M3 12.5c1.5 2 4 4.5 4 4.5s6-8.5 14-12" />
              </svg>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
