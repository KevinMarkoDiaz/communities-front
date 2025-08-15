import { MdDelete, MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";

function fmtDate(d) {
  if (!d) return "—";
  const dt = new Date(d);
  if (isNaN(dt)) return "—";
  return dt.toLocaleString();
}

export default function BannerDetalle({ banner, onDelete }) {
  if (!banner) return null;
  return (
    <div className="bg-white/80 rounded-xl border border-gray-200 p-4 md:p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-[#141C24]">
            {banner.title}
          </h3>
          <p className="  text-xs text-gray-600">
            {banner.placement} {banner.isFallback ? "· Fallback" : ""}{" "}
            {banner.isActive ? "· Activo" : "· Inactivo"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to={`${banner._id}/editar`}
            className="inline-flex items-center gap-1 bg-black text-white  text-xs px-3 py-2 rounded hover:bg-[#f4c753] hover:text-black transition"
            title="Editar"
          >
            <MdEdit className="text-base" />
            Editar
          </Link>
          <button
            onClick={() => onDelete(banner._id)}
            className="inline-flex items-center gap-1 bg-red-600 text-white  text-xs px-3 py-2 rounded hover:bg-red-700 transition"
            title="Eliminar"
          >
            <MdDelete className="text-base" />
            Eliminar
          </button>
        </div>
      </div>

      <div className="mt-4 rounded-lg overflow-hidden bg-gray-50">
        {banner.imageUrl ? (
          <img
            src={banner.imageUrl}
            alt={banner.imageAlt || banner.title}
            className="w-full h-auto object-contain"
          />
        ) : (
          <div className="p-8 text-center text-gray-400  text-xs">
            Sin imagen
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-4 mt-4  text-xs">
        <div className="space-y-1">
          <div>
            <span className="font-medium">URL destino:</span>{" "}
            <a
              className="text-blue-600 underline break-all"
              href={banner.redirectUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {banner.redirectUrl}
            </a>
          </div>
          <div>
            <span className="font-medium">Peso:</span> {banner.weight ?? 1}
          </div>
          <div>
            <span className="font-medium">Impresiones:</span>{" "}
            {banner.impressions ?? 0}{" "}
            {banner.maxImpressions ? `/ ${banner.maxImpressions}` : ""}
          </div>
          <div>
            <span className="font-medium">Clicks:</span> {banner.clicks ?? 0}{" "}
            {banner.maxClicks ? `/ ${banner.maxClicks}` : ""}
          </div>
        </div>
        <div className="space-y-1">
          <div>
            <span className="font-medium">Inicio:</span>{" "}
            {fmtDate(banner.startAt)}
          </div>
          <div>
            <span className="font-medium">Fin:</span> {fmtDate(banner.endAt)}
          </div>
          <div>
            <span className="font-medium">Tamaño:</span>{" "}
            {banner.width && banner.height
              ? `${banner.width}×${banner.height}`
              : "—"}
          </div>
          <div>
            <span className="font-medium">Segmentación:</span>{" "}
            {banner.communities?.length ||
            banner.categories?.length ||
            banner.businesses?.length ? (
              <span className="text-gray-700">
                comm: {banner.communities?.length ?? 0} · cat:{" "}
                {banner.categories?.length ?? 0} · biz:{" "}
                {banner.businesses?.length ?? 0}
              </span>
            ) : (
              "Sin restricción"
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
