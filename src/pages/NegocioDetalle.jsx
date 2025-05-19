import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getEventById } from "../api/eventApi";
import EventHero from "../components/eventos/EventHero";
import EventInfo from "../components/eventos/EventInfo";
import EventDescription from "../components/eventos/EventDescription";
import EventOrganizerCard from "../components/eventos/EventOrganizerCard";
import EventCTAButton from "../components/eventos/EventCTAButton";

export default function EventoDetalle() {
  const { id } = useParams();
  const [evento, setEvento] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarEvento = async () => {
      try {
        const data = await getEventById(id);
        setEvento(data);
      } catch (err) {
        console.error("Error al cargar evento:", err);
        setError("No se pudo cargar el evento");
      } finally {
        setLoading(false);
      }
    };

    cargarEvento();
  }, [id]);

  if (loading) return <div className="p-4">Cargando evento...</div>;
  if (error) return <div className="p-4 text-red-600">{error}</div>;
  if (!evento) return <div className="p-4">Evento no encontrado.</div>;

  return (
    <div className="flex flex-col gap-6 px-4 sm:px-8 lg:px-40 py-5">
      <EventHero image={evento.image} title={evento.title} />
      <EventInfo
        date={evento.date}
        time={evento.time}
        location={evento.location}
      />
      <EventDescription description={evento.description} />
      <EventOrganizerCard organizer={evento.organizer} />
      {evento.tags && evento.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-2">
          {evento.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-[#f0f2f4] text-[#111418] text-sm px-3 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      <EventCTAButton />
    </div>
  );
}
