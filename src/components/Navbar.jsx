import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FiMenu, FiX } from "react-icons/fi";
import Icon from "../assets/logo.png";
import fondoDecorativo from "../assets/NV.svg";

export default function Header() {
  const usuario = useSelector((state) => state.auth.usuario);
  const [showSticky, setShowSticky] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Sticky solo para desktop
  useEffect(() => {
    const handleScroll = () => {
      setShowSticky(window.scrollY > 120);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Previene scroll en mobile
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "auto";
  }, [mobileMenuOpen]);

  const NavLinks = ({ isMobile = false }) => (
    <nav
      className={`${
        isMobile
          ? "flex flex-col gap-6 text-lg mt-14 text-left font-bold text-white w-full"
          : "flex items-center gap-6 text-sm"
      }`}
    >
      <Link to="/negocios" onClick={() => setMobileMenuOpen(false)}>
        Negocios
      </Link>
      <Link to="/eventos" onClick={() => setMobileMenuOpen(false)}>
        Eventos
      </Link>
      <Link to="/comunidades" onClick={() => setMobileMenuOpen(false)}>
        Comunidades
      </Link>
      <Link to="/promociones" onClick={() => setMobileMenuOpen(false)}>
        Promociones
      </Link>
    </nav>
  );

  const PerfilBtn = ({ isMobile = false }) => (
    <Link
      to={usuario ? "/dashboard/perfil" : "/login"}
      onClick={() => setMobileMenuOpen(false)}
      className={`${
        isMobile
          ? "inline-block mt-6 font-bold text-white text-lg underline underline-offset-4 decoration-2 transition"
          : "flex items-center justify-center h-9 px-4 bg-[#F4C753] text-[#141C24] text-sm font-bold rounded-xl hover:bg-[#e7b93e] transition"
      }`}
    >
      {usuario ? "Perfil" : "Entrar"}
    </Link>
  );

  return (
    <>
      {/* Header principal */}
      <header className="px-6 sm:px-10 py-4 bg-white border-b border-[#E4E9F1] text-[#141C24] z-50  relative">
        <div className="flex items-center justify-between relative z-50">
          <Link to="/" className="text-xl font-extrabold">
            <img src={Icon} alt="Communities logo" className="h-10" />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
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

          {/* Botón mobile */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <FiX className="font-bold " /> : <FiMenu />}
          </button>
        </div>
      </header>

      {/* Menú mobile */}
      <div
        className={`md:hidden fixed inset-0 z-40 flex backdrop-blur-sm bg-gray-900/70 transition-opacity duration-300 ${
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Fondo blur + decorativo */}
        <div
          className="absolute inset-0 bg-white/30"
          onClick={() => setMobileMenuOpen(false)}
        />
        <div
          className={`absolute inset-0 bg-center bg-cover transition-all duration-500 ease-in-out transform ${
            mobileMenuOpen
              ? "opacity-50 scale-100"
              : "opacity-0 scale-95 pointer-events-none"
          }`}
          style={{ backgroundImage: `url(${fondoDecorativo})` }}
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Drawer lateral */}
        <div
          className={`relative h-full w-80 px-6 py-8 transform transition-transform duration-300 ${
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <NavLinks isMobile />
          <PerfilBtn isMobile />
        </div>
      </div>

      {/* Sticky Header en desktop */}
      <div
        className={`fixed top-0 left-0 right-0  bg-white  border-b border-[#E4E9F1] shadow-sm transition-all duration-300 transform ${
          showSticky
            ? "translate-y-0 opacity-100 z-40  "
            : "-translate-y-full opacity-0 z-0    "
        }`}
      >
        <div className="flex items-center justify-between px-6 py-2 relative z-50">
          <Link to="/" className="text-base font-bold">
            <img src={Icon} alt="logo" className="h-10" />
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <NavLinks />
            <PerfilBtn />
          </div>
          {/* Botón mobile también en sticky */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <FiX className="font-bold " /> : <FiMenu />}
          </button>
        </div>
      </div>
    </>
  );
}
