import { BsGem } from "react-icons/bs";

export default function CardPromo({ promo, onSelect }) {
  const { _id, name, featuredImage, type, isPremium = false } = promo;

  const imagenUrl =
    featuredImage || "https://cdn.usegalileo.ai/sdxl10/placeholder.png";

  const clasesBase = `
    group relative rounded-lg overflow-hidden cursor-pointer flex flex-col min-h-[10rem]
    transition
    ${
      isPremium
        ? "bg-white border border-yellow-400 shadow-[0_0_10px_3px_rgba(234,179,8,0.4)]"
        : "bg-white border border-gray-200 shadow hover:shadow-lg"
    }
  `;

  return (
    <div onClick={() => onSelect(promo)} className={clasesBase}>
      {/* Imagen */}
      <div className="w-full h-28 overflow-hidden bg-gray-50 relative">
        <img
          src={imagenUrl}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
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
        className={`flex flex-col justify-between gap-2 p-2 h-[5.2rem] flex-grow ${
          isPremium ? "bg-black text-white" : ""
        }`}
      >
        {/* Nombre */}
        <h3 className="text-sm font-semibold line-clamp-2 leading-snug">
          {name}
        </h3>

        {/* Tipo */}
        {type && (
          <span
            className={`text-[0.65rem] font-medium py-0.5 rounded w-fit capitalize
              ${
                isPremium
                  ? "text-yellow-400 bg-black"
                  : "text-gray-500 bg-white"
              }
            `}
          >
            {type.replace(/_/g, " ")}
          </span>
        )}
      </div>
    </div>
  );
}
