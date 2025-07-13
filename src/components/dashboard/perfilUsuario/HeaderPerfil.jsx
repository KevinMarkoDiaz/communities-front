import { Link } from "react-router-dom";
import AvatarPlaceholder from "../../placeholder/AvatarPlaceholder";
import { FiMessageCircle } from "react-icons/fi";

export default function HeaderPerfil({ usuario }) {
  if (!usuario) return null;

  const { name, location, role, profileImage } = usuario;

  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:justify-between sm:items-center bg-[#f9fafb] p-4 md:p-6 rounded-2xl border border-gray-200 shadow-sm">
      {/* Avatar + info */}
      <div className="flex gap-4 sm:gap-6 items-center">
        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden flex items-center justify-center bg-gray-100 border border-gray-200">
          {profileImage ? (
            <img
              src={profileImage}
              alt={name || "Usuario"}
              className="w-full h-full object-cover"
            />
          ) : (
            <AvatarPlaceholder />
          )}
        </div>

        <div className="flex flex-col justify-center gap-0.5">
          <p className="text-[#111827] text-lg md:text-2xl font-semibold leading-tight tracking-[-0.015em]">
            {name}
          </p>
          {location && (
            <p className="text-[#6b7280] text-sm md:text-base font-normal leading-normal">
              {location}
            </p>
          )}
          <p className="text-[#6b7280] text-sm md:text-base font-normal leading-normal capitalize">
            {role === "business_owner" ? "Empresario" : role}
          </p>
        </div>
      </div>

      {/* Botones */}
      <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-2 sm:gap-3 mt-2 sm:mt-0">
        <Link
          to="/dashboard/perfil/editar"
          className="h-10 px-4 bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 text-sm rounded-md flex items-center justify-center text-center transition focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          Editar perfil
        </Link>
        <Link
          to="/dashboard/mis-negocios/crear"
          className="h-10 px-4 bg-orange-500 text-white hover:bg-orange-600 text-sm rounded-md flex items-center justify-center text-center transition focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          + Nuevo negocio
        </Link>
        <Link
          to="/inbox"
          className="h-10 px-4 bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200 text-sm rounded-md flex items-center justify-center text-center transition focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          <FiMessageCircle className="mr-1 text-base" />
          Mis mensajes
        </Link>
      </div>
    </div>
  );
}
