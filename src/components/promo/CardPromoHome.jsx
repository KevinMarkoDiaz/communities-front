export default function CardPromoHome({ title, image, descuento, maxClaims }) {
  const isAgotado =
    maxClaims === 0 ||
    descuento === "0 disponibles" ||
    descuento?.includes("0 disponibles");

  return (
    <div className="relative group z-0 w-[220px] sm:w-[280px] md:w-[300px] lg:w-[245px] xl:w-[225px] aspect-[4/6] md:aspect-[5/3] xl:aspect-[5/6] rounded-[1.5rem] overflow-hidden shadow-md bg-gray-100 transition hover:shadow-lg my-4">
      {/* Imagen de fondo */}
      {image && (
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 "
          style={{ backgroundImage: `url("${image}")` }}
        />
      )}

      {/* Capa oscura al hacer hover */}
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Contenido base (badges, verificación, cupón) */}
      <div
        className="m-4 transform transition-all duration-900 group-hover:-translate-y-1 group-hover:scale-105 text-sm font-semibold text-center rounded-full py-1.5 px-4 self-center shadow-md
  bg-white text-gray-900"
      >
        {isAgotado ? (
          <span className="text-red-700">Cupones agotados</span>
        ) : (
          <span className="text-green-700">{descuento}</span>
        )}
      </div>

      {/* Capa con título que aparece al hacer hover */}
      <div className="absolute bottom-0 left-0 right-0 h-full flex items-end justify-center opacity-0 translate-y-full group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-20 pointer-events-none">
        <div className="w-full text-white text-lg  font-bold p-4 rounded-b-[1.5rem] whitespace-normal break-words leading-snug pointer-events-none">
          {title}
        </div>
      </div>
    </div>
  );
}
