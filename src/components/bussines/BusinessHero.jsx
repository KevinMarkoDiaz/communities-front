export default function BusinessHero({
  businessName = "Nombre del negocio",
  backgroundImageUrl = "",
}) {
  const imagenFondo =
    backgroundImageUrl?.trim() !== ""
      ? backgroundImageUrl
      : "https://via.placeholder.com/1200x400?text=Imagen+no+disponible";

  return (
    <div
      className="relative w-screen left-1/2 right-1/2 -translate-x-1/2
                 sm:relative sm:w-full sm:left-0 sm:right-0 sm:translate-x-0
                 bg-cover bg-center min-h-[220px] sm:min-h-[300px] lg:min-h-[400px] flex flex-col justify-end md:rounded-xl overflow-hidden shadow-sm"
      style={{
        backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.4), rgba(0,0,0,0)), url(${imagenFondo})`,
      }}
    >
      <div className="p-6 sm:p-10">
        <h1 className="text-white text-3xl sm:text-4xl font-bold leading-tight drop-shadow-md">
          {businessName}
        </h1>
      </div>
    </div>
  );
}
