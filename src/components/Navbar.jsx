import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Header() {
  const usuario = useSelector((state) => state.auth.usuario);

  return (
    <header className="flex items-center justify-between border-b border-[#E4E9F1] px-10 py-3 bg-white">
      {/* Logo */}
      <div className="flex items-center gap-4 text-[#141C24]">
        <div className="size-4">
          <svg
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M6 6H42L36 24L42 42H6L12 24L6 6Z" fill="currentColor" />
          </svg>
        </div>
        <Link
          to="/"
          className="text-lg font-bold leading-tight tracking-[-0.015em]"
        >
          Communities
        </Link>
      </div>

      {/* Navegación */}
      <div className="flex flex-1 justify-end gap-8 font-sans">
        <nav className="flex items-center gap-9">
          <Link to="/negocios" className="text-sm font-medium text-[#141C24]">
            Business
          </Link>
          <Link to="/eventos" className="text-sm font-medium text-[#141C24]">
            Events
          </Link>
          <Link
            to="/comunidades"
            className="text-sm font-medium text-[#141C24]"
          >
            Communities
          </Link>
        </nav>

        {/* Botón de acción */}
        <Link
          to={usuario ? "/dashboard/perfil" : "/login"}
          className="flex min-w-[84px] items-center justify-center h-10 px-4 bg-[#F4C753] text-[#141C24] text-sm font-bold rounded-xl"
        >
          {usuario ? "Perfil" : "Entrar"}
        </Link>

        {/* Avatar */}
        {usuario && (
          <div
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
            style={{
              backgroundImage: `url(${
                usuario.profileImage || "/avatar-placeholder.png"
              })`,
            }}
          />
        )}
      </div>
    </header>
  );
}
