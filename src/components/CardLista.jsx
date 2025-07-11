import BadgeDescuento from "./badges/BadgeDescuento";
import BadgeIconVerified from "./badges/BadgeIconVerified";
import BadgeNuevo from "./badges/BadgeNuevo";
import AvatarPlaceholder from "./placeholder/AvatarPlaceholder";
import ImagePlaceholderIcon from "./placeholder/ImagePlaceholderIcon";
import { HiOutlineLocationMarker } from "react-icons/hi";

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
}) {
  const hasImage = Boolean(image);

  return (
    <div
      className="relative flex flex-col rounded-2xl border border-gray-200 bg-white
        shadow-sm hover:shadow-xl transition duration-300 overflow-hidden group"
    >
      {/* Imagen principal con overlay y zoom */}
      <div className="relative w-full h-48 bg-gray-200 overflow-hidden">
        {hasImage ? (
          <div
            className="w-full h-full bg-cover bg-center transform transition-transform duration-500 group-hover:scale-110"
            style={{
              backgroundImage: `url(${image})`,
            }}
          />
        ) : (
          <ImagePlaceholderIcon />
        )}

        {/* Overlay semitransparente al hover */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition duration-300" />

        {/* Gradiente en base para destacar logo */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/40 to-transparent" />

        {/* Badges */}
        <div className="absolute top-2 left-2 flex gap-1">
          {hasDiscount && <BadgeDescuento value={descuento} />}
          {isNew && <BadgeNuevo />}
        </div>

        {/* Badge de categoría */}
        {category && (
          <div className="absolute top-2 right-2 bg-white text-xs font-semibold text-gray-800 px-2 py-0.5 rounded-full shadow-sm">
            {category}
          </div>
        )}

        {/* Botón Ver más */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100  duration-300 transition">
          <button className="bg-orange-500 text-white text-xs px-3 py-1 rounded-full transition">
            Ver más
          </button>
        </div>

        {/* Logo o placeholder */}
        <div className="absolute bottom-2 right-2 w-10 h-10 rounded-full border border-white shadow-md bg-white overflow-hidden">
          {logo ? (
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url("${logo}")` }}
            />
          ) : (
            <AvatarPlaceholder />
          )}
        </div>
      </div>

      {/* Contenido */}
      <div className="flex flex-col gap-0.5 px-3 py-3 flex-1">
        <div className="flex items-center gap-1">
          <h3
            className="
              text-base font-semibold text-gray-900 tracking-tight leading-tight
              min-h-[2.8em] sm:min-h-0
            "
            style={{ letterSpacing: "0.02em" }}
          >
            {title}
          </h3>
          {isVerified && <BadgeIconVerified />}
        </div>

        {/* Ubicación */}
        {location && (
          <div className="flex items-center gap-1 mt-0.5">
            <HiOutlineLocationMarker className="text-gray-500 w-4 h-4 flex-shrink-0" />
            <p
              className="text-xs font-medium text-gray-700 tracking-wide"
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
      </div>
    </div>
  );
}
