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
      className="w-full flex flex-col sm:flex-row items-start sm:items-center 
        rounded-2xl border border-gray-200 bg-white
        shadow-md hover:shadow-lg hover:border-black transition sm:gap-6"
    >
      {/* Imagen */}
      <div className="flex-shrink-0 w-full sm:w-60">
        {hasImage ? (
          <div
            className="w-full h-40 sm:h-24 sm:rounded-l-2xl rounded-t-2xl bg-cover bg-center"
            style={{
              backgroundImage: `url("${image}")`,
            }}
          />
        ) : (
          <ImagePlaceholderIcon />
        )}
      </div>

      {/* Contenido + logo */}
      <div className="flex sm:flex-row flex-1 w-full min-w-0 px-4 pb-4 sm:pb-0 sm:items-center sm:justify-between">
        {/* Texto */}
        <div className="flex flex-col flex-1">
          <div className="flex gap-2 mt-2 sm:mt-0 mb-1">
            {hasDiscount && <BadgeDescuento value={descuento} />}
            {isNew && <BadgeNuevo />}
          </div>

          <div className="flex items-center gap-1">
            <p className="text-sm sm:text-base font-bold text-gray-900 line-clamp-2 sm:line-clamp-1">
              {title}
            </p>
            {isVerified && <BadgeIconVerified />}
          </div>

          <p className="text-sm text-gray-600 leading-tight line-clamp-3">
            {description}
          </p>
        </div>

        {/* Logo: móvil abajo derecha, desktop a la derecha */}
        <div className="mt-2 sm:mt-0 sm:ml-4 self-end sm:self-center">
          {logo ? (
            <div
              className="w-10 h-10  rounded-2xl bg-cover bg-center"
              style={{ backgroundImage: `url("${logo}")` }}
            />
          ) : (
            <AvatarPlaceholder />
          )}
        </div>
      </div>
    </div>
  );
}
