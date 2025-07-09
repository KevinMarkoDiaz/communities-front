import { Link } from "react-router-dom";
import { MdEdit, MdDelete } from "react-icons/md";

export default function CardPromo({ promo, onDelete }) {
  const { _id, name, description, featuredImage, type, startDate, endDate } =
    promo;

  return (
    <div className="group relative bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden border border-gray-200">
      {/* Imagen destacada */}
      <div className="w-full h-28 overflow-hidden">
        <img
          src={
            featuredImage || "https://cdn.usegalileo.ai/sdxl10/placeholder.png"
          }
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-col gap-2 p-4">
        {/* Nombre */}
        <h3 className="text-sm font-semibold text-gray-700 truncate">{name}</h3>

        {/* Tipo */}
        {type && (
          <span className="inline-block bg-black text-white text-xs font-medium px-2 py-0.5 rounded-full w-fit capitalize">
            {type.replace(/_/g, " ")}
          </span>
        )}

        {/* Fechas */}
        <p className="text-xs text-gray-500">
          {new Date(startDate).toLocaleDateString()} –{" "}
          {new Date(endDate).toLocaleDateString()}
        </p>

        {/* Descripción */}
        <p className="text-xs text-gray-500 line-clamp-2">{description}</p>

        {/* Acciones */}
        <div className="flex justify-between items-center mt-3">
          <Link
            to={`/dashboard/promociones/${_id}/editar`}
            className="text-sm font-medium text-blue-300 hover:text-blue-800 transition"
          >
            Editar
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
