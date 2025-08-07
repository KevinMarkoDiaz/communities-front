import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
  LuCalendarDays,
  LuUsers,
  LuTags,
  LuLayoutGrid,
  LuRefreshCcw,
} from "react-icons/lu";
import { useDispatch } from "react-redux";
import { cerrarMenu } from "../../store/mobileMenuSlice";
import { RiCoupon3Line, RiStore2Line } from "react-icons/ri";

export default function MobileFooterDashboard({ usuario }) {
  const [show, setShow] = useState(true);
  const lastScrollY = useRef(0);
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(cerrarMenu());
  }, [pathname, dispatch]);

  const navItems = [
    {
      to: "mis-negocios",
      label: "Mis negocios",
      icon: <RiStore2Line size={24} />,
    },
    {
      to: "mis-eventos",
      label: "Mis eventos",
      icon: <LuCalendarDays size={24} />,
    },
    { to: "mis-promos", label: "Promos", icon: <LuTags size={24} /> },
    { to: "cupones", label: "Cupones", icon: <RiCoupon3Line size={24} /> },
    { to: "redimir", label: "Redimir", icon: <LuRefreshCcw size={24} /> },
  ];

  const adminItem = [
    { to: "categorias", label: "Categorías", icon: <LuLayoutGrid size={24} /> },
    {
      to: "mis-comunidades",
      label: "Comunidades",
      icon: <LuUsers size={24} />,
    },
  ];

  const allItems =
    usuario?.role === "admin" ? [...navItems, ...adminItem] : navItems;

  const allRoutes = allItems.map((i) => i.to);
  const activeIndex = allRoutes.findIndex((route) => pathname.includes(route));
  const columns = allItems.length;
  const widthClass = `w-1/${columns}`;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const diff = currentScrollY - lastScrollY.current;

      const isBottom =
        window.innerHeight + currentScrollY >= document.body.offsetHeight - 50;

      if (currentScrollY < 20 || isBottom) {
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

  return (
    <div
      className={`md:hidden fixed left-0 right-0 bg-white border-t-2 border-orange-500 z-50 transition-all duration-500`}
      style={{ bottom: show ? 0 : "-100%" }}
    >
      <nav
        className={`relative grid grid-cols-${columns}`}
        style={{
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        }}
      >
        {/* Fondo deslizante */}
        <div
          className={`absolute top-0 left-0 h-full ${widthClass} transition-transform duration-300`}
          style={{
            transform: `translateX(${activeIndex * 100}%)`,
          }}
        >
          <div className="w-full h-full bg-orange-100" />
        </div>

        {/* Botones */}
        {allItems.map(({ to, icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `relative flex flex-col items-center justify-center py-3 transition-colors duration-200 ${
                isActive
                  ? "text-white bg-orange-500"
                  : "text-gray-500 hover:text-orange-500"
              }`
            }
          >
            {icon}
            {/* ⛔️ Solo se muestra el label si NO es admin */}
            {usuario?.role !== "admin" && (
              <span className="text-[10px] mt-1">{label}</span>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
