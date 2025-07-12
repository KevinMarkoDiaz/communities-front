import { useState } from "react";
import { Link } from "react-router-dom";
import { MdEdit, MdDelete } from "react-icons/md";
import ConfirmDeleteModal from "../../../components/ConfirmDeleteModal";

export default function DetalleCategoria({ categoria, onClose, onDelete }) {
  const [showConfirm, setShowConfirm] = useState(false);

  if (!categoria) return null;

  return (
    <>
      <div className="relative flex flex-col md:flex-row gap-6 bg-gradient-to-br from-gray-50 via-white to-gray-100 rounded-2xl shadow-lg p-6 md:p-8 xl:p-10 border border-gray-200 max-h-[80vh] overflow-y-auto">
        {/* Botón cerrar en mobile */}
        {onClose && (
          <button
            onClick={onClose}
            className="md:hidden absolute top-1 right-4 text-gray-900 hover:text-black text-sm"
          >
            cerrar
          </button>
        )}

        {/* Imagen */}
        <div className="w-full md:w-40 flex-shrink-0 self-center md:self-start">
          {categoria.icon ? (
            <img
              src={categoria.icon}
              alt={categoria.name}
              className="w-full h-40 md:h-60 object-cover rounded-xl"
            />
          ) : (
            <div className="w-full h-40 md:h-60 flex items-center justify-center bg-gray-100 rounded-xl text-3xl">
              🏷️
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 flex flex-col gap-4 justify-center">
          <h2 className="text-xl md:text-2xl font-extrabold text-[#141C24] tracking-tight leading-snug">
            {categoria.name}
          </h2>
          <p className="text-gray-700 text-sm md:text-base leading-relaxed whitespace-pre-line">
            {categoria.description}
          </p>

          <div className="flex flex-wrap gap-4 text-xs md:text-sm text-gray-500 mt-2">
            <span>
              Creado: {new Date(categoria.createdAt).toLocaleDateString()}
            </span>
            <span>
              Actualizado: {new Date(categoria.updatedAt).toLocaleDateString()}
            </span>
          </div>

          {/* Acciones */}
          <div className="flex flex-col sm:flex-row gap-2 mt-4">
            <Link
              to={`/dashboard/mis-categorias/${categoria._id}/editar`}
              className="flex items-center justify-center gap-2 px-3 py-2 rounded bg-black text-white hover:bg-[#f4c753] hover:text-black transition text-sm font-semibold"
            >
              <MdEdit className="text-lg" />
              Editar categoría
            </Link>
            <button
              onClick={() => setShowConfirm(true)}
              className="flex items-center justify-center gap-2 px-3 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition text-sm font-semibold"
            >
              <MdDelete className="text-lg" />
              Eliminar categoría
            </button>
          </div>
        </div>
      </div>

      {/* Modal de confirmación */}
      {showConfirm && (
        <ConfirmDeleteModal
          open={showConfirm}
          onClose={() => setShowConfirm(false)}
          onConfirm={() => {
            onDelete(categoria._id);
            setShowConfirm(false);
            if (onClose) onClose();
          }}
          entityName={categoria.name}
        />
      )}
    </>
  );
}
