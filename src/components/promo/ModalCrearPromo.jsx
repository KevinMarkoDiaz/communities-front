// components/ModalCrearPromo.jsx
import { Link } from "react-router-dom";
import { MdLocalOffer, MdEdit, MdDelete } from "react-icons/md";
import { FaArrowDown } from "react-icons/fa";

export default function ModalCrearPromo({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="bg-white rounded-xl p-6 md:p-8 w-full max-w-md shadow-xl relative">
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
        >
          &times;
        </button>

        {/* Título */}
        <h2 className="text-lg font-bold text-[#141C24] mb-2">
          ¿Cómo crear una promoción?
        </h2>
        <p className="text-gray-600 text-sm mb-4">
          Para crear una promoción, primero debes ir a{" "}
          <strong>Mis negocios</strong> y seleccionarla desde la tarjeta del
          negocio correspondiente.
        </p>

        {/* Card de ejemplo */}
        <div className="group relative bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
          {/* Fondo azul claro en lugar de imagen */}
          <div className="w-full h-24 bg-blue-100 flex items-center justify-center text-blue-400 text-xs font-semibold">
            Imagen destacada
          </div>

          <div className="flex flex-col gap-3 p-5">
            {/* Nombre */}
            <h3 className="text-sm font-semibold text-gray-700 truncate">
              Mi Negocio Ejemplo
            </h3>
            {/* Categoría */}
            <span className="inline-block bg-black text-white text-xs font-medium px-2 py-0.5 rounded-full w-fit">
              Restaurante
            </span>

            {/* Acciones */}
            <div className="flex justify-between items-center mt-3">
              <span className="text-xs text-blue-400">Ver más</span>
              <div className="flex gap-3 relative">
                {/* Botón pulseante */}
                <div className="relative flex flex-col items-center">
                  <button
                    disabled
                    className="p-1 text-orange-500 animate-pulse"
                    title="Crear promoción"
                  >
                    <MdLocalOffer className="w-5 h-5" />
                  </button>
                  {/* Flecha indicativa */}
                  <FaArrowDown className="text-orange-500 animate-bounce mt-2" />
                </div>
                <button disabled className="p-1 text-gray-300">
                  <MdEdit className="w-5 h-5" />
                </button>
                <button disabled className="p-1 text-gray-300">
                  <MdDelete className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Botón ir a Mis negocios */}
        <Link
          to="/dashboard/mis-negocios"
          className="block w-full text-center mt-4 bg-black text-white py-2 rounded font-semibold hover:bg-[#f4c753] hover:text-black transition"
        >
          Ir a Mis negocios
        </Link>
      </div>
    </div>
  );
}
