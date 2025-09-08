import { BsGem } from "react-icons/bs";
import clsx from "clsx"; // opcional, para unir clases con seguridad

export default function CardResultadoCuadrada({
  title = "Sin título",
  image = "/placeholder.svg",
  tipo = "General",
  isPremium = false,
  className = "",
}) {
  const clasesBase = clsx(
    "rounded-2xl w-full overflow-hidden flex flex-col transition-all duration-200 bg-white group",
    "border",
    isPremium
      ? "border-yellow-400 shadow-[0_0_10px_3px_rgba(234,179,8,0.4)] max-h-[180px] min-h-[182px]"
      : "border-gray-200 shadow-sm hover:shadow-xl aspect-square",
    className
  );

  return (
    <div className={clasesBase}>
      {/* Imagen */}
      <div
        className={clsx(
          "w-full bg-gray-100 relative",
          isPremium ? "h-[65%]" : "h-2/3"
        )}
      >
        <img
          src={image}
          alt={title || "imagen"}
          className={clsx(
            "object-cover w-full transition group-hover:scale-105",
            isPremium ? "h-[120px]" : "h-full"
          )}
          onError={(e) => {
            e.currentTarget.src = "/placeholder.svg";
          }}
        />

        {/* Diamante Premium */}
        {isPremium && (
          <div className="absolute top-2 left-2 text-yellow-400 drop-shadow">
            <BsGem className="text-lg" />
          </div>
        )}
      </div>

      {/* Contenido */}
      <div
        className={clsx(
          "p-2 flex flex-col justify-between",
          isPremium ? "h-[62px] bg-black text-white" : "h-1/3"
        )}
      >
        <h3 className="text-xs font-medium truncate leading-tight">
          {title || "Sin título"}
        </h3>
        <p
          className={clsx(
            "text-[8px] uppercase tracking-wide",
            isPremium ? "text-yellow-400" : "text-gray-500"
          )}
        >
          {tipo || "General"}
        </p>
      </div>
    </div>
  );
}
