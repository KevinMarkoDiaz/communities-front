import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllBusinesses } from "../../api/businessApi";
import { Link } from "react-router-dom";
import { deleteBusiness } from "../../api/businessApi";

export default function MisNegocios() {
  const [negocios, setNegocios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = useSelector((state) => state.auth.token);
  const usuario = useSelector((state) => state.auth.usuario);

  useEffect(() => {
    const cargarNegocios = async () => {
      try {
        const todos = await getAllBusinesses();
        const propios = todos.filter((n) => n.owner === usuario._id);
        setNegocios(propios);
      } catch (err) {
        setError("No se pudieron cargar los negocios");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    cargarNegocios();
  }, [usuario]);

  const handleDelete = async (id) => {
    const confirmar = window.confirm(
      "¿Estás seguro de que deseas eliminar este negocio?"
    );
    if (!confirmar) return;

    try {
      await deleteBusiness(id, token);
      setNegocios((prev) => prev.filter((n) => n._id !== id));
    } catch (error) {
      console.error("Error al eliminar negocio:", error);
      alert("No se pudo eliminar el negocio. Intenta más tarde.");
    }
  };

  if (loading) return <div className="p-4">Cargando negocios...</div>;
  if (error) return <div className="p-4 text-red-600">{error}</div>;

  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Mis negocios</h2>
        <Link
          to="crear"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          + Nuevo negocio
        </Link>
      </div>

      {negocios.length === 0 ? (
        <p className="text-gray-600">No has creado negocios todavía.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {negocios.map((negocio) => (
            <div
              key={negocio._id}
              className="border p-4 rounded shadow bg-white"
            >
              <h3 className="text-lg font-semibold">{negocio.name}</h3>
              <p className="text-sm text-gray-600">{negocio.description}</p>
              <p className="text-xs text-gray-500">
                Categoría: {negocio.category}
              </p>
              <div className="mt-2 flex gap-2">
                <Link
                  to={`/dashboard/mis-negocios/${negocio._id}/editar`}
                  className="text-blue-600 text-sm"
                >
                  Editar
                </Link>
                <button
                  onClick={() => handleDelete(negocio._id)}
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
