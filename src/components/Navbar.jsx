import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";
import { FaStore, FaCalendarAlt, FaUsers, FaTags } from "react-icons/fa";
import Icon from "../assets/logo_icono.svg";

export default function Header() {
  const usuario = useSelector((state) => state.auth.usuario);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [accionesOpen, setAccionesOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "auto";
  }, [mobileOpen]);

  const navLinks = [
    { to: "/negocios", icon: <FaStore />, label: "NEGOCIOS" },
    { to: "/eventos", icon: <FaCalendarAlt />, label: "EVENTOS" },
    { to: "/comunidades", icon: <FaUsers />, label: "COMUNIDADES" },
    { to: "/promociones", icon: <FaTags />, label: "PROMOCIONES" },
  ];

  const subNavLinks = [
    { to: "/about", label: "SOBRE NOSOTROS" },
    { to: "/contact", label: "CONTÁCTANOS" },
    { to: "/legal-privacy", label: "PRIVACIDAD" },
    { to: "/legal-terms", label: "TÉRMINOS" },
  ];

  return (
    <>
      {/* Banner superior */}
      <div className="w-full bg-orange-500 text-white text-center py-1 text-sm z-50">
        ✨ Juntos construimos una comunidad que apoya, inspira y crece unida
      </div>

      {/* Nav principal */}
      <header className="bg-white shadow sticky top-0 z-50">
        <div className="flex items-center justify-between px-6  lg:px-10 py-1">
          {/* Logo */}
          <Link to="/">
            <img src={Icon} alt="Communities logo" className="h-20" />
          </Link>

          {/* Links desktop */}
          <nav className="hidden md:flex gap-6 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="flex items-center gap-1 text-black text-sm font-semibold hover:text-orange-500 transition"
              >
                {link.icon}
                {link.label}
              </Link>
            ))}

            {/* Perfil */}
            <Link
              to={usuario ? "/dashboard/perfil" : "/login"}
              className="bg-yellow-400 hover:bg-orange-500 text-black text-sm font-bold px-4 py-2 rounded transition"
            >
              {usuario ? "PERFIL" : "ENTRAR"}
            </Link>
          </nav>

          {/* Botón Mobile */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-2xl text-black"
          >
            {mobileOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Subnav con Dropdown */}
        <div className="hidden md:flex justify-center bg-gray-100 border-t border-gray-200 relative">
          {subNavLinks.map((link, idx) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-xs text-gray-600 hover:text-orange-500 font-medium px-3 py-2 transition relative"
            >
              {link.label}
              {idx < subNavLinks.length - 1 && (
                <span className="absolute right-0 top-1/2 transform -translate-y-1/2 w-px h-4 bg-gray-300" />
              )}
            </Link>
          ))}

          {/* Dropdown Acciones */}
          <div className="relative">
            <button
              onClick={() => setAccionesOpen(!accionesOpen)}
              className="flex items-center gap-1 text-xs font-semibold text-white bg-yellow-400 hover:bg-yellow-500 transition px-3 py-2 rounded ml-4"
            >
              + PUBLICAR
              <FiChevronDown className="text-base" />
            </button>
            {accionesOpen && (
              <div className="absolute right-0 mt-2 bg-white border border-gray-200 shadow-lg rounded w-48 z-50">
                <Link
                  to="/dashboard/mis-negocios/crear"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Crear Negocio
                </Link>
                <Link
                  to="/dashboard/mis-eventos/crear"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Crear Evento
                </Link>
                <Link
                  to="/dashboard/comunidades/crear"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Crear Comunidad
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`absolute left-0 top-0 w-72 h-full bg-white p-6 transform transition-transform duration-300 ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          } flex flex-col gap-6`}
        >
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 text-black font-semibold text-base hover:text-orange-500 transition"
            >
              {link.icon}
              {link.label}
            </Link>
          ))}

          <Link
            to="/dashboard/mis-negocios/crear"
            onClick={() => setMobileOpen(false)}
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-4 py-2 rounded transition text-center"
          >
            + PUBLICAR NEGOCIO
          </Link>

          <Link
            to={usuario ? "/dashboard/perfil" : "/login"}
            onClick={() => setMobileOpen(false)}
            className="text-black font-semibold text-base hover:text-orange-500 transition"
          >
            {usuario ? "PERFIL" : "ENTRAR"}
          </Link>
        </div>
      </div>
    </>
  );
}
