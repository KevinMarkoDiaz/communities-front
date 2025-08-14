export default function BannerCard({ banner, active, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`rounded-lg border transition cursor-pointer overflow-hidden bg-white/70 hover:shadow ${
        active ? "border-blue-400 ring-2 ring-blue-200" : "border-gray-200"
      }`}
    >
      <div className="aspect-video bg-gray-50 flex items-center justify-center">
        {banner?.imageUrl ? (
          <img
            src={banner.imageUrl}
            alt={banner.imageAlt || banner.title}
            className="w-full h-full object-contain"
            loading="lazy"
          />
        ) : (
          <div className="text-gray-400 text-sm p-4">Sin imagen</div>
        )}
      </div>
      <div className="p-3">
        <div className="text-sm font-semibold text-[#141C24] truncate">
          {banner.title}
        </div>
        <div className="text-xs text-gray-600 mt-1 truncate">
          {banner.placement} · {banner.isActive ? "Activo" : "Inactivo"}
          {banner.isFallback ? " · Fallback" : ""}
        </div>
        <div className="text-[11px] text-gray-500 mt-1">
          Imp: {banner.impressions ?? 0} · Clicks: {banner.clicks ?? 0}
        </div>
      </div>
    </div>
  );
}
