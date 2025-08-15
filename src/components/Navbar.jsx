import { useState, useEffect, useRef } from "react";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FiMenu, FiX, FiChevronRight } from "react-icons/fi";
import {
  MdStore,
  MdEvent,
  MdGroups,
  MdLocalOffer,
  MdPerson,
  MdAddCircle,
  MdLogout,
  MdOutlineAdsClick,
} from "react-icons/md";
import Icon from "../assets/logo_icono.svg";
import IconMobile from "../assets/logo_negro.svg";
import Icono from "../assets/icono.svg";
import NotificationButton from "./badges/NotificationButton";
import { logout } from "../store/authSlice";
import BotonPublicar from "./nav/BotonPublicar";
import useDeviceSize from "../hooks/useDeviceSize";
import { cerrarMenu, toggleMenu } from "../store/mobileMenuSlice";
import InboxButton from "./mensajes/InboxButton";
import { RiAdvertisementLine } from "react-icons/ri";

export default function Header() {
  const usuario = useSelector((state) => state.auth.usuario);
  const mobileOpen = useSelector((state) => state.mobileMenu.isOpen);
  const [accionesOpen, setAccionesOpen] = useState(false);
  const [show, setShow] = useState(true);
  const lastScrollY = useRef(0);
  const dispatch = useDispatch();

  const { isMobile, isDesktop } = useDeviceSize();

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "auto";
  }, [mobileOpen]);

  useEffect(() => {
    if (window.innerWidth >= 768) return;

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

      setShow(diff < 0);
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { to: "/negocios", icon: <MdStore />, label: "Negocios" },
    { to: "/eventos", icon: <MdEvent />, label: "Eventos" },
    { to: "/comunidades", icon: <MdGroups />, label: "Comunidades" },
    { to: "/promociones", icon: <MdLocalOffer />, label: "Promociones" },
  ];

  const subNavLinks = [
    { to: "/about", label: "Sobre nosotros" },
    { to: "/contact", label: "Contáctanos" },
    { to: "/legal-privacy", label: "Privacidad" },
    { to: "/legal-terms", label: "Términos" },
  ];

  const handleLogout = () => {
    dispatch(logout());
    Navigate("/");
  };

  return (
    <>
      {/* 🟠 Banner superior SOLO DESKTOP */}
      <div className="hidden md:block w-full bg-orange-500 text-white text-center py-1 2xl:  text-xs z-50">
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

          {/* Links desktop (se mantienen igual) */}
          <nav className="hidden md:flex gap-6 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`flex md:flex-col lg:flex-row items-center justify-center gap-0 md:gap-0.5 lg:gap-1 transition font-medium ${
                  mobileOpen
                    ? "text-white hover:text-yellow-200"
                    : "text-gray-800 hover:text-orange-500"
                }`}
              >
                <span className="text-xl md:text-xl lg:text-base">
                  {link.icon}
                </span>
                <span className="text-[10px] md:text-xs 2xl:  text-xs">
                  {link.label}
                </span>
              </Link>
            ))}

            <div className="md:flex">
              {usuario && <InboxButton />}
              {usuario && isDesktop && <NotificationButton />}
            </div>

            {/* Perfil */}
            <Link
              to={usuario ? "/dashboard/perfil" : "/login"}
              className={`${
                mobileOpen
                  ? "bg-white text-orange-600 hover:bg-yellow-100"
                  : "bg-yellow-400 text-black hover:bg-orange-500"
              } text-xs 2xl:  text-xs font-bold px-4 py-2 rounded transition`}
            >
              {usuario ? "PERFIL" : "ENTRAR"}
            </Link>
          </nav>

          {/* Botones header MOBILE (sin repetir enlaces extra) */}
          <div className="flex items-center gap-2 md:hidden">
            {/* Quitamos Inbox/Notificaciones en mobile header para no duplicar */}
            <button
              onClick={() => dispatch(toggleMenu())}
              className={`  text-xs 2xl:text-md p-2 rounded transition ${
                mobileOpen ? "text-white" : "text-black"
              }`}
              aria-label="Abrir menú"
            >
              {mobileOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>

        {/* Subnav solo desktop (igual que antes) */}
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
          <div className="flex items-center gap-2">
            <BotonPublicar isOpen={accionesOpen} setIsOpen={setAccionesOpen} />
          </div>
        </div>
      </header>

      {/* Overlay oscuro + Menú lateral MOBILE (sin admin ni duplicados) */}
      <div
        className={`fixed inset-0 z-30 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`absolute left-0 top-0 w-full h-full
            bg-gradient-to-br from-orange-400 via-orange-500 to-red-700
            text-white p-6 py-20 transform transition-transform duration-300
            ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
            flex flex-col justify-between font-sans`}
        >
          {/* Navegación principal (solo públicos + perfil/login) */}
          <div className="flex flex-col gap-6">
            <nav className="flex flex-col gap-4">
              <Link
                to={usuario ? "/dashboard/perfil" : "/login"}
                onClick={() => dispatch(toggleMenu())}
                className="flex items-center gap-3 text-base font-medium hover:text-yellow-300 transition relative z-10"
              >
                <MdPerson className="  text-xs 2xl:text-md" />
                {usuario ? "Mi Perfil" : "Iniciar Sesión"}
              </Link>

              <Link
                to="/negocios"
                onClick={() => dispatch(toggleMenu())}
                className="flex items-center gap-3 text-base font-medium hover:text-yellow-300 transition relative z-10"
              >
                <MdStore className="  text-xs 2xl:text-md" />
                Negocios
              </Link>

              <Link
                to="/eventos"
                onClick={() => dispatch(toggleMenu())}
                className="flex items-center gap-3 text-base font-medium hover:text-yellow-300 transition relative z-10"
              >
                <MdEvent className="  text-xs 2xl:text-md" />
                Eventos
              </Link>

              <Link
                to="/dashboard/mis-banners"
                onClick={() => dispatch(toggleMenu())}
                className="flex items-center gap-3 text-base font-medium hover:text-yellow-300 transition relative z-10"
              >
                <MdOutlineAdsClick className="  text-xs 2xl:text-md" />
                Mis banners
              </Link>

              <Link
                to="/promociones"
                onClick={() => dispatch(toggleMenu())}
                className="flex items-center gap-3 text-base font-medium hover:text-yellow-300 transition relative z-10"
              >
                <MdLocalOffer className="  text-xs 2xl:text-md" />
                Promociones
              </Link>

              {usuario?.role === "admin" && (
                <>
                  <Link
                    to="/comunidades"
                    onClick={() => dispatch(toggleMenu())}
                    className="flex items-center gap-3 text-base font-medium hover:text-yellow-300 transition relative z-10"
                  >
                    <MdGroups className="  text-xs 2xl:text-md" />
                    Comunidades
                  </Link>

                  <Link
                    to="/dashboard-admin/banners"
                    onClick={() => dispatch(toggleMenu())}
                    className="flex items-center gap-3 text-base font-medium hover:text-yellow-300 transition relative z-10"
                  >
                    <RiAdvertisementLine className="  text-xs 2xl:text-md" />
                    Ads / Banners
                  </Link>
                </>
              )}
            </nav>
          </div>

          {/* Secundario (about/contact/premium) */}
          <div className="flex flex-col gap-2 mt-6 border-t border-orange-300 pt-4 relative z-10">
            <Link
              to="/about"
              onClick={() => dispatch(toggleMenu())}
              className="flex items-center gap-2 2xl:  text-xs font-normal hover:text-yellow-300 transition"
            >
              <FiChevronRight className="text-base" />
              Acerca de nosotros
            </Link>
            <Link
              to="/contact"
              onClick={() => dispatch(toggleMenu())}
              className="flex items-center gap-2 2xl:  text-xs font-normal hover:text-yellow-300 transition"
            >
              <FiChevronRight className="text-base" />
              Contáctanos
            </Link>
            <Link
              to="/premium"
              onClick={() => dispatch(toggleMenu())}
              className="relative w-fit flex  items-center gap-2 2xl:  text-xs font-semibold text-white rounded-lg pr-4 py-2 overflow-hidden transition"
            >
              {/* Capa animada brillante */}
              <span className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />

              {/* Ícono */}
              <FiChevronRight className="text-base relative z-10" />

              {/* Texto */}
              <span className="relative text-green-400 z-10">
                Suscripción Premium
              </span>
            </Link>
          </div>

          {/* Logo decorativo */}
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

          {/* Logout */}
          <div className="w-full px-3 py-4">
            <button
              onClick={handleLogout}
              className="w-full flex gap-2 2xl:  text-xs text-white relative z-10 transition rounded-full py-2"
            >
              <MdLogout className="text-lg text-white" />
              <span>Cerrar sesión</span>
            </button>
          </div>

          {/* Acción principal abajo */}
          <Link
            to="/dashboard/mis-negocios/crear"
            onClick={() => dispatch(toggleMenu())}
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
            <MdAddCircle className="  text-xs 2xl:text-md" />
            Crear Negocio
          </Link>

          {/* Fondo gradiente */}
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
