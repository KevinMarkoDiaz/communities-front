import { Link } from "react-router-dom";
import AvatarPlaceholder from "../../placeholder/AvatarPlaceholder";
import { FiMessageCircle } from "react-icons/fi";

export default function HeaderPerfil({ usuario }) {
  if (!usuario) return null;

  const { name, location, role, profileImage } = usuario;

  return (
    <div className="flex flex-col gap-4 md:flex-col lg:flex-row lg:justify-between lg:items-end bg-[#f9fafb] p-4 md:p-6 rounded-2xl">
      {/* Avatar + info */}
      <div className="flex gap-4 sm:gap-6 items-center">
        <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full overflow-hidden flex items-center justify-center bg-gray-100 border border-gray-200">
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
          <p className="text-[#111827] text-base sm:text-lg md:text-2xl font-semibold leading-tight tracking-[-0.015em]">
            {name}
          </p>
          {location && (
            <p className="text-[#6b7280] text-xs sm:text-sm md:text-base font-normal leading-normal">
              {location}
            </p>
          )}
          <p className="text-[#6b7280] text-xs sm:text-sm md:text-base font-normal leading-normal capitalize">
            {role === "business_owner" ? "Empresario" : role}
          </p>
        </div>
      </div>

      {/* Botones */}
      <div className="flex flex-wrap items-end gap-2 sm:gap-3 mt-2 md:mt-4 lg:mt-0">
        <Link
          to="/dashboard/perfil/editar"
          className="flex shadow-md hover:shadow-lg text-orange-600 items-center justify-center gap-2 px-3 py-2 rounded border border-gray-300 bg-white hover:bg-gray-50 transition text-xs font-medium whitespace-nowrap no-underline"
        >
          Editar perfil
        </Link>
        <Link
          to="/dashboard/mis-negocios/crear"
          className="flex shadow-md hover:shadow-lg text-orange-600 items-center justify-center gap-2 px-3 py-2 rounded border border-gray-300 bg-white hover:bg-gray-50 transition text-xs font-medium whitespace-nowrap no-underline"
        >
          + Nuevo negocio
        </Link>
        <Link
          to="/inbox"
          className="flex shadow-md hover:shadow-lg text-orange-600 items-center justify-center gap-2 px-3 py-2 rounded border border-gray-300 bg-white hover:bg-gray-50 transition text-xs font-medium whitespace-nowrap no-underline"
        >
          <FiMessageCircle className="text-lg" />
          Mis mensajes
        </Link>
      </div>
    </div>
  );
}
