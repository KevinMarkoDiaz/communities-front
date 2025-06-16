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
    <aside className="w-20 md:w-64 lg:w-80 px-2 md:px-4 py-5 bg-[#F8F9FB] flex-shrink-0">
      <div className="flex flex-col justify-between h-[calc(100vh-15vh)] md:min-h-[700px] bg-[#F8F9FB] p-2 md:p-4">
        {/* Encabezado */}
        <div className="hidden md:flex flex-col mb-4">
          <h1 className="text-[#141C24] text-base font-medium leading-normal">
            Dashboard
          </h1>
          <p className="text-[#3F5374] text-sm font-normal leading-normal">
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
                `flex items-center gap-3 px-3 py-2 rounded-full ${
                  isActive ? "bg-[#E4E9F1]" : ""
                }`
              }
            >
              <span className="text-xl">{icon}</span>
              <p className="hidden md:block text-[#141C24] text-sm font-medium leading-normal">
                {label}
              </p>
            </NavLink>
          ))}

          {usuario?.role === "admin" && (
            <NavLink
              to={adminItem.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-full ${
                  isActive ? "bg-[#E4E9F1]" : ""
                }`
              }
            >
              <span className="text-xl">{adminItem.icon}</span>
              <p className="hidden md:block text-[#141C24] text-sm font-medium leading-normal">
                {adminItem.label}
              </p>
            </NavLink>
          )}

          <NavLink
            to="/premium"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-full ${
                isActive ? "bg-[#F3E8FF]" : ""
              }`
            }
          >
            <span className="text-xl text-[#7C3AED]">
              <MdStar />
            </span>
            <p className="hidden md:block text-[#7C3AED] text-sm font-medium leading-normal">
              💎 Hazte Premium
            </p>
          </NavLink>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-gray-200 rounded"
        >
          <span className="text-xl">
            <MdLogout />
          </span>
          <p className="hidden md:block text-[#141C24] text-sm font-medium leading-normal">
            Cerrar sesión
          </p>
        </button>
      </div>
    </aside>
  );
};

export default SidebarDashboard;
