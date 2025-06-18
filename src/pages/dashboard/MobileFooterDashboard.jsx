import {
  MdStore,
  MdEvent,
  MdGroups,
  MdLocalOffer,
  MdCategory,
} from "react-icons/md";
import { NavLink } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

export default function MobileFooterDashboard({ usuario }) {
  const [show, setShow] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const diff = currentScrollY - lastScrollY.current;

      const isBottom =
        window.innerHeight + currentScrollY >= document.body.offsetHeight - 50;

      if (isBottom) {
        setShow(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      if (Math.abs(diff) < 10) return; // Ignora scrolls muy pequeños

      if (diff < 0 && currentScrollY > 100) {
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

  const navItems = [
    { to: "mis-negocios", label: "Negocios", icon: <MdStore /> },
    { to: "mis-eventos", label: "Eventos", icon: <MdEvent /> },
    { to: "comunidades", label: "Comunidad", icon: <MdGroups /> },
    { to: "mis-promos", label: "Promos", icon: <MdLocalOffer /> },
  ];

  const adminItem = {
    to: "categorias",
    label: "Categorías",
    icon: <MdCategory />,
  };

  return (
    <div
      className={`md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 shadow-md transition-all duration-300 transform ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <nav className="flex justify-around items-center h-16 text-sm text-gray-700">
        {navItems.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center text-xs ${
                isActive ? "text-[#FB8500]" : ""
              }`
            }
          >
            <span className="text-xl">{icon}</span>
            {label}
          </NavLink>
        ))}

        {usuario?.role === "admin" && (
          <NavLink
            to={adminItem.to}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center text-xs ${
                isActive ? "text-[#FB8500]" : ""
              }`
            }
          >
            <span className="text-xl">{adminItem.icon}</span>
            {adminItem.label}
          </NavLink>
        )}
      </nav>
    </div>
  );
}
