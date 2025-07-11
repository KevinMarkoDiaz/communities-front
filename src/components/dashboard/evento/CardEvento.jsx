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
    <div className="group relative bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden border border-gray-200 min-h-[13rem] flex flex-col">
      {/* Imagen */}
      <div className="w-full h-28 overflow-hidden bg-gray-50">
        <img
          src={imagenUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Contenido */}
      <div className="flex flex-col gap-2 p-1 md:p-4 flex-grow">
        {/* Título */}
        <h3 className="text-sm font-semibold text-gray-700 min-h-[2.5rem] flex items-start md:items-center">
          {title}
        </h3>

        {/* Solo visible en desktop */}
        <div className="hidden md:flex flex-col gap-2 mt-auto">
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

          {/* Botón ver detalle */}
          <div className="flex justify-end">
            <Link
              to={`/eventos/${_id}`}
              className="text-sm font-medium text-orange-600 hover:text-orange-800 transition"
            >
              Ver detalle
            </Link>
          </div>

          {/* Acciones */}
          <div className="flex flex-col gap-1 mt-2">
            <Link
              to={`/dashboard/eventos/${_id}/editar`}
              className="flex items-center justify-center gap-2 px-3 py-2 rounded bg-black text-white hover:bg-[#f4c753] hover:text-black transition text-sm font-semibold w-full"
            >
              <MdEdit className="text-lg" />
              Editar evento
            </Link>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center justify-center gap-2 px-3 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition text-sm font-semibold w-full"
            >
              <MdDelete className="text-lg" />
              Eliminar
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
        title={`¿Quieres eliminar "${title}"?`}
        description="Para confirmar, escribe el nombre exacto del evento:"
      />
    </div>
  );
}
