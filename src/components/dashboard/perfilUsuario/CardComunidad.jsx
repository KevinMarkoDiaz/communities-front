import { Link } from "react-router-dom";
import { MdEdit, MdDelete } from "react-icons/md";
import { useState } from "react";
import ConfirmDeleteModal from "../../ConfirmDeleteModal";

export default function CardComunidad({
  id,
  name = "Nombre comunidad",
  description = "Descripción de la comunidad.",
  flagImage,
  language = "es",
  owner,
  usuario,
  onDelete,
  slug,
}) {
  const puedeEditar = usuario?.role === "admin" || usuario?._id === owner?._id;
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="group relative bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden border border-gray-200">
      {/* Imagen */}
      <div className="w-full h-28 overflow-hidden">
        <img
          src={
            flagImage ||
            `https://cdn.usegalileo.ai/sdxl10/${id || "default"}.png`
          }
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Contenido */}
      <div className="flex flex-col gap-2 p-4">
        <h3 className="text-sm font-semibold text-gray-700 truncate">{name}</h3>

        <p className="text-gray-500 text-xs truncate">{description}</p>

        <span className="inline-block bg-black text-white text-xs font-medium px-2 py-0.5 rounded-full w-fit">
          {language.toUpperCase()}
        </span>

        {/* Acciones */}
        {puedeEditar && (
          <div className="flex justify-between items-center mt-3">
            <Link
              to={`/comunidades/${slug}`}
              className="text-sm font-medium text-blue-300 hover:text-blue-800 transition"
            >
              Ver más
            </Link>

            <div className="flex gap-2">
              <Link
                to={`/dashboard/comunidades/${slug}/editar`}
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
        )}
      </div>

      {/* Modal de confirmación */}
      <ConfirmDeleteModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={() => {
          setShowModal(false);
          onDelete?.(id);
        }}
        entityName={name}
        title="Eliminar comunidad"
        description="Para confirmar, escribe el nombre exacto de la comunidad:"
      />
    </div>
  );
}
