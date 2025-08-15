export default function CardCategoria({ categoria, onSelect }) {
  const { name, description, icon } = categoria;

  return (
    <div
      onClick={() => onSelect(categoria)}
      className="
        group relative bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden border border-gray-200 min-h-[10rem] flex flex-col cursor-pointer
      "
    >
      {/* Imagen */}
      <div className="w-full h-28 overflow-hidden bg-gray-50">
        {icon ? (
          <img
            src={icon}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full text-gray-400  text-xs">
            Sin imagen
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="flex flex-col gap-2 p-2 flex-grow h-[3.5rem]">
        {/* Nombre */}
        <h3
          className="
     text-xs font-semibold text-gray-700
    line-clamp-2 leading-snug  overflow-hidden
  "
        >
          {name}
        </h3>
      </div>
    </div>
  );
}
