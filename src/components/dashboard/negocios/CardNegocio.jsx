import { Link } from "react-router-dom";

export default function CardNegocio({ negocio, onDelete }) {
  return (
    <div className="flex items-center gap-4 bg-[#F8F9FB] px-4 min-h-[72px] py-2 justify-between rounded-xl shadow-sm">
      <div className="flex items-center gap-4">
        <div
          className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-14"
          style={{
            backgroundImage: `url(${
              negocio.imagenDestacada ||
              "https://cdn.usegalileo.ai/sdxl10/placeholder.png"
            })`,
          }}
        ></div>
        <div className="flex flex-col justify-center">
          <p className="text-[#141C24] text-base font-medium leading-normal line-clamp-1">
            {negocio.name}
          </p>
          <p className="text-[#3F5374] text-sm font-normal leading-normal line-clamp-2">
            {negocio.description}
          </p>
          <p className="text-[#6B7280] text-xs font-normal leading-normal">
            {negocio.category?.name} · {negocio.location?.city},{" "}
            {negocio.location?.state}
          </p>
        </div>
      </div>
      <div className="flex gap-3 shrink-0 items-center">
        <Link
          to={`/dashboard/mis-negocios/${negocio._id}/editar`}
          className="text-sm text-blue-600 hover:underline"
        >
          Editar
        </Link>
        <button
          onClick={() => onDelete(negocio._id)}
          className="text-sm text-red-600 hover:underline"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}
