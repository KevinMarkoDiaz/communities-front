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
  FaGem,
} from "react-icons/fa";

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

export default function CardNegocioHome({ negocio }) {
  const categorias =
    Array.isArray(negocio.categories) && negocio.categories.length > 0
      ? negocio.categories
      : [];

  const isPremium = negocio.isPremium === true;

  return (
    <div
      className={`relative flex flex-col hover:shadow-xl items-center rounded-2xl overflow-hidden transition-all p-4 text-center
        ${
          isPremium
            ? "bg-black text-white shadow-[0_0_10px_4px_rgba(234,179,8,0.4)]"
            : "bg-gray-100 text-back "
        }`}
    >
      {/* Logo */}
      <div
        className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden mb-3 border-2 shadow-sm
          ${isPremium ? "border-yellow-400" : "border-gray-300"} bg-white`}
      >
        <img
          src={
            negocio.profileImage || "https://via.placeholder.com/80?text=Logo"
          }
          alt={`Logo de ${negocio.name}`}
          className="w-full h-full object-cover"
        />
        {/* Diamante premium */}
        {isPremium && (
          <div className="absolute -bottom-2 -right-2 bg-white text-yellow-500 rounded-full p-1 shadow-md">
            <FaGem className="w-4 h-4" />
          </div>
        )}
      </div>

      {/* Nombre */}
      <p className="  text-xs sm:text-m font-semibold break-words leading-snug min-h-[3.5rem]">
        {negocio.name}
      </p>

      {/* Íconos de categoría */}
      <div className="flex flex-wrap justify-center gap-1 mt-2">
        {categorias.length > 0 ? (
          categorias.map((cat) => (
            <div
              key={cat.name}
              className={`w-6 h-6 md:w-9 md:h-9 flex items-center justify-center rounded-full shadow-md
                ${isPremium ? "bg-white" : "bg-white"}`}
              title={cat.name}
            >
              {iconosCategoria[cat.name] || (
                <FaQuestion
                  className={isPremium ? "text-white" : "text-gray-500"}
                />
              )}
            </div>
          ))
        ) : (
          <span className="text-xs text-gray-400">Sin categoría</span>
        )}
      </div>
    </div>
  );
}
