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
import { cerrarMenu } from "../../store/mobileMenuSlice"; // Asegurate de que la ruta sea correcta
import { RiCoupon3Line, RiStore2Line } from "react-icons/ri";

export default function MobileFooterDashboard({ usuario }) {
  const [show, setShow] = useState(true);
  const lastScrollY = useRef(0);
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  // Cierra el menú global mobile cuando cambia la ruta
  useEffect(() => {
    dispatch(cerrarMenu());
  }, [pathname, dispatch]);

  const navItems = [
    { to: "mis-negocios", icon: <RiStore2Line size={24} /> },
    { to: "mis-eventos", icon: <LuCalendarDays size={24} /> },
    { to: "mis-comunidades", icon: <LuUsers size={24} /> },
    { to: "mis-promos", icon: <LuTags size={24} /> },
    { to: "cupones", label: "Mis cupones", icon: <RiCoupon3Line size={24} /> },
    {
      to: "redimir",
      label: "Redimir Cupones",
      icon: <LuRefreshCcw size={24} />,
    },
  ];

  const adminItem = {
    to: "categorias",
    icon: <LuLayoutGrid size={24} />,
  };

  const allItems =
    usuario?.role === "admin" ? [...navItems, adminItem] : navItems;

  const allRoutes = allItems.map((i) => i.to);
  const activeIndex = allRoutes.findIndex((route) => pathname.includes(route));

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

  const columns = allItems.length;
  const widthClass = `w-1/${columns}`;

  return (
    <div
      className={`
        md:hidden fixed left-0 right-0 bg-white border-t border-gray-200 z-50 shadow-lg
        transition-all duration-500
      `}
      style={{
        bottom: show ? 0 : "-100%",
      }}
    >
      <nav
        className={`relative grid grid-cols-${columns}`}
        style={{
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        }}
      >
        <div
          className={`absolute top-0 left-0 h-full ${widthClass} transition-transform duration-300`}
          style={{
            transform: `translateX(${activeIndex * 100}%)`,
          }}
        >
          <div className="w-full h-full bg-orange-100" />
        </div>

        {allItems.map(({ to, icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `relative flex flex-col items-center justify-center py-3 transition-colors duration-200 ${
                isActive
                  ? "text-orange-600"
                  : "text-gray-500 hover:text-orange-500"
              }`
            }
          >
            {icon}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
