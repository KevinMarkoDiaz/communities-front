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

  // Mostrar header solo cuando scroll va hacia arriba
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < lastScrollY && currentScrollY > 100) {
        setShow(true);
      } else {
        setShow(false);
        setMenuOpen(false); // cerrar el menú si se esconde el header
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Evitar scroll cuando el menú está abierto
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const NavLinks = () => (
    <nav className="flex flex-col gap-6 text-lg mt-6 text-left">
      <Link to="/negocios" onClick={closeMenu} className="hover:text-[#FB8500]">
        Business
      </Link>
      <Link to="/eventos" onClick={closeMenu} className="hover:text-[#FB8500]">
        Events
      </Link>
      <Link
        to="/comunidades"
        onClick={closeMenu}
        className="hover:text-[#FB8500]"
      >
        Communities
      </Link>
      <Link
        to="/promociones"
        onClick={closeMenu}
        className="hover:text-[#FB8500]"
      >
        Promos
      </Link>
    </nav>
  );

  const PerfilBtn = () => (
    <Link
      to={usuario ? "/dashboard/perfil" : "/login"}
      onClick={closeMenu}
      className="inline-block mt-10 text-[#000]  text-lg font-bold  rounded-full py-2 transition"
    >
      {usuario ? "Perfil" : "Entrar"}
    </Link>
  );

  return (
    <>
      {/* Header sticky */}
      <div
        className={`md:hidden fixed top-0 left-0 right-0 bg-white border-b border-[#E4E9F1] shadow-sm transition-transform duration-300 z-50 ${
          show && !menuOpen ? "translate-y-0 " : "-translate-y-full"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-2">
          <Link to="/" className="flex items-center gap-2">
            <img src={Icon} alt="logo" className="h-9" />
          </Link>

          <div className="flex items-center gap-4">
            <Link
              to={usuario ? "/dashboard/perfil" : "/login"}
              className="text-sm font-medium text-[#fff] bg-[#FB8500] rounded-md px-3 py-1 hover:bg-[#fff] hover:text-[#FB8500] transition"
              onClick={() => setMenuOpen(false)}
            >
              {usuario ? "Perfil" : "Entrar"}
            </Link>

            <button
              className="text-2xl "
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
      </div>

      {/* Menú desplegable */}
      <div
        className={`md:hidden fixed inset-0  z-40 flex flex-col items-left px-6 py-4 overflow-y-auto transition-all duration-300 ${
          menuOpen
            ? "translate-y-0 opacity-100 pointer-events-auto bg-[#FB8500] font-bold text-[#fff]"
            : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="w-full flex justify-between items-center mb-4">
          <Link to="/" onClick={closeMenu}>
            <img src={Icon} alt="logo" className="h-10" />
          </Link>
          <button className="text-2xl" onClick={closeMenu}>
            <FiX />
          </button>
        </div>

        <NavLinks />
        <PerfilBtn />
      </div>
    </>
  );
}
