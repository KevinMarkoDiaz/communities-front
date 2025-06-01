// src/components/dashboard/HeaderDashboard.jsx
import { Link } from "react-router-dom";
import Icon from "../../assets/logo.png";
import colIcon from "../../assets/col.png";
import { NavLinks } from "./NavLinks";
import { PerfilBtn } from "./PerfilBtn";

export default function HeaderDashboard({ usuario }) {
  return (
    <header className="px-6 sm:px-10 py-4 bg-white border-b border-[#E4E9F1] text-[#141C24] z-20 relative">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={colIcon} alt="icono bandera" className="h-6" />
          <Link to="/" className="text-xl font-extrabold">
            <img src={Icon} alt="Communities logo" className="h-10" />
          </Link>
        </div>

        <div className="flex items-center gap-6">
          <NavLinks />
          <PerfilBtn usuario={usuario} />
          {usuario && (
            <div
              className="w-9 h-9 rounded-full bg-cover bg-center"
              style={{
                backgroundImage: `url(${
                  usuario.profileImage || "/avatar-placeholder.png"
                })`,
              }}
            />
          )}
        </div>
      </div>
    </header>
  );
}
