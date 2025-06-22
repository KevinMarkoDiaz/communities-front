import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getEventById } from "../api/eventApi";

export default function EventoDetalle() {
  const { id } = useParams();
  const [evento, setEvento] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarEvento = async () => {
      try {
        const { event } = await getEventById(id);
        console.log(event);
        // Normalización defensiva
        setEvento({
          id: event._id || "",
          title: event.title || "",
          description: event.description || "",
          date: event.date || "",
          time: event.time || "",
          location: event.location || "",
          image: event.featuredImage || "",
          tags: event.tags || [],
          organizerModel: event.organizerModel || "",
          organizer: {
            id: event.organizer?._id,
            fullName: `${event.organizer?.name || ""} ${
              event.organizer?.lastName || ""
            }`.trim(),
            email: event.organizer?.email || "",
            profileImage:
              event.organizer?.profileImage || "/avatar-placeholder.png",
            title: event.organizer?.title || "",
            description: event.organizer?.description || "",
          },
          createdAt: event.createdAt,
          updatedAt: event.updatedAt,
        });
        console.log(evento);
      } catch (err) {
        setError("No se pudo cargar el evento");
      } finally {
        setLoading(false);
      }
    };

    cargarEvento();
  }, [id]);
  useEffect(() => {
    if (evento) {
      console.log("Evento cargado:", evento);
    }
  }, [evento]);

  if (loading) return <div className="p-4">Cargando evento...</div>;
  if (error) return <div className="p-4 text-red-600">{error}</div>;
  if (!evento) return <div className="p-4">Evento no encontrado.</div>;

  return (
    <div className="px-4 sm:px-8 lg:px-40 py-5 flex justify-center">
      <div className="w-full max-w-[960px] flex flex-col">
        {/* Hero visual */}
        <div
          className="w-full bg-center bg-no-repeat bg-cover flex flex-col justify-end overflow-hidden bg-white rounded-xl min-h-[218px]"
          style={{
            backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.3), rgba(0,0,0,0)), url(${evento.image})`,
          }}
        />

        {/* Título */}
        <h1 className="text-[#141414] text-2xl font-bold leading-tight tracking-tight px-4 pt-5 pb-3">
          {evento.title || "Título no disponible"}
        </h1>

        {/* Fecha y hora */}
        <h2 className="text-[#141414] text-lg font-bold px-4 pb-3">
          {new Date(evento.date).toLocaleDateString()} - {evento.time}
        </h2>

        {/* Ubicación */}
        <div className="flex items-center gap-4 bg-white px-4 min-h-[72px] py-2">
          <div className="text-[#141414] flex items-center justify-center rounded-lg bg-[#F4F4F4] w-12 h-12">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 256 256"
            >
              <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,191.89c-18.73-20.27-30.09-49-31.77-79.89h63.54C158.09,166.87,146.73,195.62,128,215.89Z" />
            </svg>
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-[#141414] text-base font-medium leading-normal">
              {evento.location}
            </p>
            <p className="text-neutral-500 text-sm font-normal leading-normal">
              {evento.time}
            </p>
          </div>
        </div>

        {/* Descripción */}
        <p className="text-[#141414] text-base font-normal leading-normal px-4 pt-3 pb-3 whitespace-pre-line">
          {evento.description || "Este evento no tiene descripción."}
        </p>

        {/* Tags */}
        {Array.isArray(evento.tags) && evento.tags.length > 0 && (
          <div className="flex gap-3 flex-wrap px-4 pb-2">
            {evento.tags.map((tag, i) => (
              <div
                key={i}
                className="flex h-8 items-center justify-center rounded-full bg-[#F4F4F4] px-4 text-[#141414] text-sm font-medium"
              >
                {tag}
              </div>
            ))}
          </div>
        )}

        {/* Organizador */}
        {evento.organizer && (
          <>
            <h2 className="text-[#141414] text-lg font-bold px-4 pt-5 pb-3">
              Organizado por
            </h2>
            <div className="flex items-center gap-4 bg-white px-4 py-2">
              <div
                className="bg-center bg-no-repeat bg-cover rounded-full h-14 w-14"
                style={{
                  backgroundImage: `url(${
                    evento.organizer.profileImage || "/avatar-placeholder.png"
                  })`,
                }}
              />
              <div className="flex flex-col justify-center">
                <p className="text-[#141414] text-base font-medium leading-normal">
                  {evento.organizer.fullName || "Nombre no disponible"}
                </p>
                <p className="text-neutral-500 text-sm font-normal leading-normal">
                  {evento.organizer.description || ""}
                </p>
              </div>
            </div>
          </>
        )}

        {/* CTA */}
      </div>
    </div>
  );
}
