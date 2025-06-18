import { Link } from "react-router-dom";
import { MdEdit, MdDelete } from "react-icons/md";

export default function CardComunidad({
  id,
  name = "Nombre comunidad",
  description = "Descripción de la comunidad.",
  flagImage,
  language = "es",
  owner,
  usuario,
  onDelete,
}) {
  const puedeEditar = usuario?.role === "admin" || usuario?._id === owner;

  return (
    <div className="w-full">
      <div className="w-full flex flex-col md:flex-row items-start gap-4 bg-gray-50 rounded-2xl shadow-sm hover:shadow-md transition-all p-4">
        {/* Imagen */}
        <div
          className="w-full aspect-video md:aspect-auto md:w-40 md:h-28 bg-center bg-no-repeat bg-cover rounded-xl shrink-0"
          style={{
            backgroundImage: `url(${
              flagImage || `https://cdn.usegalileo.ai/sdxl10/${id}.png`
            })`,
          }}
        ></div>

        {/* Contenido */}
        <div className="flex flex-col md:flex-row justify-between flex-1 gap-3 py-2">
          <div className="space-y-1">
            {usuario?.role === "admin" && (
              <p className="text-[#3F5374] text-xs">
                Creado por: {owner || "N/A"}
              </p>
            )}

            <p className="text-[#141C24] text-lg font-bold leading-tight tracking-[-0.015em]">
              {name}
            </p>
            <p className="text-[#3F5374] text-base line-clamp-2 text-xs md:text-md">
              {description}
            </p>
            <p className="text-[#3F5374] text-xs md:text-md">{language}</p>
          </div>

          {/* Acciones */}
          {puedeEditar && (
            <div className="flex gap-2 mt-auto md:flex-col pt-2">
              <button
                onClick={() => onDelete?.(id)}
                className="text-black p-1 rounded hover:bg-black hover:text-white transition text-sm"
                title="Eliminar"
              >
                <MdDelete className="text-lg" />
              </button>
              <Link
                to={`/dashboard/comunidades/${id}/editar`}
                className="text-black p-1 rounded hover:bg-black hover:text-white transition text-sm"
                title="Editar"
              >
                <MdEdit className="text-lg" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
