import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FiEdit2, FiTrash2, FiChevronUp } from "react-icons/fi";

export default function ResumenEventos() {
  const navigate = useNavigate();
  const eventos = useSelector((state) => state.eventos.lista);
  const [visibleCount, setVisibleCount] = useState(5);

  const handleEditar = (slug) => {
    navigate(`/dashboard/eventos/${slug}/editar`);
  };

  const handleEliminar = (slug) => {
    if (confirm("¿Estás seguro de eliminar este evento?")) {
      console.log("Eliminar evento:", slug);
    }
  };

  if (!eventos || eventos.length === 0) {
    return (
      <div className="bg-[#F7F7F7] p-4 md:p-6 rounded-2xl flex flex-col items-center justify-center text-center gap-4">
        <h3 className="text-[#141C24] text-lg font-bold pb-2">Tus eventos</h3>
        <p className="text-sm text-gray-500">
          Aún no tienes eventos creados. ¡Comparte actividades y conecta con tu
          comunidad!
        </p>
        <Link
          to="/dashboard/mis-eventos/crear"
          className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-4 py-2 rounded-full transition cursor-pointer"
        >
          📅 Crear mi primer evento
        </Link>
      </div>
    );
  }

  const eventosMostrados = eventos.slice(0, visibleCount);

  return (
    <div className="bg-[#F7F7F7] p-4 md:p-6 rounded-2xl flex flex-col justify-start gap-2 h-full">
      <h3 className="text-[#141C24] text-lg font-bold pb-4">Tus eventos</h3>
      {eventosMostrados.map((evento, index) => (
        <div key={evento._id}>
          <div
            onClick={() => navigate(`/eventos/${evento.slug}`)}
            className="flex items-center gap-3 p-3 cursor-pointer hover:bg-white hover:shadow-sm rounded-xl transition"
          >
            <div className="w-10 h-10 flex-shrink-0">
              {evento.featuredImage ? (
                <img
                  src={evento.featuredImage}
                  alt={evento.title}
                  className="w-full h-full rounded-md object-cover border border-gray-200"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 rounded-md flex items-center justify-center text-xs text-gray-500">
                  Sin imagen
                </div>
              )}
            </div>

            <div className="flex-1">
              <p className="text-sm font-medium text-[#3F5374]">
                {evento.title}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleEditar(evento.slug);
                }}
                className="cursor-pointer p-1 text-gray-500 hover:text-orange-500 transition"
              >
                <FiEdit2 className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleEliminar(evento.slug);
                }}
                className="cursor-pointer p-1 text-gray-500 hover:text-red-500 transition"
              >
                <FiTrash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {index !== eventosMostrados.length - 1 && (
            <hr className="border-t border-gray-200 mx-2" />
          )}
        </div>
      ))}

      {eventos.length > 5 && (
        <div className="mt-2 flex flex-wrap justify-center gap-3">
          {visibleCount < eventos.length && (
            <button
              onClick={() => setVisibleCount((prev) => prev + 5)}
              className="cursor-pointer text-sm font-medium text-orange-600 hover:text-orange-700 transition"
            >
              Ver más
            </button>
          )}

          {visibleCount > 5 && (
            <button
              onClick={() => setVisibleCount(5)}
              className="cursor-pointer flex items-center gap-1 text-sm font-medium text-white bg-orange-600 p-1 rounded-full transition"
            >
              <FiChevronUp className="w-4 h-4" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
