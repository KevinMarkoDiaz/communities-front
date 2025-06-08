import { Link } from "react-router-dom";

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
    <div className="p-4 @container w-full">
      <div className="w-full flex flex-col md:flex-row items-start gap-4 bg-gray-50 rounded-2xl shadow-sm p-4">
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
        <div className="flex justify-between flex-1 gap-3 py-2">
          <div className="space-y-1">
            <p className="text-[#3F5374] text-sm">
              Owned by: {usuario?.role === "admin" ? owner || "N/A" : "Vos"}
            </p>
            <p className="text-[#141C24] text-lg font-bold leading-tight tracking-[-0.015em]">
              {name}
            </p>
            <p className="text-[#3F5374] text-base line-clamp-2">
              {description}
            </p>
            <p className="text-[#3F5374] text-sm">{language}</p>
          </div>

          {puedeEditar && (
            <div className="flex gap-2 mt-2 flex flex-col">
              <Link
                to={`/dashboard/comunidades/${id}/editar`}
                className="w-[96px] h-9 rounded-full bg-[#E4E9F1] text-[#141C24] text-sm font-medium flex items-center justify-center hover:bg-[#d4dde7] transition"
              >
                Edit
              </Link>
              <button
                onClick={() => onDelete?.(id)}
                className="w-[96px] h-9 rounded-full bg-[#F4C753] text-[#141C24] text-sm font-medium flex items-center justify-center hover:bg-[#f1bb2a] transition"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
