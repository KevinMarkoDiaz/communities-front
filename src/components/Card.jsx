import BadgeDescuento from "./badges/BadgeDescuento";
import BadgeIconVerified from "./badges/BadgeIconVerified";
import BadgeNuevo from "./badges/BadgeNuevo";
import ImagePlaceholderIcon from "./placeholder/ImagePlaceholderIcon";

export default function CardDestacado({
  title,
  image,
  logo,
  description,
  isVerified = false,
  isNew = false,
  hasDiscount = false,
  descuento = "20%",
  modo = "horizontal-compact",
  category,
}) {
  const hasImage = Boolean(image);

  const classMap = {
    vertical:
      "flex flex-col mb-8 h-auto w-[100%] md:w-full max-w-[280px] sm:max-w-[250px] md:max-w-[250px] lg:max-w-[320px]",
    "horizontal-full": "flex h-36 w-full max-w-6xl mx-auto",
    "horizontal-compact":
      "flex h-36 w-[85%] md:w-full max-w-[350px] flex-shrink-0",
  };

  return (
    <div
      className={`relative border border-gray-200 rounded-2xl bg-white overflow-hidden shadow-sm hover:shadow-xl transition duration-300 ease-in-out group ${classMap[modo]}`}
    >
      {/* Imagen */}
      <div
        className={
          modo === "vertical"
            ? "relative w-full h-42 md:h-36 bg-gray-200 overflow-hidden"
            : "relative w-1/3 h-full bg-gray-200 overflow-hidden flex items-center justify-center"
        }
      >
        {hasImage ? (
          <div
            className="w-full h-full bg-cover bg-center transform transition-transform duration-500 group-hover:scale-110"
            style={{ backgroundImage: `url(${image})` }}
          />
        ) : (
          <ImagePlaceholderIcon />
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition duration-300" />

        {/* Gradiente inferior */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/40 to-transparent z-0" />

        {/* Badges top izquierda */}
        <div className="absolute top-2 left-2 flex gap-1 z-10">
          {hasDiscount && <BadgeDescuento value={descuento} />}
          {isNew && <BadgeNuevo />}
        </div>

        {/* Categoría (top derecha) */}
        {category && (
          <div className="absolute top-2 right-2 bg-white text-xs font-semibold text-gray-800 px-2 py-0.5 rounded-full shadow-sm z-10">
            {category}
          </div>
        )}

        {/* Botón Ver más */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 z-10">
          <button className="bg-orange-500 text-white text-xs px-3 py-1 rounded-full shadow-md hover:bg-orange-600 transition">
            Ver más
          </button>
        </div>

        {/* Logo */}
        {logo && (
          <div className="absolute bottom-2 right-2 w-10 h-10 rounded-full border border-white shadow-md bg-white overflow-hidden z-10">
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url("${logo}")` }}
            />
          </div>
        )}
      </div>

      {/* Contenido */}
      <div
        className={`${
          modo === "vertical"
            ? "px-4 py-3"
            : "w-2/3 p-4 flex flex-col justify-between"
        }`}
      >
        <div className="flex flex-col gap-1 truncate  min-h-[40px] max-h-[40px]">
          <div className="flex items-center gap-1">
            <p
              className="text-gray-900 text-[15px] font-semibold leading-snug overflow-hidden text-ellipsis whitespace-normal [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical]"
              title={title}
            >
              {title}
            </p>
            {isVerified && <BadgeIconVerified />}
          </div>

          {description && (
            <p className="text-gray-600 text-xs font-normal truncate">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
