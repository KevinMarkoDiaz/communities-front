export default function CardNegocioHome({ negocio }) {
  return (
    <div className="flex flex-col items-center rounded-2xl overflow-hidden bg-gray-50 hover:shadow transition p-3">
      {/* Logo */}
      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gray-100 overflow-hidden mb-2">
        <img
          src={
            negocio.profileImage || "https://via.placeholder.com/80?text=Logo"
          }
          alt="logo"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Nombre */}
      <p className="text-center text-sm sm:text-base font-semibold text-gray-900 break-words leading-snug min-h-[2.5rem]">
        {negocio.name}
      </p>

      {/* Categoría */}
      <p className="text-xs text-gray-500 truncate text-center">
        {negocio.category?.name || "Sin categoría"}
      </p>
    </div>
  );
}
