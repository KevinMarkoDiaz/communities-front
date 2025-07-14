import {
  MdPerson,
  MdStore,
  MdEvent,
  MdGroups,
  MdLocalOffer,
  MdCategory,
  MdLogout,
} from "react-icons/md";
import { NavLink } from "react-router-dom";
import authBg from "../../assets/authbg.png";
import { FaRocket } from "react-icons/fa";

const SidebarDashboard = ({ usuario, handleLogout }) => {
  const navItems = [
    { to: "perfil", label: "Mi perfil", icon: <MdPerson /> },
    { to: "mis-negocios", label: "Mis negocios", icon: <MdStore /> },
    { to: "mis-eventos", label: "Mis eventos", icon: <MdEvent /> },
    { to: "mis-comunidades", label: "Mis comunidades", icon: <MdGroups /> },
    { to: "mis-promos", label: "Mis promos", icon: <MdLocalOffer /> },
  ];

  const adminItem = {
    to: "categorias",
    label: "Mis categorías",
    icon: <MdCategory />,
  };

  return (
    <aside
      className="fixed top-0 left-0 h-screen w-20 md:w-54 lg:w-80 px-2 md:pt-45 md:px-0 flex-shrink-0 z-10 shadow-[4px_0_10px_-2px_rgba(0,0,0,0.3)]"
      style={{
        backgroundImage: `url(${authBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay con blur y oscurecimiento */}
      <div className="absolute inset-0 backdrop-blur-sm bg-black/20 pointer-events-none" />

      <div className="flex flex-col justify-between h-full relative z-10">
        {/* Encabezado */}
        <div className="w-full">
          <div className="hidden md:flex w-full bg-black text-white px-3 py-3 mb-4">
            <h1 className="text-base font-semibold leading-normal">
              Dashboard
            </h1>
          </div>
          <div className="hidden md:flex flex-col gap-1 px-4">
            <p className="text-gray-00 text-sm font-bold leading-normal">
              {usuario?.name} {usuario?.title}
            </p>
          </div>
        </div>

        {/* Navegación */}
        <div className="flex flex-col gap-2 flex-1 px-4 mt-4">
          {navItems.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-full transition ${
                  isActive
                    ? "bg-purple-700/30 text-white"
                    : "text-gray-100 hover:bg-orange-500/20"
                }`
              }
            >
              <span className="text-xl">{icon}</span>
              <p className="hidden md:block text-sm font-medium leading-normal">
                {label}
              </p>
            </NavLink>
          ))}

          {usuario?.role === "admin" && (
            <NavLink
              to={adminItem.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-full transition ${
                  isActive
                    ? "bg-purple-700/30 text-white"
                    : "text-gray-100 hover:bg-orange-500/20"
                }`
              }
            >
              <span className="text-xl">{adminItem.icon}</span>
              <p className="hidden md:block text-sm font-medium leading-normal">
                {adminItem.label}
              </p>
            </NavLink>
          )}

          <NavLink
            to="/premium"
            className={({ isActive }) =>
              `group relative flex items-center gap-3 px-4 py-2 rounded-full border border-white text-white font-semibold transition-all overflow-hidden
     ${
       isActive
         ? "shadow-[0_0_12px_rgba(255,255,255,0.4)]"
         : "hover:border-green-400 hover:text-green-400 hover:shadow-[0_0_20px_rgba(34,197,94,0.5)]"
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

        {/* Botón cerrar sesión fijo abajo */}
        <div className="hidden md:flex w-full px-3 py-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 text-sm text-gray-200 hover:bg-black/50 hover:text-white transition rounded-full py-2"
          >
            <MdLogout className="text-lg" />
            <span>Cerrar sesión</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default SidebarDashboard;
