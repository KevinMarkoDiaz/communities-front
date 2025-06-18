import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FiMenu, FiX } from "react-icons/fi";
import Icon from "../assets/logo.png";

export default function MobileStickyHeader() {
  const usuario = useSelector((state) => state.auth.usuario);
  const [show, setShow] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < lastScrollY && currentScrollY > 100) {
        setShow(true);
      } else {
        setShow(false);
        setMenuOpen(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const NavLinks = () => (
    <nav className="flex flex-col gap-4 mt-6 text-left text-base font-semibold">
      <Link to="/negocios" onClick={closeMenu}>
        Negocios
      </Link>
      <Link to="/eventos" onClick={closeMenu}>
        Eventos
      </Link>
      <Link to="/comunidades" onClick={closeMenu}>
        Comunidades
      </Link>
      <Link to="/promociones" onClick={closeMenu}>
        Promociones
      </Link>
    </nav>
  );

  const PerfilBtn = () => (
    <Link
      to={usuario ? "/dashboard/perfil" : "/login"}
      onClick={closeMenu}
      className="text-[#000] text-md font-bold rounded-md hover:bg-gray-100 transition"
    >
      {usuario ? "Mi perfil" : "Entrar"}
    </Link>
  );

  return (
    <>
      {/* Sticky Header */}
      <div
        className={`md:hidden fixed top-0 left-0 right-0 bg-white border-b border-[#E4E9F1] shadow-sm transition-transform duration-300 z-50 ${
          show && !menuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-2">
          <Link to="/" className="flex items-center gap-2">
            <img src={Icon} alt="logo" className="h-9" />
          </Link>

          <div className="flex items-center gap-4">
            <Link
              to={usuario ? "/dashboard/perfil" : "/login"}
              className="text-sm font-medium text-white bg-[#FB8500] rounded-md px-3 py-1 hover:bg-white hover:text-[#FB8500] transition"
              onClick={() => setMenuOpen(false)}
            >
              {usuario ? "Perfil" : "Entrar"}
            </Link>

            <button
              className="text-2xl text-[#141C24]"
              onClick={() => setMenuOpen(true)}
            >
              <FiMenu />
            </button>
          </div>
        </div>
      </div>

      {/* Menú lateral */}
      <div
        className={`fixed inset-0 z-50 transition-all duration-300 ${
          menuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {/* Overlay oscuro */}
        <div
          className={`absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-300 ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={closeMenu}
        ></div>

        {/* Panel lateral izquierdo */}
        <div
          className={`absolute top-0 left-0 h-full w-full bg-[#FB8500] text-white transform transition-transform duration-300 ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center px-4 py-3 border-b border-white/20">
            <img src={Icon} alt="logo" className="h-8" />
            <button onClick={closeMenu} className="text-2xl">
              <FiX />
            </button>
          </div>

          <div className="px-6 gap-8 flex flex-col">
            <NavLinks />
            <PerfilBtn />
          </div>
        </div>
      </div>
    </>
  );
}
