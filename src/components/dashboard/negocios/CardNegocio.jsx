import { Link } from "react-router-dom";
import { MdLocalOffer } from "react-icons/md";

export default function CardNegocio({ negocio }) {
  return (
    <div className="group relative bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden border border-gray-200 min-h-[10rem] flex flex-col">
      {/* Imagen destacada */}
      <div className="w-full h-28 overflow-hidden bg-gray-50">
        <img
          src={negocio.featuredImage}
          alt={negocio.name}
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
          {negocio.name}
        </h3>

        {/* Categoría */}
        {negocio.category && (
          <span className="hidden md:inline-block bg-black text-white text-xs font-medium px-2 py-0.5 rounded-full w-fit">
            {negocio.category.name}
          </span>
        )}

        {/* Link de ver más */}
        <div className="flex justify-between items-center mt-auto hidden md:flex">
          <Link
            to={`/negocios/${negocio._id}`}
            className="text-sm font-medium text-orange-600 hover:text-orange-800 transition"
          >
            Ver perfil
          </Link>
          <Link
            to={`/dashboard/mis-negocios/${negocio._id}/promos/nueva`}
            className="p-1 text-gray-500 hover:text-blue-600 transition"
            title="Crear promoción"
          >
            <MdLocalOffer className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
