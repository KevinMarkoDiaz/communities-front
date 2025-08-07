import { BsGem } from "react-icons/bs";

export default function CardResultadoCuadrada({
  title,
  image,
  tipo,
  isPremium = false,
  className = "",
}) {
  const clasesBase = `
    rounded-2xl w-full overflow-hidden flex flex-col transition-all duration-200
    border ${isPremium ? "border-yellow-400  " : "border-gray-200"}
    ${
      isPremium
        ? "shadow-[0_0_10px_3px_rgba(234,179,8,0.4)]"
        : "shadow-sm hover:shadow-xl"
    }
    ${isPremium ? "max-h-[180px] min-h-[182px] " : "aspect-square"}
    bg-white group
    ${className}
  `;

  return (
    <div className={clasesBase}>
      {/* Imagen */}
      <div
        className={`w-full ${
          isPremium ? "h-[65%]" : "h-2/3"
        } bg-gray-100 relative`}
      >
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className={`object-cover w-full transition group-hover:scale-105 ${
            isPremium ? "h-[120px]" : "h-full"
          }`}
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
        className={`p-2 flex flex-col justify-between  ${
          isPremium ? "h-[62px] bg-black text-white" : "h-1/3"
        }`}
      >
        <h3 className="text-xs md:text-sm font-medium truncate leading-tight">
          {title}
        </h3>
        <p
          className={`text-[8px] uppercase tracking-wide ${
            isPremium ? "text-yellow-400" : "text-gray-500"
          }`}
        >
          {tipo}
        </p>
      </div>
    </div>
  );
}
