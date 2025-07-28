import {
  MdPerson,
  MdStore,
  MdEvent,
  MdGroups,
  MdLocalOffer,
  MdCategory,
  MdLogout,
  MdArrowRight,
} from "react-icons/md";
import { NavLink } from "react-router-dom";
import { FaRocket } from "react-icons/fa";

const SidebarDashboard = ({ usuario, handleLogout }) => {
  const isAdmin = ["admin"].includes(usuario?.role);

  const navItems = [
    { to: "perfil", label: "Mi perfil", icon: <MdPerson /> },
    { to: "mis-negocios", label: "Mis negocios", icon: <MdStore /> },
    { to: "mis-eventos", label: "Mis eventos", icon: <MdEvent /> },
    { to: "cupones", label: "Mis cupones", icon: <MdStore /> },
    { to: "redimir", label: "Redimir Cupones", icon: <MdStore /> },

    isAdmin && {
      to: "mis-comunidades",
      label: "Mis comunidades",
      icon: <MdGroups />,
    },
    { to: "mis-promos", label: "Mis promos", icon: <MdLocalOffer /> },
  ].filter(Boolean); // Elimina falsos si el usuario no es admin

  const adminItem = {
    to: "categorias",
    label: "Mis categorías",
    icon: <MdCategory />,
  };

  return (
    <aside
      className="
  relative top-0 left-0 h-full w-20 md:w-60 lg:w-68 flex flex-col z-10 
  bg-gradient-to-br from-orange-500 via-red-500 
  bg-fixed
"
    >
      {" "}
      {/* Overlay opcional */}
      <div className="absolute inset-0 backdrop-blur-sm bg-black/20 pointer-events-none" />
      {/* Contenedor principal con flex-1 y overflow-y-auto */}
      <div className="flex flex-col gap-8 justify-start flex-1 relative z-10 overflow-y-auto">
        {/* Encabezado */}
        <div className="w-full">
          <div className="hidden md:flex w-full bg-black/40 text-white px-3 py-3 mb-4 rounded-br-xl">
            <h1 className="text-base font-semibold leading-normal">
              Dashboard
            </h1>
          </div>
          <div className="hidden md:flex flex-col gap-1 px-4">
            <p className="text-gray-100 text-sm font-bold leading-normal">
              {usuario?.name} {usuario?.title}
            </p>
          </div>
        </div>

        {/* Navegación */}
        <div className="flex flex-col gap-2 px-4 mt-4">
          {navItems.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `group relative flex text-white text-white items-center justify-between gap-3 px-3 py-2 rounded-tr-2xl transition ${
                  isActive ? "bg-orange-500/90 active " : ""
                }`
              }
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{icon}</span>
                <p className="hidden md:block text-sm font-medium leading-normal truncate ">
                  {label}
                </p>
              </div>

              {/* Icono indicador */}
              <span
                className="
          text-xl text-white
          opacity-0
          group-hover:opacity-100
          group-[.active]:opacity-100
          transition-opacity duration-300 ease-out
        "
              >
                <MdArrowRight />
              </span>
            </NavLink>
          ))}

          {usuario?.role === "admin" && (
            <NavLink
              to={adminItem.to}
              className={({ isActive }) =>
                `group relative flex text-white text-white items-center justify-between gap-3 px-3 py-2 rounded-tr-2xl transition ${
                  isActive ? "bg-orange-500/90 active " : ""
                }`
              }
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{adminItem.icon}</span>
                <p className="hidden md:block text-sm font-medium leading-normal">
                  {adminItem.label}
                </p>
              </div>

              <span
                className="
          text-xl text-white
          opacity-0
          group-hover:opacity-100
          group-[.active]:opacity-100
          transition-opacity duration-300 ease-out
        "
              >
                <MdArrowRight />
              </span>
            </NavLink>
          )}

          {/* Botón premium igual que antes */}
        </div>

        <NavLink
          to="/premium"
          className={({ isActive }) =>
            `group relative flex items-center gap-3 mx-4 px-4 py-2 rounded-md border border-white text-white font-semibold transition-all overflow-hidden
${
  isActive
    ? "shadow-[0_0_12px_rgba(255,255,255,0.4)]"
    : "hover:border-green-200 hover:text-white hover:shadow-[0_0_20px_rgba(34,197,94,0.5)]"
}`
          }
        >
          {/* Efecto shimmer */}
          <span
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
-translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"
          />

          <span className="relative z-10 text-xl">
            <FaRocket />
          </span>
          <p className="hidden md:block relative z-10 text-sm font-semibold">
            Dale un impulso a tu cuenta
          </p>
        </NavLink>
      </div>
      {/* Botón cerrar sesión siempre visible abajo */}
      <div className="sticky bottom-0 w-full px-3 py-3 z-20 bg-gradient-to-br from-red-400 via-red-500 to-orange-500">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 text-sm text-white hover:bg-black/40 hover:text-white transition rounded-full py-2"
        >
          <MdLogout className="text-lg" />
          <span>Cerrar sesión</span>
        </button>
      </div>
    </aside>
  );
};

export default SidebarDashboard;
