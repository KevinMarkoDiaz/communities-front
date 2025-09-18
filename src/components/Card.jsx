import BadgeDescuento from "./badges/BadgeDescuento";
import BadgeIconVerified from "./badges/BadgeIconVerified";
import BadgeNuevo from "./badges/BadgeNuevo";
import ImagePlaceholderIcon from "./placeholder/ImagePlaceholderIcon";
import { FaGem } from "react-icons/fa";

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
  isPremium = false, // ✅ NUEVO
}) {
  const hasImage = Boolean(image);

  const classMap = {
    vertical:
      "flex flex-col mb-8 h-auto w-[100%] md:w-full max-w-[220px] sm:max-w-[220px] md:max-w-[220px] lg:max-w-[300px]",
    "horizontal-full": "flex h-36 w-full max-w-6xl mx-auto",
    "horizontal-compact":
      "flex h-36 w-[85%] md:w-full max-w-[350px] flex-shrink-0",
  };

  return (
    <div
      className={`relative rounded-2xl overflow-hidden transition duration-300 ease-in-out group 
        ${classMap[modo]}
        border  hover:shadow-xl 
        ${
          isPremium
            ? "border-yellow-400 shadow-[0_0_4px_4px_rgba(234,179,8,0.3)]"
            : "border-gray-200 shadow-sm"
        }`}
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

        {/* Badge de categoría */}
        {category && (
          <div
            className={`absolute top-2 right-2 text-xs font-semibold px-2 py-0.5 rounded-full shadow-sm z-10
        ${isPremium ? "bg-orange-500 text-white" : "bg-white text-gray-800"}`}
          >
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
          <div
            className={`absolute bottom-2 right-2 rounded-full border border-white shadow-md bg-white overflow-hidden z-10
        ${isPremium ? "w-12 h-12" : "w-10 h-10"}`}
          >
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url("${logo}")` }}
            />
          </div>
        )}

        {/* Diamante premium */}
        {isPremium && (
          <div className="absolute bottom-2 left-2 text-yellow-500 rounded-full p-1 shadow-md z-10">
            <FaGem className="w-5 h-5" />
          </div>
        )}
      </div>

      {/* Contenido */}
      <div
        className={`relative ${
          modo === "vertical"
            ? "px-4 py-3"
            : "w-2/3 p-4 flex flex-col justify-between"
        } ${isPremium ? "bg-black text-white" : ""}`}
      >
        <div className="flex flex-col gap-1 truncate min-h-[40px] max-h-[40px]">
          <div className="flex items-center gap-1">
            <p
              className="text-[15px] font-semibold leading-snug overflow-hidden text-ellipsis whitespace-normal [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical]"
              title={title}
            >
              {title}
            </p>
          </div>

          {description && (
            <p className="text-xs font-normal truncate">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
}
