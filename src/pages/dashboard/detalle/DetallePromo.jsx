import { Link } from "react-router-dom";
import { MdEdit, MdDelete } from "react-icons/md";
import { useState } from "react";
import ConfirmDeleteModal from "../../../components/ConfirmDeleteModal";

export default function DetallePromo({ promo, onClose, onDelete }) {
  const [showModal, setShowModal] = useState(false);

  if (!promo) return null;

  return (
    <div
      className="
        relative flex flex-col md:flex-row gap-6
        bg-gradient-to-br from-gray-50 via-white to-gray-100
        rounded-2xl shadow-lg p-6 md:p-8 xl:p-10 border border-gray-200
        max-h-[80vh] overflow-y-auto
      "
    >
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
      <div className="w-full md:w-60 flex-shrink-0">
        <img
          src={
            promo.featuredImage ||
            "https://cdn.usegalileo.ai/sdxl10/placeholder.png"
          }
          alt={promo.name}
          className="w-full h-40 md:h-60 object-cover rounded-xl"
        />
      </div>

      {/* Info */}
      <div className="flex-1 flex flex-col justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl md:text-2xl font-extrabold text-[#141C24] tracking-tight leading-snug">
            {promo.name}
          </h2>
          {promo.type && (
            <span className="inline-block bg-black text-white text-xs font-medium px-2 py-1 rounded-full capitalize w-fit">
              {promo.type.replace(/_/g, " ")}
            </span>
          )}
        </div>

        <p className="text-gray-700 text-sm md:text-base leading-relaxed whitespace-pre-line">
          {promo.description}
        </p>

        <div className="flex flex-wrap gap-4 text-xs md:text-sm text-gray-500 mt-2">
          <span>
            Vigencia: {new Date(promo.startDate).toLocaleDateString()} –{" "}
            {new Date(promo.endDate).toLocaleDateString()}
          </span>
          <span>Creado: {new Date(promo.createdAt).toLocaleDateString()}</span>
          <span>
            Actualizado: {new Date(promo.updatedAt).toLocaleDateString()}
          </span>
        </div>

        {/* Acciones */}
        <div className="flex flex-col sm:flex-row gap-2 mt-4">
          <Link
            to={`/dashboard/mis-promos/${promo._id}/editar`}
            className="flex items-center justify-center gap-2 px-3 py-2 rounded bg-black text-white hover:bg-[#f4c753] hover:text-black transition text-sm font-semibold"
          >
            <MdEdit className="text-lg" />
            Editar promoción
          </Link>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center justify-center gap-2 px-3 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition text-sm font-semibold"
          >
            <MdDelete className="text-lg" />
            Eliminar promoción
          </button>
        </div>
      </div>

      {/* Modal de confirmación */}
      <ConfirmDeleteModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={() => {
          setShowModal(false);
          onDelete(promo._id);
        }}
        entityName={promo.name}
        title="Eliminar promoción"
        description="Para confirmar, escribe el nombre exacto de la promoción:"
      />
    </div>
  );
}
