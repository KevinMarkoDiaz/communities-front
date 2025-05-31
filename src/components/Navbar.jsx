import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Icon from "../assets/logo.png";
import colIcon from "../assets/col.png";

export default function Header() {
  const usuario = useSelector((state) => state.auth.usuario);
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowSticky(window.scrollY > 120);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const NavLinks = () => (
    <nav className="flex items-center gap-6 text-sm">
      <Link to="/negocios" className="hover:text-[#FB8500]">
        Business
      </Link>
      <Link to="/eventos" className="hover:text-[#FB8500]">
        Events
      </Link>
      <Link to="/comunidades" className="hover:text-[#FB8500]">
        Communities
      </Link>
      <Link to="/promociones" className="hover:text-[#FB8500]">
        Promos
      </Link>
    </nav>
  );

  const PerfilBtn = () => (
    <Link
      to={usuario ? "/dashboard/perfil" : "/login"}
      className="flex items-center justify-center h-9 px-4 bg-[#F4C753] text-[#141C24] text-sm font-bold rounded-xl hover:bg-[#e7b93e] transition"
    >
      {usuario ? "Perfil" : "Entrar"}
    </Link>
  );

  return (
    <>
      {/* Header principal */}
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
            <PerfilBtn />
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

      {/* Sticky Header */}
      <div
        className={`fixed top-0 left-0 right-0 bg-white border-b border-[#E4E9F1] shadow-sm transition-all duration-300 transform ${
          showSticky
            ? "translate-y-0 opacity-100 z-50"
            : "-translate-y-full opacity-0 z-0"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-2">
          <div className="flex items-center gap-2">
            <Link to="/" className="text-base font-bold">
              <img src={Icon} alt="logo" className="h-10" />
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <NavLinks />
            <PerfilBtn />
          </div>
        </div>
      </div>
    </>
  );
}
