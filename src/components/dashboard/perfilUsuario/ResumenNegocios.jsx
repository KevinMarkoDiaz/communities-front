import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEdit2, FiTrash2, FiChevronUp } from "react-icons/fi";

export default function ResumenNegocios({ negocios = [] }) {
  const navigate = useNavigate();
  const [visibleCount, setVisibleCount] = useState(5);

  const handleEditar = (slug) => {
    navigate(`/dashboard/negocios/${slug}/editar`);
  };

  const handleEliminar = (slug) => {
    if (confirm("¿Estás seguro de eliminar este negocio?")) {
      console.log("Eliminar negocio:", slug);
    }
  };

  if (!negocios || negocios.length === 0) {
    return (
      <div className="bg-[#F7F7F7] h-full p-4 md:p-6 rounded-2xl flex flex-col items-center justify-center text-center gap-4">
        <h3 className="text-gray-600 text-lg font-bold pb-2">Tus negocios</h3>
        <p className="text-sm text-gray-500">
          No tienes negocios registrados aún. ¡Es momento de dar a conocer tu
          proyecto!
        </p>
        <Link
          to="/dashboard/mis-negocios/crear"
          className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-4 py-2 rounded-full transition cursor-pointer"
        >
          ✨ Crear mi primer negocio
        </Link>
      </div>
    );
  }

  const negociosMostrados = negocios.slice(0, visibleCount);

  return (
    <div className="bg-[#F7F7F7] px-2 py-3 md:p-3 lg:p-6 rounded-2xl flex flex-col justify-start gap-1 h-full">
      <h3 className="text-gray-600 text-lg font-semibold pb-4">Tus negocios</h3>

      {negociosMostrados.map((negocio, index) => (
        <div key={negocio._id}>
          <div
            onClick={() => navigate(`/negocios/${negocio.slug}`)}
            className="flex items-center gap-3 p-1 cursor-pointer hover:bg-white hover:shadow-md rounded-lg transition"
          >
            <div className="w-12 h-12 flex-shrink-0">
              {negocio.profileImage ? (
                <img
                  src={negocio.profileImage}
                  alt={negocio.name}
                  className="w-full h-full rounded-lg object-cover border border-gray-200"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center text-xs text-gray-500">
                  Sin imagen
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[#3F5374] truncate">
                {negocio.name}
              </p>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleEditar(negocio.slug);
                }}
                className="p-1 text-gray-500 hover:text-orange-500 transition"
              >
                <FiEdit2 className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleEliminar(negocio.slug);
                }}
                className="p-1 text-gray-500 hover:text-red-500 transition"
              >
                <FiTrash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {index !== negociosMostrados.length - 1 && (
            <hr className="border-t border-gray-200 mx-2" />
          )}
        </div>
      ))}

      {negocios.length > 5 && (
        <div className="mt-3 flex flex-wrap justify-center gap-3">
          {visibleCount < negocios.length && (
            <button
              onClick={() => setVisibleCount((prev) => prev + 5)}
              className="inline-flex items-center gap-1 text-sm font-medium text-orange-600 hover:text-orange-700 transition"
            >
              Ver más
            </button>
          )}

          {visibleCount > 5 && (
            <button
              onClick={() => setVisibleCount(5)}
              className="inline-flex items-center gap-1 text-sm font-medium text-orange-600 hover:text-orange-700 transition"
            >
              <FiChevronUp className="w-4 h-4" />
              Ver menos
            </button>
          )}
        </div>
      )}
    </div>
  );
}
