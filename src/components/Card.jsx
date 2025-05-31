export default function CardDestacado({
  title,
  image,
  logo, // 🆕 nuevo campo
  description,
  isVerified = false,
  isNew = false,
  hasDiscount = false,
  modo = "horizontal-compact",
}) {
  const hasImage = Boolean(image);

  const classMap = {
    vertical: "flex flex-col h-auto w-full max-w-[320px]",
    "horizontal-full": "flex h-36 w-full max-w-6xl mx-auto",
    "horizontal-compact": "flex h-36 w-full max-w-[315px] flex-shrink-0",
  };

  return (
    <div
      className={`border border-gray-300 rounded-md overflow-hidden shadow-xl transition hover:border-black ${classMap[modo]}`}
    >
      {/* Imagen */}
      <div
        className={
          modo === "vertical"
            ? "w-full h-32 bg-gray-100"
            : "w-1/3 h-full bg-gray-100 flex items-center justify-center"
        }
      >
        {hasImage ? (
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url("${image}")` }}
          />
        ) : (
          <svg
            className="w-6 h-6 text-gray-400 m-auto"
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
        )}
      </div>

      {/* Contenido */}
      <div
        className={`${
          modo === "vertical"
            ? "p-4"
            : "w-2/3 p-4 flex flex-col justify-between"
        }`}
      >
        {/* Badges */}
        <div className="flex gap-2 mb-1">
          {hasDiscount && (
            <span
              className="flex items-center gap-1 px-2 py-[1px] text-[10px] font-semibold uppercase italic tracking-tight"
              style={{
                background: "linear-gradient(to right, #fbbf24, #fde68a)",
                clipPath:
                  "polygon(0% 0%, 85% 0%, 100% 50%, 85% 100%, 0% 100%, 10% 50%)",
              }}
            >
              <span className="text-white font-bold drop-shadow-[1px_1px_1px_rgba(0,0,0,0.6)]">
                20%
              </span>
              <span className="text-neutral-800 font-semibold">OFF</span>
            </span>
          )}

          {isNew && (
            <span
              className="flex items-center gap-1 px-2 py-[1px] text-[10px] font-semibold uppercase italic tracking-tight text-black shadow-[1px_1px_2px_rgba(0,0,0,0.4)]"
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

        {/* Título y descripción */}
        {modo === "vertical" ? (
          <div className="flex items-start gap-3">
            {/* Imagen circular */}
            {logo ? (
              <div
                className="w-10 h-10 rounded-full bg-cover bg-center flex-shrink-0"
                style={{ backgroundImage: `url("${logo}")` }}
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-5 h-5 text-gray-400"
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

            {/* Texto */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1">
                <p className="text-black text-sm font-bold truncate">{title}</p>
                {isVerified && (
                  <div
                    className="w-4 h-4 p-[2px] ring-2 ring-sky-400 shadow-inner bg-gradient-to-br from-sky-200 to-sky-400 flex items-center justify-center"
                    style={{
                      clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                    }}
                    title="Verificado por Communities"
                  >
                    <svg
                      className="w-2.5 h-2.5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 12.5c1.5 2 4 4.5 4 4.5s6-8.5 14-12" />
                    </svg>
                  </div>
                )}
              </div>
              <p className="text-[#3F5374] text-xs font-normal truncate">
                {description}
              </p>
            </div>
          </div>
        ) : (
          // 🧱 Modo horizontal sin logo
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1">
              <p className="text-black text-sm font-bold truncate">{title}</p>
              {isVerified && (
                <div
                  className="w-4 h-4 p-[2px] ring-2 ring-sky-400 shadow-inner bg-gradient-to-br from-sky-200 to-sky-400 flex items-center justify-center"
                  style={{
                    clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                  }}
                  title="Verificado por Communities"
                >
                  <svg
                    className="w-2.5 h-2.5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 12.5c1.5 2 4 4.5 4 4.5s6-8.5 14-12" />
                  </svg>
                </div>
              )}
            </div>
            <p className="text-[#3F5374] text-xs font-normal truncate">
              {description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
