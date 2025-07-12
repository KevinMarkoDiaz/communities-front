import { Link } from "react-router-dom";
import { MdEdit, MdDelete } from "react-icons/md";
import { useState } from "react";
import ConfirmDeleteModal from "../../ConfirmDeleteModal";

export default function CardComunidad({ comunidad, usuario, onDelete }) {
  const {
    _id,
    name = "Nombre comunidad",
    description = "Descripción de la comunidad.",
    flagImage,
    bannerImage,
    language = "es",
    slug,
    owner,
  } = comunidad;

  const puedeEditar = usuario?.role === "admin" || usuario?._id === owner?._id;
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="group relative bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden border border-gray-200 min-h-[10rem] flex flex-col">
      {/* Imagen */}
      <div className="w-full h-28 overflow-hidden bg-gray-50">
        <img
          src={bannerImage || flagImage}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Contenido */}
      <div className="flex flex-col gap-2 p-1 md:p-4 flex-grow">
        {/* Título */}
        <h3
          className="
            text-sm font-semibold text-gray-700
            min-h-[2.5rem]
            flex items-start md:items-center
          "
        >
          {name}
        </h3>

        {/* Descripción y etiqueta (solo desktop) */}
        <div className="hidden md:flex flex-col gap-1">
          <p className="text-gray-500 text-xs line-clamp-2">
            {description || "Sin descripción disponible"}
          </p>
          <span className="inline-block bg-black text-white text-xs font-medium px-2 py-0.5 rounded-full w-fit">
            {language.toUpperCase()}
          </span>
        </div>

        {/* Acciones */}
        {puedeEditar && (
          <div className="hidden md:flex justify-between items-center mt-auto">
            <Link
              to={`/comunidades/${slug}`}
              className="text-sm font-medium text-orange-600 hover:text-orange-800 transition"
            >
              Ver perfil
            </Link>

            <div className="flex gap-2">
              <Link
                to={`/dashboard/mis-comunidades/${slug}/editar`}
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
          onDelete?.(_id);
        }}
        entityName={name}
        title="Eliminar comunidad"
        description="Para confirmar, escribe el nombre exacto de la comunidad:"
      />
    </div>
  );
}
