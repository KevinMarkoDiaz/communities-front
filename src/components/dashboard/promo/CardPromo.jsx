import { Link } from "react-router-dom";
import { MdEdit, MdDelete } from "react-icons/md";
import { useState } from "react";
import ConfirmDeleteModal from "../../ConfirmDeleteModal";

export default function CardPromo({ promo, onDelete }) {
  const { _id, name, description, featuredImage, type, startDate, endDate } =
    promo;

  const [showModal, setShowModal] = useState(false);

  return (
    <div className="group relative bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden border border-gray-200 min-h-[10rem] flex flex-col">
      {/* Imagen */}
      <div className="w-full h-28 overflow-hidden bg-gray-50">
        <img
          src={
            featuredImage || "https://cdn.usegalileo.ai/sdxl10/placeholder.png"
          }
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-col gap-2 p-1 md:p-4 flex-grow">
        {/* Nombre */}
        <h3
          className="
            text-sm font-semibold text-gray-700
            min-h-[2.5rem]
            flex items-start md:items-center
          "
        >
          {name}
        </h3>

        {/* Tipo */}
        {type && (
          <span className="hidden md:inline-block bg-black text-white text-xs font-medium px-2 py-0.5 rounded-full w-fit capitalize">
            {type.replace(/_/g, " ")}
          </span>
        )}

        {/* Fechas */}
        <p className="hidden md:block text-xs text-gray-500">
          {new Date(startDate).toLocaleDateString()} –{" "}
          {new Date(endDate).toLocaleDateString()}
        </p>

        {/* Descripción */}
        <p className="hidden md:block text-xs text-gray-500 line-clamp-2 min-h-[3rem]">
          {description || "Sin descripción disponible."}
        </p>

        {/* Acciones */}
        <div className="hidden md:flex justify-between items-center mt-auto">
          <Link
            to={`/dashboard/promociones/${_id}/editar`}
            className="text-sm font-medium text-orange-600 hover:text-orange-800 transition"
          >
            Editar promoción
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

      {/* Modal de confirmación */}
      <ConfirmDeleteModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={() => {
          setShowModal(false);
          onDelete(_id);
        }}
        entityName={name}
        title="Eliminar promoción"
        description="Para confirmar, escribe el nombre exacto de la promoción:"
      />
    </div>
  );
}
