import { Link } from "react-router-dom";
import { useState } from "react";
import ConfirmDeleteModal from "../../../components/ConfirmDeleteModal";
import { HiOutlineGlobeAlt, HiOutlinePencilSquare } from "react-icons/hi2";
import { RiSpeakLine } from "react-icons/ri";
import { HiOutlineLockClosed, HiOutlineTrash } from "react-icons/hi";

export default function DetalleComunidad({ comunidad, onClose, onDelete }) {
  const [showModal, setShowModal] = useState(false);

  if (!comunidad) return null;

  return (
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
          className="md:hidden absolute -top-0.5 right-4 text-gray-900 hover:text-black text-sm"
        >
          Cerrar
        </button>
      )}

      <div className="relative w-full flex flex-col xl:flex-row gap-6">
        {/* Imagen */}
        <div className="w-full xl:w-60 flex-shrink-0">
          <img
            src={
              comunidad.bannerImage ||
              comunidad.flagImage ||
              `https://cdn.usegalileo.ai/sdxl10/${comunidad._id}.png`
            }
            alt={comunidad.name}
            className="w-full h-20 md:h-60 object-cover rounded-xl"
          />
        </div>

        {/* Info */}
        <div className="flex-1 flex flex-col gap-4 justify-between">
          {/* Encabezado */}
          <div className="flex flex-col md:flex-row md:items-center gap-3 flex-wrap">
            <h2 className="text-2xl font-extrabold text-[#141C24] tracking-tight leading-snug">
              {comunidad.name}
            </h2>
            {comunidad.status && (
              <span className="inline-flex items-center gap-1 bg-black text-white text-xs font-semibold px-2 py-1 rounded-full">
                {comunidad.status}
              </span>
            )}
          </div>

          {/* Descripción */}
          <p className="text-gray-700 text-xs md:text-md leading-relaxed whitespace-pre-line">
            {comunidad.description}
          </p>

          {/* Metadata extra */}
          <div className="flex flex-wrap gap-2 text-xs text-gray-600 mt-1">
            {comunidad.region && (
              <span className="flex items-center gap-1">
                <HiOutlineGlobeAlt className="w-4 h-4 text-gray-500" />
                <span>Región: {comunidad.region}</span>
              </span>
            )}

            {comunidad.language && (
              <span className="flex items-center gap-1">
                <RiSpeakLine className="w-4 h-4 text-gray-500" />
                <span>Idioma: {comunidad.language.toUpperCase()}</span>
              </span>
            )}
          </div>

          {/* Fechas */}
          <div className="flex flex-wrap gap-1 md:gap-4 text-xs text-gray-500 mt-2">
            <span>
              Creado: {new Date(comunidad.createdAt).toLocaleDateString()}
            </span>
            <span>
              Actualizado: {new Date(comunidad.updatedAt).toLocaleDateString()}
            </span>
          </div>

          {/* Acciones */}
          <div className="flex flex-row flex-wrap gap-2 mt-4">
            <Link
              to={`/dashboard/mis-comunidades/${comunidad._id}`}
              className="whitespace-nowrap flex shadow-md hover:shadow-lg text-orange-600 items-center justify-center gap-2 px-3 py-2 rounded border border-gray-300 bg-white hover:bg-gray-50 transition text-xs font-medium no-underline"
            >
              <HiOutlineLockClosed className="text-lg" />
              Ver detalle privado
            </Link>

            <Link
              to={`/dashboard/mis-comunidades/${comunidad._id}/editar`}
              className="whitespace-nowrap flex shadow-md hover:shadow-lg text-orange-600 items-center justify-center gap-2 px-3 py-2 rounded border border-gray-300 bg-white hover:bg-gray-50 transition text-xs font-medium no-underline"
            >
              <HiOutlinePencilSquare className="text-lg" />
              Editar comunidad
            </Link>

            <Link
              to={`/comunidades/${comunidad._id}`}
              className="whitespace-nowrap flex shadow-md hover:shadow-lg text-orange-600 items-center justify-center gap-2 px-3 py-2 rounded border border-gray-300 bg-white hover:bg-gray-50 transition text-xs font-medium no-underline"
            >
              <HiOutlineGlobeAlt className="text-lg" />
              Perfil público
            </Link>

            <button
              onClick={() => setShowModal(true)}
              className="whitespace-nowrap flex shadow-md hover:shadow-lg text-white items-center justify-center gap-2 px-3 py-2 rounded border border-gray-300 bg-red-500 hover:bg-red-700 transition text-xs font-medium"
            >
              <HiOutlineTrash className="text-lg" />
              Eliminar comunidad
            </button>
          </div>
        </div>
      </div>

      {/* Modal confirmación */}
      <ConfirmDeleteModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={() => {
          setShowModal(false);
          onDelete(comunidad._id);
        }}
        entityName={comunidad.name}
        title="Eliminar comunidad"
        description="Para confirmar, escribe el nombre exacto de la comunidad:"
      />
    </div>
  );
}
