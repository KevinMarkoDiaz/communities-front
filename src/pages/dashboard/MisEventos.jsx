import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getMyEvents, deleteEvent } from "../../api/eventApi";
import CardEvento from "../../components/dashboard/evento/CardEvento";
import { MdEventAvailable } from "react-icons/md";

export default function MisEventos() {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const cargar = async () => {
      try {
        const eventosUsuario = await getMyEvents();
        setEventos(eventosUsuario);
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar los eventos");
      } finally {
        setLoading(false);
      }
    };
    cargar();
  }, []);

  const handleDelete = async (id) => {
    const confirmar = window.confirm("¿Eliminar este evento?");
    if (!confirmar) return;

    try {
      await deleteEvent(id, token);
      setEventos((prev) => prev.filter((e) => e._id !== id));
    } catch (err) {
      console.error("Error al eliminar evento:", err);
      alert("No se pudo eliminar el evento");
    }
  };

  if (loading) return <div className="p-4">Cargando eventos...</div>;
  if (error) return <div className="p-4 text-red-600">{error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Eventos</h2>
        <Link
          to="crear"
          className="flex items-center gap-2 bg-white text-black p-1 rounded hover:bg-black hover:text-white transition text-sm"
        >
          <MdEventAvailable className="text-lg" />
          Agregar
        </Link>
      </div>

      {eventos.length === 0 ? (
        <p className="text-gray-600">No has creado eventos todavía.</p>
      ) : (
        <div className="space-y-3">
          {eventos.map((evento) => (
            <CardEvento
              key={evento._id}
              evento={evento}
              onDelete={() => handleDelete(evento._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
