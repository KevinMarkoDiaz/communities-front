import { Link } from "react-router-dom";
import { MdEdit, MdDelete, MdLocalOffer } from "react-icons/md";

export default function NegocioDetalleDashboard({
  negocio,
  onClose,
  onAskDelete, // función que abre el modal de confirmación
}) {
  if (!negocio) return null;

  return (
    <div
      className="
        relative
        w-full
        flex flex-col md:flex-row
        gap-6
        bg-gradient-to-br from-gray-50 via-white to-gray-100
        rounded-2xl shadow-lg
        p-6 md:p-8 xl:p-10
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
          className="md:hidden absolute top-1 right-4 text-gray-900 hover:text-black text-sm"
        >
          cerrar
        </button>
      )}

      {/* Imagen */}
      <div className="w-full md:w-60 flex-shrink-0">
        <img
          src={negocio.featuredImage}
          alt={negocio.name}
          className="w-full h-20 md:h-60 object-cover rounded-xl"
        />
      </div>

      {/* Info */}
      <div className="flex-1 flex flex-col gap-4 justify-between">
        {/* Encabezado */}
        <div className="flex flex-col md:flex-row md:items-center gap-3 flex-wrap">
          <h2 className="text-2xl font-extrabold text-[#141C24] tracking-tight leading-snug">
            {negocio.name}
          </h2>
          {negocio.isVerified && (
            <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full">
              ✓ Verificado
            </span>
          )}
        </div>

        {/* Descripción */}
        <p className="text-gray-700 text-xs md:text-md leading-relaxed whitespace-pre-line">
          {negocio.description}
        </p>

        {/* Etiquetas */}
        <div className="flex flex-wrap gap-2 mt-2">
          {negocio.tags?.map((tag) => (
            <span
              key={tag}
              className="inline-block bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
          {negocio?.category && (
            <span className="inline-block bg-black text-white text-xs font-medium px-2 py-1 rounded-full">
              {negocio.category.name}
            </span>
          )}
        </div>

        {/* Link a perfil */}
        <Link
          to={`/negocios/${negocio._id}`}
          className="inline-flex items-center gap-2 mt-4 text-sm font-semibold text-orange-600 hover:text-orange-800 transition"
        >
          {negocio.profileImage && (
            <img
              src={negocio.profileImage}
              alt="Avatar negocio"
              className="w-7 md:w-10 md:h-10 rounded-full object-cover"
            />
          )}
          Ver perfil del negocio
        </Link>

        {/* Metadatos */}
        <div className="flex flex-wrap gap-1 md:gap-4 text-xs md:text-sm text-gray-500 mt-2">
          <span>
            Creado: {new Date(negocio.createdAt).toLocaleDateString()}
          </span>
          <span>
            Actualizado: {new Date(negocio.updatedAt).toLocaleDateString()}
          </span>
        </div>

        {/* Acciones */}
        <div className="flex flex-col sm:flex-row gap-2 mt-4">
          <Link
            to={`/dashboard/mis-negocios/${negocio._id}/promos/nueva`}
            className="flex items-center justify-center gap-2 px-3 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition text-sm font-semibold"
          >
            <MdLocalOffer className="text-lg" />
            Crear promoción
          </Link>
          <Link
            to={`/dashboard/negocios/${negocio._id}/editar`}
            className="flex items-center justify-center gap-2 px-3 py-2 rounded bg-black text-white hover:bg-[#f4c753] hover:text-black transition text-sm font-semibold"
          >
            <MdEdit className="text-lg" />
            Editar negocio
          </Link>
          <button
            onClick={() => {
              if (onClose) onClose();
              if (onAskDelete) onAskDelete(negocio);
            }}
            className="flex items-center justify-center gap-2 px-3 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition text-sm font-semibold"
          >
            <MdDelete className="text-lg" />
            Eliminar negocio
          </button>
        </div>
      </div>
    </div>
  );
}
