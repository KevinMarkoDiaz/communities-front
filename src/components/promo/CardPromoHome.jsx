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
  maxClaims,
}) {
  const isAgotado =
    maxClaims === 0 ||
    descuento === "0 disponibles" ||
    descuento?.includes("0 disponibles");

  return (
    <div className="relative z-0 w-[220px] sm:w-[280px] md:w-[300px] lg:w-[245px] xl:w-[225px] aspect-[4/6] md:aspect-[5/3] xl:aspect-[5/6] rounded-[1.5rem] overflow-hidden shadow-md bg-gray-100 transition hover:shadow-lg my-4">
      {/* Imagen de fondo */}
      {image && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url("${image}")` }}
        />
      )}

      {/* Capa oscura */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Contenido */}
      <div className="relative z-10 flex flex-col justify-between h-full p-3 text-white">
        {/* Badges */}
        <div className="flex gap-2 mb-1 text-[9px] sm:text-[10px] font-semibold uppercase italic">
          {isAgotado ? (
            <span className="bg-red-600 text-white px-2 py-0.5 rounded-full">
              Agotado
            </span>
          ) : (
            hasDiscount && descuento && <BadgeDescuento value={descuento} />
          )}
          {isNew && <BadgeNuevo />}
        </div>

        {/* Título y verificación */}
        <div className="flex items-center justify-between">
          <p className="text-sm sm:text-lg font-bold truncate">{title}</p>
          {isVerified && <BadgeIconVerified />}
        </div>

        {/* 🟢 Contador de cupones disponibles */}
        <div className="mt-2 text-xs font-medium text-center bg-white/80 text-black rounded-full py-1 px-3 self-center shadow-sm">
          {isAgotado ? (
            <span className="text-red-700 font-semibold">❌ Agotado</span>
          ) : (
            <span className="text-green-700 font-semibold">🔥 {descuento}</span>
          )}
        </div>
      </div>
    </div>
  );
}
