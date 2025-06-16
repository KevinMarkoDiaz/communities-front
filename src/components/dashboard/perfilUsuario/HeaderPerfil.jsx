import { Link } from "react-router-dom";
import AvatarPlaceholder from "../../placeholder/AvatarPlaceholder";

export default function HeaderPerfil({ usuario }) {
  if (!usuario) return null; // o un pequeño loading/spinner

  const { name, location, role, profileImage } = usuario;

  return (
    <div className="flex p-4 flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
      <div className="flex gap-4">
        <div className="w-32 h-32 rounded-full overflow-hidden flex items-center justify-center bg-gray-100">
          {profileImage ? (
            <img
              src={profileImage}
              alt={name}
              className="w-full h-full object-cover"
            />
          ) : (
            <AvatarPlaceholder />
          )}
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-[#141C24] text-[22px] font-bold leading-tight tracking-[-0.015em]">
            {name}
          </p>
          <p className="text-[#3F5374] text-base font-normal leading-normal">
            {location}
          </p>
          <p className="text-[#3F5374] text-base font-normal leading-normal capitalize">
            {role === "business_owner" ? "Empresario" : role}
          </p>
        </div>
      </div>
      <div className="flex w-full max-w-[480px] gap-3 sm:w-auto">
        <Link
          to="/dashboard/perfil/editar"
          className="h-10 px-4 bg-[#E4E9F1] text-[#141C24] text-sm font-bold rounded-full flex-1 sm:flex-auto truncate flex items-center justify-center text-center"
        >
          Editar Perfil
        </Link>
        <Link
          to="/dashboard/mis-negocios/crear"
          className="h-10 px-4 bg-[#F4C753] text-[#141C24] text-sm font-bold rounded-full flex-1 sm:flex-auto truncate flex items-center justify-center text-center"
        >
          Agregar Negocio
        </Link>
      </div>
    </div>
  );
}
