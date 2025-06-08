import { Link } from "react-router-dom";

export default function CardCategoria({ categoria, onDelete }) {
  const { _id, name, description, icon } = categoria;

  return (
    <div className="p-4 w-full">
      <div className="w-full flex flex-col md:flex-row items-start gap-4 bg-gray-50 rounded-2xl shadow-sm p-4">
        {/* Imagen del ícono */}
        <div
          className="w-full aspect-video md:aspect-auto md:w-40 md:h-28 bg-center bg-no-repeat bg-contain bg-white border rounded-xl shrink-0"
          style={{
            backgroundImage: `url(${icon})`,
          }}
        ></div>

        {/* Contenido */}
        <div className="flex justify-between flex-1 gap-3 py-2">
          <div className="space-y-1">
            <p className="text-[#141C24] text-lg font-bold leading-tight tracking-[-0.015em]">
              {name}
            </p>
            <p className="text-[#3F5374] text-base line-clamp-2">
              {description || "Sin descripción disponible."}
            </p>
          </div>

          <div className="flex gap-2 mt-2 flex-col">
            <Link
              to={`/dashboard/categorias/${_id}/editar`}
              className="w-[96px] h-9 rounded-full bg-[#E4E9F1] text-[#141C24] text-sm font-medium flex items-center justify-center hover:bg-[#d4dde7] transition"
            >
              Editar
            </Link>
            <button
              onClick={() => onDelete(_id)}
              className="w-[96px] h-9 rounded-full bg-[#F4C753] text-[#141C24] text-sm font-medium flex items-center justify-center hover:bg-[#f1bb2a] transition"
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
