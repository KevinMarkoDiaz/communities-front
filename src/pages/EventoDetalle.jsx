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
      {/* Hero visual */}
      <div
        className="bg-cover bg-center min-h-80 flex flex-col justify-end rounded-xl overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0)), url(${evento.image})`,
        }}
      >
        <div className="p-4">
          <h1 className="text-white text-3xl sm:text-4xl font-bold leading-tight">
            {evento.title}
          </h1>
        </div>
      </div>

      {/* Encabezado de datos */}
      <div className="flex flex-wrap justify-between gap-3">
        <div className="flex flex-col gap-1">
          <p className="text-[#637588] text-sm">Fecha y hora</p>
          <p className="text-[#111418] text-base font-semibold">
            {new Date(evento.date).toLocaleDateString()} - {evento.time}
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-[#637588] text-sm">Ubicación</p>
          <p className="text-[#111418] text-base font-normal">
            {evento.location}
          </p>
        </div>
      </div>

      {/* Descripción */}
      <div className="bg-white rounded-xl p-4 shadow">
        <h2 className="text-lg font-bold mb-2 text-[#111418]">Descripción</h2>
        <p className="text-[#637588] text-sm leading-relaxed whitespace-pre-line">
          {evento.description}
        </p>
      </div>

      {/* Organizador */}
      {evento.organizer && (
        <div className="bg-white rounded-xl p-4 shadow flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <p className="text-[#637588] text-sm">Organizado por</p>
            <p className="text-[#111418] text-base font-bold">
              {evento.organizer.name}
            </p>
            <p className="text-[#637588] text-sm">
              {evento.organizer.description}
            </p>
          </div>
          {evento.organizer.image && (
            <div
              className="w-24 h-16 rounded-lg bg-cover bg-center"
              style={{ backgroundImage: `url(${evento.organizer.image})` }}
            ></div>
          )}
        </div>
      )}

      {/* Tags */}
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

      {/* CTA */}
      <div className="flex justify-end">
        <button className="bg-[#1773cf] text-white px-5 py-3 rounded-xl font-bold text-base">
          Confirmar asistencia
        </button>
      </div>
    </div>
  );
}
