import { Link } from "react-router-dom";
import { MdEdit, MdDelete, MdLocalOffer } from "react-icons/md";
import ConfirmDeleteModal from "../../ConfirmDeleteModal";
import { useState } from "react";

export default function CardNegocio({ negocio, onDelete }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="group relative bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden border border-gray-200">
      {/* Imagen destacada */}
      <div className="w-full h-28 overflow-hidden">
        <img
          src={negocio.featuredImage}
          alt={negocio.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-col gap-2 p-4">
        {/* Nombre */}
        <h3 className="text-sm font-semibold text-gray-700 truncate">
          {negocio.name}
        </h3>

        {/* Categoría */}
        {negocio.category && (
          <span className="inline-block bg-black text-white text-xs font-medium px-2 py-0.5 rounded-full w-fit">
            {negocio.category.name}
          </span>
        )}

        {/* Acciones */}
        <div className="flex justify-between items-center mt-3">
          <Link
            to={`/negocios/${negocio._id}`}
            className="text-sm font-medium text-blue-300 hover:text-blue-800 transition"
          >
            Ver más
          </Link>

          <div className="flex gap-2">
            <Link
              to={`/dashboard/mis-negocios/${negocio._id}/promos/nueva`}
              className="p-1 text-blue-300 hover:text-blue-600 transition"
              title="Agregar promoción"
            >
              <MdLocalOffer className="w-5 h-5" />
            </Link>
            <Link
              to={`/dashboard/mis-negocios/${negocio._id}/editar`}
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

      <ConfirmDeleteModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={() => {
          setShowModal(false);
          onDelete();
        }}
        entityName={negocio.name}
        title="Eliminar negocio"
        description="Para confirmar, escribe el nombre exacto del negocio:"
      />
    </div>
  );
}
