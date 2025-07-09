import { Link } from "react-router-dom";
import { MdEdit, MdDelete } from "react-icons/md";

export default function CardCategoria({ categoria, onDelete }) {
  const { _id, name, description, icon } = categoria;

  return (
    <div className="group relative bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden border border-gray-200">
      {/* Imagen de portada */}
      <div className="w-full h-28 overflow-hidden bg-gray-50">
        {icon ? (
          <img
            src={icon}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full text-gray-400 text-sm">
            Sin imagen
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="flex flex-col gap-2 p-4">
        {/* Nombre */}
        <h3 className="text-sm font-semibold text-gray-700 truncate">{name}</h3>

        {/* Descripción */}
        <p className="text-xs text-gray-500 line-clamp-2">
          {description || "Sin descripción disponible."}
        </p>

        {/* Acciones */}
        <div className="flex justify-end gap-2 mt-2">
          <Link
            to={`/dashboard/categorias/${_id}/editar`}
            className="p-1 text-gray-500 hover:text-black transition"
            title="Editar"
          >
            <MdEdit className="w-5 h-5" />
          </Link>
          <button
            onClick={() => onDelete(_id)}
            className="p-1 text-gray-500 hover:text-red-600 transition"
            title="Eliminar"
          >
            <MdDelete className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
