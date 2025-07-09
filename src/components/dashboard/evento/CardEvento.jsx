import { Link } from "react-router-dom";
import { MdEdit, MdDelete } from "react-icons/md";
import { useState } from "react";
import ConfirmDeleteModal from "../../ConfirmDeleteModal";

export default function CardEvento({ evento, onDelete }) {
  const { _id, title = "Sin título", date, location, featuredImage } = evento;

  const [showModal, setShowModal] = useState(false);

  const imagenUrl =
    featuredImage || `https://cdn.usegalileo.ai/sdxl10/${_id || "default"}.png`;

  return (
    <div className="group relative bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden border border-gray-200">
      {/* Imagen */}
      <div className="w-full h-28 overflow-hidden">
        <img
          src={imagenUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-col gap-2 p-4">
        {/* Título */}
        <h3 className="text-sm font-semibold text-gray-700 truncate">
          {title}
        </h3>

        {/* Fecha */}
        <span className="inline-block bg-black text-white text-xs font-medium px-2 py-0.5 rounded-full w-fit">
          {date ? new Date(date).toLocaleDateString() : "Sin fecha"}
        </span>

        {/* Ubicación */}
        {location?.city && (
          <span className="text-xs text-gray-500">
            {location.city}, {location.state}
          </span>
        )}

        {/* Acciones */}
        <div className="flex justify-between items-center mt-3">
          <Link
            to={`/eventos/${_id}`}
            className="text-sm font-medium text-blue-300 hover:text-blue-800 transition"
          >
            Ver más
          </Link>

          <div className="flex gap-2">
            <Link
              to={`/dashboard/mis-eventos/${_id}/editar`}
              className="p-1 text-gray-500 hover:text-black transition"
              title="Editar"
            >
              <MdEdit className="w-5 h-5" />
            </Link>
            <button
              onClick={() => setShowModal(true)}
              className="p-1 text-gray-500 hover:text-red-600 transition"
              title="Eliminar"
            >
              <MdDelete className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Modal Confirmación */}
      <ConfirmDeleteModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={() => {
          setShowModal(false);
          onDelete(_id);
        }}
        entityName={title}
        title="Eliminar evento"
        description="Para confirmar, escribe el nombre exacto del evento:"
      />
    </div>
  );
}
