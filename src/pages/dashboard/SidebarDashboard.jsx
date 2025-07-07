import {
  MdPerson,
  MdStore,
  MdEvent,
  MdGroups,
  MdLocalOffer,
  MdCategory,
  MdStar,
  MdLogout,
} from "react-icons/md";
import { NavLink } from "react-router-dom";
import authBg from "../../assets/authbg.png";

const SidebarDashboard = ({ usuario, handleLogout }) => {
  const navItems = [
    { to: "perfil", label: "Mi perfil", icon: <MdPerson /> },
    { to: "mis-negocios", label: "Mis negocios", icon: <MdStore /> },
    { to: "mis-eventos", label: "Mis eventos", icon: <MdEvent /> },
    { to: "comunidades", label: "Mis comunidades", icon: <MdGroups /> },
    { to: "mis-promos", label: "Mis promos", icon: <MdLocalOffer /> },
  ];

  const adminItem = {
    to: "categorias",
    label: "Mis categorías",
    icon: <MdCategory />,
  };

  return (
    <aside
      className="sticky top-0 h-[calc(100vh-0px)] w-20 md:w-64 lg:w-80 px-2 md:px-4 py-5 flex-shrink-0 relative overflow-hidden z-10 shadow-[4px_0_10px_-2px_rgba(0,0,0,0.3)]"
      style={{
        backgroundImage: `url(${authBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay con blur y oscurecimiento */}
      <div className="absolute inset-0 backdrop-blur-sm bg-black/20 pointer-events-none" />

      <div className="flex flex-col justify-between h-full px-2 py-18 md:px-4 relative z-10 pb-16">
        {/* Encabezado */}
        <div className="hidden md:flex flex-col gap-1 mb-4">
          <div className="flex items-center justify-between">
            <h1 className="text-white text-base font-medium leading-normal">
              Dashboard
            </h1>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm text-gray-200 hover:text-black hover:cursor-pointer  transition"
            >
              <MdLogout className="text-lg" />
              <span>Cerrar sesión</span>
            </button>
          </div>
          <p className="text-gray-200 text-sm font-normal leading-normal">
            {usuario?.name} • {usuario?.title || "Usuario"}
          </p>
        </div>

        {/* Navegación */}
        <div className="flex flex-col gap-2 flex-1">
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
              `flex items-center gap-3 px-3 py-2 rounded-full transition ${
                isActive
                  ? "bg-purple-700/30 text-white"
                  : "text-[#FCD34D] hover:bg-yellow-500/20"
              }`
            }
          >
            <span className="text-xl">
              <MdStar />
            </span>
            <p className="hidden md:block text-sm font-medium leading-normal">
              💎 Hazte Premium
            </p>
          </NavLink>
        </div>
      </div>
    </aside>
  );
};

export default SidebarDashboard;
