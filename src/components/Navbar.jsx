import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FiMenu, FiX, FiChevronDown, FiChevronRight } from "react-icons/fi";
import {
  MdStore,
  MdEvent,
  MdGroups,
  MdLocalOffer,
  MdCategory,
  MdPerson,
  MdAddCircle,
} from "react-icons/md";
import Icon from "../assets/logo_icono.svg";
import IconMobile from "../assets/logo_negro.svg";
import Icono from "../assets/icono.svg";

export default function Header() {
  const usuario = useSelector((state) => state.auth.usuario);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [accionesOpen, setAccionesOpen] = useState(false);
  const [show, setShow] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "auto";
  }, [mobileOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const diff = currentScrollY - lastScrollY.current;

      const isTop = currentScrollY < 50;
      const isBottom =
        window.innerHeight + currentScrollY >= document.body.offsetHeight - 50;

      if (isTop || isBottom) {
        setShow(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      if (Math.abs(diff) < 10) return;

      if (diff < 0) {
        setShow(true);
      } else {
        setShow(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { to: "/negocios", icon: <MdStore />, label: "NEGOCIOS" },
    { to: "/eventos", icon: <MdEvent />, label: "EVENTOS" },
    { to: "/comunidades", icon: <MdGroups />, label: "COMUNIDADES" },
    { to: "/promociones", icon: <MdLocalOffer />, label: "PROMOCIONES" },
  ];

  const subNavLinks = [
    { to: "/about", label: "SOBRE NOSOTROS" },
    { to: "/contact", label: "CONTÁCTANOS" },
    { to: "/legal-privacy", label: "PRIVACIDAD" },
    { to: "/legal-terms", label: "TÉRMINOS" },
  ];

  return (
    <>
      {/* 🟠 Banner superior SOLO DESKTOP */}
      <div className="hidden md:block w-full bg-orange-500 text-white text-center py-1 text-sm z-50">
        ✨ Juntos construimos una comunidad que apoya, inspira y crece unida
      </div>

      {/* Nav principal */}
      <header
        className={`shadow sticky top-0 z-50 transition-transform duration-300 ${
          show ? "translate-y-0" : "-translate-y-full"
        } ${mobileOpen ? "bg-orange-600" : "bg-white"}`}
      >
        <div className="flex items-center justify-between px-4 lg:px-10 py-1">
          {/* Logo */}
          <Link to="/">
            <img
              src={Icon}
              alt="Communities logo"
              className={`h-20 hidden md:block ${
                mobileOpen ? "filter brightness-0 invert" : ""
              }`}
            />
            <img
              src={IconMobile}
              alt="Communities logo"
              className={`h-12 md:hidden py-1 ${
                mobileOpen ? "filter brightness-0 invert" : ""
              }`}
            />
          </Link>

          {/* Links desktop */}
          <nav className="hidden md:flex gap-6 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-1 text-sm font-semibold transition ${
                  mobileOpen
                    ? "text-white hover:text-yellow-200"
                    : "text-black hover:text-orange-500"
                }`}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}

            {/* Perfil */}
            <Link
              to={usuario ? "/dashboard/perfil" : "/login"}
              className={`${
                mobileOpen
                  ? "bg-white text-orange-600 hover:bg-yellow-100"
                  : "bg-yellow-400 text-black hover:bg-orange-500"
              } text-sm font-bold px-4 py-2 rounded transition`}
            >
              {usuario ? "PERFIL" : "ENTRAR"}
            </Link>
          </nav>

          {/* Botón Mobile */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`md:hidden text-2xl p-2 rounded transition ${
              mobileOpen ? "text-white" : "text-black"
            }`}
          >
            {mobileOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Subnav */}
        <div
          className={`hidden md:flex justify-center border-t border-gray-200 relative ${
            mobileOpen ? "bg-orange-500" : "bg-gray-100"
          }`}
        >
          {subNavLinks.map((link, idx) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-xs font-medium px-3 py-2 transition relative ${
                mobileOpen
                  ? "text-white hover:text-yellow-200"
                  : "text-gray-600 hover:text-orange-500"
              }`}
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
              className={`flex items-center gap-1 text-xs font-semibold transition px-3 py-2 rounded ml-4 ${
                mobileOpen
                  ? "text-orange-600 bg-white hover:bg-yellow-100"
                  : "text-white bg-yellow-400 hover:bg-yellow-500"
              }`}
            >
              + PUBLICAR
              <FiChevronDown className="text-base" />
            </button>
            {accionesOpen && (
              <div className="absolute right-0 mt-2 bg-white border border-gray-200 shadow-lg rounded w-48 z-50">
                <Link
                  to="/dashboard/mis-negocios/crear"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
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

      {/* Overlay oscuro */}
      <div
        className={`fixed inset-0 z-30 bg-black/70 backdrop-blur-sm transition-opacity duration-300  ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Menú lateral full width */}
        <div
          className={`absolute left-0 top-0 w-full h-full bg-orange-600 text-white p-6 py-20 transform transition-transform duration-300 ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          } flex flex-col justify-between font-sans`}
        >
          {/* Top: Logo y Links */}
          <div className="flex flex-col gap-6">
            {/* Logo */}

            {/* Navegación principal */}
            <nav className="flex flex-col gap-4 ">
              <Link
                to={usuario ? "/dashboard/perfil" : "/login"}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 text-base font-medium hover:text-yellow-300 transition  relative z-10"
              >
                <MdPerson className="text-2xl" />
                {usuario ? "Mi Perfil" : "Iniciar Sesión"}
              </Link>
              <Link
                to="/negocios"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 text-base font-medium hover:text-yellow-300 transition  relative z-10"
              >
                <MdStore className="text-2xl" />
                Negocios
              </Link>
              <Link
                to="/eventos"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 text-base font-medium hover:text-yellow-300 transition  relative z-10"
              >
                <MdEvent className="text-2xl" />
                Eventos
              </Link>
              <Link
                to="/comunidades"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 text-base font-medium hover:text-yellow-300 transition  relative z-10"
              >
                <MdGroups className="text-2xl" />
                Comunidades
              </Link>
              <Link
                to="/promociones"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 text-base font-medium hover:text-yellow-300 transition  relative z-10"
              >
                <MdLocalOffer className="text-2xl" />
                Promociones
              </Link>
            </nav>
          </div>
          <div className="flex flex-col gap-2 mt-6 border-t border-orange-300 pt-4  relative z-10">
            <Link
              to="/about"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 text-sm font-normal hover:text-yellow-300 transition"
            >
              <FiChevronRight className="text-base" />
              Acerca de nosotros
            </Link>
            <Link
              to="/contact"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 text-sm font-normal hover:text-yellow-300 transition"
            >
              <FiChevronRight className="text-base" />
              Contáctanos
            </Link>
            <Link
              to="/premium"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 text-sm font-normal hover:text-yellow-300 transition"
            >
              <FiChevronRight className="text-base" />
              Suscripción Premium
            </Link>
          </div>
          <div className="mt-6 flex justify-center  relative z-10">
            <div className="mt-6 flex justify-center relative z-10">
              <div className="relative inline-block">
                <img
                  src={Icono}
                  alt="Logo Communities"
                  className="h-24 opacity-80 relative z-20"
                />
                <span className="orbit-sphere sphere1"></span>
                <span className="orbit-sphere sphere2"></span>
                <span className="orbit-sphere sphere3"></span>
              </div>
            </div>
          </div>

          {/* Acción principal abajo */}
          <Link
            to="/dashboard/mis-negocios/crear"
            onClick={() => setMobileOpen(false)}
            className="
             relative z-10
      flex items-center justify-center gap-2
      bg-white text-orange-600
      font-semibold
      px-4 py-3
      rounded-xl
      shadow-lg
      transition
      text-base
      hover:bg-yellow-100
      active:scale-95
    "
          >
            <MdAddCircle className="text-2xl" />
            Crear Negocio
          </Link>
          <div
            className="
      absolute bottom-0 left-0 w-full h-[90vh]
      bg-gradient-to-t from-black/60 to-transparent
      z-0
    "
          />
        </div>
      </div>
    </>
  );
}
