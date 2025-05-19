export default function CommunityBusinessList({ negocios }) {
  if (!negocios || negocios.length === 0) return null;

  return (
    <section className="space-y-3">
      <h2 className="text-[#111418] text-[22px] font-bold leading-tight tracking-[-0.015em] px-1 pt-3">
        Negocios
      </h2>
      <div className="flex flex-col gap-4 p-1">
        {negocios.map((negocio) => (
          <div
            key={negocio.id || negocio._id || negocio.nombre}
            className="flex gap-4 items-center bg-white rounded-xl p-3 shadow"
          >
            <div
              className="w-32 h-20 bg-center bg-no-repeat bg-cover rounded-lg shrink-0"
              style={{ backgroundImage: `url(${negocio.imagenDestacada})` }}
            ></div>
            <div className="flex flex-col justify-center">
              <p className="text-[#111418] text-base font-medium leading-normal truncate">
                {negocio.nombre}
              </p>
              <p className="text-[#637588] text-sm font-normal leading-normal truncate">
                {negocio.categoria}
              </p>
              <p className="text-[#637588] text-sm font-normal leading-normal truncate">
                {negocio.ubicacion?.ciudad}, {negocio.ubicacion?.estado}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
