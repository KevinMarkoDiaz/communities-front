import { Link } from "react-router-dom";
import AvatarPlaceholder from "../../placeholder/AvatarPlaceholder";

export default function HeaderPerfil({ usuario }) {
  if (!usuario) return null; // o un pequeño loading/spinner

  const { name, location, role, profileImage } = usuario;

  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:justify-between sm:items-center bg-[#F7F7F7] p-4 md:p-6 rounded-2xl">
      <div className="flex gap-4 sm:gap-6 items-center">
        <div className="w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden flex items-center justify-center bg-gray-100">
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
          <p className="text-[#141C24] text-lg md:text-2xl font-bold leading-tight tracking-[-0.015em]">
            {name}
          </p>
          {location && (
            <p className="text-[#3F5374] text-sm md:text-base font-normal leading-normal">
              {location}
            </p>
          )}
          <p className="text-[#3F5374] text-sm md:text-base font-normal leading-normal capitalize">
            {role === "business_owner" ? "Empresario" : role}
          </p>
        </div>
      </div>

      <div className="flex w-full max-w-[480px] gap-3 sm:w-auto">
        <Link
          to="/dashboard/perfil/editar"
          className="h-10 px-4 bg-black text-white hover:bg-white hover:text-black border border-black text-sm rounded-md flex-1 sm:flex-auto truncate flex items-center justify-center text-center transition focus:outline-none focus:ring-2 focus:ring-black"
        >
          Editar Perfil
        </Link>
        <Link
          to="/dashboard/mis-negocios/crear"
          className="h-10 px-4 bg-black text-white hover:bg-white hover:text-black border border-black text-sm rounded-md flex-1 sm:flex-auto truncate flex items-center justify-center text-center transition focus:outline-none focus:ring-2 focus:ring-black"
        >
          Agregar Negocio
        </Link>
      </div>
    </div>
  );
}
