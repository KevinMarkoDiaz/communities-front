export default function CommunityEventList({ eventos }) {
  if (!eventos || eventos.length === 0) return null;

  return (
    <section className="space-y-3">
      <h2 className="text-[#111418] text-[22px] font-bold leading-tight tracking-[-0.015em] px-1 pt-3">
        Eventos
      </h2>
      <div className="flex flex-col gap-4 p-1">
        {eventos.map((evento) => (
          <div
            key={evento.id || evento._id}
            className="flex gap-4 items-center bg-white rounded-xl p-3 shadow"
          >
            <div
              className="w-32 h-20 bg-center bg-no-repeat bg-cover rounded-lg shrink-0"
              style={{ backgroundImage: `url(${evento.imagenDestacada})` }}
            ></div>
            <div className="flex flex-col justify-center">
              <p className="text-[#111418] text-base font-medium leading-normal truncate">
                {evento.nombre}
              </p>
              <p className="text-[#637588] text-sm font-normal leading-normal">
                {evento.fechaInicio} - {evento.fechaFin}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
