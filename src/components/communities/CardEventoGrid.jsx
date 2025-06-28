import { Link } from "react-router-dom";

export default function CardEventoGrid({ title, subtitle, image, to }) {
  return (
    <Link
      to={to}
      className="flex flex-col sm:flex-row w-full bg-white rounded-xl shadow hover:shadow-md transition overflow-hidden"
    >
      {/* Imagen a la derecha en desktop */}
      <div className="w-full sm:w-1/3 aspect-[3/2] sm:aspect-auto flex-shrink-0 bg-gray-200">
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            Sin imagen
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="flex flex-col justify-center px-4 py-3 flex-1">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 leading-snug line-clamp-2">
          {title}
        </h3>
        {subtitle && (
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">{subtitle}</p>
        )}
      </div>
    </Link>
  );
}
