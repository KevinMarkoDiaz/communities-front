// src/components/nav/BotonPublicar.jsx
import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { createPortal } from "react-dom";
import { FiChevronDown } from "react-icons/fi";

export default function BotonPublicar({ isOpen, setIsOpen }) {
  const btnRef = useRef(null);
  const dropdownRef = useRef(null);
  const [coords, setCoords] = useState({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  });

  // Coloca el menú justo debajo del botón (usando portal => no lo recorta overflow)
  const updatePosition = () => {
    const rect = btnRef.current?.getBoundingClientRect();
    if (!rect) return;
    setCoords({
      top: rect.bottom + 6, // 6px de separación
      left: rect.left,
      width: rect.width,
      height: rect.height,
    });
  };

  useEffect(() => {
    if (!isOpen) return;
    updatePosition();

    const onScroll = () => updatePosition();
    const onResize = () => updatePosition();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [isOpen]);
  // dentro de BotonPublicar.jsx

  useEffect(() => {
    if (!isOpen) return;

    const onScroll = () => {
      setIsOpen(false); // cierra si hay scroll
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [isOpen, setIsOpen]);

  // Cerrar al hacer click fuera
  useEffect(() => {
    function handleClickOutside(event) {
      const target = event.target;
      if (
        dropdownRef.current?.contains(target) ||
        btnRef.current?.contains(target)
      ) {
        return;
      }
      setIsOpen(false);
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", onEsc, false);
    }
    function onEsc(e) {
      if (e.key === "Escape") setIsOpen(false);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", onEsc, false);
    };
  }, [isOpen, setIsOpen]);

  return (
    <div className="relative">
      <button
        ref={btnRef}
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex items-center gap-1 text-xs font-semibold transition px-3 py-2 rounded ml-4 ${
          isOpen
            ? "text-white bg-yellow-400 hover:bg-orange-500"
            : "text-white bg-yellow-400 hover:bg-orange-500"
        }`}
        aria-haspopup="menu"
        aria-expanded={isOpen}
      >
        + PUBLICAR
        <FiChevronDown className="text-base" />
      </button>

      {/* Portal para evitar el recorte por overflow del subnav */}
      {isOpen &&
        createPortal(
          <div
            ref={dropdownRef}
            role="menu"
            className="border border-gray-200 shadow-lg rounded w-48 z-[9999] bg-white"
            style={{
              position: "fixed",
              top: coords.top,
              left: coords.left,
            }}
          >
            <Link
              to="/dashboard/mis-negocios/crear"
              className="block px-4 py-2 text-xs text-gray-700 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              Crear Negocio
            </Link>
            <Link
              to="/dashboard/mis-eventos/crear"
              className="block px-4 py-2 text-xs text-gray-700 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              Crear Evento
            </Link>
          </div>,
          document.body
        )}
    </div>
  );
}
