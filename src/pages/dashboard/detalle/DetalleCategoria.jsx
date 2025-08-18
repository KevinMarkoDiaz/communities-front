import { useState } from "react";
import { Link } from "react-router-dom";
import ConfirmDeleteModal from "../../../components/ConfirmDeleteModal";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { HiOutlineTrash } from "react-icons/hi";

export default function DetalleCategoria({ categoria, onClose, onDelete }) {
  const [showConfirm, setShowConfirm] = useState(false);

  if (!categoria) return null;

  return (
    <>
      <div
        className="
          relative
          w-full
          bg-gradient-to-br from-gray-50 via-white to-gray-100
          rounded-2xl
          shadow-lg
          p-4 lg:p-8 xl:p-10
          border border-gray-200
          min-h-[260px]
          max-h-[80vh]
          overflow-y-auto
        "
      >
        {/* Botón cerrar en mobile */}
        {onClose && (
          <button
            onClick={onClose}
            className="md:hidden absolute -top-0.5 right-4 text-gray-900 hover:text-black  text-xs"
          >
            Cerrar
          </button>
        )}

        <div className="relative w-full flex flex-col xl:flex-row gap-6">
          {/* Imagen */}
          <div className="w-full xl:w-60 flex-shrink-0 self-center lg:self-start">
            {categoria.icon ? (
              <img
                src={categoria.icon}
                alt={categoria.name}
                className="w-full h-20 md:h-60 object-cover rounded-xl"
              />
            ) : (
              <div className="w-full h-20 md:h-60 flex items-center justify-center bg-gray-100 rounded-xl text-3xl">
                🏷️
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 flex flex-col gap-4 justify-between">
            <h2 className="text-2xl font-extrabold text-[#141C24] tracking-tight leading-snug">
              {categoria.name}
            </h2>
            <p className="text-gray-700 text-xs md:text-md leading-relaxed whitespace-pre-line">
              {categoria.description}
            </p>

            <div className="flex flex-wrap gap-1 md:gap-4 text-xs text-gray-500 mt-2">
              <span>
                Creado: {new Date(categoria.createdAt).toLocaleDateString()}
              </span>
              <span>{new Date(categoria.updatedAt).toLocaleDateString()}</span>
            </div>

            {/* Acciones */}
            <div className="flex flex-row flex-wrap gap-2 mt-4">
              <Link
                to={`/dashboard-admin/mis-categorias/${categoria._id}/editar`}
                className="whitespace-nowrap flex shadow-md hover:shadow-lg text-orange-600 items-center justify-center gap-2 px-3 py-2 rounded border border-gray-300 bg-white hover:bg-gray-50 transition text-xs font-medium no-underline"
              >
                <HiOutlinePencilSquare className="text-lg" />
                Editar categoría
              </Link>

              <button
                onClick={() => setShowConfirm(true)}
                className="whitespace-nowrap flex shadow-md hover:shadow-lg text-white items-center justify-center gap-2 px-3 py-2 rounded border border-gray-300 bg-red-500 hover:bg-red-700 transition text-xs font-medium"
              >
                <HiOutlineTrash className="text-lg" />
                Eliminar categoría
              </button>
            </div>
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
          title="Eliminar categoría"
          description="Para confirmar, escribe el nombre exacto de la categoría:"
        />
      )}
    </>
  );
}
