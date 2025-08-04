import { BsGem } from "react-icons/bs";

export default function CardResultadoCuadrada({
  title,
  image,
  tipo,
  isPremium = false,
  className = "",
}) {
  const clasesBase = `rounded-2xl w-full  shadow-sm overflow-hidden bg-white group hover:shadow-xl transition-all duration-200 border ${
    isPremium
      ? "border-yellow-400  max-h-[180px] min-h-[182px]"
      : "border-gray-200 aspect-square"
  } flex flex-col ${className}`;

  return (
    <div className={clasesBase}>
      {/* Imagen */}
      <div
        className={`w-full ${
          isPremium ? "h-[50%]" : "h-2/3"
        } bg-gray-100 relative`}
      >
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className={`object-cover w-full  transition group-hover:scale-105 ${
            isPremium ? "h-[120px]" : "h-full"
          } bg-gray-100 relative`}
        />
        {isPremium && (
          <div className="absolute top-2 left-2 text-yellow-400 drop-shadow">
            <BsGem className="text-lg" />
          </div>
        )}
      </div>

      {/* Contenido */}
      <div
        className={`p-2 flex flex-col justify-between ${
          isPremium ? "h-[56px]" : "h-1/3"
        }`}
      >
        <h3 className="text-xs md:text-sm font-medium text-gray-900 truncate leading-tight">
          {title}
        </h3>
        <p className="text-[8px] text-gray-500  uppercase tracking-wide">
          {tipo}
        </p>
      </div>
    </div>
  );
}
