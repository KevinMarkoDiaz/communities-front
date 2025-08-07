import { HiOutlineLocationMarker } from "react-icons/hi";
import { FaGem } from "react-icons/fa";

import BadgeDescuento from "./badges/BadgeDescuento";
import BadgeIconVerified from "./badges/BadgeIconVerified";
import BadgeNuevo from "./badges/BadgeNuevo";
import ImagePlaceholderIcon from "./placeholder/ImagePlaceholderIcon";

export default function CardGrid({
  title,
  image,
  isVerified = false,
  isNew = false,
  hasDiscount = false,
  descuento = "",
  logo,
  category,
  location,
  isPremium = false, // 👈 nuevo prop
}) {
  const hasImage = Boolean(image);

  return (
    <div
      className={`relative flex flex-col rounded-2xl overflow-hidden transition duration-300 group
        bg-white border hover:shadow-2xl
        ${
          isPremium
            ? "border-yellow-400 shadow-[0_0_15px_rgba(234,179,8,0.5)]"
            : "border-gray-200 shadow-md"
        }`}
    >
      {/* Imagen principal */}
      <div className="relative w-full h-48 bg-gray-200 overflow-hidden">
        {hasImage ? (
          <div
            className="w-full h-full bg-cover bg-center transform transition-transform duration-500 group-hover:scale-110"
            style={{ backgroundImage: `url(${image})` }}
          />
        ) : (
          <ImagePlaceholderIcon size={36} />
        )}

        {/* Overlay al hover */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition duration-300" />

        {/* Gradiente inferior para logo */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/40 to-transparent" />

        {/* Badges top izquierdo */}
        <div className="absolute top-2 left-2 flex gap-1">
          {hasDiscount && <BadgeDescuento value={descuento} />}
          {isNew && <BadgeNuevo />}
        </div>

        {/* Badge de categoría */}
        {category && (
          <div
            className={`absolute top-2 right-2 px-2 py-0.5 rounded-full text-xs font-semibold shadow-sm
      ${isPremium ? "bg-orange-500 text-white" : "bg-white text-gray-800"}`}
          >
            {category}
          </div>
        )}

        {/* Botón Ver más al hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 duration-300 transition">
          <button className="bg-orange-500 text-white text-xs px-3 py-1 rounded-full transition">
            Ver más
          </button>
        </div>

        {/* Logo o placeholder */}
        {logo && (
          <div
            className={`absolute bottom-2 right-2 rounded-full border border-white shadow-md bg-white overflow-hidden
      ${isPremium ? "w-16 h-16" : "w-10 h-10"}`}
          >
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url("${logo}")` }}
            />
          </div>
        )}
      </div>

      {/* Contenido */}
      <div
        className={`flex flex-col gap-0.5 px-2 py-2 justify-between flex-1 min-h-[70px] max-h-[70px] relative
    ${isPremium ? "bg-black text-white" : ""}`}
      >
        <div className="flex items-center gap-1">
          <h3
            className="
        text-sm font-semibold tracking-tight leading-tight
        overflow-hidden text-ellipsis
        [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical]
      "
            style={{ letterSpacing: "0.02em" }}
          >
            {title}
          </h3>
        </div>

        {location && (
          <div className="flex items-center gap-1 mt-0.5">
            <HiOutlineLocationMarker
              className={`w-4 h-4 flex-shrink-0 ${
                isPremium ? "text-white" : "text-gray-500"
              }`}
            />
            <p
              className="text-xs font-medium tracking-wide truncate"
              style={{ letterSpacing: "0.02em" }}
            >
              {location
                .replace(/,\s*\d+$/, "")
                .replace(/\s\d+$/, "")
                .replace(/,\s*$/, "")
                .trim()}
            </p>
          </div>
        )}

        {/* Diamante premium */}
        {isPremium && (
          <div className="absolute bottom-2 right-2  rounded-full p-1 text-yellow-500 shadow-md">
            <FaGem className="w-6 h-6" />
          </div>
        )}
      </div>
    </div>
  );
}
