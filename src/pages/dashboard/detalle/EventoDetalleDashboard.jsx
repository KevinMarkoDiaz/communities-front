import { Link } from "react-router-dom";
import { MdEdit, MdDelete, MdPublic } from "react-icons/md";

export default function EventoDetalleDashboard({ evento, onClose, onDelete }) {
  if (!evento) return null;

  return (
    <div
      className="
        relative
        w-full
        bg-gradient-to-br from-gray-50 via-white to-gray-100
        rounded-2xl
        shadow-lg
        p-6 md:p-8 xl:p-10
        border border-gray-200
        max-h-[80vh]
        overflow-y-auto
      "
    >
      {/* Botón cerrar en mobile */}
      {onClose && (
        <button
          onClick={onClose}
          className="md:hidden absolute top-2 right-4 text-gray-700 hover:text-black text-sm font-medium"
        >
          Cerrar
        </button>
      )}

      <div className="w-full flex flex-col md:flex-row gap-6">
        {/* Imagen */}
        <div className="w-full md:w-60 flex-shrink-0">
          <img
            src={evento.featuredImage}
            alt={evento.title}
            className="w-full h-40 md:h-60 object-cover rounded-xl"
          />
        </div>

        {/* Info */}
        <div className="flex-1 flex flex-col gap-4 justify-start">
          {/* Título */}
          <h2 className="text-2xl font-extrabold text-[#141C24] tracking-tight leading-snug">
            {evento.title}
          </h2>

          {/* Descripción */}
          <p className="text-gray-700 text-sm md:text-base leading-relaxed whitespace-pre-line">
            {evento.description}
          </p>

          {/* Etiquetas */}
          {evento.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {evento.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-block bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Metadatos */}
          <div className="flex flex-wrap gap-2 md:gap-4 text-xs md:text-sm text-gray-500 mt-2">
            <span>
              Fecha:{" "}
              {evento.date
                ? new Date(evento.date).toLocaleDateString()
                : "Sin fecha"}
            </span>
            {evento.location && (
              <span>
                {evento.location.address}, {evento.location.city}
              </span>
            )}
            <span>
              Creado: {new Date(evento.createdAt).toLocaleDateString()}
            </span>
          </div>

          {/* Acciones */}
          <div className="flex flex-row flex-wrap gap-2 mt-4">
            {/* Editar */}
            <Link
              to={`/dashboard/mis-eventos/${evento._id}/editar`}
              className="flex shadow-md hover:shadow-lg text-orange-600 items-center justify-center gap-2 px-3 py-2 rounded border border-gray-300 bg-white hover:bg-gray-50 transition text-xs font-medium no-underline"
            >
              <MdEdit className="text-lg" />
              Editar evento
            </Link>

            {/* Ver detalle privado */}
            <Link
              to={`/dashboard/mis-eventos/${evento._id}`}
              className="flex shadow-md hover:shadow-lg text-orange-600 items-center justify-center gap-2 px-3 py-2 rounded border border-gray-300 bg-white hover:bg-gray-50 transition text-xs font-medium no-underline w-fit"
            >
              <MdPublic className="text-lg" />
              Ver detalle privado
            </Link>

            {/* Ver detalle público */}
            <Link
              to={`/eventos/${evento._id}`}
              className="flex shadow-md hover:shadow-lg text-orange-600 items-center justify-center gap-2 px-3 py-2 rounded border border-gray-300 bg-white hover:bg-gray-50 transition text-xs font-medium no-underline w-fit"
            >
              <MdPublic className="text-lg" />
              Detalle del evento
            </Link>

            {/* Eliminar */}
            <button
              onClick={() => onDelete(evento._id)}
              className="flex shadow-md hover:shadow-lg text-white items-center justify-center gap-2 px-3 py-2 rounded border border-gray-300 bg-red-500 hover:bg-red-700 transition text-xs font-medium"
            >
              <MdDelete className="text-lg" />
              Eliminar evento
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
