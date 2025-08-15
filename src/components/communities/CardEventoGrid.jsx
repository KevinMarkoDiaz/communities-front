import { Link } from "react-router-dom";
import {
  FaUtensils,
  FaHeartbeat,
  FaFlask,
  FaSpa,
  FaHome,
  FaPalette,
  FaPaw,
  FaGraduationCap,
  FaDumbbell,
  FaMoneyCheckAlt,
  FaFilm,
  FaQuestion,
} from "react-icons/fa";

// Mapa de íconos por categoría
const iconosCategoria = {
  "Comida y Bebida": <FaUtensils className="text-orange-500" />,
  "Salud y Bienestar": <FaHeartbeat className="text-red-500" />,
  "Ciencia y Tecnología": <FaFlask className="text-purple-500" />,
  "Belleza y Cuidado Personal": <FaSpa className="text-pink-400" />,
  "Bienes Raíces": <FaHome className="text-gray-600" />,
  "Arte y Cultura": <FaPalette className="text-indigo-500" />,
  Mascotas: <FaPaw className="text-yellow-600" />,
  Educación: <FaGraduationCap className="text-blue-600" />,
  "Deporte y Fitness": <FaDumbbell className="text-green-600" />,
  "Finanzas y Legales": <FaMoneyCheckAlt className="text-teal-600" />,
  Entretenimiento: <FaFilm className="text-amber-600" />,
};

export default function CardEventoGrid({
  title,
  subtitle,
  image,
  to,
  categories = [],
}) {
  return (
    <Link
      to={to}
      className="flex flex-col sm:flex-row w-full bg-gray-100 rounded-2xl hover:shadow-2xl transition overflow-hidden text-black"
    >
      {/* Imagen */}
      <div className="w-full sm:w-1/3 aspect-square flex-shrink-0 bg-gray-300">
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400  text-xs">
            Sin imagen
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="flex flex-col justify-between px-4 py-3 flex-1">
        <div>
          <h3 className="  text-xs sm:text-base font-semibold leading-snug line-clamp-2">
            {title}
          </h3>
          {subtitle && (
            <p className="text-xs text-gray-400 mt-1 line-clamp-2">
              {subtitle}
            </p>
          )}
        </div>

        {/* Categorías como íconos */}
        <div className="flex flex-wrap gap-1 mt-3">
          {Array.isArray(categories) && categories.length > 0 ? (
            categories.map((cat, idx) => (
              <div
                key={idx}
                className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center rounded-full bg-white shadow-md"
                title={cat.name}
              >
                {iconosCategoria[cat.name] || (
                  <FaQuestion className="text-gray-500 text-xs" />
                )}
              </div>
            ))
          ) : (
            <span className="text-xs text-gray-500">Sin categoría</span>
          )}
        </div>
      </div>
    </Link>
  );
}
