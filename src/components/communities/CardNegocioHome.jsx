// src/components/CardNegocioHome.jsx
import {
  FaUtensils,
  FaHeartbeat,
  FaHome,
  FaPalette,
  FaPaw,
  FaGraduationCap,
  FaDumbbell,
  FaMoneyCheckAlt,
  FaFilm,
  FaCar,
  FaStore,
  FaPaintBrush,
  FaQuestion,
  FaMicrochip,
  FaHardHat,
  FaBroom,
  FaBaby,
} from "react-icons/fa";
import { FaGem } from "react-icons/fa6";

/* =========================
   Normalizador y helpers
   ========================= */
const norm = (s = "") =>
  String(s)
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();

const CATEGORY_SYNONYMS = new Map([
  // Gastronomía
  ["gastronomia", "Gastronomía"],
  ["comida y bebida", "Gastronomía"],

  // Salud y Belleza
  ["salud y belleza", "Salud y Belleza"],
  ["belleza y cuidado personal", "Salud y Belleza"],

  // Tecnología
  ["tecnologia", "Tecnología"],
  ["tecnologia inmobiliario", "Tecnología"],

  // Inmobiliario / Bienes Raíces
  ["inmobiliario", "Inmobiliario"],
  ["bienes raices", "Inmobiliario"],
  ["bienes raíces", "Inmobiliario"],

  // Arte y Cultura / Cultura
  ["arte y cultura", "Arte y Cultura"],
  ["cultura", "Arte y Cultura"],

  // Mascotas
  ["mascotas", "Mascotas"],

  // Educación
  ["educacion", "Educación"],

  // Deporte / Deporte y Fitness
  ["deporte", "Deporte y Fitness"],
  ["deporte y fitness", "Deporte y Fitness"],

  // Finanzas y Legal / Legales
  ["finanzas y legal", "Finanzas y Legal"],
  ["finanzas y legales", "Finanzas y Legal"],

  // Entretenimiento
  ["entretenimiento", "Entretenimiento"],

  // Construcción
  ["construccion", "Construcción"],

  // Comercio
  ["comercio", "Comercio"],

  // Automotriz
  ["automotriz", "Automotriz"],

  // Arte Corporal
  ["arte corporal", "Arte Corporal"],

  // Infantil / Niños
  ["infantil", "Infantil"],
  ["ninos", "Infantil"],
  ["niños", "Infantil"],

  // Aseo & Clean
  ["aseo & clean", "Aseo & Clean"],
  ["aseo y clean", "Aseo & Clean"],
  ["aseo", "Aseo & Clean"],
  ["limpieza", "Aseo & Clean"],
]);

const ICONS_BY_CANON = {
  Gastronomía: <FaUtensils className="text-orange-500" />,
  "Salud y Belleza": <FaHeartbeat className="text-red-500" />,
  Tecnología: <FaMicrochip className="text-purple-500" />,
  Inmobiliario: <FaHome className="text-gray-600" />,
  "Arte y Cultura": <FaPalette className="text-indigo-500" />,
  Mascotas: <FaPaw className="text-yellow-600" />,
  Educación: <FaGraduationCap className="text-blue-600" />,
  "Deporte y Fitness": <FaDumbbell className="text-green-600" />,
  "Finanzas y Legal": <FaMoneyCheckAlt className="text-teal-600" />,
  Entretenimiento: <FaFilm className="text-amber-600" />,
  Construcción: <FaHardHat className="text-gray-700" />,
  Comercio: <FaStore className="text-pink-500" />,
  Automotriz: <FaCar className="text-cyan-500" />,
  "Arte Corporal": <FaPaintBrush className="text-fuchsia-500" />,
  Infantil: <FaBaby className="text-rose-500" />,
  "Aseo & Clean": <FaBroom className="text-emerald-600" />,
  Otro: <FaQuestion className="text-gray-400" />,
};

export function getCategoryIcon(name) {
  const canon = CATEGORY_SYNONYMS.get(norm(name)) || "Otro";
  return ICONS_BY_CANON[canon] || ICONS_BY_CANON["Otro"];
}

/* =========================
   Card
   ========================= */
export default function CardNegocioHome({ negocio }) {
  const categorias =
    Array.isArray(negocio?.categories) && negocio.categories.length > 0
      ? negocio.categories
      : [];

  const isPremium = negocio?.isPremium === true;

  return (
    <div
      className={`relative flex flex-col hover:shadow-xl items-center rounded-2xl overflow-hidden transition-all p-4 text-center
        ${
          isPremium
            ? "bg-black text-white shadow-[0_0_10px_4px_rgba(234,179,8,0.4)]"
            : "bg-gray-100 text-black"
        }`}
    >
      {/* Logo */}
      <div
        className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden mb-3 border-2 shadow-sm
          ${isPremium ? "border-yellow-400" : "border-gray-300"} bg-white`}
      >
        <img
          src={
            negocio?.profileImage || "https://via.placeholder.com/80?text=Logo"
          }
          alt={`Logo de ${negocio?.name || "Negocio"}`}
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
      <p className="text-xs sm:text-base font-semibold break-words leading-snug min-h-[3.5rem]">
        {negocio?.name || "Negocio"}
      </p>

      {/* Íconos de categoría */}
      <div className="flex flex-wrap justify-center gap-1 mt-2">
        {categorias.length > 0 ? (
          categorias.map((cat) => (
            <div
              key={cat?._id || cat?.name || Math.random()}
              className="w-6 h-6 md:w-9 md:h-9 flex items-center justify-center rounded-full shadow-md bg-white"
              title={cat?.name || ""}
            >
              {getCategoryIcon(cat?.name)}
            </div>
          ))
        ) : (
          <span className="text-xs text-gray-400">Sin categoría</span>
        )}
      </div>
    </div>
  );
}
