import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllEvents, deleteEvent } from "../../api/eventApi";
import { Link } from "react-router-dom";

export default function MisEventos() {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const usuario = useSelector((state) => state.auth.usuario);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const cargar = async () => {
      try {
        const todos = await getAllEvents();
        const propios = todos.filter((e) => e.organizer === usuario._id);
        setEventos(propios);
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar los eventos");
      } finally {
        setLoading(false);
      }
    };

    cargar();
  }, [usuario]);

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
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Mis eventos</h2>
        <Link
          to="crear"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          + Nuevo evento
        </Link>
      </div>

      {eventos.length === 0 ? (
        <p className="text-gray-600">No has creado eventos todavía.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {eventos.map((evento) => (
            <div
              key={evento._id}
              className="border p-4 rounded shadow bg-white"
            >
              <h3 className="text-lg font-semibold">{evento.title}</h3>
              <p className="text-sm text-gray-600">{evento.description}</p>
              <p className="text-xs text-gray-500">
                {new Date(evento.date).toLocaleDateString()}
              </p>
              <p className="text-xs text-gray-500">
                Ubicación: {evento.location}
              </p>
              <div className="mt-2 flex gap-2">
                <Link
                  to={`/dashboard/mis-eventos/${evento._id}/editar`}
                  className="text-blue-600 text-sm"
                >
                  Editar
                </Link>
                <button
                  onClick={() => handleDelete(evento._id)}
                  className="text-red-600 text-sm hover:underline"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
