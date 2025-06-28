import BadgeDescuento from "../badges/BadgeDescuento";
import BadgeIconVerified from "../badges/BadgeIconVerified";
import BadgeNuevo from "../badges/BadgeNuevo";

export default function CardPromoHome({
  title,
  image,
  isNew,
  hasDiscount,
  descuento,
  isVerified,
}) {
  return (
    <div className="relative z-0 w-[220px] sm:w-[280px] md:w-[300px] lg:w-[245px] xl:w-[225px] aspect-[4/6] md:aspect-[5/3] xl:aspect-[5/6]  rounded-[1.5rem] overflow-hidden shadow-md bg-gray-100 transition hover:shadow-lg mb-4">
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
        <div className="flex gap-2 mb-1 text-[9px] sm:text-[10px] font-semibold uppercase italic">
          {hasDiscount && descuento && <BadgeDescuento value={descuento} />}
          {isNew && <BadgeNuevo />}
        </div>

        {/* Título y verificación */}
        <div className="flex items-center justify-between">
          <p className="text-sm sm:text-lg font-bold truncate">{title}</p>
          {isVerified && <BadgeIconVerified />}
        </div>
      </div>
    </div>
  );
}
