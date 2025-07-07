import { Link } from "react-router-dom";
import AvatarPlaceholder from "../../placeholder/AvatarPlaceholder";

export default function HeaderPerfil({ usuario }) {
  if (!usuario) return null; // o un pequeño loading/spinner

  const { name, location, role, profileImage } = usuario;

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center  bg-[#F7F7F7] p-2 md:p-6 rounded-2xl">
      <div className="flex gap-4">
        <div className="w-22 h-22 md:w-32 md:h-32 rounded-full overflow-hidden flex items-center justify-center bg-gray-100">
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
          className="h-10 px-4 bg-[#000] text-[#fff] hover:text-[#000] hover:bg-[#fff]  text-sm rounded-md flex-1 sm:flex-auto truncate flex items-center justify-center text-center transition"
        >
          Editar Perfil
        </Link>
        <Link
          to="/dashboard/mis-negocios/crear"
          className="h-10 px-4 bg-[#000] text-[#fff] hover:text-[#000] hover:bg-[#fff] text-sm  rounded-md flex-1 sm:flex-auto truncate flex items-center justify-center text-center transition"
        >
          Agregar Negocio
        </Link>
      </div>
    </div>
  );
}
