import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiChevronDown } from "react-icons/fi";

export default function BotonPublicar({ isOpen, setIsOpen }) {
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex items-center gap-1 text-xs font-semibold transition px-3 py-2 rounded ml-4 ${
          isOpen
            ? "text-white bg-yellow-400 hover:bg-orange-500"
            : "text-white bg-yellow-400 hover:bg-orange-500"
        }`}
      >
        + PUBLICAR
        <FiChevronDown className="text-base" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 bg-white border border-gray-200 shadow-lg rounded w-48 z-50">
          <Link
            to="/dashboard/mis-negocios/crear"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Crear Negocio
          </Link>
          <Link
            to="/dashboard/mis-eventos/crear"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Crear Evento
          </Link>
          <Link
            to="/dashboard/comunidades/crear"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Crear Comunidad
          </Link>
        </div>
      )}
    </div>
  );
}
