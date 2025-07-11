import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
  LuStore,
  LuCalendarDays,
  LuUsers,
  LuTags,
  LuLayoutGrid,
} from "react-icons/lu";

export default function MobileFooterDashboard({ usuario }) {
  const [show, setShow] = useState(true);
  const lastScrollY = useRef(0);
  const { pathname } = useLocation();

  // Definir rutas
  const navItems = [
    { to: "mis-negocios", icon: <LuStore size={24} /> },
    { to: "mis-eventos", icon: <LuCalendarDays size={24} /> },
    { to: "comunidades", icon: <LuUsers size={24} /> },
    { to: "mis-promos", icon: <LuTags size={24} /> },
  ];

  const adminItem = {
    to: "categorias",
    icon: <LuLayoutGrid size={24} />,
  };

  // Combinar ítems
  const allItems =
    usuario?.role === "admin" ? [...navItems, adminItem] : navItems;

  const allRoutes = allItems.map((i) => i.to);
  const activeIndex = allRoutes.findIndex((route) => pathname.includes(route));

  // Scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const diff = currentScrollY - lastScrollY.current;

      const isBottom =
        window.innerHeight + currentScrollY >= document.body.offsetHeight - 50;

      // Siempre mostrar si estamos arriba de todo
      if (currentScrollY < 20) {
        setShow(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      if (isBottom) {
        setShow(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      if (Math.abs(diff) < 10) return;

      if (diff < 0) {
        // Scroll hacia arriba
        setShow(true);
      } else {
        // Scroll hacia abajo
        setShow(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Número de columnas y ancho de cada bloque
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
        {/* Fondo activo */}
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
