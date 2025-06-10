import BadgeDescuento from "./badges/BadgeDescuento";
import BadgeIconVerified from "./badges/BadgeIconVerified";
import BadgeNuevo from "./badges/BadgeNuevo";
import AvatarPlaceholder from "./placeholder/AvatarPlaceholder";
import ImagePlaceholderIcon from "./placeholder/ImagePlaceholderIcon";

export default function CardLista({
  title,
  image,
  description,
  isVerified = false,
  isNew = false,
  hasDiscount = false,
  descuento = "",
  logo,
}) {
  const hasImage = Boolean(image);

  return (
    <div
      className={`w-full flex items-center pr-2
          rounded-2xl border border-gray-200 bg-white
          shadow-md hover:shadow-lg hover:border-black transition
           gap-4 sm:gap-6`}
    >
      {/* Imagen a la izquierda */}
      <div className="flex-shrink-0">
        {hasImage ? (
          <div
            className="w-36 h-16 sm:w-60 sm:h-25 rounded-l-2xl bg-cover bg-center"
            style={{
              backgroundImage: `url("${image}")`,
            }}
          />
        ) : (
          <ImagePlaceholderIcon />
        )}
      </div>

      {/* Contenido */}
      <div className="flex flex-col justify-between flex-grow min-w-0">
        {/* Badges */}
        <div className="flex gap-2 mb-1">
          {hasDiscount && <BadgeDescuento value={descuento} />}
          {isNew && <BadgeNuevo />}
        </div>

        {/* Título + verificación */}
        <div className="flex items-center gap-1">
          <p className="text-sm sm:text-base font-bold text-gray-900 truncate">
            {title}
          </p>
          {isVerified && <BadgeIconVerified />}
        </div>

        {/* Descripción */}
        <p className="text-sm text-gray-600 leading-tight truncate">
          {description}
        </p>
      </div>
      {logo ? (
        <div
          className="w-10 h-10 rounded-2xl bg-cover bg-center flex-shrink-0"
          style={{ backgroundImage: `url("${logo}")` }}
        />
      ) : (
        <AvatarPlaceholder />
      )}
    </div>
  );
}
