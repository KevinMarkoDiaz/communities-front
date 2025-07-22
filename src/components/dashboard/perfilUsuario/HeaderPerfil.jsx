import { Link } from "react-router-dom";
import AvatarPlaceholder from "../../placeholder/AvatarPlaceholder";
import { FiMessageCircle, FiMapPin, FiUser } from "react-icons/fi";

export default function HeaderPerfil({ usuario }) {
  if (!usuario) return null;

  const {
    name,
    lastName,
    title,
    description,
    location,
    country,
    role,
    profileImage,
  } = usuario;

  return (
    <div className="flex flex-col gap-4 bg-[#f9fafb] p-4 md:p-6 rounded-2xl">
      {/* Wrapper principal responsive */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center  gap-4">
        {/* Imagen y datos básicos */}
        <div className="flex flex-row md:flex-col items-end gap-10 md:gap-4 flex-shrink-0">
          {/* Avatar */}
          <div className="w-36 h-36 rounded-full overflow-hidden flex items-center justify-center bg-gray-100 border border-gray-200">
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

          {/* Nombre y detalles */}
          <div className="flex flex-col gap-1 text-left">
            <p className="text-[#111827] text-base sm:text-lg md:text-xl font-semibold leading-tight tracking-[-0.015em]">
              {name} {lastName}
            </p>

            {title && (
              <p className="text-[#6b7280] text-xs sm:text-sm font-medium flex items-center gap-1">
                <FiUser className="text-gray-400" />
                {title}
              </p>
            )}

            {location && (
              <p className="text-[#6b7280] text-xs sm:text-sm font-normal flex items-center gap-1">
                <FiMapPin className="text-gray-400" />
                {location}, {country}
              </p>
            )}

            <p className="text-[#6b7280] ml-5 text-xs font-normal capitalize">
              {role === "business_owner" ? "Empresario" : role}
            </p>
          </div>
        </div>

        {/* Descripción */}
        {description && (
          <div className="text-sm text-gray-600 leading-snug md:ml-6 md:mt-0 md:text-center md:mx-auto">
            {description}
          </div>
        )}
      </div>

      {/* Botones */}
      <div className="flex flex-wrap items-start gap-2 sm:gap-3 pt-2">
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
