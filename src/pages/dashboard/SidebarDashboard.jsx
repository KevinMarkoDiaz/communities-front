import {
  MdPerson,
  MdStore,
  MdEvent,
  MdGroups,
  MdLocalOffer,
  MdCategory,
  MdLogout,
  MdArrowRight,
  MdOutlineAdsClick,
} from "react-icons/md";
import { NavLink } from "react-router-dom";
import { FaRocket } from "react-icons/fa";
import { RiAdvertisementLine, RiCoupon3Line } from "react-icons/ri";

const SidebarDashboard = ({ usuario, handleLogout }) => {
  const isAdmin = usuario?.role === "admin";

  // Rutas de USUARIO (siempre bajo /dashboard/ ...)
  const userItems = [
    { to: "/dashboard/perfil", label: "Mi perfil", icon: <MdPerson /> },
    { to: "/dashboard/mis-negocios", label: "Mis negocios", icon: <MdStore /> },
    { to: "/dashboard/mis-eventos", label: "Mis eventos", icon: <MdEvent /> },
    { to: "/dashboard/cupones", label: "Mis cupones", icon: <RiCoupon3Line /> },
    { to: "/dashboard/redimir", label: "Redimir Cupones", icon: <MdStore /> },
    {
      to: "/dashboard/mis-banners",
      label: "Mis banners",
      icon: <MdOutlineAdsClick />,
    },

    // En tu router existe "mis-comunidades" bajo /dashboard (listado y detalle)

    {
      to: "/dashboard/mis-promos",
      label: "Mis promos",
      icon: <MdLocalOffer />,
    },
  ];

  // Rutas de ADMIN (solo si role=admin) bajo /dashboard-admin/ ...
  const adminItems = [
    {
      to: "/dashboard-admin/mis-categorias",
      label: "Categorías (admin)",
      icon: <MdCategory />,
    },
    {
      to: "/dashboard-admin/mis-comunidades",
      label: "Comunidades (admin)",
      icon: <MdGroups />,
    },
    {
      to: "/dashboard-admin/banners",
      label: "Banners / Ads",
      icon: <RiAdvertisementLine />,
    },
  ];

  const itemClasses = (isActive) =>
    `group relative flex text-white items-center justify-between gap-3 px-3 py-2 rounded-tr-2xl transition ${
      isActive ? "bg-orange-500/90 active" : ""
    }`;

  return (
    <aside
      className="
        relative top-0 left-0 h-full w-20 md:w-60 lg:w-68 flex flex-col z-10 
        bg-gradient-to-br from-orange-500 via-red-500 
        bg-fixed
      "
    >
      {/* Overlay */}
      <div className="absolute inset-0 backdrop-blur-sm bg-black/20 pointer-events-none" />

      {/* Contenido scrollable */}
      <div className="flex flex-col gap-8 justify-start flex-1 relative z-10 overflow-y-auto">
        {/* Header */}
        <div className="w-full">
          <div className="hidden md:flex w-full bg-black/40 text-white px-3 py-3 mb-4 rounded-br-xl">
            <h1 className="text-base font-semibold leading-normal">
              Dashboard
            </h1>
          </div>
          <div className="hidden md:flex flex-col gap-1 px-4">
            <p className="text-gray-100 text-xs font-bold leading-normal">
              {usuario?.name} {usuario?.title}
            </p>
          </div>
        </div>

        {/* Grupo: Mi cuenta */}
        <div className="flex flex-col gap-2 px-4 mt-4">
          {userItems.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => itemClasses(isActive)}
            >
              <div className="flex items-center gap-3">
                <span className=" text-lg">{icon}</span>
                <p className="hidden md:block text-xs font-medium leading-normal truncate">
                  {label}
                </p>
              </div>
              <span className=" text-lg text-white opacity-0 group-hover:opacity-100 group-[.active]:opacity-100 transition-opacity duration-300 ease-out">
                <MdArrowRight />
              </span>
            </NavLink>
          ))}
        </div>

        {/* Grupo: Admin */}
        {isAdmin && (
          <div className="flex flex-col gap-2 px-4 mt-6">
            <div className="hidden md:block text-white/80 text-xs uppercase tracking-wide px-1 mb-1">
              Admin
            </div>
            {adminItems.map(({ to, label, icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) => itemClasses(isActive)}
              >
                <div className="flex items-center gap-3">
                  <span className=" text-lg">{icon}</span>
                  <p className="hidden md:block text-xs font-medium leading-normal truncate">
                    {label}
                  </p>
                </div>
                <span className=" text-lg text-white opacity-0 group-hover:opacity-100 group-[.active]:opacity-100 transition-opacity duration-300 ease-out">
                  <MdArrowRight />
                </span>
              </NavLink>
            ))}
          </div>
        )}

        {/* CTA Premium */}
        <NavLink
          to="/premium"
          className={({ isActive }) =>
            `group hidden relative flex items-center gap-3 mx-4 px-4 py-2 rounded-md border border-white text-white font-semibold transition-all overflow-hidden ${
              isActive
                ? "shadow-[0_0_12px_rgba(255,255,255,0.4)]"
                : "hover:border-green-200 hover:text-white hover:shadow-[0_0_20px_rgba(34,197,94,0.5)]"
            }`
          }
        >
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
          <span className="relative z-10  text-lg">
            <FaRocket />
          </span>
          <p className="hidden md:block relative z-10 text-xs font-semibold">
            Dale un impulso a tu cuenta
          </p>
        </NavLink>
      </div>

      {/* Logout */}
      <div className="sticky bottom-0 w-full px-3 py-3 z-20 bg-gradient-to-br from-red-400 via-red-500 to-orange-500">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 text-xs text-white hover:bg-black/40 hover:text-white transition rounded-full py-2"
        >
          <MdLogout className="text-lg" />
          <span>Cerrar sesión</span>
        </button>
      </div>
    </aside>
  );
};

export default SidebarDashboard;
