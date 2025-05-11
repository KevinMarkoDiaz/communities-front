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
    <div className="p-4 space-y-4">
      <h2 className="text-3xl font-bold text-blue-700">{evento.title}</h2>
      <p className="text-gray-700">{evento.description}</p>
      <p className="text-sm text-gray-500">
        📅 {new Date(evento.date).toLocaleDateString()} – 📍 {evento.location}
      </p>
      {evento.image && (
        <img
          src={evento.image}
          alt={evento.title}
          className="w-full max-w-xl mt-4 rounded"
        />
      )}
    </div>
  );
}
