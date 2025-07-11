export default function CardCategoria({ categoria }) {
  const { name, description, icon } = categoria;

  return (
    <div className="group relative bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden border border-gray-200 min-h-[10rem] flex flex-col">
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
      <div className="flex flex-col gap-2 p-1 md:p-4 flex-grow">
        {/* Nombre */}
        <h3
          className="
            text-sm font-semibold text-gray-700
            min-h-[2.5rem]
            flex items-start md:items-center
          "
        >
          {name}
        </h3>

        {/* Descripción */}
        <p className="text-xs text-gray-500 line-clamp-2 hidden lg:block min-h-[3rem]">
          {description || "Sin descripción disponible."}
        </p>
      </div>
    </div>
  );
}
