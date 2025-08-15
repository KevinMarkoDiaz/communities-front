import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEdit2, FiTrash2, FiChevronUp } from "react-icons/fi";
import ConfirmDeleteModal from "../../ConfirmDeleteModal";

export default function ResumenComunidades({ comunidades = [], onDelete }) {
  const navigate = useNavigate();
  const [visibleCount, setVisibleCount] = useState(5);

  const [showModal, setShowModal] = useState(false);
  const [comunidadSeleccionada, setComunidadSeleccionada] = useState(null);

  const handleEditar = (id) => {
    navigate(`/dashboard/mis-comunidades/${id}/editar`);
  };

  const handleEliminar = (comunidad) => {
    setComunidadSeleccionada(comunidad);
    setShowModal(true);
  };

  if (!comunidades || comunidades.length === 0) {
    return (
      <div className="bg-[#F7F7F7] p-4 md:p-6 rounded-2xl h-full flex flex-col items-center justify-center text-center gap-4">
        <h3 className="text-gray-600 text-lg font-semibold">Tus comunidades</h3>
        <p className="  text-xs text-gray-500">
          Aún no has creado ninguna comunidad. ¡Este es el momento perfecto para
          comenzar!
        </p>
        <Link
          to="/dashboard/comunidades/crear"
          className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white  text-xs font-medium px-4 py-2 rounded-full transition cursor-pointer"
        >
          🚀 Crear mi primera comunidad
        </Link>
      </div>
    );
  }

  const comunidadesMostradas = comunidades.slice(0, visibleCount);

  return (
    <>
      <div className="bg-[#F7F7F7] px-2 py-3 md:p-3 lg:p-6 rounded-2xl flex flex-col justify-start gap-1 h-full">
        <h3 className="text-gray-600 text-lg font-semibold pb-4">
          Tus comunidades
        </h3>

        {comunidadesMostradas.map((comunidad, index) => (
          <div key={comunidad._id}>
            <div
              onClick={() => navigate(`/comunidades/${comunidad._id}`)}
              className="flex items-center gap-3 p-1 cursor-pointer hover:bg-white hover:shadow-md rounded-lg transition"
            >
              <div className="w-12 h-12 flex-shrink-0">
                {comunidad.flagImage ? (
                  <img
                    src={comunidad.flagImage}
                    alt={comunidad.name}
                    className="w-full h-full rounded-lg object-cover border border-gray-200"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center text-xs text-gray-500">
                    Sin imagen
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <p className="  text-xs font-medium text-[#3F5374] truncate">
                  {comunidad.name}
                </p>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditar(comunidad._id);
                  }}
                  className="p-1 text-gray-500 hover:text-orange-500 transition"
                >
                  <FiEdit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEliminar(comunidad);
                  }}
                  className="p-1 text-gray-500 hover:text-red-500 transition"
                >
                  <FiTrash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {index !== comunidadesMostradas.length - 1 && (
              <hr className="border-t border-gray-200 mx-2" />
            )}
          </div>
        ))}

        {comunidades.length > 5 && (
          <div className="mt-3 flex flex-wrap justify-center gap-3">
            {visibleCount < comunidades.length && (
              <button
                onClick={() => setVisibleCount((prev) => prev + 5)}
                className="inline-flex items-center gap-1  text-xs font-medium text-orange-600 hover:text-orange-700 transition"
              >
                Ver más
              </button>
            )}
            {visibleCount > 5 && (
              <button
                onClick={() => setVisibleCount(5)}
                className="inline-flex items-center gap-1  text-xs font-medium text-orange-600 hover:text-orange-700 transition"
              >
                <FiChevronUp className="w-4 h-4" />
                Ver menos
              </button>
            )}
          </div>
        )}
      </div>

      {/* ✅ Modal de confirmación */}
      {comunidadSeleccionada && (
        <ConfirmDeleteModal
          open={showModal}
          onClose={() => setShowModal(false)}
          onConfirm={() => {
            setShowModal(false);
            onDelete(comunidadSeleccionada._id);
          }}
          entityName={comunidadSeleccionada.name}
          title="Eliminar comunidad"
          description="Para confirmar, escribe el nombre exacto de la comunidad:"
        />
      )}
    </>
  );
}
